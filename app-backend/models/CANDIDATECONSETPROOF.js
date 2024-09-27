import mongoose from "mongoose";

const consentproofSchema=new mongoose.Schema({
     candidate_id:{
        type:String,
        required:true,
     },
     filename:String,
     filepath:String,
     filetype:String,
     filesize:String
},{timestamps:true})

export default mongoose.model('candidateconsentproof',consentproofSchema)