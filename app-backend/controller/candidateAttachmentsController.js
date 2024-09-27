import CANDIDATEATTACHMENT from "../models/CANDIDATEATTACHMENT.js";
import CANDIDATE from "../models/CANDIDATE.js";
import path from 'path'

export const uploadCandidateAttachments=async (req,res,next)=>{
    try{
       if(Object.keys(req.files).length>0){
        let evaluationForm=(req.files.evaluation_form!==undefined)?(req.files.evaluation_form[0]):(null)
        let audioBrief=(req.files.audio_brief!==undefined)?(req.files.audio_brief[0]):(null)
        let otherDocs=(req.files.other_docs!==undefined)?(req.files.other_docs[0]):(null)

        const newObj={
           evaluation_form:(evaluationForm)?({filename:(evaluationForm.fieldname+path.extname(evaluationForm.originalname)),filepath:evaluationForm.path,filetype:evaluationForm.mimetype,filesize:evaluationForm.size}):({}),
           audio_brief:(audioBrief)?({filename:(audioBrief.fieldname+path.extname(audioBrief.originalname)),filepath:audioBrief.path,filetype:audioBrief.mimetype,filesize:audioBrief.size}):({}),
           other_docs:(otherDocs)?({filename:(otherDocs.fieldname+path.extname(otherDocs.originalname)),filepath:otherDocs.path,filetype:otherDocs.mimetype,filesize:otherDocs.size}):({})
        }
        //creating candidate attachments 
        const attachments=await CANDIDATEATTACHMENT.findOneAndUpdate({folder_name:req.params.cid},{$set:{...newObj}},{upsert:true,new:true})
        //update candidate details
        await CANDIDATE.findOneAndUpdate({candidate_id:req.params.cid},{$set:{candidate_attachments:attachments._id}})
       }
       res.status(200).json("Fiel uploaded successfully")
    }catch(err){
        next(err)
    }
}