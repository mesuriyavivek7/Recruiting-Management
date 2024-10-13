
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
    setSelectedRow(row); // Store the selected row details
    setDialogOpen(true); // Open the dialog
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Close the dialog
  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  return (
    <Card className='mt-4 font-sans shadow-md'  sx={{
      // Change to your desired border color
      borderRadius: '8px', // Optional: adjust border radius
      boxShadow: 3, // Optional: increase shadow intensity
    }}>
    <div>
      {/* Header Component */}
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
            backgroundColor: '#315370', // Custom background color
            color: 'white', 
            fontSize: '18px',
            textTransform: 'none', // Text color
            '&:hover': {
              backgroundColor: '#26425a', // Darker shade on hover
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

      {/* Pagination Component */}
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

      {/* Dialog to show selected row details */}
      

      <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth // Makes the dialog take the full width of the screen
      maxWidth="md" // Adjust the max width as needed
    >
      <DialogTitle className="bg-gray-400 text-white">
        Member Details
      </DialogTitle>
      <DialogContent>
        {selectedRow && (
          <div className="space-y-4 pt-4"> {/* Adds space between elements */}
          <Typography variant="h6" className="flex items-center">
             
              Name: {selectedRow.en_name}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <FaCalendarAlt className="mr-2 text-blue-600  text-xl" />
              Created At: {new Date(selectedRow.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <FaUserCheck className="mr-2 text-green-600  text-xl" />
              Role: {selectedRow.account_role}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <FaBriefcase className="mr-2 text-orange-600  text-xl " />
              Posted Jobs: {selectedRow.pending_job + selectedRow.active_job}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <FaPhone className="mr-2 text-purple-600  text-xl" />
              Phone: {selectedRow.phone}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <FaEnvelope className="mr-2 text-red-600  text-xl" />
              Email: {selectedRow.email}
            </Typography>
            <Typography variant="body1" className="flex items-center  text-xl">
              <span className="text-gray-600  text-xl">Account Status:</span>
              <span className={`ml-1 text-xl ${selectedRow.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {selectedRow.status}
              </span>
            </Typography>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: 'white',
            backgroundColor: '#315370',
            '&:hover': {
              color:'#315370',
              backgroundColor: '#e3e6ea',
            },
            borderRadius: '5px', 
            padding: '8px 16px', 
            fontSize: '16px', 
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </div>
    </Card>

  );
};

export default EnterpriseTeam;
