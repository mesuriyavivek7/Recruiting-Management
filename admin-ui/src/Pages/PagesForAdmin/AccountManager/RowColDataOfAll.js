import Button from '@mui/material/Button';


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
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
   
  },
  {
    field: 'total_enterprise',
    headerName: 'Total Enterprise',
    flex: 1,
    minWidth: 200,
    align: 'left',
    renderCell: (params) => {
      const totalEnterprise = params.row?.total_enterprise|| 'No Title Available';
     
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
         
            <span>{totalEnterprise}</span>
        
        </div>
      );
    },
  },
  {
    field: 'pending_enterprise',
    headerName: 'Pending Enterprise',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'total_recruiter_agency',
    headerName: 'Total Recruiter Agency',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    
  },
  {
    field: 'pending_recruiter_agency',
    headerName: 'Pending Recruiter Agency',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
  
  },

   
 
];




// rows.js
export const rows = Array(10).fill(null).map((_, index) => ({
  _id: index + 1,
  full_name:"jsy dinh",
  total_enterprise: 'Enterprise X',
  pending_enterprise: 'Enterprise Y',
  total_recruiter_agency: 'Agency Z',
  pending_recruiter_agency: 'Agency W',
  
}));
