import React, { useEffect, useState } from "react";

//importing mui components
import { Button } from "@mui/material";


import { useParams } from "react-router-dom";

//importing components
import Notification from "../../../Components/Notification";
import JobDetails from "./JobDetails";
import AcceptedRecruiterMember from "../RecruitingAgency/AcceptedRecruiterMember";
import RequestedRecruiter from "./RequestedRecruiter";
import MappedRecruiterMember from "./MappedRecruiterMember";
import AllCandidateDataForEachJob from "../Job/AllCandidateDataForEachJob";
import axios from "axios";

function AcJob() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("Job");

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const [jobsCount, setJobsCount] = useState({
    candidateCount: 0,
    mappedRecruiterCount: 0,
    requestedRecruiterCount: 0,
    acceptedRecruiterCount: 0,
  });

  const [jobStatus,setJobStatus] = useState('Active')

  const getDashboardCounts = async ()=>{
    try{
       const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getdashboardcount/${id}`)
       console.log(response.data.data)
       setJobsCount(response.data.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getDashboardCounts()
  },[])

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        ></Notification>
      )}
      <div className="flex w-full h-full flex-col gap-4">
        <div className="py-4 flex justify-between w-full">
          <div className="flex gap-0">
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              variant="contained"
              disableElevation
              style={{
                backgroundColor: activeTab === "Job" ? "#315370" : "#e0e0e0",
                color: activeTab === "Job" ? "white" : "#000",
                fontSize: "16px",
                height: "50px",
                textTransform: "none",
                border: "2px solid white",
                borderRadius: "20px 0 0 20px", // Rounded left side
                width: "140px",
                marginRight: "-1px",
              }}
              onClick={() => setActiveTab("Job")}
            >
              Job Details
            </Button>

            {/* Candidate Button */}
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor:
                  activeTab === "Candidate" ? "#315370" : "#e0e0e0",
                color: activeTab === "Candidate" ? "white" : "#000",
                fontSize: "16px",
                textTransform: "none",
                height: "50px",
                border: "2px solid white",
                borderRadius: "0 0 0 0", // Rounded right side
                width: "auto",
              }}
              onClick={() => setActiveTab("Candidate")}
            >
              {jobsCount.candidateCount} Candidate
            </Button>

            {/* Accepted Recriuter Member */}
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor:
                  activeTab === "acceptedRe" ? "#315370" : "#e0e0e0",
                color: activeTab === "acceptedRe" ? "white" : "#000",
                fontSize: "16px",
                textTransform: "none",
                height: "50px",
                border: "2px solid white",
                borderRadius: "0 0 0 0", // Rounded right side
                width: "auto",
              }}
              onClick={() => setActiveTab("acceptedRe")}
            >
              {jobsCount.acceptedRecruiterCount} Accepted Recruiter
            </Button>

            {/* mapped Candidate Button */}
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor:
                  activeTab === "mRecruiter" ? "#315370" : "#e0e0e0",
                color: activeTab === "mRecruiter" ? "white" : "#000",
                border: "2px solid white",
                fontSize: "16px",
                textTransform: "none",
                height: "50px",
                borderRadius: "0 0 0 0", // Rounded right side
                width: "auto",
              }}
              onClick={() => setActiveTab("mRecruiter")}
            >
              {jobsCount.mappedRecruiterCount} Mapped Recruiter
            </Button>
            {/* Requested Candidate Button */}
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor:
                  activeTab === "rRecruiter" ? "#315370" : "#e0e0e0",
                color: activeTab === "rRecruiter" ? "white" : "#000",
                fontSize: "16px",
                textTransform: "none",
                border: "2px solid white",
                height: "50px",
                borderRadius: "0 20px 20px 0", // Rounded right side
                width: "auto",
              }}
              onClick={() => setActiveTab("rRecruiter")}
            >
              {jobsCount.requestedRecruiterCount} Requested Recruiter
            </Button>
          </div>
         
        </div>
        <div className="custom-shadow-1 overflow-scroll  bg-white h-full w-full rounded-md">
            {activeTab === "Job" && (
                <JobDetails />
            )}
            {activeTab === "Candidate" && (
              
                <AllCandidateDataForEachJob jobId={id} />
              
            )}
            {activeTab === "acceptedRe" && (
              
                <AcceptedRecruiterMember jobId={id}></AcceptedRecruiterMember>
              
            )}
            {activeTab === "mRecruiter" && (
              
                <MappedRecruiterMember
                  jobStatus={jobStatus}
                  jobId={id}
                  getDashboardCounts={getDashboardCounts}
                  showNotification={showNotification}
                ></MappedRecruiterMember>
              
            )}
            {activeTab === "rRecruiter" && (
              
                <RequestedRecruiter
                  jobId={id}
                  getDashboardCounts={getDashboardCounts}
                />
              
            )}
          </div>
      </div>
    </>
  );
}

export default AcJob;
