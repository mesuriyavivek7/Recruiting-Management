import Button from '@mui/material/Button';
import { fetchAccountManager, fetchEnterpriseById, fetchEnterpriseVerifiedData } from '../../../services/api';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

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

export const useRows = () => {
    const userData = useSelector((state) => state.admin.userData);
    const admin_id = userData._id;
    const getRows = useMemo(() => {
        return async () => {
            const data = await fetchEnterpriseVerifiedData(admin_id);

            const rows = await Promise.all(
                data.map(async (enterprise, index) => {
                    // Fetch complete enterprise details
                    const enterpriseData = await fetchEnterpriseById(enterprise);

                    // Fetch account manager details
                    const accountManager = await fetchAccountManager(enterpriseData?.allocated_account_manager);

                    // Combine the fetched data
                    return {
                        id: enterpriseData._id || `enterprise-${index}`, // Ensure a unique id
                        displayIndex: index + 1,
                        full_name: enterpriseData.full_name || `User ${index + 1}`,
                        email: enterpriseData.email || `user${index + 1}@example.com`,
                        designation: enterpriseData.designation || "Not Provided",
                        company_name: enterpriseData.company_name || "Unknown",
                        country: enterpriseData.country || "Unknown",
                        city: enterpriseData.city || "Unknown",
                        email_verification: enterpriseData.email_verified ? "yes" : "no",
                        account_status: enterpriseData.account_status || { status: 'Inactive', remark: '', admin_id: '' },
                        account_manager_verified: enterpriseData.account_manager_verified || false,
                        account_manager: accountManager ? `${accountManager.full_name}` : null,
                    };
                })
            );

            return rows; // Return the rows array
        };
    }, [userData]); // Add dependencies if necessary

    return getRows;
};
