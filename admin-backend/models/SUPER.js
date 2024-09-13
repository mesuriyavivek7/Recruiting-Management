import mongoose from "mongoose";


const superadminSchema=new mongoose.Schema({
    full_name:{
       type:String
    },
    mobileno:{
       type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    admin_type:{
       type:String,
       required:true
    },
    super_admin_type:{
        type:String,
        required:true
    }

},{timestamps:true})


export default mongoose.model("superadmin",superadminSchema)