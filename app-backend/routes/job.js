import express from 'express'
import { saveDraft } from '../controller/jobController.js'

const router=express.Router()

router.post('/saveDraft',saveDraft)



export default router