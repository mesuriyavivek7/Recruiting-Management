import ENTERPRISE from "../models/ENTERPRISE.js";
import ENTERPRISETEAM from "../models/ENTERPRISETEAM.js";
import JOBS from "../models/JOBS.js";
import bcrypt from 'bcryptjs'
import axios from 'axios'
import exceljs from 'exceljs'

export const getMobileNo = async (req, res, next) => {
  try {
    const enterpriseuser = await ENTERPRISE.findById(req.params.id)
    res.status(200).json(enterpriseuser.mobileno)
  } catch (err) {
    next(err)
  }
}


export const changeMail = async (req, res, next) => {
  try {
    const enterpriseteamuser = await ENTERPRISETEAM.findById(req.params.id)
    if (enterpriseteamuser.isAdmin) {
      await ENTERPRISE.findByIdAndUpdate(enterpriseteamuser.enterprise_id, { $set: { email: req.body.email, email_verified: false } })
    } 
    await ENTERPRISETEAM.findByIdAndUpdate(req.params.id, { $set: { email: req.body.email, email_verified: false } })  
    await axios.post(`${process.env.APP_SERVER_URL}/mail/sendupdateemailverificationenterprise`,{name:enterpriseteamuser.full_name,email:req.body.email})
    res.status(200).json("Email address is updated")
  } catch (err) {
    next(err)
  }
}

//for checking password
export const checkPassword = async (req, res, next) => {
  try {
    const enterpriseuser = await ENTERPRISETEAM.findById(req.params.id)
    const isPasswordCorrect = await bcrypt.compare(req.body.password, enterpriseuser.password)
    res.status(200).json(isPasswordCorrect)
  } catch (err) {
    next(err)
  }
}



//change password
export const changepassword = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const enterpriseteam = await ENTERPRISETEAM.findById(req.params.id)
    if (enterpriseteam.isAdmin) {
      //changing into enterprise
      await ENTERPRISE.findByIdAndUpdate(enterpriseteam.enterprise_id, { $set: { password: hash } })
    }

    //changing into enterprose team
    await ENTERPRISETEAM.findByIdAndUpdate(req.params.id, { $set: { password: hash } })
    res.status(200).json("Successfully password changed.")
  } catch (err) {
    next(err)
  }
}

export const getAllPendingMadminVerifyEnterprise = async (req, res, next) => {
  try {
    const pendingenterprise = await ENTERPRISE.find({ admin_verified: false })
    res.status(200).json(pendingenterprise)
  } catch (err) {
    next(err)
  }
}


export const changeAccountStatus = async (req, res, next) => {
  try {
    if (req.body.status === "Active") {
      await ENTERPRISE.findByIdAndUpdate(req.body.id, { $set: { account_status: { status: "Inactive", remark: req.body.reason, admin_id: req.body.admin_id } } })
    } else {
      await ENTERPRISE.findByIdAndUpdate(req.body.id, { $set: { account_status: { status: "Active", remark: "", admin_id: "" } } })
    }
    res.status(200).json("Status changes successfully")
  } catch (err) {
    next(err)
  }
}


export const allocatedAcManager = async (req, res, next) => {
  try {
    await ENTERPRISE.findByIdAndUpdate(req.body.en_id, { $set: { admin_verified: true, allocated_account_manager: req.body.ac_id } })
    res.status(200).json("Allocated to acmanager")
  } catch (err) {
    next(err)
  }
}

export const getAcPendingEnterprise = async (req, res, next) => {
  try {
    const enterprise = await ENTERPRISE.find({ allocated_account_manager: req.params.id, account_manager_verified: false })
    res.status(200).json(enterprise)
  } catch (err) {
    next(err)
  }
}


export const acVerified = async (req, res, next) => {
  try {
    await ENTERPRISE.findByIdAndUpdate(req.body.id, { $set: { account_manager_verified: true } })
    res.status(200).json("successfully verification done from account manager side")
  } catch (err) {
    next(err)
  }
}


export const getCompnayName = async (req, res, next) => {
  try {
    const company = await ENTERPRISE.findById(req.params.eid, { company_name: 1, _id: 0 })
    res.status(200).json(company)
  } catch (err) {
    next(err)
  }
}

export const getAcManagerId = async (req, res, next) => {
  try {
    const acmanager = await ENTERPRISE.findById(req.params.eid)
    res.status(200).json(acmanager.allocated_account_manager)
  } catch (err) {
    next(err)
  }
}


export const getEnterpriseMember = async (req, res, next) => {
  try {
    const enterpriseMember = await ENTERPRISETEAM.find({ enterprise_id: req.params.eid })
    const enterpriseData = await Promise.all(enterpriseMember.map(async (enterprise) => {
      const activeJobCount = await JOBS.countDocuments({ enterprise_member_id: enterprise._id, job_status: 'Active' })
      const pendingJobCount = await JOBS.countDocuments({ enterprise_member_id: enterprise._id, job_status: 'Pending' })

      return (
        {
          id: enterprise._id,
          full_name: enterprise.full_name,
          account_status: enterprise.account_status,
          active_jobs: activeJobCount,
          pending_jobs: pendingJobCount,
          isAdmin: enterprise.isAdmin,
          createdAt: enterprise.createdAt
        }
      )
    }))
    res.status(200).json(enterpriseData)
  } catch (err) {
    next(err)
  }
}

export const exportEnterpriseMemberData=async (req,res,next)=>{
    try{
      const enterpriseMember = await ENTERPRISETEAM.find({ enterprise_id: req.params.eid })
      const enterpriseData = await Promise.all(enterpriseMember.map(async (enterprise) => {
          const activeJobCount = await JOBS.countDocuments({ enterprise_member_id: enterprise._id, job_status: 'Active' })
          const pendingJobCount = await JOBS.countDocuments({ enterprise_member_id: enterprise._id, job_status: 'Pending' })
          return (
           {
            full_name: enterprise.full_name,
            account_status: enterprise.account_status,
            active_jobs: activeJobCount,
            pending_jobs: pendingJobCount,
            isAdmin: enterprise.isAdmin,
            createdAt: enterprise.createdAt
          }
         )
      }))

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Data");

      //Add headers
      worksheet.columns = [
        {header:"FULL NAME",key:'full_name',width:40},
        {header:"ACCOUNT STATUS",key:'account_status',width:40},
        {header:"ACTIVE JOBS",key:'active_jobs',width:40},
        {header:"PENDING JOBS",key:'pending_jobs',width:40},
        {header:"ISADMIN",key:'isAdmin',width:40},
        {header:"CREATED AT",key:'createdAt',width:40},
      ]

      //Add rows
      enterpriseData.forEach((item)=>{
        worksheet.addRow(item)
      })

      // Set response headers
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

export const getAcmanagerMailandName = async (req, res, next) => {
  try {
    const allotedmanagerid = await ENTERPRISE.findById(req.params.eid, { allocated_account_manager: 1, _id: 0 })
    const user = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${allotedmanagerid.allocated_account_manager}`)
    res.status(200).json(user.data)
  } catch (err) {
    next(err)
  }
}

export const getEnterprise = async (req, res, next) => {
  try {
    const enterprise = await ENTERPRISE.findById(req.params.id)
    res.status(200).json(enterprise)
  } catch (err) {
    next(err)
  }
}

export const getAllEnterprise = async (req, res, next) => {
  try {
    const enterprises = await ENTERPRISE.find();
    res.status(200).json(enterprises);
  } catch (error) {
    next(error)
  }
}


export const getRecruiterForJob = async (req, res, next) => {
  try {
    const enterpice_id = req.params.enterpice_id;
    const recruiter = await ENTERPRISE.findById(enterpice_id);
    if (!recruiter) {
      return res.status(404).json({ message: "Error to get the recuriter for particluer job " });
    }
    res.status(200).json(recruiter.full_name);
  } catch (error) {
    next(error);
  }
}

export const SearchEnterpriseByName = async (req, res, next) => {
  const searchQuery = req.query.q;
  try {
    console.log(`Searching for: ${searchQuery}`);
    // Fetch enterprises matching the search query
    const enterprises = await ENTERPRISE.find({ full_name: { $regex: searchQuery, $options: 'i' } });
    res.json(enterprises);
  } catch (error) {
    next(error);
  }
}


export const isVerifiedEnterprise=async (req,res,next)=>{
   try{
     const enterprise=await ENTERPRISE.findById(req.params.eid)
     if(!enterprise) return res.status(404).status({message:"User not found...!",type:"failure"})

     if(enterprise.admin_verified && enterprise.account_manager_verified){
      res.status(200).json(true)
     }else{
      res.status(200).json(false)
     }
   }catch(err){
     next(err)
   }
}