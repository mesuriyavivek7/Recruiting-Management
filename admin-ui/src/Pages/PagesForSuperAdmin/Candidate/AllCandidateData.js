
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll'; // Import columns configuration
import { fetchCandidateBasicDetailsById,  fetchCandidateStatusById, fetchJobBasicDetailsByJobId, getAllVerifiedCandidatesSuperAdmin } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';

const calculateRowHeight = (params) => {

  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};
const AllCandidateData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    navigate(`/super_admin/candidate/${id}`);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchAllCandidateData = async () => {
    try {
      const candidateIds = await getAllVerifiedCandidatesSuperAdmin();
      const response = await Promise.all(
        candidateIds.data.map(async (candidateId, index) => {
          const candidateDetails = await fetchCandidateBasicDetailsById(candidateId);
          const basic_details = candidateDetails.basic_details;

          const c_id = basic_details.candidate_id;
          const candidate = await fetchCandidateStatusById(c_id);
          const job_basic_details = await fetchJobBasicDetailsByJobId(candidate.job_id);

          // Get candidate status, defaulting to "Status Unavailable" if not found
          const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
          const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey;

          return {
            _id: String(index + 1),
            candidate_name: {
              first_name: basic_details?.first_name || 'No First Name',
              last_name: basic_details?.last_name || 'No Last Name',
            },
            job_title: job_basic_details?.job_title || "No Job Title",
            job_id: job_basic_details?.job_id || "No Job Id",
            candidate_status: candidateStatus,
            submitted: basic_details?.createdAt || "No Submission Date",
            lastUpdated: basic_details?.updatedAt || "No Update Date", 
            notice_period: basic_details?.notice_period || "N/A", 
            email: basic_details?.primary_email_id || "No Email", 
            mobile: basic_details?.primary_contact_number || "No Contact Number"
          };
        })
      );
      setRows(response);
    } catch (error) {
      console.error("Error fetching candidate details: ", error);
    }
  };

  React.useEffect(() => {
    fetchAllCandidateData();
  }, [rows]);

  // Calculate the rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='font-sans'>
        <div style={{ height: 600, width: '100%' }}>
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
    </div>
  );
};

export default AllCandidateData;
