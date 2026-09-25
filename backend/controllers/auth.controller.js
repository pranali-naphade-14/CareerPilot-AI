const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const tokenBlacklistModel=require("../models/blacklist.model")

const registerUser = async (req,res)=>{
    try{
        const {username,email, password}=req.body;

        //insufficient information
        if(!username || !email || !password){
            return res.status(400).json({
                message:"Please provide username, email and password"
            })
        }

        //check if user already registered or not
        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                message:"User Already exist"
            })
        }

        const hashPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({
            username,
            email,
            password:hashPassword
        })

        const token=jwt.sign(
            {id:newUser._id,
            username:newUser.username},
            process.env.JWT_SECRET,
            {expiresIn : "30d"}
        )

        res.cookie("token",token)

        res.status(201).json({
            message:"User Registered Successfully",
            user:{
                id:newUser._id,
                name:newUser.username,
                email:newUser.email
            }
        })
    }
    catch(error){
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please provide email and password"
            })
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token= jwt.sign(
            {id:user._id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"30d"}
        )

        res.cookie("token",token)

        res.status(200).json({
            message:"Login Successful",
            user:{
                id:user._id,
                name:user.username,
                email:user.email
            }
        })
    }
    catch(error){
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const logoutUser= async(req,res)=>{
    const token=req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out successfully"
    })
}

const getMeController= async(req,res)=>{
    const user=await User.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports={registerUser, loginUser, logoutUser, getMeController}