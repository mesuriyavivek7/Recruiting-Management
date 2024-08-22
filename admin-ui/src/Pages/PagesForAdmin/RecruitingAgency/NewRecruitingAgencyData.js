
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Card,TablePagination,
  Dialog, DialogTitle, DialogContent,DialogContentText,TextField, DialogActions, FormControl, InputLabel, Select, MenuItem, typographyClasses
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Notification from '../../../Components/Notification'


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
  const [recruitingAgency,setRecruitingAgency]=useState([])
  const [acManager,setAcManager]=useState([])
  const [selectedManager, setSelectedManager] = useState('');
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState("");
  const [notification,setNotification]=useState(null)

  const myValue=useSelector((state) => state.admin);
  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const fetchRecruitingAgency=async ()=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/adminpending`)
       setRecruitingAgency(res.data)
     }catch(err){

     }
  }

  const fetchAccountManager=async ()=>{
    try{
       const response=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`)
       setAcManager(response.data)
    }catch(err){
       
    }
  }
  


  useEffect(()=>{
      fetchRecruitingAgency()
      fetchAccountManager()
  },[])
 
 const showNotification=(message,type)=>{
     setNotification({message,type})
 }

  
  // const products = [
  //   {
  //     _id: '1',
  //     full_name: "zigo",
  //     email: "xyz@gmail.com",
  //     company_name: "heryo",
  //     company_size: 30,
  //     designation: "software development",
  //     Linkedin_url:"www.linkedin.com",
  //     interested_in:["Permanent Hiring"],
  //     country: "India",
  //     state: "Gujrat",
  //     city: "Gandhinagar",
  //     domains: ["IT Recruitment", "Executive Search", "Temporary Staffing",  { Education: "B.Tech" }],
  //     email_verified: "yes",
  //     pancard_no:"76556556655",
  //     created_at:'22-10-2022',
  //     account_status:'Active',
  //     action:'Activate',
  //     // pancard_document:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhrJJ0Pm1raETEg0qyTn7YPdhCq7aUW1K_cwlf9_o1tWAAx_ovOghawiWgRTxSec4bK8zzhPfsllDNFqAxjEQEPx_c4y-5yqLZIi2iKri109EdbFo8uP9y8B8WMWvB2V4gYjmx9PSjtVhno/s640/image004.PNG"
  //      pancard_document:'https://images.pexels.com/photos/5758468/pexels-photo-5758468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  //   },
  // ];

  // const repeatedProducts = Array(10).fill(null).map((_, index) => ({
  //   ...products[0],
  //   _id: String(index + 1),
  // }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectInactive,setSelectInactive]=useState(null)
  const handleInactivateButton =async (e,item) => {  
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
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`,{id:selectInactive._id,status:selectInactive.account_status.status,reason,admin_id:myValue.userData._id})
        console.log("Status request get")
        fetchRecruitingAgency()
        setOpenpopup(false);
        showNotification("Successfully account status changed...!","success")
      }catch(err){
        showNotification("There is somethong wrong in account status change","failure")
      }
  };

 const getFormateDate=(cdate)=>{
    let d=new Date(cdate)
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
 }
    

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAssignAcManager=async ()=>{
     try{
        //allocated recruiting agency to account manager
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/allocatedacmanager`,{ra_id:selectedRow._id,ac_id:selectedManager})

        //add recruiting agency into account manager verification pending list
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addrecruiting`,{ra_id:selectedRow._id,ac_id:selectedManager})

        //remove recruiting agency from master admin pendig list
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmvrecruitingpendinglist`,{m_id:myValue.userData._id,ra_id:selectedRow._id})
        fetchRecruitingAgency()
        handleClose()
        showNotification("Successfully assigned to account manager.","success")
     }catch(err){
        showNotification("There is something wrong while assigning to account managere.","faiuler")
     }
  }

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
  const paginatedRows = recruitingAgency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className=''>
     
       {
        notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>
       }
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
  
  <h1 className={`px-2 py-2 rounded-2xl text-sm text-white  ${(item.email_verified)?("bg-green-500"):"bg-red-500"} `} >
  {(item.email_verified)?"Yes":"No"}
  </h1>
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
          <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2 ">
            <p className='pt-6 pl-3'><strong>Id:</strong> {selectedRow?._id}</p>
            <p><strong>Email:</strong> {selectedRow?.email}</p>
            <p><strong>Company:</strong> {selectedRow?.company_name}</p>
    
            
            <p><strong>Company Size:</strong> {selectedRow?.company_size}</p>
              <p><strong>Designation:</strong> {selectedRow?.designation}</p>
                
                  <p><strong>Interested in:</strong> {selectedRow?.firm_type}</p>
            <p><strong>Country:</strong> {selectedRow?.country}</p>
            <p><strong>State:</strong> {selectedRow?.state}</p>
            <p><strong>City:</strong> {selectedRow?.city}</p>
              
             <p><strong>Email Verified:</strong> {(selectedRow?.email_verified)?("Yes"):("No")}</p>
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

        {(selectedRow?.account_status.status==="Active")  &&
          <FormControl fullWidth sx={{ mt: 6 }}>
              <InputLabel id="manager-select-label">Select Account Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                value={selectedManager}
                label="Select Account Manager"
                onChange={handleManagerChange}
              >
                {
                  acManager.map((item,i)=>(
                    <MenuItem key={i} value={item._id}>{item.full_name}</MenuItem>
                  ))
                }
                
              </Select>
            </FormControl>
        }
        { 
            (selectedRow?.account_status.status==="Inactive") && (
               <div className='my-6'>
                  <p className='text-red-500 text-xl text-center'>This Account is Inactivated</p>
               </div>)
          }
        </DialogContent>
        {
          (selectedRow?.account_status.status==="Active")  && 
          <DialogActions>
           <Button
             variant="contained"
             disabled={!selectedManager}
             onClick={handleAssignAcManager}
             sx={{ backgroundColor: selectedManager ? '#315370' : 'gray', color: 'white' }}
           >
             Assign
           </Button>
           <Button onClick={handleClose} color="secondary">
             Cancel
           </Button>
          </DialogActions>
        }
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
