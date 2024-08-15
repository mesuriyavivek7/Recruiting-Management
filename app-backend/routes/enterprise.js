import express from 'express'
import { changeMail, changepassword, checkPassword, getMobileNo } from '../controller/enterpriseController.js'

const router=express.Router()

//for getting mobile no
router.get('/getmobile/:id',getMobileNo)

//for email data change
router.post('/changemail/:id',changeMail)

//for change password
router.post('/changepassword/:id',changepassword)

//for check password
router.post('/checkpassword/:id',checkPassword)

export default router
