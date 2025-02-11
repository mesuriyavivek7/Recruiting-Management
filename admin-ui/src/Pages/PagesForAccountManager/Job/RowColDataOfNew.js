import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';

// Column definitions
export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 90,
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
    headerName: 'Enterprise Member',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const enterprise_member = params.row?.enterprise_member || 'Unknown Recruiter';
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#3f51b5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            {enterprise_member==="By AcManager"?"A":enterprise_member.charAt(0).toUpperCase()}
          </div>
          {enterprise_member}
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
    field: 'job_status',
    headerName: 'Job Status',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell : (params) =>(
      <div className='flex items-center w-full h-full'>
         <span className={`h-8 w-28 ${params.row.job_status==="Active"?"bg-green-400":"bg-red-400"} text-white rounded-md flex justify-center items-center`}>
          {params.row.job_status}
         </span>
      </div>
    )
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

];



