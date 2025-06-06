import JOBS from "../models/JOBS.js"
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js"

export const createSourcingDetails=async (req,res,next)=>{
    try{
        //update or create sourcing details
        const sourcing=await JOBSOURCINGDETAILS.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})
        
        //update job details for sourcing details
        await JOBS.findByIdAndUpdate(req.params.orgjobid,{$set:{job_sourcing_guidelines:sourcing._id}})

        res.status(200).json(sourcing)
    }catch(err){
        next(err)
    }
}

export const showJobSourcingDetails = async (req, res) => {
    try {
      const sourcingDetails = await JOBSOURCINGDETAILS.findOne({ job_id: req.params.id });
      if (!sourcingDetails) {
        return res.status(404).json({ message: 'Sourcing Details not found' });
      }
      res.status(200).json(sourcingDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getSourcingDetails=async (req,res,next)=>{
    try{
      const sourcingdetails=await JOBSOURCINGDETAILS.findOne({job_id:req.params.jobid},{_id:0,createdAt:0,updatedAt:0})
      res.status(200).json(sourcingdetails)
    }catch(err){
        next(err)
    }
}

