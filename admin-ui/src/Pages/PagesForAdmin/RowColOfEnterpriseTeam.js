import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';

// Column definitions
export const columns = [
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
    minWidth: 230,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Rounded Circle for the first letter of the recruiter's email */}
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
        <div className='w-full h-full flex justify-center items-center'>
         <div className='flex flex-col'>
          <span className='text-[15px] leading-5'>{formattedDate}</span>
          <span className='text-sm' style={{ fontSize: '0.9em', color: '#888'}}>
            ({timeAgo})
          </span>
         </div>
        </div>
      );
    },
  },

];
