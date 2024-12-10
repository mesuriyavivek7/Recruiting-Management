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



export const getAllSupport = async (req, res, next) =>{
    try{
       const supports= await SUPPORT.find()
       res.status(200).json(supports)
    }catch(err){
       next(err)
    }
}


export const updateSupportsDetails = async (req, res, next) =>{
    try{
       const {supports} = req.body

       await Promise.all(supports.map(async (item)=>{
           await SUPPORT.findByIdAndUpdate(item._id,{$set:{name:item.name,email:item.email,support_desc:item.support_desc,profile_picture:item.profile_picture}})
       }))

       res.status(200).json("Supports data updated")
    }catch(err){
       next(err)
    }
}