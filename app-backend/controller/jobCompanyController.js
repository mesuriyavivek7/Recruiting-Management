import JOBS from "../models/JOBS.js"
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js"

export const createCompanyDetails=async (req,res,next)=>{
    try{
      //update or insert job company details 
      const jobcompany=await JOBCOMPANYINFO.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

      //update job details
      await JOBS.findByIdAndUpdate(req.params.orgjobid,{$set:{job_company_details:jobcompany._id}})

      res.status(200).json(jobcompany)
    }catch(err){
        next(err)
    }
}