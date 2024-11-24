import { Card } from '@mui/material';
import { Typography, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'
import { FaBriefcase, FaBuilding, FaInfoCircle } from 'react-icons/fa';
import { fetchAccountManager } from '../../../services/api';

const AdminRecruitingDetails = ({ recuritingAgenciesDetails }) => {

  const [accountManager, setAccountManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (recuritingAgenciesDetails?.alloted_account_manager) {
        try {
          const managerData = await fetchAccountManager(recuritingAgenciesDetails?.alloted_account_manager);
          setAccountManager(managerData);
        } catch (error) {
          console.error('Error fetching account manager data:', error);
        }
      }
    };

    fetchData();
  }, [recuritingAgenciesDetails]);

  console.log(recuritingAgenciesDetails);

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
      <Box sx={{
        mb: 2, pb: 2, borderBottom: '4px solid white',
      }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaBriefcase className="mr-2 text-black" /> Recruiting Agency Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Full Name:</strong>{renderValue(recuritingAgenciesDetails?.full_name)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Phone Number:</strong>  {renderValue(recuritingAgenciesDetails?.mobileno)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email:</strong>  {renderValue(recuritingAgenciesDetails?.email)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Designation:</strong>{renderValue(recuritingAgenciesDetails?.designation)}</Typography>
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
              <Typography variant="body1"><strong>Company Name:</strong> {renderValue(recuritingAgenciesDetails?.company_name)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Size:</strong> {renderValue(recuritingAgenciesDetails?.company_size)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Country:</strong>{renderValue(recuritingAgenciesDetails?.country)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>State:</strong>{renderValue(recuritingAgenciesDetails?.state)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>City:</strong> {renderValue(recuritingAgenciesDetails?.city)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Linkedin URL:</strong>  {renderValue(recuritingAgenciesDetails?.linkedin_url)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff'
              }}
            >
              <Typography variant="body1">
                <strong>Domains: </strong>
                {recuritingAgenciesDetails?.domains?.join(' ● ')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* KYC Details Section */}
      {recuritingAgenciesDetails?.kyc_details && (<Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaFileAlt className="mr-2 text-black" /> KYC Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0.5 }}>
                <Typography variant="body1">
                  <strong>Entity Type:</strong> {recuritingAgenciesDetails?.kyc_details?.entity_type || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>PAN Card Number:</strong> {recuritingAgenciesDetails?.kyc_details?.pancard_number || 'N/A'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {recuritingAgenciesDetails?.kyc_documents?.filename ? (
                  <a
                    href={`http://localhost:8080/kycdocs/${recuritingAgenciesDetails?.kyc_documents?.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      marginTop: '8px',
                      display: 'inline-block',
                      padding: '8px 12px',
                      border: '1px solid #1976d2',
                      borderRadius: '4px',
                    }}
                  >
                    View File
                  </a>
                ) : (
                  <Typography>No documents available.</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      )}

      {/* Third Section: Other Details */}
      <Box>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2 pb-2">
          <FaInfoCircle className="mr-2 text-black" /> Other Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email Verification:</strong>  {renderValue(recuritingAgenciesDetails?.email_verification ? 'Yes' : 'No')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Kyc Verification:</strong> {renderValue(recuritingAgenciesDetails?.kyc_verification ? 'Yes' : 'No')}</Typography>
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
