import MASTERADMIN from "../models/MASTERADMIN.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { error } from "../utils/error.js"


export const login=async (req,res,next)=>{
   try{
      let admin=null
      switch(req.body.admin_type){
        
           case "super_admin":
            break;

           case "master_admin":
            admin=await MASTERADMIN.findOne({email:req.body.email})
            console.log(admin)
            break;
        
           case "account_manager":
            break;
      }
      if(admin){
        const isPasswordCorrect=await bcrypt.compare(req.body.password,admin.password)
        if(!isPasswordCorrect) return next(404,"Password is incorrect")
        const token=jwt.sign({id:admin._id,admin_type:admin.admin_type},process.env.JWT)
        const {_id,email,admin_type}=admin._doc
        res.cookie("admin_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:false,secure:true,sameSite:'none'}).status(200).json({details:{_id,email,admin_type}})

      }else{
         console.log("admin not found")
         return next(error(404,"User not found by this emial address"))
      }
   }catch(err){
      next(err)
   }
}

export const register=async (req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    try{  
       const masteradmin=new MASTERADMIN({...req.body,password:hash})
       await masteradmin.save()
       res.status(200).json("New masteradmin created successfully")
    }catch(err){
      next(err)
    }
}