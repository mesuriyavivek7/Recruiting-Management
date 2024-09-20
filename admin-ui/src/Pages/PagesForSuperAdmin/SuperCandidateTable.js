

import React, { useState } from 'react';
import { Button } from '@mui/material';
import AllCandidateData from './Candidate/AllCandidateData';
import NewCandidateData from './Candidate/NewCandidateData';

const SuperCandidateTable = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className='flex gap-0'>
        {/* All Candidates Button */}
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          variant="contained"
          style={{
            backgroundColor: activeTab === 'all' ? '#315370' : '#e0e0e0',
            color: activeTab === 'all' ? 'white' : '#000',
            fontSize: '16px',  
            height: '45px',  
            textTransform: 'none',
            borderRadius: '20px 0 0 20px',  
            width: '100px',  
            marginRight: '-1px',
          }}
          onClick={() => handleTabChange('all')}
        >
          All
        </Button>

        {/* Pending Verification Button */}
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
          style={{
            backgroundColor: activeTab === 'new' ? '#315370' : '#e0e0e0',
            color: activeTab === 'new' ? 'white' : '#000',
            fontSize: '16px',  
            height: '45px',  
            textTransform: 'none',
            borderRadius: '0 20px 20px 0', 
            width: 'auto',  
          }}
          onClick={() => handleTabChange('new')}
        >
          Pending Verification
        </Button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'all' && (
          <div>
            <AllCandidateData />
          </div>
        )}
        {activeTab === 'new' && (
          <div>
            <NewCandidateData />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperCandidateTable;
