import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RowColData';
import { fetchRecuritingAgencybyId, getAllVerifiedRecruitingAgenciesSuperAdmin, fetchAccountManager } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../Components/Notification';
  
const calculateRowHeight = (params) => {

   const contentHeight = params.row ? params.row.content.length / 10 : 50;
   return Math.max(80, contentHeight);
 };

export default function AllRecruitingAgencyData() {
  const navigate=useNavigate()
  const [rows, setRows] = React.useState([]);  


  const [notification, setNotification] = React.useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const [loader,setLoader]= React.useState(false)

  const fetchAllRecruitingAgencyData = async () => {
    setLoader(true)
    try {
      const recruitingAgencyIds = await getAllVerifiedRecruitingAgenciesSuperAdmin();

      const response = await Promise.all(
        recruitingAgencyIds.data.map(async (recruitingAgencyId, index) => {
          const agency = await fetchRecuritingAgencybyId(recruitingAgencyId);

          const account_manager = await fetchAccountManager(agency.alloted_account_manager)

          return {
            _id: agency._id,
            id: index + 1,
            full_name: agency.full_name || `User ${index + 1}`,
            mobileno: agency.mobileno || "none",
            email: agency.email || `user${index + 1}@example.com`,
            designation: agency.designation || "Not Provided",
            company_name: agency.company_name || "Unknown",
            country: agency.country || "Unknown",
            city: agency.city || "Unknown",
            domains: Array.isArray(agency.domains) ? agency.domains : [],
            firm_type: Array.isArray(agency.firm_type) ? agency.firm_type : [],
            linkedin_url: agency.linkedin_url || "Not Provided",
            email_verified: agency.email_verified ? "Yes" : "No",
            account_manager: account_manager.full_name || "None"
          };
        })
      );
      setRows(response);
    } catch (error) {
      showNotification("Something went wrong while fetching data",'failure')
      console.error("Error fetching recruiting agency details: ", error);
    } finally{
       setLoader(false)
    }
  };

  //for navigate
  const handleRowClick = async (params) =>{
      const id = params.row._id
      navigate(`/super_admin/recruiting-agency/${id}` , {state : {r_agency_id: id}})
  } 

  React.useEffect(() => {
    fetchAllRecruitingAgencyData();
  }, []);

  return (
    <>
      {notification && (
        <Notification
          open={true}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          getRowId={(rows) => rows.id} // Specify the custom ID field
          rows={rows}
          columns={columns}
          rowHeight={80}
          loading={loader}
          onRowClick={(params)=>handleRowClick(params)}
          getRowHeight={calculateRowHeight}
          pagination={false}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSize={8}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
            },

            ' [class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !impotant',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
              color: 'black',

              '&:focus': {
                outline: 'none',
                border: 'none',
              },
              backgroundColor: '#e3e6ea !important',
              minHeight: '60px',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'blue',
              visibility: 'visible',
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
            },
            '& .MuiDataGrid-cellContent': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-cell': {
              minHeight: '2.5rem',
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
            },
            '& .MuiDataGrid-row': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },

          }}
        />
      </Box>

    </>
  );
}



