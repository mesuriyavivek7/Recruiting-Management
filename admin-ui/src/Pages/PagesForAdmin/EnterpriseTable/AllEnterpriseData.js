import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RowColData';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Notification from '../../../Components/Notification';
//Fetch Apis 
import { fetchAccountManager, fetchEnterpriseById, fetchEnterpriseVerifiedData } from '../../../services/api';

const calculateRowHeight = (params) => {
  const contentHeight = params?.row ? params?.row?.content?.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllEnterPriseData() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.admin.userData);
  const admin_id = userData._id;

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleRowClick = async (params) => {
    const id = params.id;
    const displayIndex = params?.row?.displayIndex;
    try {
      // Pass the entire response as state
      navigate(`/master_admin/enterprise/${displayIndex}`, { state: { enterpriseId: id } });
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    }
  };
  const [searchTerm, setSearchTerm] = useState(''); // State for search
  const [filterStatus, setFilterStatus] = useState('All'); // Filter status state
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

  React.useEffect(() => {

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      //Fetch enterprise data(enterprise ids)
      const data = await fetchEnterpriseVerifiedData(admin_id);
      
      const rows = await Promise.all(
        data.map(async (enterprise, index) => {
            // Fetch complete enterprise details
            const enterpriseData = await fetchEnterpriseById(enterprise);

            // Fetch account manager details
            const accountManager = await fetchAccountManager(enterpriseData?.allocated_account_manager);

            // Combine the fetched data
            return {
                id: enterpriseData._id || `enterprise-${index}`, // Ensure a unique id
                displayIndex: index + 1,
                full_name: enterpriseData.full_name || `User ${index + 1}`,
                email: enterpriseData.email || `user${index + 1}@example.com`,
                designation: enterpriseData.designation || "Not Provided",
                company_name: enterpriseData.company_name || "Unknown",
                country: enterpriseData.country || "Unknown",
                city: enterpriseData.city || "Unknown",
                email_verification: enterpriseData.email_verified ? "yes" : "no",
                account_status: enterpriseData.account_status || { status: 'Inactive', remark: '', admin_id: '' },
                account_manager_verified: enterpriseData.account_manager_verified || false,
                account_manager: accountManager ? `${accountManager.full_name}` : null,
            };
        })
    );

      // Set default filtered rows to include "All" filter
      const newFilteredRows = rows.filter((row) => {
        const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || row.account_status.status === filterStatus;
        return matchesSearch && matchesStatus;
      });
      setFilteredRows(newFilteredRows);

    } catch (error) {
      showNotification("Something went wrong.",'failure')
      console.error("Error fetching rows:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  fetchData();
  }, [searchTerm, filterStatus]); // Add searchTerm and filterStatus to the dependency array


  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };
 
  return (
    <>
       {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
          {['All', 'Active', 'Inactive'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick(status)}
              sx={{
                backgroundColor: filterStatus === status ? '#315370' : '#e0e0e0',
                color: filterStatus === status ? 'white' : 'gray',
                fontSize: '16px',
                height: '45px',
                textTransform: 'none',
                width: '120px',
                border: '1px solid gray',
                borderRadius:
                  status === 'All' ? '20px 0 0 20px' :
                    status === 'Inactive' ? '0 20px 20px 0' : '0',
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
        <div><p className='text-lg xl:text-2xl pt-8'>All Enterprise</p>
        <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
          
          <DataGrid
            rows={filteredRows}
            columns={columns}
            rowHeight={80}
            onRowClick={handleRowClick} // Pass the params directly
            getRowId={(row) => row.id} // Specify the custom ID field
            getRowHeight={calculateRowHeight}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-root': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
              },
              ' [class^=MuiDataGrid]': { border: 'none' },
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
      )}
    </>
  );
}
