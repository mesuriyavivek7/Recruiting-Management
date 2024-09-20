import React, { useState } from 'react'

import { Button } from '@mui/material'
import AllCandidateData from './Candidate/AllCandidateData'
import NewCandidateData from './Candidate/NewCandidateData'
const AccountCandidateTable = () => {
    


  const [activeTab, setActiveTab] = useState('all');

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
       <div className='flex '>
       <Button
  className='bg-blue-230'
  id="demo-customized-button"
  aria-haspopup="true"
  variant="contained"
  style={{
    backgroundColor: activeTab === 'all' ? '#315370' : '#e0e0e0',
    color: activeTab === 'all' ? 'white' : '#000',
    fontSize: '16px',
    textTransform: 'none',
    borderRadius: '20px 0 0 20px',  // Fully rounded left side
    width: '120px',
    marginRight: '-1px',  // To connect buttons in the middle
    height:'45px',
  }}
  onClick={() => handleTabChange('all')}
>
  All
</Button>

<Button
  id="demo-customized-button"
  aria-haspopup="true"
  disableElevation
  style={{
    backgroundColor: activeTab === 'new' ? '#315370' : '#e0e0e0',
    color: activeTab === 'new' ? 'white' : '#000',
    fontSize: '16px',
    textTransform: 'none',
    borderRadius: '0 20px 20px 0',  // Fully rounded right side
    width: 'auto',
    height:'45px',
  }}
  onClick={() => handleTabChange('new')}
>
  Pending Verification
</Button>
      </div>
      <div>
        {activeTab === 'all' && (
          <div>
          <AllCandidateData/>
          </div>
        )}
        {activeTab === 'new' && (
          <div>
          <NewCandidateData/>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountCandidateTable