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
        type:mongoose.Schema.Types.ObjectId,
        ref:'recruitingteam'
     },
     recruiter_agency_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recruiting'
     },
     candidate_status:{
        type:String,
        default:"Pending"
     },
     //this remarks is for enterprise 
     remarks:String,
     //this remarks is for recruiter 
     recruiter_remarks:String,
     alloted_account_manager:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'accountmanager'
     },
     candidate_basic_details:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'candidatebasicdetail'
     },
     candidate_attachments:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'candidateattachment'
     },
     candidate_consent_proof:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'candidateconsentproof'
     },
     candidate_question_answer:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'candidatesqanswer'
     },
     //Details which will fill after candidate joined to company
     designation:{
      type:String,
     },
     job_location:{
      type:String,
     },
     offer_ctc:{
      type:String,
     },
     billing_type:{
      type:String
     },
     joining_date:{
      type:Date
     }
},{timestamps:true})


export default mongoose.model('candidate',candidateSchema)