import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req,res,next) => {//this function is to check if user is logged in or not
    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        return res.status(404).json({success:false,message:"Login First"});
    }

    const decodedId = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decodedId);

    req.currUser = await User.findById(decodedId._id);//here we will create one property("currUser") inside "req" object and it will be available in all the functions(e.g. getMyProfile) those which are present after "isAuthenticated"

    next();//after all the steps above(next function of "isAuthenticated" will be executed)
}