import express from 'express'
import fs from "fs"
import path from "path"
import multer from 'multer'
import { fileURLToPath } from 'url';
import { createJobs, craeteJobBasicDeatils, createCompanyDetails, createJobAttachment, createJobCommission, createJobSq, createSourcingDetails, getAllJobs, getAcmanagerJobs, deleteJob, deleteJobCommissionDetails, deleteCompanyDetails, deleteJobSourcingDetails, deleteJobAttachments, deleteJobSQ, deleteJobBasicDetails, getDashboardCount, getJobByJobId } from '../controller/acmanagerJobController.js'


const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//for deleting existing folder 
const prepareFolder = (req, res, next) => {
    const exist_folder = path.join(__dirname, "..", `uploads/jobdocs/${req.params.jobid}`)
    if (fs.existsSync(exist_folder)) fs.rmSync(exist_folder, { recursive: true, force: true })
    next()
}


//middleware function to handle file replacement
const fileFilter = (req, file, cb) => {
    const uplodDir = `uploads/jobdocs/${req.params.jobid}`
    if (fs.existsSync(uplodDir)) {
        const files = fs.readdirSync(uplodDir)
        if (files.length > 0) {
            for (let fl of files) {
                if (path.parse(fl).name === file.fieldname) {
                    if (fs.existsSync(`${uplodDir}/${fl}`)) {
                        fs.unlinkSync(`${uplodDir}/${fl}`)
                    }
                }
            }
        }
    }
    cb(null, true)
}

//creatign disk storage for upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uniqueFolder = `uploads/jobdocs/${req.params.jobid}`
        fs.mkdirSync(uniqueFolder, { recursive: true })
        cb(null, uniqueFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
})

const upload = multer({ storage, fileFilter })

//For creating job
router.post('/', createJobs)

//For creating jobs basic details 
router.post('/basicjob/:orgjobid',craeteJobBasicDeatils)

//For create job commission details
router.post('/jobcommission/:orgjobid',createJobCommission)

//For create job company details 
router.post('/company/:orgjobid',createCompanyDetails)

//for creating sourcing guidelines
router.post('/sourcing/:orgjobid',createSourcingDetails)

//for attached job documents
router.post('/uploadjobdocs/:jobid', prepareFolder, upload.fields([
    { name: 'sample_cv', maxCount: 1 },
    { name: 'evaluation_form', maxCount: 1 },
    { name: 'audio_brief', maxCount: 1 },
    { name: 'other_docs', maxCount: 1 }
]), createJobAttachment)

//For create sq question
router.post('/jobsq/:orgjobid', createJobSq)

//For get all jobs
router.get('/',getAllJobs)

//For get Acmanager jobs 
router.get('/:acid',getAcmanagerJobs)

//For get job jobid
router.get('/byjobid/:jobid',getJobByJobId)

//For Delete job
router.delete('/:jobid',deleteJob)

//For delete job basic details 
router.delete('/removejobbasicdetails/:jobid',deleteJobBasicDetails)

//For delete job commission details
router.delete('/removejobcommission/:jobid',deleteJobCommissionDetails)

//For delete job company info
router.delete('/removejobcompany/:jobid',deleteCompanyDetails)

//For delete job sourcing details 
router.delete('/removejobsourcing/:jobid',deleteJobSourcingDetails)

//For delete job attachments 
router.delete('/removejobattachments/:jobid',deleteJobAttachments)

//For delete job sq
router.delete('/removejobsq/:jobid',deleteJobSQ)


//Get all dashboard counts 
router.get('/getdashboardcount/:jobid',getDashboardCount)

export default router

