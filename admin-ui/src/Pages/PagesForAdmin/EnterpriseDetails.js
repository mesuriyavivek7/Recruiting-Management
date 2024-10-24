


import { Card, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { FaBriefcase, FaBuilding, FaInfoCircle } from 'react-icons/fa'; // Importing relevant icons

const EnterpriseDetails = () => {
  return (
    <Card className="mt-4 font-sans py-6" sx={{ borderRadius: '8px', boxShadow: 3, backgroundColor: '#f0f0f0', padding: 3 }}>
      
      {/* First Section: Enterprise Details */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
          <FaBriefcase className="mr-2 text-black" /> Enterprise Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Full Name:</strong> Software Engineer</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Phone Number:</strong> 87544786756</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Email:</strong> arati@gmail.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Designation:</strong> Software Engineer</Typography>
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
              <Typography variant="body1"><strong>Company Name:</strong> Odoo</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Company Size:</strong> 500-1000 Employees</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Country:</strong> USA</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>State:</strong> California</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>City:</strong> Nesco</Typography>
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
              <Typography variant="body1"><strong>Email Verified:</strong> Yes</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Account Status:</strong> Active</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Allocated Account Manager:</strong> John Sinha</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="body1"><strong>Admin Verified:</strong> Yes</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Card>
  );
};

export default EnterpriseDetails;
