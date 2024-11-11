import React, { useState } from 'react'
import { Button } from '@mui/material';

import { useLocation } from 'react-router-dom';
import EnterpriseDetails from './EnterpriseTable/EnterpriseDetails';
import EnterpriseJob from './EnterpriseTable/EnterpriseJob';
import EnterpriseTeam from './EnterpriseTable/EnterpriseTeam';

const AcEnterprise = () => {
  const location = useLocation();
  const { enterpriseDetails } = location.state || {}; // Access the passed state
  const [activeTab, setActiveTab] = useState('Enterprise Details');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>

      <div className='pt-6'>

        <div className="flex gap-0">

          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            variant="contained"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Enterprise Details' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Enterprise Details' ? 'white' : '#000',
              fontSize: '20px',
              height: '50px',
              textTransform: 'none',
              border: '2px solid white',
              borderRadius: '20px 0 0 20px',  // Rounded left side
              width: 'auto',
              marginRight: '-1px',
              whiteSpace: 'nowrap'
            }}
            onClick={() => handleTabChange('Enterprise Details')}
          >
            Enterprise Details
          </Button>

          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Team' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Team' ? 'white' : '#000',
              fontSize: '20px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('Team')}
          >
            Team
          </Button>

          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Jobs' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Jobs' ? 'white' : '#000',
              border: '2px solid white',
              fontSize: '20px',
              textTransform: 'none',
              height: '50px',
              borderRadius: '0 20px 20px 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('Jobs')}
          >
            Jobs
          </Button>

        </div>
        <div>
          {activeTab === 'Enterprise Details' && (
            <div className='pt-9'>
              <EnterpriseDetails enterpriseDetails={enterpriseDetails} />
            </div>
          )}
          {activeTab === 'Jobs' && (
            <div className='pt-9 '>
              <EnterpriseJob enterpriseDetails={enterpriseDetails} />
            </div>
          )}
          {activeTab === 'Team' && (
            <div className='pt-9 '>
              <EnterpriseTeam enterpriseDetails={enterpriseDetails} />
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default AcEnterprise
