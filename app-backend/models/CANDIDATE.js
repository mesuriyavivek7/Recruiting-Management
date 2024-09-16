import mongoose from "mongoose";

const candidateSchema=new mongoose.Schema({
    recruiter_agency_id:{
        type:String,
        required:true
    },
    recruiter_member_id:{
        type:String,
        required:true
    },
    candidate_id:{
        type:String,
        required:true
    },
    candidate_resume_attachments:String,
    candidate_resume_parse:String
})


export default mongoose.model('candidate',candidateSchema)