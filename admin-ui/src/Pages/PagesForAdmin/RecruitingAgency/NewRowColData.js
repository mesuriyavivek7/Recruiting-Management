
import Button from '@mui/material/Button';

// Export column configuration
export const cols =(handleInactivateButton)=> [
  { field: '_id', headerName: 'ID', width: 150 },
  { field: 'full_name', headerName: 'Full Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'designation', headerName: 'Designation', width: 180 },
  { field: 'linkedin_url', headerName: 'LinkedIn URL', width: 200 },
  { field: 'interested_in', headerName: 'Interested In', width: 200},

  { field: 'company_name', headerName: 'Company Name', width: 200 },
  { field: 'company_size', headerName: 'Company Size', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'state', headerName: 'State', width: 180 },
  { field: 'city', headerName: 'City', width: 180 },
  { field: 'domains', headerName: 'Domains', width: 250, renderCell: (params) => (
    <div className="flex flex-wrap">
      {params.value.map((domain, index) => (
        <div key={index} className="text-md ">
          {domain}
        </div>
      ))}
    </div>
  )},
  { field: 'email_verified', headerName: 'Email Verified', width: 180, renderCell: (params) => (
    <span className={`${params.value ? 'bg-green-400' : 'bg-red-400'} px-6 py-2 rounded-lg text-white`}>
      {params.value ? 'Yes' : 'No'}
    </span>
  )},
  { field: 'pancard_number', headerName: 'Pancard Number', width: 180 },
  { field: 'entity_type', headerName: 'Entity Type', width: 180 },
  { field: 'createdAt', headerName: 'Created At', width: 180, renderCell: (params) => {
    const d = new Date(params.value);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }},
  { field: 'account_status', headerName: 'Account Status', width: 200, renderCell: (params) => (
    <span className={`px-6 py-2 rounded-2xl text-md text-white ${params.value === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
      {params.value}
    </span>
  )},
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    renderCell: (params) => (
      <Button onClick={(e) => handleInactivateButton(e, params.row)} variant="contained"  sx={{
        fontSize: { xs: "12px", sm: "16px", xl: "18px" },
        width: { xl: "120px", sm: "120px" },

        backgroundColor:
          "#315370",
        "&:hover": {
          backgroundColor:"gray"
        },
        textTransform: "none",
         outline: 'none', // Remove outline on focus
'&:focus': {
outline: 'none', // Ensure no outline on focus
},
      }}>
        {params.row.account_status === 'Active' ? 'Inactivate' : 'Activate'}
      </Button>
    )
  }
];



const products = [
  {
    _id: '1',
    full_name: "Zigo",
    email: "xyz@gmail.com",
    company_name: "Heryo",
    company_size: 30,
    designation: "Software Development",
    linkedin_url: "www.linkedin.com/in/zigo",
    interested_in: ["Permanent Hiring"], // Example array
    country: "India",
    state: "Gujarat",
    city: "Gandhinagar",
    domains: ["IT Recruitment", "Executive Search"],
    email_verified: true,
    pancard_number: "76556556655",
    entity_type: "jhhurturt",
    createdAt: "2022-10-12T00:00:00Z", // ISO date format
    account_status: 'Active'
  },
];


export const rows = Array(10).fill(null).map((_, index) => ({
  
  id: index + 1, // Unique ID for the row
  _id: (index + 1).toString(), // Incremental _id starting from 1
 
  full_name: products[0].full_name, // Using full_name from product
  email: products[0].email.replace('xyz', `user${index + 1}`), // Dynamic email for each row
  mobile_no: products[0].mobile_no, // Dynamic mobile number
  designation: products[0].designation,
  company_name: products[0].company_name,
  company_size: products[0].company_size,
  country: products[0].country,
  state: products[0].state,
  city: products[0].city,
  pancard_number: products[0].pancard_number,
  domains: products[0].domains, // This will hold the array of domains
  linkedin_url: products[0].linkedin_url,
  interested_in: products[0].interested_in, 
  // This will hold the array of interests
  entity_type: products[0].entity_type,
  createdAt:products[0].createdAt,
  account_status:products[0].account_status,
  email_verified: index % 2 === 0 ? "yes" : "no", // Toggle email verification
}));