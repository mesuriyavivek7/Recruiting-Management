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
import { rows, cols } from './NewRowColData';
import { FaEnvelope, FaBuilding, FaUsers, FaBriefcase, FaFlag, FaMapMarkerAlt, FaCity, FaCheckCircle, FaIdCard, FaLinkedin, FaGlobe } from 'react-icons/fa';
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [rows, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRecruitingAgency = async () => {
    try {
      const res = await fetchPendingRAgenciesByAdminId(userData?._id);
      const agencyIds = res.flat();
      const pendingAgencies = await Promise.all(
        agencyIds.map(async (agencyId) => {
          try {
            const agencyArray = await fetchRecuritingAgencybyId(agencyId);
            return agencyArray;
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
    }
  };

  const fetchAccountManager = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`)
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
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, { id: item._id, status: item.account_status.status, reason, admin_id: myValue.userData._id })
        showNotification("Successfully account status changed.", "success")
        fetchRecruitingAgency();
      } catch (err) {
        showNotification("Something went wrong in account status change...!", "failure")
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

  const handleAssignAcManager = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/allocatedacmanager`, { ra_id: selectedRow._id, ac_id: selectedManager });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addrecruiting`, { ra_id: selectedRow._id, ac_id: selectedManager });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/masteradmin/rmvrecruitingpendinglist`, { m_id: myValue.userData._id, ra_id: selectedRow._id });
      fetchRecruitingAgency();
      handleClose();
      showNotification("Successfully assigned to account manager.", "success");
    } catch (err) {
      showNotification("There is something wrong while assigning to account manager.", "failure");
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

  // Add a `displayIndex` based on the page and rows per page
  const displayedRows = recruitingAgency.map((agency, index) => ({
    ...agency,
    displayIndex: page * rowsPerPage + index + 1, // Calculate display index
  })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const columns = [
    { field: 'displayIndex', headerName: 'No.', width: 70 },
    ...cols(handleInactivateButton),
  ];

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
                rows={displayedRows}
                columns={columns}
                rowHeight={80}
                onRowClick={handleRowClick}
                pageSize={rowsPerPage}
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
                  },
                  '& .MuiDataGrid-cellContent': {
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiDataGrid-cell': {
                    minHeight: '2.5rem',
                  },
                  '& .MuiDataGrid-cell': {
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
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewRecruitingAgencyData;
