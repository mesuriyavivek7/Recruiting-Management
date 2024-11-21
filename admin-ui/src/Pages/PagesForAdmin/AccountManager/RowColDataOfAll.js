
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



