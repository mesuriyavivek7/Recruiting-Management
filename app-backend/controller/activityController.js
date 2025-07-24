import DATABASEACTIVITY from "../models/DATABASEACTIVITY.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";

//Create activity
export const createActivity = async (req, res, next) =>{
    try{
       const {candidate_id, candidate_name, recruiter_id, recruiter_name, comment} = req.body

       if(!candidate_id || !candidate_name || !recruiter_id || !recruiter_name || !comment) return res.status(400).json({message:"Please provide all required fields",success:false})

       const recruiter = await RECRUITINGTEAM.findById(recruiter_id)

       if(!recruiter) return res.status(404).json({message:"Recruiter not found.",success:false})

       const newActivity = new DATABASEACTIVITY({
        recruiter_id,
        recruiter_name,
        candidate_id,
        candidate_name,
        comment
       })

       await newActivity.save()

       return res.status(200).json({message:"New activity created.",success:true,data:newActivity})

    }catch(err){
        next(err)
    }
}

//Get all activity by candidate id
export const getAllActivityByCandidateId = async (req, res, next) =>{
    try{
        const {candidateId} = req.params

        if(!candidateId) return res.status(400).json({message:"Please provide candidate id",success:false})

        const activities = await DATABASEACTIVITY.find({candidate_id:candidateId})
        
        return res.status(200).json({message:"All activities retrived",success:true,data:activities})
    }catch(err){
        next(err)
    }
}