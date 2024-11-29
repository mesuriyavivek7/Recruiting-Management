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
import fs from 'fs'

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
    res.status(200).json(job)
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
          const jobObj = await JOBS.findById(item, { job_id: 1, alloted_account_manager: 1, mark_hot_job: 1, _id: 1 });
          if (!jobObj) {
            throw new Error("Job not found");
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
              cp_name: company.client_name,
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

    if (!joblist) {
      return res.status(404).json({ error: "Accepted jobs not found" });
    }

    const acceptedjobs = await Promise.all(
      joblist.accepted_jobs.map(async (item) => {
        try {
          // get job id and allotted account manager id for the original job id
          const jobObj = await JOBS.findById(item, { job_id: 1, job_updates: 1, alloted_account_manager: 1, _id: 1 });
          if (!jobObj) {
            throw new Error("Job not found");
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
          const jobObj = await JOBS.findById(item, { job_id: 1, job_updates: 1, alloted_account_manager: 1, _id: 1 });
          if (!jobObj) {
            throw new Error("Job not found");
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
    if (!doc) res.status(404).json("File not found..!")
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
    await JOBS.findOneAndUpdate({ job_id: req.params.jobid }, { $push: { posted_candidate_profiles: req.body.orgcid } })
    res.status(200).json("Added candidate into job candidate profile list")
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

export const getPendingJobCountForEnMember = async (req, res, next) => {
  try {
    const pendingJobCount = await JOBS.countDocuments({ enterprise_member_id: req.params.enmemberid, job_status: "Pending" })
    res.status(200).json(pendingJobCount)
  } catch (err) {
    next(err)
  }
}