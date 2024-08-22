import express from 'express'
import { addEnterprise, addRecruitingAgency, rmvEnterprisePendingList, rmvRecruitingPendingList } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)

//remove enterprise from pending verification list
router.post('/rmventerprisependinglist',rmvEnterprisePendingList)

//for adding recruiting agency details into masteradmin
router.post('/addragency',addRecruitingAgency)

//remove recruiting agency from pending verification lost
router.post('/rmvrecruitingpendinglist',rmvRecruitingPendingList)
export default router