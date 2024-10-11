import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

import { FaFilePdf } from 'react-icons/fa'; // Import the PDF icon from react-icons


// columns.js
export const columns =(handleCandidateClick)=> [
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
        const candidateName = params.row.candidate_basic_details.first_name+" " +params.row.candidate_basic_details.last_name || 'No Title Available'; // Fallback if undefined
        const pdfLink = params.row.candidate_attachments?.evaluation_form?.filepath; 
    
        return (
          <div style={{ display: 'flex', alignItems: 'center',gap:'30px' }}>
             <span  style={{ marginLeft: 8, cursor: 'pointer' }} 
       
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} 
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'} 
                onClick={() => handleCandidateClick(params)}>{candidateName}</span>
            {/* PDF Icon Button */}
            <IconButton
              size="small"
              onMouseDown={(e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                if (pdfLink) {
                  window.open(pdfLink, '_blank'); 
                } else {
                  alert('PDF link is not available'); 
                }
              }}
              tabIndex={-1} 
              sx={{
                '&:focus': {
                  outline: 'none', 
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
          {params.row.job_id} - {params.row.job_title}
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
      field: 'last_update',
      headerName: 'Last Update',
      flex: 1,
      minWidth: 150,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div>
          {params.row.candidate_basic_details.updatedAt}
        </div>
      ),
    },
    {
      field: 'notice_period',
      headerName: 'Notice Period',
      flex: 1,
      minWidth: 150,
      headerAlign: 'left',
      align: 'center',
      renderCell: (params) => (
        <div>
          {params.row.candidate_basic_details.notice_period}
        </div>
      ),
    },
    {
      field: 'emai',
      headerName: 'Email/Mobile',
      flex: 2,
      minWidth: 250,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div>
          {params.row.candidate_basic_details.primary_email_id} - {params.row.candidate_basic_details.primary_contact_number}
        </div>
      ),
    },
  ];
  
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