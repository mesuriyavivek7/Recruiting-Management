import mongoose from "mongoose";


const enterpriseteamSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true,
    },
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    account_status:{
       type:String,
       default:'Active'
    },
    posted_jobs:[String],
    received_candidates:[Object]
},{timestamps:true})


export default mongoose.model("enterpriseteam",enterpriseteamSchema)