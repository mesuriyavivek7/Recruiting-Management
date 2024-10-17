import { response } from "express";
import CANDIDATE from "../models/CANDIDATE.js";
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";

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

export const getCandidateStatusById = async (req, res, next) => {
  try {
    const basicDetailId = req.params.basicDetailId;

    // Find the candidate by candidate_basic_details in the candidatebasicdetails collection
    const candidateBasicDetail = await CANDIDATEBASICDETAILS.findOne({
      _id: basicDetailId
    });

    if (!candidateBasicDetail) {
      return res.status(404).json({ message: "Candidate basic details not found" });
    }

    // Now use the candidate_id to find the corresponding candidate in the CANDIDATES table
    const candidate = await CANDIDATE.findOne({
      candidate_basic_details: basicDetailId
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found in CANDIDATES table" });
    }

    return res.status(200).json({ status: candidate.candidate_status });
  } catch (error) {
    next(error);
  }
}