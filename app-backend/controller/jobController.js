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


export const allotedJobToAcManager=async (req,res,next)=>{
    try{
      await JOBS.findByIdAndUpdate(req.params.orgid,{$set:{isDraft:false,job_status:"Pending",alloted_account_manager:req.body.ac_id}})
      res.status(200).json("Sucessfully allocated to account manager")
    }catch(err){
        next(err)
    }
}