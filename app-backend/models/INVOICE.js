import mongoose from "mongoose";

const invoiceSchema=new mongoose.Schema({
    candidate_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'candidate',
        required:true
    },
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },
    recruiter_member_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recruitingteam',
        required:true
    },
    offer_letter:{
        type:String,
        required:true
    }

},{timestamps:true})

export default mongoose.model("invoice",invoiceSchema)