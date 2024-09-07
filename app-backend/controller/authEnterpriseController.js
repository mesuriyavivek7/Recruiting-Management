import ENTERPRISE from "../models/ENTERPRISE.js";
import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js";

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import { error } from "../utils/error.js";




//for register Enterprise
export const register=async (req,res,next)=>{
    // Generate a salt and hash the password synchronously
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);
   try{

    const newuser=new ENTERPRISE({...req.body,password:hash})
    await newuser.save()

    //added into team member list
    const newteammember=new ENTERPRISETEAM({enterprise_id:newuser._id,full_name:newuser.full_name,email:newuser.email,mobileno:newuser.mobileno,password:hash,isAdmin:true})
    newteammember.save()
    
    res.status(200).json(newuser)
      
   }catch(err){
     next(err)
   }
}



//for login enterprise
export const login=async (req,res,next)=>{
    try{

        const user=await ENTERPRISE.findOne({email:req.body.email})

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

//for check email is presant or not
export const checkMail=async (req,res,next)=>{
    try{
      const mailaddress=await ENTERPRISE.findOne({email:req.body.email})
      if(mailaddress){
        res.status(200).json(true)
      }else{
        res.status(200).json(false)
      }
    }catch(err){
       next(err)
    }
}


//check for mobile no
export const checkMobileNo=async (req,res,next)=>{
  try{
     const mobileno=await ENTERPRISE.findOne({mobileno:req.body.mobileno})
     if(mobileno){
      res.status(200).json(true)
     }else{
      res.status(200).json(false)
     }

  }catch(err){
    next(err)
  }
}