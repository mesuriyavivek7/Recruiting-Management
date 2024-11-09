import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';
import { CreateAccountManager } from '../../services/api';
import Notification from '../../Components/Notification';
import axios from 'axios';

const admin_be_uri = process.env.REACT_APP_API_BASE_URL;

const Add = () => {
  const adminData = useSelector((state) => state.admin.userData)
  const [open, setOpen] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      full_name: fullName,
      email: email,
      password: password,
    };

    const response = await CreateAccountManager(adminData?._id, data);
    if (response.status === 200) {
      showNotification('Successfully account status manager created', 'success');

      //send invitation mail
      try {
        const emailResponse = await axios.post(`${admin_be_uri}/send-mail`, {
          fullName,
          email,
          password,
        });
        if (emailResponse.status === 200) {
          showNotification('Email sent successfully', 'success');
        } else {
          showNotification('Failed to send email', 'error');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        showNotification('Error occurred while sending email', 'error');
      }
    }
    else {
      showNotification('Something went wrong in changing account status..!', 'failure');
      console.error("Error while creating account manager");
    }
    // try {
    //   const response = await axios.post('http://localhost:8000/api/send-mail', data);
    //   if (response.status === 200) {
    //     console.log('Email sent successfully');
    //   } else {
    //     console.error('Failed to send email');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    setOpen(false);
  };

  return (
    <div className='relative h-16 xl:h-20 px-5 flex items-center font-medium xl:text-lg  bg-blue-120 '>
      {/* Centered Links */}
      <div className=' flex justify-center gap-5'>
        <a href='#' className='hover:border-b-2 hover:border-blue-230 transition duration-300'>My Dashboard</a>
   
      </div>

      {/* Right-Aligned Section */}
      <div className='absolute right-4 flex items-center gap-2'>
        <Button variant="contained" sx={{ backgroundColor: "#315370", "&:hover": { backgroundColor: "gray" }, }} onClick={handleClickOpen}> + Add Account Manager</Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IoIosArrowBack style={{ marginRight: '8px', fontSize: '24px',cursor:'pointer'  }}  onClick={handleClose} />
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px'}} >
              Add Account Manager
            </Typography>
          </Box>
        </DialogTitle>


        <div className='px-4 py-2 bg-blue-120 shadow-lg'  >
          <Box sx={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '10px',
          }}>
            <DialogContent>
              <Typography component="label" sx={{ fontWeight: 'bold', mb: 1 }}>
                Full Name <Typography component="span" color="error">*</Typography>
              </Typography>

              <TextField
                autoFocus
                variant="outlined"
                type="text"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: '#ced4da',
                      transition: 'border-color 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: '#315370',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#315370',
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 14px',
                    },
                  },
                }}
              />
              <Typography component="label" sx={{ fontWeight: 'bold', mb: 1 }}>
                Email Address <Typography component="span" color="error">*</Typography>
              </Typography>
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: '#ced4da',
                      transition: 'border-color 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: '#315370',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#315370',
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 14px',
                    },
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Typography component="label" sx={{ fontWeight: 'bold', mb: 1 }}>
                Password <Typography component="span" color="error">*</Typography>
              </Typography>
              <TextField
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: '#ced4da',
                      transition: 'border-color 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: '#315370',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#315370',
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 14px',
                    },
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>

            <DialogActions sx={{ padding: '16px' }}>
              <Button
                fullWidth
                onClick={handleSubmit}
                sx={{
                  backgroundColor: 'gray',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#315370',
                  },
                }}
              >
                + Add Manager
              </Button>
            </DialogActions>
          </Box>
        </div>

      </Dialog>
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Add;
