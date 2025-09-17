import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const ScheduledInterviewsTable = () => {
  // Sample data for scheduled interviews
  const columns = [
    {
      field: 'interviewDate',
      headerName: 'Interview Date',
      headerClassName: 'super-app-theme--header',
      width: 300,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {new Date(params.value).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(params.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
    },
    {
      field: 'candidateName',
      headerName: 'Candidate Name / CID',
      headerClassName: 'super-app-theme--header',
      width: 350,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{params.row.candidateName}</span>
          <span className="text-sm text-blue-600">CID: {params.row.cid}</span>
        </div>
      ),
    },
    {
      field: 'jobId',
      headerName: 'Job ID',
      headerClassName: 'super-app-theme--header',
      width: 350,
      renderCell: (params) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
          {params.value}
        </span>
      ),
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'super-app-theme--header',
      width: 300,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {params.value.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-800">{params.value}</span>
        </div>
      ),
    },
  ];

  // Sample data
  const rows = [
    {
      id: 1,
      interviewDate: new Date('2024-01-15T10:00:00'),
      candidateName: 'John Smith',
      cid: 'CID001',
      jobId: 'JOB123',
      client: 'TechCorp Inc',
    },
    {
      id: 2,
      interviewDate: new Date('2024-01-15T14:30:00'),
      candidateName: 'Sarah Johnson',
      cid: 'CID002',
      jobId: 'JOB124',
      client: 'DataSoft Ltd',
    },
    {
      id: 3,
      interviewDate: new Date('2024-01-16T09:15:00'),
      candidateName: 'Mike Wilson',
      cid: 'CID003',
      jobId: 'JOB125',
      client: 'CloudTech Solutions',
    },
    {
      id: 4,
      interviewDate: new Date('2024-01-16T11:45:00'),
      candidateName: 'Emily Davis',
      cid: 'CID004',
      jobId: 'JOB126',
      client: 'InnovateNow',
    },
    {
      id: 5,
      interviewDate: new Date('2024-01-17T15:00:00'),
      candidateName: 'David Brown',
      cid: 'CID005',
      jobId: 'JOB127',
      client: 'FutureTech',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <Typography variant="h6" className="text-xl font-semibold text-gray-800">
          Scheduled Interviews
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-1">
          Upcoming interview schedule for the selected date range
        </Typography>
      </div>
      
      <Box sx={{ 
        height: 300, width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        },
       }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
          pageSizeOptions={[5, 10]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              background: 'red', // Set your desired background color here
              color: '#124791', // Optional: Set text color
              fontSize: '1rem',
              fontWeight: 'bold',
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ScheduledInterviewsTable;
