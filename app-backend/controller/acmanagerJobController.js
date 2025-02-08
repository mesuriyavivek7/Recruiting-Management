import ACMANAGERJOB from "../models/ACMANAGERJOB.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBCOMPANYINFO from "../models/JOBCOMPANYINFO.js";
import JOBSOURCINGDETAILS from "../models/JOBSOURCINGDETAILS.js";
import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBSQ from "../models/JOBSQ.js";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllJobs = async (req, res, next)=>{
  try{
     const { search } = req.query;

     const acmanagerJobs = await ACMANAGERJOB.find()

     if (!search) {
      return res.status(200).json({data:acmanagerJobs , message: "All Jobs data geted"});
     }

     const jobs = await ACMANAGERJOB.find()
     .populate({
       path: 'job_basic_details',
       match: { job_title: { $regex: search, $options: 'i' } }, // Search on job_name
     })
     .lean();


     console.log("all jobs-->",jobs)

    // Filter out jobs where job_basic_details did not match
    const filteredJobs = jobs.filter(job => job.job_basic_details);

    res.status(200).json({data:filteredJobs,message:"All jobs geted"});


  }catch(err){
    next(err)
  }
}

export const createJobs = async (req, res, next) => {
    try {
      //check job is already exist or not
      let job = await ACMANAGERJOB.findOne({ job_id: req.body.job_id })
      if (!job) {
        const newjob = new ACMANAGERJOB(req.body)
        await newjob.save()
        job = newjob
      }
      res.status(200).json(job)
    } catch (err) {
      next(err)
    }
  }



export const craeteJobBasicDeatils = async (req, res, next) => {
  try {
    //check job basic details already exist or not
    const jobDetails = await JOBBASICDETAILS.findOne({ job_id: req.body.job_id })

    if (!jobDetails) {
      //creating basic job details
      const newjobdetails = new JOBBASICDETAILS(req.body)
      await newjobdetails.save()

      //update job with job details
      await ACMANAGERJOB.findByIdAndUpdate(req.params.orgjobid, { $set: { job_basic_details: newjobdetails._id } })
    } else {
      await JOBBASICDETAILS.findOneAndUpdate({ job_id: req.body.job_id },
        {
          $set: {
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            permanent_remote_work: req.body.permanent_remote_work,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            job_domain: req.body.job_domain,
            positions: req.body.positions,
            experience: req.body.experience,
            ext_job_id: req.body.ext_job_id,
            hiring_managers: req.body.hiring_managers,
            share_salary_details: req.body.share_salary_details
          }
        })
    }

    res.status(200).json("New job created with basic details")
  } catch (err) {
    next(err)
  }
}


export const createJobCommission=async (req,res,next)=>{
  try{
    //update or insert job commission details
    const job=await JOBCOMMISSION.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

    //update job details
    await ACMANAGERJOB.findByIdAndUpdate(req.params.orgjobid,{$set:{job_commission_details:job._id}})
    
    res.status(200).json(job)

  }catch(err){
   next(err)
  }
}

export const createCompanyDetails=async (req,res,next)=>{
  try{
    //update or insert job company details 
    const jobcompany=await JOBCOMPANYINFO.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

    //update job details
    await ACMANAGERJOB.findByIdAndUpdate(req.params.orgjobid,{$set:{job_company_details:jobcompany._id}})

    res.status(200).json(jobcompany)
  }catch(err){
      next(err)
  }
}


export const createSourcingDetails=async (req,res,next)=>{
  try{
      //update or create sourcing details
      const sourcing=await JOBSOURCINGDETAILS.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})
      
      //update job details for sourcing details
      await ACMANAGERJOB.findByIdAndUpdate(req.params.orgjobid,{$set:{job_sourcing_guidelines:sourcing._id}})

      res.status(200).json(sourcing)
  }catch(err){
      next(err)
  }
}

export const createJobAttachment=async (req,res,next)=>{
  try{
     if(Object.keys(req.files).length>0){
       let sampleCv=(req.files.sample_cv!==undefined)?(req.files.sample_cv[0]):(null)
       let evaluationForm=(req.files.evaluation_form!==undefined)?(req.files.evaluation_form[0]):(null)
       let audioBrief=(req.files.audio_brief!==undefined)?(req.files.audio_brief[0]):(null)
       let otherDocs=(req.files.other_docs!==undefined)?(req.files.other_docs[0]):(null)
       const newobj={
         sample_cv:(sampleCv)?({filename:(sampleCv.fieldname+path.extname(sampleCv.originalname)),filepath:sampleCv.path,filetype:sampleCv.mimetype,filesize:sampleCv.size}):({}),
         evaluation_form:(evaluationForm)?({filename:(evaluationForm.fieldname+path.extname(evaluationForm.originalname)),filepath:evaluationForm.path,filetype:evaluationForm.mimetype,filesize:evaluationForm.size}):({}),
         audio_brief:(audioBrief)?({filename:(audioBrief.fieldname+path.extname(audioBrief.originalname)),filepath:audioBrief.path,filetype:audioBrief.mimetype,filesize:audioBrief.size}):({}),
         other_docs:(otherDocs)?({filename:(otherDocs.fieldname+path.extname(otherDocs.originalname)),filepath:otherDocs.path,filetype:otherDocs.mimetype,filesize:otherDocs.size}):({})
       }
       //creating job attachment or update it
       const jobattachment=await JOBATTACHEMENT.findOneAndUpdate({folder_name:req.params.jobid},{$set:{...newobj}},{upsert:true,new:true})
       //update job details
       await ACMANAGERJOB.findOneAndUpdate({job_id:req.params.jobid},{$set:{job_attachments:jobattachment._id}})
     }
    
     res.status(200).json("All files uploaded")
  }catch(err){
     next(err)
  }
}


export const createJobSq=async (req,res,next)=>{
  try{
   //upadte or insert job screening questions
   const jobsq=await JOBSQ.findOneAndUpdate({job_id:req.body.job_id},{$set:{...req.body}},{upsert:true,new:true})

   //update job details
   await ACMANAGERJOB.findByIdAndUpdate(req.params.orgjobid,{$set:{job_screening_questionsa:jobsq._id}})

   res.status(200).json(jobsq)
  }catch(err){
   next(err)
  }
}

export const getAcmanagerJobs = async (req, res, next) =>{
   try{
     const {acid} = req.params

     if(!acid) return res.status(400).json({message:"Ac manager id is not given."})

     const jobs = await ACMANAGERJOB.find({acmanager_id:acid}).populate('job_basic_details')

     return res.status(200).json({message:"All jobs retrived",data:jobs})

   }catch(err){
    next(err)
   }
}

export const deleteJob = async (req, res, next) =>{
   try{
     const {jobid} = req.params
   
     await ACMANAGERJOB.findOneAndDelete({job_id:jobid})

     return res.status(200).json({message:"Acmanager job deleted successfully"})
      
   }catch(err){
    next(err)
   }
}

export const deleteJobBasicDetails = async (req, res, next) =>{
   try{
     const {jobid} = req.params

     await JOBBASICDETAILS.findOneAndDelete({job_id:jobid})

     return res.status(200).json({message:"Job basic details deleted"})
   }catch(err){
     next(err)
   }
}


export const deleteJobCommissionDetails = async (req, res, next) =>{
   try{
      const {jobid} = req.params

      await JOBCOMMISSION.findOneAndDelete({job_id:jobid})

      return res.status(200).json({message:"Job commission details deleted"})
   }catch(err){
    next(err)
   }
}

export const deleteCompanyDetails = async (req, res, next)=>{
   try{
    const {jobid} = req.params

    await JOBCOMPANYINFO.findOneAndDelete({job_id:jobid})

    return res.status(200).json({message:"Job Company details deleted"})
   }catch(err){
    next(err)
   }
}

export const deleteJobSourcingDetails = async (req, res, next) =>{
   try{
    const {jobid} = req.params

    await JOBSOURCINGDETAILS.findOneAndDelete({job_id:jobid})

    return res.status(200).json({message:"Job Sourcing details deleted"})
   }catch(err){
    next(err)
   }
}

export const deleteJobAttachments = async (req, res, next) =>{
  try{
     const {jobid} = req.params

     const jobAttachments =  await JOBATTACHEMENT.findOne({folder_name:jobid})

     if(!jobAttachments) return res.status(200).json("This mentioned job with jobid is not exist")

    const folderPath = path.join(__dirname,'..','uploads','jobdocs',jobid)

    if(!fs.existsSync(folderPath)) return res.status(404).json("Folder not found.")

    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete folder' });
      }
    });

    await JOBATTACHEMENT.findOneAndDelete({folder_name:jobid})

    return res.status(200).json({message: 'Job Attachment, files, and folder deleted successfully'})

  }catch(err){
    next(err)
  }
}

export const deleteJobSQ = async (req, res, next) =>{
   try{
    const {jobid} = req.params

    await JOBSQ.findOneAndDelete({job_id:jobid})

    return res.status(200).json({message:"Job SQ details deleted"})
   }catch(err){
    next(err)
   }
}

export const getDashboardCount = async (req, res, next) =>{
   try{
      const {jobid} = req.params

      const job = await ACMANAGERJOB.findOne({job_id:jobid})
      if(!job) return res.status(404).json({message:"Job not found."})

      return res.status(200).json({
        data:{
          candidateCount:job.posted_candidate_profiles.length,
          mappedRecruiterCount:job.mapped_recruiting_agency_member.length,
          requestedRecruiterCount:job.job_request.length,
          acceptedRecruiterCount:job.accepted_recruiting_agency.length
        },
        message:"All acmanager jobs counts retrived."
      })

   }catch(err){
    next(err)
   }
}

export const getJobByJobId = async (req, res, next) =>{
  try{
    const {jobid} = req.params

    const job = await ACMANAGERJOB.findOne({job_id:jobid})
    .populate('job_basic_details')
    .populate('job_commission_details')
    .populate('job_company_details')
    .populate('job_sourcing_guidelines')
    .populate('job_attachments')
    .populate('job_screening_questionsa')

    if(!job) return res.status(200).json({message:"Job not found."})

    return res.status(200).json({message:"Job retrived",data:job})

  }catch(err){
     next(err)
  }
}