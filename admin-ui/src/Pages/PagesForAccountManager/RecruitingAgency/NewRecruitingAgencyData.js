

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Card,TablePagination,
  Dialog, DialogTitle, TextField,DialogContentText,DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Notification from '../../../Components/Notification';


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
  const [selectInactive,setSelectInactive]=useState(null)
  const [notification,setNotification]=useState(null)

  //for submit reason
  const [reason,setReason]=useState('')
  const [openpopup,setOpenpopup]=useState(false)
  
   
  const fetchRecruitingAgency=async ()=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/acmanagerpending/${myValue.userData._id}`)
      setRecruitingAgency(res.data)
    }catch(err){
      showNotification("There is somethig wrong while fetching data")
    }
 }



  useEffect(()=>{
        fetchRecruitingAgency()
  },[])
  console.log(recruitingAgency)
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFormateDate=(cdate)=>{
    let d=new Date(cdate)
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
 }

 const handleInactivateButton=async (e,item)=>{
       e.stopPropagation();  
       if(item.account_status.status==="Active"){
        setSelectInactive(item)
        setOpenpopup(true);
      }else{
        try{
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`,{id:item._id,status:item.account_status.status,reason,admin_id:myValue.userData._id})
        showNotification("Successfully account status changed.","success")
        fetchRecruitingAgency()
        }catch(err){
          showNotification("Something went wrong in account status changeing...!","failure")
        }
      }
 }

 const handleSubmitButton=async ()=>{
     try{
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`,{id:selectInactive._id,status:selectInactive.account_status.status,reason,admin_id:myValue.userData._id})
      fetchRecruitingAgency()
      setOpenpopup(false)
      showNotification("Successfully Recruiting agency status changed.....!","success")
     }catch(err){
      showNotification("There is somethong wrong in account status change","failure")
     }
 }


 const handleCloseInactivateButton=()=>{
    setSelectInactive(null)
    setOpenpopup(false)

 }

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (item) => {
    setSelectedRow(item);  
    setOpen(true); 
  };
  
  const handleApprove=async ()=>{
    try{
      //get verified recruiting agency to account manager
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/acverified`,{id:selectedRow._id})

      //add recruiting agency into verified list
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addverifiedrecruiting`,{m_id:myValue.userData._id,ra_id:selectedRow._id})
      fetchRecruitingAgency()
      handleClose()
      showNotification("Successfully recruiting agency verified.","success")
    }catch(err){
      showNotification("There is something wrong....!","failure")
    }
  }


  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null)
  };


  // Calculate the rows to display
  const paginatedRows = recruitingAgency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     
     {
        notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>
     }
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
  <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Entity Type
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
    <div className='flex flex-wrap'>
    {item.domains.map((domain, index) => (
       <div className='bg-gray-100 m-0.5 p-1.5 text-xs rounded-lg' key={index}>{domain}</div>
    ))}
    </div>
  </TableCell>
  <TableCell align="left" sx={{ textAlign: 'center', }}>
  <span
   className={`${item.email_verified?("bg-green-400"):("bg-red-400")} px-6 py-2 rounded-lg text-white`}
  >
    {(item.email_verified)?("Yes"):("No")}
  </span>
</TableCell>
<TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.kyc_details.pancard_number}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
    {item.kyc_details.entity_type}
  </TableCell>
  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {getFormateDate(item.createdAt)}
  </TableCell>
  <TableCell align="left"  sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },textAlign: "center" }}>
    <h1 className={`px-2 py-2 rounded-2xl text-sm text-white ${(item.account_status.status==="Active")?("bg-green-500"):"bg-red-500"}`}>{item.account_status.status}</h1>
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
                      {(item.account_status.status==="Active")?("Inactivate"):("Activate")}
                    </Button>
                  </TableCell>

</TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer> 

        <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
        <DialogTitle>Inactivate Recruiting Agency</DialogTitle>
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
                  <p><strong>Interested in:</strong> {selectedRow?.firm_type}</p>
            <p><strong>Country:</strong> {selectedRow?.country}</p>
            <p><strong>State:</strong> {selectedRow?.state}</p>
            <p><strong>City:</strong> {selectedRow?.city}</p>
            
              <p><strong>Email verified:</strong> {(selectedRow?.email_verified)?("Yes"):("No")}</p>
              <p><strong>Pancard Number:</strong> {selectedRow?.kyc_details.pancard_number}</p>
              <p><strong>Entity Type:</strong> {selectedRow?.kyc_details.entity_type}</p>
              <p><strong>Linkedin URL:</strong> {selectedRow?.linkedin_url}</p>
              <p><strong>Domains:</strong>
              <div className='flex flex-wrap'>
             {selectedRow?.domains.map((domain, index) => (
                  <div className='bg-gray-200 p-1.5 m-0.5 rounded-lg text-xs' key={index}>{domain}</div>
               ))
             }
             </div></p>
              
          </div>
          
          <div className='mt-6'>
              <strong className='bg-green-400 px-2 py-1 rounded-sm'>PAN Card Document:</strong> 
              <div className='mt-2 w-full'>
              {selectedRow?.kyc_documents && (
                selectedRow?.kyc_documents.filename.endsWith('.pdf') ? (
                        <iframe src={`http://localhost:8080/kycdocs/${selectedRow?.kyc_documents.filename}`} width="600" height="400"></iframe>
                    ) : (
                        <img className='w-full' src={`http://localhost:8080/kycdocs/${selectedRow?.kyc_documents.filename}`} />
                    )
              )}
              
             </div>
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
           
            onClick={handleApprove}
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
