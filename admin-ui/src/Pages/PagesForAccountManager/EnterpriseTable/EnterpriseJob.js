import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TextField, InputAdornment } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { colsJob } from './RowColData';
import { fetchJobBasicDetailsByEnId, fetchJobStatusByJobId } from '../../../services/api';
import Notification from '../../../Components/Notification';


const EnterpriseJob = ({ enterpriseDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

 
  const [loading, setLoading] = React.useState(false); // Loader state

  const [notification, setNotification] = React.useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Function to map enterpriseDetails to rows
  const generateRowsFromDetails = async (details) => {
    setLoading(true)
    try{
      const data = await fetchJobBasicDetailsByEnId(details._id);

      // Fetch status for each job concurrently
      const rows = await Promise.all(
        data.map(async (detail, index) => {
          const jobStatus = await fetchJobStatusByJobId(detail.job_id); // Fetch job status by job_id
          return {
            _id: `${index + 1}`,
            job_title: detail?.job_title,
            enterprise: details?.full_name,
            status: jobStatus || 'Unknown', // Set status from API or default to 'Unknown'
            createdOn: detail?.createdAt,
          };
        })
      );

      const lowerCaseTerm = searchTerm.toLowerCase();
      const newFilteredRows = rows.filter((row) =>
        row.job_title.toLowerCase().includes(lowerCaseTerm)
      );

      setFilteredRows(newFilteredRows);
  
    }catch(err){
       showNotification("Something went wrong.",'failure')
       console.log(err)
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (enterpriseDetails) {
      generateRowsFromDetails(enterpriseDetails)
    }
  }, [enterpriseDetails,searchTerm]);
  

  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Card
        className="mt-4 font-sans shadow-md"
        sx={{ borderRadius: '8px', boxShadow: 3 }}
      >
        
          <div className="px-6 py-5">
            {/* Search Field */}
            <TextField
              variant="outlined"
              placeholder="Search Job..."
              fullWidth
              className="my-4 pt-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm dynamically
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />

            {/* DataGrid Section */}
            <div style={{ height: 600, width: '100%' }} className="pt-4">
              <DataGrid
                rows={filteredRows}
                columns={colsJob}
                rowHeight={80}
                pageSize={8}
                loading={loading}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-root': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
                  },
                  '[class^=MuiDataGrid]': { border: 'none' },
                  '& .MuiDataGrid-columnHeader': {
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                    color: 'black',
                    backgroundColor: '#e3e6ea !important',
                    minHeight: '60px',
                  },
                  '& .MuiDataGrid-cell': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
                    minHeight: '2.5rem',
                  },
                  '& .MuiDataGrid-cellContent': {
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiDataGrid-row': {
                    borderBottom: 'none',
                  },
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                }}
              />
            </div>
          </div>
        
      </Card>

      
    </div>
  );
};

export default EnterpriseJob;

