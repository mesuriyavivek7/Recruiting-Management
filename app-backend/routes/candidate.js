import express from 'express'
import multer from 'multer'
import path from 'path'

import { createAndParseResume } from '../controller/resumeController.js'

const router=express.Router()

//creating disk storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/resumedocs/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage})
//for creating new candidate

//for attaching candidate resume and parsign it
router.post('/resumedocs/:cid',upload.single('resume'),createAndParseResume)


export default router

