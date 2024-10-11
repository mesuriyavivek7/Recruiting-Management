import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"
import axios from 'axios'

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

export const getNewCandidateId=async (req,res,next)=>{
     try{
        const candidateIds=await ACCOUNTMANAGER.findById(req.params.acmanagerid,{pending_verify_candidate_profile:1,_id:0})
        const candiadteDatas=await axios.post(`${process.env.APP_SERVER_URL}/candidate/getacmanagercandidatedata`,{cIds:candidateIds.pending_verify_candidate_profile})
     }catch(err){
       next(err)
     }
}







export const verifyCandidate = async (req, res) => {
  try {
    const { candidateId, accepted, rejectionReason } = req.body;

    console.log(`Candidate ID: ${candidateId}`);

    const appBackendUrl = 'http://localhost:8080/api/candidate';
    const candidateResponse = await axios.get(`${appBackendUrl}/${candidateId}`);

    if (!candidateResponse || !candidateResponse.data) {
      return res.status(404).json({ message: 'Candidate not found in app-backend' });
    }

    const candidateDetails = candidateResponse.data;
    const candidateFullName = `${candidateDetails.candidate_basic_details.first_name} ${candidateDetails.candidate_basic_details.last_name}`;

    if (accepted) {
      // Find if the candidate is already verified
      const accountManager = await ACCOUNTMANAGER.findOne({
        verified_candidate_profile: candidateFullName,
      });

      if (accountManager) {
        return res.status(200).json({
          message: `Candidate ${candidateFullName} is already accepted and verified.`,
        });
      }

      const updatedAccountManager = await ACCOUNTMANAGER.findOneAndUpdate(
        {},
        { $push: { verified_candidate_profile: candidateFullName } }, 
        { new: true, upsert: true } 
      );

      return res.status(200).json({
        message: 'Candidate accepted and admin-backend updated successfully',
        updatedAccountManager,
      });
    } else {
      
      const updatedAccountManager = await ACCOUNTMANAGER.findOneAndUpdate(
        { verified_candidate_profile: candidateFullName },  
        { $pull: { verified_candidate_profile: candidateFullName } }, 
        { new: true }
      );

      return res.status(200).json({
        message: `Candidate ${candidateFullName} has been rejected and removed from verified candidates list.`,
        rejectionReason,
        updatedAccountManager,
      });
    }
  } catch (error) {
    console.error('Error updating candidate status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
