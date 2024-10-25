
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RcTeamCols,RcTeamrows } from './RowColData'; // Import columns configuration

import { FaPhone, FaEnvelope, FaUserCheck, FaBriefcase, FaCalendarAlt, FaUsers } from 'react-icons/fa'; // Import React Icons
const calculateRowHeight = (params) => {
  return Math.max(80);
};

const AdminRcTeam = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); // Loader state

  const handleRowClick = (row) => {
    setSelectedRow(row); 
    setDialogOpen(true); 
  };

 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  React.useEffect(() => {
    // Simulate data fetching with a loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after data is "fetched"
    }, 1000); // Simulate 1 second loading time
  }, [RcTeamrows, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const paginatedRows = RcTeamrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  return (
    <Card className='mt-4 font-sans shadow-md'  sx={{
      
      borderRadius: '8px', 
      boxShadow: 3, 
    }}>
    <div>
    
  

      {/* Card with DataGrid */}
      <div className="py-5 px-6">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 ,color:'#315370'}}>
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ height: 600, width: '100%' }} className="pt-4">
          <DataGrid
            rows={paginatedRows}
            columns={RcTeamCols}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.row)} // Pass the whole row object
            getRowId={(row) => row.id} // Specify the custom ID field
            getRowHeight={calculateRowHeight}
           // pagination={false}
            pageSize={rowsPerPage}
           // hideFooterPagination={true}
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
        </div>)}
      </div>

    
     
      

      <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth 
      maxWidth="md" 
    >
   
      <DialogTitle className="bg-gray-600 text-white text-lg font-bold">
        Member Details
      </DialogTitle>

      
      <DialogContent className="bg-gray-50">
  {selectedRow && (
    <div className="bg-white shadow-md rounded-lg p-6 my-8">
      {/* Member Information */}
      <div className="text-center mb-8">
        <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">
          {selectedRow.full_name || 'Full Name Not Available'}
        </h2>
        <p className="text-gray-500 pt-3">Member Information</p>
      </div>

      {/* Professional details container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mobile Number */}
        <div className="flex items-center text-gray-700">
          <FaPhone className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Phone:</span>
            <span>{selectedRow.mobile_no || 'Phone Not Available'}</span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center text-gray-700">
          <FaEnvelope className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Email:</span>
            <span>{selectedRow.email || 'Email Not Available'}</span>
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center text-gray-700">
          <FaUserCheck className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Role:</span>
            <span>{selectedRow.isAdmin === "Unknown" ? 'Role Not Available' : selectedRow.isAdmin ? 'Admin' : 'User'}</span>
          </div>
        </div>

        {/* Mapped Jobs */}
        <div className="flex items-center text-gray-700">
          <FaBriefcase className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Mapped Jobs:</span>
            <span>
              {selectedRow.mapped_jobs !== "Unknown"
                ? selectedRow.mapped_jobs.map((job, idx) => (
                    <span key={idx} className="block">{job.jobTitle || "Job title not available"}</span>
                  ))
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Accepted Jobs */}
        <div className="flex items-center text-gray-700">
          <FaBriefcase className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Accepted Jobs:</span>
            <span>
              {selectedRow.accepted_jobs !== "Unknown"
                ? selectedRow.accepted_jobs.map((job, idx) => (
                    <span key={idx} className="block">{job.jobTitle || "Job title not available"}</span>
                  ))
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Submitted Candidate Profiles */}
        <div className="flex items-center text-gray-700">
      
        <FaUsers className="mr-2 text-black text-xl xl:text-2xl" />
          <div className="flex gap-2 text-xl">
            <span className="block font-medium">Submitted Candidate Profiles:</span>
            <span>
              {selectedRow.submited_candidate_profile !== "Unknown"
                ? selectedRow.submited_candidate_profile.map((profile, idx) => (
                    <span key={idx} className="block">{profile.name || "Profile name not available"}</span>
                  ))
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Account Status */}
        <div className="flex items-center text-gray-700 text-xl">
          <span className="font-medium text-gray-600">Is Admin:</span>
          <span
            className={`ml-2 font-semibold ${
              selectedRow.status === 'yes' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {selectedRow.status || ' Not Available'}
          </span>
        </div>
      </div>
    </div>
  )}
</DialogContent>


      {/* Dialog Actions */}
      <DialogActions className="bg-gray-100 px-6 py-6">
        <button
          onClick={handleClose}
          className="bg-gray-600 hover:bg-blue-230 text-white px-4 py-2 text-xl rounded-md transition-all duration-200"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>


    </div>
    </Card>

  );
};

export default AdminRcTeam;