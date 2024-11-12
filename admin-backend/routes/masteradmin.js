import express from 'express'
import { addEnterprise, addRecruitingAgency, getAccountManagerDetailsByMId, getAllPendingRecuritingAgencies, getAllVerifiedRecuritingAgencies, getMasterAdminDetails, getPendingVerifiedEnterpriseByMAdmin, getVerifiedEnterprisesByMAdmin, handleAssignEnterpriseToAc, rmvEnterprisePendingList, rmvRecruitingPendingList } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)

//remove enterprise from pending verification list
router.post('/rmventerprisependinglist',rmvEnterprisePendingList)

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

//get the all verified enterprises data
router.get('/getverifiedennterprise/:m_admin_id', getVerifiedEnterprisesByMAdmin)

//get the pending verified enterprises data
router.get('/getpendingenterprises/:m_admin_id', getPendingVerifiedEnterpriseByMAdmin)

//get the account manager from the master admin list
router.get('/getaccountmanagerdetails/:m_admin_id',getAccountManagerDetailsByMId)


//handle assign enterprise to any account manager
router.post('/assignenterprisetoac',handleAssignEnterpriseToAc)


export default router;