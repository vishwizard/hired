import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(ENV.DB_URI);
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Error connecting MongoDB : " + error);
        process.exit(1); // 0 means success, 1 means failure
    }
}