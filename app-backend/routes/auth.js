import express from 'express'
import { login, logout } from '../controller/authController.js'

const router=express.Router()


//for general login into dashboard
router.post('/login',login)

//for general logout from the dashboard
router.post('/logout',logout)


export default router
