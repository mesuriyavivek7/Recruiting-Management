import * as React from 'react';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        {/* Left-side Search Bar */}
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

<Box display="flex" justifyContent="center" alignItems="center" gap={0}>
    <Button
      variant={filterStatus === 'All' ? 'contained' : ''}
      onClick={() => handleFilterClick('All')}
      disableElevation
      sx={{
        backgroundColor: filterStatus === 'All' ? '#315370' : '#e0e0e0',
        color: filterStatus === 'All' ? 'white' : 'gray',
        fontSize: '16px',
        height: '45px',
        textTransform: 'none',
        borderRadius: '20px 0 0 20px', // Rounded left side
        width: '120px',
        border: '1px solid gray', // Add border
        borderRight: 'none', // Remove right border to connect buttons
        outline: 'none', // Remove outline
        boxShadow: 'none', // Remove box shadow
        '&:hover': {
          backgroundColor: filterStatus === 'All' ? '#315380' : '#e0e0e0',
          outline: 'none', // Remove outline on hover
          boxShadow: 'none', // Remove box shadow on hover
        },
        '&:focus': {
          outline: 'none', // Remove focus outline
          boxShadow: 'none', // Remove focus box shadow
        },
        '&:focus-visible': {
          outline: 'none', // Remove browser-specific focus outline
          boxShadow: 'none',
        },
        '&:active': {
          outline: 'none', // Remove outline when button is active
          boxShadow: 'none', // Remove box-shadow when active
        },
      }}
    >
      All
    </Button>

    <Button
      variant={filterStatus === 'Active' ? 'contained' : ''}
      onClick={() => handleFilterClick('Active')}
      disableElevation
      sx={{
        backgroundColor: filterStatus === 'Active' ? '#315370' : '#e0e0e0',
        color: filterStatus === 'Active' ? 'white' : 'gray',
        fontSize: '16px',
        height: '45px',
        textTransform: 'none',
        width: '120px',
        border: '1px solid gray', // Add border
        borderRadius: '0', // No rounded corners
        outline: 'none', // Remove outline
      boxShadow: 'none', // Remove box shadow
        borderRight: 'none', // Remove right border to connect buttons
        '&:hover': {
          backgroundColor: filterStatus === 'Active' ? '#315380' : '#e0e0e0',
          outline: 'none', // Remove outline on hover
          boxShadow: 'none', // Remove box shadow on hover
        },
        '&:focus': {
          outline: 'none', // Remove focus outline
          boxShadow: 'none', // Remove focus box shadow
        },
        '&:focus-visible': {
          outline: 'none', // Remove browser-specific focus outline
          boxShadow: 'none',
        },
        '&:active': {
          outline: 'none', // Remove outline when button is active
          boxShadow: 'none', // Remove box-shadow when active
        },
      }}
    >
      Active
    </Button>

    <Button
      variant={filterStatus === 'Pending' ? 'contained' : ''}
      onClick={() => handleFilterClick('Pending')}
      disableElevation
      sx={{
        backgroundColor: filterStatus === 'Pending' ? '#315370' : '#e0e0e0',
        color: filterStatus === 'Pending' ? 'white' : 'gray',
        fontSize: '16px',
        height: '45px',
        textTransform: 'none',
        width: '120px',
        border: '1px solid gray', // Add border
        borderRadius: '0 20px 20px 0', // Rounded right side
        outline: 'none', // Remove outline
        boxShadow: 'none', // Remove box shadow
        '&:hover': {
          backgroundColor: filterStatus === 'Pending' ? '#315380' : '#e0e0e0',
          outline: 'none', // Remove outline on hover
          boxShadow: 'none', // Remove box shadow on hover
        },
        '&:focus': {
          outline: 'none', // Remove focus outline
          boxShadow: 'none', // Remove focus box shadow
        },
        '&:focus-visible': {
          outline: 'none', // Remove browser-specific focus outline
          boxShadow: 'none',
        },
        '&:active': {
          outline: 'none', // Remove outline when button is active
          boxShadow: 'none', // Remove box-shadow when active
        },
      }}
    >
      Pending
    </Button>
  </Box>
      </Box>
      <p className='text-lg xl:text-2xl pt-9'>All Enterprise</p>

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
           // pagination={false}
            pageSize={rowsPerPage}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
           // hideFooterPagination={true}
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
     
    </>
  );
}
