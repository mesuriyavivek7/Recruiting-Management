import express from 'express'
import { addCandidatePendingList, addCandidateVerifiedList, addEnterprise, addJobIntoVerifyList, addJobsPendingList, AddNewAccountManager, addRecruiting, addVerifiedRecruitng, getAcByMadminId, getAccountManager, getAcManagerEmail, getAcmanagerMailandName} from '../controller/accountmanagerController.js'

const router=express.Router()

//get account manager by particuler master admin id
router.get('/madmin/:id',getAcByMadminId)

//get all account manager details
router.get('/:ac_manager_id', getAccountManager);

//add enterprise into pending list
router.post('/addenterprise',addEnterprise)

//add recruiting ageny into verification pending list
router.post('/addrecruiting',addRecruiting)

//add recruiting agency into verified list
router.post('/addverifiedrecruiting',addVerifiedRecruitng)

//add verified enteprise into verified list
router.post('/addverifiedenterprise',addEnterprise)

//add created job into ac manager pendin verify list
router.post('/addpendingjob',addJobsPendingList)

//add job into verified list
router.post('/addjobverifylist',addJobIntoVerifyList)

//get account manager name and mail id
router.get('/getmailandname/:acmanagerid',getAcmanagerMailandName)

//for getting account manager email
router.get('/acmanageremail/:id',getAcManagerEmail)

//add candidate profile into pending list
router.post('/addpendingcandidate/:acmanagerid',addCandidatePendingList)

//add candidate profile into verified list
router.post('/addcandidateintoverifiedlist/:acmanagerid',addCandidateVerifiedList)

// add new account manager
router.post('/create/:master_admin_id', AddNewAccountManager);


export default router