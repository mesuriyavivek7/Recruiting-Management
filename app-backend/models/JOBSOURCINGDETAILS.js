import mongoose from "mongoose"

const jobsourcingdetailsSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        // required:true
    },
    job_id:{
        type:String,
        required:true
    },
    must_haves:{
        type:String,
        required:true
    },
    poach_clients:String,
    nice_to_haves:String,
    target_companies:String,
    additional_guidelines:String
},{timestamps:true})

export default mongoose.model("jobsourcingdetails",jobsourcingdetailsSchema)