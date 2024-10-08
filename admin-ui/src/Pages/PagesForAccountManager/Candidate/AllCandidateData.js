

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, Dialog, DialogActions, DialogTitle, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns ,rows} from './RowColDataOfAll'; // Import columns configuration


const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const AllCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Function to handle candidate click
  const handleCandidateClick = (params) => {
    setSelectedCandidate(params.row);
    setDialogOpen(true); // Open the action dialog
  };

  // Handle Accept action
  const handleAccept = () => {
    console.log('Accepted candidate:', selectedCandidate);
    // Add logic to verify the candidate
    setDialogOpen(false); // Close dialog after acceptance
    setSelectedCandidate(null);
  };

  // Handle Reject action - open the reason dialog
  const handleReject = () => {
    setDialogOpen(false); // Close the first dialog
    setReasonDialogOpen(true); // Open the reason dialog
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCandidate(null);
  };

  // Handle reason dialog close
  const handleReasonDialogClose = () => {
    setReasonDialogOpen(false);
    setRejectionReason('');
  };

  // Handle submitting rejection reason
  const handleSubmitRejection = () => {
    console.log('Rejected candidate:', selectedCandidate, 'Reason:', rejectionReason);
    // Add logic to handle rejection
    setReasonDialogOpen(false); // Close the reason dialog
    setSelectedCandidate(null);
    setRejectionReason('');
  };

  const handleCellClick = (params, event) => {
    if (params.field === 'candidate_name') {
      event.stopPropagation(); // Prevent the row click event
      handleCandidateClick(params); // Call the candidate click handler
    }
  };
 

  // Get the columns with the handleCandidateClick function passed as an argument
  const getcolumns = columns(handleCandidateClick);



  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/account_manager/candidate/${id}`);
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

  return (
    <div>
      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>All Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
          rows={paginatedRows}
          columns={getcolumns}
          rowHeight={80} 
          onRowClick={(params) => handleRowClick(params.id)}
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
          pagination={false} 
          pageSize={rowsPerPage} 
          onCellClick={handleCellClick} // Handle cell click events
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
        {/* Initial Dialog for Candidate Action */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Candidate Action</DialogTitle>
        <div style={{ padding: '16px' }}>
          <p>What would you like to do with {selectedCandidate ? selectedCandidate.candidate_name : ''}?</p>
        </div>
        <DialogActions>
          <Button onClick={handleAccept} color="primary">Accept</Button>
          <Button onClick={handleReject} color="secondary">Reject</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Rejection Reason */}
      <Dialog open={reasonDialogOpen} onClose={handleReasonDialogClose}>
        <DialogTitle>Rejection Reason</DialogTitle>
        <div style={{ padding: '16px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>
        <DialogActions>
          <Button onClick={handleReasonDialogClose}>Cancel</Button>
          <Button onClick={handleSubmitRejection} disabled={!rejectionReason}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCandidateData;
