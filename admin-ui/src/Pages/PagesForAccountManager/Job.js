import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import JobDetails from './JobDetails';
import AccountCandidateTable from './AccountCandidateTable';
import { Button } from '@mui/material';
import AllCandidateData from './Candidate/AllCandidateData';

const Job = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Job');

 
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  return (
    <div>
    <p className='text-xl font-medium'>Job ID:{id}</p>
    <div className='pt-6'> 

    <div className="flex gap-0">
  <Button
    className="bg-blue-230"
    id="demo-customized-button"
    aria-haspopup="true"
    variant="contained"
    style={{
      backgroundColor: activeTab === 'Job' ? '#315370' : '#e0e0e0',
      color: activeTab === 'Job' ? 'white' : '#000',
      fontSize: '16px',
      textTransform: 'none',
      borderRadius: '0 0 0 0', 
      width: '120px',
      marginRight: '-1px',
    }}
    onClick={() => handleTabChange('Job')}
  >
    Job
  </Button>
  <Button
    id="demo-customized-button"
    aria-haspopup="true"
    disableElevation
    style={{
      backgroundColor: activeTab === 'Candidate' ? '#315370' : '#e0e0e0',
      color: activeTab === 'Candidate' ? 'white' : '#000',
      fontSize: '16px',
      textTransform: 'none',
      borderRadius: '0 0 0 0', 
      width: '120px',
    }}
    onClick={() => handleTabChange('Candidate')}
  >
    Candidate
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
    </div>

    </div>
  </div>
  )
}

export default Job
