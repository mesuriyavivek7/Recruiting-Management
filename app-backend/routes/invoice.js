import express from 'express'
import multer from 'multer'
import path from 'path'
import { downloadInvoiceDoc, getEnterpriseInvoice, getInvoiceDetails, getInvoiceDocName, getInvoiceFileType, getRecruiterInvoice, removeInvoiceDoc, uploadInvoiceDocs, viewCandidateInvoice } from '../controller/invoiceController.js'

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/invoice/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//for storing candidate invoice 
const upload= multer({storage})

//for getting invoice of particular enterprise member
router.get('/getinvoice-enterprise/:enmemberid',getEnterpriseInvoice)

//for uploading invoice docs 
router.post('/upload-invoice/:cid',upload.single('invoice'),uploadInvoiceDocs)

//for remove invoice docs
router.put('/remove-invoice/:cid',removeInvoiceDoc)

//for getting invoice of particular recruiter agency
router.get('/getinvoice-recruiter/:rememberid',getRecruiterInvoice)

//For getting filetype of invoice
router.get('/getinvoice-type/:cid',getInvoiceFileType)

//For download invoice doc
router.get('/download-invoice/:cid',downloadInvoiceDoc)

//For view candidate invoice
router.get('/view-invoice/:cid',viewCandidateInvoice)

//For get invoice doc name
router.get('/get-doc-name/:cid',getInvoiceDocName)

//For get invoice details for account manager
router.get('/getinvoice-acmanager/:cid',getInvoiceDetails)


export default router