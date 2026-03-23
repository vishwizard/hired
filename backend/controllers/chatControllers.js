import { chatClient } from "../config/stream";

const getStreamToken = async (req, res) =>{
    try {
        const token = chatClient.createToken(req.user.clerkId);
        return res.status(200).json({
            token,
            userId:req.user.clerkId,
            name:req.user.name,
            image:req.user.image
        })
    } catch (error) {
        console.log("Error in token production for stream : " + error);
        res.status(500).json({msg : "Internal Server Error"});
    }
}

export {getStreamToken};