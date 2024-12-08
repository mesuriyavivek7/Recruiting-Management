import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { colsTeam } from './RowColData';
import {
  Card, Button, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import {
  FaPhone, FaEnvelope, FaUserCheck, FaBriefcase, FaCalendarAlt
} from 'react-icons/fa';
import { fetchEnterpriseTeam, getActiveJobsCountEnMember, getPendingJobCountEnMember } from '../../../services/api';

const EnterpriseTeam = ({ enterpriseDetails }) => {
  const [rows, setRows] = useState([]); // Always an array
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map enterprise details to rows
  const generateRowsFromDetails = async (details) => {
    setLoading(true);
    try {
      const data = await fetchEnterpriseTeam(details._id);

      const detailsData = await Promise.all(
        data.map(async (detail, index) => {
          const activeJobsCount = await getActiveJobsCountEnMember(detail._id);
          const pendingJobsCount = await getPendingJobCountEnMember(detail._id);

          return {
            _id: `${index + 1}`,
            en_name: detail.full_name || 'Unknown',
            account_role: detail.isAdmin ? 'Admin' : 'Member',
            active_job: activeJobsCount || 0,
            createdAt: detail.createdAt || new Date(),
            pending_job: pendingJobsCount || 0,
            status: detail.account_status || 'Inactive',
          };
        })
      );

      setRows(detailsData);
    } catch (error) {
      console.error('Error generating rows:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rows on component mount or enterpriseDetails change
  useEffect(() => {
    if (enterpriseDetails) {
      generateRowsFromDetails(enterpriseDetails);
    }
  }, [enterpriseDetails]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  return (
    <Card className="mt-4 font-sans shadow-md" sx={{ borderRadius: '8px', boxShadow: 3 }}>
      <div className="py-5 px-6">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: 600, width: '100%' }} className="pt-4">
            <DataGrid
              rows={rows}
              columns={colsTeam}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params.row)}
              getRowId={(row) => row._id}
              pageSize={8}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': { fontSize: { xs: '0.75rem', lg: '1.09rem' } },
                ' [class^=MuiDataGrid]': { border: 'none' },
                '& .MuiDataGrid-columnHeader': { fontWeight: 'bold', fontSize: { xs: '0.875rem', lg: '1.1rem' }, backgroundColor: '#e3e6ea' },
                '& .MuiDataGrid-columnSeparator': { color: 'blue', visibility: 'visible' },
                '& .MuiDataGrid-cell': { fontSize: { xs: '0.75rem', lg: '1.1rem' }, minHeight: '2.5rem' },
                '& .MuiDataGrid-row': { borderBottom: 'none' },
                '& .MuiDataGrid-cell:focus': { outline: 'none' },
              }}
            />
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="bg-gray-600 text-white text-lg font-bold">Member Details</DialogTitle>
        <DialogContent className="bg-gray-50">
          {selectedRow && (
            <div className="bg-white shadow-md rounded-lg p-6 my-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedRow.en_name}</h2>
                <p className="text-gray-500 pt-3">Member Information</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MemberInfo label="Created At" icon={<FaCalendarAlt />} value={new Date(selectedRow.createdAt).toLocaleDateString()} />
                <MemberInfo label="Role" icon={<FaUserCheck />} value={selectedRow.account_role} />
                <MemberInfo label="Posted Jobs" icon={<FaBriefcase />} value={selectedRow.pending_job + selectedRow.active_job} />
                <MemberInfo label="Phone" icon={<FaPhone />} value="787858685" />
                <MemberInfo label="Email" icon={<FaEnvelope />} value="a@gmail.com" />
                <div className="flex items-center text-gray-700 text-xl">
                  <span className="font-medium text-gray-600">Account Status:</span>
                  <span className={`ml-2 font-semibold ${selectedRow.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedRow.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="bg-gray-100 px-6 py-6">
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};


const MemberInfo = ({ label, icon, value }) => (
  <div className="flex items-center text-gray-700">
    {icon}
    <div className='flex gap-2 text-xl'>
      <span className="block font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  </div>
);

export default EnterpriseTeam;
