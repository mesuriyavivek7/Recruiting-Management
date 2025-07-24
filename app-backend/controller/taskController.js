import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";
import TASK from "../models/TASK.js";

//For create new task
export const createTask = async (req, res, next)=>{
    try{
        console.log(req.body)
        const {candidate_id, candidate_name ,recruiter_id, task_details, scheduledTime} = req.body

        if(!candidate_id || !candidate_name || !recruiter_id || !task_details || !scheduledTime) return res.status(400).json({message:"Please provide all required values",success:false})

        const recruiter = await RECRUITINGTEAM.findById(recruiter_id)

        if(!recruiter) return res.status(404).json({message:"Recruiter member not found.",success:false})

        const newTask = new TASK({
            candidate_id,
            candidate_name,
            recruiter_id,
            task_details,
            scheduledTime
        })
   
       await newTask.save()
        
       return res.status(200).json({message:"New task craeted successfully.",success:true})

    }catch(err){
        next(err)
    }
}