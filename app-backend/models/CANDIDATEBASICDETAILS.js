import mongoose from "mongoose";

const candidatebasicdetailsSchema=new mongoose.Schema({
      candidate_id:{
        type:String,
        required:true
      },
      recruiter_id:{
        type:String,
        required:true
      },
      first_name:{
        type:String,
        required:true
      },
      last_name:{
        type:String,
        required:true
      },
      country:{
        type:String,
        required:true
      },
      current_location:{
        type:String,
        required:true
      },
      primary_email_id:{
        type:String,
        required:true
      },
      additional_email_id:String,
      primary_contact_number:{
        type:String,
        required:true
      },
      additional_contact_number:String,
      current_company:{
        type:String,
        required:true
      },
      current_designation:String,
      experience:{
        type:String,
        required:true
      },
      relevant_experience:{
        type:String,
        required:true
      },
      current_annual_salary:String,
      expected_annual_salary:{
        type:String,
        required:true
      },
      salary_remarks:String,
      notice_period:{
        type:String,
        required:true
      },
      comments:String,
      education_qualification:{
        type:String,
        required:true
      },
      candidate_summary:String,
      candidate_toc:{
        type:Boolean,
        required:true
      }
},{timestamps:true})

export default mongoose.model("candidatebasicdetail",candidatebasicdetailsSchema)