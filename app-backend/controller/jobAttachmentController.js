import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBS from "../models/JOBS.js";


export const createJobAttachment=async (req,res,next)=>{
    try{
       if(Object.keys(req.files).length>0){
         let sampleCv=(req.files.sample_cv!==undefined)?(req.files.sample_cv[0]):(null)
         let evaluationForm=(req.files.evaluation_form!==undefined)?(req.files.evaluation_form[0]):(null)
         let audioBrief=(req.files.audio_brief!==undefined)?(req.files.audio_brief[0]):(null)
         let otherDocs=(req.files.other_docs!==undefined)?(req.files.other_docs[0]):(null)
         const newobj={
           sample_cv:(sampleCv)?({filename:sampleCv.originalname,filepath:sampleCv.path,filetype:sampleCv.mimetype,filesize:sampleCv.size}):({}),
           evaluation_form:(evaluationForm)?({filename:evaluationForm.originalname,filepath:evaluationForm.path,filetype:evaluationForm.mimetype,filesize:evaluationForm.size}):({}),
           audio_brief:(audioBrief)?({filename:audioBrief.originalname,filepath:audioBrief.path,filetype:audioBrief.mimetype,filesize:audioBrief.size}):({}),
           other_docs:(otherDocs)?({filename:otherDocs.originalname,filepath:otherDocs.path,filetype:otherDocs.mimetype,filesize:otherDocs.size}):({})
         }
         //creating job attachment or update it
         const jobattachment=await JOBATTACHEMENT.findOneAndUpdate({folder_name:req.params.jobid},{$set:{...newobj}},{upsert:true,new:true})
         //update job details
         await JOBS.findOneAndUpdate({job_id:req.params.jobid},{$set:{job_attachments:jobattachment._id}})
       }
      
       res.status(200).json("All files uploaded")
    }catch(err){
       next(err)
    }
}


export const showJobAttachment = async (req, res) => {
  try {
    const attachment = await JOBATTACHEMENT.findOne({job_id:req.params.id});
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    } 
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};