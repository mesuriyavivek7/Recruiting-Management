import mongoose from "mongoose";

const acmanagerjobSchema = new mongoose.Schema(
    {
        acmanager_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'accountmanager',
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
        job_status:{
            type:String,
            required:true
        },
        mark_hot_job:{
            type:Boolean,
            default:false
        },
        job_updates:[{
            text:String,
            timestamps:{
                type:Date,
                default:Date.now
            }
        }],
        resume_required:String,
        job_request:[{ type:mongoose.Schema.Types.ObjectId, ref:'candidate'}],
        accepted_recruiting_agency:[{ type:mongoose.Schema.Types.ObjectId, ref:'Recruiting'}],
        mapped_recruiting_agency_member:[{ type:mongoose.Schema.Types.ObjectId, ref:'Recruiting'}],
        job_rejection_reason:{
            recruiting_agency_member:String,
            reason:String
        },
        posted_candidate_profiles:[{ type:mongoose.Schema.Types.ObjectId, ref:'candidate'}]

    }
,{timestamps:true})

export default mongoose.model('acmanagerjob',acmanagerjobSchema)