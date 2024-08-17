import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"

//get account manager by master admin id
export const getAcByMadminId=async (req,res,next)=>{
    try{
      const getaccountmanager=await ACCOUNTMANAGER.find({master_admin:req.params.id})
      res.status(200).json(getaccountmanager)
    }catch(err){
        next(err)
    }
}