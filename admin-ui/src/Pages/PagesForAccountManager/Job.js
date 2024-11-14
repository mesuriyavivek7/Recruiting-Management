
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import AllCandidateData from './Candidate/AllCandidateData';
import JobDetails from './JobDetails';
import MappedCandidateData from './Candidate/MappedCandidateData ';
import RequestedCandidateData from './Candidate/RequestedCandidateData ';
const Job = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Job');
    const [jobCount, setJobCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [mappedRecruiterCount, setMappedRecruiterCount] = useState(0);
  const [requestedRecruiterCount, setRequestedRecruiterCount] = useState(0);
  useEffect(() => {
    
    setJobCount(1);
    setCandidateCount(100); 
    setMappedRecruiterCount(40); 
    setRequestedRecruiterCount(20); 
  }, []);
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  return (
    <div>
    <p className='text-xl font-medium'>Job ID:{id}</p>
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
            height:'50px',
            textTransform: 'none',
            border: '2px solid white', 
            borderRadius: '20px 0 0 20px',  // Rounded left side
            width: '120px',
            marginRight: '-1px',
          }}
          onClick={() => handleTabChange('Job')}
        >
          {jobCount} Job
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
             height:'50px',
             border: '2px solid white', 
            borderRadius: '0 0 0 0',  // Rounded right side
            width: 'auto',
          }}
          onClick={() => handleTabChange('Candidate')}
        >
          {candidateCount} Candidate
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
             height:'50px',
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
             height:'50px',
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
        <JobDetails/>
        </div>
      )}
      {activeTab === 'Candidate' && (
        <div className='pt-9 '>
        <AllCandidateData/>
        </div>
      )}
       {activeTab === 'mRecruiter' && (
        <div className='pt-9 '>
        <MappedCandidateData/>
        </div>
      )}
       {activeTab === 'rRecruiter' && (
        <div className='pt-9 '>
        <RequestedCandidateData/>
        </div>
      )}
    </div>

    </div>
  </div>
  )
}

export default Job
