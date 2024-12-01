import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll';
import { FaSearch } from 'react-icons/fa';
import { fetchVerifiedJobsByAdminId, fetchAccountManager, fetchJobBasicDetailsByJobId, fetchEnterpriseMemberDetails, fetchJobDetailsById } from '../../../services/api';
import { store } from '../../../State/Store';

import Notification from '../../../Components/Notification';

const calculateRowHeight = () => Math.max(80);

const AdminAllJobData = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());

  const navigate = useNavigate();

  const handleRowClick = async (params) => {
    const id = params.id;
    const job_id = params?.row?.job_id;
    console.log(params);
    navigate(`/master_admin/job/${id}`, { state: { job_id: job_id } });
  };

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Filter rows based on searchTerm and filterStatus
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        //Fetching jobs id which is verified by account manager
        const verifiedJobsIds = await fetchVerifiedJobsByAdminId(userData?._id);

        const rows = await Promise.all(verifiedJobsIds.map(async (jobId, index) => {
          //Fetching more details about jobs
          const jobDetails = await fetchJobDetailsById(jobId);

          //Fetching account manager details
          const accountManager = await fetchAccountManager(jobDetails?.alloted_account_manager);

          //Fetching details of enterprise member
          const enterpriseMember = await fetchEnterpriseMemberDetails(jobDetails.enterprise_member_id)

          //Fetching job basinc details
          const basicjobDetails = await fetchJobBasicDetailsByJobId(jobDetails.job_id);

          return {
            _id: String(`${index + 1}`),
            job_title: basicjobDetails?.job_title || "No Title Available",
            job_id: jobDetails?.job_id || "No ID Available",
            enterprise_member: enterpriseMember.full_name || "Unknown Recruiter",
            location: {
              state: basicjobDetails?.state || 'Unknown State',
              country: basicjobDetails?.country || 'Unknown Country',
            },
            experience: {
              minexp: basicjobDetails?.experience?.minexp || 'N/A',
              maxexp: basicjobDetails?.experience?.maxexp || 'N/A',
            },
            job_status: jobDetails.job_status,
            account_manager: accountManager ? `${accountManager.full_name}` : null,
            createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
            lastUpdated: jobDetails?.updatedAt ? new Date(jobDetails.updatedAt) : new Date()
          };
        })
        );

        const filteredRows = rows.filter((job) => {
          const matchesSearch = job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch
        })

        setFilteredRows(filteredRows)

      } catch (err) {
        showNotification("Something went wrong while fetching data", 'failure')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchTerm]);



  return (
    <div>
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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

      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className='mt-6 p-2 shadow border font-sans'>
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params)}
              getRowId={(row) => row._id}
              getRowHeight={calculateRowHeight}

              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
              pageSizeOptions={[5, 10]}
              pagination
              autoPageSize

              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
                },
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold !important',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                  color: 'black',
                  backgroundColor: '#e3e6ea !important',
                },
                '& .MuiDataGrid-columnSeparator': { color: 'blue', visibility: 'visible' },
                '& .MuiDataGrid-cell': { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' } },
                '& .MuiDataGrid-row': { borderBottom: 'none' },
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminAllJobData;
