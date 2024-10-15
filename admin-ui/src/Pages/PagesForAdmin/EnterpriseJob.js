
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, TablePagination, Tabs, Tab, Button, TextField, Divider, IconButton , Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {   FaCaretDown } from 'react-icons/fa';
import { FaBusinessTime,FaBullseye,FaThumbsUp,FaBan,FaStar,FaQuestionCircle ,FaFilePdf,FaFileAlt,FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle,FaPaperclip, FaUsers,FaShareAlt,FaExternalLinkAlt,FaDollarSign,FaClock,FaCalendarAlt } from 'react-icons/fa';

import { columns, rows } from './RowColOfEnterpriseJob'; 

const EnterpriseJob = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [jobType, setJobType] = useState('fulltime'); // fulltime or contract
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const navigate = useNavigate();
  const uploadedFiles = [
    { name: 'Sample CV', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Candidate Evaluation Form', type: 'pdf', url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf' },
    { name: 'Audio Briefing by Client', type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Uploaded Other File', type: 'image', url: 'https://www.w3schools.com/w3images/lights.jpg' },
  ];


  const handleRowClick = (id) => {
    setSelectedRowId(id);
    const job = rows.find(row => row._id === id);
    setSelectedJob(job);
    setDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); 
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const [activeTab, setActiveTab] = useState('one');
 

  const [openSections, setOpenSections] = useState({
    jobProfile: false,
    jobDescription: false,
    
    sourcingGuidelines: false,
    remuneration: false,
  });

  // Toggle section visibility
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Calculate the rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Card className='mt-4 font-sans shadow-md' sx={{
        borderRadius: '8px',
        boxShadow: 3,
      }}>
        <div className='px-6'>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}
          >
            <Typography variant="h5" fontWeight="bold">
              Post a Job
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#315370', 
                fontSize: '18px',
                color: 'white', 
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: '#26425a',
                },
              }}
              onClick={() => navigate('/master_admin/add_team')}
            >
              Post a new Job
            </Button>
          </Box>

          {/* Tabs for Post Job and Drafts */}
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            className='my-4' 
            indicatorColor="primary"
            textColor="primary"
            sx={{
              textTransform: 'none',
              '& .MuiTab-root': {
                color: 'black',
                fontWeight: 'bold',
              },
              '& .Mui-selected': {
                color: '#1976d2',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <Tab label={`Post Job (10)`} sx={{ textTransform: 'none', fontSize: '17px' }} />
            <Tab label={`Drafts (5)`} sx={{ textTransform: 'none', fontSize: '17px' }} />
          </Tabs>

          {/* Search Field */}
          <TextField 
            variant='outlined' 
            placeholder='Search Job...' 
            fullWidth 
            className='my-4' 
          />

          {/* DataGrid Section */}
          <div style={{ height: 600, width: '100%' }} className='pt-4'>
            <DataGrid 
              rows={paginatedRows}
              columns={columns}
              rowHeight={80}
              onRowClick={(params) => handleRowClick(params.id)}
              getRowId={(row) => row._id}
              pagination={false} 
              pageSize={rowsPerPage} 
              hideFooterPagination={true} 
              disableSelectionOnClick 
              sx={{
                '& .MuiDataGrid-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' }, 
                },
                '[class^=MuiDataGrid]': { border: 'none' },
                '& .MuiDataGrid-columnHeader': {
                  fontWeight: 'bold', 
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' }, 
                  color: 'black', 
                  backgroundColor: '#e3e6ea !important', 
                  minHeight: '60px', 
                },
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' }, 
                  minHeight: '2.5rem', 
                },
                '& .MuiDataGrid-cellContent': {
                  display: 'flex',
                  alignItems: 'center', 
                },
                '& .MuiDataGrid-row': {
                  borderBottom: 'none', 
                },
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none', 
                },
              }}
            />
          </div>
        </div>
      </Card>

      {/* Pagination Component */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />

   
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth PaperProps={{
      sx: {
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
      },
    }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto">
        {/* Dialog Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold text-gray-700">{selectedJob ? selectedJob.job_title : 'Job Title'}</h3>
            <FaUsers className="text-blue-600 text-xl" />
          </div>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-yellow-600"
          >
            <FaStar />
            <span>Mark as Hot Job</span>
          </button>
        </div>

        {/* Job Profile Section */}
        <div className={`border-b py-4 px-4 ${openSections.jobProfile ? 'bg-yellow-50' : ''}`}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('jobProfile')}>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaBriefcase className="mr-2 text-2xl text-blue-600" /> Job Profile
            </h2>
            <FaCaretDown className={`transition-transform duration-300 ${openSections.jobProfile ? 'rotate-180' : ''}`} />
          </div>
          {openSections.jobProfile && (
            <div className="pl-6 mt-2">
              <p className=" xl:text-lg"><strong>Job Title:</strong> Software Engineer</p>
           
              <p className="mt-2 flex items-center  xl:text-lg"> Permanent</p>
              <p className=" xl:text-lg"><strong>Country:</strong> USA</p>
              <p className=" xl:text-lg"><strong>State:</strong> California</p>
              <p className=" xl:text-lg"><strong>City:</strong> San Francisco</p>
              <p className=" xl:text-lg"><strong>Job Domain:</strong> Software Development</p>
              <p className=" xl:text-lg"><strong>Positions:</strong> 2</p>
              <p className=" xl:text-lg"><strong>Experience:</strong> 3-5 years</p>
            </div>
          )}
        </div>

        {/* Job Location and Experience Section */}
        <div className={`border-b py-4 px-4 ${openSections.jobDescription ? 'bg-yellow-50' : ''}`}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('jobDescription')}>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-2xl text-green-600" /> Job Description
            </h2>
            <FaCaretDown className={`transition-transform duration-300 ${openSections.jobDescription ? 'rotate-180' : ''}`} />
          </div>
          {openSections.jobDescription && (
            <div className="pl-6 mt-2">
              <p className="mt-2">
              A job is any legal activity that allows an individual to perform a service and in return earn credits they can use to buy things.
A job can mean "some work that has to be done", for example: there are jobs to be done in the house: washing up, mending things that are broken, etc.
A job can also mean: work that a person does to earn money. The word "job" may be used when a person works for someone else "an employer" who pays them for the work. For example, a teacher's job is to teach children or adults. A taxi driver's job is to drive people in a taxi. A firefighter rescues people from burning buildings and puts out fires. A dermatologist's job is to diagnose and treat skin diseases. Some jobs pay very little.
The International Labour Organization was established to make people's job conditions better. It became an organization of the United Nations in 1946.
              </p>
              
              
            </div>
          )}
        </div>

        {/* Other Details Section */}
        <div className={`border-b py-4 px-4 ${openSections.sourcingGuidelines ? 'bg-yellow-50' : ''}`}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('sourcingGuidelines')}>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaInfoCircle className="mr-2 text-2xl text-purple-600" /> Sourcing Guidelines
            </h2>
            <FaCaretDown className={`transition-transform duration-300 ${openSections.sourcingGuidelines ? 'rotate-180' : ''}`} />
          </div>
          {openSections.sourcingGuidelines && (
            <div className="  space-y-6 rounded-lg font-sans flex flex-col items-center ">
          
         
            <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
            <div className='space-y-3'>
        
        <div className='space-y-3'>
          <h2 className="text-xl  font-semibold text-gray-800 flex gap-1"><FaStar className="text-2xl text-yellow-600" />Must Haves</h2>
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
          <h2 className="text-xl   font-semibold text-gray-800 flex gap-1">   <FaBan className="text-2xl  text-red-600" />No Poach Clients</h2>
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
          <h2 className="text-xl   font-semibold text-gray-800 flex gap-1" > <FaThumbsUp className="text-2xl  text-green-600" />Nice to Haves</h2>
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
          <h2 className="text-xl  font-semibold text-gray-800 flex gap-1"><FaBullseye className="text-2xl text-blue-600" />Target Companies</h2>
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
          <h2 className="text-xl  font-semibold text-gray-800 flex gap-1 "> <FaPaperclip className="text-2xl   text-gray-600" />Attachments</h2>
          <div className='pl-36'>
          <ul className="list-disc pl-5 mt-2 space-y-4  grid grid-cols-2   ">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex flex-col ">
                <div className="flex items-center space-x-2 ">
                  {file.type === 'pdf' && <FaFilePdf className="text-red-600" />}
                  {file.type === 'audio' && <FaFileAudio className="text-blue-600" />}
                  {(file.type === 'image' || file.type === 'video') && <FaFileAlt className="text-gray-600" />}
                  <span>{file.name} ({file.type.toUpperCase()})</span>
                </div>
               <div className=' '>
                <iframe
    src={file.url}
    title={file.name}
    className="mt-2 border rounded-lg w-full  sm:max-w-sm "
    style={{ height: 'auto', aspectRatio: '1 / 1' }}
    frameBorder="0"
    allowFullScreen
  ></iframe>
  </div>
  
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
      </div>
       </div>
          )}
        </div>

        {/* Remuneration Section */}
        <div className={`border-b py-4 px-4 ${openSections.remuneration ? 'bg-yellow-50' : ''}`}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('remuneration')}>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              {jobType === 'fulltime' ? <FaDollarSign className="mr-2 text-2xl text-green-600" /> : <FaClock className="mr-2 text-purple-600" />}
              {jobType === 'fulltime' ? 'Remuneration Details' : 'Contract Remuneration Details'}
            </h2>
            <FaCaretDown className={`transition-transform duration-300 ${openSections.remuneration ? 'rotate-180' : ''}`} />
          </div>
          {openSections.remuneration && (
            <div className="space-y-6 rounded-lg flex flex-col items-center ">
         
         

            {/* Full-Time Remuneration Details */}
            {jobType === 'fulltime' && (
              <>
                <div className="bg-white pt-2 p-4 rounded-lg shadow-sm   w-full ">
                <div className=' space-y-3'>
                  
                  
                    

                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Annual Salary:</strong> $100,000 - $120,000</p>

                    <p className='xl:text-lg'><strong>Additional Salary Details:</strong> Performance bonuses included...</p>
                    </div>
                 
                </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm  w-full ">
                <div className=' space-y-3'>
                  
                  <div className='space-y-3'>
                    <h2 className="text-xl font-semibold text-gray-800 flex gap-1">  <FaInfoCircle className="text-2xl xl:text-3xl text-blue-600" />Commission</h2>
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
                    <h2 className="text-xl  font-semibold text-gray-800 flex gap-1"> <FaClock className="text-2xl text-purple-600" />Contract Remuneration Details</h2>
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
                    <h2 className="text-xl   font-semibold text-gray-800 flex gap-1"><FaCalendarAlt className="text-2xl text-red-600" />Commission</h2>
                    <div className='pl-36'>
                    <p className='xl:text-lg'><strong>Commission Payout:</strong> 5% of contract value</p>
                    < p className='xl:text-lg'><strong>Payment Terms:</strong> Upon candidate joining</p>
                  </div>
                  </div>
                </div>
                </div>
              </>
            )}
          
        
          </div>
          )}
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-between items-center mt-6">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-blue-230 hover:text-white"
            onClick={handleCloseDialog}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
    </div>
  );
};

export default EnterpriseJob;

