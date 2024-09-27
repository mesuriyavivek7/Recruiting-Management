import CANDIDATE from "../models/CANDIDATE.js";

export const createCandidate=async (req,res,next)=>{
      try{
        const candidate=await CANDIDATE.findOneAndUpdate({candidate_id:req.params.cid},{$set:{...req.body}},{upsert:true,new:true})
        res.status(200).json(candidate)
      }catch(err){
        next(err)
      }
}

export const addAcManager=async (req,res,next)=>{
  try{
    await CANDIDATE.findByIdAndUpdate(req.params.orgcid,{$set:{alloted_account_manager:req.body.acmanagerid}})
    res.status(200).json("Added account manager id into candidate profile")
  }catch(err){
    next(err)
  }
}


export const changeCandidateStatus=async (req,res,next)=>{
   try{
      await CANDIDATE.findByIdAndUpdate(req.params.orgcid,{$set:{candidate_status:req.body.status}})
      res.status(200).json("Candidate status changed.")
   }catch(err){
      next(err)
   }
}


export const updateCandidateRemarks=async (req,res,next)=>{
    try{
      await CANDIDATE.findByIdAndUpdate(req.params.orgcid,{$set:{remarks:req.body.remarks}})
      res.status(200).json("Candidate remarks changed.")
    }catch(err){
       next(err)
    }
}