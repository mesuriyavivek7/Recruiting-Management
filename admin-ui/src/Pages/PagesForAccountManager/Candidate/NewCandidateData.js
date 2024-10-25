

import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns ,rows} from './RowColDataOfNew'; // Import columns configuration


const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const NewCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/account_manager/candidate/${id}`);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const myValue=useSelector((state) => state.admin);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Calculate the rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='mt-9 font-sans'>
        <p className='text-lg xl:text-2xl'>New Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
          rows={paginatedRows}
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
      </Card>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
    </div>
  );
};

export default NewCandidateData;
