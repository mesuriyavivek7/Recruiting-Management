import { response } from "express";
import CANDIDATE from "../models/CANDIDATE.js";
import CANDIDATEATTACHMENT from "../models/CANDIDATEATTACHMENT.js";
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import CANDIDATECONSETPROOF from "../models/CANDIDATECONSETPROOF.js";
import CANDIDATESQANSWER from "../models/CANDIDATESQANSWER.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import axios from "axios";
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCandidate = async (req, res, next) => {
  try {
    const candidate = await CANDIDATE.findOneAndUpdate({ candidate_id: req.params.cid }, { $set: { ...req.body } }, { upsert: true, new: true })
    res.status(200).json(candidate)
  } catch (err) {
    next(err)
  }
}

export const addAcManager = async (req, res, next) => {
  try {
    await CANDIDATE.findByIdAndUpdate(req.params.orgcid, { $set: { alloted_account_manager: req.body.acmanagerid } })
    res.status(200).json("Added account manager id into candidate profile")
  } catch (err) {
    next(err)
  }
}

export const getCandidate= async (req,res,next)=>{
   try{
     const candidate=await CANDIDATE.findById(req.params.cid)
     res.status(200).json(candidate)
   } catch(err){
     next(err)
   }
}

export const changeCandidateStatus = async (req, res, next) => {
  try {
    await CANDIDATE.findByIdAndUpdate(req.params.orgcid, { $set: { candidate_status: req.body.status } })
    res.status(200).json("Candidate status changed.")
  } catch (err) {
    next(err)
  }
}


export const updateCandidateRemarks = async (req, res, next) => {
  try {
    await CANDIDATE.findByIdAndUpdate(req.params.orgcid, { $set: { remarks: req.body.remarks } })
    res.status(200).json("Candidate remarks changed.")
  } catch (err) {
    next(err)
  }
}

export const getCandidateForMultipleAction = async (req, res, next) => {
  try {
    const { candidateIds } = req.body
    const candidateData = await Promise.all(candidateIds.map(async (id) => {
      const candidate = await CANDIDATE.findById(id)
      const candidateBasicDetails = await CANDIDATEBASICDETAILS.findById(candidate.candidate_basic_details)
      const jobDetails = await JOBBASICDETAILS.findOne({ job_id: candidate.job_id })

      return (
        {
          id,
          candidate_full_name: `${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`,
          candidate_id: candidateBasicDetails.candidate_id,
          candidate_status: candidate.candidate_status,
          submited: candidate.createdAt,
          job_title: jobDetails.job_title,
          job_id: jobDetails.job_id
        }
      )
    }))
    res.status(200).json(candidateData)
  } catch (err) {
    next(err)
  }
}

export const changeMultipleCandidateStatus = async (req, res, next) => {
  try {
    const { candidateIds, status } = req.body

    await Promise.all(candidateIds.map(async id => {
      await CANDIDATE.findByIdAndUpdate(id, { candidate_status: status })
    }))

    res.status(200).json("all candidate status changed.")
  } catch (err) {
    next(err)
  }
}

export const getRecruiterMemberIds = async (req, res, next) => {
  try {
    const { candidateIds } = req.body
    const recruiterMemberIds = await Promise.all(candidateIds.map(async (cid) => {
      const memberId = await CANDIDATE.findById(cid, { recruiter_member_id: 1, candidate_id: 1, _id: 0 })
      return (
        {
          recruiter_member_id: memberId.recruiter_member_id,
          candidate_id: memberId.candidate_id
        }
      )
    }))
    res.status(200).json(recruiterMemberIds)
  } catch (err) {
    next(err)
  }
}

export const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await CANDIDATE.find()
    if (!candidates) {
      return res.status(404).json({ message: "Error to get the all candidates" });
    }
    res.status(200).json(candidates);
  } catch (error) {
    next(error);
  }
}

export const getCandidateAllDetails=async (req,res,next)=>{
   try{
      const candidate=await CANDIDATE.findOne({candidate_id:req.params.cid})
      let candidateBasicDetails=null
      let candidateAttachments=null
      let candidateSQ=null
      let candidateConsetProof=null
      
      if(candidate.candidate_basic_details) candidateBasicDetails=await CANDIDATEBASICDETAILS.findById(candidate.candidate_basic_details)
      if(candidate.candidate_attachments) candidateAttachments=await CANDIDATEATTACHMENT.findById(candidate.candidate_attachments)
      if(candidate.candidate_question_answer) candidateSQ=await CANDIDATESQANSWER.findById(candidate.candidate_question_answer)
      if(candidate.candidate_consent_proof) candidateConsetProof=await CANDIDATECONSETPROOF.findById(candidate.candidate_consent_proof)


      let obj={
        candidateBasicDetails,
        candidateAttachments,
        candidateSQ,
        candidateConsetProof,
        candidateStatus:candidate.candidate_status
      }

      res.status(200).json(obj)

   }catch(err){
     next(err)
   }
}


export const getJobBasicDetails=async (req,res,next)=>{
     try{
       const jobid=await CANDIDATE.findOne({candidate_id:req.params.cid},{job_id:1,_id:0})
       const jobbasicdetails=await JOBBASICDETAILS.findOne({job_id:jobid.job_id})
       res.status(200).json(jobbasicdetails)
     }catch(err){
       next(err)
     }
}

export const getAcManagerName=async (req,res,next)=>{
      try{
        const acmanager=await CANDIDATE.findOne({candidate_id:req.params.cid},{alloted_account_manager:1,_id:0})
        if(acmanager.alloted_account_manager){
           const nameandmail=await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${acmanager.alloted_account_manager}`)
           res.status(200).json(nameandmail.data)
        }else{
           res.status(200).json(null)
        }
      }catch(err){
        next(err)
      }
}

export const downloadCandidateAttachments=async (req,res,next)=>{
  try{
   const {filePath,fileName}=req.body
   
   const fileExist=fs.existsSync(filePath)

   if(fileExist){
    res.download(filePath,fileName)
   }else{
    res.status(404).json("File path not found.")
   }
  }catch(err){
    next(err)
  }
}


export const viewCandidateAttachments=async (req,res,next)=>{
    try{
      const {candidateId,fileName}=req.params
      const filepath=path.join(__dirname,'..','uploads','candidatedocs',candidateId,fileName)
      fs.access(filepath,fs.constants.F_OK,(err)=>{
        if(err){
          return res.status(404).json('My File not found')
        }else{
          res.sendFile(filepath)
        }
      })
      
    }catch(err){
       next(err)
    }
}

export const getCandidateStatusById = async (req, res, next) => {
  try {
    const candidateId = req.params.candidate_id;

    // find the corresponding candidate in the CANDIDATES table
    const candidate = await CANDIDATE.findOne({
      candidate_id: candidateId
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found in CANDIDATES table" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    next(error);
  }
}

export const getJobCandidateForPreview=async (req,res,next)=>{ 
    try{
      const candidate=await CANDIDATE.findById(req.params.cid)

      const candidateBasicDetails=await CANDIDATEBASICDETAILS.findById(candidate.candidate_basic_details)
      
      const obj={
        candidate_full_name:`${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`,
        candidate_email:candidateBasicDetails.primary_email_id,
        candidate_contact_no:candidateBasicDetails.primary_contact_number,
        candidate_id:candidate.candidate_id,
        candidate_status:candidate.candidate_status,
        create_date:candidate.createdAt,
        update_date:candidate.updatedAt
      }

      res.status(200).json(obj)

    }catch(err){
      next(err)
    }
}

export const getCandidateAttachmentFileType=async (req,res,next)=>{
   try{
     const attachment=await CANDIDATEATTACHMENT.findOne({folder_name:req.params.cid})

     let jobAttachmentFileType=null
     switch(req.params.filetype){
         case "evaluation_form":
          jobAttachmentFileType=attachment.evaluation_form.filetype
          break;

         case "audio_brief":
          jobAttachmentFileType=attachment.audio_brief.filetype
          break;

         case "other_docs":
          jobAttachmentFileType=attachment.other_docs.filetype
          break;

         default:
          break;
     }

     res.status(200).json(jobAttachmentFileType)

   }catch(err){
     next(err)
   }
}