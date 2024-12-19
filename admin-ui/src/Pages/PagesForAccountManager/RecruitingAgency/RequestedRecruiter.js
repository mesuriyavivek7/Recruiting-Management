import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import Notification from '../../../Components/Notification';
import { fetchRecruiterMemberDetails, getOrgJobId, fetchRequestedRecruiterIds, fetchRecruiterAgencyName, fetchAcmanagerNameEmail } from '../../../services/api';
import { columns } from './RowColMappedReMember';
import axios from 'axios'

export default function RequestedRecruiter({ jobId , handleAcceptedRecruiterCount }) {

    const [recruiterData, setRecruiterData] = useState([])
    const [loader, setLoader] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [notification, setNotification] = React.useState(null);
    const [open,setOpen] = useState(false)
    const [selectedRow,setSelectedRow] = useState(null)
    const [approveLoad,setApproveLoad] = useState(false)

    const handleApprove = async (rememberid) =>{
         setApproveLoad(true)
         try{
          //Get orgjobid
          const orgjobid =await getOrgJobId(jobId)

          //update recruiter side
          await axios.put(`${process.env.REACT_APP_API_APP_URL}/recruitingteam/addintoacceptedlist`,{orgjobid,rememberid})
          
          //update job side
          await axios.put(`${process.env.REACT_APP_API_APP_URL}/job/addrememberacceptedlist`,{orgjobid,rememberid})
          await handleAcceptedRecruiterCount()
          await fetchData()
          setOpen(false)
          showNotification("Successfully accepted recruiter member.",'success')

         }catch(err){
             showNotification("Something went wrong while approve recruiter member",'failure')
             console.log(err)
         }finally{
             setApproveLoad(false)
         }
    }

    const fetchData = async () => {
        setLoader(true)
        try {
            const recruiterMemberIds = await fetchRequestedRecruiterIds(jobId)

            const recruiterMemberDetails = await Promise.all(recruiterMemberIds.map(async (rememberid) => {
                const recruiter = await fetchRecruiterMemberDetails(rememberid)
                
                //For getting acmanager name and email using r_agency_id
                const acdetails = await fetchAcmanagerNameEmail(recruiter.recruiting_agency_id)

                //For getting recruiter agency name usign r_agency_id
                const ragencyname = await fetchRecruiterAgencyName(recruiter.recruiting_agency_id)

                if (recruiter && acdetails) return {...recruiter,acname:acdetails.full_name,acemail:acdetails.email,ragencyname:ragencyname.full_name}
                else return null
            }))

            //Filter out recruiter member details 
            const filterRecruiterMemberDetails = recruiterMemberDetails.filter((item) => item !== null)
    
            //Filter by search and status
            const newFilteredRows = filterRecruiterMemberDetails.filter((row) => {
                const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = filterStatus === 'All' || row.account_status === filterStatus;
                return matchesSearch && matchesStatus;
            });

            setRecruiterData(newFilteredRows.map((item, index) => ({ ...item, id: index + 1 })))

        } catch (err) {
            console.log(err)
            showNotification("Something went wrong.", 'failure')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchTerm, filterStatus])

    const handleRowClick = (row) =>{
         setOpen(true)
         setSelectedRow(row)
    }

    const handleClose = ()=>{
        setOpen(false)
        setSelectedRow(null)
    }


    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    const calculateRowHeight = (params) => {
        const contentHeight = params.row ? params.row.content.length / 10 : 50;
        return Math.max(80, contentHeight);
    };

    return (
        <>
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
                {/* Search Bar */}
                <TextField
                    label="Search..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: '600px',
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-root': {
                            padding: '0',
                            '& input': {
                                height: '30px',
                                padding: '8px',
                            },
                            '& fieldset': {
                                borderColor: 'gray',
                            },
                            '&:hover fieldset': {
                                borderColor: '#315370',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#315370',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchTerm(searchTerm)}>
                                    <FaSearch />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Filter Buttons */}
                <Box display="flex" gap={0}>
                    {['All', 'Active', 'Inactive'].map((status) => (
                        <Button
                            key={status}
                            variant={filterStatus === status ? 'contained' : 'outlined'}
                            onClick={() => setFilterStatus(status)}
                            sx={{
                                backgroundColor: filterStatus === status ? '#315370' : '#e0e0e0',
                                color: filterStatus === status ? 'white' : 'gray',
                                fontSize: '16px',
                                height: '45px',
                                textTransform: 'none',
                                width: '120px',
                                border: '1px solid gray',
                                borderRadius:
                                    status === 'All' ? '20px 0 0 20px' : status === 'Inactive' ? '0 20px 20px 0' : '0',
                                '&:hover': {
                                    backgroundColor: filterStatus === status ? '#315380' : '#e0e0e0',
                                },
                            }}
                        >
                            {status}
                        </Button>
                    ))}
                </Box>
            </Box>


            <div className='mt-8'>
                <p className='text-lg xl:text-2xl'>Requested Recruiting Member </p>
                <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
                    <DataGrid
                        rows={recruiterData}
                        columns={columns}
                        rowHeight={80}
                        getRowHeight={calculateRowHeight}
                        pageSize={8}
                        onRowClick={(params)=>handleRowClick(params.row)}
                        loading={loader}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                        pageSizeOptions={[5, 10]}
                        disableSelectionOnClick
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
                            '& .MuiDataGrid-cellContent': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '& .MuiDataGrid-cell': {
                                minHeight: '2.5rem',
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
                </Box>
            </div>

    {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="500px"
          sx={{ fontSize: { sm: "18px", xl: "20px" } }}
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
                <strong>Acount Role:</strong> {selectedRow?.isAdmin?"Admin":"Member"}
              </p>
              <p>
                <strong>Ac Name:</strong> {selectedRow?.acname}
              </p>
              <p>
                <strong>Ac Email:</strong> {selectedRow?.acemail}
              </p>
              <p>
                <strong>Agency Owner:</strong> {selectedRow?.ragencyname}
              </p>
              <p>
                <strong>Email verification:</strong>{" "}
                {selectedRow?.email_verified ? ("Yes") : ("No")}
              </p>
            </div>
          </DialogContent>
          
            
           <DialogActions
            sx={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center"
            }}
           >
              <Button onClick={()=>handleApprove(selectedRow?._id)}
              disabled={approveLoad}
              sx={{
              fontSize: { xs: "12px", sm: "14px", xl: "17px" },
              width: { xl: "120px", sm: "100px" },
              height: {xl: "40px", sm:"35px"},
              //height:"30px",
              color: 'white',
              backgroundColor:
                "#315370",
              "&:hover": {
                backgroundColor: "gray"
             },
              textTransform: "none",

            }}>
              {approveLoad &&
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                </svg>
              </span>
             }
              {!approveLoad && <span>Approve</span>}
             </Button>
          </DialogActions>
            
          
        </Dialog>
      )}
        </>
    )
}
