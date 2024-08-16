
import React, { useState } from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Card,TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const AllRecruitingAgencyData = () => {

 

 

 
  const products = [
    {
      _id: '1',
      full_name: "zigo",
      email: "xyz@gmail.com",
      company_name: "heryo",
      company_size: 30,
      designation: "software development",
      Linkedin_url:"www.linkedin.com",
      interested_in:["Permanent Hiring"],
      country: "India",
      state: "Gujrat",
      city: "Gandhinagar",
      domains: ["IT Recruitment", "Executive Search", "Temporary Staffing",  { Education: "B.Tech" }],
      email_verified: "yes",
      pancard_no:"76556556655"
    },
  ];

  const repeatedProducts = Array(10).fill(null).map((_, index) => ({
    ...products[0],
    _id: String(index + 1),
  }));


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  
  const paginatedRows = repeatedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     
    
       
      <Card className='mt-9 font-sans'>
      <h className='text-lg xl:text-2xl '>All Recruiting Agency </h>
       
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
           
              <TableRow>
  <TableCell sx={{ fontSize: { xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
    ID
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
    Full Name
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} align="left">
    Email
  </TableCell>
 
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Designation
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Linkedin_url
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Interested_in
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Company Name
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Company Size
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Country
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    State
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    City
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Domains
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Email verified
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Pancard Number
  </TableCell>
</TableRow>

            </TableHead>
            <TableBody>
              {paginatedRows.map((item,index) => (
              
                <TableRow key={item._id} 
                >
  <TableCell align="left" className="" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },cursor: 'pointer', }}>
    {item._id}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.full_name}
  </TableCell>
  <TableCell align="left" component="th" scope="row" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.email}
  </TableCell>
 
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.designation}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.Linkedin_url}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.interested_in}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.company_name}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.company_size}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.country}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.state}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.city}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'},whiteSpace: 'nowrap' }}>
  {item.domains.map((domain, index) => (
    typeof domain === 'string' ? 
      <div key={index}>
        {domain}{index < item.domains.length - 1 ? ',' : ''}
      </div> : 
      Object.entries(domain).map(([key, value]) => (
        <div key={index}>
          {key}: {value}{index < item.domains.length - 1 ? ',' : ''}
        </div>
      ))
  ))}
  </TableCell>
  <TableCell align="left" sx={{ textAlign: 'center', }}>
  <Button
    variant="contained" 
    sx={{
      fontSize: { xs: '12px', sm: '14px',  xl: '17px' },
      width: { xl:'90px',sm: '50px' }, 
      
      backgroundColor: item.email_verified === "yes" ? "green" : "red",
      color: "white",
      '&:hover': {
        backgroundColor: item.email_verified === "yes" ? "darkgreen" : "darkred",
      },
      textTransform: 'none',
    }}
  >
    {item.email_verified}
  </Button>
</TableCell>
<TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.pancard_no}
  </TableCell>

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
        />
    </div>
  );
};

export default AllRecruitingAgencyData;
