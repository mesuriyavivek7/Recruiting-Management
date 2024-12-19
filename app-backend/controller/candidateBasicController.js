import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import CANDIDATE from "../models/CANDIDATE.js";

export const createCandidateBasicDetails = async (req, res, next) => {
  try {
    const basicdetails = await CANDIDATEBASICDETAILS.findOneAndUpdate({ candidate_id: req.body.candidate_id }, { $set: { ...req.body } }, { upsert: true, new: true })

    //update candidate 
    await CANDIDATE.findByIdAndUpdate(req.params.orgcid, { $set: { candidate_basic_details: basicdetails._id } })
    res.status(200).json("Candidate basic details created or updated")
  } catch (err) {
    next(err)
  }
}

export const checkEmailAndMobile = async (req, res, next) => {
  const { email, mobileno, jobid} = req.body
  try {
    const candidate = await CANDIDATEBASICDETAILS.find({ $or: [{ primary_email_id: email }, { primary_contact_number: mobileno }] })
    
    let flag=false

    await Promise.all(candidate.map(async (item)=>{
       const exitcandidate = await CANDIDATE.findOne({candidate_id:item.candidate_id,job_id:jobid})
       if(exitcandidate) flag=true
    }))

    if (flag) res.status(200).json(true)
    else res.status(200).json(false)
  } catch (err) {
    next(err)
  }
}

export const getCandidateDetailsById = async (req, res, next) => {
  try {
    const candidates = await CANDIDATE.findOne({ _id: req.params.id });
    if (!candidates) {
      return res.status(404).json({ message: "Error getting the candidate details" });
    }
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    next(error);
  }
};

export const getCandidateBasicDetailsByRecruiterId = async (req, res, next) => {
  try {
    const candidateDetails = await CANDIDATEBASICDETAILS.find({ recruiter_id: req.params.recruiter_id });
    res.status(200).json(candidateDetails);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    next(error);
  }
}
