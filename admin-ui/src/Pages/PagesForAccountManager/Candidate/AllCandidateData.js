import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, IconButton, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';
import { store } from '../../../State/Store';
import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchVerifiedCandidatesByACManagerId, fetchRecruiterMemberDetails } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import axios from 'axios'
import Notification from '../../../Components/Notification';
import WhiteLoader from '../../../assets/whiteloader.svg'

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};
const AllCandidateData = () => {
  const navigate = useNavigate();

  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());

  const [loading, setLoading] = useState(false);
  const [candidateStatusLoader, setCandidateStatusLoader] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRows, setFilteredRows] = useState([]);

  const [notification, setNotification] = useState(null)

  // Successfully Joined popup states
  const [showSuccessJoinedPopup, setShowSuccessJoinedPopup] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [successJoinedFormData, setSuccessJoinedFormData] = useState({
    designation: '',
    jobLocation: '',
    offerCtc: '',
    billingType: '',
    joiningDate: ''
  });

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const handleRowClick = (params) => {
    navigate(`/account_manager/candidate/${params._id}`, { state: { candidate_id: params.orgcandidateid } });
  };


  const fetchData = async () => {
    try {
      setLoading(true)
      //Fetch verified candidate ids
      const verifiedCandiatesIds = await fetchVerifiedCandidatesByACManagerId(userData._id);

      const rows = await Promise.all(verifiedCandiatesIds.map(async (candidateId, index) => {

        const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
        const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
        const candidate = await fetchCandidateStatusById(basic_details.candidate_id)

        // Get candidate status, defaulting to "Status Unavailable" if not found

        const candidateStatus = candidate.candidate_status || "Status Unavailable"; // Map status or use original


        const recruiter_member = await fetchRecruiterMemberDetails(candidate.recruiter_member_id)

        return {
          orgcandidateid: candidate._id,
          candidate_id: basic_details.candidate_id,
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
          recruiter_member: recruiter_member.full_name || "No Recruiter member"
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

    } catch (err) {
      console.log(err)
      showNotification("Something went wrong while fetching candidate data.", 'failure')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm, filterStatus]);

  const candiadteStatusChange = async (e, id) => {
    const selectedStatus = e.target.value;
    
    // If status is success-joined, show popup instead of making API call
    if (selectedStatus === 'success-joined') {
      setSelectedCandidateId(id);
      setShowSuccessJoinedPopup(true);
      return;
    }

    try {
      setCandidateStatusLoader(true)
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/changecandidatestatus/${id}`, { status: selectedStatus })
      await fetchData()
      showNotification("Successfully candidate status changed.", 'success')
    } catch (err) {
      setCandidateStatusLoader(false)
      showNotification("Something wrong while changeing candidate status.", "failure")
      console.log(err)
    }
    setCandidateStatusLoader(false)
  }

  const handleSuccessfullyJoined = async () => {
    try {
      setCandidateStatusLoader(true);
      
      // First update the candidate status
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/changecandidatestatus/${selectedCandidateId}`, { 
        status: 'success-joined',
        ...successJoinedFormData 
      });
      
      // Refresh data
      await fetchData();
      
      // Close popup and reset form
      setShowSuccessJoinedPopup(false);
      setSuccessJoinedFormData({
        designation: '',
        jobLocation: '',
        offerCtc: '',
        billingType: '',
        joiningDate: ''
      });
      setSelectedCandidateId(null);
      
      showNotification("Successfully candidate status changed and details saved.", 'success');
    } catch (err) {
      setCandidateStatusLoader(false);
      showNotification("Something wrong while changing candidate status.", "failure");
      console.log(err);
    }
    setCandidateStatusLoader(false);
  };

  const handleFormInputChange = (field, value) => {
    setSuccessJoinedFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClosePopup = () => {
    setShowSuccessJoinedPopup(false);
    setSuccessJoinedFormData({
      designation: '',
      jobLocation: '',
      offerCtc: '',
      billingType: '',
      joiningDate: ''
    });
    setSelectedCandidateId(null);
  };


  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
      {
        candidateStatusLoader &&
        <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update resume status.</p>
          </div>
        </div>
      }
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

        <Card className='mt-8 border p-2 font-sans'>
          <p className='text-lg xl:text-2xl'>All Candidates</p>
          <div style={{ height: 600, width: '100%' }} className='pt-4'>

            <DataGrid
              rows={filteredRows}
              columns={columns(candiadteStatusChange, handleRowClick)}
              rowHeight={80}
              getRowId={(row) => row._id} // Specify the custom ID field
              getRowHeight={calculateRowHeight}
              pageSize={8}
              loading={loading}
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

        {/* Successfully Joined Popup */}
        <Dialog 
          open={showSuccessJoinedPopup} 
          onClose={handleClosePopup}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ backgroundColor: '#315370', color: 'white', textAlign: 'center' }}>
            Successfully Joined - Additional Details
          </DialogTitle>
          <DialogContent style={{ padding: '24px' }}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Designation"
                variant="outlined"
                value={successJoinedFormData.designation}
                onChange={(e) => handleFormInputChange('designation', e.target.value)}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#315370' },
                    '&.Mui-focused fieldset': { borderColor: '#315370' },
                  },
                }}
              />
              
              <TextField
                label="Job Location"
                variant="outlined"
                value={successJoinedFormData.jobLocation}
                onChange={(e) => handleFormInputChange('jobLocation', e.target.value)}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#315370' },
                    '&.Mui-focused fieldset': { borderColor: '#315370' },
                  },
                }}
              />
              
              <TextField
                label="Offer CTC"
                variant="outlined"
                value={successJoinedFormData.offerCtc}
                onChange={(e) => handleFormInputChange('offerCtc', e.target.value)}
                fullWidth
                required
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#315370' },
                    '&.Mui-focused fieldset': { borderColor: '#315370' },
                  },
                }}
              />
              
              <FormControl fullWidth required>
                <InputLabel>Billing Type</InputLabel>
                <Select
                  value={successJoinedFormData.billingType}
                  onChange={(e) => handleFormInputChange('billingType', e.target.value)}
                  label="Billing Type"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#315370' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#315370' },
                  }}
                >
                  <MenuItem value="Fixed">Fixed</MenuItem>
                  <MenuItem value="Variable">Variable</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Joining Date"
                variant="outlined"
                value={successJoinedFormData.joiningDate}
                onChange={(e) => handleFormInputChange('joiningDate', e.target.value)}
                fullWidth
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#315370' },
                    '&.Mui-focused fieldset': { borderColor: '#315370' },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '16px 24px', gap: '12px' }}>
            <Button 
              onClick={handleClosePopup}
              variant="outlined"
              sx={{
                borderColor: 'gray',
                color: 'gray',
                '&:hover': {
                  borderColor: '#315370',
                  color: '#315370',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSuccessfullyJoined}
              variant="contained"
              disabled={!successJoinedFormData.designation || !successJoinedFormData.jobLocation || !successJoinedFormData.offerCtc || !successJoinedFormData.billingType || !successJoinedFormData.joiningDate}
              sx={{
                backgroundColor: '#315370',
                '&:hover': {
                  backgroundColor: '#315380',
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                  color: 'gray',
                },
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

    </div>
  );
};

export default AllCandidateData;
