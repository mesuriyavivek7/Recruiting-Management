import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RowColData';
import { fetchRecuritingAgencybyId, getAllVerifiedRecruitingAgenciesSuperAdmin, fetchAccountManager } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../Components/Notification';
import { Button, CircularProgress, TextField } from '@mui/material';

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllRecruitingAgencyData() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const fetchAllRecruitingAgencyData = async () => {
    setLoading(true);
    try {
      const recruitingAgencyIds = await getAllVerifiedRecruitingAgenciesSuperAdmin();
      const response = await Promise.all(
        recruitingAgencyIds.data.map(async (recruitingAgencyId, index) => {
          const agency = await fetchRecuritingAgencybyId(recruitingAgencyId);
          const account_manager = await fetchAccountManager(agency.alloted_account_manager);

          return {
            _id: agency._id,
            id: index + 1,
            full_name: agency.full_name || `User ${index + 1}`,
            mobileno: agency.mobileno || "none",
            email: agency.email || `user${index + 1}@example.com`,
            designation: agency.designation || "Not Provided",
            company_name: agency.company_name || "Unknown",
            country: agency.country || "Unknown",
            city: agency.city || "Unknown",
            domains: Array.isArray(agency.domains) ? agency.domains : [],
            firm_type: Array.isArray(agency.firm_type) ? agency.firm_type : [],
            linkedin_url: agency.linkedin_url || "Not Provided",
            email_verified: agency.email_verified ? "Yes" : "No",
            account_status: agency.account_status?.status || "Inactive",
            account_manager: account_manager.full_name || "None",
          };
        })
      );
      setRows(response);
    } catch (error) {
      showNotification("Something went wrong while fetching data", 'failure');
      console.error("Error fetching recruiting agency details: ", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllRecruitingAgencyData();
  }, []);

  React.useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || row.account_status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, filterStatus, rows]);

  const handleRowClick = (params) => {
    const id = params.row._id;
    navigate(`/super_admin/recruiting-agency/${id}`, { state: { r_agency_id: id } });
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '600px',
            '& .MuiOutlinedInput-root': {
              padding: '0',
              '& input': {
                height: '30px',
                padding: '8px',
              },
              '& fieldset': {
                borderColor: 'gray',
              },
            },
          }}
        />
        <Box display="flex" gap={0}>
          {['All', 'Active', 'Inactive'].map((status) => (
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
                  status === 'All' ? '20px 0 0 20px' : status === 'Inactive' ? '0 20px 20px 0' : '0',
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
          <DataGrid
            getRowId={(rows) => rows._id}
            rows={filteredRows}
            columns={columns}
            rowHeight={80}
            getRowHeight={calculateRowHeight}
            onRowClick={(params) => handleRowClick(params)}
            pageSize={8}
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
                minHeight: '2.5rem',
              },
              '& .MuiDataGrid-cellContent': {
                display: 'flex',
                alignItems: 'center',
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
