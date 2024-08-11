import express from 'express'
import { login } from '../controller/authController.js'

const router=express.Router()


//for general login into dashboard
router.post('/login',login)



export default router
