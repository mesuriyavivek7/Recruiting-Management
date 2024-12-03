import { Button } from "@mui/material";

export const cols = (handleInactivateButton) => [
  {field: "id", headerName:"ID",width:100},
  { field: 'full_name', headerName: 'Full Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 280 },
  { field: 'designation', headerName: 'Designation', width: 180 },
  { field: 'linkedin_url', headerName: 'LinkedIn URL', width: 200 },
  { field: 'company_name', headerName: 'Company Name', width: 200 },
  { field: 'company_size', headerName: 'Company Size', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'state', headerName: 'State', width: 180 },
  { field: 'city', headerName: 'City', width: 180 },
  {
    field: 'email_verified',
    headerName: 'Email Verified',
    width: 180,
    renderCell: (params) => (
      <span className={`${params.value ? 'bg-green-400' : 'bg-red-400'} px-6 py-2 rounded-lg text-white`}>
        {params.value ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 180,
    renderCell: (params) => {
      const d = new Date(params.value);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    },
  },
  {
    field: 'account_status',
    headerName: 'Account Status',
    width: 200,
    renderCell: (params) => {
      const accountStatus = typeof params.value === 'string' ? params.value : params.value?.status;
      return (
        <span
          className={`px-6 py-2 rounded-2xl text-md text-white ${accountStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {accountStatus || 'Unknown'}
        </span>
      );
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    renderCell: (params) => (
      <Button
        onClick={(e) => handleInactivateButton(e, params.row)}
        variant="contained"
        sx={{
          fontSize: { xs: '12px', sm: '16px', xl: '18px' },
          width: { xl: '120px', sm: '120px' },
          backgroundColor: '#315370',
          '&:hover': { backgroundColor: 'gray' },
          textTransform: 'none',
          outline: 'none',
          '&:focus': { outline: 'none' },
        }}
      >
        {params.row.account_status.status === 'Active' ? 'Inactivate' : 'Activate'}
      </Button>
    ),
  },
];



