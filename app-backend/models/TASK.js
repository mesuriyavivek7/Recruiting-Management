import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    candidate_id:{
        type:String,
        required:true
    },
    candidate_name:{
        type:String,
        required:true
    },
    recruiter_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recruitingteam'
    },
    task_details:{
        type:String,
        required:true
    },
    scheduledTime:{
        type:Date,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('Task',taskSchema)