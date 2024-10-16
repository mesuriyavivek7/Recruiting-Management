import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
const uri = process.env.REACT_APP_API_APP_URL

export const fetchEnterpriseData = async (enterprise_id) => {
    try {
        const response = await axios.get(`${uri}/enterprise/findall`)
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise details: ", error);
        throw error;
    }
};

export const fetchEnterpriseTeam = async (enterprise_id) => {
    try {
        const response = await axios.get(`${uri}/enterprise/${enterprise_id}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise team : ", error);
        throw error;
    }
}

export const fetchAllJobDetails = async () => {
    try {
        const response = await axios.get(`${uri}/job`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job details : ", error);
        throw error;
    }
}

export const fetchJobBasicDetailsByJobId = async(job_id) => {
    try {
        const response = await axios.get(`${uri}/job/getbasicjobdetails/${job_id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the job basic details by job id : ", error);
        throw error;
    }
}

export const fetchRecuritingAgencies = async () => {
    try {
        const response = await axios.get(`${uri}/recruiting/getagencies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recruiting agencies: ", error);
        throw error;
    }
}

export const fetchRecuritingAgencyById = async (r_agency_id) => {
    try {
        const response = await axios.get(`${uri}/recruiting/${r_agency_id}`)

        return response.data;
    } catch (error) {
        console.error("Error while fetching thr recruiting agency : ", error);
        throw error;
    }
}

export const fetchRecruiterByEId = async(enterprise_id) => {
    try {
        const response = axios.get(`${uri}/enterprise/getrecruiter/${enterprise_id}`);
        return (await response).data;
    } catch (error) {
        console.error("Error while fetching the recuriter for the job", error);
        throw error;
    }
}

export const fetchAllCandidateDetails = async () => {
    try {
        const response = await axios.get(`${uri}/candidate/details`)
        return response.data;
    } catch (error) {
        console.error("Error whilte fetching all candidates basic details : ", error);
        throw error;
    }
}

export const fetchAllCandidates = async () => {
    try {
        const response = axios.get(`${uri}/candidate/allcandidates`)
        return response.data;
    } catch (error) {
        console.error("Error whilte fetching all candidates : ", error);
        throw error;
    }
}

export const fetchCandidateStatusById = async (basicDetailId) => {
    try {   
        const response = axios.get(`${uri}/candidate/getcandidatestatus/${basicDetailId}`);
        return response.data;
    } catch (error) {
        console.error("Error while fecthing candidate status :", error);
        throw error;
    }
}
