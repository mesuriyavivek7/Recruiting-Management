import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CircularProgress } from '@mui/material';
import { RcCandidatecols } from './RowColData';
import { fetchCandidateDetailsByRecruiterId, fetchCandidateStatusById, fetchJobBasicDetailsByJobId } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

const AcCandidate = ({ recuritingAgenciesDetails }) => {
  const [RcCandidaterow, setRcCandidaterow] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRowsFromDetails = async (details) => {
    const data = await fetchCandidateDetailsByRecruiterId(details._id);

    const rows = await Promise.all(
      data.map(async (candidateDetails, index) => {
        const c_id = candidateDetails.candidate_id;
        const candidate = await fetchCandidateStatusById(c_id);
        const job_basic_details = await fetchJobBasicDetailsByJobId(candidate.job_id);

        const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
        const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey;

        return {
          _id: String(index + 1),
          candidate_name: {
            first_name: candidateDetails?.first_name || 'No First Name',
            last_name: candidateDetails?.last_name || 'No Last Name',
          },
          job_title: job_basic_details?.job_title || "No Job Title",
          job_id: job_basic_details?.job_id || "No Job Id",
          candidate_status: candidateStatus,
          submitted: candidateDetails?.createdAt || "No Submission Date",
          lastUpdated: candidateDetails?.updatedAt || "No Update Date",
          notice_period: candidateDetails?.notice_period || "N/A",
          email: candidateDetails?.primary_email_id || "No Email",
          mobile: candidateDetails?.primary_contact_number || "No Contact Number"
        };
      })
    );

    return rows;
  };

  useEffect(() => {
    if (recuritingAgenciesDetails) {
      setLoading(true);
      generateRowsFromDetails(recuritingAgenciesDetails).then((fetchedRows) => {
        setRcCandidaterow(fetchedRows);
        setLoading(false);
      });
    }
  }, [recuritingAgenciesDetails]);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };


  return (
    <div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className='mt-9 font-sans px-4'>
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid
              rows={RcCandidaterow}
              columns={RcCandidatecols}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params.id)}
              getRowId={(row) => row._id}
              getRowHeight={calculateRowHeight}
              pageSize={8}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' } },
                ' [class^=MuiDataGrid]': { border: 'none' },
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                  color: 'black',
                  backgroundColor: '#e3e6ea',
                  minHeight: '60px',
                },
                '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus': { outline: 'none' },
                '& .MuiDataGrid-columnSeparator': { color: 'blue', visibility: 'visible' },
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
                  minHeight: '2.5rem',
                },
                '& .MuiDataGrid-cellContent': { display: 'flex', alignItems: 'center' },
                '& .MuiDataGrid-row': { borderBottom: 'none' },
              }}
            />
          </div>
         
        </Card>
      )}
    </div>
  );
};

export default AcCandidate;
