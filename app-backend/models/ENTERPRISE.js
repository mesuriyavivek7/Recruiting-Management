import mongoose, { mongo } from "mongoose";


const enterpriseSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobileno:{
        type:String,
        required:true
    },
    password:{
       type:String,
       required:true
    },
    designation:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    company_size:{
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
    email_verified:{
        type:Boolean,
        default:false
    },
    account_status:{
        type:Object,
        default:{
            status:"Active",
            remark:"",
            admin_id:""
        }
    },
    admin_verified:{
        type:Boolean,
        default:false
    },
    allocated_account_manager:{
        type:String,
    },
    account_manager_verified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


export default mongoose.model("enterprises",enterpriseSchema)