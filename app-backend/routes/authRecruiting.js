import express from 'express'

import { register,login, checkMail, checkMobileNo } from '../controller/authRecruitingController.js'

const router=express.Router()

//for recruiting agency register
router.post('/register',register)


//for recuiting agency Login
router.post('/login',login)

//for check email address is already exist or not
router.post('/checkemail',checkMail)

//for check mobile no is already exist or not
router.post('/checkmobileno',checkMobileNo)

export default router

