import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RowColData';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { fetchRecuritingAgencybyId, fetchVerifiedRAgenciesByACmanagerId } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../State/Store';
import Notification from '../../../Components/Notification';

const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllRecruitingAgencyData() {
  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate=useNavigate();

  const [notification, setNotification] = React.useState(null);

    
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  React.useEffect(() => {
    const fetchData=async ()=>{
      setLoading(true)
      try{
        //Fetching verified recruiter agencyies id
        const data = await fetchVerifiedRAgenciesByACmanagerId(userData?._id);

        const rows = data ? await Promise.all(data.map(async (agency_id, index) => {
            const agency = await fetchRecuritingAgencybyId(agency_id);
            return {
              _id: agency._id,
              displayIndex: index + 1,
              full_name: agency.full_name || `User ${index + 1}`,
              email: agency.email || `user${index + 1}@example.com`,
              designation: agency.designation || "Not Provided",
              company_name: agency.company_name || "Unknown",
              country: agency.country || "Unknown",
              city: agency.city || "Unknown",
              domains: Array.isArray(agency.domains) ? agency.domains : [], // Ensure it's an array
              firm_type: Array.isArray(agency.firm_type) ? agency.firm_type : [], // Ensure it's an array
              linkedin_url: agency.linkedin_url || "Not Provided", // Fallback if not provided
              email_verified: agency.email_verified ? "Yes" : "No",
              account_status:agency.account_status.status
           };}))
           : [];

        const newFilteredRows = rows.filter((row) => {
          const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = filterStatus === 'All' || row.account_status === filterStatus;
          return matchesSearch && matchesStatus;
        });
        
        setFilteredRows(newFilteredRows)

      }catch(err){
         console.log(err)
         showNotification("Something went wrong while fetching data",'error')
      }finally{
        setLoading(false)
      }
    }

     fetchData()
  }, [searchTerm, filterStatus]); // Re-run filter logic whenever searchTerm or filterStatus changes

 
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
 
  const handleRowClick = async (params) => {
    const id = params.id;
    try {
      //const response = await fetchRecuritingAgencyById(id);
      navigate(`/account_manager/recruiting-agency/${id}`, { state: { r_agency_id: id } });
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    }
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
  {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
            <CircularProgress />
          </Box>
        ) : (
          <div className='mt-8'>
      <p className='text-lg xl:text-2xl'>All Recruiting Agency </p>
      <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
        <DataGrid
          getRowId={(rows) => rows._id} // Specify the custom ID field
          rows={filteredRows}
          columns={columns}
          rowHeight={80}
          getRowHeight={calculateRowHeight}
          onRowClick={(params) => handleRowClick(params)}
          pageSize={8}
          loading={loading}
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
      </Box>

      </div>)}





     
    </>
  );
}



