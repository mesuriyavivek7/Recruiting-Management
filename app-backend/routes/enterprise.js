import express from 'express'
import { acVerified, allocatedAcManager, changeAccountStatus, changeMail, changepassword, checkPassword, getAcManagerId, getAcPendingEnterprise, getAllPendingMadminVerifyEnterprise, getCompnayName, getEnterprise, getMobileNo } from '../controller/enterpriseController.js'

const router=express.Router()

//for getting mobile no
router.get('/getmobile/:id',getMobileNo)

//for email data change
router.post('/changemail/:id',changeMail)

//for change password
router.post('/changepassword/:id',changepassword)

//for check password
router.post('/checkpassword/:id',checkPassword)

//for getting enterprise by id
router.get('/find/:id',getEnterprise)

//for gettign all pending madmin verification enterprise
router.get('/adminpending',getAllPendingMadminVerifyEnterprise)

//for change account status 
router.post('/changestatus',changeAccountStatus)

//for alloted to account manager
router.post('/allocatedacmanager',allocatedAcManager)

//for getting all pending enterprise for account manager
router.get('/acpending/:id',getAcPendingEnterprise)

//for getting approved from account manager side
router.post('/acverified',acVerified)

//for getting company name 
router.get('/companyname/:eid',getCompnayName)

//for getting account manager id by enterprise id
router.get('/acmanager/:eid',getAcManagerId)

export default router
