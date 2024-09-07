import express from 'express'
import { createJobs } from '../controller/jobController.js'
import { craeteJobBasicDeatils } from '../controller/jobBasicController.js'
import { createJobDraft } from '../controller/jobDraftController.js'
import { createJobCommission } from '../controller/jobCommissionController.js'

const router=express.Router()

//for creating job
router.post('/',createJobs)

//for creating jobs basic details
router.post('/basicjob/:orgjobid',craeteJobBasicDeatils)

//for creating job commission details
router.post('/jobcommission/:orgjobid',createJobCommission)

//for creating job with company details

//for creating sourcing guidelines

//for creating job screening questions



//for creating job draft 
router.post('/savedraft',createJobDraft)


export default router