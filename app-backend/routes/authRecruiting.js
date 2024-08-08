import express from 'express'

import { register,login } from '../controller/authRecruitingController.js'

const router=express.Router()

//for recruiting agency register
router.post('/register',register)


//for recuiting agency Login

router.post('/login',login)


export default router

