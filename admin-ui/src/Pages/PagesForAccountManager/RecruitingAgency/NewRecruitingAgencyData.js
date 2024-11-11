import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Card, Button, Dialog, DialogTitle, TextField,
  DialogContentText, DialogContent, DialogActions,
  TablePagination,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../../../Components/Notification';
import { cols } from './NewRowColData';

const NewRecruitingAgencyData = () => {
  const [open, setOpen] = useState(false);
  const myValue = useSelector((state) => state.admin);
  const [recruitingAgency, setRecruitingAgency] = useState([]);
  const [selectInactive, setSelectInactive] = useState(null);
  const [notification, setNotification] = useState(null);
  const [reason, setReason] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleCloseInactivateButton = () => {
    setSelectInactive(null)
    setOpenPopup(false)

  }
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const fetchRecruitingAgency = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/acmanagerpending/${myValue.userData._id}`);
      setRecruitingAgency(res.data);
    } catch (err) {
      showNotification("There is something wrong while fetching data");
    }
  };

  useEffect(() => {
    fetchRecruitingAgency();
  }, []);
  console.log(recruitingAgency);
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleInactivateButton = async (e, item) => {
    e.stopPropagation();
    if (item?.account_status?.status === "Active") {
      setSelectInactive(item);
      setOpenPopup(true);
    } else {
      try {
        // Ensure status is a string before sending the request
        const status = item?.account_status?.status || "Unknown";  // handle undefined cases
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
          id: item._id,
          status: status,  // use the correct status value
          reason,
          admin_id: myValue?.userData?._id,
        });
        showNotification("Successfully account status changed.", "success");
        fetchRecruitingAgency();
      } catch (err) {
        showNotification("Something went wrong in account status changing...!", "failure");
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      // Again, ensure the status is properly extracted
      const status = selectInactive?.account_status?.status || "Unknown";  // handle undefined cases
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/changestatus`, {
        id: selectInactive._id,
        status: status,  // use the correct status value
        reason,
        admin_id: myValue?.userData?._id,
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

  const handleApprove = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/recruiting/acverified`, { id: selectedRow._id });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addverifiedrecruiting`, {
        m_id: myValue.userData._id,
        ra_id: selectedRow._id,
      });
      fetchRecruitingAgency();
      handleClose();
      showNotification("Successfully recruiting agency verified.", "success");
    } catch (err) {
      showNotification("There is something wrong....!", "failure");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };


  // const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const paginatedRows = recruitingAgency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <p className='text-lg xl:text-2xl'>New Recruiting Agency</p>
      <Card className='mt-4 font-sans'>

        <div style={{ height: 400, width: '100%' }}>
          {/* <DataGrid
            rows={recruitingAgency}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            onRowClick={handleRowClick}
          /> */}
          <DataGrid
            rows={recruitingAgency}
            // rows={rows} 
            getRowId={(rows) => rows.id} // Specify the custom ID field
            columns={cols(handleInactivateButton)}
            rowHeight={80}
            onRowClick={handleRowClick}
            pagination={false}
            pageSize={rowsPerPage}
            hideFooterPagination={true}

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
        <Dialog open={openPopup} onClose={handleCloseInactivateButton}>
          <DialogTitle>Inactivate Recruiting Agency</DialogTitle>
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
              width: { xl: "80px", sm: "40px" },
              color: 'white',
              backgroundColor:
                "#315370",
              "&:hover": {
                backgroundColor: "gray"
              },
              textTransform: "none",
            }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {selectedRow && (
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ fontSize: { sm: '16px', xl: '20px' } }}>
            <DialogTitle sx={{
              fontSize: { sm: '20px', xl: '25px' }, borderBottom: '2px solid black', // Add this line for the border
              paddingBottom: '8px',
            }}>Details for {selectedRow?.full_name}</DialogTitle>
            <DialogContent>
              <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
                <p className='pt-6 pl-3'><strong>Id:</strong> {selectedRow?._id}</p>
                <p><strong>Email:</strong> {selectedRow?.email}</p>
                <p><strong>Company:</strong> {selectedRow?.company_name}</p>


                <p><strong>Company Size:</strong> {selectedRow?.company_size}</p>
                <p><strong>Designation:</strong> {selectedRow?.designation}</p>
                <p><strong>Interested in:</strong> {selectedRow?.interested_in}</p>
                <p><strong>Country:</strong> {selectedRow?.country}</p>
                <p><strong>State:</strong> {selectedRow?.state}</p>
                <p><strong>City:</strong> {selectedRow?.city}</p>

                <p><strong>Email verified:</strong> {(selectedRow?.email_verified) ? ("Yes") : ("No")}</p>
                <p><strong>Pancard Number:</strong> {selectedRow?.pancard_number}</p>
                <p><strong>Entity Type:</strong> {selectedRow?.entity_type}</p>
                <p><strong>Linkedin URL:</strong> {selectedRow?.linkedin_url}</p>
                <p><strong>Domains:</strong>
                  <div className='flex flex-wrap'>
                    {selectedRow?.domains.map((domain, index) => (
                      <div className='bg-gray-200 p-1.5 m-0.5 rounded-lg text-xs' key={index}>{domain}</div>
                    ))
                    }
                  </div></p>

              </div>

              <div className='mt-6'>
                <strong className='bg-green-400 px-2 py-1 rounded-sm'>PAN Card Document:</strong>
                <div className='mt-2 w-full'>
                  {selectedRow?.kyc_documents && (
                    selectedRow?.kyc_documents.filename.endsWith('.pdf') ? (
                      <iframe src={`${process.env.REACT_APP_APP_URL}/kycdocs/${selectedRow?.kyc_documents.filename}`} width="600" height="400"></iframe>
                    ) : (
                      <img className='w-full' src={`${process.env.REACT_APP_APP_URL}/kycdocs/${selectedRow?.kyc_documents.filename}`} />
                    )
                  )}

                </div>
              </div>

            </DialogContent>
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
          </Dialog>
        )}
      </Card>

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
    </div>
  );
};

export default NewRecruitingAgencyData;

