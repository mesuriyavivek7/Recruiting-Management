import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { fetchAcceptedRecruiterMemberIds, fetchRecruiterMemberDetails } from '../../../services/api';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import Notification from '../../../Components/Notification';
import { columns } from './RowColMappedReMember';

export default function AcceptedRecruiterMember({jobId}) {

 const [recruiterData,setRecruiterData]=useState([])
 const [loader,setLoader]=useState(false)

 const [searchTerm, setSearchTerm] = useState('');
 const [filterStatus, setFilterStatus] = useState('All');

 const [notification, setNotification] = React.useState(null);


 const fetchData=async () =>{
    setLoader(true)
     try{
       //Fetch mapped recruiter member ids
       const recruiterMemberIds=await fetchAcceptedRecruiterMemberIds(jobId)

       const recruiterMemberDetails=await Promise.all(recruiterMemberIds.map(async (rememberid)=>{
           const recruiter=await fetchRecruiterMemberDetails(rememberid)
           
           if(recruiter) return recruiter
           else return null
       }))

       //Filter out recruiter member details 
       const filterRecruiterMemberDetails = recruiterMemberDetails.filter((item)=>item!==null)

       //Filter by search and status
       const newFilteredRows = filterRecruiterMemberDetails.filter((row) => {
        const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || row.account_status === filterStatus;
        return matchesSearch && matchesStatus;
      });

       setRecruiterData(newFilteredRows.map((item,index)=>({...item,id:index+1})))

     }catch(err){
         console.log(err)
         showNotification("Something went wrong.",'failure')
     }finally{
        setLoader(false)
     }
 }

 useEffect(()=>{
     fetchData()
 },[searchTerm,filterStatus])

    
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
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} p={3}>
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
      <p className='text-lg xl:text-2xl px-[20px]'>Accepted Recruiting Member </p>
      <Box sx={{ height: 600, width: '100%', padding: '20px' }}>
        <DataGrid
          rows={recruiterData}
          columns={columns}
          rowHeight={80}
          getRowHeight={calculateRowHeight}
          pageSize={8}
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
    </>
  )
}
