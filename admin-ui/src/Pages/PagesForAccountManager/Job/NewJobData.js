import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { columns} from './RowColDataOfNew'; // Import columns configuration
import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';
import axios from 'axios';
import { fetchJobBasicDetailsByJobId, fetchJobDetailsById, fetchPendingJobsByACManagerId, fetchEnterpriseMemberDetails } from '../../../services/api';
//importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import FIRE from '../../../assets/asset39.png'
import WhiteLoader from '../../../assets/whiteloader.svg'

import CopyToClipBoard from '../../../constants/CopyToClipBoard';
import HtmlContent from '../../../constants/HtmlContent';

const calculateRowHeight = (params) => {
  // const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80); 
};

const NewJobData = () => {

  const selectUserData = (state) => state?.admin?.userData;
  const userData = selectUserData(store?.getState());

  const [loading,setLoading]=useState(false)
  const [pendingJobs,setPendingJobs]=useState([])
  const [notification, setNotification] = React.useState(null)
  const [approveLoad,setApproveLoad]=useState(false)
  const [resumeRequired,setResumeRequired] = useState(0)


  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const fetchData=async ()=>{
    setLoading(true)
    try{
      //Fetching verified job ids
      const verifiedJobsIds = await fetchPendingJobsByACManagerId(userData._id);

      const rows = await Promise.all(
        verifiedJobsIds.map(async (jobId, index) => {
          //Fetch all details of job
          const jobDetails = await fetchJobDetailsById(jobId);
    
          // Fetch recruiter asynchronously
          const enterprise_member=await fetchEnterpriseMemberDetails(jobDetails?.enterprise_member_id)
    
          const basicjobDetails = await fetchJobBasicDetailsByJobId(jobDetails.job_id);
    
          return {
            orgid:jobDetails._id,
            _id: String(`${index + 1}`),
            job_title: basicjobDetails?.job_title || "No Title Available",
            job_id: jobDetails?.job_id || "No ID Available",
            enterprise_member:enterprise_member.full_name,
            location: {
              state: basicjobDetails?.state || 'Unknown State',
              country: basicjobDetails?.country || 'Unknown Country',
            },
            createdAt: jobDetails?.createdAt ? new Date(jobDetails.createdAt) : new Date(),
            job_status:jobDetails.job_status
          };
        })
      );

      setPendingJobs(rows)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong while fetching data",'failure')
    }finally{
      setLoading(false)
    }
   }

  useEffect(()=>{
     fetchData()
  },[])


  //All Things for job
  const getDate=(date)=>{
    let d=new Date(date)
    let d_ate=d.getDate()
    let d_month=d.getMonth()+1
    let d_year=d.getFullYear()
   
    return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
  }


  const [previewLoader,setPriviewLoader]=useState(false)
  const [openPreviewBox,setOpenPreviewBox]=useState(false)
  const [jobHotMark,setJobHotMark]=useState(false)

  const [jobBasicDetails,setJobBasicDetails]=useState(null)
  const [jobDescription,setJobDescription]=useState(null)
  const [jobCommissionDetails,setJobCommissionDetails]=useState(null)
  const [jobUpdates,setJobUpdates]=useState([])
  const [clientDescription,setClientDescription]=useState(null)
  const [sourcingGuidelines,setSourcingGuidelines]=useState(null)
  const [acManager,setAcManager]=useState(null)
  const [jobStatus,setJobStatus]=useState(null)
  const [screeningQuesions,setScreeningQue]=useState(null)
  const [currentJob,setCurrentJob]=useState(null)
  const [jobAttachments,setJobAttachments]=useState(null)


  const handleFetchJobDetails=async (jobid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
      if(res.data){
       setJobBasicDetails(res.data)
       setJobDescription(res.data.job_description)
      }
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
 }


const handleFetchJobStatus=async (jobid)=>{
  try{ 
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobstatusforpreview/${jobid}`)
     if(res.data) setJobStatus(res.data)
  }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
  }
}

const handleFetchClientDescription=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getcompanydetailsforpreview/${jobid}`)
     if(res.data) setClientDescription(res.data)
  }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
  }
}

const handleFetchJobUpdates=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobupdates/${jobid}`)
     if(res.data) setJobUpdates(res.data)
  }catch(err){
    console.log(err)
    showNotification('Something went wrong...!','failure')
  }
}

const handleFetchAcManager=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getacmanagerforpreview/${jobid}`)
     if(res.data) setAcManager(res.data)
  }catch(err){
    console.log(err)
    showNotification('Something went wrong...!','failure')
  }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
  try{
   const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
   if(res.data) setJobCommissionDetails(res.data)
  }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
  }
}


const handleFetchJobSourcingGuidelines=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getsourcingguidelinesforpreview/${jobid}`)
     if(res.data) setSourcingGuidelines(res.data)
  }catch(err){
    console.log(err)
    showNotification("Something went wrong...!",'failure')
  }
}

const handleFetchJobScreeningQuestions=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobscreeningquestions/${jobid}`)
     if(res.data) setScreeningQue(res.data)
   }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
   }
}

const handleFetchJobHotMark=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobhotmark/${jobid}`)
       setJobHotMark(res.data)
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
}

const handleFetchJobAttachments=async (jobid)=>{ 
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobattachmentsforpreview/${jobid}`)
     if(res.data) setJobAttachments(res.data)
  }catch(err){
    console.log(err)
    showNotification("Something went wrong...!",'failure')
  }
}



const getFirstLetterCapital=(val)=>{
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

//For view job attachments
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
       const fileUrl=`${process.env.REACT_APP_API_APP_URL}/job/viewjobattachments/${jobid}/${orgfilename}`
       window.open(fileUrl,'_blank')
     }else{
       showNotification("Unsupported file type.",'failure')
     }
  
  }catch(err){
    console.log(err)
    showNotification("Something went wrong while opening job attachments.")
  }
}

//For download job attachments
const downloadJobAttachments=async (jobid,filePath,fileName,filetype)=>{
  try{
     //Fetch which type of file we are gonna download 
     const fileExtenstion=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobattachmentfiletype/${jobid}/${filetype}`)
     const res=await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/downloadjobattachments`,{filePath,fileName},
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


//mapping of duration
const duration=new Map([
  ['weekly','Week'],
  ['monthly','Month']
])

const handleApproveJob = async () =>{
  if(resumeRequired && resumeRequired>0){
    try{
      if(currentJob){
       setApproveLoad(true)
      //1. change status of job
        await axios.put(`${process.env.REACT_APP_API_APP_URL}/job/activatejob/${currentJob.orgid}`)
      //2. pull job id from pending job list and add into verified jobs
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addjobverifylist`,{ac_id:userData._id,orgjobid:currentJob.orgid})
      }
      //3 update resume required number
       await axios.put(`${process.env.REACT_APP_API_APP_URL}/job/update-resumerequired/${currentJob.orgid}/${resumeRequired}`)

      //Process for closing popup box
      setOpenPreviewBox(false)
      setJobBasicDetails(null)
      setCurrentJob(null)
      setJobUpdates([])
      setJobCommissionDetails(null)
      setAcManager(null)
      setSourcingGuidelines(null)
      setJobStatus(null)
      setJobDescription(null)
      setClientDescription(null)
      setJobHotMark(false)
      setScreeningQue(null)
      setJobAttachments(null)

      setOpenJobDetails(true)
      setOpenJobDescription(false)
      setOpenClientDescription(false)
      setOpenSourcingGuidelines(false)
      setOpenSq(false)
      fetchData()
      setResumeRequired(0)
      showNotification("Successfully current job Approved",'success')
    }catch(err){
       console.log(err)
       showNotification("Something went wrong while approve job.",'failure')
    }finally {
      setApproveLoad(false)
    }
  }else{
    showNotification("Please enter number of resume required.",'failure')
  }
}



//For open close details
const [openJobDetails,setOpenJobDetails]=useState(true)
const [openJobDescription,setOpenJobDescription]=useState(false)
const [openClientDescription,setOpenClientDescription]=useState(false)
const [openSourcingGuidelines,setOpenSourcingGuidelines]=useState(false)
const [openSq,setOpenSq]=useState(false)
const [openJobAttachments,setOpenJobAttachments]=useState(false)

const handleOpenPreviewBox=async (jobObj)=>{
  setPriviewLoader(true)
  setOpenPreviewBox(true)
  setCurrentJob(jobObj)
  //For fetching job details
  await handleFetchJobDetails(jobObj.job_id)
  await handleFetchClientDescription(jobObj.job_id)
  await handleFetchJobSourcingGuidelines(jobObj.job_id)
  await handleFetchJobStatus(jobObj.job_id)
  await handleFetchAcManager(jobObj.job_id)
  await handleFetchJobUpdates(jobObj.job_id)
  await handleFetchJobScreeningQuestions(jobObj.job_id)
  await handleFetchJobCommissionDetails(jobObj.job_id)
  await handleFetchJobHotMark(jobObj.job_id)
  await handleFetchJobAttachments(jobObj.job_id)
  setPriviewLoader(false)
}

const handleClosePreviewBox=()=>{
  setOpenPreviewBox(false)
   setJobBasicDetails(null)
   setCurrentJob(null)
   setJobUpdates([])
   setJobCommissionDetails(null)
   setAcManager(null)
   setSourcingGuidelines(null)
   setJobStatus(null)
   setJobDescription(null)
   setClientDescription(null)
   setJobHotMark(false)
   setScreeningQue(null)
   setJobAttachments(null)

   setOpenJobDetails(true)
   setOpenJobDescription(false)
   setOpenClientDescription(false)
   setOpenSourcingGuidelines(false)
   setOpenSq(false)
}



  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
    {
      openPreviewBox && 
      <div className='fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div gap-0 p-0 w-[90%] overflow-hidden'>
              <div className='relative flex w-full p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200'>
                
                <div className='flex items-center justify-between'>
                 <div className='flex gap-2 items-center'>
                     <span onClick={handleClosePreviewBox} className='text-gray-500 cursor-pointer '><ArrowBackIosIcon style={{fontSize:'1.2rem', fontWeight:'bold'}}></ArrowBackIosIcon></span>
                     <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 items-end'>
                            {
                              jobHotMark && <img src={FIRE} className='w-6 h-6'></img>
                            }
                            <span className='text-md font-medium'>Job Id: {jobBasicDetails && jobBasicDetails.job_id}</span>
                            <h1 className='text-xl font-medium tracking-wide'>{jobBasicDetails && jobBasicDetails.job_title}</h1>
                        </div>
                        <div className='flex flex-col gap-1'>
                         <div className='flex gap-4 items-center'>
                            <div className='flex gap-1 items-center'>
                              <span className='font-light'>{jobCommissionDetails && jobCommissionDetails.work_type==="full_time"?"Total Commission: ":"Sourcing Fee: "}</span>
                              <h2>{jobCommissionDetails && 
                              ((jobCommissionDetails.work_type==="full_time")
                              ?((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Annual Salary`)
                              :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay} Of Annual Salary`))
                              :((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Contract Pay`)
                              :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.commission_details.commission_fix_pay} of Contract Pay`)))}</h2>
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
                                <span>Ac Manager:</span>
                                <span>{acManager?(acManager.full_name):("Not Available")}</span>
                            </div>
                         </div>
                        </div>
                     </div>
                 </div> 

                  <div className='flex items-center gap-4'>
                   <div className='flex flex-col gap-.5'>
                       <label htmlFor='resume'>Resume Required</label>
                       <input onChange={(e)=>setResumeRequired(e.target.value)} type='number' className='outline-none rounded-md p-1'></input>
                   </div>
                   <button disabled={approveLoad || resumeRequired<=0 || !resumeRequired} onClick={handleApproveJob} className='bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 mr-2 tracking-wide text-white p-2 rounded-md'>
                     Approve
                   </button>
                  </div>
                 </div>
                 
              </div>

              {
                   (previewLoader)?(
                      <div className='flex w-full h-[600px] items-center justify-center'>
                         <img src={WhiteLoader} className='w-10 h-10'></img>
                      </div>
                   ):(
                    
                    

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
                              <span className='text-sm w-32'>Payout Rate</span>
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
                                    <div className='py-3 px-2'>
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
                                <div className='py-3 px-2'>
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
                        {
                          screeningQuesions && (
                            <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                 <span className='text-blue-400'>Screening Questions</span>
                                 <span onClick={()=>setOpenSq(!openSq)} className='text-blue-400 cursor-pointer'>{openSq?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                               {
                                 openSq && (
                                  
                                    screeningQuesions.screening_questions.map((sq)=>(
                                     <div key={sq.id} className='p-2 flex flex-col gap-3'>
                                       <div className='flex flex-col gap-3'>
                                        <p className='font-light'>Q{sq.id}. {sq.question_title} {sq.madantory && <span className='text-sm text-red-400'>*</span>}</p>
                                        {
                                          sq.ans_type!=="short_text" &&
                                          <div className='flex font-light flex-col gap-1'>
                                            {
                                              sq.answer.option.map((opt)=>(
                                                <span>{opt}</span>
                                              ))
                                            }
                                          </div>

                                        }

                                        </div>  
                                      </div>

                                    ))
                                 )
                               }

                            </div>
                          )
                        }
                        
                   </div>
                </div>
              </div>
                      
                   )
              }
             
          </div>
      </div>
     }
      <Card className='mt-8 border p-2 font-sans'>
        <p className='text-lg xl:text-2xl'>New Jobs</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
          <DataGrid 
          rows={pendingJobs}
          columns={columns}
          rowHeight={80} 
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={(params)=>handleOpenPreviewBox(params.row)}
          pageSize={8} 
          loading={loading}
          disableSelectionOnClick 
           sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' }, 
            },
         
            ' [class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !impotant', 
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' }, 
              color: 'black', 
             
               '&:focus': {
              outline: 'none', 
              border: 'none',  
            },
              backgroundColor: '#e3e6ea !important', 
              minHeight: '60px', 
            },
             '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none', 
            },
            '& .MuiDataGrid-columnSeparator': {
               color: 'blue',
              visibility: 'visible', 
             },
            '& .MuiDataGrid-cellContent': {
               display: 'flex',
               alignItems: 'center', 
             },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem'}, 
              minHeight: '2.5rem', 
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
      </Card>

    </div>
  );
};

export default NewJobData;
