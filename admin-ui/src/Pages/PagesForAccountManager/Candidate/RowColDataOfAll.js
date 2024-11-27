import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchVerifiedCandidatesByACManagerId } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { store } from '../../../State/Store';

// columns.js
export const columns = (candiadteStatusChange,handleRowClick)=> [
  {
    field: '_id',
    headerName: 'Sr No.',
    flex: 1,
    minWidth: 80,
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
        <div onClick={()=>handleRowClick(params.row._id)} className='cursor-pointer hover:text-blue-500' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
           <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span className='hover:underline-offset-1	'>{first_name} {last_name}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{params.row.candidate_id}</p>
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
    renderCell: (params)=>(
            <select 
            className='input-field'
            value={params.row.candidate_status}
            onChange={(e)=>candiadteStatusChange(e,params.row.orgcandidateid)}
            >
                <option value='newresume'>New Resume</option>
                <option value='rs-cc'>Resume Select - Client Recruiter</option>
                <option value='rs-hm'>Resume Select - Hiring Manager</option>
                <option value='test-process'>Test in Process</option>
                <option value='interview-process'>Interview in Process</option>
                <option value='no-show'>No Show</option>
                <option value='candidate-not-ins'>Candidate Not Interested</option>
                <option value='candidate-not-reach'>Candidate Not Reachable</option>
                <option value='rr-cc'>Resume Reject - Client Recruiter</option>
                <option value='rr-hm'>Resume Reject - Hiring Manager</option>
                <option value='r-test'>Resueme in Test</option>
                <option value='rjt-tech-itw'>Resume Reject in Tech Interview</option>
                <option value='rjt-hr-itw'>Rejected in HR Interview</option>
                <option value='s-f-itw'>Selected in Final Interview</option>
                <option value='s-not-offer'>Selected - Won't be Offered</option>
                <option value='o-released'>Offer Released</option>
                <option value='o-accepted'>Offer Accepted</option>
                <option value='o-rejected'>Offer Rejected</option>
                <option value='c-not-joine'>Candidate Not Joined</option>
                <option value='c-joine'>Candidate Joined</option>
                <option value='quit-after-joine'>Quit After Joining</option>
                <option value='on-hold'>On Hold</option>
                <option value='no-action'>No Further Action</option>
                <option value='use-later'>Use Later</option>
            </select>
      )
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
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 200,
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
    renderCell: (params) => (
      <div>
        {params.row.notice_period} Days
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



const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());

// Proceed only if userData.admin_type is 'account_manager'
let rows = [];

if (userData?.admin_type === "account_manager") {
  const verifiedCandiatesIds = await fetchVerifiedCandidatesByACManagerId(userData._id);

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