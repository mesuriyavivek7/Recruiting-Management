import express from 'express'
import { sendMail,sendVerificationMailRecruiting,sendVerificationMailEnterprise,verifyemailEnterprise,verifyemailRecruiting } from '../controller/mailController.js'


const router=express.Router()

//for sending mail

router.post('/sendmail',sendMail)

//sending verification mail for enterprise
router.post('/sendverificationenterprise',sendVerificationMailEnterprise)

//sending verification mail for recruiting
router.post('/sendverificaitionrecruiting',sendVerificationMailRecruiting)

//verify mail for recruiting verification
router.get('/recruitingverifymail/:token',verifyemailRecruiting)

//verify mail for enterprise verification
router.get('/enterpriseverifymail/:token',verifyemailEnterprise)

export default router
