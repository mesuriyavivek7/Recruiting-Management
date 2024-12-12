import Button from '@mui/material/Button';
import { format, formatDistanceToNowStrict } from 'date-fns';

export const columns = [
  {
    field: 'id',
    headerName: 'Sr No.',
    minWidth: 80,
    flex: 0.1,
    align : 'left',
    headerAlign: 'left',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align : 'left',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 300,
    align : 'left',
    headerAlign: 'left',
  },
  {
    field:"mobileno",
    headerName:'Mobile No',
    flex:2,
    minWidth: 250,
    align : 'left',
    headerAlign: 'left',
    renderCell:(params)=>(
      <span>+{params.row.mobileno}</span>
    )
  },
  {
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align : 'left',
    headerAlign: 'left',
  },
  {
    field: 'company_name',
    headerName: 'Company Name',
    flex: 1.5,
    minWidth: 170,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1,
    minWidth: 150,
    align : 'left',
    headerAlign: 'left',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align : 'left',
  },
  {
    field: 'account_status',
    headerName: 'Account Status',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align : 'left',
    renderCell: (params) =>(
      <div className='w-full h-full flex items-center'>
         <span className={`w-28 h-8 flex justify-center items-center ${params.row.account_status==="Active"?"bg-green-500":"bg-red-500"} text-white rounded-md`}>{params.row.account_status}</span>
      </div>
    )
  },
  {
    field: 'account_manager',
    headerName: 'Account Manager',
    flex: 1,
    minWidth: 250,
    headerAlign: 'left',
    align : 'left',  
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'left',
    align : 'left',
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


//columns for recruiter team

export const RcTeamCols = [
  {
    field: '_id',
    headerName: 'Sr No.',
    minWidth: 90,
    flex: 0.1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 300,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'mobile_no',
    headerName: 'Mobile No',
    flex: 1.5,
    minWidth: 180,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) =>(
      <span>+{params.row.mobile_no}</span>
    )
  },
  {
    field: 'isAdmin',
    headerName: 'Account Role',
    flex: 1.5,
    minWidth: 200,
    align: 'left',
    headerAlign: 'left',
    renderCell : (params) =>(
       <div className='w-full h-full flex items-center'>
          <span className={`${params.row.isAdmin==="Yes"?"bg-blue-100 border-blue-400 text-blue-400":"bg-orange-100 border-orange-400 text-orange-400"} w-28 h-8 flex justify-center items-center border p-2 rounded-md`}>{params.row.isAdmin==="Yes"?"Admin":"Member"}</span>
       </div>
    )
  },
  {
    field: 'mapped_jobs',
    headerName: 'Mapped Jobs',
    flex: 1,
    minWidth: 180,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'accepted_jobs',
    headerName: 'Accepted Jobs',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'submited_candidate_profile',
    headerName: 'Submited Candidate Profile',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'account_status',
    headerName: 'Account Status',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params)=>(
      <div className='flex w-full h-full items-center'>
        <span className={`w-28 h-8 ${params.row.account_status==="Active"?"bg-blue-500":"bg-red-500"} text-white flex justify-center items-center rounded-md`}>{params.value}</span>
      </div>
    )
  }

];



//coumns for candidate
export const RcCandidatecols = [
  {
    field: '_id',
    headerName: 'Sr No.',
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
    renderCell: (params) =>(
       <div className='flex h-full w-full items-center'>
          <span className='bg-slate-50 text-[15px] flex items-center justify-center rounded-md p-2 w-36 h-8 border border-blue-400'>{params.value.length > 15
          ? `${params.value.slice(0, 15)}..`
          : params.value}</span>
       </div>
    )
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
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
        +{params.row.mobile}
      </div>
    ),
  },
  {
    field: 'recruiter_member_name',
    headerName: 'Recruiter Member',
    flex: 2,
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
  
];