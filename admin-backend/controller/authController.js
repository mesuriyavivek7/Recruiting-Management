import MASTERADMIN from "../models/MASTERADMIN.js"
import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SUPERADMIN from "../models/SUPER.js"


const getModal= (userType)=>{
     switch(userType){
        case "master_admin":
         return MASTERADMIN;
         break;

        case "account_manager":
         return ACCOUNTMANAGER;
         break;
      
        case "super_admin":
         return SUPERADMIN
         break;
     }
}


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
        res.cookie("admin_user",token,{expires:new Date(Date.now()+2592000000),httpOnly:true,secure:process.env.NODE_ENV === 'production',sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',domain:process.env.NODE_ENV === 'production'?'.vms.uphire.in':undefined}).status(200).json({details:{_id,email,admin_type}})

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


export const validateUser = async (req, res, next)=>{
    try{
       //Extract the token from cooki
       const token = req.cookies.admin_user
       if(!token) {
         return res.status(401).json({message: "No token found"})
       }

       //verify the token
       const decoded = jwt.verify(token, process.env.JWT)

       const Modal = getModal(decoded.admin_type)

       //Fetch user
       const user= await Modal.findById(decoded.id)

       if(!user) {
          return res.status(404).json({message: "User not found"})
       }

       //Exclude sensitive fields from the user data
       const {_id,email,admin_type}=user._doc

       res.status(200).json({details:{_id,email,admin_type}})

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
