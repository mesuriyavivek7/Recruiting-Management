import JOBS from "../models/JOBS.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js"
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js"
import JOBSQ from "../models/JOBSQ.js"
import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js"
import mongoose from "mongoose";

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




export const showJobDetail = async (req, res) => {
  const { id } = req.params; // Get the job ID from request parameters
  console.log(id);

  try {
    // Fetch the job document based on the given ID
    const job = await JOBS.findOne({ job_id: id });
   //console.log(job)
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Fetch the job basic details using the job_id
    
    const jobBasicDetail = await JOBBASICDETAILS.findOne({ job_id: id });
    const jobCommissionDetail = await JOBCOMMISSION.findOne({ job_id: id });
    const companyDetail = await JOBCOMPANYINFO.findOne({ job_id: id });
    const sourcingGuidelines = await JOBSOURCINGDETAILS.findOne({ job_id: id });
    const screeningQuestions = await JOBSQ.findOne({ job_id: id });
    // const attachment = await JOBATTACHEMENT.findOne({ job_id: id });

    if (!jobBasicDetail || !jobCommissionDetail || !companyDetail || !sourcingGuidelines || !screeningQuestions ) {
      return res.status(404).json({ message: "Details not found" });
    }

    if (!jobBasicDetail) {
      return res.status(404).json({ message: "Job Basic Detail not found" });
    }
console.log(jobBasicDetail)
    // Combine the job data and job basic details in a single response object
    const fullJobDetails = {
      ...job._doc,
      basicDetails: jobBasicDetail,
     
      commissionDetails: jobCommissionDetail,
      companyDetails: companyDetail,
      sourcingGuidelines: sourcingGuidelines,
      screeningQuestions: screeningQuestions,
     
    };

    return res.status(200).json(fullJobDetails);

  } catch (error) {
    console.error("Error fetching job details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


