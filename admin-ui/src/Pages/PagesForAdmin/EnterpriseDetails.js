import { Typography, Box, Grid } from '@mui/material';

import { FaBuilding, FaInfoCircle } from 'react-icons/fa'; // Importing relevant icons

import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { fetchAccountManager } from '../../services/api'; 


const EnterpriseDetails = ({enterpriseDetails}) => {
  const [accountManager, setAccountManager] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
        if (enterpriseDetails?.allocated_account_manager) {
            try {
                const managerData = await fetchAccountManager(enterpriseDetails?.allocated_account_manager);
                setAccountManager(managerData);
            } catch (error) {
                console.error('Error fetching account manager data:', error);
            }
        }
    };

    fetchData();
  }, [enterpriseDetails]);

  return (

    <Card className="mt-4 font-sans py-6" sx={{ borderRadius: '8px', boxShadow: 3, backgroundColor: '#f0f0f0', padding: 3 }}>
      
      {/* First Section: Enterprise Details */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaBriefcase className="mr-2 text-black" /> Enterprise Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Full Name:</strong>{enterpriseDetails?.full_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Mobile Number:</strong>+{enterpriseDetails?.mobileno}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email:</strong> {enterpriseDetails?.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Designation:</strong> {enterpriseDetails?.designation}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Second Section: Company Details */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaBuilding className="mr-2 text-black" /> Company Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Name:</strong> {enterpriseDetails?.company_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Size:</strong> {enterpriseDetails?.company_size}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Country:</strong> {enterpriseDetails?.country}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>State:</strong>{enterpriseDetails?.state}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>City:</strong> {enterpriseDetails?.city}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Third Section: Other Details */}
      <Box>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaInfoCircle className="mr-2 text-black" /> Other Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email Verified:</strong> {enterpriseDetails?.email_verified ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Account Status:</strong>{enterpriseDetails?.account_status?.status}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Allocated Account Manager:</strong> {accountManager?.full_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Admin Verified:</strong> {enterpriseDetails?.admin_verified ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Card>
  );
};


export default EnterpriseDetails;
