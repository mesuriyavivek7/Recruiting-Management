import { format, formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { fetchJobBasicDetailsByJobId, fetchJobDetailsById, fetchPendingJobsByACManagerId, fetchRecruiterByEId } from '../../../services/api';
import { store } from '../../../State/Store';

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


const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

// Proceed only if userData.admin_type is 'account_manager'
let rows = [];
if (userData?.admin_type === "account_manager") {
  const verifiedJobsIds = await fetchPendingJobsByACManagerId(userData?._id);

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
        createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
      };
    })
  );
}

export { rows };