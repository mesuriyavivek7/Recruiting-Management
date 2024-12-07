import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField
} from '@mui/material';
import axios from 'axios';
import Notification from '../../../Components/Notification';
import { fetchRecuritingAgencybyId } from '../../../services/api';

//Importing components
import ReDetails from './ReDetails';
import ReTeam from './ReTeam';
import ReCandidate from './ReCandidate';

export default function SuperRecruiting() {
  const myValue = useSelector((state) => state.admin)
  const location = useLocation();
  const [inactivateLoad, setInactivateLoad] = useState(false);
  const r_agency_id = location.state?.r_agency_id;
  const [ragencyDetails, setRAgencyDetails] = useState({});

  const [activeTab, setActiveTab] = useState('Recruiting Details');
  const [accountStatus, setAccountStatus] = useState('Active')
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState('');

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchRecuritingAgencyDetails = async () => {
    try {
      const response = await fetchRecuritingAgencybyId(r_agency_id);
      setAccountStatus(response.account_status.status);
      setRAgencyDetails(response);
    } catch (error) {
      console.error("Error while fetching the recuriting agencies details : ", error);
    }
  }
  useEffect(() => {
    fetchRecuritingAgencyDetails();
  }, [])

  const handleCloseInactivateButton = () => {
    setOpenpopup(false);
  };

  const handleInactivateButton = async (e) => {
    e.stopPropagation();
    if (accountStatus === 'Active') {
      setOpenpopup(true);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
          id: ragencyDetails._id,
          status: ragencyDetails?.account_status?.status,
          reason,
          admin_id: myValue.userData._id,
        });
        await fetchRecuritingAgencyDetails();
        showNotification('Successfully changed account status.', 'success');
      } catch (err) {
        showNotification('Error changing account status!', 'failure');
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true);
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
        id: ragencyDetails._id,
        status: ragencyDetails?.account_status?.status,
        reason,
        admin_id: myValue.userData._id,
      });
      setOpenpopup(false);
      await fetchRecuritingAgencyDetails();
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
                backgroundColor: activeTab === 'Recruiting Details' ? '#315370' : '#e0e0e0',
                color: activeTab === 'Recruiting Details' ? 'white' : '#000',
                fontSize: '20px',
                height: '50px',
                textTransform: 'none',
                border: '2px solid white',
                borderRadius: '20px 0 0 20px',  // Rounded left side
                width: 'auto',
                marginRight: '-1px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => handleTabChange('Recruiting Details')}
            >
              Recruiting Details
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
                backgroundColor: activeTab === 'Candidate' ? '#315370' : '#e0e0e0',
                color: activeTab === 'Candidate' ? 'white' : '#000',
                border: '2px solid white',
                fontSize: '20px',
                textTransform: 'none',
                height: '50px',
                borderRadius: '0 20px 20px 0',  // Rounded right side
                width: 'auto',
              }}
              onClick={() => handleTabChange('Candidate')}
            >
              Candidate
            </Button>
          </div>

          <button onClick={handleInactivateButton} className={`${accountStatus === "Active" ? ("bg-orange-400 hover:bg-orange-500") : "bg-green-400 hover:bg-green-500"} tracking-wide rounded-sm text-[20px] p-2 w-32`}>
            {accountStatus === "Active" ? "Inactivate" : "Activate"}
          </button>

          {/* Dialog for inactivating an recruiting agency */}
          <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
            <DialogTitle>Reason for Inactivating</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Provide a reason for inactivating this recruiting agency:
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
          {activeTab === 'Recruiting Details' && (
            <div className='pt-9'>
              <ReDetails recuritingAgenciesDetails={ragencyDetails} />
            </div>
          )}
          {activeTab === 'Team' && (
            <div className='pt-9 '>
              <ReTeam recuritingAgenciesDetails={ragencyDetails} />
            </div>
          )}
          {activeTab === 'Candidate' && (
            <div className='pt-9 '>
              <ReCandidate recuritingAgenciesDetails={ragencyDetails} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
