import RECRUITING from "../models/RECRUITING.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";

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

    //added into team member list
    const newteammember=new RECRUITINGTEAM({recruiting_agency_id:newuser._id,full_name:newuser.full_name,email:newuser.email,mobileno:newuser.mobileno,password:hash,isAdmin:true})
    newteammember.save()
    

    res.status(200).json(newuser)
      
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

