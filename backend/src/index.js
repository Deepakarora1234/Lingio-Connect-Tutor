import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import mongoose from "mongoose"
import path from "path"
import tutorRoutes from "../src/Routes/tutorRoutes.js"
import messageRoutes from "../src/Routes/messageRoutes.js"

await mongoose.connect("mongodb+srv://aroradeepak0817:IEXmL1e9UJBH2K61@cluster0.x9xhl3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=> console.log("connected to database"))
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
app.use(cors(
));

app.use("/api/tutor", tutorRoutes)
app.use("/api/message", messageRoutes)


app.listen('5000',()=>{
    console.log("server running on port 5000")
})

