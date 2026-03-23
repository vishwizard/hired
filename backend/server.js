import express from 'express';
import cors from "cors";
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { serve } from 'inngest/express';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}));
app.use(clerkMiddleware());


app.use("/api/inngest", serve({client: inngest, functions}));
app.use("/api/chat", chatRoutes);
app.use("/api/session", sessionRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("Listening on port " + ENV.PORT);
        });
    } catch (error) {
        console.log("Error starting server : " + error);
    }
}

startServer();