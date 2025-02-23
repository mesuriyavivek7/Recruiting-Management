import React, { useEffect, useState } from "react";

//importing mui components
import { Button } from "@mui/material";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
  const [inputJobStatus,setInputJobStatus] = useState(null)
  const [openChangeStatus,setOpenChangeStatus] = useState(false)

  const handleSetJobStatus = async () =>{
    try{
       const job_status = await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobstatus/${id}`)
       console.log("job status--->",job_status)
       setJobStatus(job_status.data)
       setInputJobStatus(job_status.data)
    }catch(err){
      showNotification('There is something went wrong.','failure')
      console.log(err)
    }
 }

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
    handleSetJobStatus()
    getDashboardCounts()
  },[])


  const handleChangeJobStatus = async ()=>{
    if(inputJobStatus){
     try{
       await axios.put(`${process.env.REACT_APP_API_APP_URL}/job/changejobstatus/${id}/${inputJobStatus}`)
       setInputJobStatus('')
       await handleSetJobStatus()
       setOpenChangeStatus(false)
       showNotification("Successfully job status changed.",'success')
     }catch(err){
       showNotification("Something went wrong while changing status.",'failure')
       console.log(err)
     }
   }
 }
  
  const getJobStatusTheme = (jobStatus) =>{
    if(jobStatus==='Pending') return 'red'
    else if(jobStatus==="Active") return 'green'
    else if(jobStatus==="Hold") return 'orange'
    else if(jobStatus==='Close') return 'red'
} 

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        ></Notification>
      )}
      {
      openChangeStatus && 
      <div className='fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-40'>
         <div className='shadow bg-white p-3 flex flex-col gap-5 w-[30%] rounded-md'>
            <div className='flex items-center gap-1'>
              <span className='cursor-pointer' onClick={()=>setOpenChangeStatus(false)}><ArrowBackIosIcon style={{fontSize:'1.2rem'}}></ArrowBackIosIcon></span>
              <span className='text-lg font-sans'>Select Status</span>
            </div>
            <select onChange={(e)=>setInputJobStatus(e.target.value)} value={inputJobStatus} className='border p-1 outline-none'>
               <option value='Active'>Active</option>
               <option value='Hold'>Hold</option>
               <option value="Close">Close</option>
            </select>
            <button onClick={handleChangeJobStatus} className='bg-blue-500 hover:bg-blue-600 rounded-md text-white w-32 p-1 text-base'>Change Status</button>
         </div>
      </div>
     }
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
          <div className='flex items-center gap-2'>
           <span className={`font-sans border border-${getJobStatusTheme(jobStatus)}-500 text-${getJobStatusTheme(jobStatus)}-500 font-semibold py-1 px-2.5 rounded-md`}>{jobStatus}</span>
           <button onClick={()=>setOpenChangeStatus(true)} className='bg-blue-500 hover:bg-blue-600 font-sans text-white py-1 px-2 rounded-md'>Change Status</button>
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
