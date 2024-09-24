import mongoose from "mongoose";


const recruitingteamSchema=new mongoose.Schema({
    recruiting_agency_id:{
        type:String,
        required:true
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
    email_verified:{
       type:Boolean,
       dafault:false
    },
    hide_commision:{
        type:Boolean,
        default:false
    },
    mapped_jobs:[String],
    accepted_jobs:[String],
    requested_jobs:[String],
    rejected_jobs:{
        orgjobid:String,
        reason:String
    }
})


export default mongoose.model('recruitingteam',recruitingteamSchema)