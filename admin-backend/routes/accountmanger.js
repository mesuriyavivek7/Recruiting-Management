import express from 'express'
import { addEnterprise, addRecruiting, getAcByMadminId } from '../controller/accountmanagerController.js'

const router=express.Router()

//get account manager by particuler master admin id
router.get('/madmin/:id',getAcByMadminId)

//add enterprise into pending list
router.post('/addenterprise',addEnterprise)

//add recruiting ageny into verification pending list
router.post('/addrecruiting',addRecruiting)

export default router