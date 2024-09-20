import mongoose from 'mongoose'

const jobsqSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    screening_questions:[Object]

},{timestamps:true})


export default mongoose.model("jobsq",jobsqSchema)