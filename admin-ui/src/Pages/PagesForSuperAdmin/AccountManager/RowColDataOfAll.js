export const columns = [
  {
    field: 'sr_no',
    headerName: 'Sr No',
    flex: 0.5,
    minWidth: 80,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const index = params.row.displayIndex; // Use the new displayIndex field
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {index}
        </div>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'master_admin',
    headerName: 'Master Admin Email/Type',
    flex: 1.5,
    minWidth: 300,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const { masterAdminEmail, masterAdminType } = params.row;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{masterAdminEmail}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>
            {masterAdminType}
          </p>
        </div>
      );
    },
  },
  {
    field: 'verified_enterprise',
    headerName: 'Verified Enterprise (Count)',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const count = params.row.verified_enterprise || 0;
      return <span>{count}</span>;
    },
  },
  {
    field: 'verified_recruiter',
    headerName: 'Verified Recruiter (Count)',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const count = params.row.verified_recruiter || 0;
      return <span>{count}</span>;
    },
  },
  {
    field: 'verified_jobs',
    headerName: 'Verified Jobs (Count)',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const count = params.row.verified_jobs || 0;
      return <span>{count}</span>;
    },
  },
  {
    field: 'verified_candidates',
    headerName: 'Verified Candidates (Count)',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const count = params.row.verified_candidates || 0;
      return <span>{count}</span>;
    },
  },
];
