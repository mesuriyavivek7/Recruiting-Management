
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination, Tabs, Tab, Button, TextField, Divider, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaShareAlt, FaUsers, FaStar } from 'react-icons/fa'; 
import { columns, rows } from './RowColOfEnterpriseJob'; 

const EnterpriseJob = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [activeTab, setActiveTab] = useState(0); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    const job = rows.find(row => row._id === id);
    setSelectedJob(job);
    setDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); 
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Calculate the rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='mt-4 font-sans shadow-md' sx={{
        borderRadius: '8px',
        boxShadow: 3,
      }}>
        <div className='px-6'>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}
          >
            <Typography variant="h5" fontWeight="bold">
              Post a Job
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#315370', 
                fontSize: '18px',
                color: 'white', 
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: '#26425a',
                },
              }}
              onClick={() => navigate('/master_admin/add_team')}
            >
              Post a new Job
            </Button>
          </Box>

          {/* Tabs for Post Job and Drafts */}
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            className='my-4' 
            indicatorColor="primary"
            textColor="primary"
            sx={{
              textTransform: 'none',
              '& .MuiTab-root': {
                color: 'black',
                fontWeight: 'bold',
              },
              '& .Mui-selected': {
                color: '#1976d2',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <Tab label={`Post Job (10)`} sx={{ textTransform: 'none', fontSize: '17px' }} />
            <Tab label={`Drafts (5)`} sx={{ textTransform: 'none', fontSize: '17px' }} />
          </Tabs>

          {/* Search Field */}
          <TextField 
            variant='outlined' 
            placeholder='Search Job...' 
            fullWidth 
            className='my-4' 
          />

          {/* DataGrid Section */}
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid 
              rows={paginatedRows}
              columns={columns}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params.id)}
              getRowId={(row) => row._id}
              pagination={false} 
              pageSize={rowsPerPage} 
              hideFooterPagination={true} 
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

      {/* Job Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
             
              <Typography variant="h5" fontWeight="bold">{selectedJob ? selectedJob.job_title : 'Job Title'}</Typography>
              <Typography variant="h6" color="textSecondary" sx={{ marginLeft: '8px' }}>9898</Typography>
              <FaUsers style={{ marginRight: '8px' }} />
              <FaShareAlt style={{ marginLeft: 'auto', cursor: 'pointer', color: '#315370' }} />
            </Box>
            <Button variant="outlined" sx={{ color: '#315370', borderColor: '#315370' }}>
              <FaStar style={{ marginRight: '4px' }} />
              Mark as Hot Job
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
          <Typography variant="h6" fontWeight="bold">Job Details</Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <Typography variant="body1"><strong>Created On:</strong> {selectedJob ? new Date(selectedJob.createdAt).toLocaleDateString() : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Posted By:</strong> {selectedJob ? selectedJob.postedBy : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Status:</strong> {selectedJob ? selectedJob.status : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {selectedJob ? selectedJob.location : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Experience:</strong> {selectedJob ? selectedJob.experience : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Payment Terms:</strong> {selectedJob ? selectedJob.paymentTerms : 'N/A'}</Typography>
          <Typography variant="body1"><strong>Competition Details:</strong> {selectedJob ? selectedJob.competitionDetails : 'N/A'}</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
          <Button onClick={handleCloseDialog}    sx={{
            color: 'white',
            backgroundColor: '#315370',
            '&:hover': {
              color:'#315370',
              backgroundColor: '#e3e6ea',
            },
            borderRadius: '5px', 
            padding: '8px 16px', 
            fontSize: '16px', 
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnterpriseJob;
