import mongoose from "mongoose";

export const connectDB = ()  => {
    //connecting DB
    mongoose.connect(process.env.MONGO_URI,{//this will come from "./data/config.env"
        dbname:"todo"
    })
    .then((c)=>console.log(`Database Conected with ${c.connection.host}`))
    .catch((e)=>console.log(e));
}