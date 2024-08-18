import express from 'express'
import { addEnterprise, getAcByMadminId } from '../controller/accountmanagerController.js'

const router=express.Router()

//get account manager by particuler master admin id
router.get('/madmin/:id',getAcByMadminId)

//add enterprise into pending list
router.post('/addenterprise',addEnterprise)


export default router