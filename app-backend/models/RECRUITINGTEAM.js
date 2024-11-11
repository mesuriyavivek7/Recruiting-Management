import mongoose from "mongoose";


const recruitingteamSchema=new mongoose.Schema({
    recruiting_agency_id:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String
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
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    account_status:{
       type:String,
       default:"Active"
    },
    email_verified:{
       type:Boolean,
       dafault:false
    },
    hide_commision:{
        type:Boolean,
        default:false
    },
    favourite_jobs:[String],
    mapped_jobs:[String],
    accepted_jobs:[String],
    requested_jobs:[String],
    rejected_jobs:{
        orgjobid:String,
        reason:String
    },
    submited_candidate_profile:[Object]
},{timestamps:true})


export default mongoose.model('recruitingteam',recruitingteamSchema)