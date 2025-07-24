import express from 'express'
import { createActivity, getAllActivityByCandidateId } from '../controller/activityController.js'

const router = express.Router()

//For create activity
router.post('/',createActivity)

//For get all activity by candidate id
router.get('/candidate/:candidateId',getAllActivityByCandidateId)


export default router

