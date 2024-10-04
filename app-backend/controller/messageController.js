import MESSAGE from '../models/MESSAGE.js'
import ENTERPRISETEAM from '../models/ENTERPRISETEAM.js'
import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'

//Helper function to determine usermodel
const getUserModel=async (userId)=>{
     const enterprise=await ENTERPRISETEAM.findById(userId)
     if(enterprise) return 'enterpriseteam'

     const recruiter=await RECRUITINGTEAM.findById(userId)
     if(recruiter) return "recruitingteam"

     return null
}


//send message
export const sendMessage=async (req,res,next)=>{
       const {receiverId,receiverModel,content}=req.body

       const senderId=req.user.id

       //valiadte receiver model
       if(!['recruitingteam','enterpriseteam'].includes(receiverModel)){
          return res.status(400).json("Invalid receiver model")
       }


       //Determine sender model name
       const senderModel=await getUserModel(senderId)
       if(!senderModel) return res.status(400).json("Invalid Sender")

       //Prevent sender message to ourself
       if(senderId===receiverId) return res.status(200).json("cannot sent message to yourself")


       //verify receiver existent
       let receiverExist
       if(receiverModel==="enterpriseteam"){
         receiverExist=await ENTERPRISETEAM.findById(receiverId)
       }else if(receiverModel==="recruitingteam"){
         receiverExist=await RECRUITINGTEAM.findById(receiverId)
       }

       if(!receiverExist){
           return res.status(400).json("Receiver not found")
       }

       try{
         const message=new MESSAGE({
            sender:senderId,
            senderModel,
            receiver:receiverId,
            receiverModel,
            content
         })
         await message.save()

         //populate sender and receiver message
         const populateMessage=await MESSAGE.findById(message._id)
         .populate('sender','full_name')
         .populate('receiver','full_name')

         res.status(200).json(populateMessage)
       }catch(err){
         next(err)
       }
}


//For getting messages

export const getMessage=async (req,res,next)=>{
   const otherUserId=req.params.userId
   const currentUserId=req.user.id



   try{

      const message=await MESSAGE.find({
         $or:[
            {sender:currentUserId,receiver:otherUserId},
            {sender:otherUserId,receiver:currentUserId}
         ]
      }).sort({timestamp:1})
      .populate('sender','full_name')
      .populate('receiver',"full_name")

      res.status(200).json(message)

   }catch(err){
      next(err)
   }
}