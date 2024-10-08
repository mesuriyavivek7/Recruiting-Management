import mongoose from "mongoose";


const jobSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true
    },
    enterprise_member_id:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    job_basic_details:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobbasicdetail'
       
    },
    
    job_commission_details:{
        type:String
    },
    job_company_details:{
        type:String
    },
    job_sourcing_guidelines:{
        type:String
    },
    job_attachments:{
        type:String
    },
    job_screening_questionsa:{
        type:String
    },
    isDraft:{
        type:Boolean,
        default:false
    },
    job_status:{
        type:String,
        required:true
    },
    alloted_account_manager:{
        type:String
    }

},{timestamps:true});

export default mongoose.model('job',jobSchema)