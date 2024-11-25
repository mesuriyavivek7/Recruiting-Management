import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Notification from '../../Components/Notification';
import { fetchRecuritingAgencybyId } from '../../services/api';

const AdminTabView = ({ tabs, recuritingAgenciesDetails }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const myValue = useSelector((state) => state.admin);
  const [inactivateLoad, setInactivateLoad] = useState(false);
  const [ragencyDetails, setRAgencyDetails] = useState(recuritingAgenciesDetails);
  const [accountStatus, setAccountStatus] = useState('Active')
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (ragencyDetails) {
      setAccountStatus(ragencyDetails?.account_status.status)
    }
  }, [ragencyDetails])

  const handleCloseInactivateButton = () => {
    setOpenpopup(false);
  };

  console.log(ragencyDetails);
  const handleInactivateButton = async (e) => {
    e.stopPropagation();
    if (accountStatus === 'Active') {
      setOpenpopup(true);
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
          id: ragencyDetails._id,
          status: ragencyDetails.account_status.status,
          reason,
          admin_id: myValue.userData._id,
        });
        console.log("Response 123", response);
        showNotification('Successfully changed account status.', 'success');
        const updateRAgency = await fetchRecuritingAgencybyId(ragencyDetails._id)
        setRAgencyDetails(updateRAgency)
      } catch (err) {
        showNotification('Error changing account status!', 'failure');
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true);
      const response = await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
        id: ragencyDetails._id,
        status: ragencyDetails.account_status.status,
        reason,
        admin_id: myValue.userData._id,
      });
      console.log("Response", response);
      setOpenpopup(false);
      const updateRAgency = await fetchRecuritingAgencybyId(ragencyDetails._id)
      setRAgencyDetails(updateRAgency)
      showNotification('Successfully changed account status.', 'success');
    } catch (err) {
      showNotification('Error changing account status!', 'failure');
    }
    setInactivateLoad(false);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className=''>
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Buttons container */}
      <div className="flex items-center justify-between">
        {/* Left-side tabs */}
        <div className="flex gap-0">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor: activeTab === tab.name ? '#315370' : '#e0e0e0',
                color: activeTab === tab.name ? 'white' : '#000',
                fontSize: '18px',
                textTransform: 'none',
                height: '50px',
                border: '2px solid white',
                borderRadius: index === 0
                  ? '20px 0 0 20px' // First tab rounded on the left
                  : index === tabs.length - 1
                    ? '0 20px 20px 0' // Last tab rounded on the right
                    : '0', // Middle tabs
                width: 'auto',
              }}
              onClick={() => handleTabChange(tab.name)}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        <button onClick={handleInactivateButton} className={`${accountStatus === "Active" ? ("bg-orange-400 hover:bg-orange-500") : "bg-green-400 hover:bg-green-500"} tracking-wide rounded-sm text-[20px] p-2 w-32`}>
          {accountStatus === "Active" ? "Inactivate" : "Activate"}
        </button>
      </div>

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

      {/* Tab Content */}
      <div className='pt-9'>
        {tabs.map((tab, index) => (
          activeTab === tab.name && (
            <div key={index}>
              {tab.component}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default AdminTabView;
