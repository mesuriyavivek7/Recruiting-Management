import mongoose from "mongoose";

const candidateattachmentsSchema=new mongoose.Schema({
       folder_name:{
        type:String,
        required:true
       },
       recruiting_id:{
        type:String,
        required:true
       },
       evaluation_form:{
        filename:String,
        filepath:String,
        filetype:String,
        filesize:Number,
       },
        audio_brief:{
         filename:String,
         filepath:String,
         filetype:String,
         filesize:Number,
        },
        other_docs:{
          filename:String,
          filepath:String,
          filetype:String,
          filesize:Number,
        },

},{timestamps:true})

export default mongoose.model("candidateattachment",candidateattachmentsSchema)