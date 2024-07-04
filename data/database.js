import mongoose from "mongoose";

export const connectDB = ()  => {
    //connecting DB
    mongoose.connect(process.env.MONGO_URI,{//this will come from "./data/config.env"
        dbname:"backendapi"
    })
    .then(()=>console.log("Database Conected"))
    .catch((e)=>console.log(e));
}