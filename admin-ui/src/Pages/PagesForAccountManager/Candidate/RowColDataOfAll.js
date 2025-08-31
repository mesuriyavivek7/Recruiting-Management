import { format, formatDistanceToNowStrict } from "date-fns";

// columns.js
export const columns = (candiadteStatusChange, handleRowClick) => [
  {
    field: "_id",
    headerName: "Sr No.",
    flex: 1,
    minWidth: 80,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "candidate_name",
    headerName: "Candidate Name",
    flex: 2,
    minWidth: 230,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      const first_name =
        params.row?.candidate_name?.first_name || "No First Name";
      const last_name = params.row?.candidate_name?.last_name || "No Last Name";
      return (
        <div
          onClick={() => handleRowClick(params.row)}
          className="cursor-pointer hover:text-blue-500"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span className="hover:underline-offset-1	">
              {first_name} {last_name}
            </span>
          </p>
          <p style={{ margin: 0, color: "gray", lineHeight: 1.5 }}>
            {params.row.candidate_id}
          </p>
        </div>
      );
    },
  },
  {
    field: "job_title",
    headerName: "Job Title",
    flex: 2,
    minWidth: 200,
    align: "left",
    renderCell: (params) => {
      const jobTitle = params.row?.job_title || "No Title Available";
      const jobId = params.row?.job_id || "No ID Available";

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{jobTitle}</span>
          </p>
          <p style={{ margin: 0, color: "gray", lineHeight: 1.5 }}>{jobId}</p>
        </div>
      );
    },
  },
  {
    field: "candidate_status",
    headerName: "Candidate Status",
    flex: 1,
    minWidth: 200,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => (
      <select
        className="input-field"
        value={params.row.candidate_status}
        onChange={(e) => candiadteStatusChange(e, params.row.orgcandidateid)}
      >
        <option value="resumesubmit">Resume Submitted</option>
        <option value="sip">Screening in Progress</option>
        <option value="cvshortclient">CV Shortlisted – Client Recruiter</option>
        <option value="cvshorthr">CV Shortlisted – Hiring Manager</option>
        <option value="interview-schedule">Interview Scheduled</option>
        <option value="no-show">No Show</option>
        <option value="candidate-not-ins">Candidate Not Interested</option>
        <option value="candidate-not-reach">Candidate Not Reachable</option>
        <option value="cv-reject-client">CV Rejected – Client Recruiter</option>
        <option value="cv-reject-hr">CV Rejected – Hiring Manager</option>
        <option value="r-techround">Rejected – Technical Round</option>
        <option value="r-hrround">Rejected – HR Round</option>
        <option value="short-next-round">Shortlisted for Next Round</option>
        <option value="s-finale-interview">Selected in Final Interview</option>
        <option value="s-not-offer">Selected – Not Offered</option>
        <option value="o-hold">On Hold</option>
        <option value="o-extended">Offer Extended</option>
        <option value="o-accepted">Offer Accepted</option>
        <option value="o-declined">Offer Declined</option>
        <option value="not-join">Did Not Join</option>
        <option value="success-joined">Successfully Joined</option>
        <option value="payout-eligible">Payout Eligible</option>
        <option value="early-registration">Early Resignation</option>
        <option value="cv-rejected">CV Rejected - In Process</option>
        <option value="invoice-raised">Invoice Raised</option>
        <option value="payment-received">Payment Received</option>
        <option value="creditnote">Credit Note</option>
      </select>
    ),
  },
  {
    field: "mobile",
    headerName: "Contact",
    flex: 2,
    minWidth: 200,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => <div>+{params.row.mobile}</div>,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 200,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "notice_period",
    headerName: "Notice Period",
    flex: 1,
    minWidth: 150,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => <div>{params.row.notice_period} Days</div>,
  },
  {
    field: "recruiter_member",
    headerName: "Recruiter Member",
    flex: 1,
    minWidth: 180,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "submitted",
    headerName: "Created On",
    flex: 1,
    minWidth: 150,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      const SubmittedDate = new Date(params.row.submitted); // Parse ISO date string
      const formattedDate = format(SubmittedDate, "dd-MMM-yy"); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(SubmittedDate, {
        addSuffix: true,
      }); // Get "X days ago"

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: "gray", lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    flex: 1,
    minWidth: 150,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      const updatedDate = new Date(params.row.lastUpdated); // Parse ISO date string
      const formattedDate = format(updatedDate, "dd-MMM-yy"); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(updatedDate, {
        addSuffix: true,
      }); // Get "X days ago"

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: "gray", lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },
];

//columns for candidate data on each jobs

export const fetchCandidateDataForEachJob = async (jobid) => {
  try {
  } catch (err) {
    throw err;
  }
};
