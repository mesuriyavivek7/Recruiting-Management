import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, InputAdornment, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { store } from '../../../State/Store';
import { cstatus } from '../../../constants/jobStatusMapping';
import axios from 'axios'
import WhiteLoader from '../../../assets/whiteloader.svg'
import { fetchCandidateBasicDetailsById, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchPostedCandidateProfileByJobId } from '../../../services/api';
import Notification from '../../../Components/Notification';
import { columns } from '../Candidate/RowColDataOfAll';
import { getValueFromValueOptions } from '@mui/x-data-grid/components/panel/filterPanel/filterPanelUtils';

const calculateRowHeight = (params) => {
    const contentHeight = params.row ? params.row.content.length / 10 : 50;
    return Math.max(80, contentHeight);
};


const AllCandidateDataForEachJob = ({ jobId }) => {
    const navigate = useNavigate();

    const selectUserData = (state) => state?.admin?.userData;
    const userData = selectUserData(store?.getState());

    const [loading, setLoading] = useState(false);
    const [candidateStatusLoader, setCandidateStatusLoader] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filteredRows, setFilteredRows] = useState([]);

    const [notification, setNotification] = useState(null)

    //for showing notification
    const showNotification = (message, type) => {
        setNotification({ message, type })
    }

    const handleRowClick = (id) => {
        navigate(`/master_admin/candidate/${id}`);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            //Fetch verified candidate ids
            const verifiedCandiatesIds = await fetchPostedCandidateProfileByJobId(jobId);
            console.log(verifiedCandiatesIds);
            const rows = await Promise.all(verifiedCandiatesIds.map(async (candidateId, index) => {

                const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
                const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
                const candidate = await fetchCandidateStatusById(basic_details.candidate_id)

                // Get candidate status, defaulting to "Status Unavailable" if not found

                const candidateStatus = candidate.candidate_status || "Status Unavailable"; // Map status or use original

                return {
                    orgcandidateid: candidate._id,
                    candidate_id: basic_details.candidate_id,
                    _id: String(index + 1),
                    candidate_name: {
                        first_name: basic_details?.first_name || 'No First Name',
                        last_name: basic_details?.last_name || 'No Last Name',
                    },
                    job_title: job_basic_details?.job_title || "No Job Title",
                    job_id: job_basic_details?.job_id || "No Job Id",
                    candidate_status: candidateStatus,
                    submitted: basic_details?.createdAt || "No Submission Date",
                    lastUpdated: basic_details?.updatedAt || "No Update Date",
                    notice_period: basic_details?.notice_period || "N/A",
                    email: basic_details?.primary_email_id || "No Email",
                    mobile: basic_details?.primary_contact_number || "No Contact Number"
                };
            })
            );

            const newFilteredRows = rows.filter((row) => {
                const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
                const matchesSearch = fullName.includes(searchTerm.toLowerCase());
                const matchesStatus = filterStatus === 'All' || cstatus.get(row.candidate_status) === filterStatus;
                return matchesSearch && matchesStatus;
            });

            setFilteredRows(newFilteredRows);

        } catch (err) {
            console.log(err)
            showNotification("Something went wrong while fetching candidate data.", 'failure')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchTerm, filterStatus]);

    const candiadteStatusChange = async (e, id) => {
        try {
            setCandidateStatusLoader(true)
            await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/changecandidatestatus/${id}`, { status: e.target.value })
            await fetchData()
            showNotification("Successfully candidate status changed.", 'success')
        } catch (err) {
            setCandidateStatusLoader(false)
            showNotification("Something wrong while changeing candidate status.", "failure")
            console.log(err)
        }
        setCandidateStatusLoader(false)
    }


    return (
        <div>
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
            {
                candidateStatusLoader &&
                <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
                    <div className='custom-div w-[450px] p-4 items-center'>
                        <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
                        <p>Please wait till we update resume status.</p>
                    </div>
                </div>
            }
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} pt={4}>
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
                            '& fieldset': { borderColor: 'gray' },
                            '&:hover fieldset': { borderColor: '#315370' },
                            '&.Mui-focused fieldset': { borderColor: '#315370' },
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

                <Box display="flex" gap={0}>
                    {['All', 'Offer Accepted'].map((status) => (
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
                                width: status === "Offer Accepted" ? '180px' : "150px",
                                border: '1px solid gray',
                                borderRadius:
                                    status === 'All' ? '20px 0 0 20px' :
                                        status === 'Offer Accepted' ? '0 20px 20px 0' : '0',
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
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Card className='mt-8 border p-2 font-sans'>
                    <p className='text-lg xl:text-2xl'>All Candidates</p>
                    <div style={{ height: 600, width: '100%' }} className='pt-4'>

                        <DataGrid
                            rows={filteredRows}
                            columns={columns(candiadteStatusChange, handleRowClick)}
                            rowHeight={80}
                            getRowId={(row) => row._id} // Specify the custom ID field
                            getRowHeight={calculateRowHeight}
                            pageSize={8}
                            pageSizeOptions={[5, 10]}
                            initialState={{
                                pagination: { paginationModel: { page: 0, pageSize: 10 } },
                            }}
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
                </Card>)}
        </div>
    );
};

export default AllCandidateDataForEachJob;
