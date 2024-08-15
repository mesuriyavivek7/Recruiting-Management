import mongoose from "mongoose";


const masteradminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
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
    account_manager:{
        type:[String]
    },
    verified_enterprise:{
        type:[String]
    },
    verified_recruiting_agency:{
        type:[String]
    },
    admin_type:{
       type:[String]
    },
    master_admin_type:{
        type:String,
        required:true
    }

})


export default mongoose.model("masteradmin",masteradminSchema)