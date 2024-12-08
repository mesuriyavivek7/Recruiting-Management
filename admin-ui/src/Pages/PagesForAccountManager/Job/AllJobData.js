import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CircularProgress, IconButton, InputAdornment, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';
import { fetchJobBasicDetailsByJobId, fetchJobDetailsById, fetchEnterpriseMemberDetails, fetchVerifiedJobsByACManagerId } from '../../../services/api';
import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';

const AllJobData = () => {

  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRows, setFilteredRows] = useState([]);

  const [notification, setNotification] = useState(null)

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const handleRowClick = async (params) => {
    const id = params.id;
    const job_id = params?.row?.job_id;
    navigate(`/account_manager/jobs/${id}`, { state: { job_id: job_id } });
  };

  const handleFilterClick = (status) => setFilterStatus(status);

  // Filter rows based on searchTerm and filterStatus
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        //Fetching verified job ids
        const verifiedJobsIds = await fetchVerifiedJobsByACManagerId(userData?._id);

        const rows = await Promise.all(
          verifiedJobsIds.map(async (jobId, index) => {
            //Fetch job deatils
            const jobDetails = await fetchJobDetailsById(jobId);

            //Fetch enterprise details
            const enterprise_member = await fetchEnterpriseMemberDetails(jobDetails.enterprise_member_id)

            //Fetch job basic details
            const basicjobDetails = await fetchJobBasicDetailsByJobId(jobDetails.job_id);

            return {
              _id: String(`${index + 1}`),
              job_title: basicjobDetails?.job_title || "No Title Available",
              job_id: jobDetails?.job_id || "No ID Available",
              enterprise_member: enterprise_member.full_name || "Unknown Recruiter",
              location: {
                state: basicjobDetails?.state || 'Unknown State',
                country: basicjobDetails?.country || 'Unknown Country',
              },
              experience: {
                minexp: basicjobDetails?.experience?.minexp || 'N/A',
                maxexp: basicjobDetails?.experience?.maxexp || 'N/A',
              },
              job_status: jobDetails.job_status,
              createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
              lastUpdated: jobDetails?.updatedAt ? new Date(jobDetails.updatedAt) : new Date()
            };
          })
        );

        const newFilteredRows = rows.filter((row) => {
          const matchesSearch = row.job_title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = filterStatus === 'All' || row.job_status === filterStatus;
          return matchesSearch && matchesStatus;
        });

        setFilteredRows(newFilteredRows);

      } catch (err) {
        console.log(err)
        showNotification("Something went wrong while fetching data", 'failure')
      } finally {
        setLoading(false)
      }
    }

    fetchData();

  }, [searchTerm, filterStatus]);

  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
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
        <Card className='mt-9 font-sans'>
          <p className='text-lg xl:text-2xl'>All Jobs</p>
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params)}
              getRowId={(row) => row.job_id} // Specify the custom ID field
              pageSize={8}
              loading={loading}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
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
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
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

    </div>
  );
};

export default AllJobData;
