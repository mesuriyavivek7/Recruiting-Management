import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { fetchVerifiedJobsByAdminId, fetchJobBasicDetailsByJobId, fetchRecruiterByEId, fetchJobDetailsById } from '../../../services/api';
import { store } from '../../../State/Store';

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
    field: 'enterprise_member',
    headerName: 'Enterprise',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const enterprise_member = params.row?.enterprise_member || 'Unknown Recruiter';
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#3f51b5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            {enterprise_member.charAt(0).toUpperCase()}
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
    field: 'account_manager',
    headerName: 'Account Manager',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) =>(
      <div className='w-full h-full flex gap-2 items-center'>
          <span className='flex justify-center items-center text-white h-8 w-8 rounded-full bg-orange-400'>
             {params.row.account_manager.charAt(0).toUpperCase()}
          </span>
          <span>{params.row.account_manager}</span>
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


const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

// Proceed only if userData.admin_type is 'master_admin'
let rows = [];
if (userData?.admin_type === "master_admin") {
  const verifiedJobsIds = await fetchVerifiedJobsByAdminId(userData?._id);

  rows = await Promise.all(
    verifiedJobsIds.map(async (jobId, index) => {
      const jobDetails = await fetchJobDetailsById(jobId);

      // Fetch recruiter asynchronously
      const recruiter = await fetchRecruiterByEId(jobDetails.enterprise_id);

      const basicjobDetails = await fetchJobBasicDetailsByJobId(jobDetails.job_id);

      return {
        _id: String(`${index + 1}`),
        job_title: basicjobDetails?.job_title || "No Title Available",
        job_id: jobDetails?.job_id || "No ID Available",
        recruiter: recruiter || "Unknown Recruiter",
        location: {
          state: basicjobDetails?.state || 'Unknown State',
          country: basicjobDetails?.country || 'Unknown Country',
        },
        experience: {
          minexp: basicjobDetails?.experience?.minexp || 'N/A',
          maxexp: basicjobDetails?.experience?.maxexp || 'N/A',
        },
        job_status: jobDetails.job_status,
        createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
        lastUpdated: jobDetails?.updatedAt ? new Date(jobDetails.updatedAt) : new Date()
      };
    })
  );
}

export { rows };