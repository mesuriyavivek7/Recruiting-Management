
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

const AllEnterpriseData = () => {

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedManager, setSelectedManager] = useState('');

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
  };

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const products = [
    {
      _id: '1',
      full_name: "zigo",
      email: "xyz@gmail.com",
      mobile_no: 67656456447,
      company_name: "heryo",
      designation: "software development",
      company_size: 30,
      country: "India",
      state: "Gujrat",
      city: "Gandhinagar",
      email_verification: "yes",
    },
  ];

  const repeatedProducts = Array(10).fill(null).map((_, index) => ({
    ...products[0],
    _id: String(index + 1),
  }));

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display
  const paginatedRows = repeatedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     

      <Card className='mt-9 font-sans'>
        <h className='text-lg xl:text-2xl'>All Enterprise</h>
       
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
    Mobile No.
  </TableCell>
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Designation
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
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Email verification
  </TableCell>
</TableRow>

            </TableHead>
            <TableBody>
              {paginatedRows.map((item) => (
              
                <TableRow key={item._id}>
  <TableCell align="left" className="" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },cursor: 'pointer', }} onClick={() => handleClickOpen(item)}>
    {item._id}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.full_name}
  </TableCell>
  <TableCell align="left" component="th" scope="row" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.email}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.mobile_no}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.designation}
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
  
  <TableCell align="left" sx={{ textAlign: 'center', }}>
  <Button
    variant="contained" 
    sx={{
      fontSize: { xs: '12px', sm: '14px',  xl: '17px' },
      width: { xl:'90px',sm: '50px' }, 
      
      backgroundColor: item.email_verification === "yes" ? "green" : "red",
      color: "white",
      '&:hover': {
        backgroundColor: item.email_verification === "yes" ? "darkgreen" : "darkred",
      },
      textTransform: 'none',
    }}
  >
    {item.email_verification}
  </Button>
</TableCell>

</TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer> 
        
       
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{fontSize:{sm:'16px',xl:'20px'}}}>
        <DialogTitle sx={{fontSize:{sm:'20px',xl:'25px'},borderBottom: '2px solid black', // Add this line for the border
    paddingBottom: '8px', }}>Details for {selectedItem?.full_name}</DialogTitle>
        <DialogContent>
          <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
            <p className='pt-6 pl-3'><strong>Id:</strong> {selectedItem?._id}</p>
            <p><strong>Email:</strong> {selectedItem?.email}</p>
            <p><strong>Mobile No:</strong> {selectedItem?.mobile_no}</p>
            <p><strong>Company:</strong> {selectedItem?.company_name}</p>
            <p><strong>Designation:</strong> {selectedItem?.designation}</p>
            
            <p><strong>Company Size:</strong> {selectedItem?.company_size}</p>
            <p><strong>Country:</strong> {selectedItem?.country}</p>
            <p><strong>State:</strong> {selectedItem?.state}</p>
            <p><strong>City:</strong> {selectedItem?.city}</p>
            <p><strong>Email verification:</strong> {selectedItem?.email_verification}</p>
            
          </div>
          <FormControl fullWidth sx={{ mt: 6 }}>
              <InputLabel id="manager-select-label">Select Account Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                value={selectedManager}
                label="Select Account Manager"
                onChange={handleManagerChange}
              >
                <MenuItem value="Manager 1">Manager 1</MenuItem>
                <MenuItem value="Manager 2">Manager 2</MenuItem>
                <MenuItem value="Manager 3">Manager 3</MenuItem>
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!selectedManager}
            onClick={handleClose}
            sx={{ backgroundColor: selectedManager ? '#315370' : 'gray', color: 'white' }}
          >
            Assign
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        
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

export default AllEnterpriseData;
