import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"

//get account manager by master admin id
export const getAcByMadminId=async (req,res,next)=>{
    try{
      const getaccountmanager=await ACCOUNTMANAGER.find({master_admin:req.params.id})
      res.status(200).json(getaccountmanager)
    }catch(err){
        next(err)
    }
}


export const addEnterprise=async (req,res,next)=>{
  try{
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$push:{pending_verify_enterprise:req.body.en_id}})
     res.status(200).json("Successfully added enterprise into account manager pending list")
  }catch(err){
    next(err)
  }
}

export const addRecruiting=async (req,res,next)=>{
   try{
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$push:{pending_verify_recruiting_agency:req.body.ra_id}})
     res.status(200).json("Sucessfully added recruiting agency into account manager pending list")
   }catch(err){
    next(err)
   }
}


export const addVerifiedRecruitng=async (req,res,next)=>{
  try{
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.m_id,{$pull:{pending_verify_recruiting_agency:req.body.ra_id}})
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.m_id,{$push:{verified_recruiting_agency:req.body.ra_id}})
     res.status(200).json("Sucessfully added recruiting agency into verified list")
  }catch(err){
    next(err)
  }
}

export const addVerifiedEnterprise=async (req,res,next)=>{
   try{
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$pull:{pending_verify_enterprise:req.body.en_id}})
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$push:{verified_enterprise:req.body.en_id}})
     res.status(200).json("Successfully added enterprise into verified list")
   }catch(err){
    next(err)
   }
}