import React, { useState } from 'react'
//importing data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'

import HtmlContent from '../HtmlContent';
import CopyToClipBoard from '../CopyToClipBoard';

//For html text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

//import images
import FireIcon from '../../assets/asset39.png'

import axios from 'axios'

export default function PastJobs({ rows, loading, setTotalPastJobs, showNotification }) {

const [previewLoader,setPriviewLoader]=useState(false)
const [openPreviewBox,setOpenPreviewBox]=useState(false)
const [currentTab,setCurrentTab]=useState('job')
const [jobBasicDetails,setJobBasicDetails]=useState(null)
const [jobDescription,setJobDescription]=useState(null)
const [jobCommissionDetails,setJobCommissionDetails]=useState(null)
const [jobUpdates,setJobUpdates]=useState([])
const [clientDescription,setClientDescription]=useState(null)
const [sourcingGuidelines,setSourcingGuidelines]=useState(null)
const [jobAttachments,setJobAttachments]=useState(null)
const [candidateDetails,setCandidateDetails]=useState(null)
const [acManager,setAcManager]=useState(null)
const [jobStatus,setJobStatus]=useState(null)


const handleFetchJobDetails=async (jobid)=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
       console.log("job basic details---->",res.data)
       if(res.data){
        setJobBasicDetails(res.data)
        setJobDescription(res.data.job_description)
       }
     }catch(err){
       console.log(err)
       showNotification("Something went wrong..!",'failure')
     }
}

const handleFetchJobStatus=async (jobid)=>{
    try{ 
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobstatusforpreview/${jobid}`)
       console.log("job status--->",res.data)
       if(res.data) setJobStatus(res.data)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong..!",'failure')
    }
}

const handleFetchClientDescription=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getcompanydetailsforpreview/${jobid}`)
       console.log("job client description---->",res.data)
       if(res.data) setClientDescription(res.data)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong..!",'failure')
    }
}

const handleFetchJobUpdates=async (jobid)=>{
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobupdates/${jobid}`)
      console.log('job updates----->',res.data)
      if(res.data) setJobUpdates(res.data)
   }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
   }
}

const handleFetchAcManager=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getacmanagerforpreview/${jobid}`)
     console.log('ac manager---->',res.data)
     if(res.data) setAcManager(res.data)
  }catch(err){
    console.log(err)
    showNotification('Something went wrong...!','failure')
  }
}


const handleFetchJobAttachments=async (jobid)=>{ 
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobattachmentsforpreview/${jobid}`)
      console.log('job attachments--->',res.data)
      if(res.data) setJobAttachments(res.data)
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
   try{
    const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
    console.log('commissio details---->',res.data)
    if(res.data) setJobCommissionDetails(res.data)
   }catch(err){
      console.log(err)
      showNotification('Something went wrong...!','failure')
   }
}

const handleFetchJobSourcingGuidelines=async (jobid)=>{
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getsourcingguidelinesforpreview/${jobid}`)
      console.log('sourcing guidelines--->',res.data)
      if(res.data) setSourcingGuidelines(res.data)
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

const [jobUpdateMessage,setJobUpdateMessage]=useState('')
const [messageLoader,setMessageLoader]=useState(false)

const [openJobDetails,setOpenJobDetails]=useState(true)
const [openJobDescription,setOpenJobDescription]=useState(false)
const [openClientDescription,setOpenClientDescription]=useState(false)
const [openSourcingGuidelines,setOpenSourcingGuidelines]=useState(false)
const [openJobAttachments,setOpenJobAttachments]=useState(false)

const handleSendJobUpdateMessage=async ()=>{
   if(jobUpdateMessage && jobBasicDetails){
    setMessageLoader(true)
    try{
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/createjobupdates/${jobBasicDetails.job_id}`,{text:jobUpdateMessage})
      setJobUpdateMessage('')
      await handleFetchJobUpdates(jobBasicDetails.job_id)
    }catch(err){
       setMessageLoader(false)
       console.log(err)
       showNotification("Something went wrong while sending job update message",'failure')
    }
    setMessageLoader(false)
   }
}


const handleOpenPreviewBox=(jobid)=>{
   setPriviewLoader(true)
   setOpenPreviewBox(true)
   //For fetching job details
   handleFetchJobDetails(jobid)
   handleFetchJobAttachments(jobid)
   handleFetchClientDescription(jobid)
   handleFetchJobSourcingGuidelines(jobid)
   handleFetchJobStatus(jobid)
   handleFetchAcManager(jobid)
   handleFetchJobUpdates(jobid)
   handleFetchJobCommissionDetails(jobid)

   setPriviewLoader(false)
}

const handleClosePreviewBox=(jobid)=>{
  setOpenPreviewBox(false)
   setJobBasicDetails(null)
   setJobUpdates([])
   setJobAttachments(null)
   setJobCommissionDetails(null)
   setAcManager(null)
   setSourcingGuidelines(null)
   setJobStatus(null)
   setJobDescription(null)
   setClientDescription(null)

   setOpenJobDetails(true)
   setOpenJobDescription(false)
   setOpenClientDescription(false)
   setOpenSourcingGuidelines(false)
   setJobAttachments(false)

   setJobUpdateMessage('')
}


const getDate=(date)=>{
  let d=new Date(date)
  let d_ate=d.getDate()
  let d_month=d.getMonth()+1
  let d_year=d.getFullYear()
 
  return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
}

const getTitleText=(text)=>{
   if(text.length>16){
       text=text.slice(0,16)
       return text+"..."
   }
   return text
}

const getDays=(date)=>{
  const today=new Date()
  const past=new Date(date)

  const timeDifference=today.getTime()-past.getTime()

  const days=Math.floor(timeDifference/(1000 * 60 * 60 * 24))
  return days
}

const pastJobCol=[
   { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 50, },
   {
       field:"jobtitle",headerClassName:'super-app-theme--header', headerName:"Job Title",width:400,
       renderCell:(params)=>{
           return (
               
                <div className="h-full flex gap-3 items-center">
                   <div className={`flex h-10 w-6 rounded-lg justify-center place-items-center ${(params.row.job_status==="Active")?("bg-green-100"):("bg-yellow-100")}`}>
                       <span className={`${(params.row.job_status==="Active")?("text-green-500"):("text-yellow-500")} text-sm font-medium`}>{(params.row.job_status==="Active")?("A"):("P")}</span>
                   </div>
                   <div onClick={()=>handleOpenPreviewBox(params.row.job_id)} className="flex cursor-pointer gap-1 flex-col place-items-start">
                      <span className="text-[1rem] leading-5 font-medium">{params.row.job_id} - {getTitleText(params.row.job_title)}</span>
                      <span className="text-sm font-light">{params.row.country} - {(params.row.city.length>2)?(`${params.row.city[0]}, ${params.row.city[1]} ${params.row.city.length-2}+`):(params.row.city.map((city,index)=> <span key={index}>{city}{(index===params.row.city.length-1)?(""):(", ")}</span>))}</span>
                   </div>
                </div>
               
           )
       }
   },
   {
       field:"createdon",headerClassName:'super-app-theme--header',headerName:"Created On",width:250,
       renderCell:(params)=>{
           return (
               <div className="h-full mt-3 flex flex-col gap-1">
                   <span className="text-md leading-5">{getDate(params.row.createdAt)}</span>
                   <span className="text-sm text-gray-400 leading-5">({getDays(params.row.createdAt)} days ago)</span>
               </div>
           )
       }
   },
   {
       field:"recruiter",headerClassName:'super-app-theme--header',headerName:"Recruiter",width:308,
       renderCell:(params)=>{
           return (
               <div className="flex h-full gap-2 items-center">
                  <div className="bg-blue-400 h-6 w-6 flex justify-center place-items-center rounded-full">
                      <span className="text-[1.1rem] leading-5 text-white">{params.row.full_name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-[1rem] leading-5">{params.row.full_name}</span>
               </div>
           )
       }
   },
   {
       field:'status',headerClassName:'super-app-theme--header',headerName:"Status",width:300,
       renderCell:(params)=>{
           return (
               <div className="flex items-center h-full">
                 <div className={`${(params.row.job_status==="Active")?("bg-green-100"):("bg-yellow-100")} rounded-md flex justify-center items-center h-8 p-1 px-2`}>
                 <span className={`${(params.row.job_status==="Active")?("text-green-500"):("text-yellow-500")} text-sm`}>{params.row.job_status}</span>
                 </div>
               </div>
           )
       }
   }
]


//moduels and formate for quill text editor
const modules={
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{ 'color': [] }], // Add color and background color options                             
],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline','color',
  'list', 'bullet', 'indent', // Include color and background in formats
  ];


  return (
    <div>
      
     {
      openPreviewBox && 
      <div className='fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div gap-0 p-0 w-[90%] overflow-hidden'>
              <div className='relative flex w-full p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200'>
                 <div className='p-2 absolute rounded-md bg-slate-100 right-4 top-2 flex items-center gap-2'>
                     <img src={FireIcon} className='grayscale w-5 h-5'></img>
                     <span className='text-gray-400'>Mark As Hot Job</span>
                 </div>
                 <div className='flex gap-2 items-center'>
                     <span onClick={handleClosePreviewBox} className='text-gray-500 cursor-pointer '><ArrowBackIosIcon style={{fontSize:'1.2rem', fontWeight:'bold'}}></ArrowBackIosIcon></span>
                     <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center'>
                            <h1 className='text-xl font-medium tracking-wide'>{jobBasicDetails && jobBasicDetails.job_title}</h1>
                            <span className='text-gray-400 text-sm'>{jobBasicDetails && jobBasicDetails.job_id}</span>
                        </div>
                        <div className='flex flex-col gap-1'>
                         <div className='flex gap-4 items-center'>
                            <div className='flex gap-1 items-center'>
                              <span className='font-light'>Total Commission:</span>
                              <h2>{jobCommissionDetails && 
                              ((jobCommissionDetails.work_type==="full_time")
                              ?((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Annual Salary`)
                              :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_fix_pay} Of Annual Salary`))
                              :((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Contract Pay`)
                              :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.commission_fix_pay} of Contract Pay`)))}</h2>
                            </div>
                            <div className='flex gap-1 items-center'>
                              <span className='font-light'>Position:</span>
                              <h2>{jobBasicDetails && jobBasicDetails.positions}</h2>
                            </div>
                            <h1>{jobCommissionDetails && (jobCommissionDetails.work_type==="full_time"?("Full Time"):("Contract"))}</h1>
                            <h1>{clientDescription && clientDescription.client_name.toUpperCase()}</h1>
                            <div className='flex gap-1 items-center'>
                               {jobBasicDetails && 
                                jobBasicDetails.city.map((city,index)=>(

                                  <span key={index}>{`${city}${index===jobBasicDetails.city.length-1?(' '):(',')}`}</span>
                                ))
                               }
                            </div>
                         </div>
                         <div className='flex gap-4 items-center'>
                            <div className='flex font-light text-sm gap-1 items-center'>
                                <span>Activated:</span>
                                <span>{jobStatus==="Active"?("Yes"):("No")}</span>
                            </div>
                            <div className='flex font-light text-sm gap-1 items-center'>
                                <span>Ac Manager:</span>
                                <span>{acManager?(acManager.full_name):("Not Available")}</span>
                            </div>
                         </div>
                        </div>
                     </div>
                 </div>
                 <div className='flex mt-2 gap-6 px-4'>
                    <div className={`cursor-pointer ${currentTab==="job" && "text-blue-400"} hover:text-blue-400`}>
                      Job
                      {currentTab==='job' && <hr className='bg-blue-400 h-1'></hr>}
                    </div>
                    <div className={`cursor-pointer ${currentTab==="candidate" && "text-blue-400"} hover:text-blue-400`}>
                      Candidate Pipeline
                      {currentTab==='candidate' && <hr className='bg-blue-400 h-1'></hr>}
                    </div>
                 </div>
              </div>
              <div className='bg-white-200 w-full flex gap-3 p-3'>
                <div className='relative flex-1 custom-div gap-0 h-[600px] p-0'>
                        <div className='border-b w-full p-2'>
                          <span className='text-blue-400'>Job Updates</span>
                        </div>
                        <div className='bg-white-600 py-4 flex flex-col gap-4 px-2 w-full h-[558px] overflow-scroll'>
                           {
                            jobUpdates.map((obj,index)=>(
                              <div key={index} className='bg-white w-[70%] border-gray-300 border p-2 rounded-md'>
                                <HtmlContent htmlString={obj.text}></HtmlContent>
                              </div>
                            ))
                           }

                           <ReactQuill 
                            style={{height:'120px',position:'absolute',bottom:'43px', left:'0',right:'0'}}
                            value={jobUpdateMessage}
                            onChange={newContent=>setJobUpdateMessage(newContent)}
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            />
                            <button onClick={handleSendJobUpdateMessage} disabled={jobUpdateMessage.length===0} className='disabled:bg-gray-300 w-36 disabled:cursor-not-allowed absolute bottom-0 right-3 rounded-sm p-2 bg-blue-400 text-white'>
                                {
                                  messageLoader
                                  ?(
                                    <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                    </svg>
                                  ):(
                                    "Send Job Update"
                                  )
                                }
                            </button>
                        </div>
                </div>
                <div className='flex-1 custom-div gap-2 overflow-hidden p-0 bg-white'>
                   <div className='w-full overflow-scroll h-[600px]'>
                   {
                        jobBasicDetails && 
                        <div>
                          <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                            <span className='text-blue-400'>Job Details</span>
                            <span onClick={()=>setOpenJobDetails(!openJobDetails)} className='text-blue-400 cursor-pointer'>{openJobDetails?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                          </div>
                          {
                            openJobDetails && (

                              <div className='flex bg-white items-center px-3 py-4'>
                              <div className='flex flex-col gap-2'>
                               <div className='flex items-center gap-2'>
                                 <span className='text-sm w-32'>Job Title</span>
                                 <span className='text-[14px] w-52 font-semibold'>{jobBasicDetails.job_title}</span>
                               </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Domain</span>
                               <span className='text-[14px] w-52 font-semibold text-blue-400'>{jobBasicDetails.job_domain}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                                <span className='text-sm w-32'>Posted At</span>
                                <span className='text-[14px] w-52 font-semibold'>{getDate(jobBasicDetails.createdAt)}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Location</span>
                               <span  className='text-[14px] w-52 font-semibold'>{jobBasicDetails.country}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Status</span>
                               <span className={`${jobStatus==='Active'?("bg-green-200 text-green-500"):("bg-yellow-100 text-yellow-400")} text-[14px] flex justify-center items-center p-1 px-4 rounded-md font-semibold`}>{jobStatus}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Salary</span>
                               <span className='text-[14px] w-52 font-semibold'>        
                                 {jobCommissionDetails &&  (jobCommissionDetails.work_type==="full_time"?
                                 (jobCommissionDetails.work_details.full_time.full_time_salary_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.fixed_salary}`)
                                   :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.min_salary} - ${jobCommissionDetails.work_details.full_time.max_salary}`))
                                   :(jobCommissionDetails.work_details.contract.contract_pay_rate_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.fix_contract_pay}`)
                                   :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.min_contract_pay} - ${jobCommissionDetails.work_details.contract.max_contract_pay}`)))}
                                </span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Payment Terms</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.commission_details.payment_tearms} Days</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Job Positions</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobBasicDetails.positions}</span>
                             </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Client Name</span>
                               <span className='text-[14px] w-52 font-semibold'>{clientDescription && clientDescription.client_name}</span>
                             </div>
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Experience</span>
                               <span className='text-[14px] w-52 font-semibold'>{`${jobBasicDetails.experience.minexp} - ${jobBasicDetails.experience.maxexp} Years`}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Replacement Terms</span>
                              <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.commission_details.replacement_clause} Days</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>SP Payout</span>
                              <span className='text-[14px] w-52 font-semibold'>
                               {jobCommissionDetails && (jobCommissionDetails.commission_details.commission_type==="Percentage"
                               ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}%`)
                               :(jobCommissionDetails.work_type==="full_time"?
                               (`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`)
                               :(`${jobCommissionDetails.work_details.contract.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`)))}
                              </span>
                            </div>
                           </div>
                          </div>

                            )
                          }
                          
                       </div>
                        }
                        {
                          jobDescription && (
                             <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                   <span className='text-blue-400'>Job Description</span>
                                   <CopyToClipBoard text={jobDescription} showNotification={showNotification}></CopyToClipBoard>
                                </div>
                                <span onClick={()=>setOpenJobDescription(!openJobDescription)} className='text-blue-400 cursor-pointer'>{openJobDescription?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                                {
                                  openJobDescription && (
                                    <div className='p-2'>
                                       <HtmlContent htmlString={jobDescription}></HtmlContent>
                                    </div>
                                  )
                                }
                             </div>
                          )
                        }
                        {
                          clientDescription && (
                            <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                <span className='text-blue-400'>Client Description</span>
                                <span onClick={()=>setOpenClientDescription(!openClientDescription)} className='text-blue-400 cursor-pointer'>{openClientDescription?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                            
                             {
                              openClientDescription && (
                                <div className='p-2'>
                                  <HtmlContent htmlString={clientDescription.client_description}></HtmlContent>
                                </div>
                              )
                             }
                            </div>
                          )
                        }
                        {
                          sourcingGuidelines && (
                            <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                 <span className='text-blue-400'>Sourcing Guidelines</span>
                                 <span onClick={()=>setOpenSourcingGuidelines(!openSourcingGuidelines)} className='text-blue-400 cursor-pointer'>{openSourcingGuidelines?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                             
                             {
                              openSourcingGuidelines && (
                                 <div className='p-2 border-b flex flex-col gap-1'>
                                      <div>
                                        <span className='text-sm font-semibold'>Must Haves:</span>
                                        <p className='text-sm leading-4'>{sourcingGuidelines.must_haves}</p>
                                      </div>
                                      <div>
                                        <span className='text-sm font-semibold'>Poach Clients:</span>
                                        <p className='text-sm leading-4'>{sourcingGuidelines.poach_clients}</p>
                                      </div>
                                 </div>
                              )
                             }
                            </div>
                          )
                        }
                        {
                          jobAttachments && 
                          <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                 <span className='text-blue-400'>Attachments</span>
                                 <span onClick={()=>setOpenJobAttachments(!openJobAttachments)} className='text-blue-400 cursor-pointer'>{openJobAttachments?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                               {
                                openJobAttachments && 
                                 <div className='flex flex-col gap-1'>
                                    {
                                      jobAttachments.evaluation_form && 
                                       <div className='flex border-b justify-between p-2 items-center'>
                                         <div className='flex gap-2 items-center'>
                                            <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                                            <span className='text-sm'>{jobAttachments.evaluation_form.filename}</span>
                                         </div>
                                       </div>
                                    }
                                 </div>
                               }
                          </div>
                        }
                   </div>
                </div>
              </div>
          </div>
      </div>
     }
      <Box sx={{
        height: 600, width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        }
      }}>
        <DataGrid
          getRowId={(rows) => rows.id} // Specify the custom ID field
          rowHeight={70}
          rows={rows}
          columns={pastJobCol}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSize={8}
          pageSizeOptions={[5, 10]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              background: 'red', // Set your desired background color here
              color: '#124791', // Optional: Set text color
              fontSize: '1rem',
              fontWeight: 'bold'
            },
          }}
        ></DataGrid>
      </Box>
    </div>
  )
}
