import MASTERADMIN from "../models/MASTERADMIN.js"
import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SUPERADMIN from "../models/SUPER.js"


export const login=async (req,res,next)=>{
   try{
      let admin=null
      switch(req.body.admin_type){
        
           case "super_admin":
            admin=await SUPERADMIN.findOne({email:req.body.email})
            break;

           case "master_admin":
            admin=await MASTERADMIN.findOne({email:req.body.email})
            break;
        
           case "account_manager":
            admin=await ACCOUNTMANAGER.findOne({email:req.body.email})
            break;
      }
      if(admin){
        const isPasswordCorrect=await bcrypt.compare(req.body.password,admin.password)
        if(!isPasswordCorrect) return res.status(404).json({message:"Password is incorrect."})
        const token=jwt.sign({id:admin._id,admin_type:admin.admin_type},process.env.JWT)
        const {_id,email,admin_type}=admin._doc
        res.cookie("admin_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:process.env.NODE_ENV === 'production' ? true : false,secure:process.env.NODE_ENV === 'production',sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax'}).status(200).json({details:{_id,email,admin_type}})

      }else{
          return res.status(404).json({message:"User not found by this email address."})
      }
   }catch(err){
      next(err)
   }
}

export const madminRegister=async (req,res,next)=>{
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


export const acRegister=async (req,res,next)=>{
   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.password,salt);
   try{
      const acmanager=new ACCOUNTMANAGER({...req.body,password:hash})
       await acmanager.save()
       res.status(200).json("New Account manager created successfully")
   }catch(err){
      next(err)
   }
}

export const sadminRegister=async (req,res,next)=>{
   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.password,salt);
   try{  
      const superadmin=new SUPERADMIN({...req.body,password:hash})
      await superadmin.save()
      res.status(200).json("New superadmin created successfully")
   }catch(err){
     next(err)
   }
}
