
import React, { useState } from 'react';
import {  Button } from '@mui/material';

import NewEnterpriseData from './EnterpriseTable/NewEnterpriseData';
import AllEnterpriseData from './EnterpriseTable/AllEnterpriseData';



const EnterpriceTable = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=''>
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
            height: '45px',
            borderRadius: '20px 0 0 20px',  // Fully rounded left side
            width: '120px',
            marginRight: '-1px',  // To connect buttons in the middle
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
            height: '45px',
            borderRadius: '0 20px 20px 0',  // Fully rounded right side
            width: 'auto',
          }}
          onClick={() => handleTabChange('new')}
        >
          Pending Verification
        </Button>
      </div>
      <div >
        {activeTab === 'all' && (
          <div className='pt-8'>
            <AllEnterpriseData />
          </div>
        )}
        {activeTab === 'new' && (
          <div className='pt-8'>
            <NewEnterpriseData />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriceTable;
