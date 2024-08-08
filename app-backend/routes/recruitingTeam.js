import RECRUITINGTEAM from '../models/RECRUITINGTEAM'

import bcrypt from 'bcryptjs'


//creating team member

export const createteammember=async (req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('uphire', salt);

    try{
       const newteammember=new RECRUITINGTEAM({...req.body,password:hash})
       res.status(200).json("new Team member added")
    }catch(err){
       next(err)  
    } 
}