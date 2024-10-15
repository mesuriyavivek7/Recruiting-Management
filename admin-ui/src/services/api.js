import axios from 'axios';
const uri = process.env.REACT_APP_API_APP_URL

export const fetchEnterpriseData = async (enterprise_id) => {
    try {
        const response = await axios.get(`${uri}/enterprise/findall`)

        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise details: ", error);
        throw error;
    }
};

export const fetchEnterpriseTeam = async (enterprise_id) => {
    try {
        const response = await axios.get(`${uri}/enterprise/enterprise_id`)

        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise team : ", error);
        throw error;
    }
}

export const fetchRecuritingAgencies = async (r_agency_id) => {
    try {
        const response = await axios.get(`${uri}/recruiting/getagencies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recruiting agencies: ", error);
        throw error;
    }
}

export const fetchAllJobDetails = async() => {
    try {
        const response = await axios.get(`${uri}/job`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job details : ", error);
        throw error;
    }
}