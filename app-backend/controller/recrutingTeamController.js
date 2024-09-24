import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'
import JOBS from '../models/JOBS.js';
import bcrypt from 'bcryptjs'


//creating team member

export const createteammember=async (req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);

    try{
       const newteammember=new RECRUITINGTEAM({...req.body,password:hash})
       res.status(200).json("new Team member added")
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