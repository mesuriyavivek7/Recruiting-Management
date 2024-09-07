import express from 'express'
import { checkMail, checkMobileNo, register} from '../controller/authEnterpriseController.js'

const router=express.Router()


//for register Enterprise

router.post('/register',register)


//for check email address is already exist or not
router.post('/checkmail',checkMail)

//for check mobile no is already exist or not
router.post('/checkmobileno',checkMobileNo)

export default router