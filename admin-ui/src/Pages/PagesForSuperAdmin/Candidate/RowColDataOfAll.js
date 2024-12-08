import { format, formatDistanceToNowStrict } from 'date-fns';
import { Box, Skeleton } from '@mui/material';

// columns.js
export const columns = [
  {
    field: '_id',
    headerName: 'Sr No.',
    flex: 1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'candidate_name',
    headerName: 'Candidate Name',
    flex: 2,
    minWidth: 230,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const first_name = params.row?.candidate_name?.first_name || 'No First Name';
      const last_name = params.row?.candidate_name?.last_name || 'No Last Name';
      return (
        <div>
          {first_name} {last_name}
        </div>
      );
    },
  },
  {
    field: 'job_title',
    headerName: 'Job Title',
    flex: 2,
    minWidth: 200,
    align: 'left',
    renderCell: (params) => {
      const jobTitle = params.row?.job_title || 'No Title Available';
      const jobId = params.row?.job_id || 'No ID Available';

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{jobTitle}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{jobId}</p>
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.email.length > 15 
          ? `${params.row.email.slice(0, 15)}...` 
          : params.row.email}
      </div>
    ),
  },  
  {
    field: 'mobile',
    headerName: 'Contact',
    flex: 2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        +{params.row.mobile}
      </div>
    ),
  },
  {
    field: 'candidate_status',
    headerName: 'Candidate Status',
    flex: 1,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell : (params) =>(
       <div className='flex w-full h-full items-center'>
         <span className='h-8 bg-slate-50 border border-blue-400 p-2 rounded-md flex justify-center items-center'>
           {params.row.candidate_status}
         </span>
       </div>
    )
  },
  {
    field: 'notice_period',
    headerName: 'Notice Period',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <div>
        {params.row.notice_period} Days
      </div>
    ),
  },
  {
    field: 'recruiter_member',
    headerName: 'Recruiter Member',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'acmanager',
    headerName: 'Account Manager',
    flex: 1,
    minWidth: 180,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'submitted',
    headerName: 'Created On',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const SubmittedDate = new Date(params.row.submitted); // Parse ISO date string
      const formattedDate = format(SubmittedDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(SubmittedDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    flex: 1,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const updatedDate = new Date(params.row.lastUpdated); // Parse ISO date string
      const formattedDate = format(updatedDate, 'dd-MMM-yy'); // Format the date as 13-Sep-23
      const timeAgo = formatDistanceToNowStrict(updatedDate, { addSuffix: true }); // Get "X days ago"

      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '8px 0' }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            <span>{formattedDate}</span>
          </p>
          <p style={{ margin: 0, color: 'gray', lineHeight: 1.5 }}>{timeAgo}</p>
        </div>
      );
    },
  },


];


export const TableSkeleton = ({ rowsPerPage = 5 }) => {
  const columnWidths = columns.map(() => '180px').join(' '); // Uniform column widths

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Table Header Skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: columnWidths,
          gap: 1,
          mb: 2,
        }}
      >
        {columns.map((col, index) => (
          <Skeleton
            key={`header-${index}`}
            variant="rectangular"
            height={40}
            animation="wave"
            sx={{ bgcolor: 'grey.300' }}
          />
        ))}
      </Box>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
        <Box
          key={`row-${rowIndex}`}
          sx={{
            display: 'grid',
            gridTemplateColumns: columnWidths,
            gap: 1,
            mb: 1,
          }}
        >
          {columns.map((_, colIndex) => (
            <Skeleton
              key={`row-${rowIndex}-col-${colIndex}`}
              variant="rectangular"
              height={60}
              animation="wave"
              sx={{ bgcolor: 'grey.200' }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
