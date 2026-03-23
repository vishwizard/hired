import { Inngest } from "inngest";
import User from "../models/User.js";
import { connectDB } from "./db.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "hireorfire" });

const syncUser = inngest.createFunction(
    { id: "sync-user-from-clerk" }, 
    { events: ["clerk/user.created", "clerk/user.updated"] },
    async ({ event }) => {
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const fullName = `${first_name || ""} ${last_name || ""}`.trim();
        const email = email_addresses[0]?.email_address;

        await User.findOneAndUpdate(
            { clerkId: id },
            {
                clerkId: id,
                name: fullName,
                email: email,
                profileImage: image_url,
            },
            { upsert: true, new: true }
        );

        await upsertStreamUser({
            id: id.toString(),
            name: fullName,
            image: image_url
        });
    }
);

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;

        await User.deleteOne({ clerkId: id });
        await deleteStreamUser(id.toString());
    }
);

export const functions = [syncUser, deleteUserFromDB];