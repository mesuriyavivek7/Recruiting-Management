import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

import { FaFilePdf } from 'react-icons/fa'; // Import the PDF icon from react-icons
import { fetchAllCandidateDetails, fetchCandidateStatusById } from '../../../services/api';


// columns.js
export const columns = (handleCandidateClick) => [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
  },

  {
    field: 'candidate_name',
    headerName: 'Candidate Name',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const candidateName = params.row.candidate_name || 'No Title Available'; // Fallback if undefined
      const pdfLink = params.row.pdfLink; // Get the PDF link from the row data

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ marginLeft: 8, cursor: 'pointer' }} // Ensure cursor pointer

            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} // Add hover effect
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'} // Remove hover effect
            onClick={() => handleCandidateClick(params)}>{candidateName}</span>
          {/* PDF Icon Button */}
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the default focus behavior
              e.stopPropagation(); // Prevent the row click event
              if (pdfLink) {
                window.open(pdfLink, '_blank'); // Open PDF in a new tab
              } else {
                alert('PDF link is not available'); // Alert if PDF link is undefined
              }
            }}
            tabIndex={-1} // Prevent focus
            sx={{
              '&:focus': {
                outline: 'none', // Remove focus outline
              },
            }}
          >
            <FaFilePdf style={{ color: 'red', fontSize: '20px' }} /> {/* PDF icon */}
          </IconButton>

        </div>
      );
    },
  }
  ,
  {
    field: 'uphire_job_id',
    headerName: 'UpHire Job ID/Title',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.uphire_job_id} - {params.row.job_title}
      </div>
    ),
  },
  {
    field: 'candidate_status',
    headerName: 'Candidate Status',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'submitted',
    headerName: 'Submitted',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'notice_period',
    headerName: 'Notice Period',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'email',
    headerName: 'Email/Mobile',
    flex: 2,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.emai} - {params.row.mobile}
      </div>
    ),
  },
];


export const data = await fetchAllCandidateDetails();
// console.log(data[0]._id);

const candidate_status = await fetchCandidateStatusById(data[0]._id);
// console.log(candidate_status);

export const rows = Array(10).fill(null).map((_, index) => ({
  _id: String(index + 1),
  candidate_name: "Joravar Sinha",
  cid: '77854',
  uphire_job_id: "267",
  pdfLink: 'https://example.com/path/to/candidate1.pdf', // URL for the PDF
  job_title: 'Software Developer',
  candidate_status: 'Test in process',
  submitted: '22-10-2022',
  last_update: '19-05-2024',
  notice_period: '100 days',
  emai: 'j@gmail.com',
  mobile: '76574574564'
}));