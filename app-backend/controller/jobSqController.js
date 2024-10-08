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


export const showJobScreeningQuestions = async (req, res) => {
    try {
      const screeningQuestions = await JOBSQ.findOne({job_id:req.params.id});
      if (!screeningQuestions) {
        return res.status(404).json({ message: 'Screening Questions not found' });
      }
      res.status(200).json(screeningQuestions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };