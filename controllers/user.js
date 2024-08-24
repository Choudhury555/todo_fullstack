import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const register = async (req,res,next)=>{
    const {name,email,password} = req.body;
    const isUseravailable = await User.findOne({email});

    if(isUseravailable){
        return next(new ErrorHandler("User aleady exist",404));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const userCreated = await User.create({name,email,password:hashedPassword});

    sendCookie(userCreated,res,"Registered Successfully",201);//this function is inside "/utils/features.js"
}


export const login = async (req,res,next)=>{
    const {email,password} = req.body;

    const findUser = await User.findOne({email}).select("+password");//because in schema for "password" we wrote "select:false"(So,during access of User we need to manually select the "password")

    if(!findUser){
        return next(new ErrorHandler("Invalid Email/Password",400));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    const isMatch = await bcrypt.compare(password,findUser.password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid Email/Password",400));//from here it will directly call our error handling middleware(which is present in last of "app.js" i.e. "errorMiddleware")
    }

    sendCookie(findUser,res,`Wlcome Back ${findUser.name}`,200);
}



export const getMyProfile = (req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.currUser//this is coming from the "isAuthenticated" fuction which is the previous function of "getMyProfile"
    })
}

export const logout = (req,res)=>{
    res.status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:"none",//if "sameSite" is "none" then the "secure" attribute must be set to "true"
        secure:true,
    })
    .json({success:true,message:"Logged out Successfully"});
}


export const forgotPassword = async (req,res,next)=>{
    const {email,newpassword,confirmnewpassword} = req.body;
    const isUseravailableForForgotPassword = await User.findOne({email}).select("+password");

    console.log(isUseravailableForForgotPassword);
    if(!isUseravailableForForgotPassword){
        return next(new ErrorHandler("User does Not Exist",400));
    }

    if(newpassword != confirmnewpassword){
        return next(new ErrorHandler("Both New Password and Confirm Password Must Match",400));
    }

    const isOldAndNewPasswordMatch = await bcrypt.compare(newpassword,isUseravailableForForgotPassword.password);

    if(isOldAndNewPasswordMatch){
        return next(new ErrorHandler("New Password and Old Password Must be Different",400));
    }
    
    const hashedNewPassword = await bcrypt.hash(newpassword,10);
    console.log(hashedNewPassword);
    await User.updateOne({email},{$set:{password:hashedNewPassword}});

    res.status(200).json({
        success:true,
        message:"Password Updated SuccessFully"
    })
    
}