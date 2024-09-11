
import React, { useState } from 'react';
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

import AllRecruitingAgencyData from './RecruitingAgency/AllRecruitingAgencyData';




const SuperRecruitingAgencyTable = () => {

 


  const [activeTab, setActiveTab] = useState('all');

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className=''>
      <div className='flex gap-6'>
        <Button
          className='bg-blue-230 '
          id="demo-customized-button"
          aria-haspopup="true"
          variant="contained"
          
        
         style={{
          backgroundColor: activeTab === 'all' ? '#315370' : '#e0e0e0', 
          color: activeTab === 'all' ? 'white' : '#000', 
          fontSize: '16px',
          textTransform: 'none',
          borderRadius: '15px',
          width: '120px',
          marginRight: '10px',
          
        }}
        onClick={() => handleTabChange('all')}
        >
          All
        </Button>
      
      </div>
      <div>
        {activeTab === 'all' && (
          <div>
          <AllRecruitingAgencyData/>
          </div>
        )}
       
      </div>
    

    </div>
  );
};

export default SuperRecruitingAgencyTable;
