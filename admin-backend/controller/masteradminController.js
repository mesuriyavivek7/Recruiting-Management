import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js";
import MASTERADMIN from "../models/MASTERADMIN.js";
import axios from 'axios'

export const addEnterprise = async (req, res, next) => {
    try {
        let masteradmin = null
        const masteradmin_ct = await MASTERADMIN.findOne({ master_admin_type: req.body.country.toLowerCase() })
        if (masteradmin_ct) {
            masteradmin = masteradmin_ct
        } else {
            if (req.body.country === "India") {
                masteradmin = await MASTERADMIN.findOne({ master_admin_type: "domestic" })
            } else {
                masteradmin = await MASTERADMIN.findOne({ master_admin_type: "international" })
            }

        }
        //update master admin pending verification list
        await MASTERADMIN.findByIdAndUpdate(masteradmin._id, { $push: { pending_verify_enterprise: req.body.id } })

        res.status(200).json("Masteradmin pending list updated")
    } catch (err) {
        next(err)
    }
}


export const rmvEnterprisePendingList = async (req, res, next) => {
    try {
        await MASTERADMIN.findByIdAndUpdate(req.body.m_id, { $pull: { pending_verify_enterprise: req.body.en_id } })
        res.status(200).json("Successfully remove enterprise id from pending verification list")
    } catch (err) {
        next(err)
    }
}

export const recruiterAgencyVerified = async (req, res, next) =>{
    try{
        await MASTERADMIN.findByIdAndUpdate(req.body.m_id,{$pull:{pending_verify_recruiting_agency:req.body.ra_id},$push:{verified_recruiting_agency:req.body.ra_id}})
        res.status(200).json("Successfully recruiter agency verified by masteradmin")
    }catch(err){
         next(err)
    }
}


export const addRecruitingAgency = async (req, res, next) => {
    try {
        let masteradmin = null

        const masteradmin_ct = await MASTERADMIN.findOne({ master_admin_type: req.body.country.toLowerCase() })
        if (masteradmin_ct) {
            masteradmin = masteradmin_ct
        } else {
            if (req.body.country === "India") {
                masteradmin = await MASTERADMIN.findOne({ master_admin_type: "domestic" })
            } else {
                masteradmin = await MASTERADMIN.findOne({ master_admin_type: "international" })
            }
        }
        //update masteradmin pending verification list
        await MASTERADMIN.findByIdAndUpdate(masteradmin._id, { $push: { pending_verify_recruiting_agency: req.body.id } })
        res.status(200).json("master admin pendign list update")
    } catch (err) {
        next(err)
    }
}

export const rmvRecruitingPendingList = async (req, res, next) => {
    try {
        await MASTERADMIN.findByIdAndUpdate(req.body.m_id, { $pull: { pending_verify_recruiting_agency: req.body.ra_id } })
        res.status(200).json("Remove recruting agency from master admin pending list")
    } catch (err) {
        next(err)
    }
}

export const getVerifiedEnterprisesByMAdmin = async (req, res, next) => {
    try {
        const enterprises = await MASTERADMIN.findById(req.params.m_admin_id);
        res.status(200).json(enterprises.verified_enterprise);
    } catch (error) {
        next(error);
    }
}

export const getPendingVerifiedEnterpriseByMAdmin = async (req, res, next) => {
    try {
        const enterprises = await MASTERADMIN.findById(req.params.m_admin_id);
        res.status(200).json(enterprises.pending_verify_enterprise);
    } catch (error) {
        next(error);
    }
}

export const getAccountManagerDetailsByMId = async (req, res, next) => {
    try {
        const accountManagerIds = await MASTERADMIN.findById(req.params.m_admin_id)

        const accountManagerDetails = await Promise.all(accountManagerIds.account_manager.map(async (ac_id) => {
            const acemailname = await axios.get(`${process.env.ADMIN_SERVER_URL}/accountmanager/getmailandname/${ac_id}`)

            return ({
                ac_id,
                name: acemailname.data.full_name,
                email: acemailname.data.email
            })
        }))

        res.status(200).json(accountManagerDetails)
    } catch (err) {
        next(err)
    }
}



export const handleAssignEnterpriseToAc = async (req, res, next) => {
    try {
        //4 step process for assigning to any acmanager
        const { ac_id, en_id, m_admin_id } = req.body
        //step 1 (master admin)
        await MASTERADMIN.findByIdAndUpdate(m_admin_id, { $pull: { pending_verify_enterprise: en_id }, $push: { verified_enterprise: en_id } })

        //step 2 (enterprise)
        await axios.post(`${process.env.APP_SERVER_URL}/enterprise/allocatedacmanager`, { en_id, ac_id })

        //step 3 (account manager)
        await axios.post(`${process.env.ADMIN_SERVER_URL}/accountmanager/addenterprise`, { en_id, ac_id })

        res.status(200).json("Successfully enterprise allocated to account manager")

    } catch (err) {
        next(err)
    }
}

export const getMasterAdminDetails = async (req, res, next) => {
    try {
        const masterAdmin = await MASTERADMIN.findById(req.params.m_admin_id);
        res.status(200).json(masterAdmin);
    } catch (error) {
        next(error)
    }
}

export const getAllVerifiedRecuritingAgencies = async (req, res, next) => {
    try {
        const RecruitingAgencies = await MASTERADMIN.findById(req.params.m_admin_id);
        res.status(200).json(RecruitingAgencies.verified_recruiting_agency);
    } catch (error) {
        next(error);
    }
}

export const getAllPendingRecuritingAgencies = async (req, res, next) => {
    try {
        const RecruitingAgencies = await MASTERADMIN.findById(req.params.m_admin_id);
        if(!RecruitingAgencies) return res.status([])
        else res.status(200).json(RecruitingAgencies.pending_verify_recruiting_agency);
    } catch (error) {
        next(error);
    }
}

export const getAllVerifiedJobs = async (req, res, next) => {
    try {
        const masterAdmin = await MASTERADMIN.findById(req.params.m_admin_id);
        const accountManagerIds = masterAdmin.account_manager;
        const accountManagers = await ACCOUNTMANAGER.find({ _id: { $in: accountManagerIds } });

        const allVerifiedJobs = accountManagers.reduce((acc, manager) => {
            if (manager.verified_jobs) {
                acc.push(...manager.verified_jobs);
            }
            return acc;
        }, []);

        res.status(200).json(allVerifiedJobs);
    } catch (error) {
        next(error);
    }
};

export const getAllPendingJobs = async (req, res, next) => {
    try {
        const masterAdmin = await MASTERADMIN.findById(req.params.m_admin_id);
        const accountManagerIds = masterAdmin.account_manager;
        const accountManagers = await ACCOUNTMANAGER.find({ _id: { $in: accountManagerIds } });

        const allPendingJobs = accountManagers.reduce((acc, manager) => {
            if (manager.verified_jobs) {
                acc.push(...manager.pending_verify_jobs);
            }
            return acc;
        }, []);

        res.status(200).json(allPendingJobs);
    } catch (error) {
        next(error);
    }
};

export const getAllVerifiedCandidates = async (req, res, next) => {
    try {
        const masterAdmin = await MASTERADMIN.findById(req.params.m_admin_id);
        const accountManagerIds = masterAdmin.account_manager;
        const accountManagers = await ACCOUNTMANAGER.find({ _id: { $in: accountManagerIds } });

        const allVerifiedCandidates = accountManagers.reduce((acc, manager) => {
            if (manager.verified_jobs) {
                acc.push(...manager.verified_candidate_profile);
            }
            return acc;
        }, []);

        res.status(200).json(allVerifiedCandidates);
    } catch (error) {
        next(error);
    }
};


export const getAllPendingCandidates = async (req, res, next) => {
    try {
        const masterAdmin = await MASTERADMIN.findById(req.params.m_admin_id);
        const accountManagerIds = masterAdmin.account_manager;
        const accountManagers = await ACCOUNTMANAGER.find({ _id: { $in: accountManagerIds } });

        const allPendingCandidates = accountManagers.reduce((acc, manager) => {
            if (manager.verified_jobs) {
                acc.push(...manager.pending_verify_candidate_profile);
            }
            return acc;
        }, []);

        res.status(200).json(allPendingCandidates);
    } catch (error) {
        next(error);
    }
};


export const handleAddAcManager=async (req,res,next)=>{
     try{ 
        const {m_admin_id, ac_id}=req.body
        await MASTERADMIN.findByIdAndUpdate(m_admin_id,{$push:{account_manager:ac_id}})
        res.status(200).json("Account manager added.")
     }catch(err){
         next(err)
     }
}