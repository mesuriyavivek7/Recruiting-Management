import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import Button from '@mui/material/Button';


export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 80,
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
      const jobTitle = params.row?.job_title || 'No Title Available';
      const jobId = params.row?.job_id || 'No ID Available';

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{jobTitle}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{jobId}</p>
        </div>
      );
    },
  },
  {
    field: 'enterprise_member',
    headerName: 'Enterprise Memeber',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const enterprise = params.row?.enterprise_member || 'Unknown Enterprise';
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#3f51b5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            {enterprise.charAt(0).toUpperCase()}
          </div>
          {enterprise}
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
      const locationState = params.row?.location?.state || 'Unknown State';
      const locationCountry = params.row?.location?.country || 'Unknown Country';
      return (
        <div>
          {locationState}, {locationCountry}
        </div>
      );
    },
  },
  {
    field: 'experience',
    headerName: 'Experience Required',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const minExp = params.row?.experience?.minexp || 'N/A';
      const maxExp = params.row?.experience?.maxexp || 'N/A';
      return <div>{`${minExp} - ${maxExp} years`}</div>;
    },
  },
  {
    field: 'job_status',
    headerName: 'Job Status',
    flex: 1.5, // Flexible width with moderate space
    minWidth: 200, // Minimum width
    renderCell: (params) => {
      let backgroundColor;
      let hoverColor;

      // Determine background and hover colors based on job status
      switch (params.value) {
        case 'Pending':
          backgroundColor = 'blue';
          hoverColor = 'darkblue';
          break;
        case 'Active':
          backgroundColor = 'green'; // Green for Active
          hoverColor = 'darkgreen'; // Darker green on hover
          break;
        case 'Draft':
          backgroundColor = 'gray'; // Gray for Draft
          hoverColor = 'darkgray'; // Darker gray on hover
          break;
        default:
          backgroundColor = 'red'; // Default to red for unknown status
          hoverColor = 'darkred'; // Dark red on hover
      }

      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: backgroundColor,
              color: 'white',
              padding: '8px 16px', // Consistent padding
              margin: '4px', // Consistent margin
              '&:hover': {
                backgroundColor: hoverColor,
              },
            }}
          >
            {params.value}
          </Button>
        </div>
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created On',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const createdOnDate = new Date(params.row.createdAt); // Parse ISO date string
      const formattedDate = format(createdOnDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(createdOnDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const updatedDate = new Date(params.row.lastUpdated); // Parse ISO date string
      const formattedDate = format(updatedDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(updatedDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },
];



