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