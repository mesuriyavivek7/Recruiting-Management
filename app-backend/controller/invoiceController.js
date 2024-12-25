import INVOICE from "../models/INVOICE.js";
import axios from "axios";
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from "path";
import CANDIDATE from "../models/CANDIDATE.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEnterpriseInvoice = async (req, res, next) => {
    try {
        // Get current date
        const currentTime = new Date();

        // Fetch candidates
        const response = await axios.get(`${process.env.APP_SERVER_URL}/enterpriseteam/getcandidate/${req.params.enmemberid}`);
        const candidates = response.data;

        // Process candidates and fetch invoices
        const invoiceCandidates = await Promise.all(candidates.map(async (candidate) => {
            const cDetails = await CANDIDATE.findById(candidate.candidateId);
            if (!cDetails) return null;

            const jobCommissionDetails = await JOBCOMMISSION.findOne({ job_id: cDetails.job_id });
            if (!jobCommissionDetails) return null;

            const cdate = parseInt(jobCommissionDetails.commission_details.replacement_clause, 10);
            const adjustedTime = new Date(currentTime);
            adjustedTime.setDate(adjustedTime.getDate() - cdate);

            return await INVOICE.findOne({ 
                candidate_id: candidate.candidateId, 
                createdAt: { $lte: adjustedTime } 
            });
        }));

        // Filter out null or undefined values
        const filterData = invoiceCandidates.filter(item => item);

        res.status(200).json(filterData);
    } catch (err) {
        next(err);
    }
};


export const uploadInvoiceDocs=async (req,res,next)=>{
    try{
       const file=req.file
       if(!file) res.status(400).json({message:'please upload file'})

       const fileInfo={
        filename:file.filename,
        filetype:file.mimetype,
        filepath:file.path,
        filesize:file.size
       }

       await INVOICE.findOneAndUpdate({candidate_id:req.params.cid},{$set:{invoice_docs:fileInfo,invoice_status:"Accepted"}})
       res.status(200).json("File Uploaded.")
    }catch(err){
        next(err)
    }
}

export const removeInvoiceDoc=async (req,res,next)=>{
     try{
        const invoice=await INVOICE.findOne({candidate_id:req.params.cid})
        if(!invoice) return res.status(404).json({message:"User not found"})

        const filePath=invoice.invoice_docs.filepath
        //Delete file

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({message:"File path not exist"})
            } else {
                // File exists, proceed to delete
                fs.unlink(filePath,async (err) => {
                    if (err) {
                        return res.status(400).json({message:"Error while deleting file"})
                    } else {
                        await INVOICE.findOneAndUpdate({candidate_id:req.params.cid},{$set:{invoice_docs:{},invoice_status:"Pending"}})
                        return res.status(200).json("File removed")
                    }
                });
            }
        });
     }catch(err){
        next(err)
     }
}

export const getRecruiterInvoice=async (req,res,next)=>{
     try{
        // Get current date
        const currentTime = new Date();

        //Get the submited candidates
        const candidates=await axios.get(`${process.env.APP_SERVER_URL}/recruitingteam/getsubmitedcandidate/${req.params.rememberid}`)

        //Get the invoice of candidate
        const invoiceCandidates=await Promise.all(candidates.data.map(async (candidate)=>{
            const cDetails = await CANDIDATE.findById(candidate.candidateId)
            if(!cDetails) return null

            const jobCommissionDetails = await JOBCOMMISSION.findOne({job_id: cDetails.job_id})
            if (!jobCommissionDetails) return null;

            const cdate = parseInt(jobCommissionDetails.commission_details.replacement_clause, 10);
            const adjustedTime = new Date(currentTime);
            adjustedTime.setDate(adjustedTime.getDate() - cdate);

            return await INVOICE.findOne({ 
                candidate_id: candidate.candidateId, 
                createdAt: { $lte: adjustedTime } 
            });

        }))

        //Filter invoice data
        const filterData = invoiceCandidates.filter(item => item);

        res.status(200).json(filterData)
     }catch(err){
         next(err)
     }
}

export const getInvoiceFileType=async (req,res,next)=>{
    try{
        //Get candidate invoice
        const invoice=await INVOICE.findOne({candidate_id:req.params.cid})
        if(!invoice) return res.status(404).json({message:"Invoice not found"})

        if(invoice.invoice_status==="Pending") return res.status(200).json(null)
        else return res.status(200).json(invoice.invoice_docs.filetype)
    }catch(err){
        next(err)
    }
}


export const downloadInvoiceDoc=async (req,res,next)=>{
    try{
      const invoice=await INVOICE.findOne({candidate_id:req.params.cid})
      if(!invoice) return res.status(404).json("Invoice not found")
      if(invoice.invoice_status==="Pending") return res.status(200).json(null)
      else{
        fs.access(invoice.invoice_docs.filepath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({message:"File path not exist"})
            } else {
                return res.download(invoice.invoice_docs.filepath,invoice.invoice_docs.filename)
            }
        });
        
      }
    }catch(err){
        next(err)
    }
}


export const viewCandidateInvoice=async (req,res,next)=>{
     try{
       const invoice=await INVOICE.findOne({candidate_id:req.params.cid})

       if(!invoice) return res.status(404).json({message:"Invoice not found"})
       if(invoice.invoice_status==="Pending") return res.status(200).json(null)

       const filePath=path.join(__dirname,'..','uploads','invoice',invoice.invoice_docs.filename)

       fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({message:"File path not exist"})
        } else {
            return res.sendFile(filePath)
        }
       });

     }catch(err){
        next(err)
     }
}


export const getInvoiceDocName=async (req,res,next)=>{
    try{
        const invoice=await INVOICE.findOne({candidate_id:req.params.cid})

        if(!invoice) return res.status(404).json({message:"Invoice not found"})

        if(invoice.invoice_status==="Pending") return res.status(200).json(null)
        else return res.status(200).json(invoice.invoice_docs.filename)
    }catch(err){
         next(err)
    }
}

export const getInvoiceDetails = async (req, res, next) =>{
    try{
        const invoice = await INVOICE.findOne({candidate_id:req.params.cid,invoice_status:'Accepted'})

        if(!invoice) return res.status(200).json(null)
        else return res.status(200).json(invoice)

    }catch(err){
        next(err)
    }
}