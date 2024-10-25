

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CircularProgress, IconButton, InputAdornment, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns ,rows} from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';

const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const AdminAllCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); // Loader state

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/master_admin/candidate/${id}`);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = React.useState(''); // State for search
  const [filterStatus, setFilterStatus] = React.useState('All'); // Filter status state
  const [filteredRows, setFilteredRows] = React.useState(rows);

  React.useEffect(() => {
    // Simulate data fetching with a loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after data is "fetched"
    }, 1000); // Simulate 1 second loading time
  }, [rows, page, rowsPerPage]);
  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearch = () => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.candiate_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  };
  
  const handleFilterClick = (status) => {
    setFilterStatus(status);
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.candidate_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status === 'All' || row.status === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display
  

  return (
    <div>

<Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} pt={4}>
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
        border: '1px solid gray', 
        borderRadius: '0', 
        outline: 'none', 
      boxShadow: 'none', 
        borderRight: 'none',
        '&:hover': {
          backgroundColor: filterStatus === 'Active' ? '#315380' : '#e0e0e0',
          outline: 'none', 
          boxShadow: 'none', 
        },
        '&:focus': {
          outline: 'none', 
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: 'none',
        },
        '&:active': {
          outline: 'none', 
          boxShadow: 'none', 
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
        border: '1px solid gray', 
        borderRadius: '0 20px 20px 0', 
        outline: 'none', 
        boxShadow: 'none', 
        '&:hover': {
          backgroundColor: filterStatus === 'Pending' ? '#315380' : '#e0e0e0',
          outline: 'none', 
          boxShadow: 'none', 
        },
        '&:focus': {
          outline: 'none', 
          boxShadow: 'none', 
        },
        '&:focus-visible': {
          outline: 'none', 
          boxShadow: 'none',
        },
        '&:active': {
          outline: 'none', 
          boxShadow: 'none', 
        },
      }}
    >
      Pending
    </Button>
  </Box>
      </Box>
       {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 ,color:'#315370'}}>
          <CircularProgress />
        </Box>
      ) : (
      <Card className='mt-9 font-sans'>
        {/* <p className='text-lg xl:text-2xl'>All Candidates</p> */}
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
           rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          columns={columns}
          rowHeight={80} 
          onRowClick={(params) => handleRowClick(params.id)}
          getRowId={(row) => row._id} // Specify the custom ID field
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
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
              
              
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

      {!loading && (
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
      )}
    </div>
  );
};

export default AdminAllCandidateData;
