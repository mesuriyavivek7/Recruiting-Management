import express from 'express'
import { createSupport, getSupport } from '../controller/supportController.js'


const router = express.Router()


//For creating Support
router.post('/',createSupport)


//For Getting support
router.get('/:dashboard_type',getSupport)


//For Update Support



export default router