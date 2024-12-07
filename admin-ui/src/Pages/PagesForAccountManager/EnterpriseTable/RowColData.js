import Button from '@mui/material/Button';
import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';

// Column configuration for the DataGrid
export const columns = [
    {
        field: 'id',
        headerName: 'Sr No.',
        minWidth: 90,
        flex: 1
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 2,
        minWidth: 250,
    },
    {
        field: 'designation',
        headerName: 'Designation',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'company_name',
        headerName: 'Company Name',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'country',
        headerName: 'Country',
        flex: 1,
        minWidth: 150,
    },
    {
        field: 'city',
        headerName: 'City',
        flex: 1, // Flexible width
        minWidth: 150, // Minimum width
    },
    {
        field: 'account_status',
        headerName: 'Account Status',
        flex: 1, // Flexible width
        minWidth: 180, // Minimum width
        renderCell: (params) =>(
          <div className='w-full h-full flex items-center'>
           <span className={`${params.row.account_status==="Active"?"bg-green-500":"bg-red-500"} text-white h-8 w-28 flex rounded-md justify-center items-center`}>{params.row.account_status}</span>
          </div>
        )
    },
    {
        field: 'email_verification',
        headerName: 'Email Verification',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: params.value === 'yes' ? 'green' : 'red',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: params.value === 'yes' ? 'darkgreen' : 'darkred',
                        },
                    }}
                >
                    {params.value}
                </Button>
            </div>
        ),
    }

];

const getJobStatusColor = (jobStatus) =>{
    if(jobStatus==="Active") return "bg-green-500"
    else if(jobStatus==="Pending") return "bg-red-500"
    else "bg-gray-500"
}

//Columns for Job
export const colsJob = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
      minWidth: 100,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'job_title',
      headerName: 'Job Title',
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'createdOn',
      headerName: 'Created On',
      flex: 1,
      minWidth: 150,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        const createdOnDate = new Date(params.row.createdOn);
        const formattedDate = format(createdOnDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
        const timeAgo = formatDistanceToNowStrict(createdOnDate, { addSuffix: true }); // Get "X days ago"
    
        return (
          <div
            
          >
           
            <span>{formattedDate}</span>
         
            <span style={{ fontSize: '0.9em', color: '#888',paddingLeft:'8px' }}>({timeAgo})</span>
          </div>
        );
      },
    },
    {
      field: 'enterprise',
      headerName: 'Enterprise',
      flex: 1,
      minWidth: 200,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
       
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#3f51b5',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            {params.row.enterprise.charAt(0).toUpperCase()}
          </div>
          
          {params.row.enterprise}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      
      renderCell: (params) => {
        const status = params.value; // Adjust this based on how the data is structured
    
        return (
          <span
            className={`px-4 py-2 rounded-2xl text-md text-white ${getJobStatusColor(status)}'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  //Coulmns For Team
  export const colsTeam = [
    {
      field: '_id',
      headerName: 'ID',
      minWidth: 100,
      headerAlign: 'left',
      align: 'left',
    },
  
    {
      field: 'en_name',
      headerName: 'Enterprise Name',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' , gap: '1rem' }}>
          {/* Rounded Circle for the first letter of the recruiter's email */}
          <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
            {params.row.en_name.charAt(0).toUpperCase()}
          </div>
          {/* Display the recruiter's full email */}
          {params.row.en_name}
        </div>
      ),
    },
    {
      field: 'account_role',
      headerName: 'Account Role',
      minWidth: 200,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        const status = params.value; // Adjust this based on how the data is structured
  
        return (
          <span
            className={`px-4 py-2 rounded-md text-md text-white ${status === 'Admin' ? 'bg-blue-600' : 'bg-yellow-500'
              }`}
          >
            {status}
          </span>
        );
      },
    },
  
    {
      field: 'active_job',
      headerName: 'Active Jobs',
      minWidth: 180,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'pending_job',
      headerName: 'Pending Jobs',
      minWidth: 180,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
  
      renderCell: (params) => {
        const status = params.value; // Adjust this based on how the data is structured
  
        return (
          <span
            className={`px-4 py-2 rounded-2xl text-md text-white ${status === 'Active' ? 'bg-green-600' : 'bg-gray-500'
              }`}
          >
            {status}
          </span>
        );
      },
    },
  
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      minWidth: 150,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        const createdOnDate = new Date(params.row.createdAt); // Ensure this is the correct property
        const isValidDate = !isNaN(createdOnDate.getTime()); // Check if the date is valid
  
        if (!isValidDate) {
          return <span style={{ color: 'red' }}>Invalid Date</span>; // Handle invalid date
        }
  
        const formattedDate = format(createdOnDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
        const timeAgo = formatDistanceToNowStrict(createdOnDate, { addSuffix: true }); // Get "X days ago"
  
        return (
          <div className='flex w-full h-full items-center'>
            <div className='flex flex-col gap-1'>
              <span className=' text-sm'>{formattedDate}</span>
              <span className=' text-sm' style={{ fontSize: '0.9em', color: '#888'}}>
                ({timeAgo})
              </span>
            </div>
          </div>
        );
      },
    },
  
  ];