
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns, rows } from './RowColOfEnterpriseTeam'; // Import columns configuration

import { FaPhone, FaEnvelope, FaUserCheck, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'; // Import React Icons
const calculateRowHeight = (params) => {
  return Math.max(80);
};

const EnterpriseTeam = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    setSelectedRow(row); 
    setDialogOpen(true); 
  };

 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


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
    
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}
      >
        <Typography variant="h5" fontWeight="bold">
          Team Page
        </Typography>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#315370', 
            color: 'white', 
            fontSize: '18px',
            textTransform: 'none', 
            '&:hover': {
              backgroundColor: '#26425a', 
            },
          }}
          onClick={() => navigate('/master_admin/add_team')}
        >
          + Add Member
        </Button>
      </Box>

      {/* Card with DataGrid */}
      <Card className="mt-9 font-sans px-6">
        <div style={{ height: 600, width: '100%' }} className="pt-4">
          <DataGrid
            rows={paginatedRows}
            columns={columns}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.row)} // Pass the whole row object
            getRowId={(row) => row._id} // Specify the custom ID field
            getRowHeight={calculateRowHeight}
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
                fontWeight: 'bold !important',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                color: 'black',
                backgroundColor: '#e3e6ea !important',
                minHeight: '60px',
              },
              '& .MuiDataGrid-columnSeparator': {
                color: 'blue',
                visibility: 'visible',
              },
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
                minHeight: '2.5rem',
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
    
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{selectedRow.en_name}</h2>
              <p className="text-gray-500">Member Information</p>
            </div>

            {/* Professional details container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Created At */}
              <div className="flex items-center text-gray-700">
                <FaCalendarAlt className="mr-2 text-blue-600 text-xl" />
                <div>
                  <span className="block font-medium">Created At</span>
                  <span>{new Date(selectedRow.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center text-gray-700">
                <FaUserCheck className="mr-2 text-green-600 text-xl" />
                <div>
                  <span className="block font-medium">Role</span>
                  <span>{selectedRow.account_role}</span>
                </div>
              </div>

              {/* Posted Jobs */}
              <div className="flex items-center text-gray-700">
                <FaBriefcase className="mr-2 text-orange-600 text-xl" />
                <div>
                  <span className="block font-medium">Posted Jobs</span>
                  <span>{selectedRow.pending_job + selectedRow.active_job}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center text-gray-700">
                <FaPhone className="mr-2 text-purple-600 text-xl" />
                <div>
                  <span className="block font-medium">Phone</span>
                  <span>{selectedRow.phone}</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="mr-2 text-red-600 text-xl" />
                <div>
                  <span className="block font-medium">Email</span>
                  <span>{selectedRow.email}</span>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-center text-gray-700">
                <span className="font-medium text-gray-600">Account Status:</span>
                <span
                  className={`ml-2 font-semibold ${
                    selectedRow.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {selectedRow.status}
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
          className="bg-gray-600 hover:bg-blue-230 text-white px-4 py-2 rounded-md transition-all duration-200"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>


    </div>
    </Card>

  );
};

export default EnterpriseTeam;
