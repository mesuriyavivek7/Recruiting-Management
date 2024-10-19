import Button from '@mui/material/Button';
import { fetchRecuritingAgencies } from '../../../services/api';
export const columns = [
  {
    field: 'id',
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
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align : 'center',
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
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'center',
    align : 'center',
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

// Fetch and map data
const data = await fetchRecuritingAgencies();

export const rows = data.map((agency, index) => {
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
});

export const RcTeamCols = [
  {
    field: 'id',
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

export const RcTeamrows = data.map((agency, index) => {
  return {
    id: index + 1,
    full_name: agency.full_name || `User ${index + 1}`,
    email: agency.email || `user${index + 1}@example.com`,
    mobile_no: agency.mobile_no || "Not Provided",
    isAdmin: agency.isAdmin || "Unknown",
    
    // Mapped jobs array, return "Unknown" if empty or undefined
    mapped_jobs: Array.isArray(agency.mapped_jobs) && agency.mapped_jobs.length > 0
      ? agency.mapped_jobs
      : "Unknown",

    // Accepted jobs array, return "Unknown" if empty or undefined
    accepted_jobs: Array.isArray(agency.accepted_jobs) && agency.accepted_jobs.length > 0
      ? agency.accepted_jobs
      : "Unknown",

    // Submitted candidate profiles, ensure it's an array, return "Unknown" if empty
    submited_candidate_profile: Array.isArray(agency.submited_candidate_profile) && agency.submited_candidate_profile.length > 0
      ? agency.submited_candidate_profile
      : "Unknown",
  };
});
;


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
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'uphire_job_id',
    headerName: 'UpHire Job ID/Title',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.uphire_job_id} - {params.row.job_title}
      </div>
    ),
  },
  {
    field: 'candidate_status',
    headerName: 'Candidate Status',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'submitted',
    headerName: 'Submitted',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'last_update',
    headerName: 'Last Update',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'notice_period',
    headerName: 'Notice Period',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'emai',
    headerName: 'Email/Mobile',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.emai} - {params.row.mobile}
      </div>
    ),
  },
];

export const RcCandidaterow = Array(10).fill(null).map((_, index) => ({
  _id: String(index + 1),
  candidate_name: "Joravar Sinha",
  cid: '77854',
  uphire_job_id: "267",
  job_title: 'Software Developer',
  candidate_status: 'Test in process',
  submitted: '22-10-2022',
  last_update: '19-05-2024',
  notice_period: '100 days',
  emai: 'j@gmail.com',
  mobile: '76574574564'
}));