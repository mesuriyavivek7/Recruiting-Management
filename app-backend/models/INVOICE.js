import mongoose from "mongoose";

const invoiceSchema=new mongoose.Schema({
    //this id is org mongodb id
    candidate_id:{
        type:String,
        required:true
    },
    //this is generated id
    c_id:{
        type:String,
        required:true
    },
    candidate_name:{
        type:String,
        required:true
    },
    candidate_email:{
        type:String,
        required:true
    },
    candidate_mobile_no:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    job_name:{
        type:String,
        required:true
    },
    submited_recruiter_member_id:{
        type:String,
        required:true
    },
    invoice_status:{
        type:String,
        default:"Pending"
    },
    invoice_docs:{
        filename:String,
        filepath:String,
        filetype:String,
        filesize:Number
    }
},{timestamps:true})

export default mongoose.model("invoice",invoiceSchema)