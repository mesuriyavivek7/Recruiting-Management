
import Button from '@mui/material/Button';

// Export column configuration
export const columns = [
  { 
    field: '_id', 
    headerName: 'ID', 
    width: 110,
    flex: 0.1, // Fixed width with some flexibility
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1, // Flexible width
    minWidth: 150, // Minimum width
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
    align: 'center', 
   
  },
  {
    field: 'company_size',
    headerName: 'Company Size',
    flex: 1, 
    minWidth: 150, 
    type: 'number',
    align: 'center', 
    headerAlign: 'center', 
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1, 
    minWidth: 150, 
  },
  {
    field: 'state',
    headerName: 'State',
    flex: 1, 
    minWidth: 150, 
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1, 
    minWidth: 150, 
  },
  {
    field: 'pancard_no',
    headerName: 'PAN Card No',
    flex: 1.5, 
    minWidth: 200, 
  },

{
    field: 'domains',
    headerName: 'Domains',
    flex: 2, // Flexible width
    minWidth: 300, // Minimum width
    renderCell: (params) => (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        whiteSpace: 'normal', // Ensure text wraps
        overflow: 'visible', // Prevent scrolling inside the cell
      }}>
        {params.value.map((domain, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>
            {typeof domain === 'object' ? 
              `${Object.keys(domain)[0]}: ${Object.values(domain)[0]}` :
              domain
            }
          </div>
        ))}
      </div>
    ),
  },
  

  
  
  {
    field: 'interested_in',
    headerName: 'Interested In',
    flex: 1.5, 
    minWidth: 200, 
    renderCell: (params) => (
      <div>{params.value.join(', ')}</div>
    ),
  },
  {
    field: 'Linkedin_url',
    headerName: 'LinkedIn URL',
    flex: 2, // Flexible width
    minWidth: 250, // Minimum width
    renderCell: (params) => (
      <a href={`https://${params.value}`} target="_blank" rel="noopener noreferrer">
        {params.value}
      </a>
    ),
  },
  {
    field: 'email_verified',
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
];

const products = [
    {
      _id: '1',
      full_name: "Zigo",
      email: "xyz@gmail.com",
      mobile_no: "9876543210",
      company_name: "Heryo",
      company_size: 30,
      designation: "Software Development",
      Linkedin_url: "www.linkedin.com",
      interested_in: ["Permanent Hiring"],
      country: "India",
      state: "Gujarat",
      city: "Gandhinagar",
      domains: ["IT Recruitment", "Executive Search", "Temporary Staffing", { Education: "B.Tech" }],
      email_verified: "yes",
      pancard_no: "76556556655",
    },
  ];
  export const rows = Array(10).fill(null).map((_, index) => ({
    
    id: index + 1, // Unique ID for the row
    _id: (index + 1).toString(), // Incremental _id starting from 1
   
    full_name: products[0].full_name, // Using full_name from product
    email: products[0].email.replace('xyz', `user${index + 1}`), // Dynamic email for each row
    mobile_no: products[0].mobile_no.replace('0', `${index + 1}`), // Dynamic mobile number
    designation: products[0].designation,
    company_name: products[0].company_name,
    company_size: products[0].company_size,
    country: products[0].country,
    state: products[0].state,
    city: products[0].city,
    pancard_no: products[0].pancard_no,
    domains: products[0].domains, // This will hold the array of domains
    Linkedin_url: products[0].Linkedin_url,
    interested_in: products[0].interested_in, // This will hold the array of interests
    email_verified: index % 2 === 0 ? "yes" : "no", // Toggle email verification
  }));