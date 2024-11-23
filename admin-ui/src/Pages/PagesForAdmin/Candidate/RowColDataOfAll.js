import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchVerifiedCandidatesByMAdminId } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { store } from '../../../State/Store';

// columns.js
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
       +{params.row.mobile}
      </div>
    ),
  },
  {
    field: 'candidate_status',
    headerName: 'Candidate Status',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell : (params) =>(
      <span className='p-2 bg-slate-50 text-[16px] rounded-md border'>{params.row.candidate_status}</span>
    )
  },
  {
    field: 'recruiter_member',
    headerName: 'Recruiter',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell:(params) =>(
      <div className='w-full h-full flex gap-2 items-center'>
        <span className='h-8 w-8 text-white bg-blue-500 rounded-full flex justify-center items-center'>{params.row.recruiter_member.charAt(0).toUpperCase()}</span>
        <span>{params.row.recruiter_member}</span>
      </div>
    )
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
    field: 'account_manager',
    headerName: 'Account Manager',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div className='w-full h-full flex gap-2 items-center'>
         <span className='w-8 h-8 text-white rounded-full flex justify-center bg-orange-400 items-center'>{params.row.account_manager.charAt(0).toUpperCase()}</span>
         <span>{params.row.account_manager}</span>
      </div>
    )
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


const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

// Proceed only if userData.admin_type is 'account_manager'
let rows = [];

if (userData?.admin_type === "master_admin") {
  const verifiedCandiatesIds = await fetchVerifiedCandidatesByMAdminId(userData._id);

  rows = await Promise.all(
    verifiedCandiatesIds.map(async (candidateId, index) => {

      const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
      const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
      const candidate = await fetchCandidateStatusById(basic_details.candidate_id)

      // Get candidate status, defaulting to "Status Unavailable" if not found
      const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
      const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey; // Map status or use original

      return {
        _id: String(index + 1),
        candidate_name: {
          first_name: basic_details?.first_name || 'No First Name',
          last_name: basic_details?.last_name || 'No Last Name',
        },
        job_title: job_basic_details?.job_title || "No Job Title",
        job_id: job_basic_details?.job_id || "No Job Id",
        candidate_status: candidateStatus,
        submitted: basic_details?.createdAt || "No Submission Date",
        lastUpdated: basic_details?.updatedAt || "No Update Date",
        notice_period: basic_details?.notice_period || "N/A",
        email: basic_details?.primary_email_id || "No Email",
        mobile: basic_details?.primary_contact_number || "No Contact Number"
      };
    })
  );
}

export { rows };