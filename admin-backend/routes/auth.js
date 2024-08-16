import express from 'express'
import { login, register } from '../controller/authController.js'


const router=express.Router()


//login admin 
router.post('/login',login)


//register new masteradmin
router.post('/register',register)


export default router