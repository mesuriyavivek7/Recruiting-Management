import express from 'express'
import { register } from '../controller/authEnterpriseController.js'

const router=express.Router()


//for register Enterprise

router.post('/register',register)


export default router