import express from 'express'
import { acRegister, login, madminRegister, sadminRegister, validateUser } from '../controller/authController.js'


const router=express.Router()


//login admin
router.post('/login',login)

//validate admin
router.get('/validate',validateUser)

//register new masteradmin
router.post('/madminregister',madminRegister)


//register new account manager
router.post('/acmanagerregister',acRegister)

//register new superadmin
router.post('/superadminregister',sadminRegister)


export default router