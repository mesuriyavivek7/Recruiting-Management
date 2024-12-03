import Button from '@mui/material/Button';

// Column configuration for the DataGrid
export const columns = [
    {
        field: 'displayIndex',
        headerName: 'ID',
        width: 110,
        flex: 0.1 // Fixed width with some flexibility
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        flex: 1, // Flexible width
        minWidth: 175, // Minimum width
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 2, // Flexible width with more space
        minWidth: 250, // Minimum width
    },
    {
        field: 'designation',
        headerName: 'Designation',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
    },
    {
        field: 'company_name',
        headerName: 'Company Name',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
    },
    {
        field: 'country',
        headerName: 'Country',
        flex: 1, // Flexible width
        minWidth: 150, // Minimum width
    },
    {
        field: 'city',
        headerName: 'City',
        flex: 1, // Flexible width
        minWidth: 150, // Minimum width
    },
    {
        field: 'email_verification',
        headerName: 'Email Verification',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: params.value === 'yes' ? '#16a34a' : '#ef4444',
                        color: 'white',
                    }}
                >
                    {params.value}
                </Button>
            </div>
        ),
    },
    {
        field: 'account_status',
        headerName: 'Account Status',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: params.value.status === 'Active' ? '#16a34a' : '#ef4444',
                        color: 'white',
                    }}
                >
                    {params.value.status}
                </Button>
            </div>
        ),
    },
    {
        field: 'account_manager_verified',
        headerName: 'Ac Manager Verified',
        flex: 1, // Flexible width
        minWidth: 220, // Minimum width
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: params.value ? '#16a34a' : '#ef4444',
                        color: 'white',
                    }}
                >
                    {params.value ? 'Yes' : 'No'}
                </Button>
            </div>
        ),
    },
    {
        field: 'account_manager',
        headerName: 'Account Manager',
        flex: 1.5, // Flexible width with moderate space
        minWidth: 200, // Minimum width
    },
];

