import mongoose from "mongoose";


const jobSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        //required:true
    },
    enterprise_member_id:{
        type:String,
        //required:true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobcommission',
    },
    job_company_details:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobcompanyinfo',
    },
    job_sourcing_guidelines:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobsourcingdetails',
    },
    job_attachments:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobattachment',
    },
    job_screening_questionsa:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobsq',
    },
    isDraft:{
        type:Boolean,
        default:false
    },
    job_status:{
        type:String,
        required:true
    },
    mark_hot_job:{
        type:Boolean,
        default:false
    },
    alloted_account_manager:{
        type:String
    },
    job_updates:[{
        text:String,
        timestamps:{
            type:Date,
            default:Date.now
        }
    }],
    resume_required:String,
    job_request:[String],
    accepted_recruiting_agency:[String],
    mapped_recruiting_agency_member:[String],
    job_rejection_reason:{
        recruiting_agency_member:String,
        reason:String
    },
    posted_candidate_profiles:[String]

},{timestamps:true});

export default mongoose.model('job',jobSchema)