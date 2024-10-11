
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, Dialog, DialogActions, DialogTitle, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { columns } from './RowColDataOfAll';

const AllCandidateData = () => {
  const [rows, setRows] = useState([]); // State to hold candidate data
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState([]);

 
  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/candidate/');
      setRows(response.data); 
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);


  const handleCandidateClick = (params) => {
    setSelectedCandidate(params.row);
    setDialogOpen(true);
  };

  const handleAccept = async () => {
    const payload = {
      candidateId: selectedCandidate.candidate_id,
      accepted: true,
      
    };

    try {
      const response = await axios.post('http://localhost:8000/api/accountmanager/verifycandidate', payload);
      alert(response.data.message);
      setDialogOpen(false);
      fetchCandidates();
     
    } catch (error) {
      console.error('Error updating candidate status:', error);
      alert('Error updating candidate status.');
    }
  };

 
  const handleReject = () => {
   
    setReasonDialogOpen(true);
  };

  
  const handleSubmitRejection = () => {
   
    const payload = {
      candidateId: selectedCandidate.candidate_id,  
      accepted: false,
      rejectionReason: rejectionReason, 
    };
  
    axios.post('http://localhost:8000/api/accountmanager/verifycandidate', payload)
      .then((response) => {
        console.log('Candidate Rejected:', response.data);
        alert(response.data.message);
        setDialogOpen(false); 
        setReasonDialogOpen(false);
        fetchCandidates(); 
      })
      .catch((error) => {
        console.error('Error rejecting candidate:', error);
        alert('Error rejecting candidate.');
      });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCandidate(null);
  };

  const handleReasonDialogClose = () => {
    setReasonDialogOpen(false);
    setRejectionReason('');
  };

  
  const handleRowClick = (id) => {
    navigate(`/account_manager/candidate/${id}`);
  };

  
  const handleCellClick = (params, event) => {
    if (params.field === 'candidate_name') {
      event.stopPropagation();
      handleCandidateClick(params);
    }
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>All Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
          <DataGrid
            rows={paginatedRows}
            columns={columns(handleCandidateClick)}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.id)}
            getRowId={(row) => row._id} // Specify the custom ID field
            onCellClick={handleCellClick}
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
      {/* <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Candidate Action</DialogTitle>
        <div style={{ padding: '16px' }}>
          <p>What would you like to do with {selectedCandidate ? selectedCandidate.candidate_name : ''}?</p>
        </div>
        <DialogActions>
          <Button onClick={handleAccept} sx={{ backgroundColor: '#315370', color: 'white' }}>Accept</Button>
          <Button onClick={handleReject} sx={{ backgroundColor: '#315370', color: 'white' }}>Reject</Button>
        </DialogActions>
      </Dialog> */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <div className='bg-blue-120'>
        <DialogTitle sx={{
    fontSize:'25px'
  }} >Candidate Action</DialogTitle>
        </div>

  <div style={{ padding: '16px' }}>
    

    {/* Show candidate details if available */}
    {selectedCandidate && (
      <div style={{ marginTop: '16px' }}>
         <p className='lg:text-md  text-xl p-2'><strong>ID:</strong> {selectedCandidate._id}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Candidate Name:</strong> {selectedCandidate.candidate_basic_details.first_name+" " +selectedCandidate.candidate_basic_details.last_name}</p>
        <p className='lg:text-md  text-xl p-2'><strong>UpHire Job ID:</strong> {selectedCandidate.job_id}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Candidate Status:</strong> {selectedCandidate.candidate_status}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Submitted:</strong> {selectedCandidate?.submitted}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Last Update:</strong> {selectedCandidate.candidate_basic_details.updatedAt}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Notice Period:</strong> {selectedCandidate.candidate_basic_details.notice_period}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Email:</strong> {selectedCandidate.candidate_basic_details.primary_email_id}</p>
        <p className='lg:text-md  text-xl p-2'><strong>Phone:</strong> {selectedCandidate.candidate_basic_details.primary_contact_number}</p>

        {/* Add more fields as needed */}
      </div>
    )}
  </div>
  <DialogActions>
          <Button onClick={handleAccept} sx={{ backgroundColor: '#315370', color: 'white',":hover":{
            backgroundColor:'#315370'
          } }}>Accept</Button>
          <Button onClick={handleReject} sx={{ backgroundColor: '#315370', color: 'white',":hover":{
            backgroundColor:'#315370'} }}>Reject</Button>
        </DialogActions>
</Dialog>


      {/* Dialog for Rejection Reason */}
      <Dialog open={reasonDialogOpen} onClose={handleReasonDialogClose} fullWidth maxWidth="sm">
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
          <Button onClick={handleReasonDialogClose} sx={{ backgroundColor: '#315370', color: 'white',":hover":{
            backgroundColor:'#315370'} }}>Cancel</Button>
          <Button onClick={handleSubmitRejection} disabled={!rejectionReason} sx={{ backgroundColor: '#315370', color: 'white',":hover":{
            backgroundColor:'#315370'} }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCandidateData;
