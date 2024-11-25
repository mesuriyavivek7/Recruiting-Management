import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { columns} from './RowColDataOfNew'; // Import columns configuration
import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';
import { fetchJobBasicDetailsByJobId, fetchJobDetailsById, fetchPendingJobsByACManagerId, fetchEnterpriseMemberDetails } from '../../../services/api';

const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

const calculateRowHeight = (params) => {
  // const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80); 
};

const NewJobData = () => {
  const [loading,setLoading]=useState(false)
  const [pendingJobs,setPendingJobs]=useState([])
  const [notification, setNotification] = React.useState(null)

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  useEffect(()=>{
     const fetchData=async ()=>{
      setLoading(true)
      try{
        //Fetching verified job ids
        const verifiedJobsIds = await fetchPendingJobsByACManagerId(userData?._id);

        const rows = await Promise.all(
          verifiedJobsIds.map(async (jobId, index) => {
            //Fetch all details of job
            const jobDetails = await fetchJobDetailsById(jobId);
      
            // Fetch recruiter asynchronously
            const enterprise_member=await fetchEnterpriseMemberDetails(jobDetails.enterprise_member_id)
      
            const basicjobDetails = await fetchJobBasicDetailsByJobId(jobDetails.job_id);
      
            return {
              _id: String(`${index + 1}`),
              job_title: basicjobDetails?.job_title || "No Title Available",
              job_id: jobDetails?.job_id || "No ID Available",
              enterprise_member:enterprise_member.full_name,
              location: {
                state: basicjobDetails?.state || 'Unknown State',
                country: basicjobDetails?.country || 'Unknown Country',
              },
              createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
              job_status:jobDetails.job_status
            };
          })
        );

        setPendingJobs(rows)
      }catch(err){
         console.log(err)
         showNotification("Something went wrong while fetching data",'failure')
      }finally{
        setLoading(false)
      }
     }
     fetchData()
  },[])


  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
      <Card className='mt-8 border p-2 font-sans'>
        <p className='text-lg xl:text-2xl'>New Jobs</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
          <DataGrid 
          rows={pendingJobs}
          columns={columns}
          rowHeight={80} 
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          pageSize={8} 
          loading={loading}
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
            '& .MuiDataGrid-cellContent': {
               display: 'flex',
               alignItems: 'center', 
             },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
              minHeight: '2.5rem', 
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

export default NewJobData;
