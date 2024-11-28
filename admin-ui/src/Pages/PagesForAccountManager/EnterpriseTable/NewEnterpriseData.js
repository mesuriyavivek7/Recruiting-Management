
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem,
  TablePagination,
  CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../../../Components/Notification';
import { columns } from './NewRowColData '; // Adjust the import path if needed

const NewEnterpriseData = () => {
  const myValue = useSelector((state) => state.admin);
  const [notification, setNotification] = useState(null);
  const [inactivateLoad, setInactivateLoad] = useState(false);
  const [loader,setLoader]=useState(false)
  const [open, setOpen] = useState(false);
  const [newEnterprise, setNewEnterprise] = useState([]);
  
  
  const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState('');
  const [selectInactive, setSelectInactive] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleInactivateButton = async (e, item) => {
    e.stopPropagation();
    if (item.account_status.status === 'Active') {
      setSelectInactive(item);
      setOpenpopup(true);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: item._id, status: item.account_status.status, reason, admin_id: myValue.userData._id });
        fetchEnterprise();
        showNotification('Successfully account status changed.', 'success');
      } catch (err) {
        showNotification('Something went wrong in changing account status..!', 'failure');
      }
    }
  };

  const handleCloseInactivateButton = () => {
    setSelectInactive(null);
    setOpenpopup(false);
  };


  const handleSubmitButton = async () => {
    try {
      setInactivateLoad(true);
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`, { id: selectInactive._id, status: selectInactive.account_status.status, reason, admin_id: myValue.userData._id });
      fetchEnterprise();
      setOpenpopup(false);
      showNotification('Successfully account status changed.', 'success');
    } catch (err) {
      showNotification('Something went wrong in changing account status..!', 'failure');
    }
    setInactivateLoad(false);
  };


  const handleRowClick = (item) => {
    setSelectedRow(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const fetchEnterprise = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/acpending/${myValue.userData._id}`);
      const data = response.data;

      // Ensure each row has a unique `id`
      const rowsWithIds = data.map((item, index) => ({
        ...item,
        id: item._id, // Assuming `_id` is unique
        displayIndex: index + 1
      }));
      console.log("rows with ids---->",rowsWithIds)
      setNewEnterprise(rowsWithIds);
    } catch (err) {
      console.log(err)
      showNotification('There is something wrong..!', 'failure');
    } finally{
      setLoader(false)
    }
  };

  const handleApprove = async () => {
    try {
      //get verified enterprise to account manager
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/acverified`, { id: selectedRow._id })

      //add enterprise into verified list
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addverifiedenterprise`, { ac_id: myValue.userData._id, en_id: selectedRow._id })
      fetchEnterprise()
      handleClose()
      showNotification("Successfully enterprise account verified", "success")
    } catch (err) {
      showNotification("There is something wrong....!", "failure")
    }
  }

  useEffect(() => {
    fetchEnterprise();
  }, []);

  const paginatedRows = newEnterprise.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <>
      <p className='text-lg xl:text-2xl'>New Enterprise</p>
      {
        loader?(
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
             <CircularProgress />
          </Box>
        ):(
          <div style={{ height: 600, width: '100%', paddingTop: '19px' }}>
          <DataGrid
           getRowId={(rows) => rows._id} // Specify the custom ID field
           rows={newEnterprise.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
           columns={columns(handleInactivateButton)} // Pass the function to columns
           rowHeight={80}
           onRowClick={(params) => handleRowClick(params.row)}
           pagination={false}
           pageSize={rowsPerPage}
           loading={loader}
           hideFooterPagination={true}
           sx={{
             '& .MuiDataGrid-root': {
               fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
             },
             '[class^=MuiDataGrid]': { border: 'none' },
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
        )
      }
      

      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
        <DialogTitle>Inactivate Enterprise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason why you want to inactivate this account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInactivateButton} sx={{
            fontSize: { xs: "12px", sm: "14px", xl: "17px" },
            width: { xl: "80px", sm: "40px" },
            color: 'white',
            backgroundColor:
              "#315370",
            "&:hover": {
              backgroundColor: "gray"
            },
            textTransform: "none",
          }}>
            Cancel
          </Button>
          <Button onClick={handleSubmitButton} sx={{
            fontSize: { xs: "12px", sm: "14px", xl: "17px" },
            width: { xl: "100px", sm: "50px" },
            //height:"30px",
            color: 'white',
            backgroundColor:
              "#315370",
            "&:hover": {
              backgroundColor: "gray"
            },
            textTransform: "none",

          }}>
            {inactivateLoad &&
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                </svg>
              </span>
            }

            {!inactivateLoad && <span>Submit</span>}
          </Button>
        </DialogActions>
      </Dialog>

      {selectedRow && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="350px"
          sx={{ fontSize: { sm: "16px", xl: "20px" } }}
        >
          <DialogTitle
            sx={{
              fontSize: { sm: "20px", xl: "25px" },
              borderBottom: "2px solid black", // Add this line for the border
              paddingBottom: "8px",
            }}
          >
            Details for {selectedRow?.full_name}
          </DialogTitle>
          <DialogContent>
            <div className="space-y-6  space-x-4 pt-4 grid grid-cols-2">
              <p className="pt-6 pl-3">
                <strong>Name:</strong> {selectedRow?.full_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRow?.email}
              </p>
              <p>
                <strong>Mobile No:</strong> +{selectedRow?.mobileno}
              </p>
              <p>
                <strong>Company:</strong> {selectedRow?.company_name}
              </p>
              <p>
                <strong>Designation:</strong> {selectedRow?.designation}
              </p>

              <p>
                <strong>Company Size:</strong> {selectedRow?.company_size}
              </p>
              <p>
                <strong>Country:</strong> {selectedRow?.country}
              </p>
              <p>
                <strong>State:</strong> {selectedRow?.state}
              </p>
              <p>
                <strong>City:</strong> {selectedRow?.city}
              </p>
              <p>
                <strong>Email verification:</strong>{" "}
                {selectedRow?.email_verified ? ("Yes") : ("No")}
              </p>
            </div>
            {
              (selectedRow?.account_status.status === "Inactive") && (
                <div className='my-6'>
                  <p className='text-red-500 text-xl text-center'>This Account is Inactivated</p>
                </div>)
            }
          </DialogContent>
          {
            (selectedRow?.account_status.status === "Active") && (
              <DialogActions>
                <Button
                  variant="contained"

                  onClick={handleApprove}
                  sx={{
                    backgroundColor: '#315370', color: 'white',
                    '&:hover': {
                      backgroundColor: 'gray',
                    },
                  }}
                >
                  Approve
                </Button>
              </DialogActions>
            )
          }
        </Dialog>
      )}
      <TablePagination
        component="div"
        count={paginatedRows.length} // Total number of rows
        page={page} // Current page number
        onPageChange={handleChangePage} // Handler for changing page
        rowsPerPage={rowsPerPage} // Rows per page number
        onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
        labelRowsPerPage="Rows per page" // Label
      />
    </>
  );
};

export default NewEnterpriseData;