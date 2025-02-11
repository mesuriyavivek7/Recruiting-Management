import mongoose from "mongoose";


const jobbasicdeatilsSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        // required:true
    },
    job_id:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    job_description:{
        type:String,
        required:true
    },
    permanent_remote_work:{
        type:Boolean,
        default:false
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:[String],
        required:true
    },
    job_domain:{
        type:String,
        required:true
    },
    positions:{
        type:String,
        required:true
    },
    experience:{
        type:Object,
        required:true
    },
    ext_job_id:{
        type:String,
    },
    hiring_managers:{
        type:String,
    },
    share_salary_details:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

export default mongoose.model('jobbasicdetail',jobbasicdeatilsSchema)