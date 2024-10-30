import mongoose from "mongoose";


const accountmanagerSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    mobileno:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique : true,
    },
    password:{
        type:String,
        required:true
    },
    pending_verify_enterprise:{
         type:[String]
    },
    pending_verify_recruiting_agency:{
         type:[String]
    },
    verified_enterprise:{
        type:[String]
    },
    verified_recruiting_agency:{
        type:[String]
    },
    pending_verify_candidate_profile:{
        type:[String]
    },
    pending_verify_jobs:{
        type:[String]
    },
    verified_candidate_profile:{
        type:[String]
    },
    verified_jobs:{
        type:[String]
    },
    master_admin:{
      type:String,
      required:true  
    },
    admin_type:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("accountmanager",accountmanagerSchema)