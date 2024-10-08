import CANDIDATESQANSWER from "../models/CANDIDATESQANSWER.js";
import CANDIDATE from "../models/CANDIDATE.js";

export const createSqAnswers=async (req,res,next)=>{
    try{
       const sqanswer=await CANDIDATESQANSWER.findOneAndUpdate({candidate_id:req.body.candidate_id},{$set:{...req.body}},{upsert:true,new:true})

       //for updating candidate details
       await CANDIDATE.findByIdAndUpdate(req.params.orgcid,{$set:{candidate_question_answer:sqanswer._id}})

       res.status(200).json("Candidate question answer created.")
    }catch(err){
        next(err)
    }
}