// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios'
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Card,TablePagination,
//   Dialog, DialogTitle, DialogContent,DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem,
//   TextField
// } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import Menu from '@mui/material/Menu';
// import Notification from '../../../Components/Notification';


// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//   },
// }));

// const NewEnterpriseData = () => {

//   const myValue=useSelector((state) => state.admin);
//   const [notification,setNotification]=useState(null)
  
//   const [inactivateLoad,setInactivateLoad]=useState(false)
//   const [assignLoad,setAssignLoad]=useState(false)
//   const [open, setOpen] = useState(false);
//   const [newEnterprise,setNewEnterprise]=useState([])
//   const [acManager,setAcManager]=useState([])
//   const [selectedManager, setSelectedManager] = useState('');
//   const [openpopup, setOpenpopup] = useState(false);
//   const [reason, setReason] = useState("");

//   //for showing notification
//   const showNotification=(message,type)=>{
//      setNotification({message,type})
//   }
  
//   const getFormateDate=(cdate)=>{
//     let d=new Date(cdate)
//     return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
//   }
//   const fetchEnterprise=async ()=>{
//      try{
//         const response=await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/adminpending`)
//         setNewEnterprise(response.data)
//      }catch(err){
//         showNotification("There is something wrong..!","failure")
//      }
//   }

//   const fetchAccountManager=async ()=>{
//     try{
//        const response=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`)
//        setAcManager(response.data)
//     }catch(err){
//        showNotification("There is somthing wrong....!","failure")
//     }
//   }


//   useEffect(()=>{
//        fetchEnterprise()
//        fetchAccountManager()
//   },[])
 
//   const [selectInactive,setSelectInactive]=useState(null)
  
//   const handleInactivateButton =async (e,item) => {  
//     e.stopPropagation();  
//     if(item.account_status.status==="Active"){
//       setSelectInactive(item)
//       setOpenpopup(true);
//     }else{
//       try{
//        await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`,{id:item._id,status:item.account_status.status,reason,admin_id:myValue.userData._id})
//        fetchEnterprise()
//        showNotification("Successfully account status changed.","success")
//       }catch(err){
//          showNotification("Something went wrong in changeing account status..!","failure")
//       }
//     }
//   };
//   const handleCloseInactivateButton = () => {
//     setSelectInactive(null)
//     setOpenpopup(false);
//   };
//   const handleManagerChange = (event) => {
//     setSelectedManager(event.target.value);
//   };

//   const handleSubmitButton =async  () => {
//     console.log("Submit button clicked")
//     // Handle the reason submission logic here
  
      
//       try{
//         setInactivateLoad(true)
//         await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`,{id:selectInactive._id,status:selectInactive.account_status.status,reason,admin_id:myValue.userData._id})
//         console.log("Status request get")
//         fetchEnterprise()
//         setOpenpopup(false);
//         showNotification("Successfully account status changed.","success")
//       }catch(err){
//         showNotification("Something went wrong in changeing account status..!","failure")
//       }
//       setInactivateLoad(false)
//   };


//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

 
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const [selectedRow, setSelectedRow] = useState(null);

//   const handleAssignAcManager=async ()=>{
//        try{
//         setAssignLoad(true)
//         //allocated account manager to enterprise
//         await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/allocatedacmanager`,{en_id:selectedRow._id,ac_id:selectedManager})

//         //add enterprise into account manager pending list
//         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addenterprise`,{ac_id:selectedManager,en_id:selectedRow._id})

//         //remove enterprise from master admin pending list
//         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmventerprisependinglist`,{m_id:myValue.userData._id,en_id:selectedRow._id})
//         fetchEnterprise()
//         handleClose()
//         showNotification("Successfully assign to account manager","success")
//        }catch(err){
//           showNotification("Something went wrong to assign Enterprise to account manager..!","failure")
//        }
//        setAssignLoad(false)
//   }

//   const handleRowClick = (item) => {
//     setSelectedRow(item);  
//     setOpen(true); 
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedManager('');
//     setSelectedRow(null)
//   };

//   // Calculate the rows to display
//   const paginatedRows = newEnterprise.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <div>
//     {
//       notification && (
//         <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>
//       )
//     }
     

//       <Card className='mt-9 font-sans'>
//         <h1 className='text-lg xl:text-2xl'>New Enterprise</h1>
       
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
           
//               <TableRow>
//   <TableCell sx={{ fontSize: { xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
//     ID
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
//     Full Name
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} align="left">
//     Email
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Mobile No.
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Designation
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Company Name
//   </TableCell>
//   <TableCell sx={{ fontSize: {  xs: '16px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Company Size
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Country
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     State
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     City
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Email verification
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Created At
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Account Status
//   </TableCell>
//   <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
//     Action
//   </TableCell>
// </TableRow>

//             </TableHead>
//             <TableBody>
//               {paginatedRows.map((item,index) => (
              
//                 <TableRow key={item._id} onClick={() => handleRowClick(item)}
//                 sx={{
//                   cursor: 'pointer',
//                   backgroundColor: selectedRow === index ? '#f0f0f0' : 'inherit',
//                   '&:hover': {
//                     backgroundColor: '#e0e0e0',
//                   }}}>
//   <TableCell align="left" className="" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },cursor: 'pointer', }} >
//     {item._id}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.full_name}
//   </TableCell>
//   <TableCell align="left" component="th" scope="row" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.email}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
//     {`+${item.mobileno}`}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.designation}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.company_name}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.company_size}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px'} }}>
//     {item.country}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.state}
//   </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {item.city}
//   </TableCell>
  
//   <TableCell align="left" sx={{ textAlign: 'center', }}>
//   <h1 className={`px-2 py-2 rounded-2xl text-sm text-white  ${(item.email_verified)?("bg-green-500"):"bg-red-500"} `} >
//   {(item.email_verified)?"Yes":"No"}
//   </h1>

// </TableCell>
//   <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
//     {getFormateDate(item.createdAt)}
//   </TableCell>
//   <TableCell align="left"  sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },textAlign: "center" }}>
//     <h1 className={`px-2 py-2 rounded-2xl text-sm text-white ${(item.account_status.status==="Active")?("bg-green-500"):"bg-red-500"}`}>{item.account_status.status}</h1>
//   </TableCell>
  
  
//                   <TableCell align="left" sx={{ textAlign: "center" }}>
//                     <Button  onClick={(e)=>handleInactivateButton(e,item)}
//                       variant="contained"
//                       sx={{
//                         fontSize: { xs: "12px", sm: "16px", xl: "18px" },
//                         width: { xl: "120px", sm: "120px" },

//                         backgroundColor:
//                           "#315370",
//                         "&:hover": {
//                           backgroundColor:"gray"
//                         },
//                         textTransform: "none",
//                       }}
//                     >
//                       {(item.account_status.status==="Active")?("Inactivate"):("Activate")}
//                     </Button>
//                   </TableCell>

// </TableRow>

//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer> 

//       <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
//         <DialogTitle>Inactivate Enterprise</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please provide a reason why you want to inactivate this account.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Reason"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseInactivateButton}  sx={{
//                         fontSize: { xs: "12px", sm: "14px", xl: "17px" },
//                         width: { xl: "80px", sm: "40px" },
//                         color:'white',
//                         backgroundColor:
//                           "#315370",
//                         "&:hover": {
//                           backgroundColor:"gray"
//                         },
//                         textTransform: "none",
//                       }}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmitButton}  sx={{
//                         fontSize: { xs: "12px", sm: "14px", xl: "17px" },
//                         width: { xl: "100px", sm: "50px" },
//                         // height:"30px",
//                        color:'white',
//                         backgroundColor:
//                           "#315370",
//                         "&:hover": {
//                           backgroundColor:"gray"
//                         },
//                         textTransform: "none",
                    
//                       }}>
//                {inactivateLoad &&
//                 <span className="absolute inset-0 flex items-center justify-center">
//                                           <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
//                                           </svg>
//                                      </span>
//                                      }
                                     
//                                      {!inactivateLoad && <span>Submit</span>}
//           </Button>
//         </DialogActions>
//       </Dialog>
        
//        {selectedRow && (
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{fontSize:{sm:'16px',xl:'20px'}}}>
//         <DialogTitle sx={{fontSize:{sm:'20px',xl:'25px'},borderBottom: '2px solid black', // Add this line for the border
//     paddingBottom: '8px', }}>Details for {selectedRow?.full_name}</DialogTitle>
//         <DialogContent>
//           <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
//             <p className='pt-6 pl-3'><strong>Id:</strong> {selectedRow?._id}</p>
//             <p><strong>Email:</strong> {selectedRow?.email}</p>
//             <p><strong>Mobile No:</strong> {selectedRow?.mobileno}</p>
//             <p><strong>Company:</strong> {selectedRow?.company_name}</p>
//             <p><strong>Designation:</strong> {selectedRow?.designation}</p>
            
//             <p><strong>Company Size:</strong> {selectedRow?.company_size}</p>
//             <p><strong>Country:</strong> {selectedRow?.country}</p>
//             <p><strong>State:</strong> {selectedRow?.state}</p>
//             <p><strong>City:</strong> {selectedRow?.city}</p>
//             <p><strong>Email Verified:</strong> {(selectedRow?.email_verified)?("Yes"):("No")}</p>
            
//           </div>
//           {
//             (selectedRow?.account_status.status==="Active") && (
//              <FormControl fullWidth sx={{ mt: 6 }}>
//                 <InputLabel id="manager-select-label">Select Account Manager</InputLabel>
//                   <Select
//                   labelId="manager-select-label"
//                   value={selectedManager}
//                   label="Select Account Manager"
//                   onChange={handleManagerChange}
//                 >
//                  {
//                    acManager.map((item,i)=>(
//                      <MenuItem key={i} value={item._id}>{item.full_name}</MenuItem>
//                    ))
//                  }
               
//                 </Select>
//             </FormControl>
//             )
//           }
//           { 
//             (selectedRow?.account_status.status==="Inactive") && (
//                <div className='my-6'>
//                   <p className='text-red-500 text-xl text-center'>This Account is Inactivated</p>
//                </div>)
//           }
//         </DialogContent>

//         {   (selectedRow?.account_status.status==="Active") &&
//             ( <DialogActions>
//                  <Button
//                    variant="contained"
//                    disabled={!selectedManager}
//                    onClick={handleAssignAcManager}
//                    sx={{ backgroundColor: selectedManager ? '#315370' : 'gray', color: 'white' }}
//                    className='h-8'
//                  >
//                    {assignLoad && 
//                    <span className="absolute inset-0 flex items-center justify-center">
//                                           <svg className="w-5 h-5 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
//                                           </svg>
//                                      </span>
//                                      }
                                     
//                                      {!assignLoad && <span className='text-white'>Assign</span>}
//                  </Button>
//                  <Button onClick={handleClose} color="secondary">
//                    Cancel
//                  </Button>
//                </DialogActions> )
//         }
//       </Dialog>
//         )}
//       </Card>
//       <TablePagination
//           component="div"
//           count={newEnterprise.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 25]}
//           labelRowsPerPage="Rows per page"
//         />
//     </div>
//   );
// };

// export default NewEnterpriseData;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem,
//   TablePagination
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import Notification from '../../../Components/Notification';
// import { columns } from './NewRowColData '; // Adjust the import path if needed

// const NewEnterpriseData = () => {
//   const myValue = useSelector((state) => state.admin);
//   const [notification, setNotification] = useState(null);
//   const [inactivateLoad, setInactivateLoad] = useState(false);
//   const [assignLoad, setAssignLoad] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [newEnterprise, setNewEnterprise] = useState([]);
//   const [acManager, setAcManager] = useState([]);
//   const [selectedManager, setSelectedManager] = useState('');
//   const [openpopup, setOpenpopup] = useState(false);
//   const [reason, setReason] = useState('');
//   const [selectInactive, setSelectInactive] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const [page, setPage] = React.useState(0); 
//   const [rowsPerPage, setRowsPerPage] = React.useState(5); 

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset page to 0 when rows per page changes
//   };


//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//   };

//   const handleInactivateButton = async (e, item) => {
//     e.stopPropagation();
//     if (item.account_status.status === "Active") {
//       setSelectInactive(item);
//       setOpenpopup(true);
//     } else {
//       try {
//         await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: item._id, status: item.account_status.status, reason, admin_id: myValue.userData._id });
//         fetchEnterprise();
//         showNotification("Successfully account status changed.","success");
//       } catch (err) {
//         showNotification("Something went wrong in changing account status..!","failure");
//       }
//     }
//   };

//   const handleCloseInactivateButton = () => {
//     setSelectInactive(null);
//     setOpenpopup(false);
//   };

//   const handleManagerChange = (event) => {
//     setSelectedManager(event.target.value);
//   };

//   const handleSubmitButton = async () => {
//     try {
//       setInactivateLoad(true);
//       await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: selectInactive._id, status: selectInactive.account_status.status, reason, admin_id: myValue.userData._id });
//       fetchEnterprise();
//       setOpenpopup(false);
//       showNotification("Successfully account status changed.","success");
//     } catch (err) {
//       showNotification("Something went wrong in changing account status..!","failure");
//     }
//     setInactivateLoad(false);
//   };

//   const handleAssignAcManager = async () => {
//     try {
//       setAssignLoad(true);
//       await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/allocatedacmanager`, { en_id: selectedRow._id, ac_id: selectedManager });
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addenterprise`, { ac_id: selectedManager, en_id: selectedRow._id });
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmventerprisependinglist`, { m_id: myValue.userData._id, en_id: selectedRow._id });
//       fetchEnterprise();
//       handleClose();
//       showNotification("Successfully assigned to account manager","success");
//     } catch (err) {
//       showNotification("Something went wrong assigning Enterprise to account manager..!","failure");
//     }
//     setAssignLoad(false);
//   };

//   const handleRowClick = (item) => {
//     console.log('Row clicked:', item); // Debugging line
//     setSelectedRow(item);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedManager('');
//     setSelectedRow(null);
//   };

//   useEffect(() => {
//     fetchEnterprise();
//     fetchAccountManager();
//   }, []);

 

//   const fetchEnterprise = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/adminpending`);
//       const data = response.data;
  
//       // Ensure each row has a unique `id`
//       const rowsWithIds = data.map((item) => ({
//         ...item,
//         id: item._id  // Assuming `_id` is unique
//       }));
  
//       setNewEnterprise(rowsWithIds);
//     } catch (err) {
//       showNotification("There is something wrong..!","failure");
//     }
//   };
  

//   const fetchAccountManager = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`);
//       setAcManager(response.data);
//     } catch (err) {
//       showNotification("There is something wrong....!","failure");
//     }
//   };

//   return (
//     <>
//    <p className='text-lg xl:text-2xl'>New Enterprise</p>
//         <div style={{ height: 600, width: '100%',paddingTop:'19px' }}>
        
//            <DataGrid 
//           rows={newEnterprise}
//           columns={columns(handleInactivateButton,handleRowClick)} // Pass the function to columns
//           rowHeight={80} 
//           onRowClick={(params) => handleRowClick(params.row)}
//           pagination={false} 
//           pageSize={rowsPerPage} 
//           hideFooterPagination={true} 
          
//            sx={{
//             '& .MuiDataGrid-root': {
//               fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' }, 
//             },
         
//             ' [class^=MuiDataGrid]': { border: 'none' },
//             '& .MuiDataGrid-columnHeader': {
//               fontWeight: 'bold !impotant', 
//               fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' }, 
//               color: 'black', 
             
//                '&:focus': {
//               outline: 'none', 
//               border: 'none',  
//             },
//               backgroundColor: '#e3e6ea !important', 
//               minHeight: '60px', 
//             },
//              '& .MuiDataGrid-columnHeader:focus-within': {
//         outline: 'none', 
//       },
     
           
         
            
      
//       '& .MuiDataGrid-columnSeparator': {
//         color: 'blue',
//         visibility: 'visible', 
//       },
      
    
//       '& .MuiDataGrid-cell': {
//         fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' }, 
        
//       },
      
//       '& .MuiDataGrid-cellContent': {
//         display: 'flex',
//         alignItems: 'center', 
//       },
//       '& .MuiDataGrid-cell': {
//         minHeight: '2.5rem', 
//       },
//             '& .MuiDataGrid-cell': {
//               fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
              
              
//             },
//             '& .MuiDataGrid-row': {
//               borderBottom: 'none', 
//             },
//             '& .MuiDataGrid-cell:focus': {
//               outline: 'none', 
//             },
           
//           }}
//         />
//         </div>
      
//       {notification && (
//         <Notification
//           open={true}
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}
//       <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
//         <DialogTitle>Inactivate Account</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please provide a reason for inactivating the account.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="reason"
//             label="Reason"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseInactivateButton} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmitButton}
//             color="primary"
//             disabled={inactivateLoad}
//           >
//             {inactivateLoad ? "Processing..." : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Assign Account Manager</DialogTitle>
//         <DialogContent>
//           <TextField
//             select
//             label="Select Account Manager"
//             value={selectedManager}
//             onChange={handleManagerChange}
//             fullWidth
//             variant="outlined"
//           >
//             {acManager.map((manager) => (
//               <MenuItem key={manager._id} value={manager._id}>
//                 {manager.full_name}
//               </MenuItem>
//             ))}
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleAssignAcManager}
//             color="primary"
//             disabled={assignLoad}
//           >
//             {assignLoad ? "Processing..." : "Assign"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <TablePagination
//         component="div"
//         count={newEnterprise.length} // Total number of rows
//         page={page} // Current page number
//         onPageChange={handleChangePage} // Handler for changing page
//         rowsPerPage={rowsPerPage} // Rows per page number
//         onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
//         rowsPerPageOptions={[5, 10, 25]} // Rows per page options
//         labelRowsPerPage="Rows per page" // Label
//       />
//     </>

//   );
// };

// export default NewEnterpriseData;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem,
  TablePagination,
  InputLabel,
  Select,
  FormControl
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../../../Components/Notification';
import { columns } from './NewRowColData '; // Adjust the import path if needed

const NewEnterpriseData = () => {
  const myValue = useSelector((state) => state.admin);
  const [notification, setNotification] = useState(null);
  const [inactivateLoad, setInactivateLoad] = useState(false);
  const [assignLoad, setAssignLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [newEnterprise, setNewEnterprise] = useState([]);
  const [acManager, setAcManager] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState('');
  const [selectInactive, setSelectInactive] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleInactivateButton = async (e, item) => {
    e.stopPropagation();
    if (item.account_status.status === 'Active') {
      setSelectInactive(item);
      setOpenpopup(true);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: item._id, status: item.account_status.status, reason, admin_id: myValue.userData._id });
        fetchEnterprise();
        showNotification('Successfully account status changed.', 'success');
      } catch (err) {
        showNotification('Something went wrong in changing account status..!', 'failure');
      }
    }
  };

  const handleCloseInactivateButton = () => {
    setSelectInactive(null);
    setOpenpopup(false);
  };

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true);
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: selectInactive._id, status: selectInactive.account_status.status, reason, admin_id: myValue.userData._id });
      fetchEnterprise();
      setOpenpopup(false);
      showNotification('Successfully account status changed.', 'success');
    } catch (err) {
      showNotification('Something went wrong in changing account status..!', 'failure');
    }
    setInactivateLoad(false);
  };

  const handleAssignAcManager = async () => {
    try {
      setAssignLoad(true);
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/allocatedacmanager`, { en_id: selectedRow._id, ac_id: selectedManager });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addenterprise`, { ac_id: selectedManager, en_id: selectedRow._id });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmventerprisependinglist`, { m_id: myValue.userData._id, en_id: selectedRow._id });
      fetchEnterprise();
      handleClose();
      showNotification('Successfully assigned to account manager', 'success');
    } catch (err) {
      showNotification('Something went wrong assigning Enterprise to account manager..!', 'failure');
    }
    setAssignLoad(false);
  };

  const handleRowClick = (item) => {
    console.log('Row clicked:', item); // Debugging line
    setSelectedRow(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
    setSelectedRow(null);
  };

  useEffect(() => {
    fetchEnterprise();
    fetchAccountManager();
  }, []);

  const fetchEnterprise = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/adminpending`);
      const data = response.data;
  
      // Ensure each row has a unique `id`
      const rowsWithIds = data.map((item) => ({
        ...item,
        id: item._id  // Assuming `_id` is unique
      }));
  
      setNewEnterprise(rowsWithIds);
    } catch (err) {
      showNotification('There is something wrong..!', 'failure');
    }
  };

  const fetchAccountManager = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`);
      setAcManager(response.data);
    } catch (err) {
      showNotification('There is something wrong....!', 'failure');
    }
  };

  return (
    <>
      <p className='text-lg xl:text-2xl'>New Enterprise</p>
      <div style={{ height: 600, width: '100%', paddingTop: '19px' }}>
        <DataGrid
          rows={newEnterprise}
          columns={columns(handleInactivateButton, handleRowClick)} // Pass the function to columns
          rowHeight={80}
          onRowClick={(params) => handleRowClick(params.row)}
          pagination={false}
          pageSize={rowsPerPage}
          hideFooterPagination={true}
          sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
            },
            '[class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !important',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
              color: 'black',
              '&:focus': {
                outline: 'none',
                border: 'none',
              },
              backgroundColor: '#e3e6ea !important',
              minHeight: '60px',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'blue',
              visibility: 'visible',
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
              minHeight: '2.5rem',
            },
            '& .MuiDataGrid-cellContent': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-row': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </div>

      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Inactivate Account Dialog */}
      

      {/* Assign Account Manager Dialog */}
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
          <Button onClick={handleCloseInactivateButton}  sx={{
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
          <Button onClick={handleSubmitButton}  sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "100px", sm: "50px" },
                        // height:"30px",
                       color:'white',
                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                    
                      }}>
               {inactivateLoad &&
                <span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>
                                     }
                                     
                                     {!inactivateLoad && <span>Submit</span>}
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
            <p><strong>Mobile No:</strong> {selectedRow?.mobileno}</p>
            <p><strong>Company:</strong> {selectedRow?.company_name}</p>
            <p><strong>Designation:</strong> {selectedRow?.designation}</p>
            
            <p><strong>Company Size:</strong> {selectedRow?.company_size}</p>
            <p><strong>Country:</strong> {selectedRow?.country}</p>
            <p><strong>State:</strong> {selectedRow?.state}</p>
            <p><strong>City:</strong> {selectedRow?.city}</p>
            <p><strong>Email Verified:</strong> {(selectedRow?.email_verified)?("Yes"):("No")}</p>
            
          </div>
          {
            (selectedRow?.account_status.status==="Active") && (
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
            )
          }
          { 
            (selectedRow?.account_status.status==="Inactive") && (
               <div className='my-6'>
                  <p className='text-red-500 text-xl text-center'>This Account is Inactivated</p>
               </div>)
          }
        </DialogContent>

        {   (selectedRow?.account_status.status==="Active") &&
            ( <DialogActions>
                 <Button
                   variant="contained"
                   disabled={!selectedManager}
                   onClick={handleAssignAcManager}
                   sx={{ backgroundColor: selectedManager ? '#315370' : 'gray', color: 'white' }}
                   className='h-8'
                 >
                   {assignLoad && 
                   <span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>
                                     }
                                     
                                     {!assignLoad && <span className='text-white'>Assign</span>}
                 </Button>
                 <Button onClick={handleClose} color="secondary">
                   Cancel
                 </Button>
               </DialogActions> )
        }
      </Dialog>
        )}
      
    </>
  );
};

export default NewEnterpriseData;

