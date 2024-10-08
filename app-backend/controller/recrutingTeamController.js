import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'
import JOBS from '../models/JOBS.js';
import bcrypt from 'bcryptjs'
import ENTERPRISETEAM from '../models/ENTERPRISETEAM.js';
import CANDIDATEBASICDETAILS from '../models/CANDIDATEBASICDETAILS.js';
import JOBBASICDETAILS from '../models/JOBBASICDETAILS.js';
import CANDIDATE from '../models/CANDIDATE.js';


//creating team member

export const createteammember=async (req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);

    try{
       const newteammember=new RECRUITINGTEAM({...req.body,password:hash})
       newteammember.save()
       res.status(200).json("new Team member added")
    }catch(err){
       next(err)  
    } 
}

export const checkCreadentials=async (req,res,next)=>{
     try{
       const user=await RECRUITINGTEAM.findOne({$or:[{email:req.body.email},{mobileno:req.body.mobileno}]})
       console.log(user)
       if(user) res.status(200).json(true)
       else res.status(200).json(false)
     }catch(err){
         next(err)
     }
}

export const updateJobMappedList=async (req,res,next)=>{
    try{
        //adding job into recruting agency mapped list
         await RECRUITINGTEAM.findByIdAndUpdate(req.params.rteamid,{$push:{mapped_jobs:req.body.orgjobid}})
         //adding recruiting agency into job mapped list
         await JOBS.findByIdAndUpdate(req.body.orgjobid,{$push:{mapped_recruiting_agency_member:req.params.rteamid}})
         res.status(200).json("Successfully both mapped list updated")
    }catch(err){
        next(err)
    }
}


export const addJobIntoAcceptList=async (req,res,next)=>{
    try{
    console.log("Original Job ID--->",req.body.orgjobid)
    console.log("Recruiting team id---->",req.params.rteamid)
    //for the recruiting team
        //Pull and push the job 
        await RECRUITINGTEAM.findByIdAndUpdate(req.params.rteamid,{$pull:{mapped_jobs:req.body.orgjobid},$push:{accepted_jobs:req.body.orgjobid}})
    //for the job
       //pull and push the recruiting team
       await JOBS.findByIdAndUpdate(req.body.orgjobid,{$pull:{mapped_recruiting_agency_member:req.params.rteamid},$push:{accepted_recruiting_agency:req.params.rteamid}})

       res.status(200).json("Job added into accepted list in both job and recruiting team")
    }catch(err){
        next(err)
    }
}


export const rejectJob=async (req,res,next)=>{
    try{
      //for the recruiting team
      const {orgjobid,reason}=req.body
         //pull and push the job
         await RECRUITINGTEAM.findByIdAndUpdate(req.params.rteamid,{$pull:{mapped_jobs:orgjobid},$push:{rejected_jobs:{orgjobid,reason}}})
     //for the job
         //pull and push the recruiting team
         await JOBS.findByIdAndUpdate(orgjobid,{$pull:{mapped_recruiting_agency_member:req.params.rteamid},$push:{job_rejection_reason:{recruiting_agency_member:req.params.rteamid,reason}}})

         res.status(200).json("Job Rejection added...!")
    }catch(err){
        next(err)
    }
}

export const addNewCandidate=async (req,res,next)=>{
    try{
        const {candidateId,jobId}=req.body
        await RECRUITINGTEAM.findByIdAndUpdate(req.params.rememberid,{$push:{submited_candidate_profile:{candidateId,jobId}}})
        res.status(200).json("Added candidateid and jobid into submited candiadte list")
    }catch(err){
        next(err)
    }
}

export const getEnterpriseTeamMember=async (req,res,next)=>{
      try{
        const jobs=await RECRUITINGTEAM.findById(req.params.rememberid,{_id:0,submited_candidate_profile:1})
        if(jobs.submited_candidate_profile.length===0) res.status(200).json([])

        const enterpriseData=await Promise.all(jobs.submited_candidate_profile.map(async (obj)=>{
            const jobdetails=await JOBS.findById(obj.jobId)
            const enterprisefullname=await ENTERPRISETEAM.findById(jobdetails.enterprise_member_id,{full_name:1,_id:0})
            const jobbasicdetails=await JOBBASICDETAILS.findById(jobdetails.job_basic_details)
            const candidate=await CANDIDATE.findById(obj.candidateId)
            const candidatebasicdetails=await CANDIDATEBASICDETAILS.findById(candidate.candidate_basic_details)
            return (
                {
                    id:jobdetails.enterprise_member_id,
                    full_name:enterprisefullname.full_name,
                    candidate_id:candidatebasicdetails.candidate_id,
                    candidate_full_name:`${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
                    job_id:jobbasicdetails.job_id,
                    job_title:jobbasicdetails.job_title
                }
            )
        }))

        res.status(200).json(enterpriseData)

      }catch(err){
        next(err)
      }
}


export const checkIsAdmin=async (req,res,next)=>{
    try{
        const check=await RECRUITINGTEAM.findById(req.params.reid)
        if(check.isAdmin) res.status(200).json(true)
        else res.status(200).json(false)
    }catch(err){
        next(err)
    }
}

export const changeCommissionFlag=async (req,res,next)=>{
      try{
        await RECRUITINGTEAM.findByIdAndUpdate(req.params.rememberid,{$set:{hide_commision:req.body.flag}})
        res.status(200).json("Recuriter team commissio flag change")
      }catch(err){
         next(err)
      }
}

export const changeAccountStatus=async (req,res,next)=>{
    try{
       await RECRUITINGTEAM.findByIdAndUpdate(req.params.rememberid,{$set:{accout_status:req.body.status}})
       res.status(200).json("Recruiter member account status changed.")
    }catch(err){
        next(err)
    }
}