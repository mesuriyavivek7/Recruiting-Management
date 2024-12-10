import express from 'express'
import { createSupport, getAllSupport, getSupport, updateSupportsDetails } from '../controller/supportController.js'


const router = express.Router()


//For creating Support
router.post('/',createSupport)


//For Getting support
router.get('/:dashboard_type',getSupport)

//For getting all support 
router.get('/',getAllSupport)

//For Update Support
router.put('/',updateSupportsDetails)



export default router