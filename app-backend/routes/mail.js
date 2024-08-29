import express from 'express'
import { sendMail,sendVerificationMailRecruiting,sendVerificationMailEnterprise,verifyemailEnterprise,verifyemailRecruiting, sendTeamMemberNotifyMail, sendEmailUpdateVerificationEnterprise, verifyemailEnterpriseTeam, sendVerificationMailEnterpriseTeam } from '../controller/mailController.js'


const router=express.Router()

//for sending mail

router.post('/sendmail',sendMail)

//sending mail to team member
router.post('/sendteammember',sendTeamMemberNotifyMail)

//sending verification mail for enterprise
router.post('/sendverificationenterprise',sendVerificationMailEnterprise)

//sending verification mail for enterprise team member
router.post('/sendverificationenterpriseteam',sendVerificationMailEnterpriseTeam)

//sending verification mail for recruiting
router.post('/sendverificaitionrecruiting',sendVerificationMailRecruiting)

//verify mail for recruiting verification
router.get('/recruitingverifymail/:token',verifyemailRecruiting)

//verify mail for enterprise verification
router.get('/enterpriseverifymail/:token',verifyemailEnterprise)

//verify mail for enterprise team member
router.get('/enterpriseteamverifymail/:token',verifyemailEnterpriseTeam)
export default router
