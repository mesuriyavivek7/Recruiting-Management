

import React, { useState } from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Card,TablePagination,
  Dialog, DialogTitle, DialogContent,DialogContentText,TextField, DialogActions, FormControl, InputLabel, Select, MenuItem
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
 
  const [selectedManager, setSelectedManager] = useState('');
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState("");


  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };
 


  
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
      pancard_no:"76556556655",
      created_at:'22-10-2022',
      account_status:'Active',
      action:'Activate',
      pancard_document:'https://t4.ftcdn.net/jpg/02/45/03/61/360_F_245036112_Lf5C4B2zfWbVGoF1rHAj7IFdLFiSXDQj.jpg'
    },
  ];

  const repeatedProducts = Array(10).fill(null).map((_, index) => ({
    ...products[0],
    _id: String(index + 1),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectInactive,setSelectInactive]=useState(null)
  const handleInactivateButton =(e,item) => {  
    e.stopPropagation();  
    setSelectInactive(item)
     if(item.account_status==="Active"){
      setOpenpopup(true);
   
    }else{
      console.log("Request gone")
      handleSubmitButton()
      console.log("Status changed")
      
    }
  };
  const handleCloseInactivateButton = () => {
    setSelectInactive(null)
    setOpenpopup(false);
  };
  const handleSubmitButton =async  () => {
    console.log("Submit button clicked")
    // Handle the reason submission logic here
  
      //please change here admin id with my_value id
      try{
        console.log(selectInactive)
       // await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`,{id:selectInactive._id,status:selectInactive.account_status.status,reason,admin_id:'66befbd900f8f947fb41fc91'})
        console.log("Status request get")
       // fetchEnterprise()
        setOpenpopup(false);
      }catch(err){

      }
  };


    

 
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

  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
    setSelectedRow(null)
  };

  // Calculate the rows to display
  const paginatedRows = repeatedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     

      <Card className='mt-9 font-sans'>
        <h className='text-lg xl:text-2xl'>New Recruiting Agency</h>
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
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Created At
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Account Status
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Action
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
  
  <h1 className={`px-2 py-2 rounded-2xl text-sm text-white  ${(item.email_verified)?("bg-green-500"):"bg-red-500"} `} >
  {(item.email_verified)?"Yes":"No"}
  </h1>
</TableCell>
<TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.pancard_no}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.created_at}
  </TableCell>
  <TableCell align="left"  sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },textAlign: "center" }}>
    <h1 className={`px-2 py-2 rounded-2xl text-sm text-white ${(item.account_status==="Active")?("bg-green-500"):"bg-red-500"}`}>{item.account_status}</h1>
  </TableCell>
  
  
                  <TableCell align="left" sx={{ textAlign: "center" }}>
                    <Button  onClick={(e)=>handleInactivateButton(e,item)}
                      variant="contained"
                      sx={{
                        fontSize: { xs: "12px", sm: "16px", xl: "18px" },
                        width: { xl: "120px", sm: "120px" },

                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                      }}
                    >
                      {item.action}
                    </Button>
                  </TableCell>

</TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer> 
        <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
        <DialogTitle>Inactivate Enterprise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason why you want to inactivate this account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInactivateButton} sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "80px", sm: "40px" },
                        color:'white',
                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                      }}>
            Cancel
          </Button>
          <Button   onClick={handleSubmitButton} sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "80px", sm: "40px" },
                       color:'white',
                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                      }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        
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
              <p><strong>Pancard Number:</strong> {selectedRow?.pancard_no}</p>
              <p>
                    <strong>PAN Card Document:</strong> 
                    {selectedRow?.pancard_document && (
                        <div className="mt-2">
                            {selectedRow.pancard_document.endsWith('.pdf') ? (
                                <a 
                                    href={selectedRow.pancard_document} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500"
                                >
                                    View PAN Card Document (PDF)
                                </a>
                            ) : (
                                <img 
                                    src={selectedRow.pancard_document} 
                                    alt="PAN Card" 
                                    className="w-full h-auto mt-2"
                                />
                            )}
                        </div>
                    )}
                </p>
            
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
        )}
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

export default NewRecruitingAgencyData;
