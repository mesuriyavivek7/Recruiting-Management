import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js"
import bcrypt from 'bcryptjs'

//get account manager by master admin id
export const getAcByMadminId = async (req, res, next) => {
  try {
    const getaccountmanager = await ACCOUNTMANAGER.find({ master_admin: req.params.id })
    res.status(200).json(getaccountmanager)
  } catch (err) {
    next(err)
  }
}

//for adding enterprise into pending list
export const addEnterprise = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $push: { pending_verify_enterprise: req.body.en_id } })
    res.status(200).json("Successfully added enterprise into account manager pending list")
  } catch (err) {
    next(err)
  }
}

export const addRecruiting = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $push: { pending_verify_recruiting_agency: req.body.ra_id } })
    res.status(200).json("Sucessfully added recruiting agency into account manager pending list")
  } catch (err) {
    next(err)
  }
}


export const addVerifiedRecruitng = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.m_id, { $pull: { pending_verify_recruiting_agency: req.body.ra_id } })
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.m_id, { $push: { verified_recruiting_agency: req.body.ra_id } })
    res.status(200).json("Sucessfully added recruiting agency into verified list")
  } catch (err) {
    next(err)
  }
}

export const addVerifiedEnterprise = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $pull: { pending_verify_enterprise: req.body.en_id } })
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $push: { verified_enterprise: req.body.en_id } })
    res.status(200).json("Successfully added enterprise into verified list")
  } catch (err) {
    next(err)
  }
}

export const addJobsPendingList = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $push: { pending_verify_jobs: req.body.orgjobid } })
    res.status(200).json("Sucessfully added job into account manager pendig list")
  } catch (err) {
    next(err)
  }
}


export const addJobIntoVerifyList = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $pull: { pending_verify_jobs: req.body.orgjobid } })
    await ACCOUNTMANAGER.findByIdAndUpdate(req.body.ac_id, { $push: { verified_jobs: req.body.orgjobid } })
    res.status(200).json("Job Successfully added into accountmanager verify list")
  } catch (err) {
    next(err)
  }
}

export const getAcManagerEmail = async (req, res, next) => {
  try {
    const emailObj = await ACCOUNTMANAGER.findById(req.params.id, { email: 1, _id: 0 })
    res.status(200).json(emailObj)
  } catch (err) {
    next(err)
  }
}


export const addCandidatePendingList = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.params.acmanagerid, { $push: { pending_verify_candidate_profile: req.body.orgcid } })
    res.status(200).json("Candidate profile added into pending verified list")
  } catch (err) {
    next(err)
  }
}


export const addCandidateVerifiedList = async (req, res, next) => {
  try {
    await ACCOUNTMANAGER.findByIdAndUpdate(req.params.acmanagerid, { $pull: { pending_verify_candidate_profile: req.body.orgcid }, $push: { verified_candidate_profile: req.body.orgcid } })
    res.status(200).json("Successfully candidate profile added into verified list")
  } catch (err) {
    next(err)
  }
}


export const getAcmanagerMailandName = async (req, res, next) => {
  try {
    const acmanager = await ACCOUNTMANAGER.findById(req.params.acmanagerid, { full_name: 1, email: 1, _id: 0 })
    res.status(200).json(acmanager)
  } catch (err) {
    next(err)
  }
}


export const getAccountManager = async (req, res, next) => {
  try {
    const accountManagers = await ACCOUNTMANAGER.findById(req.params.ac_manager_id);
    res.status(200).json(accountManagers);
  } catch (error) {
    next(error);
  }
}

export const AddNewAccountManager = async (req, res, next) => {
  try {
    const { full_name, mobileno, email, password, admin_type } = req.body;
    const { master_admin_id } = req.params; 

    // Check if email already exists
    const existingManager = await ACCOUNTMANAGER.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new account manager with master admin reference
    const newManager = new ACCOUNTMANAGER({
      full_name,
      mobileno: mobileno || undefined,
      email,
      password : hashedPassword,
      master_admin: master_admin_id, 
      admin_type : "account_manager",                    // Set admin type (required field)
      pending_verify_enterprise: [],
      pending_verify_recruiting_agency: [],
      verified_enterprise: [],
      verified_recruiting_agency: [],
      pending_verify_candidate_profile: [],
      pending_verify_jobs: [],
      verified_candidate_profile: [],
      verified_jobs: [],
    });

    await newManager.save();
    res.status(200).json({ message: 'Account manager created successfully' });
  } catch (error) {
    next(error);
  }
};