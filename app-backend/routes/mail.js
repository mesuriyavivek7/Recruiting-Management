import express from 'express'
import { sendMail, sendVerificationMail, verifyemail } from '../controller/mailController.js'


const router=express.Router()

//for sending mail

router.post('/sendmail',sendMail)

//sending mail for verification
router.post('/sendverifymail',sendVerificationMail)

//verify mail for verification
router.get('/verifymail/:token',verifyemail)

export default router
