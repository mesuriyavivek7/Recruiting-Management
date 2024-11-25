import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Card, Button, Dialog, DialogTitle, TextField,
  DialogContentText, DialogContent, DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../../../Components/Notification';
import { cols } from './NewRowColData';
import { FaEnvelope, FaBuilding, FaUsers, FaPhone, FaBriefcase, FaMapMarkerAlt, FaCity, FaCheckCircle, FaLinkedin, FaGlobe } from 'react-icons/fa';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';

const NewRecruitingAgencyData = () => {
  const [open, setOpen] = useState(false);
  const myValue = useSelector((state) => state.admin);
  const [recruitingAgency, setRecruitingAgency] = useState([]);
  const [selectInactive, setSelectInactive] = useState(null);
  const [notification, setNotification] = useState(null);
  const [reason, setReason] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loader,setLoader]=useState(false)

  const handleCloseInactivateButton = () => {
    setSelectInactive(null)
    setOpenPopup(false)

  }

  const fetchRecruitingAgency = async () => {
    setLoader(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_APP_URL}/recruiting/acmanagerpending/${myValue.userData._id}`);

      const resAddIds=res.data.map((item,index)=> ({...item,id:index+1}))
      setRecruitingAgency(resAddIds);
    } catch (err) {
      showNotification("Something went wrong while fetching data",'failure');
      console.log(err)
    }finally{
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchRecruitingAgency();
  }, []);

  
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
  
  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <p className='text-lg xl:text-2xl'>New Recruiting Agency</p>
      <Card className='mt-4 font-sans'>

        <div style={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={recruitingAgency}
            getRowId={(rows) => rows.id} // Specify the custom ID field
            columns={cols(handleInactivateButton)}
            rowHeight={80}
            onRowClick={handleRowClick}
            pageSize={8}
            loading={loader}
            pageSizeOptions={[5, 10]}
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

        {/* Dialog box for Show Recruiter preview */}
        {selectedRow && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
          {/* Dialog Title */}
          <DialogTitle className="bg-gray-600 text-white text-lg font-bold">
            Details for {selectedRow?.full_name}
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent className="bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-6 my-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">
                  {selectedRow.full_name}
                </h2>
                <p className="text-gray-500 pt-1">Member Information</p>
              </div>
           <div className='flex items-start'>
              {/* Professional details container */}
             <div className='flex flex-col gap-6'> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Email */}
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2 text-black text-md xl:text-xl" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Email:</span>
                    <span>{selectedRow?.email}</span>
                  </div>
                </div>

                {/* Mobile No */}
                <div className="flex items-center text-gray-700">
                  <FaPhone className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Mobile No:</span>
                    <span>+{selectedRow?.mobileno}</span>
                  </div>
                </div>

                {/* Designation */}
                <div className="flex items-center text-gray-700">
                  <FaBriefcase className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Designation:</span>
                    <span>{selectedRow?.designation}</span>
                  </div>
                </div>

                {/* Company Name */}
                <div className="flex items-center text-gray-700">
                  <FaBuilding className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Company Name:</span>
                    <span>{selectedRow?.company_name}</span>
                  </div>
                </div>

                {/* Company Size */}
                <div className="flex items-center text-gray-700">
                  <FaUsers className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Company Size:</span>
                    <span>{selectedRow?.company_size}</span>
                  </div>
                </div>

                {/* Country */}
                <div className="flex items-center text-gray-700">
                  <FaGlobe className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Country:</span>
                    <span>{selectedRow?.country}</span>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">State:</span>
                    <span>{selectedRow?.state}</span>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center text-gray-700">
                  <FaCity className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">City:</span>
                    <span>{selectedRow?.city}</span>
                  </div>
                </div>

                {/* Linkedin */}
                <div className="flex items-center text-gray-700">
                  <FaLinkedin className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">LinkedIn Url:</span>
                    <a className='text-blue-400' rel="noreferrer" target='_blank' href={`${selectedRow?.linkedin_url}`}><InsertLinkOutlinedIcon></InsertLinkOutlinedIcon></a>
                  </div>
                </div>

                {/* Kyc Submited */}
                <div className="flex items-center text-gray-700">
                  <FaCheckCircle className="mr-2 text-black text-md" />
                  <div className="flex gap-2 text-[18px]">
                    <span className="block font-medium">Kyc Submited:</span>
                    <span>{(selectedRow.kyc_details)?("Yes"):("No")}</span>
                  </div>
                </div>

                {/* Entity type */}
                {
                  selectedRow.kyc_details && 
                  <div className="flex items-center text-gray-700">
                    <CorporateFareOutlinedIcon className="mr-2 text-black text-md" />
                    <div className="flex gap-2 text-[18px]">
                      <span className="block font-medium">Entity Type:</span>
                      <span>{selectedRow?.kyc_details.entity_type}</span>
                    </div>
                  </div>
                }

                {/* Pancard number */}
                {
                  selectedRow.kyc_details && 
                  <div className="flex items-center text-gray-700">
                    <CreditCardOutlinedIcon className="mr-2 text-black text-md" />
                    <div className="flex gap-2 text-[18px]">
                      <span className="block font-medium">Pancard Number:</span>
                      <span>{selectedRow?.kyc_details.pancard_number}</span>
                    </div>
                  </div>
                }
              </div>
              <div className='flex items-center gap-2'>
                 <span className='flex items-center gap-1'><DomainOutlinedIcon></DomainOutlinedIcon> Domains:</span>
                 {
                  selectedRow?.domains.map((item)=>(
                    <span className='py-1 px-1.5 rounded-md bg-gray-200 text-sm flex justify-center items-center'>{item}</span>
                  ))
                 }
              </div>
              <div className='flex items-center gap-2'>
                 <span className='flex items-center gap-1'><CallToActionOutlinedIcon></CallToActionOutlinedIcon> Interested in:</span>
                 {
                  selectedRow?.firm_type.map((item)=>(
                    <span className='py-1 px-1.5 rounded-md bg-gray-200 text-sm flex justify-center items-center'>{item}</span>
                  ))
                 }
              </div>

              </div>
              <div className='border rounded-md bg-gray-50 overflow-hidden flex justify-center items-center w-[600px] h-[400px]'>
                {
                  selectedRow.kyc_details?(
                    <iframe title='kyc docs' className='transform scale-100 origin-top-left w-full h-full' src={`${process.env.REACT_APP_APP_URL}/kycdocs/${selectedRow.kyc_documents?.filename}`}></iframe>
                  ):(
                     <span>KYC details are not submitted.</span>
                  )
                }
                
              </div>
            </div>
            </div>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions className="bg-gray-100 px-6 py-6">
            <Button
              onClick={handleClose}
              sx={{
              fontSize: { xs: "12px", sm: "14px", xl: "17px" },
              width: { xl: "100px", sm: "40px" },
              color: 'white',
              backgroundColor:
                "#315370",
              "&:hover": {
                backgroundColor: "gray"
              },
              textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
            onClick={handleApprove}
            sx={{
              fontSize: { xs: "12px", sm: "14px", xl: "17px" },
              width: { xl: "100px", sm: "40px" },
              color: 'white',
              backgroundColor:
                "#315370",
              "&:hover": {
                backgroundColor: "gray"
              },
              textTransform: "none",
              }}
            >Approve</Button>
            
          </DialogActions>
        </Dialog>
      )}
      </Card>

    </div>
  );
};

export default NewRecruitingAgencyData;

