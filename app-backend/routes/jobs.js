import express from 'express'
import fs from "fs"
import path from "path"
import multer from 'multer'
import { fileURLToPath } from 'url';


import { activateJob, getAllJobs, addCandidateProfileList, allotedJobToAcManager, createJobs, deleteJobDraftWithOtherDetails, downloadEvaluationForm, getAllJobDetails, getAllJobDraftDetails, getCandidateScreeningQue, getFrontAcceptedJobDetails, getFrontMappedJobDetails, getJobAttachmentsDetailsForCandidate, getJobBasicDetailsForPreview, getJobCompanyDetailsForPreview, getJobSourcingGuidelinesForPreview, getJobStatusForPreview, getJobCommissionDetailsForPreview, createJobUpdates, getJobUpdates, getJobAttachmentsDetailsForPreview, getAcManagerNameAndMail, viewJobAttachments, downloadJobAttachments, getJobAttachmentFileType, getJobHotMark, changeJobHotMark, getJobCandidatesForPreview, getLiveJobs, getFrontFavouriteJobs, unMapJob, addJobMapRequest, SearchJobByTitle, getJobScreeningQuestionsForPreview, SearchPastJobByTitleAndEnMemberId, getActiveJobCountForEnMember, getPendingJobCountForEnMember, searchJobRecruiter, searchJobEnterprise, getPostedCandidatesByJobId, getAllotedAcManagerId, getMainJobDetails, addCandidateIntoEnMemberReceivedList, getMappedRecruiterMemberIds, getRequestedRecruiterIds, getAcceptedRecruiterIds, addRecruiterMemberIntoMappedList, convertFromRequestedToMapped, removeRememberFromMappedList, getOrgJobId, addRememberIntoAcceptedList, getJdContent } from '../controller/jobController.js';
import { craeteJobBasicDeatils, showJobDetail, getJobBasicDetails, getJobDetailsByEnId, getJobDetailsById } from '../controller/jobBasicController.js'
import { createJobDraft, deleteJobDraft } from '../controller/jobDraftController.js'
import { createJobCommission, showJobCommission, getJobCommissionDetails } from '../controller/jobCommissionController.js'
import { createCompanyDetails, showJobCompanyInfo, getJobCompanyDetails } from '../controller/jobCompanyController.js'
import { createSourcingDetails, showJobSourcingDetails, getSourcingDetails } from '../controller/jobSourcingController.js'
import { checkAndRemoveFile, showJobAttachment, createJobAttachment, getJobAttachmentsDetails, updateJobAttachmentsDetails } from '../controller/jobAttachmentController.js'
import { createJobSq, showJobScreeningQuestions, getScreeningQue } from '../controller/jobSqController.js';


const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//for deleting existing folder 
const prepareFolder = (req, res, next) => {
    const exist_folder = path.join(__dirname, "..", `uploads/jobdocs/${req.params.jobid}`)
    if (fs.existsSync(exist_folder)) fs.rmSync(exist_folder, { recursive: true, force: true })
    next()
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

//Creating disk storage for upload jd
const jdStorage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null,'uploads/jd/')
    },
    filename:(req,file,cb)=> {
      cb(null, Date.now() + path.extname(file.originalname))
    }
})

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

const upload = multer({ storage, fileFilter })

const jdUpload = multer({ storage:jdStorage})

//for creating job
router.post('/', createJobs)

//for creating jobs basic details
router.post('/basicjob/:orgjobid', craeteJobBasicDeatils)
router.get('/showjob/:id', showJobDetail);

//For getting main job details by job_id
router.get('/main-job/:jobId', getMainJobDetails)


//for creating job commission details
router.post('/jobcommission/:orgjobid', createJobCommission)
router.get('/jobcommission/:id', showJobCommission)
//for creating job with company details
router.post('/company/:orgjobid', createCompanyDetails)
router.get('/company/:id', showJobCompanyInfo)

//for creating sourcing guidelines
router.post('/sourcing/:orgjobid', createSourcingDetails)
router.get('/sourcing/:id', showJobSourcingDetails)
router.get('/', getAllJobs);

//upload attached jobs documents
// router.post('/uploadjobdocs/:jobid',upload.fields[{name:"sample_cv"},{name:"evaluation_form"},{name:'audio_brief'},{name:"other_docs"}],createJobAttachment)
router.post('/uploadjobdocs/:jobid', prepareFolder, upload.fields([
    { name: 'sample_cv', maxCount: 1 },
    { name: 'evaluation_form', maxCount: 1 },
    { name: 'audio_brief', maxCount: 1 },
    { name: 'other_docs', maxCount: 1 }
]), createJobAttachment)

router.get('/uploadjobdocs/:id', showJobAttachment)
//update uploaded job attachments file
router.post('/updateuploadjobdocs/:jobid', upload.fields([
    { name: 'sample_cv', maxCount: 1 },
    { name: 'evaluation_form', maxCount: 1 },
    { name: 'audio_brief', maxCount: 1 },
    { name: 'other_docs', maxCount: 1 }
]), updateJobAttachmentsDetails)

//for uploading jd and get jd content
router.post('/getjdcontent', jdUpload.single('file'),getJdContent)

//for check given file is present in upload folder
router.post('/checkjobattachfile', checkAndRemoveFile)

//for creating job screening questions
router.post('/jobsq/:orgjobid', createJobSq)
router.get('/jobsq/:id', showJobScreeningQuestions)

//for creating job draft 
router.post('/savedraft', createJobDraft)

//for deleting job saved draft
router.delete('/deletejobdraft/:jobid', deleteJobDraft)

//for allocating job to account manager
router.post('/allotacmanager/:orgid', allotedJobToAcManager)

//for activated job 
router.put('/activatejob/:orgid', activateJob)

//for getting jobs details for showing front table
router.get('/getalljobdetails/:enmemberid', getAllJobDetails)

//for getting job draft detials for showing front table
router.get('/getalljobdraftdetails/:enmemberid', getAllJobDraftDetails)

//for deleting job draft with others details 
router.delete('/deletedraftwithjobs/:jobid', deleteJobDraftWithOtherDetails)

//for getting basic job details
router.get("/getbasicjobdetails/:jobid", getJobBasicDetails)

//for getting main job details by id
router.get('/details/:id', getJobDetailsById)

//for getting basic job details by enterprise id
router.get('/getjobdetails/:e_id', getJobDetailsByEnId)

//for getting job commission details
router.get("/getjobcommissiondetails/:jobid", getJobCommissionDetails)

//for getting job company details
router.get('/getcompanydetails/:jobid', getJobCompanyDetails)

//for getting sourcing guidelines details
router.get('/getsourcingdetails/:jobid', getSourcingDetails)

//for getting job attachments details for showing in to job draft
router.get('/getjobattachmentdetails/:jobid', getJobAttachmentsDetails)

//for gettign job screening questions details
router.get('/getscreeningquestions/:jobid', getScreeningQue)

//for getting job details for showing into recruting agency job section

//for getting job details for showing front page live jobs
// router.get('/frontlivejobs/:jobid',getFronLiveJobDetails)

//for getting job details for showing front page of mapped job
router.get('/frontmappedjobs/:rteamid', getFrontMappedJobDetails)

//for getting job details for showing front page of accepted job
router.get('/frontacceptedjobs/:rteamid', getFrontAcceptedJobDetails)

//for getting job details for showing front page of favourite jobs
router.get('/frontfavouritejobs/:rteamid', getFrontFavouriteJobs)

//for getting job details for showing to candidate form filling page

//for gettign job details for job attachments
router.get('/getcandidatejobattachments/:jobid', getJobAttachmentsDetailsForCandidate)

//for getting screening question 
router.get('/getcandidatescreeningque/:jobid', getCandidateScreeningQue)

//for downloading
//for dowloading evaluation file
router.get('/download/evaluationform/:jobid', downloadEvaluationForm)

//add candidate profile into jobs candidate profile list
router.post('/addcandidateprofilelist/:jobid', addCandidateProfileList)

//for getting job basic details to show into preview page
router.get('/getjobbasicdetailsforpreview/:jobid', getJobBasicDetailsForPreview)

//for getting company details to show into preview page
router.get('/getcompanydetailsforpreview/:jobid', getJobCompanyDetailsForPreview)

//for getting job sourcing guidelines to show into preview page
router.get('/getsourcingguidelinesforpreview/:jobid', getJobSourcingGuidelinesForPreview)

//for getting job status to show into preview page
router.get('/getjobstatusforpreview/:jobid', getJobStatusForPreview)

//for getting job commission details to show into preview page
router.get('/getjobcommissiondetailsforpreview/:jobid', getJobCommissionDetailsForPreview)

//for creating job updates
router.post('/createjobupdates/:jobid', createJobUpdates)

//for getting job updates for preview
router.get('/getjobupdates/:jobid', getJobUpdates)

//for getting job attachments details for showing into preview page
router.get('/getjobattachmentsforpreview/:jobid', getJobAttachmentsDetailsForPreview)

//for getting job screening questions for preview
router.get('/getjobscreeningquestions/:jobid', getJobScreeningQuestionsForPreview)

//for getting ac manager mail and name for showing into preview page
router.get('/getacmanagerforpreview/:jobid', getAcManagerNameAndMail)

//for view job attachments
router.get('/viewjobattachments/:jobid/:filename', viewJobAttachments)

//for download job attachments file
router.post('/downloadjobattachments', downloadJobAttachments)

//for get job hot_mark for preview
router.get('/getjobhotmark/:jobid', getJobHotMark)

//for change job hot mark
router.put('/changejobhotmark/:jobid', changeJobHotMark)

//for get job attachments file type
router.get('/getjobattachmentfiletype/:jobid/:filetype', getJobAttachmentFileType)

//for getting jobs accepted candidate details for preview
router.get('/getjobcandidatesforpreview/:jobid', getJobCandidatesForPreview)

//for gettting posted candidates profile's id(s) by job_id
router.get('/getpostedcandidates/:jobid', getPostedCandidatesByJobId)

//for getting live jobs for particular recruiting member
router.get('/getlivejobs/:rememberid', getLiveJobs)

//unmap current job
router.post('/unmapjob', unMapJob)

//For adding recruiting agency member job accept request
router.post('/addJobMapRequest', addJobMapRequest)

//search job by its title
router.get('/search', SearchJobByTitle)

//Search job by its title and enterprise memberid
router.get('/past-job-search/:enmemberid', SearchPastJobByTitleAndEnMemberId)

//Get count of active job for particular enterprise member id
router.get('/getactivejobcount/:enmemberid', getActiveJobCountForEnMember)

//Get count of pending job for particular enterprise memeber id
router.get('/getpendingjobcount/:enmemberid', getPendingJobCountForEnMember)

//Search live jobs for recruiter memeber
router.get('/search-job-recruiter/:rememberid', searchJobRecruiter)

//Search Job for enterprise
router.get('/search-job-enterprise/:enmemberid', searchJobEnterprise)

//Get allocated Ac manager ids
router.get('/get-acmanager-id/:jobId', getAllotedAcManagerId)

//Adding CandidateId and jobId into enterprise member 
router.post('/add-candidate-enmember', addCandidateIntoEnMemberReceivedList)

//For getting mapped recruiter member ids
router.get('/get-mapped-recruiter/:jobid', getMappedRecruiterMemberIds)

//for getting requested recruiter ids
router.get('/get-requested-recruiter/:jobid', getRequestedRecruiterIds)

//For getting accepted recruiter member ids
router.get('/get-accepted-recruiter/:jobid',getAcceptedRecruiterIds)

//For adding recruiter member ids into mapped list
router.post('/addremembermappedlist/:jobid',addRecruiterMemberIntoMappedList)

//Convert recruiter from requested to mapped
router.post('/convert-request-mapped/:jobid/',convertFromRequestedToMapped)

//Handle Remove recruiter member id form mapped list
router.put('/remove-remember-mapped/:jobid/:rememberid',removeRememberFromMappedList)

//For getting org job id
router.get('/getorgjobid/:job_id',getOrgJobId)

//For adding recruiter memeber id into accepted list using admin 
router.put('/addrememberacceptedlist',addRememberIntoAcceptedList)




export default router