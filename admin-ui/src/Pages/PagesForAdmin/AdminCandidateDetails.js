

import { useState } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';
import { FaBusinessTime,FaBullseye,FaThumbsUp,FaBan,FaStar,FaQuestionCircle ,FaFilePdf,FaFileAlt,FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle,FaPaperclip, FaUsers,FaShareAlt,FaExternalLinkAlt,FaDollarSign,FaClock,FaCalendarAlt } from 'react-icons/fa'; // React Icons
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
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
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
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

        {/* Gender */}
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
              <strong>Gender:</strong> Male
            </Typography>
          </Box>
        </Grid>

        {/* Date of Birth */}
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
              <strong>Date of Birth:</strong> 15th August 1990
            </Typography>
          </Box>
        </Grid>

        {/* Nationality */}
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
              <strong>Nationality:</strong> Indian
            </Typography>
          </Box>
        </Grid>

        {/* Marital Status */}
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
              <strong>Marital Status:</strong> Married
            </Typography>
          </Box>
        </Grid>

        {/* Edelweiss Relative 1 */}
        <Grid item xs={12}>
        <Typography variant="body1">
      <strong>Edelweiss Relative 1:</strong>
    </Typography>
  <Box
    sx={{
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "8px",
      backgroundColor: "#fff",
      marginTop: "16px",
    }}
  >
    

    <Grid container spacing={4} >
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
          <strong>Name:</strong> Alice Doe
        </Typography></Box>
      </Grid>

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
          <strong>Relationship:</strong> Sister
        </Typography>
        </Box>
      </Grid>

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
          <strong>Employee ID:</strong> 123456
        </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>

        {/* Edelweiss Relative 2 */}
        <Grid item xs={12}>
          
        <Typography variant="body1">
      <strong>Edelweiss Relative 2:</strong>
    </Typography>
  <Box
    sx={{
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "8px",
      backgroundColor: "#fff",
      marginTop: "16px",
    }}
  >
    

    <Grid container spacing={4} >
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
          <strong>Name:</strong> Alice Doe
        </Typography></Box>
      </Grid>

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
          <strong>Relationship:</strong> Sister
        </Typography>
        </Box>
      </Grid>

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
          <strong>Employee ID:</strong> 123456
        </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>
      </Grid>
    </Box>
  </Grid>
</Grid>

      <Divider sx={{ mb: 2,pt:2 }} />

      {/* Contact Details */}
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontSize: "24px" }}>
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
                    <strong>Email:</strong> john.doe@example.com
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Contry Code:</strong> +91
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Phone:</strong> +9876543210
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2,pt:2 }} />

      {/* Address Details */}
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
      Address Details
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
        {/* Current Address */}
        <Grid item xs={12}>
  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    <strong>Current Address</strong>
  </Typography>
  <Box
    sx={{
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "8px",
      backgroundColor: "#fff",
      marginTop: "16px",
    }}
  >
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
            <strong>Flat/House/Wing Number:</strong> ddd
          </Typography>
        </Box>
      </Grid>

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
            <strong>Street/Locality/Area:</strong> Name
          </Typography>
        </Box>
      </Grid>

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
            <strong>Landmark:</strong> Na
          </Typography>
        </Box>
      </Grid>

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
            <strong>Pincode:</strong> na
          </Typography>
        </Box>
      </Grid>

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
            <strong>Country:</strong> na
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>


        {/* Permanent Address */}
        {!userData.address?.permanent?.sameAsCurrent && (
         <Grid item xs={12}>
         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
           <strong>Permanent Address</strong>
         </Typography>
         <Box
           sx={{
             border: "1px solid #ccc",
             borderRadius: "4px",
             padding: "8px",
             backgroundColor: "#fff",
             marginTop: "16px",
           }}
         >
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
                   <strong>Flat/House/Wing Number:</strong> ddd
                 </Typography>
               </Box>
             </Grid>
       
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
                   <strong>Street/Locality/Area:</strong> Name
                 </Typography>
               </Box>
             </Grid>
       
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
                   <strong>Landmark:</strong> Na
                 </Typography>
               </Box>
             </Grid>
       
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
                   <strong>Pincode:</strong> na
                 </Typography>
               </Box>
             </Grid>
       
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
             <strong>Country:</strong> na
                 </Typography>
           </Box>       </Grid>
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
             <strong>State:</strong> na
                 </Typography>
           </Box>       </Grid>
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
             <strong>City:</strong> na
                 </Typography>
           </Box>       </Grid>
           </Grid>
         </Box>
       </Grid>
       
                )}
  </Grid>
    </Box>
  </Grid>
</Grid>

      <Divider sx={{ mb: 2,pt:2 }} />

      {/* Work Experience */}
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
      Work Experience
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
            <strong>Company:</strong> XYZ Pvt. Ltd.
          </Typography>
        </Box>
      </Grid>

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
            <strong>Job Title:</strong> Software Engineer
          </Typography>
        </Box>
      </Grid>

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
            <strong>Job Location:</strong> Mumbai, India
          </Typography>
        </Box>
      </Grid>

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
            <strong>From Date:</strong> January 2020
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>

</Grid>

      <Divider sx={{ mb: 2,pt:2 }} />

      {/* References */}
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
      References
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
            <strong>Reference Name:</strong> Mr. ABC
          </Typography>
        </Box>
      </Grid>

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
            <strong>Company:</strong> ABC Corp.
          </Typography>
        </Box>
      </Grid>

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
            <strong>Designation:</strong> Senior Manager
          </Typography>
        </Box>
      </Grid>

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
            <strong>Phone Country Code:</strong> +91
          </Typography>
        </Box>
      </Grid>

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
            <strong>Phone:</strong> 1234567890
          </Typography>
        </Box>
      </Grid>

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
            <strong>Email:</strong> abc@company.com
          </Typography>
        </Box>
      </Grid>

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
            <strong>Relationship:</strong> Professional Mentor
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>

</Grid>

      <Divider sx={{ mb: 2,pt:2 }} />

      {/* Education */}
      <Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
  <Grid item xs={12} sm={4}>
    <Typography variant="h6" sx={{ fontSize: "24px" }}>
      Education
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
            <strong>Education Category:</strong> Undergraduate
          </Typography>
        </Box>
      </Grid>

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
            <strong>Degree:</strong> Bachelor of Technology in IT
          </Typography>
        </Box>
      </Grid>

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
            <strong>Field of Specialisation:</strong> Information Technology
          </Typography>
        </Box>
      </Grid>

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
            <strong>Course:</strong> B.Tech in IT
          </Typography>
        </Box>
      </Grid>

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
            <strong>GPA/Percentage:</strong> 8.5/10
          </Typography>
        </Box>
      </Grid>

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
            <strong>Currently Student:</strong> Yes
          </Typography>
        </Box>
      </Grid>

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
            <strong>Start Date:</strong> 2019-08-01
          </Typography>
        </Box>
      </Grid>

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
            <strong>Completion Date:</strong> 2023-05-31
          </Typography>
        </Box>
      </Grid>

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
            <strong>Institute:</strong> XYZ Institute of Technology
          </Typography>
        </Box>
      </Grid>

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
            <strong>University:</strong> ABC University
          </Typography>
        </Box>
      </Grid>

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
            <strong>Education Document Proof:</strong> Transcript Available
          </Typography>
        </Box>
      </Grid>

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
            <strong>Highest Qualification:</strong> Yes
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Grid>

</Grid>

    </div>
        )}
   


   {value === 'two' && (<>


<Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
<Grid item xs={12} sm={4}>
  <Typography variant="h6" sx={{ fontSize: "24px" }}>
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

</Grid>
  </>
)}






{value === 'three' && (

<Grid container spacing={2} sx={{ pt: "15px", mb: 2 }}>
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

</Grid>
  
)}


</div>

    </Box>
    </div>
  );
}

export default AdminCandidateDetails;
