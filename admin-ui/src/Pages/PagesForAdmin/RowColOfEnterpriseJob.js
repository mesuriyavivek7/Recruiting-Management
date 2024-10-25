import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';

// Column definitions
export const columns = [
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
          className={`px-4 py-2 rounded-2xl text-md text-white ${
            status === 'Active' ? 'bg-green-600' : 'bg-gray-500'
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

