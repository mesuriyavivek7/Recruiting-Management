

import { useState,useEffect } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';


import { useParams } from 'react-router-dom';
import { FaBusinessTime,FaBullseye,FaThumbsUp,FaBan,FaStar,FaQuestionCircle ,FaFilePdf,FaFileAlt,FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle,FaPaperclip, FaUsers,FaShareAlt,FaExternalLinkAlt,FaDollarSign,FaClock,FaCalendarAlt } from 'react-icons/fa'; // React Icons


function JobDetails() {
  const { id } = useParams();
  const [value, setValue] = useState('one');
  const [jobType, setJobType] = useState('fulltime'); // fulltime or contract
  const [shareWithHiringManager, setShareWithHiringManager] = useState(false);
  const [shareSalaryDetails, setShareSalaryDetails] = useState(false);
  

  const [activeTab, setActiveTab] = useState('Job');

  const [job, setJob] = useState(null); // State to hold the job details

  // Fetch job details from backend when component loads
  useEffect(() => {
    axios.get(`http://localhost:8080/api/job/showjob/${id}`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const uploadedFiles = [
    { name: 'Sample CV', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Candidate Evaluation Form', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Audio Briefing by Client', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Uploaded Other File', type: 'image', url: 'https://www.w3schools.com/w3images/lights.jpg' },
  ];


return (
  <div className='bg-gray-100 h-auto'>
    <Box sx={{ width: '100%' }} className="p-6 rounded-lg font-sans">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Job Details Tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab value="one" label="Job Details" icon={<FaBriefcase className="text-lg" />} />
        <Tab value="two" label="Remuneration & Commission" icon={<FaInfoCircle className="text-lg" />} />
        <Tab value="three" label="Company Details" icon={<FaBusinessTime className="text-lg" />} />
        <Tab value="four" label="Sourcing Guidelines" icon={<FaUsers className="text-lg" />} />
        <Tab value="five" label="Screening Questions" icon={<FaQuestionCircle className="text-lg" />} />
      </Tabs>
      
      <div className="mt-6">
        {/* Render content based on the selected tab */}
        {value === 'one' && (
          <div className="space-y-6 flex flex-col items-center p-4">
            <div className="bg-white p-4 rounded-lg w-full space-y-2">
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex items-center">
                <FaBriefcase className="mr-3 text-2xl xl:text-3xl text-blue-600" /> Job Profile
              </h2>
              <p className='xl:text-lg'> <strong>Job Title:</strong> {job?.basicDetails?.job_title}</p>
              {/* <p className='xl:text-lg'><strong>Job Description:</strong> {job?.basicDetails?.job_description}</p> */}
              <p className='xl:text-lg'>
  <strong>Job Description:</strong> 
  <span dangerouslySetInnerHTML={{ __html: job?.basicDetails?.job_description }} />
</p>

              <p className='xl:text-lg'><strong>permanent remote work:</strong> {job?.basicDetails?.permanent_remote_work? 'Yes' : 'No'}</p>
              <p className='xl:text-lg'><strong>Domain:</strong> {job?.basicDetails?.job_domain}</p>
              <p className='xl:text-lg'><strong>Experience Required:</strong> {job?.basicDetails?.experience?.minexp} - {job?.basicDetails?.experience?.maxexp}</p>
              <p className='xl:text-lg'><strong>Positions:</strong> {job?.basicDetails?.positions}</p>
              <p className='xl:text-lg'><strong>Hiring Managers:</strong> {job?.basicDetails?.hiring_managers}</p>
              <p className='xl:text-lg'><strong>Share salary details:</strong> {job?.basicDetails?.share_salary_details? 'Yes' : 'No'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg w-full space-y-2">
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-2xl text-green-600" /> Location
              </h2>
              <p className='xl:text-lg'><strong>Country:</strong> {job?.basicDetails?.country}</p>
              <p className='xl:text-lg'><strong>State:</strong> {job?.basicDetails?.state}</p>
              <p className='xl:text-lg'><strong>City:</strong> {job?.basicDetails?.city.join(', ')}</p>
            </div>
          </div>
        )}

        {value === 'two' && (
          <div className="bg-white p-4 rounded-lg w-full space-y-4">
       
          

            {job.commissionDetails.work_type === 'full_time' && (
              <>
                <div className="bg-white pt-2 p-4 rounded-lg shadow-sm   w-full ">
                <div className=' space-y-3'>
                  
                  
                    
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaDollarSign className="text-2xl xl:text-3xl text-green-600" />Remuneration Details</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Annual Salary:</strong> {job.commissionDetails.work_details.full_time.fixed_salary}</p>

                    <p className='xl:text-lg'><strong>Additional Salary Details:</strong>{job.commissionDetails.work_details.full_time.additional_salary_details} </p>
                    <p className='xl:text-lg'><strong>Additional Salary Details:</strong>{job.commissionDetails.work_details.full_time.full_time_salary_currency} </p>
                    <p className='xl:text-lg'><strong>Additional Salary Details:</strong>{job.commissionDetails.work_details.full_time.full_time_salary_type} </p>
                    </div>
                 
                </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
                <div className=' space-y-3'>
                  
                  <div className='space-y-3'>
                    <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex gap-1">  <FaInfoCircle className="text-2xl xl:text-3xl text-blue-600" />Commission</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Commission Type:</strong> {job.commissionDetails.commission_details.commission_type}</p>
                    <p className='xl:text-lg'><strong>Commission Payout:</strong> {job.commissionDetails.commission_details.commission_fix_pay}</p>
                    <p className='xl:text-lg'><strong>Payment Terms:</strong> {job.commissionDetails.commission_details.payment_tearms}</p>
                    <p className='xl:text-lg'><strong>Replacement Clause:</strong> {job.commissionDetails.commission_details.replacement_clause}</p>
                  </div>
                  </div>
                </div>
               
                </div>
              </>
            )}

            {/* Contract Remuneration Details */}
            {job.commissionDetails.work_type === 'contract' && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm  w-full ">
                <div className=' '>
                 
                  <div className='space-y-3'>
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"> <FaClock className="text-2xl text-purple-600" />Contract Remuneration Details</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Contract duration type:</strong> {job?.commissionDetails.work_details.contract.contract_duration_type}</p>
                    <p className='xl:text-lg'><strong>Contract Duration:</strong> {job?.commissionDetails.work_details.contract.contract_duration_count}</p>
                    <p className='xl:text-lg'><strong>Pay Rate:</strong> {job?.commissionDetails.work_details.contract.contract_pay_rate_type}</p>
                    <p><strong>Contract pay rate currency:</strong> {job?.commissionDetails.work_details.contract.contract_pay_currency}</p>
            <p className='xl:text-lg'><strong>Fix Contract Pay:</strong> {job?.commissionDetails.work_details.contract.fix_contract_pay}</p>
                    <p className='xl:text-lg'><strong>Pay Cycle:</strong>  {job?.commissionDetails.work_details.contract.contract_pay_cycle}</p>
                    <p className='xl:text-lg' ><strong>Working Hours:</strong>{job?.commissionDetails.work_details.contract.weekly_hour_cnt} </p>
                    <p className='xl:text-lg'><strong>Additional Contract Details:</strong> {job?.commissionDetails.work_details.contract.additional_contract_details}</p>
                    <p className='xl:text-lg'><strong>Remarks:</strong> {job?.commissionDetails.work_details.contract.remarks}</p>
                  </div>
                  </div>
                </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm  w-full ">
                <div className=''>
                  
                  <div className='space-y-3'>
                    <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaCalendarAlt className="text-2xl text-red-600" />Commission</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Commission Type:</strong> {job?.commissionDetails.commission_details.commission_type}</p>
            <p className='xl:text-lg'><strong>Commission Percentage Pay:</strong> {job?.commissionDetails.commission_details.commission_percentage_pay}</p>
            <p className='xl:text-lg'><strong>Payment Terms:</strong> {job?.commissionDetails.commission_details.payment_tearms}</p>
            <p className='xl:text-lg'><strong>Repllacement Clause:</strong> {job?.commissionDetails.commission_details.replacement_clause}</p>
                  </div>
                  </div>
                </div>
                </div>
              </>
            )}


          </div>
        )}

        {value === 'three' && (
          <div className="bg-white p-4 rounded-lg w-full space-y-4">
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex items-center">
              <FaBusinessTime className="mr-3 text-2xl text-green-600" /> Company Details
            </h2>
            {/* <p><strong>Target Companies:</strong> {job?.targetCompanies.join(', ')}</p> */}
            <p className='xl:text-lg'><strong>External Job ID:</strong> {job?.companyDetails?.job_id}</p>
            <p className='xl:text-lg'><strong>Agrre To Terms:</strong> {job?.companyDetails?.agree_to_tearms?'Yes':'No'}</p>
            <p className='xl:text-lg'><strong>Client Name:</strong> {job?.companyDetails?.client_name}</p>
            <p className='xl:text-lg'><strong>Client Description:</strong> {job?.companyDetails?.client_description}</p>
          
          </div>

          
        )}

     
        {value === 'four' && (
 

<div className="  space-y-6 rounded-lg font-sans flex flex-col items-center ">
          
         
<div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
<div className='space-y-3'>

<div className='space-y-3'>
<h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 flex gap-1"><FaStar className="text-2xl text-yellow-600" />Must Haves</h2>
<div className='pl-36'>
<ul className="list-disc pl-5 mt-2 space-y-3">
  {Array.isArray(job?.sourcingGuidelines?.must_haves) ? (
    job.sourcingGuidelines.must_haves.map((e, index) => (
      <li key={index}><strong>{e}</strong></li>
    ))
  ) : (
    <li><strong>No must haves available</strong></li> // Fallback in case must_haves is not an array
  )}
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
  
  <p className="mt-2 xl:text-lg"><strong>{job.sourcingGuidelines.poach_clients}</strong></p>
  

</div>
</div>
</div>
</div>


{/* Target Companies */}

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
)}


        {value === 'five' && (
          <div className="bg-white p-4 rounded-lg w-full space-y-4">
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex items-center">
              <FaQuestionCircle className="mr-3 text-2xl text-green-600" /> Screening Questions
            </h2>
            {job?.screeningQuestions?.screening_questions?.map((question, index) => (
    <div key={question.id} className="bg-white p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Question {index + 1}: {question.question_title}?
      </h3>
      <p className='xl:text-lg'><strong>Type:</strong> {question.type}</p>
      <p className='xl:text-lg'><strong>Answer Type:</strong> {question.ans_type}</p>
      <p className='xl:text-lg'><strong>Mandatory:</strong> {question.madantory ? 'Yes' : 'No'}</p>
      <p className='xl:text-lg'><strong>Options:</strong></p>
      <ul>
        {question.answer.option?.map((option, optionIndex) => (
          <li key={optionIndex}>{option}</li>
        ))}
      </ul>
    </div>
  ))}
          </div>
        )}
      </div>
    </Box>
  </div>
);

}

export default JobDetails;
