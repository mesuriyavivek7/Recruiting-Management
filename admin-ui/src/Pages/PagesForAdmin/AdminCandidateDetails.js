import { useState } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import { FaBriefcase, FaInfoCircle } from 'react-icons/fa'; // React Icons
import { Button, Divider, Grid, Typography } from '@mui/material';
import { FaBuilding } from "react-icons/fa";



function AdminCandidateDetails() {
  
  const [value, setValue] = useState('one');
 
  const userData={address:{
    curentAddress:{}
  }}

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-gray-100 h-auto' >
    <Box sx={{ width: '100%' }} className=" p-6 rounded-lg  font-sans">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Job Details Tabs"
        sx={{
          '& .MuiTab-root': {
            color: 'gray-600',
             fontSize: '1rem',
            '&.Mui-selected': {
              color: '#315370',
              fontWeight: 'bold',
            },
           
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#315370',
            height: '6px',
            borderRadius: '2px',
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab value="one" label="Candidate Details" icon={<FaBriefcase className="text-lg" />} />
        <Tab value="two" label="Attachments" icon={<FaBuilding className="text-lg" />} />
        <Tab value="three" label="Screening Questions" icon={<FaInfoCircle className="text-lg" />} />
      </Tabs>
      <div className="mt-6">
        {value==='one' && (
          <div>
      {/* Candidate Basic Details */}
      <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px", mb:1 }}>
      Candidate Basic Details
    </Typography>
  </Grid>
  <Grid item xs={12} sm={8}>
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: 2,
        boxShadow: 3,
      }}
    >
      <Grid container spacing={4}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body1">
              <strong>First Name:</strong> John
            </Typography>
          </Box>
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body1">
              <strong>Last Name:</strong> Doe
            </Typography>
          </Box>
        </Grid>

        {/* Country */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body1">
              <strong>Country: </strong> India
            </Typography>
          </Box>
        </Grid>

         {/* Current Location */}
         <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body1">
              <strong>Current Location: </strong> Ahmedabad
            </Typography>
          </Box>
        </Grid>
        

      </Grid>
    </Box>
  </Grid>
</div>
      <Divider sx={{ mb: 2,pt:2 }} />

       {/* Contact Details */}
       <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontSize: "24px", mb:1 }}>
            Contact Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: 2,
              boxShadow: 3,
            }}
          >
          {/* Primary Email addres */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Primary Email:</strong> john.doe@example.com
                  </Typography>
                </Box>
              </Grid>
              
              {/* Additional Email Address */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Additional Email:</strong> vivekmesuriya6@gmail.com
                  </Typography>
                </Box>
              </Grid>

              {/* Primary Contact No */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Primary Contact No:</strong> +9876543210
                  </Typography>
                </Box>
              </Grid>

               {/* Additional Contact No */}
               <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Additional Contact No:</strong> +9876543210
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </Grid>
      </div>

      <Divider sx={{ mb: 2,pt:2 }} />

    {/* Employment Details */}
    <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontSize: "24px", mb:1 }}>
            Employment Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: 2,
              boxShadow: 3,
            }}
          >
          {/* Primary Email addres */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Current Company: </strong> None
                  </Typography>
                </Box>
              </Grid>
              
              {/* Additional Email Address */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Current Designation: </strong> CEO
                  </Typography>
                </Box>
              </Grid>

              {/* Experience Contact No */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Experience: </strong> 4
                  </Typography>
                </Box>
              </Grid>

               {/* Relevent Experience */}
               <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Relavent Experience: </strong> 5
                  </Typography>
                </Box>
              </Grid>

              {/* Current Annual Salary */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Current Annual Salary: </strong> 5
                  </Typography>
                </Box>
              </Grid>

               {/* Expected Annual Salary */}
               <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Expected Annual Salary: </strong> 5
                  </Typography>
                </Box>
              </Grid>

              {/* Notice Peroid */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Notice Period: </strong> 5
                  </Typography>
                </Box>
              </Grid>

              {/* Salary Remarks */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Salary Remarks: </strong> 5
                  </Typography>
                </Box>
              </Grid>


            </Grid>
          </Box>
        </Grid>
      </div>

      <Divider sx={{ mb: 2,pt:2 }} />

          {/* Education */}
          <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
      Education Details
    </Typography>
  </Grid>
  <Grid item xs={12} sm={8}>
  <Box
    sx={{
      backgroundColor: "white",
      borderRadius: "8px",
      padding: 2,
      boxShadow: 3,
    }}
  >
    <Grid container spacing={4}>
      {/* Education Qualification */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="body1">
            <strong>Education Qualification:</strong> Undergraduate
          </Typography>
        </Box>
      </Grid>
       
       {/* Candidate Summary  */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="body1">
            <strong>Candidate Summary / Cover Note:</strong> Bachelor of Technology in IT
          </Typography>
        </Box>
      </Grid>

     </Grid>
  </Box>
</Grid>

</div>

    </div>
        )}
   


   {value === 'two' && (<>


<div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
<Grid item xs={12} sm={4}>
  <Typography variant="h6" sx={{ fontSize: "24px", mb:2 }}>
    Attachments
  </Typography>
</Grid>
<Grid item xs={12} sm={8}>
<Box
  sx={{
    backgroundColor: "white",
    borderRadius: "8px",
    padding: 2,
    boxShadow: 3,
  }}
>
<Box sx={{ padding: 3 }}>
  {/* Candidate Resume */}
  <Box
    sx={{
      marginBottom: 2,
      padding: 2,
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: 2,
      border: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between", // Space between filename and button
      alignItems: "center", // Vertically center the text and button
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Candidate Resume
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
        Filename: resume.pdf
      </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 1,
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "bold",
        backgroundColor: "#315370",
        '&:hover': {
          backgroundColor: "#0056b3",
        },
      }}
    >
      View
    </Button>
  </Box>

  {/* Candidate Evaluation Form */}
  <Box
    sx={{
      marginBottom: 2,
      padding: 2,
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: 2,
      border: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Candidate Evaluation Form
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
        Filename: evaluation_form.pdf
      </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 1,
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "bold",
        backgroundColor: "#315370",
        '&:hover': {
          backgroundColor: "#0056b3",
        },
      }}
    >
      View
    </Button>
  </Box>

  {/* Candidate Consent Proof */}
  <Box
    sx={{
      marginBottom: 2,
      padding: 2,
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: 2,
      border: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Candidate Consent Proof
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
        Filename: consent_proof.pdf
      </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 1,
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "bold",
        backgroundColor: "#315370",
        '&:hover': {
          backgroundColor: "#0056b3",
        },
      }}
    >
      View
    </Button>
  </Box>

  {/* Other Files */}
  <Box
    sx={{
      marginBottom: 2,
      padding: 2,
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: 2,
      border: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Other Files
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
        Filename: other_file.pdf
      </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 1,
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "bold",
        backgroundColor: "#315370",
        '&:hover': {
          backgroundColor: "#0056b3",
        },
      }}
    >
      View
    </Button>
  </Box>
</Box>


</Box>
</Grid>

</div>
  </>
)}

{value === 'three' && (

<div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
<Grid item xs={12} sm={4}>
  <Typography variant="h6" sx={{ fontSize: "24px" }}>
    Screening Questions
  </Typography>
</Grid>
<Grid item xs={12} sm={8}>

  
<Grid container spacing={4}>
  <div className="p-6 rounded-lg space-y-6 font-sans bg-white shadow-md">
    {/* Screening Questions */}
    

    <Grid container spacing={2} sx={{ pt: '2px' }}>

      {/* Question 1 */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">
            <div className="space-y-4">
              <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 1:</h3>
              <p className="text-gray-600 xl:text-lg">
                What is your name? <br />
                <span className="text-gray-800 font-medium"><strong>Ans:</strong>John Doe</span>
              </p>
            </div>
          </Typography>
        </Box>
      </Grid>

      {/* Question 2 */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">
            <div className="space-y-4">
              <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 2:</h3>
              <p className="text-gray-600 xl:text-lg">
                Where are you from? <br />
                <span className="text-gray-800 font-medium"><strong>Ans:</strong>New York, USA</span>
              </p>
            </div>
          </Typography>
        </Box>
      </Grid>

      {/* Question 3 */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">
            <div className="space-y-4">
              <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 3:</h3>
              <p className="text-gray-600 xl:text-lg">
                Do you have experience with state management? <br />
                <span className="text-gray-800 font-medium"><strong>Ans:</strong>Yes, I have worked with Redux and Context API.</span>
              </p>
            </div>
          </Typography>
        </Box>
      </Grid>

      {/* Question 4 */}
      <Grid item xs={12} sm={12}>
        <Box
          sx={{
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">
            <div className="space-y-4">
              <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 4:</h3>
              <p className="text-gray-600 xl:text-lg">
                Are you comfortable working in a team environment? <br />
                <span className="text-gray-800 font-medium"><strong>Ans:</strong>Yes, I thrive in collaborative settings.</span>
              </p>
            </div>
          </Typography>
        </Box>
      </Grid>

    </Grid>
  </div>
</Grid>


</Grid>

</div>
  
)}


</div>

    </Box>
    </div>
  );
}

export default AdminCandidateDetails;
