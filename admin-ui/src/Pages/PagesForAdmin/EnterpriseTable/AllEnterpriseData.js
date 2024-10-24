import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';
import { rows, columns } from './RowColData';
import { useNavigate } from 'react-router-dom';
import { fetchEnterpriseById } from '../../../services/api';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

const calculateRowHeight = (params) => {
  const contentHeight = params?.row ? params?.row?.content?.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllEnterPriseData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleRowClick = async (params) => {
    const id = params.id;
    const displayIndex = params?.row?.displayIndex;
    try {
      const response = await fetchEnterpriseById(id);
      // Pass the entire response as state
      navigate(`/master_admin/enterprise/${displayIndex}`, { state: { enterpriseDetails: response } });
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    }
  };
  const [searchTerm, setSearchTerm] = React.useState(''); // State for search
  const [filterStatus, setFilterStatus] = React.useState('All'); // Filter status state
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [loading, setLoading] = React.useState(false); // Loader state

  React.useEffect(() => {
    // Simulate data fetching with a loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after data is "fetched"
    }, 1000); // Simulate 1 second loading time
  }, [rows, page, rowsPerPage]);

  const handleSearch = () => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  };
  
  const handleFilterClick = (status) => {
    setFilterStatus(status);
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status === 'All' || row.status === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  };
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {/* Left-side Search Bar */}
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '500px',
            borderRadius: '12px',
            height: '20px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#315370', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#315370', // Border color when focused (typing)
              },
            },
          }} // Adjust width as necessary
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <FaSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Right-side Filter Buttons */}
        <Box display="flex" gap={1}>
          <Button
              variant={filterStatus === 'All' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('All')}
              sx={{
                backgroundColor: filterStatus === 'All' ? '#315370' : '#e0e0e0',
                color: filterStatus === 'All' ? 'white' : 'gray',
                borderColor: 'gray',
                fontSize: '16px',
                height:'50px',
                textTransform: 'none',
                border: '2px solid ', 
                borderRadius: '10px',  // Rounded left side
                width: '120px',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: filterStatus === 'All' ? '#315380' : '#e0e0e0',
                },
              }}
            >
              All
            </Button>

            <Button
              variant={filterStatus === 'Active' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('Active')}
              sx={{
                backgroundColor: filterStatus === 'Active' ? '#315370' : '#e0e0e0',
                color: filterStatus === 'Active' ? 'white' : 'gray',
                borderColor: 'gray',
                fontSize: '16px',
                height:'50px',
                textTransform: 'none',
                border: '2px solid ', 
                borderRadius: '10px',  // Rounded left side
                width: '120px',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: filterStatus === 'Active' ? '#315380' : '#e0e0e0',
                },
              }}
            >
              Active
            </Button>

            <Button
              variant={filterStatus === 'Pending' ? 'contained' : ''}
              onClick={() => handleFilterClick('Pending')}
              sx={{
                backgroundColor: filterStatus === 'Pending' ? '#315370' : '#e0e0e0',
                color: filterStatus === 'Pending' ? 'white' : 'gray',
                borderColor: 'gray',
                fontSize: '16px',
                height:'50px',
                textTransform: 'none',
                border: '2px solid ', 
                borderRadius: '10px',  // Rounded left side
                width: '120px',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: filterStatus === 'Pending' ? '#315380' : '#e0e0e0',
                },
              }}
            >
              Pending
            </Button>
        </Box>
      </Box>
      <p className='text-lg xl:text-2xl pt-12'>All Enterprise</p>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 ,color:'#315370'}}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
          <DataGrid
             rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            columns={columns}
            rowHeight={80}
            onRowClick={handleRowClick} // Pass the params directly
            getRowId={(row) => row.id} // Specify the custom ID field
            getRowHeight={calculateRowHeight}
            pagination={false}
            pageSize={rowsPerPage}
            hideFooterPagination={true}
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
      )}
      {!loading && (
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page} // Current page number
          onPageChange={handleChangePage} // Handler for changing page
          rowsPerPage={rowsPerPage} // Rows per page number
          onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
          rowsPerPageOptions={[5, 10, 25]} // Rows per page options
          labelRowsPerPage="Rows per page" // Label
        />
      )}
    </>
  );
}
