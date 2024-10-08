


import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { columns } from './RowColDataOfAll'; // Import columns configuration

const AllJobData = () => {
  const [rows, setRows] = useState([]); // State to hold job data
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch job data from the backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/job'); // Your API endpoint
      setRows(response.data); // Set the fetched data to rows
    } catch (error) {
      console.error('Error fetching jobs:', error); // Handle error
    }
  };

  // Use effect to fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRowClick = (job_id) => {
    setSelectedRowId(job_id);
    navigate(`/account_manager/job/${job_id}`); 
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>All Jobs</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
          <DataGrid 
            rows={paginatedRows}
            columns={columns}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.id)}
            getRowId={(row) => row.job_id} // Specify the custom ID field
            pagination={false} 
            pageSize={rowsPerPage} 
            hideFooterPagination={true} 
            disableSelectionOnClick 
            sx={{
              '& .MuiDataGrid-root': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' }, 
              },
           
              ' [class^=MuiDataGrid]': { border: 'none' },
              '& .MuiDataGrid-columnHeader': {
                fontWeight: 'bold !impotant', 
                fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' }, 
                color: 'black', 
               
                 '&:focus': {
                outline: 'none', 
                border: 'none',  
              },
                backgroundColor: '#e3e6ea !important', 
                minHeight: '60px', 
              },
               '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none', 
        },
       
             
           
              
        
        '& .MuiDataGrid-columnSeparator': {
          color: 'blue',
          visibility: 'visible', 
        },
        
      
        '& .MuiDataGrid-cell': {
          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' }, 
          
        },
        
        '& .MuiDataGrid-cellContent': {
          display: 'flex',
          alignItems: 'center', 
        },
        '& .MuiDataGrid-cell': {
          minHeight: '2.5rem', 
        },
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
                
                
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
      </Card>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
    </div>
  );
};

export default AllJobData;
