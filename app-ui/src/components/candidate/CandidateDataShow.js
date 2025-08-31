import React, { useState } from "react";
//importing data grid
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";

//import candidate status mapping
import { cstatus } from "../statuschange/StatusMapping";
import HtmlContent from "../HtmlContent";
import CopyToClipBoard from "../CopyToClipBoard";

//importing loader
import WhiteLoader from "../../assets/whiteloader.svg";

//importing icons
import DescriptionIcon from "@mui/icons-material/Description";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

export default function CandidateDataShow({
  selectedRows,
  setSelectedRows,
  showNotification,
  loader,
  rows,
  refetchCandidateData,
}) {
  const [candidateStatusLoader, setCandidateStatusLoader] = useState(false);
  const [remarksLoader, setRemarksLoader] = useState(false);

  const [remarks, setRemarks] = useState({});

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

  const candiadteStatusChange = async (e, id) => {
    try {
      setCandidateStatusLoader(true);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/changecandidatestatus/${id}`,
        { status: e.target.value }
      );
      await refetchCandidateData();
    } catch (err) {
      setCandidateStatusLoader(false);
      showNotification(
        "Something wrong while changeing candidate status.",
        "failure"
      );
      console.log(err);
    }
    setCandidateStatusLoader(false);
  };

  const viewCandidateResume = async (cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getresumefilename/${cid}`
      );
      const correctUrl = `${process.env.REACT_APP_BASE_URL}/resumedocs/${res.data}`;
      if (res.data) {
        window.open(correctUrl, "_blank");
      }
    } catch (err) {
      console.log(err);
      showNotification(
        "Something went wrong while opening resume doc.",
        "failure"
      );
    }
  };

  const downloadCandidateResume = async (cid) => {
    try {
      //Fetch which type of resume file get
      const fileExtension = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/resumefilepath/${cid}`
      );
      //Fetch download resume file
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/downloadresumedocs/${cid}`,
        {
          responseType: "blob", // Expect a blob in response
        }
      );

      // Set the MIME type based on the file extension
      let mimeType;
      switch (fileExtension.data) {
        case ".pdf":
          mimeType = "application/pdf";
          break;
        case ".doc":
          mimeType = "application/msword";
          break;
        case ".docx":
          mimeType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
        default:
          showNotification("File is not supported for download.", "failure");
          console.error("Unsupported file type");
          return;
      }

      if (res.status === 200) {
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "candidateresume");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        showNotification("File download failed.", "failure");
      }
    } catch (err) {
      console.log(err);
      showNotification(
        "Something went wrong while downloading candidate documents.",
        "failure"
      );
    }
  };

  const updateCandidateRemarks = async (id) => {
    try {
      setRemarksLoader(true);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/updatecandidateremarks/${id}`,
        { remarks: remarks[id] }
      );
      await refetchCandidateData();
      setRemarksLoader(false);
      showNotification("Successfully candidate remarks changed.", "success");
    } catch (err) {
      setRemarksLoader(false);
      console.log(err);
      showNotification(
        "Something went wrong while updating Remarks.",
        "failure"
      );
    }
    setRemarksLoader(false);
  };

  //column for candidate data
  const candidateCol = [
    {
      field: "srno",
      headerName: "Sr No.",
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
            <div
              onClick={() =>
                handleOpenPopUpBox(params.row.candidate_id, params.row.job_id)
              }
              className="flex cursor-pointer flex-col gap-1"
            >
              <p className="text-sm text-blue-400">
                {params.row.candidate_full_name}
              </p>
              <span className="text-sm text-blue-400">
                {params.row.candidate_id}
              </span>
            </div>
            <div className="flex gap-2">
              <span
                onClick={() => viewCandidateResume(params.row.candidate_id)}
                className="text-blue-400 cursor-pointer"
              >
                <DescriptionIcon style={{ fontSize: "1.3rem" }} />
              </span>
              <span
                onClick={() => downloadCandidateResume(params.row.candidate_id)}
                className="text-blue-400 cursor-pointer"
              >
                <FileDownloadIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
        );
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
    },
    {
      field: "cstatus",
      headerName: "Candidate Status",
      headerClassName: "super-app-theme--header",
      width: 230,
      renderCell: (params) => {
        return (
          <select
            className="input-field"
            value={params.row.candidate_status}
            onChange={(e) => candiadteStatusChange(e, params.row.id)}
          >
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
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => {
        const currentRemark = remarks[params.row.id] ?? params.row.remarks;

        return (
          <div>
            <input
              type="text"
              className="input-field"
              value={currentRemark}
              onFocus={() =>
                setRemarks((prev) => ({
                  ...prev,
                  [params.row.id]: currentRemark,
                }))
              }
              onChange={(e) =>
                setRemarks((prev) => ({
                  ...prev,
                  [params.row.id]: e.target.value,
                }))
              }
              onBlur={() =>
                updateCandidateRemarks(params.row.id, currentRemark)
              }
            />
          </div>
        );
      },
    },
  ];

  const [fileName, setFileName] = useState(null);
  const [currentTab, setCurrentTab] = useState("candidate");
  const [openProfilePopup, setOpenProfilePopUp] = useState(false);

  //For candidate
  const [openCandidatePopUpLoader, setOpenCandidatePopUpLoader] =
    useState(false);
  const [candidateBasicDetails, setCandidateBasicDetails] = useState(null);
  const [candidateAttachments, setCandidateAttachments] = useState(null);
  const [candidateStatus, setCandidateStatus] = useState(null);
  const [candidateSQ, setCandidateSQ] = useState(null);
  const [acManagerName, setAcManagerName] = useState(null);
  const [jobBasicDetails, setJobBasicDetails] = useState(null);

  //For Job
  const [jobUpdates, setJobUpdates] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [clientDescription, setClientDescription] = useState(null);
  const [sourcingGuidelines, setSourcingGuidelines] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [jobCommissionDetails, setJobCommissionDetails] = useState(null);

  //open-close candidate states
  const [openCandidateDetails, setOpenCandidateDetails] = useState(true);
  const [openCandidateAttachment, setOpenCandidateAttachment] = useState(false);
  const [openCandidateSQ, setOpenCandidateSQ] = useState(false);

  //open-close job states
  const [openJobDetails, setOpenJobDetails] = useState(true);
  const [openJobDescription, setOpenJobDescription] = useState(false);
  const [openClientDescription, setOpenClientDescription] = useState(false);
  const [openSourcingGuidelines, setOpenSourcingGuidelines] = useState(false);

  const handleSetFileName = async (cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getresumefilename/${cid}`
      );
      if (res.data) setFileName(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchCandidateDetails = async (cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidatealldetails/${cid}`
      );
      if (res.data) {
        if (res.data.candidateBasicDetails)
          setCandidateBasicDetails(res.data.candidateBasicDetails);
        if (res.data.candidateAttachments)
          setCandidateAttachments(res.data.candidateAttachments);
        if (res.data.candidateSQ) setCandidateSQ(res.data.candidateSQ);
        if (res.data.candidateStatus)
          setCandidateStatus(res.data.candidateStatus);
      }
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const viewCandidateAttachments = async (cid, fileName) => {
    try {
      const fileUrl = `${process.env.REACT_APP_API_BASE_URL}/candidate/viewcandidateattachments/${cid}/${fileName}`;
      window.open(fileUrl, "_blank");
    } catch (err) {
      console.log(err);
      showNotification(
        "Something went wrong while opening candidate attachments",
        "failure"
      );
    }
  };

  const downloadCandidateAttachments = async (
    cid,
    filePath,
    fileName,
    filetype
  ) => {
    try {
      //Fetch which type of resume file get
      const fileExtension = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidateattachmentfiletype/${cid}/${filetype}`
      );
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/downloadcandidateattachments`,
        { filePath, fileName },
        {
          responseType: "blob",
        }
      );

      let fileType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (res.status === 200 && fileType.includes(fileExtension.data)) {
        const blob = new Blob([res.data], { type: fileExtension.data });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "candidateattachments");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else if (res.status === 400) {
        showNotification("File not found..!", "failure");
      } else {
        showNotification("File download failed", "failure");
      }
    } catch (err) {
      console.log(err);
      showNotification(
        "Something went wrong while downloading candidate attachments",
        "failure"
      );
    }
  };

  const handleFetchCandidateJobBasicDetails = async (cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getjobbasicdetails/${cid}`
      );
      if (res.data) setJobBasicDetails(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong....!", "failure");
    }
  };

  const handleFetchAcmanagerName = async (cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getacmanagername/${cid}`
      );
      if (res.data) setAcManagerName(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong....!", "failure");
    }
  };

  const handleFetchJobUpdates = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getjobupdates/${jobid}`
      );
      if (res.data) setJobUpdates(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchJobDetails = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getjobbasicdetailsforpreview/${jobid}`
      );
      if (res.data) setJobDetails(res.data);
      if (res.data.job_description) setJobDescription(res.data.job_description);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchJobCommissionDetails = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getjobcommissiondetailsforpreview/${jobid}`
      );
      console.log(res.data);
      if (res.data) setJobCommissionDetails(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchJobCompanyInfo = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getcompanydetailsforpreview/${jobid}`
      );
      if (res.data) setClientDescription(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchJobStatus = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getjobstatusforpreview/${jobid}`
      );
      if (res.data) setJobStatus(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleFetchSourcingGuidelines = async (jobid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/job/getsourcingguidelinesforpreview/${jobid}`
      );
      if (res.data) setSourcingGuidelines(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong...!", "failure");
    }
  };

  const handleOpenPopUpBox = async (cid, jobid) => {
    setOpenCandidatePopUpLoader(true);
    setOpenProfilePopUp(true);
    //For candidate
    await handleSetFileName(cid);
    await handleFetchCandidateDetails(cid);
    await handleFetchCandidateJobBasicDetails(cid);
    await handleFetchAcmanagerName(cid);
    //For job details
    await handleFetchJobUpdates(jobid);
    await handleFetchJobDetails(jobid);
    await handleFetchJobCompanyInfo(jobid);
    await handleFetchSourcingGuidelines(jobid);
    await handleFetchJobStatus(jobid);
    await handleFetchJobCommissionDetails(jobid);
    setOpenCandidatePopUpLoader(false);
  };

  const handleClosePopUpBox = async () => {
    setOpenProfilePopUp(false);
    setFileName(null);
    setCandidateBasicDetails(null);
    setCandidateAttachments(null);
    setCandidateSQ(null);
    setCandidateStatus(null);
    setAcManagerName(null);
    setJobBasicDetails(null);

    setJobDetails(null);
    setJobDescription(null);
    setClientDescription(null);
    setSourcingGuidelines(null);

    setOpenCandidateDetails(true);
    setOpenCandidateAttachment(false);
    setOpenCandidateSQ(false);

    setCurrentTab("candidate");
    setOpenJobDetails(true);
    setOpenJobDescription(false);
    setOpenClientDescription(false);
    setOpenSourcingGuidelines(false);
  };

  return (
    <div className="custom-div">
      {candidateStatusLoader && (
        <div className="fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center">
          <div className="custom-div w-[450px] p-4 items-center">
            <img className="h-10 w-10" alt="" src={WhiteLoader}></img>
            <p>Please wait till we update resume status.</p>
          </div>
        </div>
      )}
      {remarksLoader && (
        <div className="fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center">
          <div className="custom-div w-[450px] p-4 items-center">
            <img className="h-10 w-10" alt="" src={WhiteLoader}></img>
            <p>Please wait till we update candidate remarks.</p>
          </div>
        </div>
      )}
      {openProfilePopup && (
        <div className="fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center">
          <div className="custom-div overflow-hidden p-0 w-[90%]">
            <div className="flex w-[100%] p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <span
                    onClick={handleClosePopUpBox}
                    className="cursor-pointer"
                  >
                    <ChevronLeftIcon
                      style={{ fontSize: "1.6rem" }}
                    ></ChevronLeftIcon>
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="flex gap-2 items-center">
                      <h2 className="text-xl">
                        {candidateBasicDetails &&
                          `${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`}
                      </h2>
                      <small className="text-gray-400 font-medium text-[16px]">
                        {candidateBasicDetails &&
                          candidateBasicDetails.candidate_id}
                      </small>
                    </span>
                    <span>
                      <span className="text-gray-500">
                        {jobBasicDetails && jobBasicDetails.job_title} -{" "}
                        {jobBasicDetails && jobBasicDetails.job_id}
                      </span>{" "}
                      <span>{jobBasicDetails && jobBasicDetails.country}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-1">
                    <small className="text-gray-500">Ac Manager</small>
                    {acManagerName && acManagerName.full_name}
                  </span>
                  <span className="p-1 px-2 bg-white text-[15px] rounded-md">
                    {candidateStatus && cstatus.get(candidateStatus)}
                  </span>
                </div>
              </div>
              <div className="flex mt-2 gap-6 px-4">
                <div
                  onClick={() => setCurrentTab("candidate")}
                  className={`cursor-pointer ${
                    currentTab === "candidate"
                      ? "text-blue-400"
                      : "text-gray-500"
                  } hover:text-blue-400`}
                >
                  Candidate
                  {currentTab === "candidate" && (
                    <hr className="bg-blue-400 h-1"></hr>
                  )}
                </div>
                <div
                  onClick={() => setCurrentTab("job")}
                  className={`text-gray-500 ${
                    currentTab === "candidate"
                      ? "text-blue-400"
                      : "text-gray-500"
                  } cursor-pointer hover:text-blue-400`}
                >
                  Job
                  {currentTab === "job" && (
                    <hr className="bg-blue-400 h-1"></hr>
                  )}
                </div>
              </div>
            </div>

            {currentTab === "candidate" &&
              (openCandidatePopUpLoader ? (
                <div className="flex w-full justify-center h-[600px] items-center">
                  <img src={WhiteLoader} className="w-10 h-10"></img>
                </div>
              ) : (
                <div className="bg-white w-full flex gap-3 p-2">
                  <div className="flex-1 custom-div p-2">
                    {fileName && (
                      <iframe
                        title="attachments"
                        src={`${process.env.REACT_APP_BASE_URL}/resumedocs/${fileName}`}
                        className="rounded-md h-[600px] w-full"
                      ></iframe>
                    )}
                  </div>
                  <div className="flex-1 custom-div p-0 overflow-hidden flex-col gap-2">
                    <div className="w-full h-[600px] overflow-scroll ">
                      {candidateBasicDetails && (
                        <div>
                          <div className="flex bg-slate-100 border-b p-2 justify-between items-center">
                            <span className="text-blue-400">Details</span>
                            <span
                              onClick={() =>
                                setOpenCandidateDetails(!openCandidateDetails)
                              }
                              className="text-blue-400 cursor-pointer"
                            >
                              {openCandidateDetails ? (
                                <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                              ) : (
                                <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                              )}
                            </span>
                          </div>
                          {openCandidateDetails && (
                            <div className="flex bg-white items-center px-3 py-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Candidate Name
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">{`${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Candiadte Email
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold text-blue-400">
                                    {candidateBasicDetails.primary_email_id}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Candidate Phone
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold text-blue-400">{`+${candidateBasicDetails.primary_contact_number}`}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">Submited</span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {getDate(candidateBasicDetails.createdAt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Total Experience
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.experience} Years
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Relevant Experience
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.relevant_experience}{" "}
                                    Years
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Current Company
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.current_company}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Current Designation
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.current_designation}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Current Location
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.current_location}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Notice Period
                                  </span>
                                  <span className="text-[14px] w-52 font-semibold">
                                    {candidateBasicDetails.notice_period} Days
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Current Annual Salary
                                  </span>
                                  <span className="text-[14px] w-32 font-semibold">
                                    {
                                      candidateBasicDetails.current_annual_salary
                                    }
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Expected Annual Salary
                                  </span>
                                  <span className="text-[14px] w-32 font-semibold">
                                    {
                                      candidateBasicDetails.expected_annual_salary
                                    }
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">Country</span>
                                  <span className="text-[14px] w-32 font-semibold">
                                    {candidateBasicDetails.country}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm w-32">
                                    Qualification
                                  </span>
                                  <span className="text-[14px] w-32 font-semibold">
                                    {
                                      candidateBasicDetails.education_qualification
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {candidateAttachments && (
                        <div>
                          <div className="flex border-b bg-slate-100 p-2 justify-between items-center">
                            <span className="text-blue-400">Attachments</span>
                            <span
                              onClick={() =>
                                setOpenCandidateAttachment(
                                  !openCandidateAttachment
                                )
                              }
                              className="text-blue-400 cursor-pointer"
                            >
                              {openCandidateAttachment ? (
                                <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                              ) : (
                                <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                              )}
                            </span>
                          </div>
                          {openCandidateAttachment && (
                            <div className="flex flex-col gap-1">
                              {candidateAttachments.evaluation_form && (
                                <div className="flex border-b justify-between p-2 items-center">
                                  <div className="flex gap-2 items-center">
                                    <span className="h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100">
                                      <InsertDriveFileOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                      ></InsertDriveFileOutlinedIcon>
                                    </span>
                                    <span className="text-sm">
                                      {
                                        candidateAttachments.evaluation_form
                                          .filename
                                      }
                                    </span>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <span
                                      onClick={() =>
                                        viewCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.evaluation_form
                                            .filename
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <DescriptionIcon></DescriptionIcon>
                                    </span>
                                    <span
                                      onClick={() =>
                                        downloadCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.evaluation_form
                                            .filepath,
                                          candidateAttachments.evaluation_form
                                            .filename,
                                          "evaluation_form"
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon>
                                    </span>
                                  </div>
                                </div>
                              )}
                              {candidateAttachments.audio_brief && (
                                <div className="flex border-b justify-between p-2 items-center">
                                  <div className="flex gap-2 items-center">
                                    <span className="h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100">
                                      <InsertDriveFileOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                      ></InsertDriveFileOutlinedIcon>
                                    </span>
                                    <span className="text-sm">
                                      {
                                        candidateAttachments.audio_brief
                                          .filename
                                      }
                                    </span>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <span
                                      onClick={() =>
                                        viewCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.audio_brief
                                            .filename
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <DescriptionIcon></DescriptionIcon>
                                    </span>
                                    <span
                                      onClick={() =>
                                        downloadCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.audio_brief
                                            .filepath,
                                          candidateAttachments.audio_brief
                                            .filename,
                                          "audio_brief"
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon>
                                    </span>
                                  </div>
                                </div>
                              )}
                              {candidateAttachments.other_docs && (
                                <div className="flex border-b justify-between p-2 items-center">
                                  <div className="flex gap-2 items-center">
                                    <span className="h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100">
                                      <InsertDriveFileOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                      ></InsertDriveFileOutlinedIcon>
                                    </span>
                                    <span className="text-sm">
                                      {candidateAttachments.other_docs.filename}
                                    </span>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <span
                                      onClick={() =>
                                        viewCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.other_docs
                                            .filename
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <DescriptionIcon></DescriptionIcon>
                                    </span>
                                    <span
                                      onClick={() =>
                                        downloadCandidateAttachments(
                                          candidateAttachments.folder_name,
                                          candidateAttachments.other_docs
                                            .filepath,
                                          candidateAttachments.other_docs
                                            .filename,
                                          "other_docs"
                                        )
                                      }
                                      className="text-blue-400 cursor-pointer"
                                    >
                                      <ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon>
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {candidateSQ && (
                        <div>
                          <div className="flex border-b bg-slate-100 p-2 justify-between items-center">
                            <span className="text-blue-400">
                              Screening Questions
                            </span>
                            <span
                              onClick={() =>
                                setOpenCandidateSQ(!openCandidateSQ)
                              }
                              className="text-blue-400 cursor-pointer"
                            >
                              {openCandidateSQ ? (
                                <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                              ) : (
                                <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                              )}
                            </span>
                          </div>
                          {openCandidateSQ && (
                            <div className="flex flex-col border-b">
                              {candidateSQ.screening_questions.map(
                                (que, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex p-2 flex-col"
                                    >
                                      <span className="text-[15px]">
                                        Q{que.id}. {que.question_title}?
                                      </span>
                                      <div className="flex gap-2">
                                        <span>
                                          <ArrowRightAltOutlinedIcon
                                            style={{ fontSize: "1.2rem" }}
                                          ></ArrowRightAltOutlinedIcon>
                                        </span>
                                        <p className="text-gray-500 text-[15px]">
                                          {
                                            candidateSQ.screening_answer[index]
                                              .answer
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {currentTab === "job" && (
              <div className="bg-white w-full flex gap-3 p-2">
                <div className="custom-div gap-0 h-[600px] p-0 flex-1">
                  <div className="border w-full p-2">
                    <span className="text-blue-400">Job Updates</span>
                  </div>

                  <div className="bg-white-600 flex flex-col gap-3 py-4 px-2 w-full h-[558px] overflow-scroll">
                    {jobUpdates.length === 0 ? (
                      <span className="w-full p-2 bg-slate-100 border">
                        There is no Job Updates
                      </span>
                    ) : (
                      jobUpdates.map((obj, index) => (
                        <div
                          key={index}
                          className="bg-white w-[70%] border-gray-300 border p-2 rounded-md"
                        >
                          <HtmlContent htmlString={obj.text}></HtmlContent>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex-1 custom-div p-0 overflow-hidden flex-col gap-2">
                  <div className="w-full overflow-scroll h-[600px]">
                    {jobDetails && (
                      <div>
                        <div className="flex bg-slate-100 border-b p-2 justify-between items-center">
                          <span className="text-blue-400">Job Details</span>
                          <span
                            onClick={() => setOpenJobDetails(!openJobDetails)}
                            className="text-blue-400 cursor-pointer"
                          >
                            {openJobDetails ? (
                              <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                            ) : (
                              <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            )}
                          </span>
                        </div>
                        {openJobDetails && (
                          <div className="flex bg-white items-center px-3 py-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Job Title</span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobDetails.job_title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Domain</span>
                                <span className="text-[14px] w-52 font-semibold text-blue-400">
                                  {jobDetails.job_domain}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Posted At</span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {getDate(jobDetails.createdAt)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Location</span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobDetails.country}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Status</span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobStatus}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Salary</span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobCommissionDetails.work_type ===
                                  "full_time"
                                    ? jobCommissionDetails.work_details
                                        .full_time.full_time_salary_type ===
                                      "Fixed"
                                      ? `${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.fixed_salary}`
                                      : `${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.min_salary} - ${jobCommissionDetails.work_details.full_time.max_salary}`
                                    : jobCommissionDetails.work_details.contract
                                        .contract_pay_rate_type === "Fixed"
                                    ? `${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.fix_contract_pay}`
                                    : `${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.min_contract_pay} - ${jobCommissionDetails.work_details.contract.max_contract_pay}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">
                                  Payment Terms
                                </span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {
                                    jobCommissionDetails.commission_details
                                      .payment_tearms
                                  }{" "}
                                  Days
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">
                                  Job Positions
                                </span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobDetails.positions}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">Experience</span>
                                <span className="text-[14px] w-52 font-semibold">{`${jobDetails.experience.minexp} - ${jobDetails.experience.maxexp} Years`}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">
                                  Replacement Terms
                                </span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {
                                    jobCommissionDetails.commission_details
                                      .replacement_clause
                                  }{" "}
                                  Days
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm w-32">
                                  Payout Rate
                                </span>
                                <span className="text-[14px] w-52 font-semibold">
                                  {jobCommissionDetails.commission_details
                                    .commission_type === "Percentage"
                                    ? `${jobCommissionDetails.commission_details.commission_percentage_pay}%`
                                    : jobCommissionDetails.work_type ===
                                      "full_time"
                                    ? `${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`
                                    : `${jobCommissionDetails.work_details.contract.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {jobDescription && (
                      <div>
                        <div className="flex bg-slate-100 border-b p-2 justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <span className="text-blue-400">
                              Job Description
                            </span>
                            <CopyToClipBoard
                              text={jobDescription}
                              showNotification={showNotification}
                            ></CopyToClipBoard>
                          </div>
                          <span
                            onClick={() =>
                              setOpenJobDescription(!openJobDescription)
                            }
                            className="text-blue-400 cursor-pointer"
                          >
                            {openJobDescription ? (
                              <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                            ) : (
                              <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            )}
                          </span>
                        </div>
                        {openJobDescription && (
                          <div className="p-2">
                            <HtmlContent
                              htmlString={jobDescription}
                            ></HtmlContent>
                          </div>
                        )}
                      </div>
                    )}
                    {clientDescription && (
                      <div>
                        <div className="flex bg-slate-100 border-b p-2 justify-between items-center">
                          <span className="text-blue-400">
                            Client Description
                          </span>
                          <span
                            onClick={() =>
                              setOpenClientDescription(!openClientDescription)
                            }
                            className="text-blue-400 cursor-pointer"
                          >
                            {openClientDescription ? (
                              <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                            ) : (
                              <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            )}
                          </span>
                        </div>

                        {openClientDescription && (
                          <div className="p-2">
                            <HtmlContent
                              htmlString={clientDescription.client_description}
                            ></HtmlContent>
                          </div>
                        )}
                      </div>
                    )}
                    {sourcingGuidelines && (
                      <div>
                        <div className="flex bg-slate-100 border-b p-2 justify-between items-center">
                          <span className="text-blue-400">
                            Sourcing Guidelines
                          </span>
                          <span
                            onClick={() =>
                              setOpenSourcingGuidelines(!openSourcingGuidelines)
                            }
                            className="text-blue-400 cursor-pointer"
                          >
                            {openSourcingGuidelines ? (
                              <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                            ) : (
                              <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            )}
                          </span>
                        </div>

                        {openSourcingGuidelines && (
                          <div className="p-2 border-b flex flex-col gap-1">
                            <div>
                              <span className="text-sm font-semibold">
                                Must Haves:
                              </span>
                              <p className="text-sm leading-4">
                                {sourcingGuidelines.must_haves}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-semibold">
                                Poach Clients:
                              </span>
                              <p className="text-sm leading-4">
                                {sourcingGuidelines.poach_clients}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Box
        sx={{
          height: 600,
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#edf3fd",
          },
        }}
      >
        <DataGrid
          getRowId={(rows) => rows.id} // Specify the custom ID field
          rowHeight={90}
          rows={rows}
          columns={candidateCol}
          loading={loader}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newRowSelected) =>
            setSelectedRows(newRowSelected)
          }
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSize={8}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              background: "red", // Set your desired background color here
              color: "#124791", // Optional: Set text color
              fontSize: "1rem",
              fontWeight: "bold",
            },
          }}
        ></DataGrid>
      </Box>
    </div>
  );
}
