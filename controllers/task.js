import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req,res) =>{
    const {title,description} = req.body;

    await Task.create({title,description,user:req.currUser});//this req.currUser will come from "isAuthenticated"
    
    res.status(201).json({success:true,message:"Task added sucessfully"});
}


export const getMyTasks = async (req,res) =>{
    const currUserId = req.currUser._id;//this will come from "isAuthenticated"
    // console.log(currUserId);

    const alltask = await Task.find({user:currUserId});

    res.status(200).json({
        success:true,
        alltask
    })
}


export const updateTask = async (req,res,next) =>{
    const id = req.params.id;
    const currTask = await Task.findById(id);

    if(!currTask){
        return next(new ErrorHandler("Task Not Found",404));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    currTask.isCompleted = !currTask.isCompleted;
    await currTask.save();

    res.status(200).json({success:true,message:"Task Updated Successfully"});
}


export const deleteTask = async (req,res,next) =>{
    const id = req.params.id;
    const currTask = await Task.findById(id);

    if(!currTask){
        return next(new ErrorHandler("Task Not Found",404));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    await currTask.deleteOne();

    res.status(200).json({success:200,message:"Task Deleted Successfully"});
}

export const editTask = async (req,res,next)=>{
    const {title,description} = req.body;
    const {id} = req.params;

    const findCurrTask = await Task.findById(id);
    if(!findCurrTask){
        return next(new ErrorHandler("Task Not Found",404));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    // console.log(title,description,id);
    await Task.updateOne({_id:id},{$set:{title:title,description:description}});
    res.status(200).json({success:true,message:"Task Edited Successfully"});
}