import Button from '@mui/material/Button';
import { fetchEnterpriseData } from '../../../services/api';

// Column configuration for the DataGrid
export const columns = [
<<<<<<< HEAD
    {
        field: 'id',
        headerName: 'Sr No.',
        minwidth: 100,
        flex: 1 // Fixed width with some flexibility
=======
    { 
        field: '_id', 
        headerName: 'ID', 
        width: 110,
        flex: 0.1 // Fixed width with some flexibility
>>>>>>> 019e1de9aabdfa1451a2d07424814ffbdcac6e55
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
    }
];

<<<<<<< HEAD

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
=======
// Sample row data for the DataGrid
export const rows = Array(10).fill(null).map((_, index) => ({
    _id: String(index + 1),
    full_name: "John Doe",
    email: `john.doe${index + 1}@gmail.com`,
    mobile_no: `98765432${index + 1}`,
    designation: "Software Developer",
    company_name: "TechCorp",
    company_size: 50,
    country: "USA",
    state: "California",
    city: "San Francisco",
    email_verification: index % 2 === 0 ? "yes" : "no",
}));
>>>>>>> 019e1de9aabdfa1451a2d07424814ffbdcac6e55
