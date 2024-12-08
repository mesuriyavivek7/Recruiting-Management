import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField
} from '@mui/material';
import axios from 'axios';
import { fetchEnterpriseById } from '../../services/api';
import Notification from '../../Components/Notification';
import EnterpriseDetails from './EnterpriseTable/EnterpriseDetails';
import EnterpriseJob from './EnterpriseTable/EnterpriseJob';
import EnterpriseTeam from './EnterpriseTable/EnterpriseTeam';


const SuperEnterpriseDetails = () => {
  const myValue = useSelector((state) => state.admin);
  const location = useLocation();
  const [inactivateLoad, setInactivateLoad] = useState(false);

  const en_id = location.state.enterpriseId;
  const [enterpriseDetails, setEnterpriseDetails] = useState(null); // Access the passed state

  const [activeTab, setActiveTab] = useState('Enterprise Details');
  const [accountStatus, setAccountStatus] = useState('Active')
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState('');

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchEnterpriseDetails = async () => {
    try {
      const response = await fetchEnterpriseById(en_id);
      setAccountStatus(response.account_status.status);
      setEnterpriseDetails(response);
    } catch (error) {
      console.error("Error while fetching enterprise details : ", error);
    }
  }
  useEffect(() => {
    fetchEnterpriseDetails();
  }, []);

  const handleCloseInactivateButton = () => {
    setOpenpopup(false);
  };

  const handleInactivateButton = async (e) => {
    e.stopPropagation();
    if (accountStatus === 'Active') {
      setOpenpopup(true);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, {
          id: enterpriseDetails?._id,
          status: enterpriseDetails?.account_status.status,
          reason,
          admin_id: myValue.userData._id,
        });
        await fetchEnterpriseDetails();
        showNotification('Successfully changed account status.', 'success');
      } catch (err) {
        showNotification('Error changing account status!', 'failure');
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true);
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, {
        id: enterpriseDetails?._id,
        status: enterpriseDetails?.account_status.status,
        reason,
        admin_id: myValue.userData._id,
      });
      setOpenpopup(false);
      await fetchEnterpriseDetails();
      showNotification('Successfully changed account status.', 'success');
    } catch (err) {
      showNotification('Error changing account status!', 'failure');
    }
    setInactivateLoad(false);
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className='pt-6'>
        <div className='flex justify-between items-center'>
          <div className="flex gap-0">
            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              variant="contained"
              disableElevation
              style={{
                backgroundColor: activeTab === 'Enterprise Details' ? '#315370' : '#e0e0e0',
                color: activeTab === 'Enterprise Details' ? 'white' : '#000',
                fontSize: '20px',
                height: '50px',
                textTransform: 'none',
                border: '2px solid white',
                borderRadius: '20px 0 0 20px',  // Rounded left side
                width: 'auto',
                marginRight: '-1px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => handleTabChange('Enterprise Details')}
            >
              Enterprise Details
            </Button>

            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor: activeTab === 'Team' ? '#315370' : '#e0e0e0',
                color: activeTab === 'Team' ? 'white' : '#000',
                fontSize: '20px',
                textTransform: 'none',
                height: '50px',
                border: '2px solid white',
                borderRadius: '0 0 0 0',  // Rounded right side
                width: 'auto',
              }}
              onClick={() => handleTabChange('Team')}
            >
              Team
            </Button>

            <Button
              id="demo-customized-button"
              aria-haspopup="true"
              disableElevation
              style={{
                backgroundColor: activeTab === 'Jobs' ? '#315370' : '#e0e0e0',
                color: activeTab === 'Jobs' ? 'white' : '#000',
                border: '2px solid white',
                fontSize: '20px',
                textTransform: 'none',
                height: '50px',
                borderRadius: '0 20px 20px 0',  // Rounded right side
                width: 'auto',
              }}
              onClick={() => handleTabChange('Jobs')}
            >
              Jobs
            </Button>
          </div>

          <button onClick={handleInactivateButton} className={`${accountStatus === "Active" ? ("bg-orange-400 hover:bg-orange-500") : "bg-green-400 hover:bg-green-500"} tracking-wide rounded-sm text-[20px] p-2 w-32`}>
            {accountStatus === "Active" ? "Inactivate" : "Activate"}
          </button>

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
        </div>
        <div>
          <div>
            {activeTab === 'Enterprise Details' && (
              <div className='pt-9'>
                <EnterpriseDetails enterpriseDetails={enterpriseDetails} />
              </div>
            )}
            {activeTab === 'Jobs' && (
              <div className='pt-9 '>
                <EnterpriseJob enterpriseDetails={enterpriseDetails} />
              </div>
            )}
            {activeTab === 'Team' && (
              <div className='pt-9 '>
                <EnterpriseTeam enterpriseDetails={enterpriseDetails} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperEnterpriseDetails;
