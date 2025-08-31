import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { getEnterpriseInvoice, getInvoiceDetails, getInvoiceFileType, getRecruiterInvoice, removeInvoiceDoc, uploadInvoiceDocs } from '../controller/invoiceController.js'

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "uploads/invoice/";
  
      // ✅ Create folder if not exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
  
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
  

//for storing candidate invoice 
const upload= multer({storage})

//for getting invoice of particular enterprise member
router.get('/getinvoice-enterprise/:enmemberid',getEnterpriseInvoice)

//for uploading invoice docs 
router.post('/upload-invoice',upload.single('invoice'),uploadInvoiceDocs)

//for remove invoice docs
router.put('/remove-invoice',removeInvoiceDoc)

//for getting invoice of particular recruiter agency
router.get('/getinvoice-recruiter/:rememberid',getRecruiterInvoice)

//For getting filetype of invoice
router.get('/getinvoice-type/:cid',getInvoiceFileType)


//For get invoice details for account manager
router.get('/getinvoice-acmanager/:cid',getInvoiceDetails)


export default router