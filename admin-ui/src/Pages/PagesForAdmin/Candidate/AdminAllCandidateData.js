import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';
import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';
import { fetchCandidateBasicDetailsById, fetchAccountManager, fetchRecruiterMemberDetails, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchVerifiedCandidatesByMAdminId } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import axios from 'axios';
import WhiteLoader from './../../../assets/whiteloader.svg'

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

const AdminAllCandidateData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [candidateStatusLoader,setCandidateStatusLoader]=useState(false)

  
  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchData=async ()=>{
    try{
       setLoading(true)
       //Fetch verified candidate ids
       const verifiedCandiatesIds = await fetchVerifiedCandidatesByMAdminId(userData._id);

       const rows = await Promise.all(verifiedCandiatesIds.map(async (candidateId, index) => {
    
          const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
          const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
          const candidate = await fetchCandidateStatusById(basic_details.candidate_id)
    
          // Get candidate status, defaulting to "Status Unavailable" if not found
          const candidateStatus = candidate.candidate_status || "Status Unavailable"

          // Fetch account manager
          const accountManager=await fetchAccountManager(candidate?.alloted_account_manager)

          //Fetch recruiter member id
          const recruiterMember=await fetchRecruiterMemberDetails(candidate?.recruiter_member_id)
    
          return {
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
            account_manager: accountManager ? `${accountManager.full_name}` : null,
            recruiter_member: recruiterMember?.full_name
          };
        }));

      const newFilteredRows = rows.filter((row) => {
        const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase());
        return matchesSearch ;
     });

     setFilteredRows(newFilteredRows);
    }catch(err){
      console.log(err)
      showNotification("Something went wrong while fetching data",'failure')
    } finally{
      setLoading(false)
    }
}

  useEffect(() => {
    fetchData()
  }, [searchTerm]);

  const handleRowClick = (id) => {
    navigate(`/master_admin/candidate/${id}`);
  };

  const candiadteStatusChange=async (e,id)=>{
    try{
      setCandidateStatusLoader(true)
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/changecandidatestatus/${id}`,{status:e.target.value})
      await fetchData()
      showNotification("Successfully candidate status changed.",'success')
    }catch(err){
      setCandidateStatusLoader(false)
      showNotification("Something wrong while changeing candidate status.","failure")
      console.log(err)
    }
    setCandidateStatusLoader(false)
}

  return (
    <div>
    {
      candidateStatusLoader && 
       <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
         <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update resume status.</p>
         </div>
       </div>
     }
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


      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className="mt-8 p-2 border shadow font-sans">
          <div style={{ height: 600, width: '100%' }} className="pt-4">
            <DataGrid
              rows={filteredRows}
              columns={columns(candiadteStatusChange,handleRowClick)}
              rowHeight={80}
              // onRowClick={(params) => handleRowClick(params.id)}
              getRowId={(row) => row._id}
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
                  fontWeight: 'bold !important',
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
                '& .MuiDataGrid-cellContent': {
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiDataGrid-cell': {
                  minHeight: '2.5rem',
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
      )}
    </div>
  );
};

export default AdminAllCandidateData;
