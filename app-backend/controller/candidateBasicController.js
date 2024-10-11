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
export const getCandidateBasicDetails = async (req, res, next) => {
  try {
    // Find the candidate using the orgcid parameter from the request URL
    const candidate = await CANDIDATE.find().populate('candidate_basic_details').populate('candidate_attachments').exec()
 
    if (!candidate) return res.status(404).json("Candidate not found");

    
   
  
    res.status(200).json(candidate);
  } catch (err) {
    
    next(err);
  }
};
export const getCandidateById = async (req, res, next) => {
  try {
    // Extract the candidate ID from the request parameters
    const candidateId = req.params.id;  // Assuming the ID is passed in the URL as a parameter like /candidate/:id

    // Find the candidate using the extracted ID
    const candidate = await CANDIDATE.findOne({ candidate_id: candidateId }).populate('candidate_basic_details');

    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    res.status(200).json(candidate);
  } catch (err) {
    next(err);
  }
};
