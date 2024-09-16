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
    fullname:String,
    contactno:String,
    emailid:String,
    educationdetails:String
})

export default mongoose.model("resumeparse",resumeparseSchema)