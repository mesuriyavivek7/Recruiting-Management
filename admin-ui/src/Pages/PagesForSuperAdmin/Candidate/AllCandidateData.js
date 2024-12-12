import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll';
import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchAccountManager, getAllVerifiedCandidatesSuperAdmin, fetchRecruiterMemberDetails } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import Notification from '../../../Components/Notification';
import { FaSearch } from 'react-icons/fa';

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

const AllCandidateData = () => {
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/super_admin/candidate/${params._id}`, { state: { candidate_id: params.orgcandidateid } });
  };
  const [loader, setLoader] = useState(false)

  const [notification, setNotification] = useState(null)

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRows, setFilteredRows] = useState([]);



  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }


  const fetchAllCandidateData = async () => {
    setLoader(true)
    try {
      const candidateIds = await getAllVerifiedCandidatesSuperAdmin();
      const rows = await Promise.all(
        candidateIds.data.map(async (candidateId, index) => {
          const candidateDetails = await fetchCandidateBasicDetailsById(candidateId);
          const basic_details = candidateDetails.basic_details;

          const c_id = basic_details.candidate_id;
          const candidate = await fetchCandidateStatusById(c_id);
          const job_basic_details = await fetchJobBasicDetailsByJobId(candidate.job_id);

          const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
          const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey;

          //Fetch Account manager details
          const acmanager = await fetchAccountManager(candidate.alloted_account_manager)

          //Get Recruiter member details
          const recruiter_name = await fetchRecruiterMemberDetails(candidate.recruiter_member_id)

          return {
            orgcandidateid: candidate._id,
            _id: String(index + 1),
            candidate_name: {
              first_name: basic_details?.first_name || 'No First Name',
              last_name: basic_details?.last_name || 'No Last Name',
            },
            job_title: job_basic_details?.job_title || "No Job Title",
            job_id: job_basic_details?.job_id || "No Job Id",
            candidate_status: candidateStatus,
            submitted: basic_details?.createdAt || "No Submission Date",
            lastUpdated: basic_details?.updatedAt || "No Update Date",
            notice_period: basic_details?.notice_period || "N/A",
            email: basic_details?.primary_email_id || "No Email",
            mobile: basic_details?.primary_contact_number || "No Contact Number",
            recruiter_member: recruiter_name.full_name || "No Recruiter",
            acmanager: acmanager.full_name || "No Acmanager"
          };
        })
      );
      const newFilteredRows = rows.filter((row) => {
        const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || cstatus.get(row.candidate_status) === filterStatus;
        return matchesSearch && matchesStatus;
      });
      setFilteredRows(newFilteredRows);
    } catch (error) {
      showNotification("Something went wrong while fetching data.", 'failure')
      console.error("Error fetching candidate details: ", error);
    } finally {
      setLoader(false)
    }

  };

  useEffect(() => {
    fetchAllCandidateData();
  }, [searchTerm, filterStatus]);

  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} >
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
          {['All', 'Offer Accepted'].map((status) => (
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
                width: status === "Offer Accepted" ? '180px' : "150px",
                border: '1px solid gray',
                borderRadius:
                  status === 'All' ? '20px 0 0 20px' :
                    status === 'Offer Accepted' ? '0 20px 20px 0' : '0',
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
      <Card className='font-sans'>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.row)}
            getRowId={(row) => row._id} // Specify the custom ID field
            getRowHeight={calculateRowHeight}
            loading={loader}
            pageSize={8}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
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
      </Card>
    </div>
  );
};

export default AllCandidateData;