
import React, { useState } from 'react'
// import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';


const Add = () => {

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = { fullName, email, password };

    try {
      const response = await axios.post('http://localhost:8000/api/send-mail', data);
      if (response.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setOpen(false);
  };


  return (
    <div className='relative h-16 xl:h-20 px-5 flex items-center font-medium xl:text-lg  bg-blue-120 '>
      {/* Centered Links */}
      <div className=' flex justify-center gap-5'>
        <a href='#' className= 'hover:border-b-2 hover:border-blue-230 transition duration-300'>My Dashboard</a>
        <a href='#' className= 'hover:border-b-2 hover:border-blue-230 transition duration-300'>Insight</a>
      </div>
      
      {/* Right-Aligned Section */}
      <div className='absolute right-4 flex items-center gap-2'>
        {/* <AddIcon/> */}
       
        <Button variant="contained" sx={{ backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },}} onClick={handleClickOpen}> + Add Account Manager</Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Account Manager</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Add
