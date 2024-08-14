import express from 'express'
import { changeMail, getMobileNo } from '../controller/enterpriseController.js'

const router=express.Router()

//for getting mobile no
router.get('/getmobile/:id',getMobileNo)

//for email data change
router.post('/changemail/:id',changeMail)
export default router
