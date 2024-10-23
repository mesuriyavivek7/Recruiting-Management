import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination } from '@mui/material';
import { Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns, rows } from './RowColDataOfAll'; // Import columns configuration
import { FaPhone, FaEnvelope, FaUserCheck, FaBriefcase, FaCalendarAlt, FaUsers, FaUserClock, FaClipboardList, FaBusinessTime, FaBuilding, FaUserTie } from 'react-icons/fa';
const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};
const AccountManagerTable = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (row) => {

    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
    setSelectedRowId(null);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      <Card className='mt-14 font-sans px-6'>
        <p className='text-lg xl:text-2xl'>Account Managers</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>

          <DataGrid
            rows={paginatedRows}
            columns={columns}
            rowHeight={80}
            onRowClick={(params) => handleRowClick(params.row)} // Pass the whole row object
            getRowId={(row) => row._id} // Specify the custom ID field onRowClick={(params) => handleRowClick(params.row)} // Pass the whole row object
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
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >

        <DialogTitle className="bg-gray-600 text-white text-lg font-bold">
          Account Manager Details
        </DialogTitle>


        <DialogContent className="bg-gray-50">
          {selectedRow && (
            <div className="bg-white shadow-md rounded-lg p-6 my-8">

              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">
                  {selectedRow.full_name || 'Full Name Not Available'}
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">




                <div className="flex items-center text-gray-700">
                  <FaBuilding className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Total Enterprise:</span>
                    <span>{selectedRow.total_enterprise || ' Not Available'}</span>
                  </div>
                </div>


                <div className="flex items-center text-gray-700">
                  <FaBusinessTime className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Pending Enterprise:</span>
                    <span>{selectedRow.pending_enterprise || ' Not Available'}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaUserTie className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Total Recruiter Agency:</span>
                    <span>
                      {selectedRow.total_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>


                <div className="flex items-center text-gray-700">
                  <FaUserClock className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Pending Recruiter Agency:</span>
                    <span>
                      {selectedRow.pending_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaBriefcase className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Total Jobs:</span>
                    <span>
                      {selectedRow.pending_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaClipboardList className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Pending Jobs:</span>
                    <span>
                      {selectedRow.pending_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaUsers className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Total Candidate:</span>
                    <span>
                      {selectedRow.pending_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaUserClock className="mr-2 text-black text-xl xl:text-2xl" />
                  <div className="flex gap-2 text-xl">
                    <span className="block font-medium">Pending Candidate:</span>
                    <span>
                      {selectedRow.pending_recruiter_agency || ' Not Available'}
                    </span>
                  </div>
                </div>


              </div>
            </div>
          )}
        </DialogContent>


        {/* Dialog Actions */}
        <DialogActions className="bg-gray-100 px-6 py-6">
          <button
            onClick={handleClose}
            className="bg-gray-600 hover:bg-blue-230 text-white px-4 py-2 text-xl rounded-md transition-all duration-200"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default AccountManagerTable;
