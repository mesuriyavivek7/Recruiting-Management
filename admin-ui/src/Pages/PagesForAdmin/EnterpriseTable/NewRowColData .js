import { Button } from '@mui/material';

// Function to format date
export const getFormateDate = (cdate) => {
  console.log("cdate", cdate);
  if (!cdate) return "N/A";  // Handle null or undefined dates
  const d = new Date(cdate);

  // Ensure date parsing is successful
  if (isNaN(d.getTime())) return "Invalid Date";

  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

// DataGrid columns configuration
export const columns = (handleInactivateButton) => [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'full_name', headerName: 'Full Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'mobileno', headerName: 'Mobile No.', width: 200, 
    renderCell:(params)=> (
      <span>+{params?.row?.mobileno}</span>
    ) 
  },
  { field: 'designation', headerName: 'Designation', width: 200 },
  { field: 'company_name', headerName: 'Company Name', width: 200 },
  { field: 'company_size', headerName: 'Company Size', width: 180 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'state', headerName: 'State', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    width: 180,
    renderCell: (params) => (
      <span className={`px-6 py-1.5 rounded-2xl text-md text-white ${params.value ? 'bg-green-500' : 'bg-red-500'}`}>
        {params?.value ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    field: 'account_status',
    headerName: 'Account Status',
    width: 200,
    renderCell: (params) => (
      <span className={`px-6 py-1.5 rounded-2xl text-md text-white ${params.value.status === 'Active' ? 'bg-green-600' : 'bg-gray-500'}`}>
        {params?.value?.status}
      </span>
    ),
  },
  {
    field: 'action',
    headerName: 'Action',
    width: '250',
    renderCell: (params) => (
      <div className="flex gap-2 pt-4">
        <Button
          onClick={(e) => handleInactivateButton(e, params?.row)}
          variant="contained"
          sx={{
            fontSize: { xs: "12px", sm: "16px", xl: "18px" },
            width: { xl: "120px", sm: "120px" },
            backgroundColor: "#315370",
            "&:hover": { backgroundColor: "gray" },
            textTransform: "none",
            outline: 'none', // Remove outline on focus
            '&:focus': { outline: 'none' },
          }}
        >
          {params?.row?.account_status?.status === "Active" ? 'Inactivate' : 'Reactivate'}
        </Button>
      </div>
    ),
  },
];
