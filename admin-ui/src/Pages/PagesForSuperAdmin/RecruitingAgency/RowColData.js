import Button from '@mui/material/Button';

export const columns = [
  {
    field: 'id',
    headerName: 'Sr No.',
    minWidth: 100,
    flex: 0.1,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 250,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'company_name',
    headerName: 'Company Name',
    flex: 1.5,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1,
    minWidth: 150,
    align : 'center',
    headerAlign: 'center',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'center',
    align : 'center',
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: params.value ? 'green' : 'red',
          color: 'white',
          '&:hover': {
            backgroundColor: params.value ? 'darkgreen' : 'darkred',
          },
        }}
      >
        {params.value ? 'Yes' : 'No'}
      </Button>
    ),
  },
];
