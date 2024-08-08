import mongoose, { mongo } from "mongoose";


const enterpriseteamSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true,
    },
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
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})


export default mongoose.model("enterpriseteam",enterpriseteamSchema)