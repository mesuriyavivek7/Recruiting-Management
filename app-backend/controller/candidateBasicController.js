import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import CANDIDATE from "../models/CANDIDATE.js";

export const createCandidateBasicDetails=async (req,res,next)=>{
     try{
        const basicdetails=await CANDIDATEBASICDETAILS.findOneAndUpdate({candidate_id:req.body.candidate_id},{$set:{...req.body}},{upsert:true,new:true})
         
        //update candidate 
        await CANDIDATE.findByIdAndUpdate(req.params.orgcid,{$set:{candidate_basic_details:basicdetails._id}})
        res.status(200).json("Candidate basic details created or updated")
     }catch(err){
        next(err)
     }
}

export const checkEmailAndMobile=async (req,res,next)=>{
    const {email,mobileno}=req.body
    try{
        const candidate=await CANDIDATEBASICDETAILS.findOne({$or:[{primary_email_id:email},{primary_contact_number:mobileno}]})
        if(candidate) res.status(200).json(true)
        else res.status(200).json(false)
    }catch(err){
      next(err)
    }
}