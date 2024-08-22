import RECRUITING from "../models/RECRUITING.js"



//for kyc details submission
export const kycDetailsSubmission=async (req,res,next)=>{
    try{
        const r_id=req.params.id
        await RECRUITING.findByIdAndUpdate(r_id,{$set:{kyc_details:req.body}})
        res.status(200).json("KYC Details Submited successfully")
    }catch(err){
     next(err)
    }
}


//for kyc document submission

export const kycDocsSubmission=async (req,res,next)=>{
    try{
       const r_id=req.params.id
       const filedata={
          filename:req.file.filename,
          filepath:req.file.path,
          filetype:req.file.mimetype
       }
       await RECRUITING.findByIdAndUpdate(r_id,{$set:{kyc_documents:filedata}})
       res.status(200).json("Kyc Document uploaded successfully")
    }catch(err){
        next(err)
    }
}



export const getAllPendingMadminVerifyRAgency=async (req,res,next)=>{
    try{
       const r_agency=await RECRUITING.find({admin_verified:false})
       res.status(200).json(r_agency)
    }catch(err){
        next(err)
    }
}


export const allocatedAcManager=async (req,res,next)=>{
    try{
         await RECRUITING.findByIdAndUpdate(req.body.ra_id,{$set:{admin_verified:true,alloted_account_manager:req.body.ac_id}})
         console.log("Assigned to recruiting agency")
         res.status(200).json("Sucessfully recruiting agency assigned to account manager")
    }catch(err){
         console.log(err)
         next(err)
    }
}


export const changeAccountStatus=async (req,res,next)=>{
    try{
       if(req.body.status==="Active"){
          await RECRUITING.findByIdAndUpdate(req.body.id,{$set:{account_status:{status:"Inactive",remark:req.body.reason,admin_id:req.body.admin_id}}})
       }else{
          await RECRUITING.findByIdAndUpdate(req.body.id,{$set:{account_status:{status:"Active",remark:"",admin_id:""}}})
       }
       res.status(200).json("Status changed sucessfully")
    }catch(err){
        next(err)
    }
}


export const getAllPendingAcmanagerRecruiting=async (req,res,next)=>{
    try{
      const r_agency=await RECRUITING.find({account_manager_verified:false})
      res.status(200).json(r_agency)
    }catch(err){
        next(err)
    }
}