import INVOICE from "../models/INVOICE.js";
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js";
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js";
import axios from "axios";
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from "path";
import CANDIDATE from "../models/CANDIDATE.js";
import JOBCOMMISSION from "../models/JOBCOMMISSION.js";
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js";
import dotenv from 'dotenv'
import JOBS from "../models/JOBS.js";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isReplacementCauseOver = (jobReplaceMentCause, candidateJoiningDate) => {
    let currentDate = new Date();
  
    // Convert candidateJoiningDate (dd-mm-yyyy) → Date object
    let joiningDate = new Date(candidateJoiningDate);
  
    // Calculate replacement end date
    let replacementEndDate = new Date(joiningDate);
    replacementEndDate.setDate(replacementEndDate.getDate() + jobReplaceMentCause);
  
    // Compare with current date
    return currentDate >= replacementEndDate;
  };

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

        const {candidate_id, job_id, recruiter_member_id} = req.body 

        if(!candidate_id || !job_id || !recruiter_member_id) return res.status(400).json({message:"Please provide all required fields.",success:false})

       let fileString = `${process.env.DOMAIN}/${file.path}`

       const job = await JOBS.findOne({job_id})

       if(!job) return res.status(404).json({message:"Job not found.",success:false})

       const newInvoice = new INVOICE({
        candidate_id:candidate_id,
        job_id:job._id,
        recruiter_member_id:recruiter_member_id,
        offer_letter:fileString
       })

       await newInvoice.save()

       res.status(200).json("File Uploaded.")
    }catch(err){
        next(err)
    }
}

export const removeInvoiceDoc=async (req,res,next)=>{
     try{
       const {candidate_id, job_id} = req.body 

       if(!candidate_id || !job_id) return res.status(400).json({message:"Please provide all required fields.",success:false})

        const job = await JOBS.findOne({job_id})

        const invoice = await INVOICE.findOne({candidate_id, job_id:job._id})

        if(!invoice) return res.status(404).json({message:"Invoice is not founs.",success:false})

        if (invoice.offer_letter) {
          // Convert URL → local file path
          const filePath = path.join(
            process.cwd(), 
            invoice.offer_letter.replace(`${process.env.DOMAIN || "http://localhost:8080"}/`, "")
          );

          console.log(filePath)

         if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // delete file
            await INVOICE.deleteOne({ _id: invoice._id });
          }
        }

        return res.status(200).json({message:"Invoice doc remove successfully.",status:true})
        
     }catch(err){
        next(err)
     }
}

export const getRecruiterInvoice = async (req, res, next) => {
    try {
      const { rememberid } = req.params;
      const { status, candidate_name, job_id } = req.query;
  
      if (!rememberid) {
        return res.status(400).json({ message: "Please provide recruiter member id.", success: false });
      }
  
      const remember = await RECRUITINGTEAM.findById(rememberid);
      if (!remember) {
        return res.status(404).json({ message: "Recruiting member not found.", success: false });
      }
  
      // 🔹 Build filter for CANDIDATE
      let candidateFilter = { recruiter_member_id: rememberid };
  
      if (status) {
        candidateFilter.candidate_status = status;
      } else {
        candidateFilter.candidate_status = { 
          $in: ['success-joined', 'payout-eligible', 'invoice-raised', 'payment-received'] 
        };
      }
  
      if (job_id) {
        candidateFilter.job_id = job_id;
      }
  
      // 🔹 Fetch candidates with base filter
      const candidates = await CANDIDATE.find(candidateFilter);
  
      const candidateInvoiceDetails = [];
  
      for (let candidate of candidates) {
        const candidateBasicDetails = await CANDIDATEBASICDETAILS.findOne({ candidate_id: candidate.candidate_id });
        const jobBasicDetails = await JOBBASICDETAILS.findOne({ job_id: candidate.job_id });
        const jobCommissionDetails = await JOBCOMMISSION.findOne({ job_id: candidate.job_id });
        const invoice = await INVOICE.findOne({candidate_id:candidate._id})
  
        if (candidateBasicDetails && jobBasicDetails && jobCommissionDetails) {
          
          // 🔹 Check name filter (case-insensitive partial match)
          if (candidate_name) {
            const fullName = `${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`.toLowerCase();
            if (!fullName.includes(candidate_name.toLowerCase())) {
              continue; // skip this candidate if name doesn't match
            }
          }
  
          candidateInvoiceDetails.push({
            _id: candidate._id,
            candidate_id: candidate.candidate_id,
            candidate_name: candidateBasicDetails.first_name + " " + candidateBasicDetails.last_name,
            job_id: candidate.job_id,
            job_name: jobBasicDetails.job_title,
            candidate_status: candidate.candidate_status,
            invoice_status: isReplacementCauseOver(
              jobCommissionDetails.commission_details.replacement_clause,
              candidate.joining_date
            ) ? "Payable" : "Not Payable",
            designation: candidate.designation,
            location: candidate.job_location,
            offer_ctc: candidate.offer_ctc,
            billing_type: candidate.billing_type,
            offerletter: invoice ? invoice.offer_letter : null
          });
        }
      }
  
      res.status(200).json({ success: true, message:"Candidate details retrived.", data: candidateInvoiceDetails });
  
    } catch (err) {
      next(err);
    }
};
  

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