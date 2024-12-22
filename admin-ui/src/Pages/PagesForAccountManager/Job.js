import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import JobDetails from './JobDetails';
import MappedRecruiterMember from './RecruitingAgency/MappedRecruiterMember';
import AllCandidateDataForEachJob from './Job/AllCandidateDataForEachJob';
import AcceptedRecruiterMember from './RecruitingAgency/AcceptedRecruiterMember';
import { fetchPostedCandidateProfileByJobId, fetchAcceptedRecruiterMemberIds, fetchMappedRecruiterMemberIds, fetchRequestedRecruiterIds } from '../../services/api';
import RequestedRecruiter from './RecruitingAgency/RequestedRecruiter';
import axios from 'axios'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Notification from '../../Components/Notification';

const Job = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Job');
  const [candidateCount, setCandidateCount] = useState(0);
  const [mappedRecruiterCount, setMappedRecruiterCount] = useState(0);
  const [requestedRecruiterCount, setRequestedRecruiterCount] = useState(0);
  const [acceptedRecruiterCount,setAcceptedRecruiterCount] = useState(0)
  const [jobStatus,setJobStatus] = useState('Active')
  const [inputJobStatus,setInputJobStatus] = useState(null)
  const [openChangeStatus,setOpenChangeStatus] = useState(false)


  const handleSetJobStatus = async () =>{
     try{
        const job_status = await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobstatus/${id}`)
        setJobStatus(job_status.data)
        setInputJobStatus(job_status.data)
     }catch(err){
       showNotification('There is something went wrong.','failure')
       console.log(err)
     }
  }

  const [notification, setNotification] = useState(null)

  //for showing notification
  const showNotification = (message, type) => {
      setNotification({ message, type })
  }


  const handleCandidateCount = async () => {
    const verifiedCandiatesIds = await fetchPostedCandidateProfileByJobId(id);
    setCandidateCount(verifiedCandiatesIds?.length);
  }

  const handleMappedRecruiterCount = async () => {
    const mappedRecruiterCount = await fetchMappedRecruiterMemberIds(id)
    setMappedRecruiterCount(mappedRecruiterCount?.length)
  }

  const handleRequestedRecruiterCount = async () => {
    const recruiterMemberIds = await fetchRequestedRecruiterIds(id);
    setRequestedRecruiterCount(recruiterMemberIds.length)
  }

  const handleAcceptedRecruiterCount = async () =>{
    const recruiterMemberIds = await fetchAcceptedRecruiterMemberIds(id)
    setAcceptedRecruiterCount(recruiterMemberIds.length)
  }

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

  useEffect(() => {
    handleCandidateCount();
    handleMappedRecruiterCount();
    handleRequestedRecruiterCount();
    handleAcceptedRecruiterCount();
    handleSetJobStatus()
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getJobStatusTheme = (jobStatus) =>{
       if(jobStatus==='Pending') return 'red'
       else if(jobStatus==="Active") return 'green'
       else if(jobStatus==="Hold") return 'orange'
       else if(jobStatus==='Close') return 'red'
  } 

  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
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
               <option value='Close'>Close</option>
            </select>
            <button onClick={handleChangeJobStatus} className='bg-blue-500 hover:bg-blue-600 rounded-md text-white w-32 p-1 text-base'>Change Status</button>
         </div>
      </div>
     }
      <div className='flex justify-between items-center'>
        <p className='text-xl font-medium'>Job ID: {id}</p>
        <div className='flex items-center gap-2'>
           <span className={`font-sans border border-${getJobStatusTheme(jobStatus)}-500 text-${getJobStatusTheme(jobStatus)}-500 font-semibold py-1 px-2.5 rounded-md`}>{jobStatus}</span>
           <button onClick={()=>setOpenChangeStatus(true)} className='bg-blue-500 hover:bg-blue-600 font-sans text-white py-1 px-2 rounded-md'>Change Status</button>
        </div>
      </div>
      
      <div className='pt-6'>

        <div className="flex gap-0">
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            variant="contained"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Job' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Job' ? 'white' : '#000',
              fontSize: '16px',
              height: '50px',
              textTransform: 'none',
              border: '2px solid white',
              borderRadius: '20px 0 0 20px',  // Rounded left side
              width: '140px',
              marginRight: '-1px',
            }}
            onClick={() => handleTabChange('Job')}
          >
            Job Details
          </Button>

          {/* Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Candidate' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Candidate' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('Candidate')}
          >
            {candidateCount} Candidate
          </Button>

          {/* Accepted Recriuter Member */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'acceptedRe' ? '#315370' : '#e0e0e0',
              color: activeTab === 'acceptedRe' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('acceptedRe')}
          >
            {acceptedRecruiterCount} Accepted Recruiter
          </Button>

          {/* mapped Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'mRecruiter' ? '#315370' : '#e0e0e0',
              color: activeTab === 'mRecruiter' ? 'white' : '#000',
              border: '2px solid white',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('mRecruiter')}
          >
            {mappedRecruiterCount} Mapped Recruiter
          </Button>
          {/* Requested Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'rRecruiter' ? '#315370' : '#e0e0e0',
              color: activeTab === 'rRecruiter' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              border: '2px solid white',
              height: '50px',
              borderRadius: '0 20px 20px 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('rRecruiter')}
          >
            {requestedRecruiterCount} Requested Recruiter
          </Button>
        </div>
        <div>
          {activeTab === 'Job' && (
            <div className='pt-9'>
              <JobDetails />
            </div>
          )}
          {activeTab === 'Candidate' && (
            <div className='pt-9 '>
              <AllCandidateDataForEachJob jobId={id} />
            </div>
          )}
          {activeTab === 'acceptedRe' && (
            <div className='pt-9 '>
               <AcceptedRecruiterMember jobId={id}></AcceptedRecruiterMember>
            </div>
          )}
          {activeTab === 'mRecruiter' && (
            <div className='pt-9 '>
              <MappedRecruiterMember jobStatus={jobStatus} jobId={id} handleMappedRecruiterCount={handleMappedRecruiterCount} handleRequestedRecruiterCount={handleRequestedRecruiterCount} showNotification={showNotification}></MappedRecruiterMember>
            </div>
          )}
          {activeTab === 'rRecruiter' && (
            <div className='pt-9 '>
              <RequestedRecruiter jobId={id} handleAcceptedRecruiterCount={handleAcceptedRecruiterCount} />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Job
