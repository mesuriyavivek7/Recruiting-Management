import JOBDRAFTS from "../models/JOBDRAFTS.js";
import JOBS from "../models/JOBS.js";

export const createJobDraft=async (req,res,next)=>{
    try{
       //check job draft is exist or not
       const jobDraft=await JOBDRAFTS.findOne({job_id:req.body.job_id})
       
       if(!jobDraft){
        const newjobdraft=new JOBDRAFTS(req.body)
        await newjobdraft.save()

        //update job to draft mode
        await JOBS.findByIdAndUpdate(req.body.orgid,{$set:{isDraft:true}})
       }

       res.status(200).json("New job draft created and updated sucessfully")
    }catch(err){
        next(err)
    }
}