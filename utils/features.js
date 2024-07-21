import jwt from "jsonwebtoken"

export const sendCookie = (userCreated,res,message,statusCode) => {
    const token = jwt.sign({ _id: userCreated._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, { 
        httpOnly: true, 
        maxAge: 15*60*1000 ,
        sameSite:"none",//if "sameSite" is "none" then the "secure" attribute must be set to "true"
        secure:true,
    }).json({ success: true, message:message });
}