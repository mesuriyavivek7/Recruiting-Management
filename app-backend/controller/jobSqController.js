import JOBSQ from "../models/JOBSQ.js";
import JOBS from "../models/JOBS.js";

export const createJobSq=async (req,res,next)=>{
    try{
     //upadte or insert job screening questions
     const jobsq=await JOBSQ.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

     //update job details
     await JOBS.findByIdAndUpdate(req.params.orgjobid,{$set:{job_screening_questionsa:jobsq._id}})

     res.status(200).json(jobsq)
    }catch(err){
     next(err)
    }
}


export const getScreeningQue=async (req,res,next)=>{
    try{
        const getSq=await JOBSQ.findOne({job_id:req.params.jobid},{_id:0,createdAt:0,updatedAt:0})
        res.status(200).json(getSq)
    }catch(err){
        next(err)
    }
}