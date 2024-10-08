import mongoose from "mongoose";

const candidateSchema=new mongoose.Schema({
    job_id:{
        type:String,
        required:true
    },
     candidate_id:{
        type:String,
        required:true
     },
     recruiter_member_id:{
        type:String,
        required:true
     },
     recruiter_agency_id:{
        type:String,
        required:true
     },
     candidate_status:{
        type:String,
        default:"Pending"
     },
     remarks:String,
     alloted_account_manager:String,
     candidate_basic_details:String,
     candidate_attachments:String,
     candidate_consent_proof:String,
     candidate_question_answer:String
},{timestamps:true})


export default mongoose.model('candidate',candidateSchema)