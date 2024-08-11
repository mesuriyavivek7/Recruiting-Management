import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js"
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js"


import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const login=async (req,res,next)=>{
    try{
        let user=null
        const enterpriseuser=await ENTERPRISETEAM.findOne({email:req.body.email})
        const recruitinguser=await RECRUITINGTEAM.findOne({email:req.body.email})
        if(enterpriseuser){
            console.log(enterpriseuser)
            user=enterpriseuser
            const isPasswordCorrect=await bcrypt.compare(req.body.password,enterpriseuser.password)
            console.log(isPasswordCorrect)
            if(!isPasswordCorrect){
               return next(error(404,"Password is incorrect"))
            }

            
    
            
        }else if(recruitinguser){
            user=recruitinguser
            const isPasswordCorrect=await bcrypt.compare(req.body.password,enterpriseuser.password)

            if(!isPasswordCorrect){
               return next(error(404,"Password is incorrect"))
            }

        }else{
            return next(error(404,"User not found by this email address"))
        }

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,isAdmin,hide_commision,...otherDetails}=user._doc
        res.cookie("t_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:false,secure:true,sameSite:'none'}).status(200).json({details:{...otherDetails}})

    }catch(err){
        next(err)
    }
}
