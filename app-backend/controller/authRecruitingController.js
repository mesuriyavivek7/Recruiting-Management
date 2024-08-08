import RECRUITING from "../models/RECRUITING";

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import { error } from "../utils/error";


//for register Recruiting agency
export const Register=async (req,res,next)=>{

    // Generate a salt and hash the password synchronously
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);
    
   try{
    const newuser=new RECRUITING({...req.body,password:hash})
    await newuser.save()

    res.status(200).json("New Recruiting Agency Create Successfully")
      
   }catch(err){
     next(err)
   }
}

//for kyc details submission
export const KycSubmission=async (req,res,next)=>{
       
}

//for check mail is already presant or not
export const checkMail=async (req,res,next)=>{
    try{
      const mailaddress=await RECRUITING.find({email:req.body.email})
      if(mailaddress){
        res.status(200).json(true)
      }

      res.status(200).json(false)
    }catch(err){
       next(err)
    }
}


//for login user

export const login=async (req,res,next)=>{
    try{
        const user=await RECRUITING.findOne({email:req.body.email})

        if(!user){
            return next(error(404,"User not found by this email address"))
        }

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordCorrect){
           return next(error(404,"Password is incorrect"))
        }

        const token=jwt.sign({id:user._id},process.env.JWT)
        const {password,...otherDetails}=user._doc
        res.cookie("access_token",token,{expires:new Date(Date.now()+2592000000),httpOnly:false,secure:true,sameSite:'none'}).status(200).json({details:{...otherDetails}})

    }catch(err){
         next(err)
    } 
}

