import express from 'express'
import { getMessage, sendMessage } from '../controller/messageController.js'
import { verifyToken } from '../utils/verifyToken.js'


const router=express.Router()

//Send Message
router.post('/',verifyToken,sendMessage)


// Get Messages Between Authenticated User and Another User
router.post('/getmsg',verifyToken,getMessage)

export default router



