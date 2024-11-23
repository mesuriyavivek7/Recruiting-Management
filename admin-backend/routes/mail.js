import express from 'express'
import { sendMail } from '../controller/mailController.js'


const router=express.Router()

//Sending mail for invite account manager to dashboard
router.post('/invite-acmanager',sendMail);

export default router;
