
import React, { useState } from 'react';
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import NewEnterpriseData from './EnterpriseTable/NewEnterpriseData';
import AllEnterpriseData from './EnterpriseTable/AllEnterpriseData';



const EnterpriceTable = () => {

 


  const [activeTab, setActiveTab] = useState('all');

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className=''>
      <div className='flex gap-16'>
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
          width: '120px',
          marginRight: '10px', 
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
            width: '120px',
          }}
          onClick={() => handleTabChange('new')}
     
        >
          New
        </Button>
      </div>
      <div>
        {activeTab === 'all' && (
          <div>
          <AllEnterpriseData/>
          </div>
        )}
        {activeTab === 'new' && (
          <div>
          <NewEnterpriseData/>
          </div>
        )}
      </div>
    
{/* 
      <Card className='mt-7'>
        <CardHeader title="All New Enterprise" style={{ fontSize: '40px', fontWeight: 'bold' }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Email</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Mobile No.</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Designation</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Company Name</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Company Size</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Country</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">State</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">City</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }} align="left">Email verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="left" >{item._id}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.full_name}</TableCell>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: '20px',  }}>{item.email}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px', }}>{item.mobile_no}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.designation}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.company_name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.company_size}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.country}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px', }}>{item.state}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px',  }}>{item.city}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '17px', textAlign: 'center' }}>{item.email_verification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      
        
      </Card>
      <TablePagination
          component="div"
          count={repeatedProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Rows per page"
        /> */}
    </div>
  );
};

export default EnterpriceTable;
