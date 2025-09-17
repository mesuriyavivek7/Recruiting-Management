import React, { useState, useContext, useEffect } from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate } from "react-router-dom";
//import icons
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TrendingUp, Calendar, ChevronDown } from 'lucide-react';


import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Notification from "../components/Notification";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// charts
import Bar from "./Charts/Bar";
import PieLabel from "./Charts/PieLabel";
import Gauge from "./Charts/Gauge";
import RecruitmentPieChart from "./Charts/RecruitmentPieChart";

// dashboard components
import ScheduledInterviewsTable from "./Dashboard/ScheduledInterviewsTable";

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
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDatePicker && !event.target.closest('.date-picker-container')) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

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

      {/* Greeting And Motivationl Quote section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl mb-2 p-6 border border-blue-200">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back, {user?.full_name || 'User'}!
              </h1>
          </div>
          
          <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "Success in recruiting is not just about filling positions, it's about building careers and shaping futures. Every candidate you place is a life changed."
            </blockquote>
        </div>
      </div>
      
      {/* add section for charts */}

      {/* Date Range Filter */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="relative date-picker-container">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">
                {dateRange.startDate && dateRange.endDate 
                  ? `${dateRange.startDate} - ${dateRange.endDate}`
                  : 'Select Date Range'
                }
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[400px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setDateRange({ startDate: '', endDate: '' });
                        setShowDatePicker(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Clear
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        
        </div>
      </div>

      <div className="grid grid-cols-3 items-stretch gap-4 h-[400px]">
        {/* First Column - Achievement Cards */}
        <div className="flex flex-col gap-4 h-full">
          <div className="p-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 flex flex-col gap-4 flex-1">
             <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Congratulations Harsh Gajera 🎉</h1>
                <span className="text-gray-600 text-sm">Best Recruiter of the month</span>
             </div>
             <div className="flex flex-col gap-3">
               <div className="flex items-center justify-between">
                 <span className="text-2xl font-bold text-green-600">₹7,80,000</span>
                 <span className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">Revenue</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-2xl font-semibold text-blue-600">78%</span>
                 <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">Of Milestone</span>
               </div>
             </div>
          </div>

          <div className="p-6 rounded-lg bg-white border border-gray-200 flex flex-col gap-4 flex-1">
             <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-800">Weekly Overview</h1>
              <span className="text-gray-600 text-sm">Well Done Champ!</span>
             </div>
             <div className="flex flex-col gap-4">
               <h2 className="text-lg font-semibold text-gray-700">Your Performance</h2>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500 w-5 h-5"></TrendingUp>
                    <span className="text-2xl font-bold text-green-600">45%</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">Better This Week</span>
               </div>
             </div>
          </div>
        </div>

        {/* Second Column - Pie Chart */}
        <div className="h-full">
          <RecruitmentPieChart />
        </div>

        {/* Third Column - Stats and Gauge */}
        <div className="flex flex-col gap-4 h-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white flex p-6 justify-center flex-col gap-3 items-center rounded-lg border border-gray-200">
                <h1 className="text-4xl font-bold text-blue-600">7</h1>
                <span className="font-semibold text-gray-700 text-center">Offered Candidates</span>
            </div>
            <div className="bg-white flex p-6 justify-center flex-col gap-3 items-center rounded-lg border border-gray-200">
              <h1 className="text-3xl font-bold text-green-600">₹8,50,000</h1>
              <span className="font-semibold text-gray-700 text-center">Total Revenue</span>
            </div>
          </div>

          <div className="h-full">
            <Gauge></Gauge>
          </div>
        </div>

       </div>

      {/* Scheduled Interviews Table */}
      <div className="mt-8">
      <ScheduledInterviewsTable />
      </div>
  
    
      {/* Finish section*/}

     
      
    </div>
  );
}
