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
    firstname:String,
    lastname:String,
    contactno:String,
    emailid:String,
    educationdetails:String,
    pancardnumber:String
})

export default mongoose.model("resumeparse",resumeparseSchema)