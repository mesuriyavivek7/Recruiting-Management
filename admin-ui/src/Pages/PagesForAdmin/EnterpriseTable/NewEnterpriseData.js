import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Box
} from '@mui/material';
import Notification from '../../../Components/Notification';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './NewRowColData ';
import { FaEnvelope, FaPhone, FaBriefcase, FaBuilding, FaUsers, FaGlobe, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { fetchEnterpriseById, fetchAccountManagerMasterAdmin, fetchPendingEnterpriseData } from '../../../services/api';


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
  const [loading, setLoading] = React.useState(false); // Loader state



  React.useEffect(() => {
    // Simulate data fetching with a loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after data is "fetched"
    }, 1000); // Simulate 1 second loading time
  }, [newEnterprise]);


  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Handle inactivate account
  const handleInactivateButton = async (e, item) => {
    e.stopPropagation();
    if (item.account_status.status === 'Active') {
      setSelectInactive(item);
      setOpenpopup(true);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, {
          id: item._id,
          status: item.account_status.status,
          reason,
          admin_id: myValue.userData._id,
        });
        fetchEnterprise();
        showNotification('Successfully changed account status.', 'success');
      } catch (err) {
        showNotification('Error changing account status!', 'failure');
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
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, {
        id: selectInactive._id,
        status: selectInactive.account_status.status,
        reason,
        admin_id: myValue.userData._id,
      });
      fetchEnterprise();
      setOpenpopup(false);
      showNotification('Successfully changed account status.', 'success');
    } catch (err) {
      showNotification('Error changing account status!', 'failure');
    }
    setInactivateLoad(false);
  };

  const handleAssignAcManager = async () => {
    try {
      setAssignLoad(true);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/assignenterprisetoac`, {
        en_id: selectedRow._id,
        ac_id: selectedManager,
        m_admin_id: myValue.userData._id
      });
      await fetchEnterprise();
      handleClose();
      showNotification('Successfully enterprise assigned to account manager ', 'success');
    } catch (err) {
      handleClose()
      console.error(err)
      showNotification('Error assigning enterprise to account manager!', 'failure');
    }
    setAssignLoad(false);
  };

  const handleRowClick = (item) => {
    setSelectedRow(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager('');
    setSelectedRow(null);
  };

  const fetchAcManager = async () => {
    setLoading(true)
    try {
      if (myValue.userData?.admin_type === 'master_admin') {
        const acmanagerdata = await fetchAccountManagerMasterAdmin(myValue.userData._id);
        console.log(acmanagerdata);
        setAcManager(acmanagerdata);
      } else {
        showNotification("Access denied: Only master admins can fetch this data.", 'failure');
      }
    } catch (err) {
      showNotification("Something went wrong while fetching account manager.", 'failure');
    } finally{
       setLoading(false)
    }
  };



  const fetchEnterprise = async () => {
    setLoading(true)
    try {
      const enterpriseIdArray = await fetchPendingEnterpriseData(myValue.userData._id);

      if (Array.isArray(enterpriseIdArray) && enterpriseIdArray.length > 0) {
        const enterpriseDetails = await Promise.all(
          enterpriseIdArray.map(async (en_id, index) => {
            const data = await fetchEnterpriseById(en_id);
            return { ...data, id: index + 1 };
          })
        );
        setNewEnterprise(enterpriseDetails);
      } else {
        console.error("Expected an array of pending enterprises, but received:", enterpriseIdArray);
      }
    } catch (err) {
      showNotification('Error fetching enterprises!', 'failure');
    } finally{
       setLoading(false)
    }
  };

  useEffect(() => {
    fetchEnterprise();
    fetchAcManager();
  }, []);



  return (
    <>
      <p className='text-lg xl:text-2xl'>New Enterprise</p>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ height: 600, width: '100%', paddingTop: '19px' }}>
          <DataGrid
            rows={newEnterprise}
            getRowId={(rows) => rows.id}
            columns={columns(handleInactivateButton, handleRowClick)}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params?.row)}
            pageSize={8}
            // pagination={false}
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
              '& .MuiDataGrid-cellContent': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiDataGrid-cell': {
                minHeight: '2.5rem',
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
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
      )}
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Dialog for inactivating an enterprise */}
      <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
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

      {selectedRow && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
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
                <p className="text-gray-500 pt-3">Member Information</p>
              </div>

              {/* Professional details container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Email:</span>
                    <span>{selectedRow?.email}</span>
                  </div>
                </div>

                {/* Mobile No */}
                <div className="flex items-center text-gray-700">
                  <FaPhone className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Mobile No:</span>
                    <span>{selectedRow?.mobileno}</span>
                  </div>
                </div>

                {/* Designation */}
                <div className="flex items-center text-gray-700">
                  <FaBriefcase className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Designation:</span>
                    <span>{selectedRow?.designation}</span>
                  </div>
                </div>

                {/* Company Name */}
                <div className="flex items-center text-gray-700">
                  <FaBuilding className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Company Name:</span>
                    <span>{selectedRow?.company_name}</span>
                  </div>
                </div>

                {/* Company Size */}
                <div className="flex items-center text-gray-700">
                  <FaUsers className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Company Size:</span>
                    <span>{selectedRow?.company_size}</span>
                  </div>
                </div>

                {/* Country */}
                <div className="flex items-center text-gray-700">
                  <FaGlobe className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Country:</span>
                    <span>{selectedRow?.country}</span>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">State:</span>
                    <span>{selectedRow?.state}</span>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center text-gray-700">
                  <FaCity className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">City:</span>
                    <span>{selectedRow?.city}</span>
                  </div>
                </div>

                {/* Account Manager Selection */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Select Account Manager</InputLabel>
                  <Select
                    value={selectedManager}
                    onChange={handleManagerChange}
                    label="Select Account Manager"
                  >
                    {acManager?.map((manager) => (
                      <MenuItem key={manager.ac_id} value={manager.ac_id}>
                        {manager.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
      

    </>
  );
};

export default NewEnterpriseData;
