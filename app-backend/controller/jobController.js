import JOBS from "../models/JOBS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js";
import JOBDRAFTS from "../models/JOBDRAFTS.js";
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js";
import JOBSQ from "../models/JOBSQ.js";
import fs from 'fs'



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


