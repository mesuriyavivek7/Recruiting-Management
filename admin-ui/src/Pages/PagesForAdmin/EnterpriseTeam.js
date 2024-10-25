import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Card, TablePagination, Button, Box, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import { FaPhone, FaEnvelope, FaUserCheck, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { columns } from './RowColOfEnterpriseTeam';
import { fetchEnterpriseTeam } from '../../services/api';

const EnterpriseTeam = ({ enterpriseDetails }) => {
  const [rows, setRows] = useState([]); // Holds the resolved data
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Function to map enterpriseDetails to rows
  const generateRowsFromDetails = async (details) => {
    const data = await fetchEnterpriseTeam(details._id);
    return data.map((detail, index) => ({
      _id: `${index + 1}`,
      en_name: detail.full_name || 'Unknown',
      account_role: detail.isAdmin ? "Admin" : "Member",
      active_job: detail.posted_jobs?.length || 0,
      createdAt: detail.createdAt || new Date(),
      pending_job: detail.pending_job || 0,
      status: detail.account_status || 'Inactive',
    }));
  };

  // Fetch rows when component mounts or enterpriseDetails changes
  useEffect(() => {
    if (enterpriseDetails) {
      setLoading(true);
      generateRowsFromDetails(enterpriseDetails).then((fetchedRows) => {
        setRows(fetchedRows);
        setLoading(false);
      });
    }
  }, [enterpriseDetails]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const calculateRowHeight = () => 80;

  return (
    <Card className='mt-4 font-sans shadow-md' sx={{ borderRadius: '8px', boxShadow: 3 }}>
      <div>
        <div className="py-5 px-6">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 600, width: '100%' }} className="pt-4">
              <DataGrid
                rows={paginatedRows}
                columns={columns}
                rowHeight={80}
                onRowClick={(params) => handleRowClick(params.row)}
                getRowId={(row) => row._id}
                getRowHeight={calculateRowHeight}
                pagination={false}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-root': { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' } },
                  ' [class^=MuiDataGrid]': { border: 'none' },
                  '& .MuiDataGrid-columnHeader': { fontWeight: 'bold', backgroundColor: '#e3e6ea !important' },
                  '& .MuiDataGrid-columnSeparator': { visibility: 'visible' },
                  '& .MuiDataGrid-cell': { fontSize: { xs: '0.75rem', sm: '0.875rem', lg: '1.1rem' }, minHeight: '2.5rem' },
                  '& .MuiDataGrid-row': { borderBottom: 'none' },
                }}
              />
            </div>
          )}
        </div>

        {!loading && (
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
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle className="bg-gray-600 text-white text-lg font-bold">
            Member Details
          </DialogTitle>

          <DialogContent className="bg-gray-50">
            {selectedRow && (
              <div className="bg-white shadow-md rounded-lg p-6 my-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">{selectedRow.en_name}</h2>
                  <p className="text-gray-500 pt-3">Member Information</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-black text-xl xl:text-2xl" />
                    <div className='flex gap-2 text-xl'>
                      <span className="block font-medium">Created At:</span>
                      <span>{new Date(selectedRow.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUserCheck className="mr-2 text-black text-xl xl:text-2xl" />
                    <div className='flex gap-2 text-xl'>
                      <span className="block font-medium">Role:</span>
                      <span>{selectedRow.account_role}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaBriefcase className="mr-2 text-black text-xl xl:text-2xl" />
                    <div className='flex  gap-2 text-xl'>
                      <span className="block font-medium">Posted Jobs:</span>
                      <span>{selectedRow.pending_job + selectedRow.active_job}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaPhone className="mr-2 text-black text-xl xl:text-2xl" />
                    <div className='flex gap-2 text-xl'>
                      <span className="block font-medium">Phone:</span>
                      <span>787858685</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaEnvelope className="mr-2 text-black text-xl xl:text-2xl" />
                    <div className='flex gap-2 text-xl'>
                      <span className="block font-medium">Email:</span>
                      <span>a@gmail.com</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700 text-xl">
                    <span className="font-medium text-gray-600">Account Status:</span>
                    <span className={`ml-2 font-semibold ${selectedRow.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedRow.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>

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
    </Card>
  );
};

export default EnterpriseTeam;
