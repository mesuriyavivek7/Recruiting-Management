import mongoose from "mongoose";

const supportSchema=new mongoose.Schema({
    support_type:{
        type:String,
        required:true
    },
    support_desc:{
        type:String,
        required:true,
    },
    dashboard_type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profile_picture:String
},{timestamps:true})

export default mongoose.model('support',supportSchema)