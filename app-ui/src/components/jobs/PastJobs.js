import React, { useState } from 'react'
//importing data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'

import HtmlContent from '../HtmlContent';
import CopyToClipBoard from '../CopyToClipBoard';

//import components
import CandidateDataShowJobPreview from '../candidate/CandidateDataShowJobPreview';

//For html text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import WhiteLoader from '../../assets/whiteloader.svg'
//importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
const [jobHotMark,setJobHotMark]=useState(false)
const [markLoader,setMarkLoader]=useState(false)


const handleFetchJobDetails=async (jobid)=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
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
       if(res.data) setJobStatus(res.data)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong..!",'failure')
    }
}

const handleFetchClientDescription=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getcompanydetailsforpreview/${jobid}`)
       if(res.data) setClientDescription(res.data)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong..!",'failure')
    }
}

const handleFetchJobUpdates=async (jobid)=>{
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobupdates/${jobid}`)
      if(res.data) setJobUpdates(res.data)
   }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
   }
}

const handleFetchAcManager=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getacmanagerforpreview/${jobid}`)
     if(res.data) setAcManager(res.data)
  }catch(err){
    console.log(err)
    showNotification('Something went wrong...!','failure')
  }
}


const handleFetchJobAttachments=async (jobid)=>{ 
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobattachmentsforpreview/${jobid}`)
      if(res.data) setJobAttachments(res.data)
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
   try{
    const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
    if(res.data) setJobCommissionDetails(res.data)
   }catch(err){
      console.log(err)
      showNotification('Something went wrong...!','failure')
   }
}

const handleFetchJobSourcingGuidelines=async (jobid)=>{
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getsourcingguidelinesforpreview/${jobid}`)
      if(res.data) setSourcingGuidelines(res.data)
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

const handleFetchJobCandidate=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobcandidatesforpreview/${jobid}`)
     if(res.data) setCandidateDetails(res.data.map((candidate,index)=>({...candidate,id:index+1})))
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

console.log("candidate details----->",candidateDetails)

const handleFetchJobHotMark=async (jobid)=>{
  if(!markLoader){
    try{
      setMarkLoader(true)
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobhotmark/${jobid}`)
       setJobHotMark(res.data)
    }catch(err){
      setMarkLoader(false)
      console.log(err)
      showNotification("Something went wrong...",'failure')
    }
    setMarkLoader(false)
  }
}



const viewJobAttachments=async (jobid,fileName,fileType)=>{ 
   try{
      let orgfilename=null
       switch(fileType){
           case "application/pdf":
            orgfilename=fileName+".pdf"
            break;
           case "application/msword":
            orgfilename=fileName+".doc"
            break;
           case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            orgfilename=fileName+'.docx'
            break;
           case "video/mpeg":
            orgfilename=fileName+'.mp3'
            break;
           case "video/mp4":
            orgfilename=fileName+'.mp4'
            break;
           case "audio/wav":
            orgfilename=fileName+'.wav'
            break;
           default:
            break;
       }
       console.log(orgfilename)
      if(orgfilename){
        const fileUrl=`${process.env.REACT_APP_API_BASE_URL}/job/viewjobattachments/${jobid}/${orgfilename}`
        window.open(fileUrl,'_blank')
      }else{
        showNotification("Unsupported file type.",'failure')
      }
   
   }catch(err){
     console.log(err)
     showNotification("Something went wrong while opening job attachments.")
   }
}

const downloadJobAttachments=async (jobid,filePath,fileName,filetype)=>{
   try{
      //Fetch which type of file we are gonna download 
      const fileExtenstion=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobattachmentfiletype/${jobid}/${filetype}`)
      const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/downloadjobattachments`,{filePath,fileName},
      {
        responseType:'blob'
      })

      let fileType=['application/msword','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if(res.status===200 && fileType.includes(fileExtenstion.data)){
         const blob=new Blob([res.data], {type:fileExtenstion.data})
         const url=window.URL.createObjectURL(blob)
         const link=document.createElement('a')
         link.href=url
         link.setAttribute('download',filetype)
         document.body.appendChild(link)
         link.click()
         link.remove()
      }else{
        showNotification("File is not supported for download.",'failure')
      }

   }catch(err){
     console.log(err)
     showNotification("Something went wrong while downloading job attachments.",'failure')
   }
}

const [jobUpdateMessage,setJobUpdateMessage]=useState('')
const [messageLoader,setMessageLoader]=useState(false)

const getTextLength=(htmlContent)=>{
  const div=document.createElement('div')
  div.innerHTML=htmlContent
  const text=div.textContent || div.innerText || ''
  return text.length
}

const getFirstLetterCapital=(val)=>{
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

//mapping of duration
const duration=new Map([
  ['weekly','Week'],
  ['monthly','Month']
])


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


const handleOpenPreviewBox=async (jobid)=>{
   setPriviewLoader(true)
   setOpenPreviewBox(true)
   //For fetching job details
   await handleFetchJobDetails(jobid)
   await handleFetchJobAttachments(jobid)
   await handleFetchClientDescription(jobid)
   await handleFetchJobSourcingGuidelines(jobid)
   await handleFetchJobStatus(jobid)
   await handleFetchAcManager(jobid)
   await handleFetchJobUpdates(jobid)
   await handleFetchJobCommissionDetails(jobid)
   await handleFetchJobHotMark(jobid)

   //For fetching candidate details
   await handleFetchJobCandidate(jobid)

   setPriviewLoader(false)
}

const handleChangeJobHotMark=async (jobid)=>{
      try{
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/job/changejobhotmark/${jobid}`,{mark:jobHotMark})
        await handleFetchJobHotMark(jobid)
      }catch(err){
        console.log(err)
        showNotification("Something went wrong while changeing job Remarks.",'failure')
      }
}

const handleClosePreviewBox=()=>{
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
   setJobHotMark(false)
   setMarkLoader(false)

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
                 {
                  jobBasicDetails && 
                  <div onClick={()=>handleChangeJobHotMark(jobBasicDetails.job_id)} className={`p-2 ${markLoader?("cursor-not-allowed"):("cursor-pointer")} absolute rounded-md ${jobHotMark?("bg-blue-400"):("bg-slate-100")} right-4 top-2 flex items-center gap-2`}>
                     <img src={FireIcon} className={`${!jobHotMark && "grayscale"} w-5 h-5`}></img>
                     <span className={`${jobHotMark?("text-white"):("text-gray-400")}`}>Mark As Hot Job</span>
                  </div>
                 }
                
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
                    <div onClick={()=>setCurrentTab('job')} className={`cursor-pointer ${currentTab==="job" && "text-blue-400"} hover:text-blue-400`}>
                      Job
                      {currentTab==='job' && <hr className='bg-blue-400 h-1'></hr>}
                    </div>
                    <div onClick={()=>setCurrentTab('candidate')} className={`cursor-pointer ${currentTab==="candidate" && "text-blue-400"} hover:text-blue-400`}>
                      Candidate Pipeline
                      {currentTab==='candidate' && <hr className='bg-blue-400 h-1'></hr>}
                    </div>
                 </div>
              </div>

              {
                   (previewLoader)?(
                      <div className='flex w-full h-[600px] items-center justify-center'>
                         <img src={WhiteLoader} className='w-10 h-10'></img>
                      </div>
                   ):(
                    
                      currentTab==="job"?(

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
                            <button onClick={handleSendJobUpdateMessage} disabled={getTextLength(jobUpdateMessage)===0} className='disabled:bg-gray-300 w-36 disabled:cursor-not-allowed absolute bottom-0 right-3 rounded-sm p-2 bg-blue-400 text-white'>
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
                <div className='flex-1 overflow-hidden rounded-md shadow p-0 bg-white'>
                   <div className='overflow-y-auto h-[600px]'>
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
                               <span className='text-sm w-32'>{jobCommissionDetails && jobCommissionDetails.work_type==="full_time"?("Salary"):("Contract Pay Rate")}</span>
                               <span className='text-[14px] w-52 font-semibold'>        
                                 {jobCommissionDetails &&  (jobCommissionDetails.work_type==="full_time"?
                                 (jobCommissionDetails.work_details.full_time.full_time_salary_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.fixed_salary}`)
                                   :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.min_salary} - ${jobCommissionDetails.work_details.full_time.max_salary}`))
                                   :(jobCommissionDetails.work_details.contract.contract_pay_rate_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.fix_contract_pay} ${getFirstLetterCapital(jobCommissionDetails.work_details.contract.contract_pay_cycle)}`)
                                   :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.min_contract_pay} - ${jobCommissionDetails.work_details.contract.max_contract_pay} ${getFirstLetterCapital(jobCommissionDetails.work_details.contract.contract_pay_cycle)}`)))}
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
                             {
                              (jobCommissionDetails && jobCommissionDetails.work_type==="contract") 
                              &&
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Working Hour Per Day</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.work_details.contract.daily_hour_cnt}</span>
                              </div>
                             }
                             {
                              (jobCommissionDetails && jobCommissionDetails.work_type==="contract")
                              &&
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Working Hour Per Week</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.work_details.contract.weekly_hour_cnt}</span>
                              </div>
                             }
                          </div>
                          <div className='flex flex-col gap-2'>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Client Name</span>
                               <span className='text-[14px] w-32 font-semibold'>{clientDescription && clientDescription.client_name}</span>
                             </div>
                             {
                              jobCommissionDetails.work_type==="contract" && 
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Contract Duration</span>
                               <span className='text-[14px] w-32 font-semibold'>{jobCommissionDetails && `${jobCommissionDetails.work_details.contract.contract_duration_count} ${duration.get(jobCommissionDetails.work_details.contract.contract_duration_type)}`}</span>
                             </div>
                             }
                            
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Experience</span>
                               <span className='text-[14px] w-32 font-semibold'>{`${jobBasicDetails.experience.minexp} - ${jobBasicDetails.experience.maxexp} Years`}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Replacement Terms</span>
                              <span className='text-[14px] w-32 font-semibold'>{jobCommissionDetails && jobCommissionDetails.commission_details.replacement_clause} Days</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>SP Payout</span>
                              <span className='text-[14px] w-32 font-semibold'>
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
                                        <div className='p-2 border rounded-md bg-white-600'>
                                         <p className='text-sm leading-4'>{sourcingGuidelines.must_haves}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <span className='text-sm font-semibold'>Poach Clients:</span>
                                        <div className='p-2 border rounded-md bg-white-600'>
                                          <p className='text-sm leading-4'>{sourcingGuidelines.poach_clients}</p>
                                        </div> 
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
                                      jobAttachments.sample_cv && 
                                       <div className='flex border-b justify-between p-2 items-center'>
                                         <div className='flex gap-2 items-center'>
                                            <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                                            <div className='flex flex-col'>
                                              <span className='text-sm'>{jobAttachments.sample_cv.filename}</span>
                                              <small className='text-gray-400'>Sample cv</small>
                                            </div> 
                                         </div>
                                         <div className='flex gap-2 items-center'>
                                          <span onClick={()=>viewJobAttachments(jobAttachments.folder_name,"sample_cv",jobAttachments.sample_cv.filetype)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.4rem'}}></DescriptionIcon></span>
                                          <span onClick={()=>downloadJobAttachments(jobAttachments.folder_name,jobAttachments.sample_cv.filepath,jobAttachments.sample_cv.filename,'sample_cv')} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.4rem'}}></FileDownloadIcon></span>
                                         </div>
                                       </div>

                                    }
                                    {
                                      jobAttachments.evaluation_form && 
                                       <div className='flex border-b justify-between p-2 items-center'>
                                         <div className='flex gap-2 items-center'>
                                            <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                                            <div className='flex flex-col'>
                                              <span className='text-sm'>{jobAttachments.evaluation_form.filename}</span>
                                              <small className='text-gray-400'>Evaluation form</small>
                                            </div>  
                                         </div>
                                         <div className='flex gap-2 items-center'>
                                          <span onClick={()=>viewJobAttachments(jobAttachments.folder_name,"evaluation_form",jobAttachments.evaluation_form.filetype)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.4rem'}}></DescriptionIcon></span>
                                          <span onClick={()=>downloadJobAttachments(jobAttachments.folder_name,jobAttachments.evaluation_form.filepath,jobAttachments.evaluation_form.filename,'evaluation_form')} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.4rem'}}></FileDownloadIcon></span>
                                         </div>
                                       </div>
                                    }
                                    {
                                      jobAttachments.audio_brief && 
                                       <div className='flex border-b justify-between p-2 items-center'>
                                         <div className='flex gap-2 items-center'>
                                            <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                                            <div className='flex flex-col'>
                                               <span className='text-sm'>{jobAttachments.audio_brief.filename}</span>
                                               <small className='text-gray-400'>Audio Brief</small>
                                            </div>
                                         </div>
                                         <div className='flex gap-2 items-center'>
                                          <span onClick={()=>viewJobAttachments(jobAttachments.folder_name,'audio_brief',jobAttachments.audio_brief.filetype)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.4rem'}}></DescriptionIcon></span>
                                          <span onClick={()=>downloadJobAttachments(jobAttachments.folder_name,jobAttachments.audio_brief.filepath,jobAttachments.audio_brief.filename,'audio_brief')} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.4rem'}}></FileDownloadIcon></span>
                                         </div>
                                       </div>
                                    }
                                    {
                                      jobAttachments.other_docs && 
                                       <div className='flex border-b justify-between p-2 items-center'>
                                         <div className='flex gap-2 items-center'>
                                            <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                                            <div className='flex flex-col'>
                                             <span className='text-sm'>{jobAttachments.other_docs.filename}</span>
                                             <small className='text-gray-400'>Other docs</small>
                                            </div>               
                                         </div>
                                         <div className='flex gap-2 items-center'>
                                          <span onClick={()=>viewJobAttachments(jobAttachments.folder_name,"other_docs",jobAttachments.other_docs.filetype)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.4rem'}}></DescriptionIcon></span>
                                          <span onClick={()=>downloadJobAttachments(jobAttachments.folder_name,jobAttachments.other_docs.filepath,jobAttachments.other_docs.filename,'other_docs')} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.4rem'}}></FileDownloadIcon></span>
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
                      ):(
                         <CandidateDataShowJobPreview candidateRows={candidateDetails}></CandidateDataShowJobPreview>
                      )

                   )
              }
             
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
