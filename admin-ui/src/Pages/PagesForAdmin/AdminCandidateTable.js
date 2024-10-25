import React, { useState } from 'react'

import { Button } from '@mui/material'
import AdminAllCandidateData from './Candidate/AdminAllCandidateData'

const AdminCandidateTable = () => {
    


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
    height:'50px',
    textTransform: 'none',
    borderRadius: '20px ',  // Fully rounded left side
    width: 'auto',
    height:'45px',
    marginRight: '-1px',  // To connect buttons in the middle
  }}
  onClick={() => handleTabChange('all')}
>
  All Candidates
</Button>


      </div>
      <div>
        {activeTab === 'all' && (
          <div>
          <AdminAllCandidateData/>
          </div>
        )}
       
      </div>
    </div>
  )
}

export default AdminCandidateTable
