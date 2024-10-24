import Button from '@mui/material/Button';
import { fetchEnterpriseData, fetchAccountManager } from '../../../services/api';

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
                        backgroundColor: params.value === 'yes' ? 'green' : 'red',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: params.value === 'yes' ? 'darkgreen' : 'darkred',
                        },
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
                        backgroundColor: params.value.status === 'Active' ? 'green' : 'red',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: params.value.status === 'Active' ? 'darkgreen' : 'darkred',
                        },
                    }}
                >
                    {params.value.status}
                </Button>
            </div>
        ),
    },
    {
        field: 'admin_verified',
        headerName: 'Admin Verified',
        flex: 1, // Flexible width
        minWidth: 150, // Minimum width
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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

const data = await fetchEnterpriseData();

export const rows = await Promise.all(
    data
        .filter((enterprise) => enterprise.admin_verified === true)
        .map(async (enterprise, index) => {
            const accountManager = await fetchAccountManager(enterprise.allocated_account_manager);

            return {
                id: enterprise._id,
                displayIndex: index + 1,
                full_name: enterprise.full_name || `User ${index + 1}`,
                email: enterprise.email || `user${index + 1}@example.com`,
                designation: enterprise.designation || "Not Provided",
                company_name: enterprise.company_name || "Unknown",
                country: enterprise.country || "Unknown",
                city: enterprise.city || "Unknown",
                email_verification: enterprise.email_verified ? "yes" : "no",
                account_status: enterprise.account_status || { status: 'Inactive', remark: '', admin_id: '' }, // Default to 'Inactive' if no status
                admin_verified: enterprise.admin_verified || false, // Default to false if not present
                account_manager: accountManager ? `${accountManager.full_name} ` : null, // Fetch account manager's name
            };
        })
);
