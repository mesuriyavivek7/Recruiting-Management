import JOBS from "../models/JOBS.js";
import { generateRandomId } from "../helper/generateRandomId.js";

export const saveDraft=async (req,res,next)=>{
    try{
      const jobId=req.body.id
      if(jobId){

      }else{
        let generated_job_id=generateRandomId()
        generated_job_id='J'+generated_job_id
        const newJob=new JOBS({...req.body,job_id:generated_job_id})
        await newJob.save()
      }
      res.status(200).json("New Job saved as draft successfully")
    }catch(err){
        next(err)
    }
}