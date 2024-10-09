import express from "express"
import multer from "multer"
import path from 'path'

import { acVerified, allocatedAcManager, changeAccountStatus, getAcmanager, getAgencyDetailsForProfilePage, getAllPendingAcmanagerRecruiting, getAllPendingMadminVerifyRAgency,getTeamMember, kycDetailsSubmission, kycDocsSubmission } from "../controller/recruitingController.js"

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

//for getting recruiter agency details to showing into profile page
router.get('/getagencydetailsforprofilepage/:ragencyid',getAgencyDetailsForProfilePage)



export default router