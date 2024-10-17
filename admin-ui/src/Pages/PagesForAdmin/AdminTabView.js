import React, { useState } from 'react';
import { Button } from '@mui/material';

const AdminTabView = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);  // Set the first tab as default

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="flex gap-0">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === tab.name ? '#315370' : '#e0e0e0',
              color: activeTab === tab.name ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: index === 0 
                ? '20px 0 0 20px'  // First tab rounded on the left
                : index === tabs.length - 1 
                ? '0 20px 20px 0'  // Last tab rounded on the right
                : '0',  // Middle tabs
              width: 'auto',
            }}
            onClick={() => handleTabChange(tab.name)}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      <div className='pt-9'>
        {tabs.map((tab, index) => (
          activeTab === tab.name && (
            <div key={index}>
              {tab.component}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default AdminTabView;
