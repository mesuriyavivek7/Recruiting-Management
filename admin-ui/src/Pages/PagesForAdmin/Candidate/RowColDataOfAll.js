import Button from '@mui/material/Button';
import { fetchAllCandidateDetails } from '../../../services/api';

// columns.js
export const columns = [
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
  },
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
    field: 'last_update',
    headerName: 'Last Update',
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
    field: 'emai',
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

export const rows = Array(10).fill(null).map((_, index) => ({
  _id: String(index + 1),
  candidate_name: "Joravar Sinha",
  cid: '77854',
  uphire_job_id: "267",
  job_title: 'Software Developer',
  candidate_status: 'Test in process',
  submitted: '22-10-2022',
  last_update: '19-05-2024',
  notice_period: '100 days',
  emai: 'j@gmail.com',
  mobile: '76574574564'
}));