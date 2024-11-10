import express from 'express'
import { enterpriseLogin, login, logout, recruiterLogin } from '../controller/authController.js'

const router=express.Router()


//for general login into dashboard
router.post('/login',login)

//for login into enterprise dashboard
router.post('/enterprise-login',enterpriseLogin)

//for login into recruiter agency dashboard
router.post('/recruiter-login',recruiterLogin)

//for general logout from the dashboard
router.post('/logout',logout)


export default router
