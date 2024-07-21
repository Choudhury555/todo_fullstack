import mongoose from "mongoose";

export const connectDB = ()  => {
    //connecting DB
    mongoose.connect("mongodb://0.0.0.0:27017/",{//this will come from "./data/config.env"
        dbname:"todo"
    })
    .then(()=>console.log("Database Conected"))
    .catch((e)=>console.log(e));
}