import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js"
import bcrypt from 'bcryptjs'


export const createEnterpriseTeam=async (req,res,next)=>{
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);
    const newenterprisemember=new ENTERPRISETEAM({...req.body,password:hash})
    await newenterprisemember.save()
    res.status(200).json("New enterprise team member created")    
  }catch(err){
    next(err)
  }
}