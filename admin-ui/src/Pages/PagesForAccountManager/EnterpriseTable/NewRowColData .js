// columns.js
import { Button } from '@mui/material';
// enterpriseColumns.js
export const getFormateDate = (cdate) => {
    if(cdate){
    let d = new Date(cdate);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }else{
      return '-'
    }
  };
  
  export const columns = (handleInactivateButton) => [
    { field: 'displayIndex', headerName: 'Sr No', width: 90 },
    { field: 'full_name', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'mobileno', headerName: 'Mobile No.', width: 200,
    renderCell: (params)=>(
      <span>+{params.row.mobileno}</span>
    )
    },
    { field: 'designation', headerName: 'Designation', width: 180 },
    { field: 'company_name', headerName: 'Company Name', width: 220 },
    { field: 'company_size', headerName: 'Company Size', width: 200 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    {
      field: 'email_verified',
      headerName: 'Email Verification',
      width: 180,
      renderCell: (params) => (
        <span className={`px-8 py-2 rounded-2xl text-md text-white ${params.value ? 'bg-green-500' : 'bg-red-500'}`}>
          {params.value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      renderCell: (params) => (
        <span>{getFormateDate(params.row.createdAt)}</span>
      ),
    },
    {
      field: 'account_status',
      headerName: 'Account Status',
      width: 200,
      
      renderCell: (params) => (
        <span className={`px-8 py-2 rounded-2xl text-md text-white ${params.value.status === 'Active' ? 'bg-blue-500' : 'bg-gray-500'}`}>
          {params.value.status}
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
            onClick={(e) => handleInactivateButton(e, params.row)}
            
            variant="contained"
       
            sx={{
             fontSize: { xs: "12px", sm: "16px", xl: "18px" },
             width: { xl: "120px", sm: "120px" },
                
             backgroundColor:
               "#315370",
             "&:hover": {
               backgroundColor:"gray"
             },
             textTransform: "none",
             outline: 'none', // Remove outline on focus
            '&:focus': {
              outline: 'none', // Ensure no outline on focus
            },
            }}
          >
           {params.row.account_status.status === "Active" ? 'Inactivate' : 'Reactivate'}
          </Button>
        </div>
      ),
    },
  ];
  