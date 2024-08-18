import express from 'express'
import { acRegister, login, madminRegister } from '../controller/authController.js'


const router=express.Router()


//login admin
router.post('/login',login)


//register new masteradmin
router.post('/madminregister',madminRegister)


//register new account manager
router.post('/acmanagerregister',acRegister)


export default router