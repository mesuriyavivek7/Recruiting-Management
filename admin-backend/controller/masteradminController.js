import MASTERADMIN from "../models/MASTERADMIN.js";


export const addEnterprise=async (req,res,next)=>{
    try{
        let masteradmin=null
        if(req.body.country==="India"){
          masteradmin=await MASTERADMIN.findOne({master_admin_type:"domestic"})
         }else{
          masteradmin=await MASTERADMIN.findOne({master_admin_type:"international"})
         }
    
        console.log("masteradmin------->",masteradmin)
        //update master admin pending verification list
        await MASTERADMIN.findByIdAndUpdate(masteradmin._id,{$push:{pending_verify_enterprise:req.body.id}})
    
        res.status(200).json("Masteradmin pending list updated")
    }catch(err){
        next(err)
    }
}