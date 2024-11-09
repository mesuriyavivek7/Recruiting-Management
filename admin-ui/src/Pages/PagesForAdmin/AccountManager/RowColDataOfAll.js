import { fetchAccountManagerDetails, fetchAccountManagerDetailsById, fetchAccountManagerMasterAdmin } from "../../../services/api";
import { store } from "../../../State/Store";

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
    minWidth: 180,
    align: 'left',
    renderCell: (params) => {
      const totalEnterprise = params.row?.total_enterprise || 0;

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
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'total_jobs',
    headerName: 'Total Jobs',
    flex: 1,
    minWidth: 180,
    align: 'left',
    renderCell: (params) => {
      const totalJobs = (params.row.pending_verify_enterprise || 0) + (params.row.verified_enterprise || 0);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <span>{totalJobs}</span>
        </div>
      );
    },
  },
  {
    field: 'pending_jobs',
    headerName: 'Pending Jobs',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'total_recruiter_agency',
    headerName: 'Total Recruiter Agency',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'pending_recruiter_agency',
    headerName: 'Pending Recruiter Agency',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  }
];

const selectUserData = (state) => state.admin?.userData;
const userData = selectUserData(store.getState());

let rows = [];

if (userData?.admin_type === 'master_admin') {
  // Ensure fetchAccountManagerMasterAdmin returns an array or default to an empty array
  const response = await fetchAccountManagerMasterAdmin(userData._id) || [];

  rows = await Promise.all(
    response.map(async (item, index) => {
      const acManagerDetails = await fetchAccountManagerDetailsById(item.ac_id);

      return {
        _id: index + 1,
        full_name: acManagerDetails.full_name,
        total_enterprise: (acManagerDetails.pending_verify_enterprise?.length || 0) + (acManagerDetails.verified_enterprise?.length || 0),
        pending_enterprise: acManagerDetails.pending_verify_enterprise?.length || 0,
        total_jobs: acManagerDetails.pending_jobs?.length || 0,
        pending_jobs: acManagerDetails.pending_jobs?.length || 0,
        total_recruiter_agency: (acManagerDetails.verified_recruiting_agency?.length || 0) + (acManagerDetails.pending_verify_recruiting_agency?.length || 0),
        pending_recruiter_agency: acManagerDetails.pending_verify_recruiting_agency?.length || 0,
      };
    })
  );
}

export { rows };
