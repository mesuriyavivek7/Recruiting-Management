import express from 'express'
import fs from "fs"
import path from "path"
import multer from 'multer'
import { fileURLToPath } from 'url';
import { activateJob, addCandidateProfileList, allotedJobToAcManager, createJobs, deleteJobDraftWithOtherDetails, downloadEvaluationForm, getAllJobDetails, getAllJobDraftDetails, getCandidateScreeningQue, getFronLiveJobDetails, getFrontAcceptedJobDetails, getFrontMappedJobDetails, getJobAttachmentsDetailsForCandidate } from '../controller/jobController.js'
import { craeteJobBasicDeatils, getJobBasicDetails } from '../controller/jobBasicController.js'
import { createJobDraft, deleteJobDraft } from '../controller/jobDraftController.js'
import { createJobCommission, getJobCommissionDetails } from '../controller/jobCommissionController.js'
import { createCompanyDetails, getJobCompanyDetails } from '../controller/jobCompanyController.js'
import { createSourcingDetails, getSourcingDetails } from '../controller/jobSourcingController.js'
import { checkAndRemoveFile, createJobAttachment, getJobAttachmentsDetails, updateJobAttachmentsDetails } from '../controller/jobAttachmentController.js'
import { createJobSq, getScreeningQue } from '../controller/jobSqController.js';

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
       cb(null,file.fieldname+path.extname(file.originalname));
    }
})

//middleware function to handle file replacement
const fileFilter=(req,file,cb)=>{
    const uplodDir=`uploads/jobdocs/${req.params.jobid}`
    if(fs.existsSync(uplodDir)){
        const files=fs.readdirSync(uplodDir)
        if(files.length>0){
            for(let fl of files){
                if(path.parse(fl).name===file.fieldname){
                    if(fs.existsSync(`${uplodDir}/${fl}`)){
                        fs.unlinkSync(`${uplodDir}/${fl}`)
                    }
                }
            }
        }
    }
    cb(null,true)
    
}

const upload=multer({storage,fileFilter})

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

//update uploaded job attachments file
router.post('/updateuploadjobdocs/:jobid',upload.fields([
    { name: 'sample_cv',maxCount:1 },
    { name: 'evaluation_form',maxCount:1 },
    { name: 'audio_brief',maxCount:1},
    { name: 'other_docs',maxCount:1}
]),updateJobAttachmentsDetails)

//for check given file is present in upload folder
router.post('/checkjobattachfile',checkAndRemoveFile)

//for creating job screening questions
router.post('/jobsq/:orgjobid',createJobSq)

//for creating job draft 
router.post('/savedraft',createJobDraft)

//for deleting job saved draft
router.delete('/deletejobdraft/:jobid',deleteJobDraft)

//for allocating job to account manager
router.post('/allotacmanager/:orgid',allotedJobToAcManager)

//for activated job 
router.put('/activatejob/:orgid',activateJob)

//for getting jobs details for showing front table
router.get('/getalljobdetails/:ememberid',getAllJobDetails)

//for getting job draft detials for showing front table
router.get('/getalljobdraftdetails/:ememberid',getAllJobDraftDetails)

//for deleting job draft with others details 
router.delete('/deletedraftwithjobs/:jobid',deleteJobDraftWithOtherDetails)

//for getting job data for to show in draft page

//for getting basic job details
router.get("/getbasicjobdetails/:jobid",getJobBasicDetails)

//for getting job commission details
router.get("/getjobcommissiondetails/:jobid",getJobCommissionDetails)

//for getting job company details
router.get('/getcompanydetails/:jobid',getJobCompanyDetails)

//for getting sourcing guidelines details
router.get('/getsourcingdetails/:jobid',getSourcingDetails)

//for getting job attachments details for showing in to job draft
router.get('/getjobattachmentdetails/:jobid',getJobAttachmentsDetails)

//for gettign job screening questions details
router.get('/getscreeningquestions/:jobid',getScreeningQue)

//for getting job details for showing into recruting agency job section

//for getting job details for showing front page live jobs
router.get('/frontlivejobs/:jobid',getFronLiveJobDetails)

//for getting job details for showing front page of mapped job
router.get('/frontmappedjobs/:rteamid',getFrontMappedJobDetails)

//for getting job details for showing front page of accepted job
router.get('/frontacceptedjobs/:rteamid',getFrontAcceptedJobDetails)

//for getting job details for showing to candidate form filling page

//for gettign job details for job attachments
router.get('/getcandidatejobattachments/:jobid',getJobAttachmentsDetailsForCandidate)

//for getting screening question 
router.get('/getcandidatescreeningque/:jobid',getCandidateScreeningQue)

//for downloading
//for dowloading evaluation file
router.get('/download/evaluationform/:jobid',downloadEvaluationForm)


//add candidate profile into jobs candidate profile list
router.post('/addcandidateprofilelist/:jobid',addCandidateProfileList)

export default router