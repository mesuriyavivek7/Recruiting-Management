import CANDIDATECONSETPROOF from "../models/CANDIDATECONSETPROOF.js";
import CANDIDATE from "../models/CANDIDATE.js";

export const uploadCandidateConsetProof=async (req,res,next)=>{
     try{
       const filedata={
        filename:req.file.filename,
        filepath:req.file.path,
        filetype:req.file.mimetype
       }
       const consentproof=await CANDIDATECONSETPROOF.findOneAndUpdate({candidate_id:req.params.cid},{$set:{...filedata}},{upsert:true,new:true})

       await CANDIDATE.findOneAndUpdate({candidate_id:req.params.cid},{$set:{candidate_consent_proof:consentproof._id}})
       res.status(200).json("Candidate conset proof upload and stored successfully")
     }catch(err){
        next(err)
     }
}