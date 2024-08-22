

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
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

const NewRecruitingAgencyData = () => {

  const [open, setOpen] = useState(false);
  const myValue=useSelector((state) => state.admin);
  
  const [recruitingAgency,setRecruitingAgency]=useState([])
  
   
  const fetchRecruitingAgency=async ()=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/acmanagerpending`)
      setRecruitingAgency(res.data)
    }catch(err){

    }
 }
    useEffect(()=>{
        fetchRecruitingAgency()
    },[])
  


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (item) => {
    setSelectedRow(item);  
    setOpen(true); 
  };
  console.log(recruitingAgency)
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null)
  };

  // Calculate the rows to display
  const paginatedRows = recruitingAgency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     

      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>New Recruiting Agency</p>
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
              {paginatedRows.map((item) => (
              
                <TableRow key={item._id}  onClick={() => handleRowClick(item)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
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
    {item.linkedin_url}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.firm_type}
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
  <span
   className={`${item.email_verified?("bg-green-400"):("bg-red-400")} px-6 py-4 rounded-lg text-white`}
  >
    {(item.email_verified)?("Yes"):("No")}
  </span>
</TableCell>
<TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.kyc_details.pancard_number}
  </TableCell>

</TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer> 
        
       {selectedRow && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{fontSize:{sm:'16px',xl:'20px'}}}>
        <DialogTitle sx={{fontSize:{sm:'20px',xl:'25px'},borderBottom: '2px solid black', // Add this line for the border
    paddingBottom: '8px', }}>Details for {selectedRow?.full_name}</DialogTitle>
        <DialogContent>
          <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
            <p className='pt-6 pl-3'><strong>Id:</strong> {selectedRow?._id}</p>
            <p><strong>Email:</strong> {selectedRow?.email}</p>
            <p><strong>Company:</strong> {selectedRow?.company_name}</p>
    
            
            <p><strong>Company Size:</strong> {selectedRow?.company_size}</p>
              <p><strong>Designation:</strong> {selectedRow?.designation}</p>
                <p><strong>Linkedin URL:</strong> {selectedRow?.Linkedin_url}</p>
                  <p><strong>Interested in:</strong> {selectedRow?.interested_in}</p>
            <p><strong>Country:</strong> {selectedRow?.country}</p>
            <p><strong>State:</strong> {selectedRow?.state}</p>
            <p><strong>City:</strong> {selectedRow?.city}</p>
              <p><strong>Domains:</strong> {selectedRow?.domains.map((domain, index) => (
    typeof domain === 'string' ? 
      <div key={index}>
        {domain}{index < selectedRow.domains.length - 1 ? ',' : ''}
      </div> : 
      Object.entries(domain).map(([key, value]) => (
        <div key={index}>
          {key}: {value}{index < selectedRow.domains.length - 1 ? ',' : ''}
        </div>
      ))
  ))}</p>
            <p><strong>Email verified:</strong> {selectedRow?.email_verified}</p>
              <p><strong>Pancard Number:</strong> {selectedRow?.kyc_details.pancard_number}</p>
            
          </div>
          <div className='pt-3'>
    <strong className='bg-green-400 p-1 rounded-sm'>PAN Card Document:</strong> 
    {selectedRow?.pancard_document && (
        <>
          
            <div className="hidden lg:block pt-2">
                <embed 
                    src={selectedRow.pancard_document} 
                    type="application/pdf" 
                    className="w-full"
                    style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '200px',  
                        cursor: 'pointer',
                        objectFit: 'cover',   
                    }}
                />
            </div>
           
          
           
            <a 
                href={selectedRow.pancard_document} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-230 underline mt-2 inline-block sm:pl-6 xl:pl-0"
            >
                View Full Document (PDF)
            </a>
        </>
    )}
</div>
          
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
           
            onClick={handleClose}
            sx={{ backgroundColor:  '#315370', color: 'white',
              '&:hover': {
                backgroundColor: 'gray',
              },
             }}
          >
            Approve
          </Button>
        
        </DialogActions>
      </Dialog>
        )}
      </Card>
      <TablePagination
          component="div"
          count={recruitingAgency.length}
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

export default NewRecruitingAgencyData;
