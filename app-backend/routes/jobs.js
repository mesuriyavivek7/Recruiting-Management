import express from 'express'
import fs from "fs"
import path from "path"
import multer from 'multer'
import { fileURLToPath } from 'url';
import { createJobs } from '../controller/jobController.js'
import { craeteJobBasicDeatils } from '../controller/jobBasicController.js'
import { createJobDraft } from '../controller/jobDraftController.js'
import { createJobCommission } from '../controller/jobCommissionController.js'
import { createCompanyDetails } from '../controller/jobCompanyController.js'
import { createSourcingDetails } from '../controller/jobSourcingController.js'
import { createJobAttachment } from '../controller/jobAttachmentController.js'

const router=express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//for deleting existing folder 
const prepareFolder=(req,res,next)=>{
   const exist_folder=path.join(__dirname,"..",`uploads/jobdocs/${req.params.jobid}`)
   if(fs.existsSync(exist_folder)) fs.rmSync(exist_folder,{recursive:true,force:true})

   next()
}


//creatign disk storage for upload files
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        
        const uniqueFolder=`uploads/jobdocs/${req.params.jobid}`
        fs.mkdirSync(uniqueFolder,{recursive:true})
        cb(null,uniqueFolder);
    },
    filename:(req,file,cb)=>{
       cb(null,file.originalname);
    }
})

const upload=multer({storage})

//for creating job
router.post('/',createJobs)

//for creating jobs basic details
router.post('/basicjob/:orgjobid',craeteJobBasicDeatils)

//for creating job commission details
router.post('/jobcommission/:orgjobid',createJobCommission)

//for creating job with company details
router.post('/company/:orgjobid',createCompanyDetails)

//for creating sourcing guidelines
router.post('/sourcing/:orgjobid',createSourcingDetails)

//upload attached jobs documents
// router.post('/uploadjobdocs/:jobid',upload.fields[{name:"sample_cv"},{name:"evaluation_form"},{name:'audio_brief'},{name:"other_docs"}],createJobAttachment)
router.post('/uploadjobdocs/:jobid',prepareFolder,upload.fields([
    { name: 'sample_cv',maxCount:1 },
    { name: 'evaluation_form',maxCount:1 },
    { name: 'audio_brief',maxCount:1},
    { name: 'other_docs',maxCount:1}
  ]),createJobAttachment)


//for creating job screening questions

//for creating job draft 
router.post('/savedraft',createJobDraft)


export default router