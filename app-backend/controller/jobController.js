import JOBS from "../models/JOBS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js";
import JOBDRAFTS from "../models/JOBDRAFTS.js";
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js";
import JOBSQ from "../models/JOBSQ.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";

import fs from 'fs'
import axios from 'axios'



export const createJobs=async (req,res,next)=>{
    try{
       //check job is already exist or not
       let job=await JOBS.findOne({job_id:req.body.job_id})
       if(!job){
        const newjob=new JOBS(req.body)
        await newjob.save()
        job=newjob
       }
       res.status(200).json(job)
    }catch(err){
        next(err)
    }
}


export const allotedJobToAcManager=async (req,res,next)=>{
    try{
      await JOBS.findByIdAndUpdate(req.params.orgid,{$set:{isDraft:false,job_status:"Pending",alloted_account_manager:req.body.ac_id}})
      res.status(200).json("Sucessfully allocated to account manager")
    }catch(err){
        next(err)
    }
}

export const activateJob=async (req,res,next)=>{
    try{
      await JOBS.findByIdAndUpdate(req.params.orgid,{$set:{job_status:"Active"}})
      res.status(200).json("Successfully activated job")
    }catch(err){
       next(err)
    }
}

export const getAllJobDetails=async (req,res,next)=>{
    try{
       const jobs=await JOBS.find({enterprise_member_id:req.params.ememberid,isDraft:false})
       const mydata=await Promise.all(jobs.map(async (item)=>{
          const {job_id,job_status,job_basic_details,createdAt}=item
          const basicDetails=await JOBBASICDETAILS.findById(job_basic_details)
          const {job_title,country,city}=basicDetails
          return (
            {   orgjobid:item._id,
                job_id,
                job_title,
                createdAt,
                job_status,
                country,
                city
            }
          )
       }))
       res.status(200).json(mydata)
    }catch(err){
        next(err)
    }
}

export const getAllJobDraftDetails=async (req,res,next)=>{
     try{
        const draftjobs=await JOBS.find({enterprise_member_id:req.params.ememberid,isDraft:true})
        const mydata=await Promise.all(draftjobs.map(async (item)=>{
            const {job_id,job_basic_details,createdAt}=item
            const basicDetails=await JOBBASICDETAILS.findById(job_basic_details)
            const {job_title,country,city}=basicDetails
            return (
               { orgjobid:item._id,
                 job_id,
                 createdAt,
                 job_title,
                 country,
                 city
               }
            )
        }))
        res.status(200).json(mydata)
     }catch(err){ 
        next(err)
     }
}


export const deleteJobDraftWithOtherDetails=async (req,res,next)=>{
    try{
          await JOBBASICDETAILS.deleteOne({job_id:req.params.jobid})
          await JOBCOMMISSION.deleteOne({job_id:req.params.jobid})
          await JOBSOURCINGDETAILS.deleteOne({job_id:req.params.job_id})
          //removing folder of job docs 
          if (fs.existsSync(`uploads/jobdocs/${req.params.jobid}`)) fs.rmSync(`uploads/jobdocs/${req.params.jobid}`,{recursive:true,force:true})
          await JOBATTACHEMENT.deleteOne({folder_name:req.params.jobid})
          await JOBDRAFTS.deleteOne({job_id:req.params.jobid})
          await JOBSQ.deleteOne({job_id:req.params.jobid})
          await JOBCOMPANYINFO.deleteOne({job_id:req.params.jobid})
          await JOBS.deleteOne({job_id:req.params.jobid})
          res.status(200).json("Deleted Drat and other job details")
    }catch(err){
        next(err)
    }
}


export const getFronLiveJobDetails=async (req,res,next)=>{
      try{
        
      }catch(err){
        next(err)
      }
}

export const getFrontMappedJobDetails=async (req,res,next)=>{

    try {
        // getting mapped job list data for a particular recruiting team member
        const joblist = await RECRUITINGTEAM.findById(req.params.rteamid, {_id:0, mapped_jobs: 1 });
  
        if (!joblist) {
          return res.status(404).json({ error: "Recruiting team not found" });
        }
    
        const mappedjobs = await Promise.all(
          joblist.mapped_jobs.map(async (item) => {
            try {
              // get job id and allotted account manager id for the original job id
              const jobObj = await JOBS.findById(item, { job_id: 1, alloted_account_manager: 1, _id: 1 });
              if (!jobObj) {
                throw new Error("Job not found");
              }
    
              const basicdetails = await JOBBASICDETAILS.findOne({ job_id: jobObj.job_id });
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
                orgjobid:jobObj._id,
                job_id: jobObj.job_id,
                job_title: basicdetails.job_title,
                country: basicdetails.country,
                city: basicdetails.city,
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



export const getFrontAcceptedJobDetails=async (req,res,next)=>{
     try{


      // getting mapped job list data for a particular recruiting team member
      const joblist = await RECRUITINGTEAM.findById(req.params.rteamid, {_id:0, accepted_jobs:1 });
  
      if (!joblist) {
        return res.status(404).json({ error: "Recruiting team not found" });
      }
  
      const acceptedjobs = await Promise.all(
        joblist.accepted_jobs.map(async (item) => {
          try {
            // get job id and allotted account manager id for the original job id
            const jobObj = await JOBS.findById(item, { job_id: 1, alloted_account_manager: 1, _id: 1 });
            if (!jobObj) {
              throw new Error("Job not found");
            }
  
            const basicdetails = await JOBBASICDETAILS.findOne({ job_id: jobObj.job_id });
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
              orgjobid:jobObj._id,
              job_id: jobObj.job_id,
              job_title: basicdetails.job_title,
              country: basicdetails.country,
              city: basicdetails.city,
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

     }catch(err){
        next(err)
     }
}

export const getJobAttachmentsDetailsForCandidate=async (req,res,next)=>{
  try{
   const jobattachments=await JOBATTACHEMENT.findOne({folder_name:req.params.jobid},{evaluation_form:1,audio_brief:1,other_docs:1,_id:0})
   res.status(200).json(jobattachments)
  }catch(err){
    next(err)
  }
}


export const downloadEvaluationForm=async (req,res,next)=>{
    try{
      const doc=await JOBATTACHEMENT.findOne({folder_name:req.params.jobid},{evaluation_form:1,_id:0})
      if(!doc) res.status(404).json("File not found..!")
      const filepath=doc.evaluation_form.filepath
      res.download(filepath,doc.evaluation_form.filename)
    }catch(err){
      next(err)
    }
}

export const getCandidateScreeningQue=async (req,res,next)=>{
    try{

      const sq=await JOBSQ.findOne({job_id:req.params.jobid},{screening_questions:1,_id:0})
      res.status(200).json(sq.screening_questions)

    }catch(err){
      next(err)
    }
}

export const addCandidateProfileList=async (req,res,next)=>{
    try{
     await JOBS.findOneAndUpdate({job_id:req.params.jobid},{$push:{posted_candidate_profiles:req.body.orgcid}})
     res.status(200).json("Added candidate into job candidate profile list")
    }catch(err){
       next(err)
    }
}