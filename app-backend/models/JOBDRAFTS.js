import mongoose from "mongoose";

const jobdraftSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true
    },
    enterprise_member_id:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    org_job_id:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('jobdraft',jobdraftSchema)