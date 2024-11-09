import Button from '@mui/material/Button';
import { fetchRecuritingAgencybyId, fetchVerifiedRAgenciesByACmanagerId } from '../../../services/api';
import { store } from '../../../State/Store';
export const columns = [
  {
    field: 'id',
    headerName: 'Sr No.',
    minWidth: 100,
    flex: 0.1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 250,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'designation',
    headerName: 'Designation',
    flex: 1.5,
    minWidth: 150,
    align: 'center',
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
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email_verified',
    headerName: 'Email Verification',
    flex: 1.5,
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
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

const selectUserData = (state) => state?.admin?.userData;
const userData = selectUserData(store?.getState());
console.log(userData);

// Proceed only if userData.admin_type is 'account_manager'
let rows = [];
if (userData?.admin_type === "account_manager") {
  const verifiedAgenciesIds = await fetchVerifiedRAgenciesByACmanagerId(userData?._id);
  console.log(verifiedAgenciesIds);

  // Fetch enterprise details for each ID
  rows = await Promise.all(
    verifiedAgenciesIds.map(async (r_agency_id, index) => {
      const agency = await fetchRecuritingAgencybyId(r_agency_id);
      return {
        id: index + 1,
        full_name: agency.full_name || `User ${index + 1}`,
        email: agency.email || `user${index + 1}@example.com`,
        designation: agency.designation || "Not Provided",
        company_name: agency.company_name || "Unknown",
        country: agency.country || "Unknown",
        city: agency.city || "Unknown",
        domains: Array.isArray(agency.domains) ? agency.domains : [], // Ensure it's an array
        firm_type: Array.isArray(agency.firm_type) ? agency.firm_type : [], // Ensure it's an array
        linkedin_url: agency.linkedin_url || "Not Provided", // Fallback if not provided
        email_verified: agency.email_verified ? "Yes" : "No",
      };
    })
  );
} else {
  console.log("User is not an account manager, skipping recruiting agency data fetch.");
}

export { rows };
