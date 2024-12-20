import mongoose from "mongoose";

const resumeparseSchema=new mongoose.Schema({
    job_id:{
        type:String,
        required:true
    },
    candidate_id:{
        type:String,
        required:true
    },
    recruiter_agency_id:{
        type:String,
        required:true
    },
    recruiter_memeber_id:{
        type:String,
        required:true
    },
    completed:{
       type:Boolean,
       default:false
    },
    firstname:String,
    lastname:String,
    contactno:String,
    emailid:String,
    educationdetails:String,
    pancardnumber:String
},{timestamps:true})

export default mongoose.model("resumeparse",resumeparseSchema)