

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, InputAdornment, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns ,rows} from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';


const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const AllCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
;
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRows, setFilteredRows] = useState(rows);
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
  //const getcolumns = columns(handleCandidateClick);



  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/account_manager/candidate/${id}`);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page, rowsPerPage]);

  useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, filterStatus]);
  // Calculate the rows to display
  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>

<Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} pt={4}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '600px',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              padding: '0',
              '& input': {
                height: '30px',
                padding: '8px',
              },
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#315370' },
              '&.Mui-focused fieldset': { borderColor: '#315370' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm(searchTerm)}>
                  <FaSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" gap={0}>
          {['All', 'Active', 'Pending'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'contained' : 'outlined'}
              onClick={() => setFilterStatus(status)}
              sx={{
                backgroundColor: filterStatus === status ? '#315370' : '#e0e0e0',
                color: filterStatus === status ? 'white' : 'gray',
                fontSize: '16px',
                height: '45px',
                textTransform: 'none',
                width: '120px',
                border: '1px solid gray',
                borderRadius:
                  status === 'All' ? '20px 0 0 20px' :
                    status === 'Pending' ? '0 20px 20px 0' : '0',
                '&:hover': {
                  backgroundColor: filterStatus === status ? '#315380' : '#e0e0e0',
                },
              }}
            >
              {status}
            </Button>
          ))}
        </Box>

      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>All Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
          rows={paginatedRows}
          columns={columns}
          rowHeight={80} 
          onRowClick={(params) => handleRowClick(params.id)}
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
         
          pageSize={rowsPerPage} 
          onCellClick={handleCellClick} // Handle cell click events
          
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10} },
          }} 
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
      </Card>)}
      
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
