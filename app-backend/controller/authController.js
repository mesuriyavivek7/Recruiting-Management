import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js"
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js"
import ENTERPRISE from "../models/ENTERPRISE.js";
import RECRUITING from "../models/RECRUITING.js";

import { error } from "../utils/error.js";
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const login=async (req,res,next)=>{
    try{
        let user=null
        let userType=null
        const enterpriseuser=await ENTERPRISETEAM.findOne({email:req.body.email})
        const recruitinguser=await RECRUITINGTEAM.findOne({email:req.body.email})
        if(enterpriseuser){
            user=enterpriseuser
            userType="enterprise"
            const isPasswordCorrect=await bcrypt.compare(req.body.password,enterpriseuser.password)
            
            if(!isPasswordCorrect){
               return next(error(404,"Password is incorrect...!"))
            }
            
        }else if(recruitinguser){
            user=recruitinguser
            userType="recruiting"
            const isPasswordCorrect=await bcrypt.compare(req.body.password,recruitinguser.password)

            if(!isPasswordCorrect){
               return next(error(404,"Password is incorrect...!"))
            }

        }else{
            return next(error(404,"User not found by this email address....!"))
        }

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,email_verified,isAdmin,hide_commision,...otherDetails}=user._doc
        res.cookie("t_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:process.env.NODE_ENV === 'production' ? true : false,secure: process.env.NODE_ENV === 'production',sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'}).status(200).json({details:{...otherDetails,userType}})

    }catch(err){
        next(err)
    }
}

export const enterpriseLogin=async (req,res,next)=>{
     try{
        const user=await ENTERPRISETEAM.findOne({email:req.body.email})
        if(!user) return res.status(404).json({message:"User not found by this email address...!",type:"failure"})

        const enterprise=await ENTERPRISE.findById(user.enterprise_id)

        if(user.account_status!=="Active") return res.status(404).json({message:"Your account is inactivated by team leader.",type:"failure"})
        if(enterprise.account_status.status!=="Active") return res.status(404).json({message:"Your enterprise is inactivated by admin.",type:"failure"})

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordCorrect) return res.status(404).json({message:"Password is incorrect",type:'failure'})

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{ expiresIn: '30d' })
        const {password,email_verified,isAdmin,hide_commision,...otherDetails}=user._doc
        res.cookie("t_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:process.env.NODE_ENV === 'production' ? true : false,secure:process.env.NODE_ENV === 'production',sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',domain:'.vms.uphire.in'}).status(200).json({details:{...otherDetails,userType:"enterprise"}})

     }catch(err){
        next(err)
     }
}

export const recruiterLogin=async (req,res,next)=>{
   try{
     const user=await RECRUITINGTEAM.findOne({email:req.body.email})
     if(!user) return res.status(404).json({message:"User not found by this email address....!",type:"failure"})
     
     const recruiter=await RECRUITING.findById(user.recruiting_agency_id)
     if(user.account_status!=="Active") return res.status(404).json({message:"Your account is inactivated.",type:"failure"})
     if(recruiter.account_status.status!=="Active") return res.status(404).json({message:"Your enterprise is inactivated by admin.",type:"failure"})

     const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)

     if(!isPasswordCorrect) return res.status(404).json({message:"Password is incorrect",type:'failure'})

     const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{ expiresIn: '30d' })
     const {password,email_verified,isAdmin,hide_commision,...otherDetails}=user._doc
     res.cookie("t_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:process.env.NODE_ENV === 'production' ? true : false,secure: process.env.NODE_ENV === 'production',sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',domain:'.vms.uphire.in'}).status(200).json({details:{...otherDetails,userType:"recruiting"}})

   }catch(err){
     next(err)
   }
}


export const logout=async (req,res,next)=>{
      try{
        res.clearCookie("t_user", {
            httpOnly: false,
            secure: true, // Ensure this matches your cookie settings
            sameSite: 'none' // Ensure this matches your cookie settings
        });

        res.status(200).json('logout successfully')
      }catch(err){
          next(err)
      }
}