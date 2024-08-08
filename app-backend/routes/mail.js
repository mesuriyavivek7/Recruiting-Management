import express from 'express'
import { sendMail } from '../controller/mailController.js'


const router=express.Router()

//for sending mail

router.post('/sendmail',sendMail)

export default router
