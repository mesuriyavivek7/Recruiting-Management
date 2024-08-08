import RECRUITING from "../models/RECRUITING.js";

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import { error } from "../utils/error.js";


//for register Recruiting agency
export const register=async (req,res,next)=>{
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
export const kycSubmission=async (req,res,next)=>{
       try{
           const r_id=req.params.id
           await RECRUITING.findByIdAndUpdate(r_id,{$set:{kyc_details:req.body}})
           res.status(200).json("KYC Details Submited successfully")
       }catch(err){
        next(err)
       }
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

