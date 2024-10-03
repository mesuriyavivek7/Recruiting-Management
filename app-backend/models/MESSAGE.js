import mongoose from 'mongoose'


const messageSchema=new mongoose.Schema({
     sender:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'senderModel',
        required:true,
     },
     senderModel:{
       type:String,
       required:true,
       enum:['enterpriseteam','recruitingteam']
     },
     receiver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'receiverModel'
     },
     receiverModel:{
        type:String,
        required:true,
        enum:['enterpriseteam','recruitingteam']
     },
     content:{
        type:String,
        required:true
     },
     timestamp:{
        type:Date,
        default:Date.now
     }
})

export default mongoose.model("message",messageSchema)