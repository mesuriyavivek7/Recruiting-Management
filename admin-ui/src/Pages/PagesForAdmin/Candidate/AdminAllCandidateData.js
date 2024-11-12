import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns, rows } from './RowColDataOfAll'; // Import columns configuration
import { FaSearch } from 'react-icons/fa';

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

const AdminAllCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page, rowsPerPage]);

  useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.candidate_status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, filterStatus]);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/master_admin/candidate/${id}`);
  };

  return (
    <div>
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
                  status === 'All' ? '20px 0 0 20px' :
                    status === 'Pending' ? '0 20px 20px 0' : '0',
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
        <Card className="mt-9 font-sans">
          <div style={{ height: 600, width: '100%' }} className="pt-4">
            <DataGrid
              rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
              columns={columns}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params.id)}
              getRowId={(row) => row._id}
              getRowHeight={calculateRowHeight}
             // pageSize={rowsPerPage}
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
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminAllCandidateData;
