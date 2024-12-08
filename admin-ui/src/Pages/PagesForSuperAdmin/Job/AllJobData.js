import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from './RowColDataOfAll';
import { fetchAccountManager, fetchJobBasicDetailsByJobId, fetchJobDetailsById, fetchRecruiterByEId, getAllVerifiedJobsSuperAdmin } from '../../../services/api';

const calculateRowHeight = (params) => {
  return Math.max(80);
};

const AllJobData = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [loader,setLoader]= React.useState(false)

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const { id } = params;
    const job_id = params?.row?.job_id;
    setSelectedRowId(id);
    navigate(`/super_admin/job/${id}`, {state : {job_id: job_id}});
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

  const fetchAllJobData = async () => {
    setLoader(true);
    try {
      const jobIds = await getAllVerifiedJobsSuperAdmin();
      const response = await Promise.all(
        jobIds.data.map(async (jobId, index) => {
          
          const jobs = await fetchJobDetailsById(jobId);
          const jobDetails = await fetchJobBasicDetailsByJobId(jobs.job_id);
          const recruiter = await fetchRecruiterByEId(jobs.enterprise_id);
          const account_manager = await fetchAccountManager(jobs.alloted_account_manager)

          return {
            _id: String(`${index + 1}`),
            job_title: jobDetails?.job_title || "No Title Available",
            job_id: jobDetails?.job_id || "No ID Available",
            recruiter: recruiter || "Unknown Recruiter",
            location: {
              state: jobDetails?.state || 'Unknown State',
              country: jobDetails?.country || 'Unknown Country',
            },
            experience: {
              minexp: jobDetails?.experience?.minexp || 'N/A',
              maxexp: jobDetails?.experience?.maxexp || 'N/A',
            },
            job_status: jobs?.job_status,
            createdAt: jobs?.createdAt,
            lastUpdated: jobs?.updatedAt,
            account_manager : account_manager.full_name,
          };
        })
      );
      setRows(response);
    } catch (error) {
      console.error("Error fetching all jobs: ", error);
    }
    finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    fetchAllJobData();
  }, []);

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
            loading = {loader}
            onRowClick={(params) => handleRowClick(params)}
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

export default AllJobData;
