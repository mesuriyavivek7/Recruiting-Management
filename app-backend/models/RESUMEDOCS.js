import mongoose from "mongoose";

const resumedocsSchema=new mongoose.Schema({  
    job_id:{
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
    candidate_id:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filetype:{
        type:String,
        required:true
    },
    filesize:{
        type:Number,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


export default mongoose.model("resumedocs",resumedocsSchema)