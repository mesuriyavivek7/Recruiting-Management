import mongoose, { mongo } from "mongoose";


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
    }
})


export default mongoose.model('recruitingteam',recruitingteamSchema)