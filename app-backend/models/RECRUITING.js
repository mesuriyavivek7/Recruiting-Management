import mongoose from "mongoose";

const recruitingagencySchema=mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
      type:String,
      required:true
    },
    mobileno:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    company_size:{
        type:Number,
        required:true
    },
    desination:{
        type:String,
        required:true
    },
    linkedin_url:{
        type:String,
        required:true
    },
    firm_type:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    domains:{
        type:[String]
    },
    email_verified:{
        type:String,
        default:false
    },
    kyc_verified:{
        type:String,
        default:false
    },
    kyc_details:{
        entity_type:String,
        pancard_number:String,
        pancard_document:String
    }

    

})

export default mongoose.model("Recruiting",recruitingagencySchema)