

import { useState } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';
import { FaBusinessTime,FaBullseye,FaThumbsUp,FaBan,FaStar,FaQuestionCircle ,FaFilePdf,FaFileAlt,FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle,FaPaperclip, FaUsers,FaShareAlt,FaExternalLinkAlt,FaDollarSign,FaClock,FaCalendarAlt } from 'react-icons/fa'; // React Icons


function AdminJobDetails() {
  const { id } = useParams();
  const [value, setValue] = useState('one');
  const [jobType, setJobType] = useState('fulltime'); // fulltime or contract
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
        <Tab value="two" label="Remuneration & Commission" icon={<FaInfoCircle className="text-lg" />} />
        <Tab value="three" label="Company Details" icon={<FaBusinessTime className="text-lg" />} />
        <Tab value="four" label="Sourcing Guidelines" icon={<FaUsers className="text-lg" />} />
        <Tab value="five" label="Screening Questions" icon={<FaInfoCircle className="text-lg" />} />
      </Tabs>
      <div className="mt-6 ">
        {value === 'one' && (
          <div className="space-y-6 flex flex-col items-center p-4 ">
            {/* Job Profile */}
            <div className="bg-white p-4 rounded-lg  w-full  space-y-2 ">
              <div className=' space-y-3'>
            
              <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800  flex items-center">
                <FaBriefcase className="mr-3 text-2xl xl:text-3xl text-blue-600" /> Job Profile
              </h2>
              <div className='pl-36'>
              <p className="xl:text-lg"><strong>Job Title:</strong> Software Engineer</p>
              <p className=" xl:text-lg"><strong>Job Description:</strong> Develop and maintain web applications...</p>
              </div>
              
              </div>
            </div>
            {/* Job Location and Experience */}
            <div className="bg-white p-4 rounded-lg gap-1  w-full  space-y-2">
            <div className=' space-y-3'>
              <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800  flex items-center">
                <FaMapMarkerAlt className="mr-3 text-2xl text-green-600" /> Job Location & Experience
              </h2>
              <div className='pl-36'>
              <p className="mt-2 flex items-center  xl:text-lg"> Permanent</p>
              <p className=" xl:text-lg"><strong>Country:</strong> USA</p>
              <p className=" xl:text-lg"><strong>State:</strong> California</p>
              <p className=" xl:text-lg"><strong>City:</strong> San Francisco</p>
              <p className=" xl:text-lg"><strong>Job Domain:</strong> Software Development</p>
              <p className=" xl:text-lg"><strong>Positions:</strong> 2</p>
              <p className=" xl:text-lg"><strong>Experience:</strong> 3-5 years</p>
            </div>
            </div>
            </div>
            {/* Other Details */}
            <div className="bg-white p-4 rounded-lg  w-full  space-y-2 ">
            <div className=' space-y-3'>
           
              <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800  flex items-center">
                <FaInfoCircle className="mr-3 text-2xlxl:text-3xl text-purple-600" /> Other Details
              </h2>
              <div className='pl-36'>
              <p className="mt-2  xl:text-lg"><strong>External Job ID:</strong> 123456</p>
              <div className='flex flex-col space-y-2'>  
              
                <p className="  xl:text-lg">
          <strong>Shared with Hiring Manager:</strong> {shareWithHiringManager ? 'Yes' : 'No'}
        </p>
             
             
              <p className="  xl:text-lg">
          <strong>Salary Details Shared:</strong> {shareSalaryDetails ? 'Yes' : 'No'}
        </p>
              </div>
              </div>
              </div>
            </div>
            </div> 
          
        )}
        {value === 'two' && <div className="space-y-6 rounded-lg flex flex-col items-center ">
         
         

            {/* Full-Time Remuneration Details */}
            {jobType === 'fulltime' && (
              <>
                <div className="bg-white pt-2 p-4 rounded-lg shadow-sm   w-full ">
                <div className=' space-y-3'>
                  
                  
                    
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaDollarSign className="text-2xl xl:text-3xl text-green-600" />Remuneration Details</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Annual Salary:</strong> $100,000 - $120,000</p>

                    <p className='xl:text-lg'><strong>Additional Salary Details:</strong> Performance bonuses included...</p>
                    </div>
                 
                </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
                <div className=' space-y-3'>
                  
                  <div className='space-y-3'>
                    <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex gap-1">  <FaInfoCircle className="text-2xl xl:text-3xl text-blue-600" />Commission</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Commission Payout:</strong> 5% of annual salary</p>
                    <p className='xl:text-lg'><strong>Payment Terms:</strong> Upon candidate joining</p>
                    <p className='xl:text-lg'><strong>Replacement Clause:</strong> Applicable within 90 days</p>
                  </div>
                  </div>
                </div>
               
                </div>
              </>
            )}

            {/* Contract Remuneration Details */}
            {jobType === 'contract' && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm  w-full ">
                <div className=' '>
                 
                  <div className='space-y-3'>
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"> <FaClock className="text-2xl text-purple-600" />Contract Remuneration Details</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Contract Duration:</strong> 6 months</p>
                    <p className='xl:text-lg'><strong>Pay Rate:</strong> $50 per hour</p>
                    <p className='xl:text-lg'><strong>Pay Cycle:</strong> Bi-weekly</p>
                    <p className='xl:text-lg' ><strong>Working Hours:</strong> 40 hours per week</p>
                    <p className='xl:text-lg'><strong>Additional Pay Rate Details:</strong> Overtime applicable...</p>
                  </div>
                  </div>
                </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm  w-full ">
                <div className=''>
                  
                  <div className='space-y-3'>
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaCalendarAlt className="text-2xl text-red-600" />Commission</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Commission Payout:</strong> 5% of contract value</p>
                    < p className='xl:text-lg'><strong>Payment Terms:</strong> Upon candidate joining</p>
                  </div>
                  </div>
                </div>
                </div>
              </>
            )}
          
        
          </div>}
        {value === 'three' && <div className="bg-white space-y-6 rounded-lg flex flex-col items-center">Company Details</div>}
        {value === 'four' &&
         <div className="  space-y-6 rounded-lg font-sans flex flex-col items-center ">
          
         
          <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
          <div className='space-y-3'>
      
      <div className='space-y-3'>
        <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaStar className="text-2xl text-yellow-600" />Must Haves</h2>
        <div className='pl-36'>
        <ul className="list-disc pl-5 mt-2 space-y-3">
          <li>Html</li>
          <li>CSS</li>
          <li>Javascript</li>
        </ul>

        </div>
      </div>
    </div>
    </div>
    {/* No Poach Clients */}
    <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
    <div className=' space-y-3'>
   
      <div className='space-y-3'>
        <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1">   <FaBan className="text-2xl xl:text-3xl text-red-600" />No Poach Clients</h2>
        <div className='pl-36'>
        <p className="mt-2 xl:text-lg">Strict no-nos for client poaching.</p>
        </div>
      </div>
    </div>
    </div>

    {/* Nice to Haves */}
    <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
    <div className=' space-y-3'>
     
      <div className='space-y-3'>
        <h2 className="text-xl   xl:text-2xl font-semibold text-gray-800 flex gap-1" > <FaThumbsUp className="text-2xl  xl:text-3xl text-green-600" />Nice to Haves</h2>
        <div className='pl-36'>
        <ul className="list-disc pl-5 mt-2 space-y-3">
          <li className=' xl:text-lg'>Java</li>
          <li className=' xl:text-lg'>Python</li>
          <li className=' xl:text-lg'>C++</li>
        </ul>
        </div>
      </div>
    </div>
    </div>
    {/* Target Companies */}
    <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
    <div className=' space-y-3'>
      
      <div className='space-y-3'>
        <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaBullseye className="text-2xl  xl:text-3xl text-blue-600" />Target Companies</h2>
        <div className='pl-36'>
        <ul className="list-disc pl-5 mt-2 space-y-3 ">
          <li className=' xl:text-lg'>Motadata</li>
          <li className=' xl:text-lg'>Brevitaz</li>
          <li className=' xl:text-lg'>O2h</li>
        </ul>
        </div>
      </div>
    </div>
    </div>
   {/* Attachments */}
    <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
    <div className=' space-y-3'>
     
      <div className='space-y-3'>
        <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1 "> <FaPaperclip className="text-2xl  xl:text-3xl text-gray-600" />Attachments</h2>
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
      </div>
    </div>
    </div>
     </div>
          }
        {value === 'five' &&  <div className="bg-white p-6 rounded-lg space-y-6 font-sans">
    {/* Screening Questions */}
  
      <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex  gap-4 "><FaQuestionCircle className='text-red-600  '/>Screening Questions</h2>
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
