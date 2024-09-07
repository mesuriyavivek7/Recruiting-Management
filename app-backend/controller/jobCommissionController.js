import JOBS from "../models/JOBS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";


export const createJobCommission=async (req,res,next)=>{
   try{
     //update or insert job commission details
     const job=await JOBCOMMISSION.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

     //update job details
     await JOBS.findByIdAndUpdate(req.params.orgjobid,{$set:{job_commission_details:job._id}})
     
     res.status(200).json(job)

   }catch(err){
    next(err)
   }
}