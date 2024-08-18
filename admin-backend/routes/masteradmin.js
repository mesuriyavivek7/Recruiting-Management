import express from 'express'
import { addEnterprise, rmvEnterprisePendingList } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)

//remove enterprise into pending verification list
router.post('/rmventerprisependinglist',rmvEnterprisePendingList)


export default router