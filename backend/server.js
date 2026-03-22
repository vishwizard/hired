import express from 'express';
import { ENV } from './config/env.js';
import path from "path";
import cors from "cors";
import { connectDB } from './config/db.js';
import serve from 'inngest/express';
import { inngest, functions } from './config/inngest.js';


const app = express();
const __dirname = path.resolve();

//credentials = true says server allows browser to include cookies
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}));

app.use("/api/inngest", serve({client: inngest, functions}))

console.log(ENV.PORT);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "App is working!!" });
});

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(ENV.PORT, () => {
    console.log("Listening on port " + ENV.PORT);
    connectDB();
});

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