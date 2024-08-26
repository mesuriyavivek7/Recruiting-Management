import express from 'express'
import { createEnterpriseTeam } from '../controller/enterpriseTeamController.js'


const router=express.Router()

//create team 
router.post('/',createEnterpriseTeam)



export default router