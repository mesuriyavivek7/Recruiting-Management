import ENTERPRISE from "../models/ENTERPRISE.js";
import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js";


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
    }
    await ENTERPRISETEAM.findByIdAndUpdate(req.params.id,{$set:{email:req.body.email}})
    res.status(200).json("Email address is updated")
  }catch(err){
    next(err)
  }
}