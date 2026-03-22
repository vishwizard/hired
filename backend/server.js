import express from 'express';
import { ENV } from './config/env.js';

const app = express();

console.log(ENV.PORT);

app.get("/", (req, res)=>{
    res.status(200).json({msg:"App is working!!"});
});

app.listen(ENV.PORT, ()=>{
    console.log("Listening on port " + ENV.PORT);
});