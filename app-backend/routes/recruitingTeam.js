import express from 'express'
import { addJobIntoAcceptList, addJobIntoFavoutiteList, addNewCandidate, changeAccountStatus, changeCommissionFlag, changeEmailAddress, changePassword, checkCreadentials, checkEmailAddress, checkForRequestJob, checkIsAdmin, checkMobileNo, checkPassword, createteammember, getDashBoardCount, getEnterpriseTeamMember, getFavouriteJobIds, getRecruiterCandidateDetails, getRecruiterProfilePageDetails, getRecuritingTeamDetails, getSubmitedCandidates, isFavouriteJob, isVerifiedMail, rejectJob, removeJobFromFavouriteList, requestMapJob, unmapJob, updateJobMappedList, updateRecruiterTeamDetails } from '../controller/recrutingTeamController.js'



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

//for getting all recuriting team details by r_agency_id
router.get('/getrecuritingteam/:r_agency_id', getRecuritingTeamDetails)

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

//Adding jobs into favoutite job list
router.post('/addjobintofavouritelist',addJobIntoFavoutiteList)

//Removing jon into favourite job list
router.post('/removejobintofavouritelist',removeJobFromFavouriteList)

//Check for current job is favourite or not
router.get('/isfavouritejob/:orgjobid/:rememberid',isFavouriteJob)

//Get favourite job list ids
router.get('/getfavouritejobids/:rememberid',getFavouriteJobIds)

//Unmap current accepted job in both collections(job & recruitingteam)
router.post('/unmapjob',unmapJob)

//Added request of job in both collections (recruiting team & job)
router.post('/requestmapjob',requestMapJob)

//For check particular jon is requested job or not
router.get('/checkforrequestjob/:rememberid/:orgjobid',checkForRequestJob)

//For check particuler recruiter member is verified email or not
router.get('/checkisverifiedmail/:rememberid',isVerifiedMail)

//For change email address
router.put('/changeemail',changeEmailAddress)

//For check current password
router.post('/checkpassword/:rememberid',checkPassword)

//For change current password
router.put('/changepassword/:rememberid',changePassword)

//For getting submited candidates
router.get('/getsubmitedcandidate/:rememberid',getSubmitedCandidates)
export default router