import express from "express"
import userRouter from "./routes/user.js"
import {config} from "dotenv"//this is for ".env" file(then we have to call our "config" function below)

export const app = express();//server.js is our staring file

config({
    path:"./data/config.env",
})
// Middleware
app.use(express.json());
app.use("/users",userRouter);//here "/users" is the custom url(in "./routes/user.js" all the routes will start from "/users")

app.get("/",(req,res)=>{
    res.send("Nice");
})