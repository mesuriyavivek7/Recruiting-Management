import mongoose, { mongo } from "mongoose";


const recruitingteamSchema=mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    hide_commision:{
        type:Boolean,
        default:false
    }
})


export default mongoose.model('recruitingteam',recruitingteamSchema)