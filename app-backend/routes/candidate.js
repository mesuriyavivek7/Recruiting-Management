import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

import { cancelProcess, checkParseDetails, createAndParseResume, downloadResumeDocs, getResumeFileName, getResumeFilePath, marksAsCompleted, removeResumeFile } from '../controller/resumeController.js'
import { addAcManager, changeCandidateStatus, changeMultipleCandidateStatus, createCandidate, getAllCandidates, getCandidateForMultipleAction, getCandidateStatusById, getRecruiterMemberIds, updateCandidateRemarks } from '../controller/candidateController.js'
import { checkEmailAndMobile, createCandidateBasicDetails, getAllCandidateDetails } from '../controller/candidateBasicController.js'
import { uploadCandidateAttachments } from '../controller/candidateAttachmentsController.js';
import { uploadCandidateConsetProof } from '../controller/candidateConsetController.js';
import { createSqAnswers } from '../controller/candidateSqController.js';

const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//for deleting existing folder 
const prepareFolder = (req, res, next) => {
    const exist_folder = path.join(__dirname, "..", `uploads/candidatedocs/${req.params.cid}`)
    if (fs.existsSync(exist_folder)) fs.rmSync(exist_folder, { recursive: true, force: true })
    next()
}

//creating disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumedocs/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//creating disk storage for storing candidate files
const storageattachments = multer.diskStorage({
    destination: (req, file, cb) => {
        const uniqueFolder = `uploads/candidatedocs/${req.params.cid}`
        fs.mkdirSync(uniqueFolder, { recursive: true })
        cb(null, uniqueFolder)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname))
    }
})

//creating disk storage for storing consent proof
const consentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/consetproof/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//storage uploading candidate resume
const upload = multer({ storage })

//storage uploading candidate job attachments and other stuff
const uploadAttach = multer({ storage: storageattachments })

//storage for uploading candidate conset proof
const uploadConsent = multer({ storage: consentStorage })

//for creating new candidate

//for attaching candidate resume and parsign it
router.post('/resumedocs/:cid', upload.single('resume'), createAndParseResume)

//check resuem parse details
router.post('/checkparsedetails/:cid', checkParseDetails)

//resume docs and parse details marked as completed
router.put('/markascompleted/:cid', marksAsCompleted)

//remove resume file from uplods folder
router.post('/removefile', removeResumeFile)

//cancel parsing process 
router.delete('/cancelprocess', cancelProcess)

//check credantial details
router.post('/checkmobileandemail', checkEmailAndMobile)

//for initialize candidate profile
router.post('/createcandidate/:cid', createCandidate)

//for creating candidate basic details
router.post('/createcandidatebasicdetails/:orgcid', createCandidateBasicDetails)

//for uploading candidate other forms
router.post('/uploadcandidateattachments/:cid', prepareFolder, uploadAttach.fields([
    { name: 'evaluation_form', maxCount: 1 },
    { name: 'audio_brief', maxCount: 1 },
    { name: 'other_docs', maxCount: 1 }
]), uploadCandidateAttachments)

//for uploading candidate conset proof
router.post('/uploadconsetproof/:cid', uploadConsent.single('consetproof'), uploadCandidateConsetProof)

//for posting candidate screening questions & answer
router.post('/createsqanswer/:orgcid', createSqAnswers)

//adding account manager id
router.post('/addacmanager/:orgcid', addAcManager)

//change candidate status
router.post('/changecandidatestatus/:orgcid', changeCandidateStatus)

//for gettign resume path by candidate id
router.get('/getresumefilename/:cid', getResumeFileName)

//download resume docs
router.get('/downloadresumedocs/:cid', downloadResumeDocs)

router.get('/resumefilepath/:cid', getResumeFilePath)

//updating candidate remarks
router.post('/updatecandidateremarks/:orgcid', updateCandidateRemarks)

//get candidate data for multiple action
router.post('/getcandidateformultipleaction', getCandidateForMultipleAction)

//change status for multiple candidates
router.put('/changemultiplecandidatestatus', changeMultipleCandidateStatus)

//fetch recruiter member id for particluer the given array of candidate ids
router.post('/getrecruitermemberids', getRecruiterMemberIds)

router.get('/details', getAllCandidateDetails);

router.get('/allcandidates', getAllCandidates);

router.get('/getcandidatestatus/:basicDetailId', getCandidateStatusById);

export default router

