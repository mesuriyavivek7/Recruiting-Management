import express from "express"
import multer from "multer"
import path from 'path'

import { allocatedAcManager, changeAccountStatus, getAllPendingMadminVerifyRAgency, kycDetailsSubmission, kycDocsSubmission } from "../controller/recruitingController.js"

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
export default router