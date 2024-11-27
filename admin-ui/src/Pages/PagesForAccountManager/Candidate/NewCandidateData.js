import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfNew'; // Import columns configuration
import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchPendingCandidatesByACManagerId } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';

const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const NewCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [newCandidateRows,setNewCandidateRows]=useState([])
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

  
const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

  const [notification, setNotification] = useState(null)

  //for showing notification
  const showNotification = (message, type) => {
   setNotification({ message, type })
 }


  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/account_manager/candidate/${id}`);
  };


  useEffect(()=>{
     const fetchData=async ()=>{
          setLoading(true)
         try{
          //Fetch candidate ids
          const verifiedCandiatesIds = await fetchPendingCandidatesByACManagerId(userData._id);

          const rows = await Promise.all(
            verifiedCandiatesIds.map(async (candidateId, index) => {
        
              const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
              const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
              const candidate = await fetchCandidateStatusById(basic_details.candidate_id)
        
              // Get candidate status, defaulting to "Status Unavailable" if not found
              const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
              const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey; // Map status or use original
        
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
                mobile: basic_details?.primary_contact_number || "No Contact Number"
              };
            })
          );

          setNewCandidateRows(rows)

         }catch(err){
            console.log(err)
            showNotification("Something went wrong while fetching data.",'failure')
         }finally{
           setLoading(false)
         }
     }
     fetchData()
  },[])


  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
      <Card className='mt-8 p-2 border font-sans'>
        <p className='text-lg xl:text-2xl'>New Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
          rows={newCandidateRows}
          columns={columns}
          rowHeight={80} 
          loading={loading}
          onRowClick={(params) => handleRowClick(params.id)}
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
          pageSize={8}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }} 
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

    </div>
  );
};

export default NewCandidateData;
