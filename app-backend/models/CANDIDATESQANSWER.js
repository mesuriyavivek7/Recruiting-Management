import mongoose from "mongoose";

const candidatesqanswerSchema=new mongoose.Schema({
    candidate_id:{
        type:String,
        required:true
    },
    recruiting_id:{
        type:String,
        required:true
    },
    screening_questions:[Object],
    screening_answer:[Object]
})


export default mongoose.model("candidatesqanswer",candidatesqanswerSchema)