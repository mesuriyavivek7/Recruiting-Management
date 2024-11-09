import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'
import RECRUITING from '../models/RECRUITING.js';
import JOBS from '../models/JOBS.js';
import bcrypt from 'bcryptjs'
import ENTERPRISETEAM from '../models/ENTERPRISETEAM.js';
import CANDIDATEBASICDETAILS from '../models/CANDIDATEBASICDETAILS.js';
import JOBBASICDETAILS from '../models/JOBBASICDETAILS.js';
import CANDIDATE from '../models/CANDIDATE.js';
import axios from 'axios';


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


export const getRecruiterCandidateDetails=async (req,res,next)=>{
     try{
       const candidates=await CANDIDATE.find({recruiter_member_id:req.params.rememberid})
       const candidateDetails=await Promise.all(candidates.map(async (citem)=>{
           
          const candidatebasicdetails=await CANDIDATEBASICDETAILS.findById(citem.candidate_basic_details)
          const job=await JOBS.findOne({job_id:citem.job_id})
          const jobbasicdetails=await JOBBASICDETAILS.findById(job.job_basic_details)
          return (
            {
                id:citem._id,
                candidate_id:citem.candidate_id,
                candidate_full_name:`${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
                candidate_status:citem.candidate_status,
                submited:citem.createdAt,
                updated:citem.updatedAt,
                notice_period:candidatebasicdetails.notice_period,
                candidate_mobile_number:candidatebasicdetails.primary_contact_number,
                candidate_email_address:candidatebasicdetails.primary_email_id,
                remarks:citem.recruiter_remarks,
                job_id:jobbasicdetails.job_id,
                job_title:jobbasicdetails.job_title,
                job_country:jobbasicdetails.country,
                job_city:jobbasicdetails.city[0],
                job_status:job.job_status
            }
          )
       }))

       res.status(200).json(candidateDetails)
     }catch(err){
         next(err)
     }
}


export const getRecruiterProfilePageDetails=async (req,res,next)=>{
      try{
          const member=await RECRUITINGTEAM.findById(req.params.reid)
          res.status(200).json(member)
      }catch(err){
         next(err)
      }
}

export const updateRecruiterTeamDetails=async (req,res,next)=>{
     try{
        const {full_name,mobile_no,email,profile_picture}=req.body
        const update=await RECRUITINGTEAM.findByIdAndUpdate(req.params.rememberid,{$set:{full_name,mobileno:mobile_no,email,profile_picture}})
        if(update.isAdmin){
            await RECRUITING.findByIdAndUpdate(update.recruiting_agency_id,{$set:{full_name,mobileno:mobile_no,email}})
        }
        res.status(200).json('Recruiter team member details updated.')
     }catch(err){
        next(err)
     }
}


export const checkMobileNo=async (req,res,next)=>{
       try{
            const mobileno=await RECRUITINGTEAM.findOne({mobileno:req.body.mobile_no})
            if(mobileno){
                res.status(200).json(true)
            }else{
                res.status(200).json(false)
            }
            
       }catch(err){
           next(err)
       }
}


export const checkEmailAddress=async (req,res,next)=>{
      try{
         const email=await RECRUITINGTEAM.findOne({email:req.body.email})
         if(email){
            res.status(200).json(true)
         }else{
            res.status(200).json(false)
         }
         
      }catch(err){
         next(err)
      }
}

export const getDashBoardCount=async (req,res,next)=>{
      try{
        const recruitingmemeber=await RECRUITINGTEAM.findById(req.params.rememberid)
        const pending_candidate_count=await CANDIDATE.countDocuments({$and:[{recruiter_member_id:req.params.rememberid},{candidate_status:"Pending"}]})
        const obj={
            job_accepted_count:recruitingmemeber.accepted_jobs.length,
            submited_candidate_profile_count:recruitingmemeber.submited_candidate_profile.length,
            pending_candidate_count
        }

        res.status(200).json(obj)
      }catch(err){
         next(err)
      }
}

export const getRecuritingTeamDetails= async(req, res, next)=>{
    try {
        const RecruitingTeams= await RECRUITINGTEAM.find({recruiting_agency_id : req.params.r_agency_id});
        res.status(200).json(RecruitingTeams);
    } catch (error) {
        next(error);
    }
}

export const addJobIntoFavoutiteList=async (req,res,next)=>{
     try{
        const {orgjobid,rememberid}=req.body
        await RECRUITINGTEAM.findByIdAndUpdate(rememberid,{$push:{favourite_jobs:orgjobid}})
        res.status(200).json("Job added into favourite list")
     }catch(err){
        next(err)
     }
}

export const removeJobFromFavouriteList=async (req,res,next)=>{
     try{
       const {orgjobid,rememberid}=req.body
       await RECRUITINGTEAM.findByIdAndUpdate(rememberid,{$pull:{favourite_jobs:orgjobid}})
       res.status(200).json("Job Removing from favourite list")
     }catch(err){
         next(err)
     }
}

export const isFavouriteJob=async (req,res,next)=>{
     try{
        const {orgjobid,rememberid}=req.params
        const favJobList=await RECRUITINGTEAM.findById(rememberid,{favourite_jobs:1,_id:0})
        if(favJobList.favourite_jobs && favJobList.favourite_jobs.includes(orgjobid)){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
     }catch(err){
         next(err)
     }
}

export const getFavouriteJobIds=async (req,res,next)=>{
    try{
       const favjobids=await RECRUITINGTEAM.findById(req.params.rememberid,{favourite_jobs:1,_id:0})
       res.status(200).json(favjobids.favourite_jobs)
    }catch(err){
        next(err)
    }
}

//unmaping job in both collection job and recruiting team
export const unmapJob=async (req,res,next)=>{
     try{
         const {orgjobid,rememberid}=req.body
         //pull and push work done
         await RECRUITINGTEAM.findByIdAndUpdate(rememberid,{$pull:{accepted_jobs:orgjobid},$push:{mapped_jobs:orgjobid}})

         await axios.post(`${process.env.APP_SERVER_URL}/job/unmapjob`,{orgjobid,rememberid})

         res.status(200).json("Job unmaped from the both collection")
     }catch(err){ 
         next(err)
     }
}

export const requestMapJob=async (req,res,next)=>{
      try{
        const {orgjobid,rememberid}=req.body

        //Push the requested job id
        await RECRUITINGTEAM.findByIdAndUpdate(rememberid,{$push:{requested_jobs:orgjobid}})

        await axios.post(`${process.env.APP_SERVER_URL}/job/addJobMapRequest`,{orgjobid,rememberid})

        res.status(200).json("Request added into both collections (Recruitingteam & Job)")
      }catch(err){
        next(err)
      }
}

export const checkForRequestJob=async (req,res,next)=>{
    try{
        const requestJobList=await RECRUITINGTEAM.findById(req.params.rememberid,{requested_jobs:1,_id:0})

        if(requestJobList.requested_jobs && requestJobList.requested_jobs.includes(req.params.orgjobid)){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
    }catch(err){
        next(err)
    }
}

export const isVerifiedMail=async (req,res,next)=>{
     try{
        const remember=await RECRUITINGTEAM.findById(req.params.rememberid)
        if(!remember) return res.status(404).json("User not found.",'failure')

        if(remember.email_verified) res.status(200).json(true)
        else res.status(200).json(false)
     }catch(err){
        next(err)
     }
}