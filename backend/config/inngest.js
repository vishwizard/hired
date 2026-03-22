import { Inngest } from "inngest";
import User from "../models/User.js";
import { connectDB } from "./db.js";

export const inngest = Inngest({id:"hireorfire"});

const syncUser = inngest.createFunction(
    {id:"create-user"},
    {event: "clerk/user.created"},
    async ({event})=>{
        await connectDB();

        const {id, email_addresses, first_name, last_name, image_url} = event.data;
        const user = {
            clerkId:id,
            name:`${first_name || ""} ${last_name || ""}`,
            email:email_addresses[0]?.email_address,
            profileImage:image_url,
        }

        await User.save(user);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id:"delete-user"},
    {event: "clerk/user.deleted"},
    async ({event})=>{
        await connectDB();

        const {id} = event.data;

        await User.delete({clerkId:id});
    }
);

export const functions = {syncUser, deleteUserFromDB};