import JOBS from "../models/JOBS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";


export const craeteJobBasicDeatils=async (req,res,next)=>{
    try{
       //check job basic details already exist or not
       const jobDetails=await JOBBASICDETAILS.findOne({job_id:req.body.job_id})

       if(!jobDetails){
        //creating basic job details
        const newjobdetails=new JOBBASICDETAILS(req.body)
        await newjobdetails.save()

        //update job with job details
        await JOBS.findByIdAndUpdate(req.params.orgjobid,{$set:{job_basic_details:newjobdetails._id}})
       }else{
         await JOBBASICDETAILS.findOneAndUpdate({job_id:req.body.job_id},
          {
            $set:{
                job_title:req.body.job_title,
                job_description:req.body.job_description,
                permanent_remote_work:req.body.permanent_remote_work,
                country:req.body.country,
                state:req.body.state,
                city:req.body.city,
                job_domain:req.body.job_domain,
                positions:req.body.positions,
                experience:req.body.experience,
                ext_job_id:req.body.ext_job_id,
                hiring_managers:req.body.hiring_managers,
                share_salary_details:req.body.share_salary_details
            }
          })
       }

       res.status(200).json("New job created with basic details")
    }catch(err){
        next(err)
    }
}


export const getJobBasicDetails=async (req,res,next)=>{
      try{
          const basicdetails=await JOBBASICDETAILS.findOne({job_id:req.params.jobid},{_id:0,createdAt:0,updatedAt:0})
          res.status(200).json(basicdetails)
      }catch(err){
         next(err)
      }
}