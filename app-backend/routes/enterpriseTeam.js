import express from 'express'
import { addNewCandidate, changeAccountStatus, checkCreadentials, checkEmailAddress, checkIsAdmin, createEnterpriseTeam, getCandidate, getCandidateDetails, getDashboardCount, getEnterpriseTeam, getOneEnterpriseMember, getRecruiterTeamMember, getSubmitedCandidateMailId, isEnterpriseMemberEmailVerified } from '../controller/enterpriseTeamController.js'



const router=express.Router()

//create team 
router.post('/',createEnterpriseTeam)

//Get the enterprise team member
router.get('/:enmemberid',getOneEnterpriseMember)

//check email and mobile alredy exist or not
router.post('/checkcreadentials',checkCreadentials)

//for getting candidate details which are listed on his posted jobs
router.get('/getcandidatedetails/:enmemeberid',getCandidateDetails)

//for adding candidateid and jobid into received candidate list
router.put('/addintocandidatelist/:enmemberid',addNewCandidate)

//for getting all enterprise team details by enterprise id
router.get('/findteam/:enterprise_id', getEnterpriseTeam)

//for getting all recruiterteam id which are connected with enterprise by submiting candidate profile
router.get('/getrecruiterteam/:enmemberid',getRecruiterTeamMember)

//for check user is admin or not
router.get('/checkadmin/:eid',checkIsAdmin)

//for change account status
router.put('/changeaccoutstatus/:eid',changeAccountStatus)

//get the received candidate mail id
router.get('/getthecandidatemails/:ememberid',getSubmitedCandidateMailId)

//get the received candidates
router.get('/getcandidate/:enmemberid',getCandidate)

//get dashboard count
router.get('/getdashboardcount/:enmemberid',getDashboardCount)

//for check enterprise memeber is email verified or not
router.get('/isemailverified/:enmemberid',isEnterpriseMemberEmailVerified)

//for check email address is exist or not
router.get('/checkmail/:email',checkEmailAddress)

export default router;