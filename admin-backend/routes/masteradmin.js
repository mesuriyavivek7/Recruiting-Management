import express from 'express'
import { addEnterprise, addRecruitingAgency, getAccountManagerDetailsByMId, getAllPendingCandidates, getAllPendingJobs, getAllPendingRecuritingAgencies, getAllVerifiedCandidates, getAllVerifiedJobs, getAllVerifiedRecuritingAgencies, getMasterAdminDetails, getPendingVerifiedEnterpriseByMAdmin, getVerifiedEnterprisesByMAdmin, handleAddAcManager, handleAssignEnterpriseToAc, recruiterAgencyVerified, rmvEnterprisePendingList, rmvRecruitingPendingList } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)

//remove enterprise from pending verification list
router.post('/rmventerprisependinglist',rmvEnterprisePendingList)

//recruiter agency verified by master admin
router.post('/recruiterverifiedbymadmin',recruiterAgencyVerified)

//for adding recruiting agency details into masteradmin
router.post('/addragency',addRecruitingAgency)

//remove recruiting agency from pending verification lost
router.post('/rmvrecruitingpendinglist',rmvRecruitingPendingList)

//get the master admin details by admin id
router.get('/getdetails/:m_admin_id', getMasterAdminDetails)

//get all verified recuriting agencies by admin id
router.get('/getagencies/:m_admin_id', getAllVerifiedRecuritingAgencies)

//get all pending verified recuriting agencies by admin id
router.get('/getpendingagencies/:m_admin_id', getAllPendingRecuritingAgencies)

//get all verified jobs by admin id
router.get('/getverifiedjobs/:m_admin_id', getAllVerifiedJobs)

//get all pending verified jobs by admin id
router.get('/getpendingjobs/:m_admin_id', getAllPendingJobs)

//get all verified candidates by admin id
router.get('/getverifiedcandidates/:m_admin_id', getAllVerifiedCandidates)

//get all pending verified candidates by admin id
router.get('/getpendingcandidates/:m_admin_id', getAllPendingCandidates)

//get the all verified enterprises data
router.get('/getverifiedennterprise/:m_admin_id', getVerifiedEnterprisesByMAdmin)

//get the pending verified enterprises data
router.get('/getpendingenterprises/:m_admin_id', getPendingVerifiedEnterpriseByMAdmin)

//get the account manager from the master admin list
router.get('/getaccountmanagerdetails/:m_admin_id',getAccountManagerDetailsByMId)

//handle assign enterprise to any account manager
router.post('/assignenterprisetoac',handleAssignEnterpriseToAc)

//Adding account manager
router.post('/addacmanager',handleAddAcManager)


export default router;