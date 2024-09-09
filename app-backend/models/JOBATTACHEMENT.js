import mongoose from "mongoose";

const jobattachmentSchema=new mongoose.Schema({
    sample_cv:{
          filename:String,
          filepath:String,
          filetype:String,
          filesize:Number,
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
    folder_name:{
      type:String,
      required:true
    },

},{timestamps:true});

export default mongoose.model("jobattachment",jobattachmentSchema)