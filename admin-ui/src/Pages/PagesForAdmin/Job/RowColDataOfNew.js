import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';

// Column definitions
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
    field: 'job_title',
    headerName: 'Job Title',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'recruiter',
    headerName: 'Recruiter',
    flex: 2,
    minWidth: 250,
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
          {params.row.recruiter.charAt(0).toUpperCase()}
        </div>
        {/* Display the recruiter's full email */}
        {params.row.recruiter}
      </div>
    ),
  },
  {
    field: 'location',
    headerName: 'Location',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.location.state}, {params.row.location.country}
      </div>
    ),
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
    _id: `${index + 1}`,
    job_title: "zigo",
    recruiter: "Arati Dangar",
    location: { state: 'Karnataka', country: 'India' },
    createdOn: new Date(2024, 7, index + 1), // Example date (varying days in August 2023)
  }));
