import Button from '@mui/material/Button';

// Column configuration for the DataGrid
export const columns = [
    {
        field: 'id',
        headerName: 'Sr No.',
        minWidth: 90,
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
        field: 'account_status',
        headerName: 'Account Status',
        flex: 1, // Flexible width
        minWidth: 180, // Minimum width
        renderCell: (params) =>(
          <div className='w-full h-full flex items-center'>
           <span className={`${params.row.account_status==="Active"?"bg-green-500":"bg-red-500"} text-white h-8 w-28 flex rounded-md justify-center items-center`}>{params.row.account_status}</span>
          </div>
        )
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