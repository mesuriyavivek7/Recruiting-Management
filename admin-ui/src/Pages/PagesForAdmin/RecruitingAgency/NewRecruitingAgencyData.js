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
import { cols } from './NewRowColData';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { FaEnvelope, FaBuilding, FaUsers, FaPhone, FaBriefcase, FaMapMarkerAlt, FaCity, FaCheckCircle, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { fetchPendingRAgenciesByAdminId, fetchRecuritingAgencybyId } from '../../../services/api';
import { store } from '../../../State/Store';

const selectUserData = (state) => state.admin.userData;
const userData = selectUserData(store.getState());

const NewRecruitingAgencyData = () => {
  const [open, setOpen] = useState(false);
  const myValue = useSelector((state) => state.admin);
  const [recruitingAgency, setRecruitingAgency] = useState([]);
  const [selectInactive, setSelectInactive] = useState(null);
  const [notification, setNotification] = useState(null);
  const [reason, setReason] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [acManager, setAcManager] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [inactivateLoad,setInactivateLoad]=useState(false)
  const [assignLoad,setAssignLoad]=useState(false)

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchRecruitingAgency = async () => {
    try {
      setLoading(true)
      //fetch ids of recruiter agency
      const res = await fetchPendingRAgenciesByAdminId(userData?._id);
      
      const pendingAgencies = await Promise.all(
        res.map(async (agencyId,index) => {
          try {
            //Fetch complete details of recruiter
            const agencyArray = await fetchRecuritingAgencybyId(agencyId);
            return ({
              ...agencyArray,id:index+1
            });
          } catch (fetchError) {
            console.error("Error fetching agency data for ID:", agencyId, fetchError);
            return [];
          }
        })
      );
      const filteredAgencies = pendingAgencies.flat().filter((agency) => agency !== null);
      setRecruitingAgency(filteredAgencies);
    } catch (err) {
      console.error("Error in fetchRecruitingAgency:", err);
      showNotification("There is something wrong while fetching data", "error");
    }finally{
      setLoading(false)
    }
  };

  const fetchAccountManager = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`)
      console.log(response.data)
      setAcManager(response.data)
    } catch (err) {
      console.error("Error fetching account managers:", err);
    }
  };

  useEffect(() => {
    fetchRecruitingAgency();
    fetchAccountManager();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleInactivateButton = async (e, item) => {
    e.stopPropagation();
    if (item.account_status.status === "Active") {
      setSelectInactive(item);
      setOpenPopup(true);
    } else {
      try {
        setInactivateLoad(true)
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, { id: item._id, status: item.account_status.status, reason, admin_id: myValue.userData._id })
        showNotification("Successfully account status changed.", "success")
        fetchRecruitingAgency();
      } catch (err) {
        showNotification("Something went wrong in account status change...!", "failure")
      }finally{
        setInactivateLoad(false)
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true)
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
    }finally{
      setInactivateLoad(false)
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleAssignAcManager = async () => {
    try {
      setAssignLoad(true)
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/allocatedacmanager`, { ra_id: selectedRow._id, ac_id: selectedManager });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addrecruiting`, { ra_id: selectedRow._id, ac_id: selectedManager });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmvrecruitingpendinglist`, { m_id: myValue.userData._id, ra_id: selectedRow._id });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/recruiterverifiedbymadmin`,{m_id:myValue.userData._id,ra_id:selectedRow._id})
      fetchRecruitingAgency();
      handleClose();
      showNotification("Successfully assigned to account manager.", "success");
    } catch (err) {
      showNotification("There is something wrong while assigning to account manager.", "failure");
    }finally{
      setAssignLoad(false)
    }
  };

  const handleCloseInactivateButton = () => {
    setSelectInactive(null);
    setOpenPopup(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
    setSelectedRow(null);
  };



  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <p className='text-lg xl:text-2xl'>New Recruiting Agency</p>
      <div>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Card className='mt-4 font-sans'>
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={recruitingAgency}
                columns={cols(handleInactivateButton)}
                rowHeight={80}
                onRowClick={(params)=>handleRowClick(params?.row)}
                pageSize={8}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
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
            {/* Dialpg box for inactivate account */}
            <Dialog open={openPopup} onClose={handleCloseInactivateButton}>
              <DialogTitle>Reason for Inactivating</DialogTitle>
              <DialogContent>
                 <DialogContentText>
                    Provide a reason for inactivating this enterprise:
                 </DialogContentText>
                 <TextField
                     autoFocus
                     margin="dense"
                     id="reason"
                     label="Reason"
                     type="text"
                     fullWidth
                     value={reason}
                     onChange={(e) => setReason(e.target.value)}
                   />
               </DialogContent>
              <DialogActions>
              <Button onClick={handleCloseInactivateButton} color="primary">Cancel</Button>
              <Button onClick={handleSubmitButton} color="primary" disabled={inactivateLoad || !reason}>
             {inactivateLoad ? 'Inactivating...' : 'Submit'}
             </Button>
            </DialogActions>
            </Dialog>

            {/* Dialog box for Show Recruiter preview */}
            {selectedRow && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
          {/* Dialog Title */}
          <DialogTitle className="bg-gray-600 text-white text-lg font-bold">
            Details for {selectedRow?.full_name}
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent className="bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-6 my-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">
                  {selectedRow.full_name}
                </h2>
                <p className="text-gray-500 pt-1">Member Information</p>
              </div>
           <div className='flex items-start'>
              {/* Professional details container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Email */}
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2 text-black text-md xl:text-xl" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Email:</span>
                    <span>{selectedRow?.email}</span>
                  </div>
                </div>

                {/* Mobile No */}
                <div className="flex items-center text-gray-700">
                  <FaPhone className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Mobile No:</span>
                    <span>+{selectedRow?.mobileno}</span>
                  </div>
                </div>

                {/* Designation */}
                <div className="flex items-center text-gray-700">
                  <FaBriefcase className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Designation:</span>
                    <span>{selectedRow?.designation}</span>
                  </div>
                </div>

                {/* Company Name */}
                <div className="flex items-center text-gray-700">
                  <FaBuilding className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Company Name:</span>
                    <span>{selectedRow?.company_name}</span>
                  </div>
                </div>

                {/* Company Size */}
                <div className="flex items-center text-gray-700">
                  <FaUsers className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Company Size:</span>
                    <span>{selectedRow?.company_size}</span>
                  </div>
                </div>

                {/* Country */}
                <div className="flex items-center text-gray-700">
                  <FaGlobe className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Country:</span>
                    <span>{selectedRow?.country}</span>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">State:</span>
                    <span>{selectedRow?.state}</span>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center text-gray-700">
                  <FaCity className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">City:</span>
                    <span>{selectedRow?.city}</span>
                  </div>
                </div>

                {/* Linkedin */}
                <div className="flex items-center text-gray-700">
                  <FaLinkedin className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">LinkedIn Url:</span>
                    <a className='text-blue-400' rel="noreferrer" target='_blank' href={`${selectedRow?.linkedin_url}`}><InsertLinkOutlinedIcon></InsertLinkOutlinedIcon></a>
                  </div>
                </div>

                {/* Kyc Submited */}
                <div className="flex items-center text-gray-700">
                  <FaCheckCircle className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Kyc Submited:</span>
                    <span>{(selectedRow.kyc_details)?("Yes"):("No")}</span>
                  </div>
                </div>

                {/* Entity type */}
                {
                  selectedRow.kyc_details && 
                  <div className="flex items-center text-gray-700">
                    <CorporateFareOutlinedIcon className="mr-2 text-black text-md" />
                    <div className="flex gap-2 text-[18px]">
                      <span className="block font-medium">Entity Type:</span>
                      <span>{selectedRow?.kyc_details.entity_type}</span>
                    </div>
                  </div>
                }

                {/* Pancard number */}
                {
                  selectedRow.kyc_details && 
                  <div className="flex items-center text-gray-700">
                    <CreditCardOutlinedIcon className="mr-2 text-black text-md" />
                    <div className="flex gap-2 text-[18px]">
                      <span className="block font-medium">Pancard Number:</span>
                      <span>{selectedRow?.kyc_details.pancard_number}</span>
                    </div>
                  </div>
                }





                {/* Account Manager Selection */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Select Account Manager</InputLabel>
                  <Select
                    value={selectedManager}
                    onChange={handleManagerChange}
                    label="Select Account Manager"
                  >
                    {acManager?.map((manager) => (
                      <MenuItem key={manager._id} value={manager._id}>
                        {manager.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='border rounded-md bg-gray-50 overflow-hidden flex justify-center items-center w-[600px] h-[400px]'>
                {
                  selectedRow.kyc_details?(
                    <iframe title='kyc docs' className='transform scale-100 origin-top-left w-full h-full' src={`${process.env.REACT_APP_APP_URL}/kycdocs/${selectedRow.kyc_documents?.filename}`}></iframe>
                  ):(
                     <span>KYC details are not submitted.</span>
                  )
                }
                
              </div>
            </div>
            </div>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions className="bg-gray-100 px-6 py-6">
            <Button
              onClick={handleClose}
              className="bg-gray-600 hover:bg-blue-500 hover:text-white text-white px-4 py-2 text-xl rounded-md"
            >
              Cancel
            </Button>
            <Button
              disabled={selectedManager === ''}
              onClick={handleAssignAcManager}
              className="bg-gray-600 disabled:bg-slate-200 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white text-white px-4 py-2 text-xl rounded-md"
            >
              {assignLoad && <span>Loading...</span>}
              {!assignLoad && <span>Assign</span>}
            </Button>
          </DialogActions>
        </Dialog>
      )}
       </Card>
        )}
      </div>
    </div>
  );
};

export default NewRecruitingAgencyData;
