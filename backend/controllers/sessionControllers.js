import { chatClient, streamClient } from '../config/stream.js';
import Session from '../models/Session.js';

export async function createSession(req, res){
    try {
        const {problem, difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty) return res.status(400).json({msg : "Problem and Difficulty are required"});

        const callId = `Session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const session  = await Session.create({problem, difficulty, host:userId, callId});

        await streamClient.video.call("default", callId).getOrCreate({
            data:{
                created_by:clerkId,
                custom:{
                    problem, difficulty, sessionId:session._id.toString()
                }
            }
        });

        const channel = chatClient.channel("messaging", callId, {
            name:`${problem} Session`,
            created_by:clerkId,
            members:[clerkId]
        })

        await channel.create();
        res.status(201).json({session});
    } catch (error) {
        console.log("Error in Create Session Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getActiveSessions(_, res){
    try {
        const sessions = await Session.findAll({status:"Active"})
        .populate("host", "name, image, clerkId, email")
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({sessions});

    } catch (error) {
        console.log("Error in Get All Sessions Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getMyPastSessions(req, res){
    try {
        const userId = req.user._id;
        const sessions = await Session.find({
            status:"Completed",
            $or:[{host:userId}, {participant:userId}]
        })
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({sessions});
    } catch (error) {
        console.log("Error in Get My Past Sessions Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getSessionById(req, res){
    try {
        const {id} = req.params;
        const session = Session.findById(id)
        .populate("host", "name, email, image, clerkId")
        .populate("participant", "name, email, image, clerkId");

        if(!session) return res.status(404).json({msg : "Session not found"})

        res.status(200).json({session});
    } catch (error) {
        console.log("Error in Get My Past Sessions Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function joinSession(req, res){
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const clerkid = req.user.clerkId;

        const session = await Session.findById(id);
        if(!session) return res.status(404).json({msg : "Session not found"})
        
        if(session.participant) return res.status(404).json({msg : "Session is already full"});
        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkid]);
        res.status(200).json({session});
    } catch (error) {
        console.log("Error in Join Session Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function endSession(req, res){
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const session = await Session.findById(id);
        if(!session) return res.status(404).json({msg : "Session not found"});

        if(session.host.toString() !== userId.toString()) return res.status(403).json({msg : "Forbidden Requeset"});
        if(session.status === "Completed") return res.status(400).json({msg : "Bad Request"});
        session.status = "Completed";
        await session.save();
        const call = streamClient.video.call("default", session.callId);
        await call.delete({hard:true});
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();
        res.status(200).json({msg : "Session Ended Successfully"});
    } catch (error) {
        console.log("Error in Join Session Controller : "+ error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}