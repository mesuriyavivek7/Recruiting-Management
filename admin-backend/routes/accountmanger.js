import express from 'express'
import { addCandidatePendingList, addCandidateVerifiedList, addEnterprise, addJobIntoVerifyList, addJobsPendingList, addRecruiting, addVerifiedRecruitng, getAcByMadminId, getAcManagerEmail, getAcmanagerMailandName } from '../controller/accountmanagerController.js'

const router=express.Router()

//get account manager by particuler master admin id
router.get('/madmin/:id',getAcByMadminId)

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

//for getting account manager email
router.get('/acmanageremail/:id',getAcManagerEmail)

//add candidate profile into pending list
router.post('/addpendingcandidate/:acmanagerid',addCandidatePendingList)

//add candidate profile into verified list
router.post('/addcandidateintoverifiedlist/:acmanagerid',addCandidateVerifiedList)

//get account manager name and mail id
router.get('/getmailandname/:acmanagerid',getAcmanagerMailandName)

export default router