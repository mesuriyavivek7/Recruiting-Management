import MASTERADMIN from "../models/MASTERADMIN.js";


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

export const getPendingVerifiedEnterpriseByMAdmin = async  (req, res, next) => {
    try {
        const enterprises = await MASTERADMIN.findById(req.params.m_admin_id);
        res.status(200).json(enterprises.pending_verify_enterprise);
    } catch (error) {
        next(error);
    }
}