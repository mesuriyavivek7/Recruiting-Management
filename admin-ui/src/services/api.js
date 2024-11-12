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

//get all the verified enterprises by ac manager id
export const fetchVerifedEntepreiseByACId = async(ac_manager_id) => {
    try {
        const response = await axios.get(`${admin_be_uri}/accountmanager/verifiedenterprises/${ac_manager_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching verified enterprises by ac manager id : ", error);
        throw error;
    }
}

//get all pending verify enterprises by ac manager id
export const fetchPendingEntepreiseByACId = async(ac_manager_id) => {
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
        const response = await axios.post(
            `${admin_be_uri}/accountmanager/create/${m_admin_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error while creating account manager : ", error);
        throw error;
    }
}



