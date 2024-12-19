import CANDIDATE from "../models/CANDIDATE.js"
import CANDIDATEBASICDETAILS from "../models/CANDIDATEBASICDETAILS.js"
import JOBBASICDETAILS from "../models/JOBBASICDETAILS.js"
import JOBS from "../models/JOBS.js"
import RECRUITING from "../models/RECRUITING.js"
import RECRUITINGTEAM from "../models/RECRUITINGTEAM.js"
import fs from 'fs'
import exceljs from 'exceljs'
import axios from 'axios'


//for kyc details submission
export const kycDetailsSubmission = async (req, res, next) => {
    try {
        const r_id = req.params.id
        await RECRUITING.findByIdAndUpdate(r_id, { $set: { kyc_details: req.body } })
        res.status(200).json("KYC Details Submited successfully")
    } catch (err) {
        next(err)
    }
}


//for kyc document submission

export const kycDocsSubmission = async (req, res, next) => {
    try {
        const r_id = req.params.id
        const filedata = {
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: req.file.mimetype
        }
        await RECRUITING.findByIdAndUpdate(r_id, { $set: { kyc_documents: filedata } })
        res.status(200).json("Kyc Document uploaded successfully")
    } catch (err) {
        next(err)
    }
}

export const checkKycDetails = async (req, res, next) => {
    try{
       const {recruitingid} = req.params
       const recruiter = await RECRUITING.findById(recruitingid)

       if(!recruiter) return res.status(404).json({message:"User not found"})

       if(recruiter.kyc_details.entity_type && recruiter.kyc_documents.filename) return res.status(200).json(true)
       else return res.status(200).json(false)

    }catch(err){ 
        next(err)
    }
}

export const getAllPendingMadminVerifyRAgency = async (req, res, next) => {
    try {
        const r_agency = await RECRUITING.find({ admin_verified: false })
        res.status(200).json(r_agency)
    } catch (err) {
        next(err)
    }
}


export const allocatedAcManager = async (req, res, next) => {
    try {
        await RECRUITING.findByIdAndUpdate(req.body.ra_id, { $set: { admin_verified: true, alloted_account_manager: req.body.ac_id } })
        console.log("Assigned to recruiting agency")
        res.status(200).json("Sucessfully recruiting agency assigned to account manager")
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export const changeAccountStatus = async (req, res, next) => {
    try {
        if (req.body.status === "Active") {
            await RECRUITING.findByIdAndUpdate(req.body.id, { $set: { account_status: { status: "Inactive", remark: req.body.reason, admin_id: req.body.admin_id } } })
        } else {
            await RECRUITING.findByIdAndUpdate(req.body.id, { $set: { account_status: { status: "Active", remark: "", admin_id: "" } } })
        }
        res.status(200).json("Status changed sucessfully")
    } catch (err) {
        next(err)
    }
}


export const getAllPendingAcmanagerRecruiting = async (req, res, next) => {
    try {
        const r_agency = await RECRUITING.find({ alloted_account_manager: req.params.id, account_manager_verified: false })
        res.status(200).json(r_agency)
    } catch (err) {
        next(err)
    }
}


export const acVerified = async (req, res, next) => {
    try {
        await RECRUITING.findByIdAndUpdate(req.body.id, { $set: { account_manager_verified: true } })
        res.status(200).json("Account manager verified successfully")
    } catch (err) {
        next(err)
    }
}


export const getAcmanager = async (req, res, next) => {
    try {
        const acmanager = await RECRUITING.findById(req.params.ragencyid, { alloted_account_manager: 1, _id: 0 })
        res.status(200).json(acmanager.alloted_account_manager)
    } catch (err) {
        next(err)
    }
}


export const getTeamMember = async (req, res, next) => {
    try {
        const members = await RECRUITINGTEAM.find({ recruiting_agency_id: req.params.reid })

        res.status(200).json(members)
    } catch (err) {
        next(err)
    }
}



export const getCandidateDetails = async (req, res, next) => {
    try {
        //Fetch job data with candidate profile for given recuriting member
        const candidateList = await CANDIDATE.find({ recruiter_member_id: req.params.reid })

        const allCandidateDetails = await Promise.all(candidateList.map(async (citem) => {
            const candidatebasicdetails = await CANDIDATEBASICDETAILS.findById(citem.candidate_basic_details)

            const jobstatus = await JOBS.findOne({ job_id: citem.job_id }, { job_status: 1, _id: 0 })
            const jobbasicdetails = await JOBBASICDETAILS.findOne({ job_id: citem.job_id })

            //Create candidate object
            let candidateObj = {
                id: citem._id,
                candidate_id: citem.candidate_id,
                candidate_full_name: `${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
                candidate_status: citem.candidate_status,
                submited: citem.createdAt,
                updated: citem.updatedAt,
                notice_period: candidatebasicdetails.notice_period,
                candidate_mobile_number: candidatebasicdetails.primary_contact_number,
                candidate_email_address: candidatebasicdetails.primary_email_id,
                remarks: citem.recruiter_remarks,
                job_id: jobbasicdetails.job_id,
                job_title: jobbasicdetails.job_title,
                job_country: jobbasicdetails.country,
                job_city: jobbasicdetails.city[0],
                job_status: jobstatus.job_status
            }

            return candidateObj
        }))

        // Retuen fetched candidate details
        res.status(200).json(allCandidateDetails)
    } catch (err) {
        next(err)
    }
}


export const getAgencyDetailsForProfilePage = async (req, res, next) => {
    try {
        const agency = await RECRUITING.findById(req.params.ragencyid)
        res.status(200).json(agency)
    } catch (err) {
        next(err)
    }
}

export const getRecruitingAgencies = async (req, res, next) => {
    try {
        const m_admin_id = req.params.m_admin_id;
        const agencies = await RECRUITING.find()
        if (agencies.length === 0) {
            return res.status(404).json({ message: 'No recruiting agencies found.' });
        }

        res.status(200).json(agencies);
    } catch (error) {
        next(error);
    }
}

export const getRecruitingAgencyById = async(req, res, next) => {
    try {
        const r_agency = await RECRUITING.findById(req.params.r_agency_id);
        if(!r_agency)
        {
            return res.status(404).json({message : 'No recruiting agency found.'});
        }
        res.status(200).json(r_agency);
    } catch (error) {
        next(error);
    }
}

export const updateAgencyDetails=async (req,res,next)=>{
      try{
         const {company_name,company_size,country,state,city,company_age,linkedin_url,company_description,domains,firm_type,country_preference_one,country_preference_two,experience_usa_sourcing}=req.body
         await RECRUITING.findByIdAndUpdate(req.params.ragencyid,{$set:{company_name,company_size,country,state,city,company_age,linkedin_url,company_description,domains,firm_type,country_preference_one,country_preference_two,experience_usa_sourcing}})
         res.status(200).json('Recruiting agency details updated.')
      }catch(err){
         next(err)
      }
}


export const uploadCoiCertificate=async (req,res,next)=>{
     try{
        const r_id=req.params.ragencyid
        const filedata={
           filename:req.file.filename,
           filepath:req.file.path,
           filetype:req.file.mimetype
        }
        await RECRUITING.findByIdAndUpdate(r_id,{$set:{certificate_of_incorporation:filedata}})
        res.status(200).json("Certification upload successfully")
     }catch(err){
         next(err)
     }
}




export const checkAndRemoveCoiFile=async (req,res,next)=>{
     try{
          const recruiter=await RECRUITING.findById(req.params.ragencyid,{certificate_of_incorporation:1})

          if(recruiter.certificate_of_incorporation && fs.existsSync(recruiter.certificate_of_incorporation.filepath)){
             fs.unlinkSync(recruiter.certificate_of_incorporation.filepath)
             await RECRUITING.findByIdAndUpdate(req.params.ragencyid,{$set:{certificate_of_incorporation:null}})
          }
          res.status(200).json('Check and remove coi file')
          
     }catch(err){
        next(err)
     }
}

export const checkIsVerifiedRecruiter=async (req,res,next)=>{
    try{
        const recruiter=await RECRUITING.findById(req.params.ragencyid)
        if(!recruiter) return res.status(404).json({message:"User not found!",type:"failure"})

        if(recruiter.admin_verified) res.status(200).json(true)
        else res.status(200).json(false)
    }catch(err){
        next(err)
    }
}

export const exportMemberData=async (req,res,next)=>{
     try{
        const members=await RECRUITINGTEAM.find({recruiting_agency_id:req.params.ragencyid})
        const membersData=members.map((item)=>{
            return {
                full_name:item.full_name,
                email:item.email,
                mobileno:item.mobileno,
                isAdmin:item.isAdmin,
                mapped_job:item.mapped_jobs.length,
                accepted_job:item.accepted_jobs.length,
                hide_commision:item.hide_commision
            }
        })

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Data");

        //Add headers
        worksheet.columns = [
            {header:"FULL NAME",key:'full_name',width:30},
            {header:"EMAIL",key:"email",width:30},
            {header:"MOBILENO",key:"mobileno",width:30},
            {header:"ISADMIN",key:"isAdmin",width:30},
            {header:"MAPPED JOBS",key:"mapped_job",width:30},
            {header:"ACCEPTED JOBS",key:"accepted_job",width:30},
            {header:"HIDE COMMISSION",key:"hide_commision",width:30},
        ]

     //Add rows
     membersData.forEach((item)=>{
        worksheet.addRow(item)
     })
        
     //Set Response Header
     res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     );
     res.setHeader(
         "Content-Disposition",
      "attachment; filename=data.xlsx"
     );

    // Write the workbook to the response
    await workbook.xlsx.write(res);
    res.status(200).end();

     }catch(err){
        next(err)
     }
}

export const getAcmanagerNameEmail = async (req, res, next) =>{
     try{
        const acmanagerId =await RECRUITING.findById(req.params.ragencyid)
      
        if(!acmanagerId.alloted_account_manager) return res.status(400).json("Account manager not found.")

        const response = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${acmanagerId.alloted_account_manager}`)

        if(!response.data) return res.status(400).json("Account manager not found.")

        res.status(200).json(response.data)

     }catch(err){
         next(err)
     }
}

export const getReAgancyName = async (req, res, next) =>{
   try{
      const name = await RECRUITING.findById(req.params.reagencyid,{full_name:1,_id:0})
      if(!name) res.status(404).json("Recruiter agency not found")

      res.status(200).json(name)
   }catch(err){
     next(err)
   }
}

