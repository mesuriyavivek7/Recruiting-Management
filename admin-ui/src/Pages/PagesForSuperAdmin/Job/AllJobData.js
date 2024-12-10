import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TextField, Button, Box, IconButton, CircularProgress, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { columns } from './RowColDataOfAll';
import {
  fetchAccountManager,
  fetchJobBasicDetailsByJobId,
  fetchJobDetailsById,
  fetchRecruiterByEId,
  getAllVerifiedJobsSuperAdmin
} from '../../../services/api';

const AllJobData = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const { id } = params;
    const job_id = params?.row?.job_id;
    navigate(`/super_admin/job/${id}`, { state: { job_id } });
  };

  const handleFilterClick = (status) => setFilterStatus(status);

  const fetchAllJobData = async () => {
    setLoading(true);
    try {
      const jobIds = await getAllVerifiedJobsSuperAdmin();
      const response = await Promise.all(
        jobIds.data.map(async (jobId, index) => {
          const jobs = await fetchJobDetailsById(jobId);
          const jobDetails = await fetchJobBasicDetailsByJobId(jobs.job_id);
          const recruiter = await fetchRecruiterByEId(jobs.enterprise_id);
          const account_manager = await fetchAccountManager(jobs.alloted_account_manager);

          return {
            _id: String(index + 1),
            job_title: jobDetails?.job_title || 'No Title Available',
            job_id: jobs?.job_id || 'No ID Available',
            recruiter: recruiter || 'Unknown Recruiter',
            location: {
              state: jobDetails?.state || 'Unknown State',
              country: jobDetails?.country || 'Unknown Country',
            },
            experience: {
              minexp: jobDetails?.experience?.minexp || 'N/A',
              maxexp: jobDetails?.experience?.maxexp || 'N/A',
            },
            job_status: jobs?.job_status,
            createdAt: jobs?.createdAt,
            lastUpdated: jobs?.updatedAt,
            account_manager: account_manager?.full_name || 'Unknown',
          };
        })
      );
      setRows(response);
      setFilteredRows(response);
    } catch (error) {
      console.error('Error fetching all jobs: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobData();
  }, []);

  useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.job_title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.job_status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, filterStatus, rows]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '600px',
            '& .MuiOutlinedInput-root': {
              padding: 0,
              '& input': { height: '30px', padding: '8px' },
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#315370' },
              '&.Mui-focused fieldset': { borderColor: '#315370' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
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
              variant={filterStatus === status ? 'contained' : ''}
              onClick={() => handleFilterClick(status)}
              sx={{
                backgroundColor: filterStatus === status ? '#315370' : '#e0e0e0',
                color: filterStatus === status ? 'white' : 'gray',
                fontSize: '16px',
                height: '45px',
                textTransform: 'none',
                width: '120px',
                border: '1px solid gray',
                borderRadius: status === 'All' ? '20px 0 0 20px' : status === 'Pending' ? '0 20px 20px 0' : '0',
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
        <Card className="font-sans">
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              rowHeight={80}
              onRowClick={handleRowClick}
              getRowId={(row) => row._id}
              pageSize={8}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
                },
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                  backgroundColor: '#e3e6ea !important',
                },
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
                },
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AllJobData;
