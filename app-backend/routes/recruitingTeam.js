import express from 'express'
import { addJobIntoAcceptList, addNewCandidate, changeAccountStatus, changeCommissionFlag, checkCreadentials, checkEmailAddress, checkIsAdmin, checkMobileNo, createteammember, getDashBoardCount, getEnterpriseTeamMember, getRecruiterCandidateDetails, getRecruiterProfilePageDetails, rejectJob, updateJobMappedList, updateRecruiterTeamDetails } from '../controller/recrutingTeamController.js'



const router=express.Router()

//for creating new recruiting member
router.post('/',createteammember)

//for check recruiting team creadentials
router.post('/checkcredentials',checkCreadentials)

//for adding job into mapped job list
router.post('/updatemappedlist/:rteamid',updateJobMappedList)

//for accept mapped job and add into accept job list
router.post('/addacceptlist/:rteamid',addJobIntoAcceptList)

//for given rejection reason of any job
router.post('/rejectjob/:rteamid',rejectJob)

//for adding candidate id and job id into submited candiadte list
router.put('/addintocandidatelist/:rememberid',addNewCandidate)

//for getting all enterprise team id which are connecting with recruiter agency
router.get('/getenterpriseteam/:rememberid',getEnterpriseTeamMember)

//for check current user is admin or not
router.get('/checkadmin/:reid',checkIsAdmin)

//for change recruiter team commission flag
router.put('/changecommisionflag/:rememberid',changeCommissionFlag)

//for change recruiter team account status
router.put('/changeaccountstatus/:rememberid',changeAccountStatus)

//for getting candidate details for showing into recruiter candidate page
router.get('/getcandidatedetails/:rememberid',getRecruiterCandidateDetails)

//for getting recruiter team details for showing into profile page
router.get('/getredetailsforprofilepage/:reid',getRecruiterProfilePageDetails)

//for updated recruiter team member details
router.put('/updatedetails/:rememberid',updateRecruiterTeamDetails)

//for check email address for recruiting team
router.post('/checkemailaddress/:rememberid',checkEmailAddress)

//for check mobile no for recruiting team
router.post('/checkmobileno/:rememberid',checkMobileNo)

//For getting dashboard counts
router.get('/getdashboardcount/:rememberid',getDashBoardCount)

export default router