import Button from '@mui/material/Button';

import { fetchRecuritingAgencies } from '../../../services/api';
import { format, formatDistanceToNowStrict } from 'date-fns';

import { fetchRecuritingAgencybyId, fetchVerifiedRAgenciesByACmanagerId } from '../../../services/api';
import { store } from '../../../State/Store';

export const columns = [
  {
    field: 'id',
    headerName: 'Sr No.',
    minWidth: 100,
    flex: 0.1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 250,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'company_name',
    headerName: 'Company Name',
    flex: 1.5,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: params.value ? 'green' : 'red',
          color: 'white',
          '&:hover': {
            backgroundColor: params.value ? 'darkgreen' : 'darkred',
          },
        }}
      >
        {params.value ? 'Yes' : 'No'}
      </Button>
    ),
  },
];

const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());
console.log(userData);

// Proceed only if userData.admin_type is 'account_manager'
let rows = [];
if (userData?.admin_type === "account_manager") {
  const verifiedAgenciesIds = await fetchVerifiedRAgenciesByACmanagerId(userData?._id);
  console.log(verifiedAgenciesIds);

  // Fetch enterprise details for each ID
  rows = await Promise.all(
    verifiedAgenciesIds.map(async (r_agency_id, index) => {
      const agency = await fetchRecuritingAgencybyId(r_agency_id);
      return {
        id: index + 1,
        full_name: agency.full_name || `User ${index + 1}`,
        email: agency.email || `user${index + 1}@example.com`,
        designation: agency.designation || "Not Provided",
        company_name: agency.company_name || "Unknown",
        country: agency.country || "Unknown",
        city: agency.city || "Unknown",
        domains: Array.isArray(agency.domains) ? agency.domains : [], // Ensure it's an array
        firm_type: Array.isArray(agency.firm_type) ? agency.firm_type : [], // Ensure it's an array
        linkedin_url: agency.linkedin_url || "Not Provided", // Fallback if not provided
        email_verified: agency.email_verified ? "Yes" : "No",
      };
    })
  );
} else {
  console.log("User is not an account manager, skipping recruiting agency data fetch.");
}


export const RcTeamCols = [
  {
    field: '_id',
    headerName: 'Sr No.',
    minWidth: 100,
    flex: 0.1,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 250,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'mobile_no',
    headerName: 'Mobile No',
    flex: 1.5,
    minWidth: 150,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'isAdmin',
    headerName: 'Is Admin',
    flex: 1.5,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'mapped_jobs',
    headerName: 'Mapped Jobs',
    flex: 1,
    minWidth: 150,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'accepted_jobs',
    headerName: 'Accepted Jobs',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: 'submited_candidate_profile',
    headerName: 'Submited Candidate Profile',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'center',
    align : 'center',
   
  },
 
];


export const RcCandidatecols = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'candidate_name',
    headerName: 'Candidate Name',
    flex: 2,
    minWidth: 230,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const first_name = params.row?.candidate_name?.first_name || 'No First Name';
      const last_name = params.row?.candidate_name?.last_name || 'No Last Name';
      return (
        <div>
          {first_name} {last_name}
        </div>
      );
    },
  },
  {
    field: 'job_title',
    headerName: 'Job Title',
    flex: 2,
    minWidth: 200,
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
    field: 'candidate_status',
    headerName: 'Candidate Status',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'submitted',
    headerName: 'Created On',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const SubmittedDate = new Date(params.row.submitted); // Parse ISO date string
      const formattedDate = format(SubmittedDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(SubmittedDate, { addSuffix: true }); // Get "X days ago"

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
  {
    field: 'notice_period',
    headerName: 'Notice Period',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.notice_period} Days
      </div>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.email.length > 15 
          ? `${params.row.email.slice(0, 15)}...` 
          : params.row.email}
      </div>
    ),
  },  
  {
    field: 'mobile',
    headerName: 'Contact',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.mobile}
      </div>
    ),
  },
];

export { rows };

