

import { useState } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';
import { FaBusinessTime,FaBullseye,FaThumbsUp,FaBan,FaStar,FaQuestionCircle ,FaFilePdf,FaFileAlt,FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle,FaPaperclip, FaUsers,FaShareAlt,FaExternalLinkAlt,FaDollarSign,FaClock,FaCalendarAlt } from 'react-icons/fa'; // React Icons
import { Card, Grid, Typography } from '@mui/material';
import { FaBuilding } from "react-icons/fa";



function AdminJobDetails() {
  const { id } = useParams();
  const [value, setValue] = useState('one');
  const [jobType, setJobType] = useState('contract'); // fulltime or contract
  const [shareWithHiringManager, setShareWithHiringManager] = useState(false);
  const [shareSalaryDetails, setShareSalaryDetails] = useState(false);

  const uploadedFiles = [
    { name: 'Sample CV', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Candidate Evaluation Form', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Audio Briefing by Client', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Uploaded Other File', type: 'image', url: 'https://www.w3schools.com/w3images/lights.jpg' },
  ];

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
        <Tab value="one" label="Job Details" icon={<FaBriefcase className="text-lg" />} />
        <Tab value="two" label="Company Details" icon={<FaBuilding className="text-lg" />} />
       
        <Tab 
  value="three" 
  label={
    <span className="whitespace-nowrap  text-ellipsis">
      Sourcing Guidelines & Attachments
    </span>
  } 
  icon={<FaUsers className="text-lg" />}
/>

        <Tab value="four" label="Screening Questions" icon={<FaInfoCircle className="text-lg" />} />
      </Tabs>
      <div className="mt-6">
  {value === 'one' && (
    <Card
      className="mt-4 font-sans py-6"
      sx={{
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: '#f0f0f0',
        padding: 3,
      }}
    >
      {/* Job Details Section */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          className="flex items-center mb-2 pb-2"
        >
          <FaBriefcase className="mr-2 text-black" /> Job Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="body1">
                <strong>Job Id:</strong> 1
              </Typography>
              
          
            </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Job Title:</strong> Software Engineer
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={12}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Job Description:</strong> Develop and maintain web
                applications...
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Country:</strong>india
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>City:</strong> Mumbai
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Job Domains:</strong> Software Engineer
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Positions:</strong> Software Engineer
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Experience:</strong> nothing
              </Typography>
              </Box>
          </Grid>
          <Grid item sx={12} sm={6}>
          <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
          <Typography variant="body1">
                <strong>Is Remote Work:</strong>Yes
              </Typography>
              </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Job Commision Details */}
      <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          className="flex items-center mb-2 pb-2"
        >
          <FaMapMarkerAlt className="mr-2 text-black" /> Job Commission Details
        </Typography>
        
  
 

  {/* Right Section */}
  <Grid container spacing={2} sx={{pt:'12px'}} >
  {jobType === 'fulltime' && (
    <>
      {/* Full-Time Remuneration Details */}
      <Grid item xs={12} sm={12} sx={{ml:'9px'}}>
  <Typography
    variant="h6"
    fontWeight="bold"
    display="flex"
    alignItems="center"
    paddingTop='8px'
    gap={1}
  >
    <FaDollarSign className="text-black" />
    Remuneration Details
  </Typography>

  <Grid container spacing={2} sx={{ mt: 1 }}>
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1">
          <strong>Annual Salary:</strong> $100,000 - $120,000
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1">
          <strong>Additional Salary Details:</strong> Performance bonuses included...
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Grid>


      <Grid item xs={12} sm={12}>
       
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <FaInfoCircle className="text-black" />
            Commission
          </Typography>

          <Grid container spacing={2} sx={{mt:1}} >
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
       <Typography variant="body1" sx={{ pl: 4 }}>
            <strong>Commission Payout:</strong> 5% of annual salary
          </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
       <Typography variant="body1" sx={{ pl: 4 }}>
            <strong>Payment Terms:</strong> Upon candidate joining
          </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
       <Typography variant="body1" sx={{ pl: 4 }}>
            <strong>Replacement Clause:</strong> Applicable within 90 days
          </Typography>
      </Box>
    </Grid>
  </Grid>
         
          
         
       
      </Grid>
    </>
  )}

{jobType === 'contract' && (
  <>
    {/* Contract Remuneration Details */}
    <Grid item xs={12} sm={12} sx={{ ml: '6px' }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        paddingTop="8px"
        gap={1}
      >
        <FaClock className="text-black" />
        Contract Remuneration Details
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
       

<Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1">
              <strong>Contract Duration:</strong> 6 months
            </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
         <Typography variant="body1">
              <strong>Contract Pay:</strong> $50 per hour
            </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
         <Typography variant="body1">
              <strong>Contract Pay Cycle:</strong> Bi-weekly
            </Typography>
      </Box>
    </Grid>
           
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
            <Typography variant="body1">
              <strong>Additional  Details:</strong> Overtime applicable...
            </Typography>
      </Box>
    </Grid>   
           
         
          

        
      </Grid>
    </Grid>

    <Grid item xs={12} sm={12}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ mt: 2 }}
      >
        <FaCalendarAlt className="text-black" />
         Commission 
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
              <strong>Payment Terms:</strong> Upon candidate joining
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
              <strong>Replacement Clause:</strong> value
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </>
)}

</Grid>



      </Box>

    
    </Card>
  )}

{value === 'two' && <div className="bg-white space-y-6 rounded-lg flex flex-col items-center">Company Details</div>}


{value === 'three' && (
  <Card
    className="mt-4 font-sans py-6"
    sx={{
      borderRadius: '8px',
      boxShadow: 3,
      backgroundColor: '#f0f0f0',
      padding: 3,
    }}
  >
    <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        className="flex items-center mb-2 pb-2"
      >
        <FaStar className="mr-2 text-black" /> Must Haves
      </Typography>

      <Grid container spacing={2}>
        {/* Skills Section */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
              <strong>Skill 1:</strong> HTML
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
              <strong>Skill 2:</strong> CSS
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
              <strong>Skill 3:</strong> JavaScript
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>


    <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        className="flex items-center mb-2 pb-2"
      >
       <FaBan className=" mr-2 text-2xl xl:text-3xl text-black-600" />No Poach Clients
      </Typography>

      <Grid container spacing={2}>
      
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
            <p className="mt-2 xl:text-lg">Strict no-nos for client poaching.</p>
            </Typography>
          </Box>
        </Grid>

        

       
      </Grid>
    </Box>

    <Grid container spacing={2} sx={{ mb: 2 }}>
  {/* Nice to Haves Section */}
  <Grid item xs={12} md={6}>
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
        <FaThumbsUp className="mr-2 text-2xl xl:text-3xl text-black" /> Nice to Haves
      </Typography>
      <div className="pl-4">
        <ul className="list-disc pl-5 mt-2 space-y-3">
          <li className="xl:text-lg">Java</li>
          <li className="xl:text-lg">Python</li>
          <li className="xl:text-lg">C++</li>
        </ul>
      </div>
    </Box>
  </Grid>

  {/* Target Companies Section */}
  <Grid item xs={12} md={6}>
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" className="flex items-center mb-2">
        <FaBullseye className="mr-2 text-2xl xl:text-3xl text-black" /> Target Companies
      </Typography>
      <div className="pl-4">
        <ul className="list-disc pl-5 mt-2 space-y-3">
          <li className="xl:text-lg">Motadata</li>
          <li className="xl:text-lg">Brevitaz</li>
          <li className="xl:text-lg">O2h</li>
        </ul>
      </div>
    </Box>
  </Grid>
</Grid>


    <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        className="flex items-center mb-2 pb-2"
      >
    <FaPaperclip className="mr-2 text-2xl  xl:text-3xl text-black" />Attachments
      </Typography>

      <Grid container spacing={2}>
      
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body1">
            <div className='pl-36'>
        <ul className="list-disc pl-5 mt-2 space-y-2  ">
          {uploadedFiles.map((file, index) => (
            <li key={index} className="flex flex-col   xl:text-lg">
              <div className="flex items-center space-x-2">
                {file.type === 'pdf' && <FaFilePdf className="text-red-600" />}
                {file.type === 'audio' && <FaFileAudio className="text-blue-600" />}
                {(file.type === 'image' || file.type === 'video') && <FaFileAlt className="text-gray-600" />}
                <span>{file.name} ({file.type.toUpperCase()})</span>
              </div>
             
              <iframe
  src={file.url}
  title={file.name}
  className="mt-2 border rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
  style={{ height: 'auto', aspectRatio: '1 / 1' }}
  frameBorder="0"
  allowFullScreen
></iframe>

            </li>
          ))}
        </ul>
        </div>
            </Typography>
          </Box>
        </Grid>

        

       
      </Grid>
    </Box>
    
  </Card>
)}

{value === 'four' &&  <div className="bg-white p-6 rounded-lg space-y-6 font-sans">
    {/* Screening Questions */}
  
      <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex  gap-4 "><FaQuestionCircle className='text-black  '/>Screening Questions</h2>
      <div className="space-y-4 mt-4">
    
        <div className='space-y-3'>
          <h3 className="text-lg  xl:text-xl font-semibold text-gray-700">Question 1:</h3>
         
          <p className="mt-2 text-gray-600  xl:text-lg">Answer: I have 3 years of experience working with React.js, including developing and maintaining single-page applications, managing state with Redux, and integrating with REST APIs.</p>
        </div>

      
        <div className='space-y-3'>
          <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 2:</h3>
         
          <p className="mt-2 text-gray-600 xl:text-lg">Answer: One of the most challenging projects was a large-scale e-commerce platform where I had to optimize performance for high traffic and ensure data integrity across multiple services. I implemented caching strategies and used asynchronous processing to handle large volumes of data efficiently.</p>
        </div>

       
        <div className='space-y-3'>
          <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 3:</h3>
        
          <p className="mt-2 text-gray-600 xl:text-lg">Answer: I stay updated by following industry blogs, participating in webinars, and engaging in online communities. I also regularly read technical books and attend local meetups and conferences to network with other professionals and learn about new technologies.</p>
        </div>

      
        <div className='space-y-3'>
          <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Question 4:</h3>
       
          <p className="mt-2 text-gray-600 xl:text-lg">Answer: I use a combination of debugging tools, logging, and systematic troubleshooting methods. I start by reproducing the issue consistently, then use breakpoints and inspect variables to understand the root cause. I also review logs and use tools like Chrome DevTools to diagnose and resolve issues.</p>
        </div>
      
    </div>
  </div>}

</div>

    </Box>
    </div>
  );
}

export default AdminJobDetails;
