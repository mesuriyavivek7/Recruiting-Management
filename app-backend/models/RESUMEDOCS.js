import mongoose from "mongoose";

const resumedocsSchema=new mongoose.Schema({  
    candidate_id:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filetype:{
        type:String,
        required:true
    },
    filesize:{
        type:Number,
        required:true
    }
})


export default mongoose.model("resumedocs",resumedocsSchema)