

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';
import { rows, columns } from './RowColData';
import { styled } from '@mui/system';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllRecruitingAgencyData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, filterStatus]); // Re-run filter logic whenever searchTerm or filterStatus changes


  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page, rowsPerPage]);

  const handleRowClick = async (params) => {
    const id = params.id;
    const displayIndex = params?.row?.displayIndex;
    try {
      navigate(`/account_manager/recruiting-agency/${displayIndex}`, { state: { r_agency_id: id } });
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    }
  };

  return (
    <> <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
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
        {['All', 'Active', 'Pending'].map((status) => (
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
                status === 'All' ? '20px 0 0 20px' : status === 'Pending' ? '0 20px 20px 0' : '0',
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
        <div>
          <p className='text-lg xl:text-2xl'>All Recruiting Agency </p>
          <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
            <DataGrid
              getRowId={(rows) => rows._id} // Specify the custom ID field
              rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
              columns={columns}
              rowHeight={80}
              getRowHeight={calculateRowHeight}
              onRowClick={(params) => handleRowClick(params)}
              pageSize={rowsPerPage}
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



