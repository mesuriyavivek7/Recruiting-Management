import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';
import { CreateAccountManager } from '../../services/api';
import Notification from '../../Components/Notification';
import axios from 'axios';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const admin_be_uri = process.env.REACT_APP_API_BASE_URL;

const Add = () => {
  const adminData = useSelector((state) => state.admin.userData)
  const [open, setOpen] = useState(false);
  const [loading,setLoading]=useState(false)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [errors,setErrors]=useState({})

  const [hidePassword,setHidePassword] = useState(false)

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValidateData= () =>{
      let newerrors={}
      
      const emailRegax=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if(!fullName) newerrors.fullname="Fullname is required."
      if(!email) newerrors.email="Email address is required."
      else if(!emailRegax.test(email)) newerrors.email="Email address is not valid."
      if(!password) newerrors.password="Password is required."

      setErrors(newerrors)

      return Object.keys(newerrors).length===0
  }

  const handleSubmit = async () => {
    if(handleValidateData()){
         setLoading(true)
         const data = {
           full_name: fullName,
           email: email,
           password: password,
         };

         try{
          await CreateAccountManager(adminData?._id, data);
      
          //send invitation mail
          await axios.post(`${admin_be_uri}/mail/invite-acmanager`, {
            fullName,
            email,
            password,
          });
          setFullName('')
          setEmail('')
          setPassword('')
          setOpen(false);
          showNotification("Successfully new account manager added.",'success')
         }catch(error){
          if(error.response.status===400){
            showNotification(error.response.data.message,'failure')
          }else{
            showNotification('Something went wrong while adding account manager.', 'failure');
          }
         }finally{
          setLoading(false)
         }
        
    }
  };

  return (
    <div className='relative h-16 xl:h-20 px-5 flex items-center font-medium xl:text-lg  bg-blue-120 '>
      {/* Centered Links */}
      <div className=' flex justify-center gap-5'>
        <span className='hover:border-b-2 hover:border-blue-230 transition duration-300'>My Dashboard</span>
   
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
            width:'500px'
          }}>
            <DialogContent>
              <div className='flex flex-col mb-3'>
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
              {
                errors.fullname && <span className='text-red-400 mt-1 text-sm'>{errors.fullname}</span>
              }
              </div>
              <div className='flex flex-col mb-3'>
              <Typography component="label" sx={{ fontWeight: 'bold', mb: 1 }}>
                Email Address <Typography component="span" color="error">*</Typography>
              </Typography>
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                sx={{
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
              {
                errors.email && <span className='text-red-400 mt-1 text-sm'>{errors.email}</span>
              }
              </div>
              <div className='relative flex mb-2 flex-col'>
              <Typography component="label" sx={{ fontWeight: 'bold', mb: 1 }}>
                Password <Typography component="span" color="error">*</Typography>
              </Typography>
              <TextField
                variant="outlined"
                type={hidePassword?"password":'text'}
                fullWidth
                value={password}
                sx={{
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
              <span onClick={()=>setHidePassword(!hidePassword)} className='absolute cursor-pointer top-11 right-2'>{hidePassword?<VisibilityOutlinedIcon style={{fontSize:'1.3rem'}} />:<VisibilityOffOutlinedIcon style={{fontSize:"1.3rem"}}/>}</span>
              {
                errors.password && <span className='text-red-400 mt-1 text-sm'>{errors.password}</span>
              }
              </div>
            </DialogContent>

            <DialogActions sx={{ padding: '16px' }}>
              <Button
                disabled={loading}
                fullWidth
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#315370',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'gray',
                  },
                }}
              >  
                {
                    loading ?
                       <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                       </svg>
                       :<span>+ Add Manager</span>
                }
                
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
