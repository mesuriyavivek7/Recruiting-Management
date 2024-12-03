import Button from '@mui/material/Button';
import { format, formatDistanceToNowStrict } from 'date-fns';

export const columns = [
  {
    field: 'displayIndex',
    headerName: 'Sr No.',
    minWidth: 100,
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
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align: 'left',
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
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
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
  {
      field: 'status',
      headerName: 'Account Status',
      flex: 1.5,
      minWidth: 200,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <span className={`text-white text-[17px] px-4 rounded-md p-2 ${params.row.status==="Active"?"bg-green-500":"bg-red-500"}`}>{params.row.status}</span>
      ),
    },
    {
      field:"account_manager_verified",
      headerName:'Ac Manager Verified',
      flex:1.5,
      minWidth:200,
      headerAlign:"left",
      align:'left',
      renderCell: (params) =>(
        <span className={`text-white text-[17px] px-6 rounded-md p-2 ${params.row.account_manager_verified?"bg-green-500":"bg-red-500"}`}>{params.row.account_manager_verified?"Yes":"No"}</span>
      )
    },
    {
      field:"account_manager",
      headerName:"Account Manager",
      flex:1.5,
      minWidth:200,
      headerAlign:"left",
      align:'left',
    }
  
];


export const RcTeamCols = [
  {
    field: '_id',
    headerName: 'Sr No.',
    minWidth: 80,
    flex: 0.1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'full_name',
    headerName: 'Member Name',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell : (params) =>(
       <div className='w-full h-full flex items-center gap-2'>
          <span className='w-8 h-8 rounded-full text-white bg-blue-500 flex justify-center items-center'>
            {params.row.full_name.charAt(0).toUpperCase()}
          </span>
          <span>{params.row.full_name}</span>
       </div>
    )
  },
  {
    field: 'isAdmin',
    headerName: 'Account Role',
    minWidth: 180,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params)=>(
      <div className='h-full flex items-center '>
        <span className={`${params.row.isAdmin==="Admin"?("bg-blue-500"):("bg-yellow-500")} text-white p-2 h-9 rounded-md w-32 flex justify-center items-center`}>{params.row.isAdmin}</span>
      </div>
    )
  },
  {
    field: 'mapped_jobs',
    headerName: 'Mapped Jobs',
    flex: 1,
    minWidth: 150,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'accepted_jobs',
    headerName: 'Accepted Jobs',
    flex: 1,
    minWidth: 150,
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
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params)=>(
      <div className='flex w-full h-full items-center'>
         <span className={`${params.row.account_status==="Active"?("bg-green-500"):("bg-red-500")} flex justify-center items-center p-2 w-24 text-white rounded-md h-9`}>{params.row.account_status}</span>
      </div>
    )
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const createdOnDate = new Date(params.row.createdAt); // Ensure this is the correct property
      const isValidDate = !isNaN(createdOnDate.getTime()); // Check if the date is valid

      if (!isValidDate) {
        return <span style={{ color: 'red' }}>Invalid Date</span>; // Handle invalid date
      }

      const formattedDate = format(createdOnDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(createdOnDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div className='w-full h-full flex justify-center items-center'>
         <div className='flex flex-col'>
          <span className='text-[15px] leading-5'>{formattedDate}</span>
          <span className='text-sm' style={{ fontSize: '0.9em', color: '#888'}}>
            ({timeAgo})
          </span>
         </div>
        </div>
      );
    },
  },

];


export const RcCandidatecols = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 90,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'candidate_name',
    headerName: 'Candidate Name',
    flex: 2,
    minWidth: 240,
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
    renderCell:(params) =>(
      <span className='p-2 bg-slate-50 border rounded-md'>{params.row.candidate_status}</span>
    )
  },
  {
    field: 'mobile',
    headerName: 'Mobile No',
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
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 220,
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
    field: 'recruiter_member',
    headerName: 'Recruiter Member',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div className='w-full h-full flex items-center gap-2'>
        <span className='w-8 p-2 text-white flex justify-center items-center rounded-full bg-blue-500 h-8 bg-blue'>
          {params.row.recruiter_member.charAt(0).toUpperCase()}
        </span>
        <span>{params.row.recruiter_member}</span>
      </div>
    ),
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
  
  
  
];
