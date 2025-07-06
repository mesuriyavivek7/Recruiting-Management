import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    candidate_id:{
        type:String,
        required:true
    },
    candidate_name:{
        type:String,
        required:true
    },
    recruiter_id:{
        type:String,
        required:true
    },
    recruiter_name:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Databaseactivity',activitySchema)