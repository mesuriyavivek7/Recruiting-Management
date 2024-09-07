import { generateRandomId } from "../helper/generateRandomId.js";
import JOBS from "../models/JOBS.js";


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