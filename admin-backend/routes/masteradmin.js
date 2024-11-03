import express from 'express'
import { addEnterprise, addRecruitingAgency, getMasterAdminDetails, getPendingVerifiedEnterpriseByMAdmin, getVerifiedEnterprisesByMAdmin, rmvEnterprisePendingList, rmvRecruitingPendingList } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)

//remove enterprise from pending verification list
router.post('/rmventerprisependinglist',rmvEnterprisePendingList)

//for adding recruiting agency details into masteradmin
router.post('/addragency',addRecruitingAgency)

//remove recruiting agency from pending verification lost
router.post('/rmvrecruitingpendinglist',rmvRecruitingPendingList)

//get the all verified enterprises data
router.get('/getverifiedennterprise/:m_admin_id', getVerifiedEnterprisesByMAdmin)

//get the pending verified enterprises data
router.get('/getpendingenterprises/:m_admin_id', getPendingVerifiedEnterpriseByMAdmin)

//get the master admin details by master admin id
router.get('/getdetails/:m_admin_id', getMasterAdminDetails)

export default router;