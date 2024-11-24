import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CircularProgress, TextField } from '@mui/material';
import { RcCandidatecols } from './RowColData';
import { fetchCandidateBasicDetailsById, fetchRecruiterMemberDetails, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchRecuritingTeam } from '../../../services/api';
import { cstatus } from '../../../constants/jobStatusMapping';

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

const AdminCandidate = ({ recuritingAgenciesDetails }) => {
  const [RcCandidaterow, setRcCandidaterow] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRowsFromDetails = async (details) => {
    setLoading(true)
    const recuritingTeam = await fetchRecuritingTeam(details._id);

    let submitted_candidates = recuritingTeam
      .map(team => team.submited_candidate_profile)
      .flat();

    const rows = await Promise.all(
      submitted_candidates.map(async (submitted_candidates, index) => {
        let candidateId = submitted_candidates.candidateId;

        const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
        const candidate = await fetchCandidateStatusById(basic_details.candidate_id);
        const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);

        const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
        const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey;

        const recruiterMember=await fetchRecruiterMemberDetails(candidate.recruiter_member_id)

        return {
          _id: String(index + 1),
          candidate_name: {
            first_name: basic_details?.first_name || 'No First Name',
            last_name: basic_details?.last_name || 'No Last Name',
          },
          job_title: job_basic_details?.job_title || "No Job Title",
          job_id: job_basic_details?.job_id || "No Job Id",
          candidate_status: candidateStatus,
          submitted: candidate?.createdAt || "No Submission Date",
          lastUpdated: basic_details?.updatedAt || "No Update Date",
          notice_period: basic_details?.notice_period || "N/A",
          email: basic_details?.primary_email_id || "No Email",
          mobile: basic_details?.primary_contact_number || "No Contact Number",
          recruiter_member: recruiterMember.full_name
        };
      })
    );

    setRcCandidaterow(rows)
    setLoading(false)
  };

  useEffect(() => {
    if (recuritingAgenciesDetails) {
      generateRowsFromDetails(recuritingAgenciesDetails)
    }
  }, [recuritingAgenciesDetails]);

  // Update filtered rows when the search query changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = RcCandidaterow.filter((row) => {
      const fullName = `${row.candidate_name.first_name} ${row.candidate_name.last_name}`.toLowerCase();
      return (
        fullName.includes(lowerCaseQuery) ||
        row.job_title.toLowerCase().includes(lowerCaseQuery) ||
        row.email.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredRows(filtered);
  }, [searchQuery, RcCandidaterow]);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, color: '#315370' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className='mt-8 font-sans px-4'>
          <Box sx={{
            marginBottom: 1,
            paddingTop: '5px',
          }}>
            <TextField
              fullWidth
              label="Search Candidates"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid
              rows={filteredRows}
              columns={RcCandidatecols}
              rowHeight={80}
              getRowId={(row) => row._id}
              getRowHeight={calculateRowHeight}
              pageSize={5}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' } },
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
                  color: 'black',
                  backgroundColor: '#e3e6ea',
                  minHeight: '60px',
                },
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
                  minHeight: '2.5rem',
                },
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminCandidate;
