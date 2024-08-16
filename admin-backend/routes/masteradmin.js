import express from 'express'
import { addEnterprise } from '../controller/masteradminController.js'


const router=express.Router()


//for adding new enterprise details into masteradmin
router.post('/addenterprise',addEnterprise)


export default router