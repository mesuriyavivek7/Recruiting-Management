import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import JOBS from "../models/JOBS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js";
import JOBDRAFTS from "../models/JOBDRAFTS.js";
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js";
import JOBSQ from "../models/JOBSQ.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";
import { filterOutLiveJobs } from "../helper/filterJobs.js";
import path from 'path'
import { fileURLToPath } from 'url';
import fs, { stat } from 'fs'
import pdfparse from 'pdf-parse'
import mammoth from 'mammoth'

import axios from 'axios'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createJobs = async (req, res, next) => {
  try {
    //check job is already exist or not
    let job = await JOBS.findOne({ job_id: req.body.job_id })
    if (!job) {
      const newjob = new JOBS(req.body)
      await newjob.save()
      job = newjob
    }
    return res.status(200).json(job)
  } catch (err) {
    next(err)
  }
}



export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JOBS.find().populate('job_basic_details').exec();
    // const jobBasicDetail = await JOBBASICDETAILS.find();


    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

export const getMainJobDetails = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobId })
    if (job) return res.status(200).json(job)
    else return res.status(200).json(null)
  } catch (err) {
    next(err)
  }
}


export const allotedJobToAcManager = async (req, res, next) => {
  try {
    await JOBS.findByIdAndUpdate(req.params.orgid, { $set: { isDraft: false, job_status: "Pending", alloted_account_manager: req.body.ac_id } })
    res.status(200).json("Sucessfully allocated to account manager")
  } catch (err) {
    next(err)
  }
}

export const activateJob = async (req, res, next) => {
  try {
    await JOBS.findByIdAndUpdate(req.params.orgid, { $set: { job_status: "Active" } })
    res.status(200).json("Successfully activated job")
  } catch (err) {
    next(err)
  }
}

export const getAllJobDetails = async (req, res, next) => {
  try {
    const searchQuery = req.query.title || ''

    //Filter job by enterprise id
    const jobsData = await JOBS.find({ enterprise_member_id: req.params.enmemberid, isDraft: false }, { job_id: 1, _id: 0 })

    const jobsDataEnid = jobsData.map((item) => item.job_id)

    //Filter job by job title
    const jobsDataTitle = await JOBBASICDETAILS.find({ job_title: { $regex: searchQuery, $options: 'i' } }, { job_id: 1, _id: 0 })

    //merger this both jobs
    const filterJobId = jobsDataTitle.filter((item) => {
      if (jobsDataEnid.includes(item.job_id)) return item.job_id
    })

    const jobId = filterJobId.map((item) => item.job_id)

    const mydata = await Promise.all(jobId.map(async (item) => {
      const job = await JOBS.findOne({ job_id: item })
      const basicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)
      const { job_title, country, city } = basicDetails
      return (
        {
          orgjobid: job._id,
          job_id: item,
          job_title,
          createdAt: job.createdAt,
          job_status: job.job_status,
          country,
          city
        }
      )
    }))
    res.status(200).json(mydata)
  } catch (err) {
    next(err)
  }
}

export const getAllJobDraftDetails = async (req, res, next) => {
  try {
    const searchQuery = req.query.title || ''

    //Filter job by enterprise id
    const jobsData = await JOBS.find({ enterprise_member_id: req.params.enmemberid, isDraft: true }, { job_id: 1, _id: 0 })

    const jobsDataEnid = jobsData.map((item) => item.job_id)

    //Filter job by job title
    const jobsDataTitle = await JOBBASICDETAILS.find({ job_title: { $regex: searchQuery, $options: 'i' } }, { job_id: 1, _id: 0 })

    //merger this both jobs
    const filterJobId = jobsDataTitle.filter((item) => {
      if (jobsDataEnid.includes(item.job_id)) return item.job_id
    })

    const jobId = filterJobId.map((item) => item.job_id)

    const mydata = await Promise.all(jobId.map(async (item) => {
      const job = await JOBS.findOne({ job_id: item })
      const basicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)
      const { job_title, country, city } = basicDetails
      return (
        {
          orgjobid: job._id,
          job_id: item,
          createdAt: job.createdAt,
          job_title,
          country,
          city
        }
      )
    }))
    res.status(200).json(mydata)
  } catch (err) {
    next(err)
  }
}


export const deleteJobDraftWithOtherDetails = async (req, res, next) => {
  try {
    await JOBBASICDETAILS.deleteOne({ job_id: req.params.jobid })
    await JOBCOMMISSION.deleteOne({ job_id: req.params.jobid })
    await JOBSOURCINGDETAILS.deleteOne({ job_id: req.params.job_id })
    //removing folder of job docs 
    if (fs.existsSync(`uploads/jobdocs/${req.params.jobid}`)) fs.rmSync(`uploads/jobdocs/${req.params.jobid}`, { recursive: true, force: true })
    await JOBATTACHEMENT.deleteOne({ folder_name: req.params.jobid })
    await JOBDRAFTS.deleteOne({ job_id: req.params.jobid })
    await JOBSQ.deleteOne({ job_id: req.params.jobid })
    await JOBCOMPANYINFO.deleteOne({ job_id: req.params.jobid })
    await JOBS.deleteOne({ job_id: req.params.jobid })
    res.status(200).json("Deleted Drat and other job details")
  } catch (err) {
    next(err)
  }
}



export const getFrontMappedJobDetails = async (req, res, next) => {
  const { searchTearm, locations, domains, jobType } = req.query

  const domainsArray = domains ? domains.split(",") : null
  const locationArray = locations ? locations.split(",") : null

  try {
    // getting mapped job list data for a particular recruiting team member
    const joblist = await RECRUITINGTEAM.findById(req.params.rteamid, { _id: 0, mapped_jobs: 1 });

    if (!joblist) {
      return res.status(404).json({ error: "Recruiting team not found" });
    }

    const mappedjobs = await Promise.all(
      joblist.mapped_jobs.map(async (item) => {
        try {
          // get job id and allotted account manager id for the original job id
          const jobObj = await JOBS.findOne({_id:item , job_status:'Active'}, { job_id: 1, alloted_account_manager: 1, mark_hot_job: 1, _id: 1 });
          if (!jobObj) {
            return null
          }

          const basicdetails = await JOBBASICDETAILS.findOne({ job_id: jobObj.job_id });

          const handleCheckJobType = () => {
            if (jobType === "All") return true
            else if (jobType === "Hot" && jobObj.mark_hot_job) return true
            else if (jobType == 'Remote' && basicdetails.permanent_remote_work) return true
            else return false
          }


          const titleMatch = searchTearm ? new RegExp(searchTearm, 'i').test(basicdetails.job_title) : true
          const locationMatch = locationArray ? locationArray.includes(basicdetails.country) : true
          const domainMatch = domainsArray ? domainsArray.includes(basicdetails.job_domain) : true
          const jobTypeMatch = handleCheckJobType()

          if (titleMatch && locationMatch && domainMatch && jobTypeMatch) {
            const commision = await JOBCOMMISSION.findOne({ job_id: jobObj.job_id });
            const company = await JOBCOMPANYINFO.findOne({ job_id: jobObj.job_id });

            if (!basicdetails || !commision || !company) {
              throw new Error("Job details missing");
            }

            // request to admin server for account manager email
            const acmanagerResponse = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/acmanageremail/${jobObj.alloted_account_manager}`);
            const acmanageremail = acmanagerResponse.data.email;

            // build response object
            const result = {
              orgjobid: jobObj._id,
              job_id: jobObj.job_id,
              job_title: basicdetails.job_title,
              isRemoteWork: basicdetails.permanent_remote_work,
              country: basicdetails.country,
              city: basicdetails.city,
              positions: basicdetails.positions,
              experience: basicdetails.experience,
              domain: basicdetails.job_domain,
              cp_name: company.client_visibility==='Visible'?company.client_name:null,
              ac_manager: acmanageremail,
              work_type: commision.work_type,
              isHotJob: jobObj.mark_hot_job,
              // additional logic based on work_type (full_time or contract)
              ...(commision.work_type === "full_time"
                ? commision.work_details.full_time.full_time_salary_type === "Fixed"
                  ? {
                    full_time_salary_type: "Fixed",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    fixed_salary: commision.work_details.full_time.fixed_salary,
                  }
                  : {
                    full_time_salary_type: "Range",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    min_salary: commision.work_details.full_time.min_salary,
                    max_salary: commision.work_details.full_time.max_salary,
                  }
                : commision.work_details.contract.contract_pay_rate_type === "Fixed"
                  ? {
                    contract_pay_rate_type: "Fixed",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    fix_contract_pay: commision.work_details.contract.fix_contract_pay,
                  }
                  : {
                    contract_pay_rate_type: "Range",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    min_contract_pay: commision.work_details.contract.min_contract_pay,
                    max_contract_pay: commision.work_details.contract.max_contract_pay,
                  }),
              commission_type: commision.commission_details.commission_type,
              commission_pay_out:
                commision.commission_details.commission_type === "Percentage"
                  ? commision.commission_details.commission_percentage_pay
                  : commision.commission_details.commission_fix_pay,
            };

            return result;
          } else {
            return null
          }
        } catch (err) {
          // Handle the error for this specific job
          console.error(`Error processing job ${item}:`, err.message);
          return null; // Skip this job if there's an error
        }
      })
    );


    // Filter out any null responses (failed jobs)
    const filteredJobs = mappedjobs.filter((job) => job !== null);

    res.status(200).json(filteredJobs);
  } catch (err) {
    // Handle any general errors
    next(err);
  }

}



export const getFrontAcceptedJobDetails = async (req, res, next) => {
  const { searchTearm, locations, domains, jobType } = req.query

  const domainsArray = domains ? domains.split(",") : null
  const locationArray = locations ? locations.split(",") : null

  try {
    // getting accepted job list data for a particular recruiting team member
    const joblist = await RECRUITINGTEAM.findById(req.params.rteamid, { _id: 0, accepted_jobs: 1 });

    console.log(joblist)

    if (!joblist) {
      return res.status(404).json({ error: "Accepted jobs not found" });
    }

    const acceptedjobs = await Promise.all(
      joblist.accepted_jobs.map(async (item) => {
        try {
          // get job id and allotted account manager id for the original job id
          const jobObj = await JOBS.findOne({_id:item,job_status:'Active'}, { job_id: 1, job_updates: 1, alloted_account_manager: 1, _id: 1 });

          if (!jobObj) {
            return null
          }

          const basicdetails = await JOBBASICDETAILS.findOne({ job_id: jobObj.job_id });

          const handleCheckJobType = () => {
            if (jobType === "All") return true
            else if (jobType === "Hot" && jobObj.mark_hot_job) return true
            else if (jobType == 'Remote' && basicdetails.permanent_remote_work) return true
            else return false
          }

          const titleMatch = searchTearm ? new RegExp(searchTearm, 'i').test(basicdetails.job_title) : true
          const locationMatch = locationArray ? locationArray.includes(basicdetails.country) : true
          const domainMatch = domainsArray ? domainsArray.includes(basicdetails.job_domain) : true
          const jobTypeMatch = handleCheckJobType()

          if (titleMatch && locationMatch && domainMatch && jobTypeMatch) {
            const commision = await JOBCOMMISSION.findOne({ job_id: jobObj.job_id });
            const company = await JOBCOMPANYINFO.findOne({ job_id: jobObj.job_id });

            if (!basicdetails || !commision || !company) {
              throw new Error("Job details missing");
            }
            // for resume submit count
            const resumeSubmitCount = await axios.get(`${process.env.APP_SERVER_URL}/candidate/jobresumesubmitcount/${jobObj.job_id}/${req.params.rteamid}`)

            // check for current job is favourite for rmember
            const isFavouriteJob = await axios.get(`${process.env.APP_SERVER_URL}/recruitingteam/isfavouritejob/${item}/${req.params.rteamid}`)

            // request to admin server for account manager email
            const acmanagerResponse = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/acmanageremail/${jobObj.alloted_account_manager}`);
            const acmanageremail = acmanagerResponse.data.email;

            // build response object
            const result = {
              orgjobid: jobObj._id,
              job_id: jobObj.job_id,
              job_title: basicdetails.job_title,
              country: basicdetails.country,
              city: basicdetails.city,
              isRemoteWork: basicdetails.permanent_remote_work,
              isHotJob: jobObj.mark_hot_job,
              resumeSubmitCount: resumeSubmitCount.data,
              resume_required:jobObj.resume_required,
              jobUpdates: jobObj.job_updates,
              isFavouriteJob: isFavouriteJob.data,
              positions: basicdetails.positions,
              experience: basicdetails.experience,
              domain: basicdetails.job_domain,
              cp_name: company.client_visibility==="Visible"?company.client_name:null,
              ac_manager: acmanageremail,
              work_type: commision.work_type,
              // additional logic based on work_type (full_time or contract)
              ...(commision.work_type === "full_time"
                ? commision.work_details.full_time.full_time_salary_type === "Fixed"
                  ? {
                    full_time_salary_type: "Fixed",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    fixed_salary: commision.work_details.full_time.fixed_salary,
                  }
                  : {
                    full_time_salary_type: "Range",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    min_salary: commision.work_details.full_time.min_salary,
                    max_salary: commision.work_details.full_time.max_salary,
                  }
                : commision.work_details.contract.contract_pay_rate_type === "Fixed"
                  ? {
                    contract_pay_rate_type: "Fixed",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    fix_contract_pay: commision.work_details.contract.fix_contract_pay,
                  }
                  : {
                    contract_pay_rate_type: "Range",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    min_contract_pay: commision.work_details.contract.min_contract_pay,
                    max_contract_pay: commision.work_details.contract.max_contract_pay,
                  }),
              commission_type: commision.commission_details.commission_type,
              commission_pay_out:
                commision.commission_details.commission_type === "Percentage"
                  ? commision.commission_details.commission_percentage_pay
                  : commision.commission_details.commission_fix_pay,
            };

            return result;
          } else {
            return null
          }
        } catch (err) {
          // Handle the error for this specific job
          console.error(`Error processing job ${item}:`, err.message);
          return null; // Skip this job if there's an error
        }
      })
    );

    // Filter out any null responses (failed jobs)
    const filteredJobs = acceptedjobs.filter((job) => job !== null);

    res.status(200).json(filteredJobs);

  } catch (err) {
    next(err)
  }
}


export const getFrontFavouriteJobs = async (req, res, next) => {
  const { searchTearm, locations, domains, jobType } = req.query

  const domainsArray = domains ? domains.split(",") : null
  const locationArray = locations ? locations.split(",") : null
  try {
    //Getting favourite jobs for particluar recruiting member
    const joblist = await axios.get(`${process.env.APP_SERVER_URL}/recruitingteam/getfavouritejobids/${req.params.rteamid}`)

    if (!joblist.data) {
      return res.status(404).json({ error: "Favourite jobs not found" });
    }


    const favouritejobs = await Promise.all(
      joblist.data.map(async (item) => {
        try {
          // get job id and allotted account manager id for the original job id
          const jobObj = await JOBS.findOne({_id:item,job_status:'Active'}, { job_id: 1, job_updates: 1, alloted_account_manager: 1, _id: 1 });
          if (!jobObj) {
            return null
          }

          const basicdetails = await JOBBASICDETAILS.findOne({ job_id: jobObj.job_id });

          const handleCheckJobType = () => {
            if (jobType === "All") return true
            else if (jobType === "Hot" && jobObj.mark_hot_job) return true
            else if (jobType == 'Remote' && basicdetails.permanent_remote_work) return true
            else return false
          }


          const titleMatch = searchTearm ? new RegExp(searchTearm, 'i').test(basicdetails.job_title) : true
          const locationMatch = locationArray ? locationArray.includes(basicdetails.country) : true
          const domainMatch = domainsArray ? domainsArray.includes(basicdetails.job_domain) : true
          const jobTypeMatch = handleCheckJobType()

          if (titleMatch && locationMatch && domainMatch && jobTypeMatch) {
            const commision = await JOBCOMMISSION.findOne({ job_id: jobObj.job_id });
            const company = await JOBCOMPANYINFO.findOne({ job_id: jobObj.job_id });

            if (!basicdetails || !commision || !company) {
              throw new Error("Job details missing");
            }
            // for resume submit count
            const resumeSubmitCount = await axios.get(`${process.env.APP_SERVER_URL}/candidate/jobresumesubmitcount/${jobObj.job_id}/${req.params.rteamid}`)

            // check for current job is favourite for rmember
            const isFavouriteJob = await axios.get(`${process.env.APP_SERVER_URL}/recruitingteam/isfavouritejob/${item}/${req.params.rteamid}`)

            // request to admin server for account manager email
            const acmanagerResponse = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/acmanageremail/${jobObj.alloted_account_manager}`);
            const acmanageremail = acmanagerResponse.data.email;

            // build response object
            const result = {
              orgjobid: jobObj._id,
              job_id: jobObj.job_id,
              job_title: basicdetails.job_title,
              country: basicdetails.country,
              city: basicdetails.city,
              isRemoteWork: basicdetails.permanent_remote_work,
              isHotJob: jobObj.mark_hot_job,
              resumeSubmitCount: resumeSubmitCount.data,
              jobUpdates: jobObj.job_updates,
              isFavouriteJob: isFavouriteJob.data,
              positions: basicdetails.positions,
              experience: basicdetails.experience,
              resume_required:jobObj.resume_required,
              domain: basicdetails.job_domain,
              cp_name: company.client_name,
              ac_manager: acmanageremail,
              work_type: commision.work_type,
              // additional logic based on work_type (full_time or contract)
              ...(commision.work_type === "full_time"
                ? commision.work_details.full_time.full_time_salary_type === "Fixed"
                  ? {
                    full_time_salary_type: "Fixed",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    fixed_salary: commision.work_details.full_time.fixed_salary,
                  }
                  : {
                    full_time_salary_type: "Range",
                    full_time_salary_currency: commision.work_details.full_time.full_time_salary_currency,
                    min_salary: commision.work_details.full_time.min_salary,
                    max_salary: commision.work_details.full_time.max_salary,
                  }
                : commision.work_details.contract.contract_pay_rate_type === "Fixed"
                  ? {
                    contract_pay_rate_type: "Fixed",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    fix_contract_pay: commision.work_details.contract.fix_contract_pay,
                  }
                  : {
                    contract_pay_rate_type: "Range",
                    contract_pay_currency: commision.work_details.contract.contract_pay_currency,
                    contract_pay_cycle: commision.work_details.contract.contract_pay_cycle,
                    min_contract_pay: commision.work_details.contract.min_contract_pay,
                    max_contract_pay: commision.work_details.contract.max_contract_pay,
                  }),
              commission_type: commision.commission_details.commission_type,
              commission_pay_out:
                commision.commission_details.commission_type === "Percentage"
                  ? commision.commission_details.commission_percentage_pay
                  : commision.commission_details.commission_fix_pay,
            };

            return result;
          } else {
            return null
          }
        } catch (err) {
          // Handle the error for this specific job
          console.error(`Error processing job ${item}:`, err.message);
          return null; // Skip this job if there's an error
        }
      })
    );

    // Filter out any null responses (failed jobs)
    const filteredJobs = favouritejobs.filter((job) => job !== null);

    res.status(200).json(filteredJobs);


  } catch (err) {
    next(err)
  }
}


export const getJobAttachmentsDetailsForCandidate = async (req, res, next) => {
  try {
    const jobattachments = await JOBATTACHEMENT.findOne({ folder_name: req.params.jobid }, { evaluation_form: 1, audio_brief: 1, other_docs: 1, _id: 0 })
    res.status(200).json(jobattachments)
  } catch (err) {
    next(err)
  }
}


export const downloadEvaluationForm = async (req, res, next) => {
  try {
    const doc = await JOBATTACHEMENT.findOne({ folder_name: req.params.jobid }, { evaluation_form: 1, _id: 0 })
    if (!doc) return res.status(404).json("File not found..!")
    const filepath = doc.evaluation_form.filepath
    res.download(filepath, doc.evaluation_form.filename)
  } catch (err) {
    next(err)
  }
}

export const getCandidateScreeningQue = async (req, res, next) => {
  try {

    const sq = await JOBSQ.findOne({ job_id: req.params.jobid }, { screening_questions: 1, _id: 0 })
    res.status(200).json(sq.screening_questions)

  } catch (err) {
    next(err)
  }
}

export const addCandidateProfileList = async (req, res, next) => {
  try {
    const updatedJob = await JOBS.findByIdAndUpdate(req.params.jobid, { $addToSet: { posted_candidate_profiles: req.body.orgcid } })
    if(!updatedJob) return res.status(404).json("Job Not found")
    return res.status(200).json("Added candidate into job candidate profile list")
  } catch (err) {
    next(err)
  }
}

export const getJobBasicDetailsForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobBasicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)
      res.status(200).json(jobBasicDetails)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobCompanyDetailsForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobCompanyDetails = await JOBCOMPANYINFO.findById(job.job_company_details)
      res.status(200).json(jobCompanyDetails)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobSourcingGuidelinesForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobSourcingGuidelines = await JOBSOURCINGDETAILS.findById(job.job_sourcing_guidelines)
      res.status(200).json(jobSourcingGuidelines)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobStatusForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid }, { job_status: 1, _id: 0 })
    if (!job) {
      res.status(200).json(job)
    } else {
      res.status(200).json(job.job_status)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobCommissionDetailsForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobcommissiondetails = await JOBCOMMISSION.findById(job.job_commission_details)
      res.status(200).json(jobcommissiondetails)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobScreeningQuestionsForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobsq = await JOBSQ.findById(job.job_screening_questionsa)
      if (jobsq) {
        res.status(200).json(jobsq)
      } else {
        res.status(200).json(null)
      }

    }
  } catch (err) {
    next(err)
  }
}

export const createJobUpdates = async (req, res, next) => {
  try {
    await JOBS.findOneAndUpdate({ job_id: req.params.jobid }, { $push: { job_updates: { text: req.body.text } } })
    res.status(200).json("Created new job update")
  } catch (err) {
    next(err)
  }
}


export const getJobUpdates = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid }, { job_updates: 1, _id: 0 })
    if (!job) {
      res.status(200).json(job)
    } else {
      res.status(200).json(job.job_updates)
    }
  } catch (err) {
    next(err)
  }
}

export const getJobAttachmentsDetailsForPreview = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) {
      res.status(200).json(null)
    } else {
      const jobAttachments = await JOBATTACHEMENT.findById(job.job_attachments)
      res.status(200).json(jobAttachments)
    }
  } catch (err) {
    next(err)
  }
}

export const getAcManagerNameAndMail = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })

    if (job && job.alloted_account_manager) {
      const acdetails = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${job.alloted_account_manager}`)
      res.status(200).json(acdetails.data)
    } else {
      res.status(200).json(null)
    }

  } catch (err) {
    next(err)
  }
}


export const viewJobAttachments = async (req, res, next) => {
  try {
    const { jobid, filename } = req.params
    const filepath = path.join(__dirname, '..', 'uploads', 'jobdocs', jobid, filename)
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json("File not found")
      } else {
        res.sendFile(filepath)
      }
    })
  } catch (err) {
    next(err)
  }
}

export const downloadJobAttachments = async (req, res, next) => {

  try {
    const { filePath, fileName } = req.body
    const fileExist = fs.existsSync(filePath)

    if (fileExist) {
      res.download(filePath, fileName)
    } else {
      res.status(404).json("File path not found.!")
    }
  } catch (err) {
    next(err)
  }
}

export const getJobAttachmentFileType = async (req, res, next) => {
  try {
    const file = await JOBATTACHEMENT.findOne({ folder_name: req.params.jobid })
    let jobAttachFileType = null
    switch (req.params.filetype) {
      case "evaluation_form":
        jobAttachFileType = file.evaluation_form.filetype
        break;

      case "sample_cv":
        jobAttachFileType = file.sample_cv.filetype
        break;

      case "other_docs":
        jobAttachFileType = file.other_docs.filetype
        break;

      case "audio_brief":
        jobAttachFileType = file.audio_brief.filetype
        break;
    }
    res.status(200).json(jobAttachFileType)
  } catch (err) {
    next(err)
  }
}


export const getJobHotMark = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (job && job.mark_hot_job) {
      res.status(200).json(job.mark_hot_job)
    } else {
      res.status(200).json(false)
    }
  } catch (err) {
    next(err)
  }
}

export const changeJobHotMark = async (req, res, next) => {
  try {
    await JOBS.findOneAndUpdate({ job_id: req.params.jobid }, { $set: { mark_hot_job: !req.body.mark } })
    res.status(200).json('Job Mark updated')
  } catch (err) {
    next(err)
  }
}

export const getJobCandidatesForPreview = async (req, res, next) => {

  try {
    let candidate = await JOBS.findOne({ job_id: req.params.jobid }, { posted_candidate_profiles: 1, _id: 0 })

    if (candidate.posted_candidate_profiles) {

      const candidateIds = candidate.posted_candidate_profiles
      let candidateDetails = await Promise.all(candidateIds.map(async (id) => {
        const cdetails = await axios.get(`${process.env.APP_SERVER_URL}/candidate/getcandidatejobpreview/${id}`)
        return cdetails.data
      }))

      res.status(200).json(candidateDetails)
    } else {
      res.status(200).json([])
    }

  } catch (err) {
    next(err)
  }
}

export const getPostedCandidatesByJobId = async (req, res, next) => {
  try {
    const candidates = await JOBS.findOne({ job_id: req.params.jobid });
    if (!candidates) {
      res.status(200).json([]);
    } else {
      return res.status(200).json(candidates.posted_candidate_profiles);
    }
  } catch (error) {
    next(error);
  }
}

export const getLiveJobs = async (req, res, next) => {
  try {
    const { searchTearm, locations, domains, jobType } = req.query
    const jobs = await JOBS.find({ job_status: 'Active' })

    const domainsArray = domains ? domains.split(",") : null
    const locationArray = locations ? locations.split(",") : null

    //Filter out live jobs
    const filterJobs = filterOutLiveJobs(jobs, req.params.rememberid)


    //Filter out jobs on query base
    const queryFilterJobs = await Promise.all(filterJobs.map(async (job) => {
      const jobBasicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)

      const handleCheckJobType = () => {
        if (jobType === "All") return true
        else if (jobType === "Hot" && job.mark_hot_job) return true
        else if (jobType == 'Remote' && jobBasicDetails.permanent_remote_work) return true
        else return false
      }

      const titleMatch = searchTearm ? new RegExp(searchTearm, 'i').test(jobBasicDetails.job_title) : true
      const locationMatch = locationArray ? locationArray.includes(jobBasicDetails.country) : true
      const domainMatch = domainsArray ? domainsArray.includes(jobBasicDetails.job_domain) : true
      const jobTypeMatch = handleCheckJobType()

      if (titleMatch && locationMatch && domainMatch && jobTypeMatch) {
        const jobCommissionDetails = await JOBCOMMISSION.findById(job.job_commission_details)

        const isRequestJob = await axios.get(`${process.env.APP_SERVER_URL}/recruitingteam/checkforrequestjob/${req.params.rememberid}/${job._id}`)
        const accountmanager = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${job.alloted_account_manager}`)

        return {
          job,
          isRequestJob: isRequestJob.data,
          jobBasicDetails,
          jobCommissionDetails,
          acemail: accountmanager.data.email
        }

      } else {
        return null
      }

    }))

    const removeTrashValue = queryFilterJobs.filter((item) => item !== null)

    res.status(200).json(removeTrashValue)

  } catch (err) {
    next(err)
  }
}

export const unMapJob = async (req, res, next) => {
  try {
    const { orgjobid, rememberid } = req.body

    await JOBS.findByIdAndUpdate(orgjobid, { $pull: { accepted_recruiting_agency: rememberid }, $push: { mapped_recruiting_agency_member: rememberid } })
    res.status(200).json("Successfully Job Unmaped.")
  } catch (err) {
    next(err)
  }
}

export const addJobMapRequest = async (req, res, next) => {
  try {
    const { orgjobid, rememberid } = req.body

    await JOBS.findByIdAndUpdate(orgjobid, { $push: { job_request: rememberid } })
    res.status(200).json("Successfull job map requeste added.")
  } catch (err) {
    next(err)
  }
}

export const SearchJobByTitle = async (req, res, next) => {
  const searchQuery = req.query.q;
  try {
    console.log(`Searching for job title: ${searchQuery}`);
    const jobs = await JOBBASICDETAILS.find({ job_title: { $regex: searchQuery, $options: 'i' } });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};


export const SearchPastJobByTitleAndEnMemberId = async (req, res, next) => {
  try {
    const searchQuery = req.query.title || ''

    //Filter job by enterprise id
    const jobsData = await JOBS.find({ enterprise_member_id: req.params.enmemberid, isDraft: false }, { job_id: 1, _id: 0 })

    const jobsDataEnid = jobsData.map((item) => item.job_id)

    //Filter job by job title
    const jobsDataTitle = await JOBBASICDETAILS.find({ job_title: { $regex: searchQuery, $options: 'i' } }, { job_id: 1, _id: 0 })

    //merger this both jobs
    const filterJobId = jobsDataTitle.filter((item) => {
      if (jobsDataEnid.includes(item.job_id)) return item.job_id
    })

    const jobId = filterJobId.map((item) => item.job_id)

    res.status(200).json(jobId)

  } catch (err) {
    next(err)
  }
}


export const getActiveJobCountForEnMember = async (req, res, next) => {
  try {
    const activejobCount = await JOBS.countDocuments({ enterprise_member_id: req.params.enmemberid, job_status: "Active" })
    res.status(200).json(activejobCount)
  } catch (err) {
    next(err)
  }
}


export const searchJobRecruiter = async (req, res, next) => {
  const { searchTearm } = req.query
  try {
    if (searchTearm) {
      const jobs = await JOBS.find({ job_status: 'Active' })

      //Filter out live jobs
      const filterJobs = filterOutLiveJobs(jobs, req.params.rememberid)

      //Filter out job on query base
      const queryFilter = await Promise.all((filterJobs.map(async (job) => {
        const jobBasicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)

        const titleMatch = searchTearm ? new RegExp(searchTearm.toLowerCase(), 'i').test(jobBasicDetails.job_title.toLowerCase()) : false

        return titleMatch ? jobBasicDetails : null
      })))

      //Remove null values
      const jobDetails = queryFilter.filter((job) => job !== null)

      res.status(200).json(jobDetails)
    } else {
      return res.status(200).json([])
    }

  } catch (err) {
    next(err)
  }
}


export const searchJobEnterprise = async (req, res, next) => {
  const { searchTearm } = req.query
  try {
    if (searchTearm) {
      const jobs = await JOBS.find({ enterprise_member_id: req.params.enmemberid })

      //Filter out jobs
      const filterJobs = await Promise.all(jobs.map(async (job) => {
        const basicDetails = await JOBBASICDETAILS.findById(job.job_basic_details)

        const titleMatch = searchTearm ? new RegExp(searchTearm.toLowerCase(), 'i').test(basicDetails.job_title.toLowerCase()) : false

        if (titleMatch) {
          return {
            job_id: basicDetails.job_id,
            job_title: basicDetails.job_title,
            job_status: job.job_status,
            job_country: basicDetails.country,
            job_state: basicDetails.state
          }
        } else {
          return null
        }
      }))

      //Remove null values
      const jobDetails = filterJobs.filter((item) => item !== null)
      res.status(200).json(jobDetails)
    } else {
      return res.status(200).json([])
    }
  } catch (err) {
    console.log(err)
  }
}

export const getPendingJobCountForEnMember = async (req, res, next) => {
  try {
    const pendingJobCount = await JOBS.countDocuments({ enterprise_member_id: req.params.enmemberid, job_status: "Pending" })
    res.status(200).json(pendingJobCount)
  } catch (err) {
    next(err)
  }
}

export const getAllotedAcManagerId = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobId, job_status: "Active" })
    if (!job) return res.status(200).json(null)
    else return res.status(200).json(job.alloted_account_manager)
  } catch (err) {
    next(err)
  }
}

export const addCandidateIntoEnMemberReceivedList = async (req, res, next) => {
  try {
    const job = await JOBS.findById(req.body.jobid)

    //For adding candidate id and jobid into enterprise received list
    if(job.enterprise_id && job.enterprise_member_id){
      try{
        await axios.put(`${process.env.APP_SERVER_URL}/enterpriseteam/addintocandidatelist/${job.enterprise_member_id}`, { candidateId: req.body.cid, jobId: req.body.jobid })
      }catch(err){
        console.log(err)
        return res.status(500).json({error:"failed to add candidate into verified list"})
      }
    }
    
    res.status(200).json("Candidate added into received list")
  } catch (err) {
    next(err)
  }
}

export const getMappedRecruiterMemberIds = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid })
    if (!job) return res.status(200).json([])
    else return res.status(200).json(job.mapped_recruiting_agency_member)
  } catch (err) {
    next(err)
  }
}

export const getRequestedRecruiterIds = async (req, res, next) => {
  try {
    const job = await JOBS.findOne({ job_id: req.params.jobid });
    if (!job) return res.status(200).json([]);
    else
      return res.status(200).json(job?.job_request);
  } catch (error) {
    next(error);
  }
}

export const getAcceptedRecruiterIds = async (req, res, next) => {
    try{
       const job = await JOBS.findOne({job_id: req.params.jobid})
       if(!job) return res.status(200).json([])
       else return res.status(200).json(job?.accepted_recruiting_agency)
    }catch(err){
      next(err)
    }
}

export const addRecruiterMemberIntoMappedList = async (req, res, next) => {
   try{
     const {reMemberIds}=req.body
     
     const job=await JOBS.findOneAndUpdate({job_id:req.params.jobid},{$push:{mapped_recruiting_agency_member:{$each: reMemberIds}}},{new:true})

     await Promise.all(reMemberIds.map(async (reid)=>{
        await axios.put(`${process.env.APP_SERVER_URL}/recruitingteam/addjobmappedlist/${reid}/${job._id}`)
     }))

     res.status(200).json("New Recruiter Member Ids added")

   }catch(err){
     next(err)
   }
}

export const convertFromRequestedToMapped = async (req, res, next) => {
   try{
     const {reMemberIds} = req.body
     const {jobid} = req.params
     
     const job = await JOBS.findOne({job_id:jobid})

     if(job){
         const requestedMembers = job.job_request
         
        //Update requested members
        const filterRequestMembers = requestedMembers.filter((item)=>{
             return !reMemberIds.includes(item)
        })

        //Update job requested member list
        await JOBS.updateOne({job_id:jobid},{$set:{job_request:filterRequestMembers}})
     }

     res.status(200).json("Successfully recruiter member ids change into requested sections")
     
   }catch(err){
     next(err)
   }
}

export const removeRememberFromMappedList = async (req, res, next) =>{
    try{
      const {rememberid,jobid} = req.params
      const job=await JOBS.findOneAndUpdate({job_id:jobid},{$pull:{mapped_recruiting_agency_member:rememberid}},{new:true})
      //Remove jobid from the recruiter member mapped list
      await axios.put(`${process.env.APP_SERVER_URL}/recruitingteam/removejobmappedlist/${rememberid}/${job._id}`)
      res.status(200).json("Successfully job removed")
    }catch(err){
      next(err)
    }
}

export const getOrgJobId = async (req, res, next) =>{
   try{
     const orgjobid = await JOBS.findOne({job_id:req.params.job_id})
     if(!orgjobid) return res.status(404).json("Job not found")
     
     res.status(200).json(orgjobid._id)
   }catch(err){ 
     next(err)
   }
}


export const addRememberIntoAcceptedList = async (req, res , next) =>{
    try{
      const {orgjobid,rememberid} = req.body
      await JOBS.findByIdAndUpdate(orgjobid,{$pull:{job_request:rememberid},$push:{accepted_recruiting_agency:rememberid}})

      res.status(200).json("added remember into accepted list")
    }catch(err){
       next(err)
    }
}

export const getJdContent = async (req, res, next) =>{
  try{
     const file = req.file
     let content = ''

     if(file.mimetype === 'application/pdf'){
       const pdfBuffer = fs.readFileSync(file.path)
       const pdfDoc = await pdfparse(pdfBuffer)
       const text = pdfDoc.pageData ? pdfDoc.pageData.join(" ") : data.text;

       content = text

     }else if(file.mimetype === 'application/msword' ||
     file.mimetype ===
       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        const dataBuffer = fs.readFileSync(file.path)
        const result = await mammoth.extractRawText({buffer:dataBuffer})
        content = result.value
    }else{
      fs.unlinkSync(file.path)
      return res.status(400).json("Unsupported file type")
    }

    fs.unlinkSync(file.path)

    res.status(200).json(content)
  }catch(err){
     next(err)
  }
}


export const getJobStatus = async (req, res, next)=>{
   try{
     const jobStatus = await JOBS.findOne({job_id:req.params.job_id})

     if(!jobStatus) return res.status(400).json("Job Status is not found")

     res.status(200).json(jobStatus.job_status)
   }catch(err){
     next(err)
   }
}


export const changeJobStatus = async (req, res, next)=>{
  try{
     const {job_id,job_status} = req.params
     await JOBS.findOneAndUpdate({job_id},{$set:{job_status}})
     res.status(200).json("Job Updated successfully")
  }catch(err){
     next(err)
  }
}

export const handleUploadResumeRequired = async (req, res, next)=>{
  try{
     const {orgjobid,resumerequired} = req.params

     await JOBS.findByIdAndUpdate(orgjobid,{resume_required:resumerequired})
     res.status(200).json("Successfully updated resume required details.")
  }catch(err){
     next(err)
  }
}

export const getResumeRequiredCount = async (req, res, next) =>{
   try{
      const job = await JOBS.findById(req.params.orgjobid)
      if(!job) return res.status(400).json("Job not found.")
      res.status(200).json(job.resume_required)
   }catch(err){
     next(err)
   }
}

export const allocatedAcmanagerToAcJob = async (req, res, next) =>{
  try{
     const {orgjobid, acmanagerid} = req.params

     if(!orgjobid || !acmanagerid) return res.status(404).json({message:"Org job or acmanagerid id is not found."})

     const updateJob = await JOBS.findByIdAndUpdate(orgjobid,{$set:{alloted_account_manager:acmanagerid}})
     
     if(!updateJob) return res.status(404).json({message:"Job not found"})

     return res.status(200).json({message:"acmanager job is attached with acmanager"})
     
  }catch(err){
    next(err)
  }
}

//All delete operation

export const deleteJob = async (req, res, next) =>{
  try{
    const {jobid} = req.params
  
    await JOBS.findOneAndDelete({job_id:jobid})

    return res.status(200).json({message:"job deleted successfully"})
     
  }catch(err){
   next(err)
  }
}

export const deleteJobBasicDetails = async (req, res, next) =>{
  try{
    const {jobid} = req.params

    await JOBBASICDETAILS.findOneAndDelete({job_id:jobid})

    return res.status(200).json({message:"Job basic details deleted"})
  }catch(err){
    next(err)
  }
}


export const deleteJobCommissionDetails = async (req, res, next) =>{
  try{
     const {jobid} = req.params

     await JOBCOMMISSION.findOneAndDelete({job_id:jobid})

     return res.status(200).json({message:"Job commission details deleted"})
  }catch(err){
   next(err)
  }
}


export const deleteCompanyDetails = async (req, res, next)=>{
  try{
   const {jobid} = req.params

   await JOBCOMPANYINFO.findOneAndDelete({job_id:jobid})

   return res.status(200).json({message:"Job Company details deleted"})
  }catch(err){
   next(err)
  }
}

export const deleteJobSourcingDetails = async (req, res, next) =>{
  try{
   const {jobid} = req.params

   await JOBSOURCINGDETAILS.findOneAndDelete({job_id:jobid})

   return res.status(200).json({message:"Job Sourcing details deleted"})
  }catch(err){
   next(err)
  }
}

export const deleteJobAttachments = async (req, res, next) =>{
 try{
    const {jobid} = req.params

    const jobAttachments =  await JOBATTACHEMENT.findOne({folder_name:jobid})

    if(!jobAttachments) return res.status(200).json("This mentioned job with jobid is not exist")

   const folderPath = path.join(__dirname,'..','uploads','jobdocs',jobid)

   if(!fs.existsSync(folderPath)) return res.status(404).json("Folder not found.")

   fs.rm(folderPath, { recursive: true, force: true }, (err) => {
     if (err) {
       return res.status(500).json({ message: 'Failed to delete folder' });
     }
   });

   await JOBATTACHEMENT.findOneAndDelete({folder_name:jobid})

   return res.status(200).json({message: 'Job Attachment, files, and folder deleted successfully'})

 }catch(err){
   next(err)
 }
}

export const deleteJobSQ = async (req, res, next) =>{
  try{
   const {jobid} = req.params

   await JOBSQ.findOneAndDelete({job_id:jobid})

   return res.status(200).json({message:"Job SQ details deleted"})
  }catch(err){
   next(err)
  }
}

export const getAcManagerJob = async (req, res, next) =>{
  try{
    const {acid} = req.params

    if(!acid) return res.status(400).json({message:"Ac manager id is not given."})

    const jobs = await JOBS.find({
      alloted_account_manager: acid,
      $or: [
        { enterprise_id: { $exists: false } }, 
        { enterprise_id: null },
        { enterprise_member_id: { $exists: false } }, 
        { enterprise_member_id: null }
      ]
    }).populate('job_basic_details');

    return res.status(200).json({message:"All jobs retrived",data:jobs})

  }catch(err){
   next(err)
  }
}


export const getJobByJobId = async (req, res, next) =>{
  try{
    const {jobid} = req.params

    const job = await JOBS.findOne({job_id:jobid})
    .populate('job_basic_details')
    .populate('job_commission_details')
    .populate('job_company_details')
    .populate('job_sourcing_guidelines')
    .populate('job_attachments')
    .populate('job_screening_questionsa')

    if(!job) return res.status(200).json({message:"Job not found."})

    return res.status(200).json({message:"Job retrived",data:job})

  }catch(err){
     next(err)
  }
}


export const getDashboardCount = async (req, res, next) =>{
  try{
     const {jobid} = req.params

     const job = await JOBS.findOne({job_id:jobid})
     if(!job) return res.status(404).json({message:"Job not found."})

     return res.status(200).json({
       data:{
         candidateCount:job.posted_candidate_profiles.length,
         mappedRecruiterCount:job.mapped_recruiting_agency_member.length,
         requestedRecruiterCount:job.job_request.length,
         acceptedRecruiterCount:job.accepted_recruiting_agency.length
       },
       message:"All acmanager jobs counts retrived."
     })

  }catch(err){
   next(err)
  }
}


export const getAcceptedJobBasicDetails = async (req, res, next) => {
  try {
    const { rteamid } = req.params;

    if (!rteamid) {
      return res.status(400).json({
        message: "Please provide recruiting team ID.",
        success: false
      });
    }

    const rTeamMember = await RECRUITINGTEAM.findById(rteamid);

    if (!rTeamMember) {
      return res.status(404).json({
        message: "Recruiting team member not found.",
        success: false
      });
    }

    if (!rTeamMember.accepted_jobs || rTeamMember.accepted_jobs.length === 0) {
      return res.status(200).json({
        message: "No accepted jobs found.",
        success: true,
        data: []
      });
    }

    const jobs = await JOBS.find({
      _id: { $in: rTeamMember.accepted_jobs }
    });

    const jobBasicDetailIds = jobs
      .map(job => job.job_basic_details)
      .filter(Boolean); // in case any is null or undefined

    const jobBasicDetails = await JOBBASICDETAILS.find({
      _id: { $in: jobBasicDetailIds }
    });

    return res.status(200).json({
      message: "Job details retrieved.",
      success: true,
      data: jobBasicDetails
    });

  } catch (err) {
    next(err);
  }
};