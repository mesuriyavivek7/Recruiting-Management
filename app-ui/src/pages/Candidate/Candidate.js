import React, { useContext, useEffect, useState } from "react";

//importing icons
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../../components/Notification";

//importing message context for sending messages
import { MessageContext } from "../../context/MessageContext";

//importing taginput
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // Include the default CSS

//import dnd for drag and drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//importing components
import CandidateDataShow from "../../components/candidate/CandidateDataShow";
import DragDropContainer from "../../components/statuschange/DragDropContainer";

//importign loader
import WhiteLoader from "../../assets/whiteloader.svg";

//importing candidate and status mapping
import { cstatus } from "../../components/statuschange/StatusMapping";

export default function Candidate() {
  const { user } = useContext(AuthContext);
  const [dataView, setDataView] = useState("List");
  const [currentTab, setCurrentTab] = useState("status-change");
  const [candidaterows, setCandidateRows] = useState([]);

  const [candidateLoader, setCandidateLoader] = useState(false);
  const [openActionTab, setOpenActionTab] = useState(false);

  //Genral multiple action states
  const [openMultipleActionTab, setOpenMultipleActionTab] = useState(false);
  const [selectedCandidateRows, setSelectedCandidateRows] = useState([]);
  const [multipleActionCandidateData, setMultipleActionCandidateData] =
    useState([]);
  const [multipleActionLoader, setMultipleActionLoader] = useState(false);

  //Status chaneg states
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statuschangeLoader, setStatusChangeLoader] = useState(false);

  //here we store hiring manager mails
  const [tags, setTags] = useState([]);
  const [emailLoad, setEmailLoad] = useState(false);

  //For send messages to multiple candidates
  const { sendMessage } = useContext(MessageContext);
  const [fetchIdsRecruiterLoader, setFetchIdsRecruiterLoader] = useState(false);
  const [recruiterMemberIds, setRecruiterMemberIds] = useState([]);
  const [content, setContent] = useState("");
  const [sendMessageLoader, setSendMessageLoader] = useState(false);

  const getDate = (date) => {
    let d = new Date(date);
    let d_ate = d.getDate();
    let d_month = d.getMonth() + 1;
    let d_year = d.getFullYear();

    return `${d_ate < 10 ? `0${d_ate}` : d_ate}-${
      d_month < 10 ? `0${d_month}` : d_month
    }-${d_year}`;
  };

  const fetchCandidateData = async () => {
    setCandidateLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/getcandidatedetails/${user._id}`
      );
      setCandidateRows(
        res.data.map((item, index) => ({ ...item, srno: index + 1 }))
      );
    } catch (err) {
      showNotification(
        "Something wrong while fetching candidadte data",
        "failure"
      );
      console.log(err);
    }
    setCandidateLoader(false);
  };

  useEffect(() => {
    fetchCandidateData();
  }, [dataView]);

  //For Open multiple action popup box
  const handleMulipleActionClick = async (tabname) => {
    try {
      setMultipleActionLoader(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidateformultipleaction`,
        { candidateIds: selectedCandidateRows }
      );
      setMultipleActionCandidateData(res.data);
      setOpenActionTab(false);
      setCurrentTab(tabname);
      setOpenMultipleActionTab(true);
      setMultipleActionLoader(false);
    } catch (err) {
      setMultipleActionLoader(false);
      console.log(err);
      showNotification(
        "There is something wrong while fetching candidate data.",
        "failure"
      );
    }
  };
  //For changing multiple candidate status
  const changeMultipleCandidateStatus = async () => {
    try {
      setStatusChangeLoader(true);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/changemultiplecandidatestatus`,
        { candidateIds: selectedCandidateRows, status: selectedStatus }
      );
      fetchCandidateData();
      setStatusChangeLoader(false);
      setOpenMultipleActionTab(false);
      showNotification("Successfully All Candidate Status Changed.", "success");
    } catch (err) {
      setStatusChangeLoader(false);
      console.log(err);
      showNotification(
        "Something went wrong while changing multiple candidate status.",
        "failure"
      );
    }
  };

  //For share multiple resume with multiple hiring managers
  const shareResumeWithHiringManager = async () => {
    if (tags.length !== 0) {
      setEmailLoad(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/mail/sharewithhiringmanager`,
          { emails: tags, ciddata: selectedCandidateRows }
        );
        setEmailLoad(false);
        setOpenMultipleActionTab(false);
        showNotification(
          "Successfully resume share to hiring managers",
          "success"
        );
      } catch (err) {
        setEmailLoad(false);
        //handeling error
        console.log(err);
        showNotification(
          "Something went wrong while sharing resume to multiple hiring manager"
        );
      }
    } else {
      showNotification("Add hiring manager mails into input box.", "failure");
    }
  };

  //For Send message to multiple candidate recruiter

  const fetchRecruiterIds = async () => {
    setFetchIdsRecruiterLoader(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/getrecruitermemberids`,
        { candidateIds: selectedCandidateRows }
      );
      setRecruiterMemberIds(res.data);
      setFetchIdsRecruiterLoader(false);
    } catch (err) {
      //handleing error
      console.log(err);
      showNotification(
        "Something went wrong while sending multiple candidate messages",
        "failure"
      );
      setFetchIdsRecruiterLoader(false);
    }
  };

  useEffect(() => {
    if (currentTab === "send-message") fetchRecruiterIds();
  }, [currentTab, selectedCandidateRows]);

  const handleSendMessagesToMultipleCandidates = async () => {
    setSendMessageLoader(true);
    try {
      await Promise.all(
        recruiterMemberIds.map(async (member) => {
          await sendMessage(
            member.recruiter_member_id,
            member.candidate_id,
            content
          );
        })
      );
      setContent("");
      setSendMessageLoader(false);
      setOpenMultipleActionTab(false);
      showNotification(
        "Successfully sending messages to multiple candidates.",
        "success"
      );
    } catch (err) {
      console.log(err);
      showNotification(
        "Something went wrong while sending messages to multiple candidates",
        "failure"
      );
      setSendMessageLoader(false);
    }
  };

  //For remove candidate from selected candiadte list
  const handleRemoveCandidate = (id) => {
    setSelectedCandidateRows((prevData) =>
      prevData.filter((item) => item !== id)
    );
    setMultipleActionCandidateData((prevData) =>
      prevData.filter((item) => item.id !== id)
    );
  };

  useEffect(() => {
    if (selectedCandidateRows.length === 0) {
      setOpenActionTab(false);
      setOpenMultipleActionTab(false);
    }
  }, [selectedCandidateRows]);

  const renderForm = () => {
    switch (currentTab) {
      case "status-change":
        return (
          <div className="bg-white relative p-3 h-[500px] rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="text-[14px] text-gray-500">Change Status To</h2>
              <select
                className="input-field w-52"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="resumesubmit">Resume Submitted</option>
                <option value="sip">Screening in Progress</option>
                <option value="cvshortclient">
                  CV Shortlisted – Client Recruiter
                </option>
                <option value="cvshorthr">
                  CV Shortlisted – Hiring Manager
                </option>
                <option value="interview-schedule">Interview Scheduled</option>
                <option value="no-show">No Show</option>
                <option value="candidate-not-ins">
                  Candidate Not Interested
                </option>
                <option value="candidate-not-reach">
                  Candidate Not Reachable
                </option>
                <option value="cv-reject-client">
                  CV Rejected – Client Recruiter
                </option>
                <option value="cv-reject-hr">
                  CV Rejected – Hiring Manager
                </option>
                <option value="r-techround">Rejected – Technical Round</option>
                <option value="r-hrround">Rejected – HR Round</option>
                <option value="short-next-round">
                  Shortlisted for Next Round
                </option>
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
              </select>
            </div>
            <div className="overflow-y-scroll h-[380px] mt-4 ">
              {multipleActionLoader ? (
                <div className="flex w-full justify-center items-center">
                  <img src={WhiteLoader} className="w-10 h-10 mt-4"></img>
                </div>
              ) : (
                multipleActionCandidateData.map((candidate, index) => (
                  <div
                    key={index}
                    className="flex mt-2  justify-between p-2 rounded-md border shadow"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="flex gap-2 items-center">
                        <h2 className="text-[15px] text-gray-500 font-bold">
                          {candidate.candidate_full_name}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.candidate_id}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <h2 className="text-[14px] text-gray-500">
                          {candidate.job_title}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.job_id}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center flex-col">
                      <h2 className="text-[15px]">
                        {cstatus.get(candidate.candidate_status)}
                      </h2>
                      <span className="text-gray-400 text-[13px]">
                        Received on {getDate(candidate.submited)}
                      </span>
                    </div>
                    <div className="flex-1 flex  place-content-end px-4 items-center">
                      <span
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                      >
                        <DeleteOutlinedIcon
                          style={{ fontSize: "1.8rem" }}
                        ></DeleteOutlinedIcon>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="absolute top-[91%] right-10">
              <button
                onClick={changeMultipleCandidateStatus}
                disabled={selectedStatus === "" || statuschangeLoader}
                className="bg-blue-400 disabled:bg-white disabled:cursor-no-drop disabled:text-gray-500 disabled:border w-60 flex justify-center items-center rounded-md text-[14px] p-2 text-white"
              >
                {statuschangeLoader ? (
                  <svg
                    className="w-5 h-5 mr-2 text-black animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"
                    ></path>
                  </svg>
                ) : (
                  <span className="flex gap-1 items-center">
                    <SellOutlinedIcon></SellOutlinedIcon>
                    Change Status for {selectedCandidateRows.length} resumes
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      case "send-message":
        return (
          <div className="bg-white relative p-3 h-[500px] rounded-md">
            <span>Send Message To</span>
            <div className="mt-4 overflow-y-auto h-[330px]">
              {multipleActionLoader || fetchIdsRecruiterLoader ? (
                <div className="flex w-full justify-center items-center">
                  <img src={WhiteLoader} className="w-10 h-10 mt-4"></img>
                </div>
              ) : (
                multipleActionCandidateData.map((candidate, index) => (
                  <div
                    key={index}
                    className="flex mt-2  justify-between p-2 rounded-md border shadow"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="flex gap-2 items-center">
                        <h2 className="text-[15px] text-gray-500 font-bold">
                          {candidate.candidate_full_name}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.candidate_id}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <h2 className="text-[14px] text-gray-500">
                          {candidate.job_title}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.job_id}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center flex-col">
                      <h2 className="text-[15px]">
                        {cstatus.get(candidate.candidate_status)}
                      </h2>
                      <span className="text-gray-400 text-[13px]">
                        Received on {getDate(candidate.submited)}
                      </span>
                    </div>
                    <div className="flex-1 flex  place-content-end px-4 items-center">
                      <span
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                      >
                        <DeleteOutlinedIcon
                          style={{ fontSize: "1.8rem" }}
                        ></DeleteOutlinedIcon>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="absolute  p-3  left-0 right-0">
              <div className="flex flex-col relative">
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button
                  onClick={handleSendMessagesToMultipleCandidates}
                  disabled={sendMessageLoader || content === ""}
                  className="bg-blue-400 absolute disabled:bg-white w-64 disabled:cursor-no-drop disabled:text-gray-500 disabled:border text-[14px] flex items-center gap-2 rounded-md top-[64%] right-2 p-2 py-1 text-white"
                >
                  {sendMessageLoader ? (
                    <svg
                      className="w-5 h-5 mr-2 text-black animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"
                      ></path>
                    </svg>
                  ) : (
                    <span className="flex gap-1 items-center">
                      <ShareOutlinedIcon></ShareOutlinedIcon> Send Messages for{" "}
                      {selectedCandidateRows.length} Resumes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case "share-resume":
        return (
          <div className="bg-white relative p-3 h-[500px] rounded-md">
            <span>Share Resumes</span>
            <div className="mt-4 overflow-y-auto h-[300px]">
              {multipleActionLoader ? (
                <div className="flex w-full justify-center items-center">
                  <img src={WhiteLoader} className="w-10 h-10 mt-4"></img>
                </div>
              ) : (
                multipleActionCandidateData.map((candidate, index) => (
                  <div
                    key={index}
                    className="flex mt-2  justify-between p-2 rounded-md border shadow"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="flex gap-2 items-center">
                        <h2 className="text-[15px] text-gray-500 font-bold">
                          {candidate.candidate_full_name}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.candidate_id}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <h2 className="text-[14px] text-gray-500">
                          {candidate.job_title}
                        </h2>
                        <span className="text-[13px] text-gray-400">
                          {candidate.job_id}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center flex-col">
                      <h2 className="text-[15px]">
                        {cstatus.get(candidate.candidate_status)}
                      </h2>
                      <span className="text-gray-400 text-[13px]">
                        Received on {getDate(candidate.submited)}
                      </span>
                    </div>
                    <div className="flex-1 flex  place-content-end px-4 items-center">
                      <span
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                      >
                        <DeleteOutlinedIcon
                          style={{ fontSize: "1.8rem" }}
                        ></DeleteOutlinedIcon>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="absolute left-0 right-0 p-3">
              <div className="inline-block">
                <TagsInput
                  value={tags}
                  onChange={(newtags) => setTags(newtags)}
                  onlyUnique
                  className="border-none"
                  inputProps={{
                    placeholder: "Add Hiring Manager Email",
                    className:
                      "border-none w-[350px] outline-none focus:ring-0", // Tailwind for input
                  }}
                  renderLayout={(tagElements, inputElement) => (
                    <div className="flex flex-wrap items-center border p-2">
                      {tagElements}
                      {inputElement}
                    </div>
                  )}
                  renderTag={({ tag, key, onRemove }) => (
                    <span
                      key={key}
                      className="inline-flex text-[14px] mt-2 items-center bg-blue-500 text-white px-2 py-1 rounded-full mr-2 "
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-sm font-bold cursor-pointer"
                        onClick={() => onRemove(key)}
                      >
                        &times;
                      </button>
                    </span>
                  )}
                ></TagsInput>
                <button
                  onClick={shareResumeWithHiringManager}
                  disabled={tags.length === 0 || emailLoad}
                  className="bg-blue-400 disabled:bg-white disabled:cursor-no-drop disabled:text-gray-500 disabled:border mt-4 w-60 rounded-md text-white py-1 px-2 gap-2 text-[14px] flex items-center"
                >
                  {emailLoad ? (
                    <svg
                      className="w-5 h-5 mr-2 text-black animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"
                      ></path>
                    </svg>
                  ) : (
                    <span className="flex gap-1 items-center">
                      <ShareOutlinedIcon></ShareOutlinedIcon> Share{" "}
                      {selectedCandidateRows.length} Resumes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const [notification, setNotification] = useState(null);

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  //for the export the data into excel form
  const handleExportData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/candidate/export-data-enterprise/${user._id}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "candidatedata.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong.", "failure");
    }
  };

  return (
    <>
      {openMultipleActionTab && (
        <div className="fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center">
          <div className="shadow bg-white-200 overflow-hidden rounded-md w-[1100px]">
            <div className="flex bg-white flex-col gap-3 p-2">
              <div className="flex gap-2">
                <span
                  onClick={() => setOpenMultipleActionTab(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <KeyboardArrowLeftOutlinedIcon
                    style={{ fontSize: "1.6rem" }}
                  ></KeyboardArrowLeftOutlinedIcon>
                </span>
                <h2 className="text-xl">Multiple Actions</h2>
              </div>
              <div className="flex gap-4 px-2 text-[14px] text-gray-400">
                <span
                  onClick={() => setCurrentTab("status-change")}
                  className={`flex cursor-pointer flex-col gap-1 ${
                    currentTab === "status-change" && "text-blue-400"
                  }`}
                >
                  Resume Change Status{" "}
                  {currentTab === "status-change" && (
                    <hr className="bg-blue-500 h-1"></hr>
                  )}{" "}
                </span>
                <span
                  onClick={() => setCurrentTab("send-message")}
                  className={`flex cursor-pointer flex-col gap-1 ${
                    currentTab === "send-message" && "text-blue-400"
                  }`}
                >
                  Send Resume Message{" "}
                  {currentTab === "send-message" && (
                    <hr className="bg-blue-500 h-1"></hr>
                  )}{" "}
                </span>
                <span
                  onClick={() => setCurrentTab("share-resume")}
                  className={`flex cursor-pointer flex-col gap-1 ${
                    currentTab === "share-resume" && "text-blue-400"
                  }`}
                >
                  Share Resume With Hiring Manager{" "}
                  {currentTab === "share-resume" && (
                    <hr className="bg-blue-500 h-1"></hr>
                  )}{" "}
                </span>
              </div>
            </div>
            <div className="p-3">{renderForm()}</div>
          </div>
        </div>
      )}

      <div className="relative flex flex-col gap-2">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          ></Notification>
        )}
        <div className="custom-div flex flex-row justify-between">
          <div className="flex gap-4">
            <h1>Candidates</h1>
            <div className="flex gap-2">
              <span>0</span>
              <span className="text-gray-400">Jobs</span>
            </div>
            <div className="flex gap-2">
              <span>{candidaterows.length}</span>
              <span className="text-gray-400">Candidates</span>
            </div>
          </div>
          <div className="relative flex gap-8">
            <div
              onClick={() =>
                setDataView((prevView) =>
                  prevView === "Status" ? "List" : "Status"
                )
              }
              className="flex cursor-pointer text-sm text-gray-800 items-center gap-2"
            >
              <span>
                <MenuIcon></MenuIcon>
              </span>
              {dataView === "List" ? (
                <span>Switch To Status View</span>
              ) : (
                <span>Switch To List View</span>
              )}
            </div>
            <button
              onClick={() => setOpenActionTab((prevTab) => !prevTab)}
              disabled={selectedCandidateRows.length === 0}
              className="p-1 rounded-md flex disabled:cursor-no-drop disabled:bg-white bg-blue-500  disabled:text-gray-400 cursor-pointer text-sm text-white items-center gap-2"
            >
              <span
                className={`${
                  selectedCandidateRows.length === 0
                    ? "text-purple-700"
                    : "text-white"
                }`}
              >
                <AutoAwesomeIcon></AutoAwesomeIcon>
              </span>
              <span>Multiple Action</span>
            </button>
            {openActionTab && (
              <div className="border border-slate-100 absolute gap-4 custom-div z-50 p-2 right-14 w-[350px] top-12">
                <div
                  onClick={() => handleMulipleActionClick("status-change")}
                  className="hover:bg-gray-100 cursor-pointer rounded-md flex p-2 gap-6 items-center"
                >
                  <span className="text-orange-500">
                    <SellOutlinedIcon
                      style={{ fontSize: "1.5rem" }}
                    ></SellOutlinedIcon>
                  </span>
                  <div className="flex flex-col">
                    <h2 className="text-[18px]">Change Status</h2>
                    <p className="text-[13px] text-gray-400">
                      Change Status of Multiple Candidate at once
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => handleMulipleActionClick("send-message")}
                  className="hover:bg-gray-100 cursor-pointer rounded-md flex p-2 gap-6 items-center"
                >
                  <span className="text-blue-400">
                    <SmsOutlinedIcon></SmsOutlinedIcon>
                  </span>
                  <div className="flex flex-col">
                    <h2 className="text-[18px]">Send Messages</h2>
                    <p className="text-[13px] text-gray-400">
                      Send messages to multiple Recruiters regarding candidate
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => handleMulipleActionClick("share-resume")}
                  className="hover:bg-gray-100 cursor-pointer rounded-md flex p-2 gap-6 items-center"
                >
                  <span className="text-orange-500">
                    <ShareOutlinedIcon
                      style={{ fontSize: "1.5rem" }}
                    ></ShareOutlinedIcon>
                  </span>
                  <div className="flex flex-col">
                    <h2 className="text-[18px]">Share With Hiring Manager</h2>
                    <p className="text-[13px] text-gray-400">
                      Share multiple candidates at once to multiple hiring
                      managers
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={handleExportData}
              className="flex cursor-pointer text-sm text-gray-800 items-center gap-2"
            >
              <span>
                <BackupTableIcon></BackupTableIcon>
              </span>
              <span>Export</span>
            </div>
          </div>
        </div>
        {dataView === "List" ? (
          <CandidateDataShow
            selectedRows={selectedCandidateRows}
            setSelectedRows={setSelectedCandidateRows}
            showNotification={showNotification}
            refetchCandidateData={fetchCandidateData}
            loader={candidateLoader}
            rows={candidaterows}
          ></CandidateDataShow>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <DragDropContainer
              showNotification={showNotification}
              refetchCandidateData={fetchCandidateData}
              loader={candidateLoader}
              candidateData={candidaterows}
            />
          </DndProvider>
        )}
      </div>
    </>
  );
}
