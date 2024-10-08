import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';


export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
  },
 
  {
    field: 'title',
    headerName: 'Job Title',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      // Safely access the job details and provide fallback
      const jobTitle = params.row?.job_basic_details?.job_title || 'No Title Available';
      const jobId = params.row?.job_basic_details?.job_id || 'No ID Available';
  
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '8px 0',  // Add padding for spacing within the cell
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span >{jobTitle}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{jobId}</p>
        </div>
      );
    },
  }
  
,  
  {
    field: 'recruiter',
    headerName: 'Recruiter',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const recruiter = params.row.job_basic_details.hiring_managers || 'Unknown Recruiter'; // Fallback if undefined
      return (
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
            {recruiter.charAt(0).toUpperCase()}
          </div>
          {/* Display the recruiter's full email */}
          {recruiter}
        </div>
      );
    },
  },
  {
    field: 'location',
    headerName: 'Location',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const locationState = params.row?.job_basic_details?.state || 'Unknown State'; // Fallback if undefined
      const locationCountry = params.row?.job_basic_details?.country || 'Unknown Country'; // Fallback if undefined
      return (
        <div>
          {locationState}, {locationCountry}
        </div>
      );
    },
  },
  // Uncomment the createdOn field if needed, applying similar checks
  
  {
    field: 'createdAt',
    headerName: 'Created On',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const createdOnDate = new Date(params.row.createdAt);
      const formattedDate = format(createdOnDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(createdOnDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div>
          <span>{formattedDate}</span>
          <span style={{ fontSize: '0.9em', color: '#888', paddingLeft: '8px' }}>({timeAgo})</span>
        </div>
      );
    },
  },
  
];


export const rows = Array(10)
  .fill(null)
  .map((_, index) => ({
    _id: String(index + 1),
    job_title: "zigo",
    recruiter: "Arati Dangar",
    location: { state: 'Karnataka', country: 'India' },
    createdOn: new Date(2024, 7, index + 1), // Example date (varying days in August 2023)
  }));
