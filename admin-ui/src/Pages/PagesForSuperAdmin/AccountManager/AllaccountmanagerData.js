import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { columns } from './RowColDataOfAll';
import { fetchAccountManagers, fetchMasterAdminDetailsById } from '../../../services/api';
import Notification from '../../../Components/Notification';

const calculateRowHeight = () => {
  return 80; // Default row height
};

const AllAccountManagers = () => {
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchAllAccountManagerData = async () => {
    setLoader(true);
    try {
      const accountManagers = await fetchAccountManagers();

      const formattedRows = await Promise.all(accountManagers.map(async (manager, index) => {
        const masterAdminDetails = await fetchMasterAdminDetailsById(manager.master_admin);
        const masterAdminEmail = masterAdminDetails.email || 'N/A';
        const masterAdminType = masterAdminDetails.master_admin_type || 'N/A';

        return {
          id: manager._id || index + 1,
          displayIndex: index + 1,
          name: manager.full_name || 'N/A',
          email: manager.email || 'No Email',
          masterAdminEmail: masterAdminEmail,
          masterAdminType: masterAdminType,
          verified_enterprise: manager.verified_enterprise?.length || 0,
          verified_recruiter: manager.verified_recruiting_agency?.length || 0,
          verified_jobs: manager.verified_jobs?.length || 0,
          verified_candidates: manager.verified_candidate_profile?.length || 0,
        };
      }));
      setRows(formattedRows);
      setFilteredRows(formattedRows); // Initially set filtered rows to all rows
    } catch (error) {
      showNotification('Failed to fetch account managers', 'error');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchAllAccountManagerData();
  }, []);

  useEffect(() => {
    // Filter rows based on search term
    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]);

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '600px',
            '& .MuiOutlinedInput-root': {
              padding: 0,
              '& input': { height: '30px', padding: '8px' },
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#315370' },
              '&.Mui-focused fieldset': { borderColor: '#315370' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FaSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Card>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={filteredRows}
            columns={columns}
            rowHeight={80}
            loading={loader}
            getRowHeight={calculateRowHeight}
            disableSelectionOnClick
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
      </Card>
    </div>
  );
};

export default AllAccountManagers;
