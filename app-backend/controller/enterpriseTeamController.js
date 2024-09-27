import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js"
import JOBS from "../models/JOBS.js";
import CANDIDATE from "../models/CANDIDATE.js";
import bcrypt from 'bcryptjs'
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";


export const createEnterpriseTeam=async (req,res,next)=>{
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);
    const newenterprisemember=new ENTERPRISETEAM({...req.body,password:hash})
    await newenterprisemember.save()
    res.status(200).json("New enterprise team member created")    
  }catch(err){
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

    // Use Promise.all to resolve all promises before proceeding
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
            const job=await JOBS.findOne({
              job_id:candidate.job_id},{job_status:1,_id:0
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
              id:candidate._id,
              candidate_id: candidate.candidate_id,
              candidate_full_name: `${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
              candidate_status: candidate.candidate_status,
              submited: candidate.createdAt,
              updated: candidate.updatedAt,
              notice_period: candidatebasicdetails.notice_period,
              candidate_mobile_number: candidatebasicdetails.primary_contact_number,
              candidate_email_address: candidatebasicdetails.primary_email_id,
              remarks:candidate.remarks,
              recruiter_name: recruiterteam.full_name,
              job_id: jobbasicdetails.job_id,
              job_title: jobbasicdetails.job_title,
              job_country: jobbasicdetails.country,
              job_city: jobbasicdetails.city[0],
              job_status:job.job_status
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
