import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"//this is for ".env" file(then we have to call our "config" function below)
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();//server.js is our staring file

config({
    path:"./data/config.env",
})
// Middleware
app.use(cookieParser());
app.use(express.json());//This must be used before the below line(app.use("/users",userRouter))

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true//this is used to send headers(e.g. cookie) to front end
}));

app.use("/api/v1/users",userRouter);//here "/users" is the custom url(in "./routes/user.js" all the routes will start from "/api/v1/users")
app.use("/api/v1/tasks",taskRouter);

app.get("/",(req,res)=>{
    res.send("Nice");
})

//This is the error handling middleware
app.use(errorMiddleware);//if someone is calling next() function with some error(e.g. next(error)) then this middleware will be executed immediately