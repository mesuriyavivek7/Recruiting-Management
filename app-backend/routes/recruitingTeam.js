import express from 'express'
import { addJobIntoAcceptList, rejectJob, updateJobMappedList } from '../controller/recrutingTeamController.js'

const router=express.Router()


//for adding job into mapped job list
router.post('/updatemappedlist/:rteamid',updateJobMappedList)

//for accept mapped job and add into accept job list
router.post('/addacceptlist/:rteamid',addJobIntoAcceptList)

//for given rejection reason of any job
router.post('/rejectjob/:rteamid',rejectJob)

export default router