import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField, TablePagination, Select, MenuItem, FormControl, InputLabel, Card, CircularProgress, Box
} from '@mui/material';
import Notification from '../../../Components/Notification';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './NewRowColData ';

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);


  React.useEffect(() => {
    // Simulate data fetching with a loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after data is "fetched"
    }, 1000); // Simulate 1 second loading time
  }, [newEnterprise, page, rowsPerPage]); 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/allocatedacmanager`, {
        en_id: selectedRow._id,
        ac_id: selectedManager,
      });
      fetchEnterprise();
      handleClose();
      showNotification('Assigned to account manager successfully', 'success');
    } catch (err) {
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

  useEffect(() => {
    fetchEnterprise();
    fetchAccountManager();
  }, []);

  const fetchEnterprise = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/adminpending`);
      const rowsWithIds = response.data.map((item, index) => ({
        ...item,
        id: index + 1
      }));
      setNewEnterprise(rowsWithIds);
    } catch (err) {
      showNotification('Error fetching enterprises!', 'failure');
    }
  };

  const fetchAccountManager = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/madmin/${myValue.userData._id}`);
      setAcManager(response.data);
    } catch (err) {
      showNotification('Error fetching account managers!', 'failure');
    }
  };

  return (
    <>
      <p className='text-lg xl:text-2xl'>New Enterprise</p>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 ,color:'#315370'}}>
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
          pageSize={rowsPerPage}
          pagination={false}
          sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
            },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !important',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
              backgroundColor: '#e3e6ea',
            },
          }}
        />
        <TablePagination
          component="div"
          count={newEnterprise.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
          <Button onClick={handleSubmitButton} color="primary" disabled={inactivateLoad}>
            {inactivateLoad ? 'Inactivating...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for assigning account manager */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign Account Manager</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select an account manager to assign this enterprise to:
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-account-manager-label">Account Manager</InputLabel>
            <Select
              labelId="select-account-manager-label"
              value={selectedManager}
              onChange={handleManagerChange}
              label="Account Manager"
            >
              {acManager.map((manager) => (
                <MenuItem key={manager._id} value={manager._id}>
                  {manager.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAssignAcManager} color="primary" disabled={assignLoad}>
            {assignLoad ? 'Assigning...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </>
  );
};

export default NewEnterpriseData;
