import SUPPORT from "../models/SUPPORT.js";


export const createSupport = async (req, res, next)=>{
      try{
         const newsupport = new SUPPORT({...req.body})
         await newsupport.save()
         res.status(200).json("New Support Created")
      }catch(err){
         next(err)
      }
}



export const getSupport = async (req, res, next)=>{
     try{
        const {dashboard_type} = req.params
        const supports = await SUPPORT.find({dashboard_type:dashboard_type})

        res.status(200).json(supports)
     }catch(err){
        next(err)
     }
}
