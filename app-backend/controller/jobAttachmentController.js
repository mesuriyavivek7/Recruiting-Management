import JOBATTACHEMENT from "../models/JOBATTACHEMENT.js";
import JOBS from "../models/JOBS.js";
import fs from 'fs'


export const createJobAttachment=async (req,res,next)=>{
    try{
       if(Object.keys(req.files).length>0){
         let sampleCv=(req.files.sample_cv!==undefined)?(req.files.sample_cv[0]):(null)
         let evaluationForm=(req.files.evaluation_form!==undefined)?(req.files.evaluation_form[0]):(null)
         let audioBrief=(req.files.audio_brief!==undefined)?(req.files.audio_brief[0]):(null)
         let otherDocs=(req.files.other_docs!==undefined)?(req.files.other_docs[0]):(null)
         const newobj={
           sample_cv:(sampleCv)?({filename:(sampleCv.fieldname+path.extname(sampleCv.originalname)),filepath:sampleCv.path,filetype:sampleCv.mimetype,filesize:sampleCv.size}):({}),
           evaluation_form:(evaluationForm)?({filename:(evaluationForm.fieldname+path.extname(evaluationForm.originalname)),filepath:evaluationForm.path,filetype:evaluationForm.mimetype,filesize:evaluationForm.size}):({}),
           audio_brief:(audioBrief)?({filename:(audioBrief.fieldname+path.extname(audioBrief.originalname)),filepath:audioBrief.path,filetype:audioBrief.mimetype,filesize:audioBrief.size}):({}),
           other_docs:(otherDocs)?({filename:(otherDocs.fieldname+path.extname(otherDocs.originalname)),filepath:otherDocs.path,filetype:otherDocs.mimetype,filesize:otherDocs.size}):({})
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

export const getJobAttachmentsDetails=async (req,res,next)=>{
  try{
    let jobattachment=await JOBATTACHEMENT.findOne({folder_name:req.params.jobid},{_id:0,createdAt:0,updatedAt:0,folder_name:0})
    res.status(200).json(jobattachment)
  }catch(err){
    next(err)
  }
}




export const checkAndRemoveFile=async (req,res,next)=>{
  try{
     const {jobid,fieldname}=req.body
     let filedata=null
     switch(fieldname){
           case "sample_cv":
            let samplecvfile=await JOBATTACHEMENT.findOne({folder_name:jobid},{sample_cv:1,_id:0})
            if(samplecvfile){

              filedata=samplecvfile.sample_cv
              if(filedata){
                const filepath=filedata.filepath
                if(fs.existsSync(filepath)){
                  fs.unlinkSync(filepath)
                  await JOBATTACHEMENT.updateOne({folder_name:jobid},{$set:{sample_cv:{}}})
                }
             }

            }
           
            break;

          case "evaluation_form":
            let evaluationfile=await JOBATTACHEMENT.findOne({folder_name:jobid},{evaluation_form:1,_id:0})
            if(evaluationfile){
              filedata=evaluationfile.evaluation_form
              if(filedata){
                const filepath=filedata.filepath
                if(fs.existsSync(filepath)){
                  fs.unlinkSync(filepath)
                  await JOBATTACHEMENT.updateOne({folder_name:jobid},{$set:{evaluation_form:{}}})
                }
             }
            }
            break;

          case "audio_brief":
            let audiofile=await JOBATTACHEMENT.findOne({folder_name:jobid},{audio_brief:1,_id:0})
            if(audiofile){
            filedata=audiofile.audio_brief
            if(filedata){
              const filepath=filedata.filepath
              if(fs.existsSync(filepath)){
                fs.unlinkSync(filepath)
                await JOBATTACHEMENT.updateOne({folder_name:jobid},{$set:{audio_brief:{}}})
              }
           }
          }
            break;
          
          case "other_docs":
            let otherfile=await JOBATTACHEMENT.findOne({folder_name:jobid},{other_docs:1,_id:0})
            if(otherfile){
            filedata=otherfile.other_docs
            if(filedata){
              const filepath=filedata.filepath
              if(fs.existsSync(filepath)){
                fs.unlinkSync(filepath)
                await JOBATTACHEMENT.updateOne({folder_name:jobid},{$set:{other_docs:{}}})
              }
           }
          }
            break;
          
          default:
            break;
     }

     
     res.status(200).json("File check and remove successfully")
  }catch(err){
    next(err)
  }
}

export const updateJobAttachmentsDetails=async (req,res,next)=>{
     
     try{
         if(Object.keys(req.files).length>0){
          let sampleCv=(req.files.sample_cv!==undefined)?(req.files.sample_cv[0]):(null)
          let evaluationForm=(req.files.evaluation_form!==undefined)?(req.files.evaluation_form[0]):(null)
          let audioBrief=(req.files.audio_brief!==undefined)?(req.files.audio_brief[0]):(null)
          let otherDocs=(req.files.other_docs!==undefined)?(req.files.other_docs[0]):(null)

          const newObj={
            ...(sampleCv && {sample_cv:{filename:sampleCv.originalname,filepath:sampleCv.path,filetype:sampleCv.mimetype,filesize:sampleCv.size}}),
            ...(evaluationForm && {evaluation_form:{filename:evaluationForm.originalname,filepath:evaluationForm.path,filetype:evaluationForm.mimetype,filesize:evaluationForm.size}}),
            ...(audioBrief && {audio_brief:{filename:audioBrief.originalname,filepath:audioBrief.path,filetype:audioBrief.mimetype,filesize:audioBrief.size}}),
            ...(otherDocs && {other_docs:{filename:otherDocs.originalname,filepath:otherDocs.path,filetype:otherDocs.mimetype,filesize:otherDocs.size}})
          }
          await JOBATTACHEMENT.findOneAndUpdate({folder_name:req.params.jobid},{$set:{...newObj}})
         }
         res.status(200).json("File details upadated successfully")
     }catch(err){
       next(err)
     }
}