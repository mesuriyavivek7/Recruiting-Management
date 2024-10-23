import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';
import { rows, columns } from './RowColData';
import { useNavigate } from 'react-router-dom';
import { fetchEnterpriseById } from '../../../services/api';

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
      <p className='text-lg xl:text-2xl'>All Enterprise</p>
      <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
        <DataGrid
          rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
      <TablePagination
        component="div"
        count={rows.length} // Total number of rows
        page={page} // Current page number
        onPageChange={handleChangePage} // Handler for changing page
        rowsPerPage={rowsPerPage} // Rows per page number
        onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
        labelRowsPerPage="Rows per page" // Label
      />
    </>
  );
}
