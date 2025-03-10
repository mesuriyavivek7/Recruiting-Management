import React, { useState, useContext, useEffect } from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate } from "react-router-dom";
//import icons
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Notification from "../components/Notification";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// charts
import Bar from "./Charts/Bar";
import PieLabel from "./Charts/PieLabel";
import Gauge from "./Charts/Gauge";

// Charts Data

export default function RecruiterDashboard() {
  const { user, isVerified } = useContext(AuthContext);
  const [teamFormData, setTeamFormData] = useState({
    full_name: "",
    email: "",
    mobileno: "",
    hide_commision: false,
  });
  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);

  const [errors, setErrors] = useState({});
  const [teamLoad, setTeamLoad] = useState(false);
  const [notification, setNotification] = useState(null);

  const [dashBoardCount, setDashBoardCount] = useState({
    job_accepted_count: 0,
    submited_candidate_profile_count: 0,
    pending_candidate_count: 0,
  });

  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const handleCheckIsMailVerified = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkisverifiedmail/${user._id}`
      );
      setIsEmailVerified(res.data);
    } catch (err) {
      console.error(err);
      showNotification("Something went wrong.", "failure");
    }
  };

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleTeamFormData = (e) => {
    const { name, value } = e.target;
    setTeamFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateTeamFormData = () => {
    let newErrors = {};
    if (teamFormData.full_name === "")
      newErrors.full_name = "Name is required.";
    if (teamFormData.email === "")
      newErrors.email = "Email address is required.";
    if (teamFormData.mobileno === "")
      newErrors.mobileno = "Mobile No is required.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTeamDataSubmit = async () => {
    if (validateTeamFormData()) {
      try {
        //make request for creating new team member
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/recruitingteam`,
          {
            recruiting_agency_id: user.recruiting_agency_id,
            full_name: teamFormData.full_name,
            email: teamFormData.email,
            mobileno: teamFormData.mobileno,
            hide_commision: teamFormData.hide_commision,
          }
        );

        //send notify mail to team member
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/mail/sendteammember`,
          {
            to: teamFormData.email,
            name: teamFormData.full_name,
            inviter_name: user.full_name,
          }
        );

        //send verify mail
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationrecruitingteam`,
          { email: teamFormData.email, name: teamFormData.full_name }
        );

        teamFormData.full_name = "";
        teamFormData.email = "";
        teamFormData.mobileno = "";
        showNotification("Successfully new team member added.", "success");
        setOpenPopUp(false);
      } catch (err) {
        let newErrors = {};
        newErrors.internalError = "There is somethign wrong..!";
        setErrors(newErrors);
        showNotification(
          "There is somthing wrong for adding new team member.",
          "failure"
        );
      }
      setTeamLoad(false);
    }
  };

  const checkCreadentials = async () => {
    if (validateTeamFormData()) {
      setTeamLoad(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkcredentials`,
          { mobileno: teamFormData.mobileno, email: teamFormData.email }
        );
        console.log(res);
        if (res.data) {
          setTeamLoad(false);
          showNotification(
            "Entered mobile no or email adress is alredy exist.",
            "failure"
          );
        } else {
          await handleTeamDataSubmit();
        }
      } catch (err) {
        console.log(err);
        showNotification(
          "Something went wrong while adding new team member.",
          "failure"
        );
        setTeamLoad(false);
      }
      setTeamLoad(false);
    }
  };

  //fetch Dashboard count
  const fetchDashBoardCount = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recruitingteam/getdashboardcount/${user._id}`
      );
      if (res.data) setDashBoardCount(res.data);
    } catch (err) {
      console.log(err);
      showNotification("Something went wrong..!", "failure");
    }
  };

  const handleResendVerificationMail = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/mail/sendverificaitionrecruiting`,
        { name: user.full_name, email: user.email }
      );
      showNotification("Successfull verification mail sended.", "success");
    } catch (err) {
      console.error(err);
      showNotification("Something went wrong.", "failure");
    }
  };

  useEffect(() => {
    fetchDashBoardCount();
    handleCheckIsMailVerified();
  }, []);

  const handleNavigateCandidate = () => {
    navigate("/recruiter/candidate");
  };

  return (
    <div className="flex flex-col gap-2">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        ></Notification>
      )}
      {openPopUp && (
        <div className="fixed inset-0 z-10 flex justify-center bg-opacity-50 backdrop-blur-md bg-black items-center">
          <div className="rounded-md overflow-hidden border-gray-100 border-1 max-w-md w-full">
            <div className="relative w-full bg-white py-2">
              <span
                className="absolute cursor-pointer flex items-center text-green-600 text-sm left-2 top-4"
                onClick={() => setOpenPopUp(false)}
              >
                <ArrowBackIosIcon
                  style={{ fontSize: "1rem" }}
                ></ArrowBackIosIcon>
                Back
              </span>
              <h1 className="text-2xl text-center text-gray-900">
                Add Team Member
              </h1>
            </div>
            <div className="p-4 bg-white-400">
              <div className="custom-div gap-4 pb-4">
                <div className="flex relative w-full flex-col gap-2">
                  <label htmlFor="name" className="input-label">
                    Enter Name <span className="text-green-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    name="full_name"
                    value={teamFormData.full_name}
                    onChange={handleTeamFormData}
                  ></input>
                  {errors.full_name && (
                    <p className="text-xs text-red-400">{errors.full_name}</p>
                  )}
                </div>
                <div className="flex relative w-full flex-col gap-2">
                  <label htmlFor="email" className="input-label">
                    Enter Email <span className="text-green-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={teamFormData.email}
                    onChange={handleTeamFormData}
                    className="input-field"
                  ></input>
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
                <div className="flex relative w-full flex-col gap-2">
                  <label className="input-label" htmlFor="primarycontactnumber">
                    Enter Phone Number <span className="text-green-400">*</span>
                  </label>
                  <PhoneInput
                    value={teamFormData.mobileno}
                    country={"in"}
                    onChange={(phone) =>
                      setTeamFormData((prevData) => ({
                        ...prevData,
                        mobileno: phone,
                      }))
                    }
                    containerStyle={{ width: "100%" }}
                  />
                  {errors.mobileno && (
                    <p className="text-xs text-red-400">{errors.mobileno}</p>
                  )}
                </div>
                <div className="flex items-center mt-2 relative w-full gap-2">
                  <div
                    className={`w-12 h-6  flex items-center rounded-full p-1 cursor-pointer ${
                      teamFormData.hide_commision
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                    onClick={() =>
                      setTeamFormData((prevData) => ({
                        ...prevData,
                        ["hide_commision"]: !prevData.hide_commision,
                      }))
                    }
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        teamFormData.hide_commision
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <label className="input-label">
                    Hide Commission <span className="text-green-400">*</span>
                  </label>
                </div>
                <button
                  disabled={teamLoad}
                  onClick={checkCreadentials}
                  className="w-full relative text-white py-1 mt-2 hover:bg-blue-400 rounded-sm bg-blue-700 disabled:bg-slate-600 disabled:cursor-no-drop"
                >
                  {teamLoad && (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white animate-spin"
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
                    </span>
                  )}
                  {!teamLoad && "Add Member"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isVerified && (
        <div className="custom-div py-3">
          <p className="text-[15px] tracking-wide text-gray-500 flex items-center">
            <span className="text-yellow-500 mr-2">
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </span>
            Your account is now active with limited access to the dashboard.
            Full access will be granted after an admin verifies your profile
            details, which usually takes 2-3 business days.
          </p>
        </div>
      )}
      {!isEmailVerified && (
        <div className="custom-div py-3">
          <p className="text-[15px] tracking-wide text-gray-500 flex items-center">
            <span className="text-yellow-500 mr-2">
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </span>
            Your account is not verified. Please check your email and click the
            verification link to verified your email id. If you haven't received
            the email, click here to{" "}
            <span
              onClick={handleResendVerificationMail}
              className="underline underline-offset-1 cursor-pointer hover:text-blue-400 ml-1"
            >
              resend it
            </span>
            .
          </p>
        </div>
      )}
      <div className="custom-div py-4 flex flex-row items-center justify-between">
        <div className="flex gap-4 text-gray-600 items-center">
          <span className="text-sm cursor-pointer">My Dashboard</span>
          <VideocamOutlinedIcon
            style={{ fontSize: "1.4rem" }}
            className="cursor-pointer"
          ></VideocamOutlinedIcon>
        </div>
        <div className="flex gap-6">
          <button className="text-gray-600 cursor-pointer flex gap-2  items-center">
            <span>
              <BackupTableOutlinedIcon
                style={{ fontSize: "1.4rem" }}
              ></BackupTableOutlinedIcon>
            </span>
            <span className="text-sm">Export</span>
          </button>
          <button className="text-gray-600 cursor-pointer flex gap-2  items-center">
            <span>
              <ArticleOutlinedIcon
                style={{ fontSize: "1.4rem" }}
              ></ArticleOutlinedIcon>
            </span>
            <span className="text-sm">Guidelines</span>
          </button>
          <button
            onClick={() => setOpenPopUp(true)}
            className="text-gray-600 cursor-pointer flex gap-2 items-center"
          >
            <span>
              <AddIcon style={{ fontSize: "1.4rem" }}></AddIcon>
            </span>
            <span className="text-sm">Add Member</span>
          </button>
        </div>
      </div>

      {/* add section for charts */}

      <div className="custom-div py-2 gap-4">
        <h1 className="text-xl font-bold">Key Indicators</h1>
        <div className="w-full flex gap-4 pb-2">

          <div className="relative custom-div gap-12 flex-1">
            <h1 className="font-medium">Relevency Relation</h1>
            <div className="absolute top-28 left-10">
              <span className="text-sm text-red-600">Low</span>
            </div>
            <div className="absolute left-36 top-14">
              <span className="text-sm text-green-600">Medium</span>
            </div>
            <div className="absolute bottom-20 right-8">
              <span className="text-sm text-blue-500">Good</span>
            </div>
            <div className="h-28">
              <Gauge></Gauge>
            </div>
          </div>

          <div className="flex-1 h-64 flex justify-center items-center shadow p-4">
            <Bar></Bar>
          </div>

          <div className="h-64 flex-1 p-4 shadow">
            <PieLabel></PieLabel>
          </div>
        </div>
      </div>
      {/* Finish section*/}

      <div className="custom-div py-4 gap-4">
        <h1>Jobs</h1>
        <div className="w-full flex gap-4">
          <div
            onClick={handleNavigateCandidate}
            className="cursor-pointer custom-div flex-1"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <h1 className="text-black-200 text-2xl">
                  {dashBoardCount.job_accepted_count}
                </h1>
              </div>
              <p className="text-sm text-gray-400">Accepted</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div
            onClick={handleNavigateCandidate}
            className="cursor-pointer custom-div  flex-1"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                <h1 className="text-black-200 text-2xl">
                  {dashBoardCount.submited_candidate_profile_count}
                </h1>
              </div>
              <p className="text-sm text-gray-400">Resume Submitted</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div
            onClick={handleNavigateCandidate}
            className="cursor-pointer custom-div flex-1"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-orange-200 rounded-full"></div>
                <h1 className="text-black-200 text-2xl">
                  {dashBoardCount.pending_candidate_count}
                </h1>
              </div>
              <p className="text-sm text-gray-400">Pending Acceptance</p>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-div py-4 gap-4">
        <h1>Resumes</h1>
        <div className="w-full flex gap-4">
          <div className="custom-div flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                <h1 className="text-2xl">0</h1>
              </div>
              <p className="text-sm text-gray-400">
                Total Resumes <br></br>(No Duplicates)
              </p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div className="custom-div flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <h1 className="text-2xl">0</h1>
              </div>
              <p className="text-sm text-gray-400">New Resumes</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div className="custom-div flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <h1 className="text-2xl">0</h1>
              </div>
              <p className="text-sm text-gray-400">Under Process</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div className="custom-div flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-violet-400 rounded-full"></div>
                <h1 className="text-2xl">0</h1>
              </div>
              <p className="text-sm text-gray-400">Selected</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
          <div className="custom-div flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                <h1 className="text-2xl">0</h1>
              </div>
              <p className="text-sm text-gray-400">Rejected</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Active</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>0</span>
                <span className="text-gray-400 text-[.8rem]">Paused</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
