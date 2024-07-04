import { User } from "../models/user.js";

export const getAllUsers = async (req,res)=>{

    const tempUser = await User.find({});
    console.log(req.query);//this query we are getting from params in POSTMAN

    res.json({
        success:true,
        usersArr:tempUser
    })
}


export const newUser = async (req,res)=>{
    const {name,email,password} = req.body;

    await User.create({name:name,email:email,password:password});

    res.status(201).cookie("tempcookie","lol").json({
        success: true,
        message:"Registered Successfully"
    })
}


export const specialFunc = (req,res)=>{//"/userid/special" route should be placed before exact same dynamic route "/userid/:id"
    res.json({
        success:true,
        message:"Just for Testing purpose"
    })
}

export const getUserDetails = async (req,res)=>{//dynamic route should be at last(when there are more than one route with same name)
    // console.log(req.query);
    console.log(req.params);

    // const {id} = req.query;//getting the id from query

    const {id} = req.params;//this is coming from /userid/anyid

    const user = await User.findById(id);

    res.json({
        success:true,
        user:user
    })
}


export const updateUser = async (req,res)=>{//dynamic route should be at last(when there are more than one route with same name)
    // console.log(req.query);
    console.log(req.params);

    // const {id} = req.query;//getting the id from query

    const {id} = req.params;//this is coming from /userid/anyid

    const user = await User.findById(id);

    res.json({
        success:true,
        message:"Updated"
    })
}


export const deleteUser = async (req,res)=>{//dynamic route should be at last(when there are more than one route with same name)
    // console.log(req.query);
    console.log(req.params);

    // const {id} = req.query;//getting the id from query

    const {id} = req.params;//this is coming from /userid/anyid

    const user = await User.findById(id);

    res.json({
        success:true,
        message:"Deleted"
    })
}