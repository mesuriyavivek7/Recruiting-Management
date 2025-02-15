import express from 'express'
import { SearchEnterpriseByName, acVerified, allocatedAcManager, changeAccountStatus, changeMail, changepassword, checkPassword, exportEnterpriseMemberData, getAcManagerId, getAcPendingEnterprise, getAcmanagerMailandName, getAllEnterprise, getAllPendingMadminVerifyEnterprise, getCompnayName, getEnterprise, getEnterpriseMember, getMobileNo, getRecruiterForJob, isVerifiedEnterprise } from '../controller/enterpriseController.js'
import { getRecruiterMemberIds } from '../controller/candidateController.js'

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

//for getting all enterprise details
router.get('/findall', getAllEnterprise)

//for getting the recruiter for each particular job
router.get('/getrecruiter/:enterpice_id', getRecruiterForJob);


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

//for getting member of perticuler enterprise team for showing into enterprise team page
router.get('/getenterprisemember/:eid',getEnterpriseMember)

//for getting account manager email id and name
router.get('/getacmanagermailandname/:eid',getAcmanagerMailandName)

//for searching the enterprise by full name
router.get('/search', SearchEnterpriseByName);

//for check is it verified account or nor
router.get('/isverifiedaccount/:eid',isVerifiedEnterprise)

//export enterprise member data
router.get('/export-member-data/:eid',exportEnterpriseMemberData)


export default router
