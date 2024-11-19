import express from "express"
import multer from "multer"
import path from 'path'


import { acVerified, allocatedAcManager, changeAccountStatus, checkAndRemoveCoiFile, checkIsVerifiedRecruiter, exportMemberData, getAcmanager, getAgencyDetailsForProfilePage, getAllPendingAcmanagerRecruiting, getAllPendingMadminVerifyRAgency, getRecruitingAgencies, getRecruitingAgencyById, getTeamMember, kycDetailsSubmission, kycDocsSubmission, updateAgencyDetails, uploadCoiCertificate } from "../controller/recruitingController.js";


const router=express.Router()


//creating disk storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/kycdocs/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage})

const coistorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/coidocs/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploadcoi=multer({storage:coistorage})

//router for upload kyc details

router.post('/kycdetails/:id',kycDetailsSubmission)

//router for upload kyc document
router.post('/kycdocs/:id',upload.single('file'),kycDocsSubmission)


//get all pending master admin verification recruiting agency
router.get('/adminpending',getAllPendingMadminVerifyRAgency)

//for allocated to acmanager
router.post('/allocatedacmanager',allocatedAcManager)


//foer changeging account status
router.post('/changestatus',changeAccountStatus)

//get all pending account manager verification recruitign agency
router.get('/acmanagerpending/:id',getAllPendingAcmanagerRecruiting)

//ac manager get approve
router.post('/acverified',acVerified)

//get alloted account manager id
router.get('/getacmanagerid/:ragencyid',getAcmanager)

//for getting particlure recruiter agency team member
router.get('/getteammember/:reid',getTeamMember)
router.get('/getagencies',getRecruitingAgencies)
//for getting recruiter agency details to showing into profile page
router.get('/getagencydetailsforprofilepage/:ragencyid',getAgencyDetailsForProfilePage)

//For update recruiting agency details
router.put('/updateagencydetails/:ragencyid',updateAgencyDetails)

//Check and remove coi file
router.put('/checkandremovecoifile/:ragencyid',checkAndRemoveCoiFile)

//for getting all recruiting agency details
router.get('/getagencies', getRecruitingAgencies)

//for getting particular recruiting agency by id
router.get("/:r_agency_id", getRecruitingAgencyById)

//For upload coi certificate
router.post('/uploadcoi/:ragencyid',uploadcoi.single('file'),uploadCoiCertificate)

//For chekck is it verified recruiter or not
router.get('/isverified/:ragencyid',checkIsVerifiedRecruiter)

//For export recruiter member data
router.get('/export-member-data/:ragencyid',exportMemberData)
export default router