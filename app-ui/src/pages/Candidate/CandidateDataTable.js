//importing icons
import DescriptionIcon from "@mui/icons-material/Description";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const getDate = (date) => {
  let d = new Date(date);
  let d_ate = d.getDate();
  let d_month = d.getMonth() + 1;
  let d_year = d.getFullYear();

  return `${d_ate < 10 ? `0${d_ate}` : d_ate}-${
    d_month < 10 ? `0${d_month}` : d_month
  }-${d_year}`;
};

const getDays = (date) => {
  const today = new Date();
  const past = new Date(date);

  const timeDifference = today.getTime() - past.getTime();

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return days;
};

//column for candidate data
export const candidateCol = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "super-app-theme--header",
    width: 70,
  },
  {
    field: "name&id",
    headerName: "Candidate Name/CID",
    headerClassName: "super-app-theme--header",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-blue-400">
              {params.row.candidate_full_name}
            </p>
            <span className="text-sm text-blue-400">
              {params.row.candidate_id}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-400 cursor-pointer">
              <DescriptionIcon style={{ fontSize: "1.3rem" }} />
            </span>
            <span className="text-blue-400 cursor-pointer">
              <FileDownloadIcon style={{ fontSize: "1.3rem" }} />
            </span>
          </div>
        </div>
      );
    },
    sortComparator: (v1, v2, param1, param2) => {
      const name1 = param1.row.candidate_full_name || ""; // Default to empty string if undefined
      const name2 = param2.row.candidate_full_name || "";
      return name1.toLowerCase().localeCompare(name2.toLowerCase());
    },
  },
  {
    field: "jobid&title",
    headerName: "Uphire Job Id/Name",
    headerClassName: "super-app-theme--header",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="flex w-full h-full items-center">
          <div className="flex gap-2 items-center">
            <span
              className={`${
                params.row.job_status === "Active"
                  ? "text-green-800 bg-green-200"
                  : "text-red-800 bg-red-400"
              } h-6 w-6 rounded-md border text-sm flex justify-center items-center`}
            >
              {params.row.job_status === "Active" ? "A" : "N"}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm">
                {params.row.job_id} - {params.row.job_title}
              </span>
              <span className="text-sm">
                {params.row.job_country} - {params.row.job_city}
              </span>
            </div>
          </div>
        </div>
      );
    },
    sortComparator: (v1, v2, param1, param2) => {
      const name1 = param1.row.job_title || ""; // Default to empty string if undefined
      const name2 = param2.row.job_title || "";
      return name1.toLowerCase().localeCompare(name2.toLowerCase());
    },
  },
  {
    field: "cstatus",
    headerName: "Candidate Status",
    headerClassName: "super-app-theme--header",
    width: 230,
    renderCell: (params) => {
      return (
        <select className="input-field" value={params.row.candidate_status}>
          <option value="resumesubmit">Resume Submitted</option>
          <option value="sip">Screening in Progress</option>
          <option value="cvshortclient">
            CV Shortlisted – Client Recruiter
          </option>
          <option value="cvshorthr">CV Shortlisted – Hiring Manager</option>
          <option value="interview-schedule">Interview Scheduled</option>
          <option value="no-show">No Show</option>
          <option value="candidate-not-ins">Candidate Not Interested</option>
          <option value="candidate-not-reach">Candidate Not Reachable</option>
          <option value="cv-reject-client">
            CV Rejected – Client Recruiter
          </option>
          <option value="cv-reject-hr">CV Rejected – Hiring Manager</option>
          <option value="r-techround">Rejected – Technical Round</option>
          <option value="r-hrround">Rejected – HR Round</option>
          <option value="short-next-round">Shortlisted for Next Round</option>
          <option value="s-finale-interview">
            Selected in Final Interview
          </option>
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
      );
    },
  },
  {
    field: "submited",
    headerName: "Submitted",
    headerClassName: "super-app-theme--header",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="flex mt-5 h-full flex-col gap-1">
          <span className="text-md leading-5">
            {getDate(params.row.submited)}
          </span>
          <span className="text-sm text-gray-400">
            ({getDays(params.row.submited)} days ago)
          </span>
        </div>
      );
    },
    sortComparator: (v1, v2, param1, param2) => {
      const date1 = new Date(param1.row.submited);
      const date2 = new Date(param2.row.submited);
      return date1 - date2; // Ascending order
    },
  },
  {
    field: "updated",
    headerName: "Last Updated",
    headerClassName: "super-app-theme--header",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="flex mt-5 h-full flex-col gap-1">
          <span className="text-md leading-5">
            {getDate(params.row.updated)}
          </span>
          <span className="text-sm text-gray-400">
            ({getDays(params.row.updated)} days ago)
          </span>
        </div>
      );
    },
    sortComparator: (v1, v2, param1, param2) => {
      const date1 = new Date(param1.row.updated);
      const date2 = new Date(param2.row.updated);
      return date1 - date2; // Ascending order
    },
  },
  {
    field: "notice_period",
    headerName: "Notice Period",
    headerClassName: "super-app-theme--header",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="flex mt-7">
          <span className="text-md leading-5">
            {params.row.notice_period} Days
          </span>
        </div>
      );
    },
  },
  {
    field: "email&mobile",
    headerName: "Email/Mobile",
    headerClassName: "super-app-theme--header",
    width: 280,
    renderCell: (params) => {
      return (
        <div className="flex w-full h-full items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm">
              {params.row.candidate_email_address}
            </span>
            <span className="text-sm">
              +{params.row.candidate_mobile_number}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    field: "recruiter_name",
    headerName: "Recruiter",
    headerClassName: "super-app-theme--header",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex gap-1 mt-7 items-center">
          <span className="h-7 w-7 font-bold rounded-full text-white text-[15px] flex justify-center items-center bg-blue-400">
            {params.row.recruiter_name[0].toUpperCase()}
          </span>
          <span className="text-sm">{params.row.recruiter_name}</span>
        </div>
      );
    },
    sortComparator: (v1, v2, param1, param2) => {
      return param1.row.recruiter_name.localeCompare(param2.row.recruiter_name);
    },
  },
  {
    field: "remarks",
    headerName: "Remarks",
    headerClassName: "super-app-theme--header",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <input type="text" className="input-field"></input>
        </div>
      );
    },
  },
];

//candidate data
export const candidateRow = [
  {
    id: 1,
    cid: "37763",
    name: "Priyank Patel",
    jobstatus: "Active",
    jobid: "119121",
    jobtitle: "Softwere Engineer",
    jobcity: "Ahmedabad",
    jobcountry: "india",
    cstatus: "no-show",
    submited: "11 Jun 23",
    last_uapdated: "15 Jun 23",
    notice_period: "45-60 Days",
    email: "priyankpatel@gmial.com",
    mobile: "+91-8789387928",
    recruiter: "john doe",
    vendor: "uphire",
    remarks: "Nothing",
  },
  {
    id: 2,
    cid: "37763",
    name: "Priyank Patel",
    jobstatus: "Active",
    jobid: "119121",
    jobtitle: "Softwere Engineer",
    jobcity: "Ahmedabad",
    jobcountry: "india",
    cstatus: "no-show",
    submited: "11 Jun 23",
    last_uapdated: "15 Jun 23",
    notice_period: "45-60 Days",
    email: "priyankpatel@gmial.com",
    mobile: "+91-8789387928",
    recruiter: "john doe",
    vendor: "uphire",
    remarks: "Nothing",
  },
  {
    id: 3,
    cid: "37763",
    name: "Priyank Patel",
    jobstatus: "Active",
    jobid: "119121",
    jobtitle: "Softwere Engineer",
    jobcity: "Ahmedabad",
    jobcountry: "india",
    cstatus: "no-show",
    submited: "11 Jun 23",
    last_uapdated: "15 Jun 23",
    notice_period: "45-60 Days",
    email: "priyankpatel@gmial.com",
    mobile: "+91-8789387928",
    recruiter: "john doe",
    vendor: "uphire",
    remarks: "Nothing",
  },
  {
    id: 4,
    cid: "37763",
    name: "Priyank Patel",
    jobstatus: "Active",
    jobid: "119121",
    jobtitle: "Softwere Engineer",
    jobcity: "Ahmedabad",
    jobcountry: "india",
    cstatus: "no-show",
    submited: "11 Jun 23",
    last_uapdated: "15 Jun 23",
    notice_period: "45-60 Days",
    email: "priyankpatel@gmial.com",
    mobile: "+91-8789387928",
    recruiter: "john doe",
    vendor: "uphire",
    remarks: "Nothing",
  },
  {
    id: 5,
    cid: "37763",
    name: "Priyank Patel",
    jobstatus: "Active",
    jobid: "119121",
    jobtitle: "Softwere Engineer",
    jobcity: "Ahmedabad",
    jobcountry: "india",
    cstatus: "no-show",
    submited: "11 Jun 23",
    last_uapdated: "15 Jun 23",
    notice_period: "45-60 Days",
    email: "priyankpatel@gmial.com",
    mobile: "+91-8789387928",
    recruiter: "john doe",
    vendor: "uphire",
    remarks: "Nothing",
  },
];
