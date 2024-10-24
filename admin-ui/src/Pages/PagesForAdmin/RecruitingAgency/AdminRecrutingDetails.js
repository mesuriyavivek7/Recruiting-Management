

import { Card } from '@mui/material';
import {  Typography, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ActionIcon } from "./../../../assets/asset23.svg";
import { useLocation } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa'
import { FaBriefcase, FaBuilding, FaInfoCircle } from 'react-icons/fa';
import { fetchAccountManager } from '../../../services/api';

const AdminRecruitingDetails = () => {


  const location = useLocation();
  const { RecuritingAgenciesDetails } = location.state || {}; // Access the passed state
  const [accountManager, setAccountManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (RecuritingAgenciesDetails.alloted_account_manager) {
        try {
          const managerData = await fetchAccountManager(RecuritingAgenciesDetails.alloted_account_manager);
          setAccountManager(managerData);
        } catch (error) {
          console.error('Error fetching account manager data:', error);
        }
      }
    };

    fetchData();
  }, [RecuritingAgenciesDetails]);

  const kycData = {
    details: {
      name: "John Doe",
      age: 30,
      address: "123 Main St",
    },
    documents: {
      idProof: "Passport",
      addressProof: "Utility Bill",
      incomeProof: "Salary Slip",
    },
  };

  // Helper function to render object or array values as strings
  const renderValue = (value) => {
    if (typeof value === 'object') {
      // If the value is an object or array, convert it to a JSON string for display
      return JSON.stringify(value);
    }
    return value ?? 'N/A'; // Handle undefined/null with 'N/A'
  };






  
  return (
    <Card className="mt-4 font-sans py-6" sx={{ borderRadius: '8px', boxShadow: 3, backgroundColor: '#f0f0f0', padding: 3 }}>
      
   
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
          <FaBriefcase className="mr-2 text-black" /> Recruiting Agency Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Full Name:</strong>{renderValue(RecuritingAgenciesDetails?.full_name)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Phone Number:</strong>  {renderValue(RecuritingAgenciesDetails?.mobileno)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email:</strong>  {renderValue(RecuritingAgenciesDetails?.email)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Designation:</strong>{renderValue(RecuritingAgenciesDetails?.designation)}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Second Section: Company Details */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
          <FaBuilding className="mr-2 text-black" /> Company Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Name:</strong> {renderValue(RecuritingAgenciesDetails?.company_name)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Size:</strong> {renderValue(RecuritingAgenciesDetails?.company_size)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Country:</strong>{renderValue(RecuritingAgenciesDetails?.country)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>State:</strong>{renderValue(RecuritingAgenciesDetails?.state)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>City:</strong> {renderValue(RecuritingAgenciesDetails?.city)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Linkedin URL:</strong>  {renderValue(RecuritingAgenciesDetails?.linkedin_url)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Domains:</strong> {renderValue(RecuritingAgenciesDetails?.domains)}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
          <FaFileAlt className="mr-2 text-black" /> Kyc Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"> <strong>KYC Details:</strong>{renderValue(kycData.details)}
                
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>KYC Documents:</strong>{renderValue(kycData.documents)}
                
                </Typography>
            </Box>
          </Grid>
         
        </Grid>
      </Box>
      {/* Third Section: Other Details */}
      <Box>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
          <FaInfoCircle className="mr-2 text-black" /> Other Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email Verification:</strong>  {renderValue(RecuritingAgenciesDetails?.email_verification ? 'Yes' : 'No')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Kyc Verification:</strong> {renderValue(RecuritingAgenciesDetails?.kyc_verification ? 'Yes' : 'No')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Allocated Account Manager:</strong> {renderValue(accountManager?.full_name)}</Typography>
            </Box>
          </Grid>
         
        </Grid>
      </Box>


 
    </Card>
  );
};

export default AdminRecruitingDetails;
