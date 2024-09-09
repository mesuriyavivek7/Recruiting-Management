import mongoose from "mongoose";

const jobcompanyinfoSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    client_visibility:{
        type:Boolean,
        default:true
    },
    client_name:{
        type:String,
    },
    client_description:{
        type:String,
        required:true
    },
    agree_to_tearms:{
        type:Boolean,
    }
});


export default mongoose.model("jobcompanyinfo",jobcompanyinfoSchema)