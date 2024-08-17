import express from 'express'
import { getAcByMadminId } from '../controller/accountmanagerController.js'

const router=express.Router()

router.get('/madmin/:id',getAcByMadminId)


export default router