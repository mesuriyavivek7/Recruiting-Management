import express from 'express'
import { createTask } from '../controller/taskController.js'

const router = express.Router()


//For create task
router.post('/', createTask)




export default router