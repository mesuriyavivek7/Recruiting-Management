
import React, { useState } from 'react';
import {  Button } from '@mui/material';



import AdminAllJobData from './Job/AdminAllJobData';




const AdminJobTable = () => {

 


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
    borderRadius: '20px',
    height:'45px',  // Fully rounded left side
    width: '120px',
    marginRight: '-1px',  // To connect buttons in the middle
  }}
  onClick={() => handleTabChange('all')}
>
  All Jobs
</Button>


      </div>
      <div>
        {activeTab === 'all' && (
          <div className=''>
          <AdminAllJobData/>
          </div>
        )}
      
      </div>
    

    </div>
  );
};

export default AdminJobTable;
