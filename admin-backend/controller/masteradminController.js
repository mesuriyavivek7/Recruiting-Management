import MASTERADMIN from "../models/MASTERADMIN.js";


export const addEnterprise=async (req,res,next)=>{
    try{
        let masteradmin=null
        const masteradmin_ct=await MASTERADMIN.findOne({master_admin_type:req.body.country.toLowerCase()})
        if(masteradmin_ct){
                masteradmin=masteradmin_ct
        }else{
            if(req.body.country==="India"){
                masteradmin=await MASTERADMIN.findOne({master_admin_type:"domestic"})
            }else{
                masteradmin=await MASTERADMIN.findOne({master_admin_type:"international"})
            }

        }
        //update master admin pending verification list
        await MASTERADMIN.findByIdAndUpdate(masteradmin._id,{$push:{pending_verify_enterprise:req.body.id}})
    
        res.status(200).json("Masteradmin pending list updated")
    }catch(err){
        next(err)
    }
}