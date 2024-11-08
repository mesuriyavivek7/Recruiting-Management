import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js"
import JOBS from "../models/JOBS.js";
import CANDIDATE from "../models/CANDIDATE.js";
import bcrypt from 'bcryptjs'
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";


export const createEnterpriseTeam = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);
    const newenterprisemember = new ENTERPRISETEAM({ ...req.body, password: hash })
    await newenterprisemember.save()
    res.status(200).json("New enterprise team member created")
  } catch (err) {
    next(err)
  }
}


export const checkCreadentials = async (req, res, next) => {
  try {
    const user = await ENTERPRISETEAM.findOne({ $or: [{ mobileno: req.body.mobileno }, { email: req.body.email }] })
    if (user) res.status(200).json(true)
    else res.status(200).json(false)
  } catch (err) {
    next(err)
  }
}

export const getCandidateDetails = async (req, res, next) => {
  try {
    // Fetch job data with candidate profiles for the given enterprise member
    const candidateList = await JOBS.find(
      { enterprise_member_id: req.params.enmemeberid },
      { posted_candidate_profiles: 1, _id: 0 }
    );

    const allCandidateDetails = [];


    await Promise.all(
      candidateList.map(async (outer) => {
        await Promise.all(
          outer.posted_candidate_profiles.map(async (element) => {
            // Fetch candidate details
            const candidate = await CANDIDATE.findById(element);

            // Fetch candidate basic details
            const candidatebasicdetails = await CANDIDATEBASICDETAILS.findOne({
              candidate_id: candidate.candidate_id,
            });

            //Fetch job status
            const job = await JOBS.findOne({
              job_id: candidate.job_id
            }, {
              job_status: 1, _id: 0
            });

            // Fetch job basic details
            const jobbasicdetails = await JOBBASICDETAILS.findOne({
              job_id: candidate.job_id,
            });

            // Fetch recruiter member name
            const recruiterteam = await RECRUITINGTEAM.findById(
              candidate.recruiter_member_id,
              { _id: 0, full_name: 1 }
            );

            // Create the candidate object
            let candidateObj = {
              id: candidate._id,
              candidate_id: candidate.candidate_id,
              candidate_full_name: `${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
              candidate_status: candidate.candidate_status,
              submited: candidate.createdAt,
              updated: candidate.updatedAt,
              notice_period: candidatebasicdetails.notice_period,
              candidate_mobile_number: candidatebasicdetails.primary_contact_number,
              candidate_email_address: candidatebasicdetails.primary_email_id,
              remarks: candidate.remarks,
              recruiter_name: recruiterteam.full_name,
              job_id: jobbasicdetails.job_id,
              job_title: jobbasicdetails.job_title,
              job_country: jobbasicdetails.country,
              job_city: jobbasicdetails.city[0],
              job_status: job.job_status
            };

            allCandidateDetails.push(candidateObj);
          })
        );
      })
    );

    // Return the fetched candidate details
    res.status(200).json(allCandidateDetails);
  } catch (err) {
    next(err);
  }
};


export const addNewCandidate = async (req, res, next) => {
  try {
    const { candidateId, jobId } = req.body
    await ENTERPRISETEAM.findByIdAndUpdate(req.params.enmemberid, { $push: { received_candidates: { candidateId, jobId } } })
    res.status(200).json("Added candidateid and jobid into received candidate list")
  } catch (err) {
    next(err)
  }
}


export const getRecruiterTeamMember = async (req, res, next) => {
  try {
    const candidates = await ENTERPRISETEAM.findById(req.params.enmemberid, { _id: 0, received_candidates: 1 })

    const recruiterData = await Promise.all(candidates.received_candidates.map(async (obj) => {
      const candidatedetails = await CANDIDATE.findById(obj.candidateId)
      const recruiterfullname = await RECRUITINGTEAM.findById(candidatedetails.recruiter_member_id, { full_name: 1, _id: 0 })
      const candidatebasic = await CANDIDATEBASICDETAILS.findById(candidatedetails.candidate_basic_details)
      const jobbasicdetails = await JOBBASICDETAILS.findOne({ job_id: candidatedetails.job_id })
      return (
        {
          id: candidatedetails.recruiter_member_id,
          full_name: recruiterfullname.full_name,
          candidate_id: candidatedetails.candidate_id,
          candidate_full_name: `${candidatebasic.first_name} ${candidatebasic.last_name}`,
          job_id: candidatedetails.job_id,
          job_title: jobbasicdetails.job_title
        }
      )
    }))

    res.status(200).json(recruiterData)
  } catch (err) {
    next(err)
  }
}

export const checkIsAdmin = async (req, res, next) => {
  try {
    const check = await ENTERPRISETEAM.findById(req.params.eid)
    if (check.isAdmin) res.status(200).json(true)
    else res.status(200).json(false)
  } catch (err) {
    next(err)
  }
}

export const changeAccountStatus = async (req, res, next) => {
  try {
    await ENTERPRISETEAM.findByIdAndUpdate(req.params.eid, { $set: { account_status: req.body.status } })
    res.status(200).json("Enterprise account status changed successfully")
  } catch (err) {
    next(err)
  }
}

export const getSubmitedCandidateMailId = async (req, res, next) => {
  try {
    const member = await ENTERPRISETEAM.findById(req.params.ememberid)

    const candidates = await Promise.all(member.received_candidates.map(async (candidate) => {
      const candidatedetails = await CANDIDATE.findById(candidate.candidateId)
      const candiadteBasicDetails = await CANDIDATEBASICDETAILS.findById(candidatedetails.candidate_basic_details)
      return candiadteBasicDetails.primary_email_id
    }))

    res.status(200).json(candidates)

  } catch (err) {
    next(err)
  }
}

export const getEnterpriseTeam = async (req, res, next) => {
  try {
    const { enterprise_id } = req.params;

    const teamMembers = await ENTERPRISETEAM.find({ enterprise_id })

    if (teamMembers.length === 0) {
      return res.status(404).json({ message: 'No team members found for this enterprise.' });
    }
    return res.status(200).json(teamMembers);

  } catch (error) {
    next(error);
  }
}

export const getOneEnterpriseMember=async (req,res,next)=>{
  try{
    const enmember=await ENTERPRISETEAM.findById(req.params.enmemberid)
    res.status(200).json(enmember)
  }catch(err){
    next(err)
  }
}

export const getDashboardCount=async (req,res,next)=>{
  try{
    const all_jobs_count=await JOBS.countDocuments({enterprise_member_id:req.params.enmemberid,isDraft:false})
    const active_jobs=await JOBS.countDocuments({enterprise_member_id:req.params.enmemberid,job_status:"Active"})
    const pending_jobs=await JOBS.countDocuments({enterprise_member_id:req.params.enmemberid,job_status:"Pending"})

    res.status(200).json({
      all_jobs_count,
      active_jobs,
      pending_jobs
    })

  }catch(err){
    next(err)
  }
}