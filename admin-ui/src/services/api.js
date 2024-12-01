import axios from 'axios';
const app_be_uri = process.env.REACT_APP_API_APP_URL
const admin_be_uri = process.env.REACT_APP_API_BASE_URL

export const fetchEnterpriseData = async () => {
    try {
        const response = await axios.get(`${app_be_uri}/enterprise/findall`)
        return response.data;

    } catch (error) {
        console.error("Error fetching enterprise details: ", error);
        throw error;
    }
};

export const fetchEnterpriseVerifiedData = async (admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getverifiedennterprise/${admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching all verified enterprise data : ", error);
        throw error;
    }
}


export const fetchPendingEnterpriseData = async (admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getpendingenterprises/${admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching all verified enterprise data : ", error);
        throw error;
    }
}

export const fetchMasterAdminDetailsById = async (admin_id) => {
    try {
        const response = axios.get(`${admin_be_uri}/masteradmin/getdetails/${admin_id}`);
        return (await response).data;
    } catch (error) {
        console.error("Error while fetching the master admin details :", error);
        throw error;
    }
}
export const fetchEnterpriseById = async (enterprise_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/enterprise/find/${enterprise_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the particular enterprise details: ", error);
        throw error;
    }
}

export const fetchEnterpriseTeam = async (enterprise_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/enterpriseteam/findteam/${enterprise_id}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise team : ", error);
        throw error;
    }
}

//For fetch particuler enterprise memeber details
export const fetchEnterpriseMemberDetails = async (en_member_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/enterpriseteam/${en_member_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching enterprise team member details : ", error)
    }
}

//get all the verified enterprises by ac manager id
export const fetchVerifedEntepreiseByACId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/verifiedenterprises/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching verified enterprises by ac manager id : ", error);
        throw error;
    }
}

//get all pending verify enterprises by ac manager id
export const fetchPendingEntepreiseByACId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/pendingenterprises/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching pending verify enterprises by ac manager id : ", error);
        throw error;
    }
}

export const fetchAllJobDetails = async () => {
    try {
        const response = await axios.get(`${app_be_uri}/job`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job details : ", error);
        throw error;
    }
}


export const fetchJobBasicDetailsByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getbasicjobdetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the job basic details by job id : ", error);
        throw error;
    }
}

export const fetchJobDetailsById = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/details/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the job details by its id : ", error);
        throw error;
    }
}

export const fetchJobMainDetails = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/main-job/${job_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching the job main details : ", error)
    }
}

//For getting mapped recruiter member ids by jobid
export const fetchMappedRecruiterMemberIds = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/get-mapped-recruiter/${job_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching mapped recruiter ids : ", error)

    }
}

//For getting accepted recruiter member ids by jobid
export const fetchAcceptedRecruiterMemberIds = async (job_id) => {
    try{
        const response = await axios.get(`${app_be_uri}/job/get-accepted-recruiter/${job_id}`)
        return response.data
    } catch(error) {
        console.log("Error while fetching accepted recruiter ids : ",error)
    }
}

//for getting requested recruiter id's by jobid
export const fetchRequestedRecruiterIds = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/get-requested-recruiter/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching requested recruiters ids : ", error);
        throw error;
    }
}

//get the job basic details to show futher details in enterprise table
export const fetchJobBasicDetailsByEnId = async (enterprise_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getjobdetails/${enterprise_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job details by enterprise id : ", error);
        throw error;
    }
}

//get job commission details by job_id
export const fetchJobCommissionDetails = async (job_id) => {
    try {

    } catch (error) {
        console.error("Error while fetching the job commission details : ", error)
    }
}

//get job company info by job_id
export const fetchJobCompanyInfoByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getcompanydetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting job company info : ", error);
        throw error;
    }
}
// get job sourcing and guidelines details
export const fetchJobSourcingByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getsourcingdetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job sourcing details : ", error);
        throw error;
    }
}
// get job attachmaents by job id
export const fetchJobAttachmentsByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getjobattachmentdetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job sourcing details : ", error);
        throw error;
    }
}
// get job screening question by job id
export const fetchSQByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getscreeningquestions/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job screening questions : ", error);
        throw error;
    }
}
// get job commision details by job id
export const fetchCommissionDetailsByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getjobcommissiondetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job commision details : ", error);
        throw error;
    }
}

//get the job status by job id
export const fetchJobStatusByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getjobstatusforpreview/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while getting the job status by job id : ", error);
        throw error;
    }
}

export const fetchVerifiedRAgenciesByACmanagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getagencies/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified recruiting agencies: ", error);
        throw error;
    }
}

export const fetchPendingRAgenciesByACmanagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getpendingagencies/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified recruiting agencies: ", error);
        throw error;
    }
}

export const fetchVerifiedRAgenciesByAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getagencies/${m_admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified recruiting agencies: ", error);
        throw error;
    }
}

export const fetchPendingRAgenciesByAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getpendingagencies/${m_admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified recruiting agencies: ", error);
        throw error;
    }
}

export const fetchVerifiedJobsByAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getverifiedjobs/${m_admin_id}`);
        return response.data;

    } catch (error) {
        console.error("Error fetching verified jobs : ", error);
        throw error;
    }
}

export const fetchPendingJobsByAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getpendingjobs/${m_admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified jobs : ", error);
        throw error;
    }
}

export const fetchVerifiedJobsByACManagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getverifiedjobs/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified jobs : ", error);
        throw error;
    }
}

export const fetchPendingJobsByACManagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getpendingjobs/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching peding verify jobs : ", error);
        throw error;
    }
}

export const fetchVerifiedCandidatesByACManagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getverifiedcandidates/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified candidates : ", error);
        throw error;
    }
}

export const fetchPendingCandidatesByACManagerId = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getpendingcandidates/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching peding verify candidates : ", error);
        throw error;
    }
}

export const fetchVerifiedCandidatesByMAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getverifiedcandidates/${m_admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching verified candidates : ", error);
        throw error;
    }
}

export const fetchPendingCandidatesByMAdminId = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getpendingcandidates/${m_admin_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching peding verify candidates : ", error);
        throw error;
    }
}

export const fetchPostedCandidateProfileByJobId = async (job_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getpostedcandidates/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the posted candidates profiles by job id ", error);
        throw error;
    }
}

export const fetchRecuritingAgencybyId = async (r_agency_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/recruiting/${r_agency_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recruiting agencies: ", error);
        throw error;
    }
}

export const fetchRecuritingAgencies = async () => {
    try {
        const response = await axios.get(`${app_be_uri}/recruiting/getagencies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recruiting agencies: ", error);
        throw error;
    }
}
export const fetchRecruiterByEId = async (enterprise_id) => {
    try {
        const response = axios.get(`${app_be_uri}/enterprise/getrecruiter/${enterprise_id}`);
        return (await response).data;
    } catch (error) {
        console.error("Error while fetching the recapp_be_uriter for the job", error);
        throw error;
    }
}

// get recuriting team by r_agency_id
export const fetchRecuritingTeam = async (r_agency_id) => {
    try {
        const response = axios.get(`${app_be_uri}/recruitingteam/getrecuritingteam/${r_agency_id}`);
        return (await response).data;
    } catch (error) {
        console.error("Error while fetching the recuriting team details by r_agency_id :", error);
        throw error;
    }
}

//Get recruiter member details by re_member_id
export const fetchRecruiterMemberDetails = async (re_member_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/recruitingteam/${re_member_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching the recruiter member details: ", error)
        throw error
    }
}

export const fetchAllCandidateDetails = async () => {
    try {
        const response = await axios.get(`${app_be_uri}/candidate/details`)
        return response.data;
    } catch (error) {
        console.error("Error whilte fetching all candidates basic details : ", error);
        throw error;
    }
}

export const fetchAllCandidates = async () => {
    try {
        const response = axios.get(`${app_be_uri}/candidate/allcandidates`)
        return response.data;
    } catch (error) {
        console.error("Error whilte fetching all candidates : ", error);
        throw error;
    }
}

export const fetchCandidateBasicDetailsById = async (candidate_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/candidate/getdetails/${candidate_id}`);
        const { job_id, basic_details } = response.data;

        return { job_id, basic_details };
    } catch (error) {
        console.error("Error while fetching candidate details:", error);
        throw error;
    }
}

export const fetchCandidateStatusById = async (candidate_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/candidate/getcandidatestatus/${candidate_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching candidate status:", error);
        throw error;
    }
}

export const fetchCandidateDetailsByRecruiterId = async (recruiter_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/candidate/getbasicdetails/${recruiter_id}`);
        return response.data;
    } catch (error) {
        console.error("Error whilte fetching all candidates basic details by recruiter_id: ", error);
        throw error;
    }
}

//get the account manager name and email
export const fetchAccountManager = async (ac_manager_id) => {
    if (!ac_manager_id) {
        console.error("Account Manager ID is undefined");
        return; // Exit the function if the ID is not defined
    }
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/getmailandname/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching account manager details : ", error);
        throw error;
    }
};

//get the account manager on master admin
export const fetchAccountManagerMasterAdmin = async (m_admin_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/masteradmin/getaccountmanagerdetails/${m_admin_id}`)
        return response.data
    } catch (err) {
        console.error("Error while fetching account manager details by master admin id : ", err)
        throw err
    }
}

//get the all account manager details
export const fetchAccountManagerDetailsById = async (ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching all account manager details : ", error);
        throw error;
    }
}

// Search enterprise by name
export const SearchEnterprises = async (query = '') => {
    try {
        const response = await axios.get(`${app_be_uri}/api/enterprises/search`, {
            params: {
                q: query
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching enterprises:', error);
        return [];
    }
};

//search jobs by its title
export const SearchJobs = async (query = '') => {
    try {
        const response = await axios.get(`${app_be_uri}/api/job/search/`, {
            params: {
                q: query
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching enterprises by job title:', error);
        return [];
    }
};


// create a account manager using master admin id
export const CreateAccountManager = async (m_admin_id, formData) => {
    try {
        const response = await axios.post(`${admin_be_uri}/accountmanager/create/${m_admin_id}`, formData);
        return response;
    } catch (error) {
        console.error("Error while creating account manager : ", error);
        throw error;
    }
}

//For getting active job count for particuler enterprise member
export const getActiveJobsCountEnMember = async (en_member_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getactivejobcount/${en_member_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching active jobs count : ", error)
        throw error
    }
}

//For getting pending job count for particular enterprise member
export const getPendingJobCountEnMember = async (en_member_id) => {
    try {
        const response = await axios.get(`${app_be_uri}/job/getpendingjobcount/${en_member_id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching pending jobs count : ", error)
    }
}

