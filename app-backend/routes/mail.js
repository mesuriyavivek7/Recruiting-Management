import express from 'express'
import { sendMail,sendVerificationMailRecruiting,sendVerificationMailEnterprise,verifyemailEnterprise,verifyemailRecruiting, sendTeamMemberNotifyMail, sendEmailUpdateVerificationEnterprise, verifyemailEnterpriseTeam, sendVerificationMailEnterpriseTeam, verifyemailRecruitingTeam, sendVerificationMailRecruitingTeam, sendBulkMail, shareResumeWithHiringManager } from '../controller/mailController.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router=express.Router()

const uploadDir=path.join(__dirname,'..','/uploads/mailattachments')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,uploadDir)
    },
    filename:(req,file,cb)=>{
       cb(null, Date.now() + '-' + file.originalname);
    }

})

const upload=multer({storage:storage})



//enterprise bulk action
router.post('/bulkaction',upload.single('attachments'),sendBulkMail)


//share resume with hiring manager
router.post('/sharewithhiringmanager',shareResumeWithHiringManager)

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

//sending verify mail for recruiting team member
router.post('/sendverificationrecruitingteam',sendVerificationMailRecruitingTeam)

//verify mail for recruiting verification
router.get('/recruitingverifymail/:token',verifyemailRecruiting)

//verify mail for recruitig team member
router.get('/recruitingteamverifymail/:token',verifyemailRecruitingTeam)

//verify mail for enterprise verification
router.get('/enterpriseverifymail/:token',verifyemailEnterprise)

//verify mail for enterprise team member
router.get('/enterpriseteamverifymail/:token',verifyemailEnterpriseTeam)



export default router
