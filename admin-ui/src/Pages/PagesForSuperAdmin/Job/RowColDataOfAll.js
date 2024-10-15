import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { fetchAllJobDetails } from '../../../services/api';

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
    field: 'recruiter',
    headerName: 'Recruiter',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const recruiter = params.row?.recruiter || 'Unknown Recruiter';
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#3f51b5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            {recruiter.charAt(0).toUpperCase()}
          </div>
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
    field: 'createdAt',
    headerName: 'Created On',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const createdAtValue = params.row?.createdAt;
      const createdOnDate = createdAtValue ? new Date(createdAtValue) : new Date(0);
      const isValidDate = !isNaN(createdOnDate.getTime());
      const timeAgo = isValidDate ? formatDistanceToNowStrict(createdOnDate, { addSuffix: true }) : 'Invalid Date';
      return <div><span>{timeAgo}</span></div>;
    },
  },
];

export const data = await fetchAllJobDetails();

export const rows = data.map((job, index) => {
  const jobDetails = job?.job_basic_details || {};
  

  return {
    _id: String(`Job-${index + 1}`),
    job_title: jobDetails?.job_title || "No Title Available",
    job_id: jobDetails?.job_id || "No ID Available",
    recruiter: jobDetails?.hiring_managers || "Unknown Recruiter",
    location: {
      state: jobDetails?.state || 'Unknown State',
      country: jobDetails?.country || 'Unknown Country',
    },
    experience: {
      minexp: jobDetails?.experience?.minexp || 'N/A',
      maxexp: jobDetails?.experience?.maxexp || 'N/A',
    },
    createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
  };
});

