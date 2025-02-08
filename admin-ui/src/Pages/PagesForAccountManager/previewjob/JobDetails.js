import React from 'react'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Importing icons
import { useParams } from 'react-router-dom';
import { BadgeInfo } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { FileQuestion } from 'lucide-react';
import { File } from 'lucide-react';


import HtmlContent from '../../../constants/HtmlContent';

import axios from 'axios';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


const getJobType = (jobDetails) =>{
    if(Object.keys(jobDetails?.job_commission_details?.work_details?.full_time || {}).length>0){
        return "Full Time"
    }else{
        return "Contract"
    }
}

const getPayOut = (jobDetails) =>{
    const jobType = getJobType(jobDetails)
    if(jobType==="Full Time"){
        let fullTime = jobDetails?.job_commission_details?.work_details?.full_time
        if(fullTime && fullTime.full_time_salary_type==="Fixed"){
            return `${fullTime.full_time_salary_currency} ${fullTime.fixed_salary}`
        }else if(fullTime){
            return `${fullTime.full_time_salary_currency} ${fullTime.min_salary}-${fullTime.max_salary}`
        }
        return "None"
    }else{
        let contract = jobDetails?.job_commission_details?.work_details?.contract
        if(contract && contract.contract_pay_rate_type==="Fixed"){
            return `${contract.contract_pay_currency} ${contract.fix_contract_pay}`
        }else if(contract){
            return `${contract.contract_pay_currency} ${contract.min_contract_pay}-${contract.max_contract_pay}`
        }
        return "None"
    }
    
}

const getCommissionPayout = (jobDetails) =>{ 
    let commissionDetails = jobDetails?.job_commission_details?.commission_details
    if(!commissionDetails) return "none"

    if(commissionDetails.commission_type==="Percentage"){
       return `${commissionDetails.commission_percentage_pay}%`
    }else{
       return `${commissionDetails.commission_fix_pay}`
    }
}

function getCapitalLetter(index) {
  return String.fromCharCode(65 + index);
}


function JobDetails() {
    
    const [jobDetails,setJobDetails] = useState(null)
    const {id} = useParams()

    console.log(id)

    const fetchJobDetails = async ()=>{
        try{
           const response = await axios.get(`${process.env.REACT_APP_API_APP_URL}/acmanagerjob/byjobid/${id}`)
           console.log(response)
           setJobDetails(response.data.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
       fetchJobDetails()
    },[])

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
   <div className='bg-[#F0F0F0] h-full overflow-scroll scroll-smooth pt-[8px]'>
    <Box sx={{ width: '100%', height:'100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Job Details" {...a11yProps(0)} />
          <Tab label="Company Info" {...a11yProps(1)} />
          <Tab label="Sourcing Guidelines & Attachments" {...a11yProps(2)} />
          <Tab label="Screening Questions" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <BriefcaseBusiness></BriefcaseBusiness>
              <h1 className='text-lg font-medium'>Basic Details</h1>
            </div>
            <div className='grid w-full gap-4 gap-y-5 grid-cols-2'>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Job Id:</span>
                    <span className='text-gray-700'>{jobDetails?.job_id}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Job Title:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.job_title}</span>
                </div>
                <div className='flex rounded-md flex-col col-span-2 bg-white border border-gray-300 px-2 py-3 gap-2'>
                    <span className='font-medium'>Job Description:</span>
                    <span className='text-gray-700'><HtmlContent htmlString={jobDetails?.job_basic_details?.job_description}></HtmlContent></span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Country:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.country}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>City:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.city.map((item,index)=> `${item}${jobDetails?.job_basic_details.city.length===index+1?"":","} `)}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Domains:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.job_domain}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Positions:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.positions}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Experience:</span>
                    <span className='text-gray-700'>{`${jobDetails?.job_basic_details?.experience.minexp} - ${jobDetails?.job_basic_details?.experience.maxexp} Experience`}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Is Remote Work:</span>
                    <span className='text-gray-700'>{jobDetails?.job_basic_details?.permanent_remote_work?"Yes":"No"}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Job Type:</span>
                    <span className='text-gray-700'>{getJobType(jobDetails)}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>{getJobType(jobDetails)==="Full Time"?"Salary":"Contract Pay Rate"}:</span>
                    <span className='text-gray-700'>{getPayOut(jobDetails)}</span>
                </div>
            </div>
        </div>
        <div className='flex mt-6 flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <BadgeInfo></BadgeInfo>
              <h1 className='text-lg font-medium'>Commission Details</h1>
            </div>
            <div className='grid w-full gap-4 gap-y-5 grid-cols-2'>
                <div className='flex col-span-2 rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Commission Payout:</span>
                    <span className='text-gray-700'>{getCommissionPayout(jobDetails)}</span>
                </div>
                <div className='flex rounded-md bg-white border px-2 py-3 border-gray-300 items-center gap-2'>
                    <span className='font-medium'>Payment Terms:</span>
                    <span className='text-gray-700'>{jobDetails?.job_commission_details?.commission_details?.payment_tearms}</span>
                </div>
                <div className='flex rounded-md bg-white border px-2 py-3 border-gray-300 items-center gap-2'>
                    <span className='font-medium'>Replacement Clause:</span>
                    <span className='text-gray-700'>{jobDetails?.job_commission_details?.commission_details?.replacement_clause}</span>
                </div>
            </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Building2></Building2>
              <h1 className='text-lg font-medium'>Company Details</h1>
            </div>
            <div className='grid w-full gap-3 gap-y-5 grid-cols-1'>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Company Name:</span>
                    <span className='text-gray-700'>{jobDetails?.job_company_details?.client_name}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 flex-col gap-2'>
                    <span className='font-medium'>Company Description:</span>
                    <span className='text-gray-700'><HtmlContent htmlString={jobDetails?.job_company_details?.client_description || ''}></HtmlContent></span>
                </div>
            </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <BookOpen></BookOpen>
              <h1 className='text-lg font-medium'>Sourcing Guidelines</h1>
            </div>
            <div className='grid w-full gap-3 gap-y-5 grid-cols-2'>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>Must Haves:</span>
                    <span className='text-gray-700'>{jobDetails?.job_sourcing_guidelines?.must_haves}</span>
                </div>
                <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 items-center gap-2'>
                    <span className='font-medium'>No Poach Clients:</span>
                    <span className='text-gray-700'>{jobDetails?.job_sourcing_guidelines?.poach_clients}</span>
                </div>
            </div>
        </div>
        <div className='flex mt-4 flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Paperclip></Paperclip>
              <h1 className='text-lg font-medium'>Attachments</h1>
            </div>
            <div className='grid w-full gap-3 gap-y-5 grid-cols-1'>
               {
                jobDetails?.job_attachments?.sample_cv && 
                 <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 justify-between items-center gap-2'>
                 <div className='flex items-center gap-2'>
                   <span className='font-medium'><File></File></span>
                   <span className='text-gray-700'>Sample CV</span>
                 </div>
                 <a href={`${process.env.REACT_APP_APP_URL}/jobdocs/${jobDetails?.job_attachments?.sample_cv.filepath.replace(
                     /^uploads\/jobdocs\//,
                     ""
                     )}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{
                     color: '#1976d2',
                     textDecoration: 'none',
                     padding: '8px 12px',
                     border: '1px solid #1976d2',
                     borderRadius: '4px',
                     }}
                     >
                     View File
                  </a>
                </div>
               }
               {
                jobDetails?.job_attachments?.audio_brief && 
                 <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 justify-between items-center gap-2'>
                 <div className='flex items-center gap-2'>
                   <span className='font-medium'><File></File></span>
                   <span className='text-gray-700'>Audio Brief</span>
                 </div>
                 <a href={`${process.env.REACT_APP_APP_URL}/jobdocs/${jobDetails?.job_attachments?.audio_brief.filepath.replace(
                     /^uploads\/jobdocs\//,
                     ""
                     )}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{
                     color: '#1976d2',
                     textDecoration: 'none',
                     padding: '8px 12px',
                     border: '1px solid #1976d2',
                     borderRadius: '4px',
                     }}
                     >
                     View File
                  </a>
                </div>
               }
               {
                jobDetails?.job_attachments?.evaluation_form && 
                 <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 justify-between items-center gap-2'>
                 <div className='flex items-center gap-2'>
                   <span className='font-medium'><File></File></span>
                   <span className='text-gray-700'>Evaluation Form</span>
                 </div>
                 <a href={`${process.env.REACT_APP_APP_URL}/jobdocs/${jobDetails?.job_attachments?.evaluation_form.filepath.replace(
                     /^uploads\/jobdocs\//,
                     ""
                     )}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{
                     color: '#1976d2',
                     textDecoration: 'none',
                     padding: '8px 12px',
                     border: '1px solid #1976d2',
                     borderRadius: '4px',
                     }}
                     >
                     View File
                  </a>
                </div>
               }
               {
                jobDetails?.job_attachments?.other_docs && 
                 <div className='flex rounded-md bg-white border border-gray-300 px-2 py-3 justify-between items-center gap-2'>
                 <div className='flex items-center gap-2'>
                   <span className='font-medium'><File></File></span>
                   <span className='text-gray-700'>Other Docs</span>
                 </div>
                 <a href={`${process.env.REACT_APP_APP_URL}/jobdocs/${jobDetails?.job_attachments?.other_docs.filepath.replace(
                     /^uploads\/jobdocs\//,
                     ""
                     )}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{
                     color: '#1976d2',
                     textDecoration: 'none',
                     padding: '8px 12px',
                     border: '1px solid #1976d2',
                     borderRadius: '4px',
                     }}
                     >
                     View File
                  </a>
                </div>
               }
            </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <FileQuestion></FileQuestion>
              <h1 className='text-lg font-medium'>Screening Questions</h1>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    (jobDetails?.job_screening_questionsa?.screening_questions || []).map((question)=>(
                        <div className='flex flex-col gap-2 bg-white p-2 rounded-md'>
                            <span>{question.id} {question.question_title} {question.madantory && <span className='text-red-500'>*</span>}</span>
                            {
                              question.ans_type!=="short_text" && 
                              <div className='flex items-center gap-4'>
                                {
                                  question.answer.option.map((op,index)=>(
                                    <span>{getCapitalLetter(index)}. {op}</span>
                                  ))
                                }
                              </div>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
      </CustomTabPanel>
    </Box>
    </div>
  )
}

export default JobDetails