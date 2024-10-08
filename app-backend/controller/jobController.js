import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
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



export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JOBS.find().populate('job_basic_details').exec();
    // const jobBasicDetail = await JOBBASICDETAILS.find();
   

    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};


export const allotedJobToAcManager=async (req,res,next)=>{
    try{
      await JOBS.findByIdAndUpdate(req.params.orgid,{$set:{isDraft:false,job_status:"Pending",alloted_account_manager:req.body.ac_id}})
      res.status(200).json("Sucessfully allocated to account manager")
    }catch(err){
        next(err)
    }
}