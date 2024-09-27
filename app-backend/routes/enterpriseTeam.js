import express from 'express'
import { createEnterpriseTeam, getCandidateDetails } from '../controller/enterpriseTeamController.js'


const router=express.Router()

//create team 
router.post('/',createEnterpriseTeam)

//for getting candidate details which are listed on his posted jobs
router.get('/getcandidatedetails/:enmemeberid',getCandidateDetails)

export default router