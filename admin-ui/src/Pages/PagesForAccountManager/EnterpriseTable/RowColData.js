import Button from '@mui/material/Button';
import { fetchEnterpriseData } from '../../../services/api';

// Column configuration for the DataGrid
export const columns = [
    {
        field: 'id',
        headerName: 'Sr No.',
        minWidth: 110,
        flex: 1
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 2,
        minWidth: 250,
    },
    {
        field: 'designation',
        headerName: 'Designation',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'company_name',
        headerName: 'Company Name',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'country',
        headerName: 'Country',
        flex: 1,
        minWidth: 150,
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
    }

];

const data = await fetchEnterpriseData();

export const rows = data.map((enterprise, index) => ({
    id: index + 1,
    full_name: enterprise.full_name || `User ${index + 1}`,
    email: enterprise.email || `user${index + 1}@example.com`,
    designation: enterprise.designation || "Not Provided",
    company_name: enterprise.company_name || "Unknown",
    country: enterprise.country || "Unknown",
    city: enterprise.city || "Unknown",
    email_verification: enterprise.isEmailVerified ? "yes" : "no",
}));


