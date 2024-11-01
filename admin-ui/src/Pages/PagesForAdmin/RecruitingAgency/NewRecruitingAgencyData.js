

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Card, Button, Dialog, DialogTitle, TextField,
  DialogContentText, DialogContent, DialogActions,
  
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../../../Components/Notification';
import {rows,cols} from './NewRowColData'
import {  FaEnvelope, FaBuilding, FaUsers, FaBriefcase, FaFlag, FaMapMarkerAlt, FaCity, FaCheckCircle, FaIdCard, FaLinkedin, FaGlobe, FaFilePdf } from 'react-icons/fa';

const NewRecruitingAgencyData = () => {
  const [open, setOpen] = useState(false);
  const myValue = useSelector((state) => state.admin);
  const [recruitingAgency, setRecruitingAgency] = useState([]);
  const [selectInactive, setSelectInactive] = useState(null);
  const [notification, setNotification] = useState(null);
  const [reason, setReason] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [acManager,setAcManager]=useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [page, setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(5); 
  const [loading, setLoading] = React.useState(false); // Loader state

  // Pagination handlers
  const handleManagerChange = (event) => {
        setSelectedManager(event.target.value);
      };

      React.useEffect(() => {
        // Simulate data fetching with a loader
        setLoading(true);
        setTimeout(() => {
          setLoading(false); // Stop loading after data is "fetched"
        }, 1000); // Simulate 1 second loading time
      }, [rows, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };
  
  const fetchRecruitingAgency = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/adminpending`);
      setRecruitingAgency(res.data);
    } catch (err) {
      showNotification("There is something wrong while fetching data");
    }
  };
 
  const fetchAccountManager=async ()=>{
        try{
           const response=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`)
           setAcManager(response.data)
        }catch(err){
           
        }
      }
  useEffect(() => {
    fetchRecruitingAgency();
    fetchAccountManager()
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleInactivateButton = async (e,item) => {
    // setSelectInactive(item);
    // setOpenPopup(true);
    e.stopPropagation();  
    
        if(item.account_status.status==="Active"){
          setSelectInactive(item)
          setOpenPopup(true);
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

  const handleSubmitButton = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
        id: selectInactive._id,
        status: selectInactive.account_status.status,
        reason,
        admin_id: myValue.userData._id,
      });
      fetchRecruitingAgency();
      setOpenPopup(false);
      showNotification("Successfully Recruiting agency status changed!", "success");
    } catch (err) {
      showNotification("There is something wrong in account status change", "failure");
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
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
  const handleCloseInactivateButton=()=>{
    setSelectInactive(null)
    setOpenPopup(false)

}
  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
    setSelectedRow(null);
  };

  
  const paginatedRows = recruitingAgency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  // const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <p className='text-lg xl:text-2xl'>New Recruiting Agency</p>
      <div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 ,color:'#315370'}}>
          <CircularProgress />
        </Box>
      ) : (
      <Card className='mt-4 font-sans'>
        
        <div style={{ height: 600, width: '100%'}}>
          {/* <DataGrid
            rows={recruitingAgency}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            onRowClick={handleRowClick}
          /> */}
           <DataGrid 
         rows={recruitingAgency} 
        // rows={paginatedRows} 
        // rows={rows} 
          getRowId={(rows) => rows.id} // Specify the custom ID field
          columns={cols(handleInactivateButton)}
          rowHeight={80} 
 
          onRowClick={handleRowClick}
          //pagination={false} 
          pageSize={rowsPerPage} 
          //hideFooterPagination={true} 
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        
           sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' }, 
            },
         
            ' [class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !impotant', 
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
        
      },
      
      '& .MuiDataGrid-cellContent': {
        display: 'flex',
        alignItems: 'center', 
      },
      '& .MuiDataGrid-cell': {
        minHeight: '2.5rem', 
      },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
              
              
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
        <Dialog open={openPopup} onClose={handleCloseInactivateButton}>
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" sx={{fontSize:{sm:'16px',xl:'20px'}}}>
        <DialogTitle sx={{fontSize:{sm:'20px',xl:'25px'},borderBottom: '2px solid black', backgroundColor:'#838e9c',// Add this line for the border
    paddingBottom: '8px', }}>Details for {selectedRow?.full_name}</DialogTitle>
        <DialogContent>
          <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
            <p className='pt-6 pl-3'>
            <FaIdCard className='inline mr-2 text-black' /><strong>Id:</strong> {selectedRow?._id}</p>
            <p>
            <FaEnvelope className='inline mr-2 text-black' /><strong>Email:</strong> {selectedRow?.email}</p>
            <p> <FaBuilding className='inline mr-2 text-black' /><strong>Company:</strong> {selectedRow?.company_name}</p>
    
            
            <p>          <FaUsers className='inline mr-2 text-black' /><strong>Company Size:</strong> {selectedRow?.company_size}</p>
              <p> <FaBriefcase className='inline mr-2 text-black' />
                <strong>Designation:</strong> {selectedRow?.designation}</p>
                  <p><FaGlobe className='inline mr-2 text-black' />
                    <strong>Interested in:</strong> {selectedRow?.interested_in}</p>
            <p>  <FaFlag className='inline mr-2 text-black' />
              <strong>Country:</strong> {selectedRow?.country}</p>
            <p>  <FaMapMarkerAlt className='inline mr-2 text-black' />
              <strong>State:</strong> {selectedRow?.state}</p>
            <p>
            <FaCity className='inline mr-2 text-black' />
              <strong>City:</strong> {selectedRow?.city}</p>
            
              <p> <FaCheckCircle className='inline mr-2 text-black' />
                <strong>Email verified:</strong> {(selectedRow?.email_verified)?("Yes"):("No")}</p>
              <p>      <FaIdCard className='inline mr-2 text-black' />
                <strong>Pancard Number:</strong> {selectedRow?.pancard_number}</p>
              <p>
              <FaBriefcase className='inline mr-2 text-black' />
                <strong>Entity Type:</strong> {selectedRow?.entity_type}</p>
              <p>
              <FaLinkedin className='inline mr-2 text-black' />
                <strong>Linkedin URL:</strong> {selectedRow?.linkedin_url}</p>
              <p>
              <FaGlobe className='inline mr-2 text-black' />
                <strong>Domains:</strong>
              <div className='flex flex-wrap'>
             {selectedRow?.domains.map((domain, index) => (
                  <div className=' text-md' key={index}>{domain}</div>
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
          <FormControl fullWidth sx={{ mt: 8 }}>
              <InputLabel id="manager-select-label">Select Account Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                value={selectedManager}
                label="Select Account Manager"
                onChange={handleManagerChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5, // Adjust this height to fit your needs
                      width: 250,
                    },
                  },
                }}
              >
                {
                  acManager.map((item,i)=>(
                    <MenuItem key={i} value={item._id} sx={{pt:4}}>{item.full_name}</MenuItem>
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
        {/* <DialogActions>
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
        
        </DialogActions> */}

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
      </Card>)}

      
    </div>
    </div>
  );
};

export default NewRecruitingAgencyData;