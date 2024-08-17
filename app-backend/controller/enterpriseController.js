import ENTERPRISE from "../models/ENTERPRISE.js";
import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js";
import bcrypt from 'bcryptjs'
import { sendEmailUpdateVerificationEnterprise } from "./mailController.js";


export const getMobileNo=async (req,res,next)=>{
     try{
       const enterpriseuser=await ENTERPRISE.findById(req.params.id)
       res.status(200).json(enterpriseuser.mobileno)
     }catch(err){
       next(err)
     }
}


export const changeMail=async (req,res,next)=>{
  try{
    const enterpriseteamuser=await ENTERPRISETEAM.findById(req.params.id)
    if(enterpriseteamuser.isAdmin){
         await ENTERPRISE.findByIdAndUpdate(enterpriseteamuser.enterprise_id,{$set:{email:req.body.email,email_verified:false}})
         await ENTERPRISETEAM.findByIdAndUpdate(req.params.id,{$set:{email:req.body.email,email_verified:false}})
         //adding name of enterprise user
         req.body.name=enterpriseteamuser.full_name
         await sendEmailUpdateVerificationEnterprise(req,res,next)
    }else{
     await ENTERPRISETEAM.findByIdAndUpdate(req.params.id,{$set:{email:req.body.email,email_verified:false}})
     res.status(200).json("Email address is updated")
    }
  }catch(err){
    next(err)
  }
}

//for checking password
export const checkPassword=async (req,res,next)=>{
         try{
            const enterpriseuser=await ENTERPRISETEAM.findById(req.params.id)
            const isPasswordCorrect=await bcrypt.compare(req.body.password,enterpriseuser.password)
            res.status(200).json(isPasswordCorrect)
         }catch(err){
           next(err)
         }
}



//change password
export const changepassword=async (req,res,next)=>{
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try{
     const enterpriseteam=await ENTERPRISETEAM.findById(req.params.id)
     if(enterpriseteam.isAdmin){
       //changing into enterprise
       await ENTERPRISE.findByIdAndUpdate(enterpriseteam.enterprise_id,{$set:{password:hash}})
     }

     //changing into enterprose team
     await ENTERPRISETEAM.findByIdAndUpdate(req.params.id,{$set:{password:hash}})
  }catch(err){
      next(err)
  }
}


export const getEnterprise=async (req,res,next)=>{
    try{
       const enterprise=await ENTERPRISE.findById(req.params.id)
       res.status(200).json(enterprise)
    }catch(err){
      next(err)
    }
}

export const getAllPendingMadminVerifyEnterprise=async (req,res,next)=>{
  try{
     const pendingenterprise=await ENTERPRISE.find({admin_verified:false})
     res.status(200).json(pendingenterprise)
  }catch(err){
    next(err)
  }
}


export const changeAccountStatus=async (req,res,next)=>{
  console.log(req.body.status)
  try{
       if(req.body.status==="Active"){
         await ENTERPRISE.findByIdAndUpdate(req.body.id,{$set:{account_status:{status:"Inactive",remark:req.body.reason,admin_id:req.body.admin_id}}})
       }else{
         await ENTERPRISE.findByIdAndUpdate(req.body.id,{$set:{account_status:{status:"Active",remark:"",admin_id:""}}})
       }
       res.status(200).json("Status changes successfully")
  }catch(err){
    next(err)
  }
}