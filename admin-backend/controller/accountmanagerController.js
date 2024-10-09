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

export const addJobsPendingList=async (req,res,next)=>{
  try{  
     await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$push:{pending_verify_jobs:req.body.orgjobid}})
     res.status(200).json("Sucessfully added job into account manager pendig list")
  }catch(err){
    next(err)
  }
}


export const addJobIntoVerifyList=async (req,res,next)=>{
  try{
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$pull:{pending_verify_jobs:req.body.orgjobid}})
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id,{$push:{verified_jobs:req.body.orgjobid}})
    res.status(200).json("Job Successfully added into accountmanager verify list")
  }catch(err){
    next(err)
  }
}

export const getAcManagerEmail=async (req,res,next)=>{
    try{
      const emailObj=await ACCOUNTMANAGER.findById(req.params.id,{email:1,_id:0})
      res.status(200).json(emailObj)
    }catch(err){
       next(err)
    }
}


export const addCandidatePendingList=async (req,res,next)=>{
  try{
     await ACCOUNTMANAGER.findByIdAndUpdate(req.params.acmanagerid,{$push:{pending_verify_candidate_profile:req.body.orgcid}})
     res.status(200).json("Candidate profile added into pending verified list")
  }catch(err){
    next(err)
  }
}


export const addCandidateVerifiedList=async (req,res,next)=>{
    try{
      await ACCOUNTMANAGER.findByIdAndUpdate(req.params.acmanagerid,{$pull:{pending_verify_candidate_profile:req.body.orgcid},$push:{verified_candidate_profile:req.body.orgcid}})
      res.status(200).json("Successfully candidate profile added into verified list")
    }catch(err){
      next(err)
    }
}


export const getAcmanagerMailandName=async (req,res,next)=>{
    try{
       const acmanager=await ACCOUNTMANAGER.findById(req.params.acmanagerid,{full_name:1,email:1,_id:0})
       res.status(200).json(acmanager)
    }catch(err){
       next(err)
    }
}

