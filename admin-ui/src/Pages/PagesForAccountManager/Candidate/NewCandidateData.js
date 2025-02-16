import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { columns } from './RowColDataOfNew'; // Import columns configuration
import { fetchCandidateBasicDetailsById, fetchRecruiterMemberDetails, fetchJobMainDetails, fetchCandidateStatusById, fetchJobBasicDetailsByJobId, fetchPendingCandidatesByACManagerId } from '../../../services/api';

//import Constants file
import { cstatus } from '../../../constants/jobStatusMapping';
import HtmlContent from '../../../constants/HtmlContent'
import CopyToClipBoard from '../../../constants/CopyToClipBoard'

import WhiteLoader from '../../../assets/whiteloader.svg'

//importing icons
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { LoaderCircle } from 'lucide-react';


import Notification from '../../../Components/Notification';
import { store } from '../../../State/Store';
import axios from 'axios'


const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50; 
  return Math.max(80, contentHeight); 
};
const NewCandidateData = () => {
  const [newCandidateRows,setNewCandidateRows]=useState([])
  const [loading,setLoading]=useState(false)
  const [assignLoad,setAssignLoad]=useState(false)
  
  const getDate=(date)=>{
    let d=new Date(date)
    let d_ate=d.getDate()
    let d_month=d.getMonth()+1
    let d_year=d.getFullYear()
   
    return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
  }
  

 const selectUserData = (state) => state?.admin?.userData;
 const userData = selectUserData(store?.getState()); 

  const [notification, setNotification] = useState(null)

  //for showing notification
  const showNotification = (message, type) => {
   setNotification({ message, type })
 }

 const fetchData=async ()=>{
  setLoading(true)
 try{
  //Fetch candidate ids
  const verifiedCandiatesIds = await fetchPendingCandidatesByACManagerId(userData._id);

  const rows = await Promise.all(
    verifiedCandiatesIds.map(async (candidateId, index) => {

      const { job_id, basic_details } = await fetchCandidateBasicDetailsById(candidateId);
      const job_basic_details = await fetchJobBasicDetailsByJobId(job_id);
      const candidate = await fetchCandidateStatusById(basic_details.candidate_id)
      
      //fetch recruiter member details
      const recruiter_member=await fetchRecruiterMemberDetails(candidate.recruiter_member_id)

      const job=await fetchJobMainDetails(job_id)

      // Get candidate status, defaulting to "Status Unavailable" if not found
      const candidateStatusKey = candidate.candidate_status || "Status Unavailable";
      const candidateStatus = cstatus.get(candidateStatusKey) || candidateStatusKey; // Map status or use original

      return {
        orgjobid:job._id,
        orgcandidateid:candidate._id,
        candidate_id:basic_details.candidate_id,
        recruiter_member:recruiter_member.full_name,
        _id: String(index + 1),
        candidate_name: {
          first_name: basic_details?.first_name || 'No First Name',
          last_name: basic_details?.last_name || 'No Last Name',
        },
        job_title: job_basic_details?.job_title || "No Job Title",
        job_id: job_basic_details?.job_id || "No Job Id",
        candidate_status: candidateStatus,
        submitted: basic_details?.createdAt || "No Submission Date",
        lastUpdated: basic_details?.updatedAt || "No Update Date",
        notice_period: basic_details?.notice_period || "N/A",
        email: basic_details?.primary_email_id || "No Email",
        mobile: basic_details?.primary_contact_number || "No Contact Number"
      };
    })
  );

  setNewCandidateRows(rows)

 }catch(err){
    console.log(err)
    showNotification("Something went wrong while fetching data.",'failure')
 }finally{
   setLoading(false)
 }
}

  useEffect(()=>{
     fetchData()
  },[])


//For candidate information preview
  
const [fileName,setFileName]=useState(null)
const [currentTab,setCurrentTab]=useState('candidate')
const [openProfilePopup,setOpenProfilePopUp]=useState(false)

//For candidate
const [currentJobId,setCurrentJobId]=useState(null)
const [currentCandidateId,setCurrentCandidateId]=useState(null)
const [openCandidatePopUpLoader,setOpenCandidatePopUpLoader]=useState(false)
const [candidateBasicDetails,setCandidateBasicDetails]=useState(null)
const [candidateAttachments,setCandidateAttachments]=useState(null)
const [candidateStatus,setCandidateStatus]=useState(null)
const [candidateSQ,setCandidateSQ]=useState(null)
const [acManagerName,setAcManagerName]=useState(null)
const [jobBasicDetails,setJobBasicDetails]=useState(null)

//For Job
const [jobUpdates,setJobUpdates]=useState([])
const [jobDetails,setJobDetails]=useState(null)
const [jobDescription,setJobDescription]=useState(null)
const [clientDescription,setClientDescription]=useState(null)
const [sourcingGuidelines,setSourcingGuidelines]=useState(null)
const [jobStatus,setJobStatus]=useState(null)
const [jobCommissionDetails,setJobCommissionDetails]=useState(null)


//open-close candidate states
const [openCandidateDetails,setOpenCandidateDetails]=useState(true)
const [openCandidateAttachment,setOpenCandidateAttachment]=useState(false)
const [openCandidateSQ,setOpenCandidateSQ]=useState(false)

//open-close job states
const [openJobDetails,setOpenJobDetails]=useState(true)
const [openJobDescription,setOpenJobDescription]=useState(false)
const [openClientDescription,setOpenClientDescription]=useState(false)
const [openSourcingGuidelines,setOpenSourcingGuidelines]=useState(false)


const handleSetFileName=async (cid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/candidate/getresumefilename/${cid}`)
      if(res.data) setFileName(res.data)
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
}

const handleFetchCandidateDetails=async (cid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/candidate/getcandidatealldetails/${cid}`)
      if(res.data){
        if(res.data.candidateBasicDetails) setCandidateBasicDetails(res.data.candidateBasicDetails)
        if(res.data.candidateAttachments) setCandidateAttachments(res.data.candidateAttachments)
        if(res.data.candidateSQ) setCandidateSQ(res.data.candidateSQ)
        if(res.data.candidateStatus) setCandidateStatus(res.data.candidateStatus)
      }
    }catch(err){
       console.log(err)
       showNotification('Something went wrong...!','failure')
    }
}


const viewCandidateAttachments=async (cid,fileName)=>{
  try{
    const fileUrl=`${process.env.REACT_APP_API_APP_URL}/candidate/viewcandidateattachments/${cid}/${fileName}`
    window.open(fileUrl,'_blank')
  }catch(err){
    console.log(err)
    showNotification("Something went wrong while opening candidate attachments",'failure')
  }
}


const downloadCandidateAttachments=async (cid,filePath,fileName,filetype)=>{
  try{
    //Fetch which type of resume file get
    const fileExtension=await axios.get(`${process.env.REACT_APP_API_APP_URL}/candidate/getcandidateattachmentfiletype/${cid}/${filetype}`)
    const res=await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/downloadcandidateattachments`,{filePath,fileName},{
       responseType:'blob'
    })

    let fileType=[ 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if(res.status===200 && fileType.includes(fileExtension.data)){
        const blob = new Blob([res.data], { type: fileExtension.data });
        const url=window.URL.createObjectURL(blob)
        const link=document.createElement('a')
        link.href=url
        link.setAttribute('download','candidateattachments')
        document.body.appendChild(link)
        link.click()
        link.remove()
    }else if(res.status===400){
       showNotification("File not found..!",'failure')
    }else{
       showNotification("File download failed",'failure')
    }

  }catch(err){
    console.log(err)
    showNotification("Something went wrong while downloading candidate attachments",'failure')
  }
}


const handleFetchCandidateJobBasicDetails=async (cid)=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/candidate/getjobbasicdetails/${cid}`)
       if(res.data) setJobBasicDetails(res.data)
     }catch(err){
       console.log(err)
       showNotification("Something went wrong....!",'failure')
     }
}

const handleFetchAcmanagerName=async (cid)=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/candidate/getacmanagername/${cid}`)
       if(res.data) setAcManagerName(res.data)
     }catch(err){
       console.log(err)
       showNotification("Something went wrong....!",'failure')
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

const handleFetchJobDetails=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
     if(res.data) setJobDetails(res.data)
     if(res.data.job_description) setJobDescription(res.data.job_description)
   }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
   }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
       console.log(res.data)
       if(res.data) setJobCommissionDetails(res.data)
    }catch(err){
       console.log(err)
       showNotification('Something went wrong...!','failure')
    }
}

const handleFetchJobCompanyInfo=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getcompanydetailsforpreview/${jobid}`)
       if(res.data) setClientDescription(res.data)
    }catch(err){
       console.log(err)
       showNotification('Something went wrong...!','failure')
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

const handleFetchSourcingGuidelines=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_APP_URL}/job/getsourcingguidelinesforpreview/${jobid}`)
     if(res.data) setSourcingGuidelines(res.data)
   }catch(err){
      console.log(err)
      showNotification('Something went wrong...!','failure')
   }
}

const handleOpenPopUpBox=async (orgcid,orgjobid,cid,jobid)=>{
    setOpenCandidatePopUpLoader(true)
    setOpenProfilePopUp(true)
    setCurrentCandidateId(orgcid)
    setCurrentJobId(orgjobid)
    //For candidate
    await handleSetFileName(cid)
    await handleFetchCandidateDetails(cid)
    await handleFetchCandidateJobBasicDetails(cid)
    await handleFetchAcmanagerName(cid)
    //For job details
    await handleFetchJobUpdates(jobid)
    await handleFetchJobDetails(jobid)
    await handleFetchJobCompanyInfo(jobid)
    await handleFetchSourcingGuidelines(jobid)
    await handleFetchJobStatus(jobid)
    await handleFetchJobCommissionDetails(jobid)
    setOpenCandidatePopUpLoader(false)
}


const handleClosePopUpBox= ()=>{
     setCurrentCandidateId(null)
     setOpenProfilePopUp(false)
     setFileName(null)
     setCandidateBasicDetails(null)
     setCandidateAttachments(null)
     setCandidateSQ(null)
     setCandidateStatus(null)
     setAcManagerName(null)
     setJobBasicDetails(null)

     setJobDetails(null)
     setJobDescription(null)
     setClientDescription(null)
     setSourcingGuidelines(null)

     setOpenCandidateDetails(true)
     setOpenCandidateAttachment(false)
     setOpenCandidateSQ(false)

     setCurrentTab('candidate')
     setOpenJobDetails(true)
     setOpenJobDescription(false)
     setOpenClientDescription(false)
     setOpenSourcingGuidelines(false)
}

const handleApprove=async ()=>{
  if(currentCandidateId && currentJobId){
    setAssignLoad(true)
    try{
       //change candidate status
       await axios.put(`${process.env.REACT_APP_API_APP_URL}/candidate/approvecandidate/${currentCandidateId}`)
       //verify candidate into account manager 
       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/accountmanager/addcandidateintoverifiedlist/${userData._id}`,{orgcid:currentCandidateId})
       //Add candidate into recruiter member posted list
       await axios.post(`${process.env.REACT_APP_API_APP_URL}/candidate/add-candidate-reteam`,{cid:currentCandidateId,jobid:currentJobId})
       //Add Candidate into enterprise member posted list
       await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/add-candidate-enmember`,{cid:currentCandidateId,jobid:currentJobId})
       //Add Candidate profile into job posted candidate profile list
       await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/addcandidateprofilelist/${currentJobId}`,{orgcid:currentCandidateId})
       handleClosePopUpBox()
       await fetchData()
       showNotification("Successfully Candidate profile approved.",'success')
    }catch(err){
       console.log(err)
       showNotification("Something went wrong while approve candidate.",'failure')
    }finally{
      setAssignLoad(false)
    }
  }
}
  
  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
    {
      openProfilePopup &&(
          <div className='fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div overflow-hidden p-0 w-[90%]'>
          <div className='flex w-[100%] p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200'>
            <div className='flex justify-between items-start'>
             <div className='flex gap-1 items-center'>
                <span onClick={handleClosePopUpBox} className='cursor-pointer'><ChevronLeftIcon style={{fontSize:"1.6rem"}}></ChevronLeftIcon></span>
                <div className='flex flex-col gap-1'>
                  <span className='flex gap-2 items-center'><h2 className='text-xl'>{candidateBasicDetails && `${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`}</h2><small className='text-gray-400 font-medium text-[16px]'>{candidateBasicDetails && candidateBasicDetails.candidate_id}</small></span>
                  <span><span className='text-gray-500'>{jobBasicDetails && jobBasicDetails.job_title} - {jobBasicDetails && jobBasicDetails.job_id}</span> <span>{jobBasicDetails && jobBasicDetails.country}</span></span>
                </div>
             </div>
             <div className='flex flex-col gap-2'>
               <div className='flex gap-2 items-center'>
                 <span className='flex items-center gap-1'><small className='text-gray-500'>Ac Manager</small>{acManagerName && acManagerName.full_name}</span>
                 <span className='p-1 px-2 bg-white text-[15px] rounded-md'>{candidateStatus && cstatus.get(candidateStatus)}</span>
               </div>
               <button disabled={assignLoad} onClick={handleApprove} className='p-2 bg-blue-500  hover:bg-blue-600 text-white flex justify-center items-center tracking-wide'>
                {
                  assignLoad ? 
                  <div className='flex items-center gap-2'>
                     <span><LoaderCircle className='animate-spin'></LoaderCircle></span>
                     <span>Loading...</span>
                  </div>
                  :
                  <span>Approve</span>
                }
               </button>
             </div>
             </div>
             <div className='flex gap-6 px-4'>
                <div onClick={()=>setCurrentTab('candidate')} className={`cursor-pointer ${currentTab==='candidate'?("text-blue-400"):("text-gray-500")} hover:text-blue-400`}>
                   Candidate
                   {currentTab==="candidate" &&  <hr className='bg-blue-400 h-1'></hr>}
                </div>
                <div onClick={()=>setCurrentTab('job')} className={`text-gray-500 ${currentTab==='candidate'?("text-blue-400"):("text-gray-500")} cursor-pointer hover:text-blue-400`}>
                  Job
                  {currentTab==="job" && <hr className='bg-blue-400 h-1'></hr>}
                </div>
             </div>
          </div>


          {currentTab==="candidate" && (
             openCandidatePopUpLoader?(
                <div className='flex w-full justify-center h-[600px] items-center'>
                    <img src={WhiteLoader} className='w-10 h-10'></img>
                </div>
             ):(
           <div className='bg-white w-full flex gap-3 p-2'>
              <div className='flex-1 custom-div p-2'>
                {
                  fileName &&  <iframe title='attachments' src={`${process.env.REACT_APP_APP_URL}/resumedocs/${fileName}`} className='rounded-md h-[600px] w-full'></iframe>
                }
              </div>
              <div className='flex-1 custom-div p-0 overflow-hidden flex-col gap-2'>
                 <div className='w-full h-[600px] overflow-scroll '>
                 {
                 candidateBasicDetails && 
                   <div>
                      <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                          <span className='text-blue-400'>Details</span>
                          <span onClick={()=>setOpenCandidateDetails(!openCandidateDetails)} className='text-blue-400 cursor-pointer'>{openCandidateDetails?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                      </div>
                      {
                        openCandidateDetails && 
                        <div className='flex bg-white items-center px-3 py-4'>
                         <div className='flex flex-col gap-2'>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Candidate Name</span>
                               <span className='text-[14px] w-52 font-semibold'>{`${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Candiadte Email</span>
                               <span className='text-[14px] w-52 font-semibold text-blue-400'>{candidateBasicDetails.primary_email_id}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                                <span className='text-sm w-32'>Candidate Phone</span>
                                <span className='text-[14px] w-52 font-semibold text-blue-400'>{`+${candidateBasicDetails.primary_contact_number}`}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Submited</span>
                               <span  className='text-[14px] w-52 font-semibold'>{getDate(candidateBasicDetails.createdAt)}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Total Experience</span>
                               <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.experience} Years</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Relevant Experience</span>
                               <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.relevant_experience} Years</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Current Company</span>
                               <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.current_company}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Current Designation</span>
                               <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.current_designation}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Current Location</span>
                               <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.current_location}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Notice Period</span>
                              <span className='text-[14px] w-52 font-semibold'>{candidateBasicDetails.notice_period} Days</span>
                             </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Current Annual Salary</span>
                               <span className='text-[14px] w-32 font-semibold'>{candidateBasicDetails.current_annual_salary}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Expected Annual Salary</span>
                               <span className='text-[14px] w-32 font-semibold'>{candidateBasicDetails.expected_annual_salary}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Country</span>
                              <span className='text-[14px] w-32 font-semibold'>{candidateBasicDetails.country}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Qualification</span>
                              <span className='text-[14px] w-32 font-semibold'>{candidateBasicDetails.education_qualification}</span>
                            </div>
                         </div>
                       </div>
                      }
                     </div>
                     }
                    {
                      candidateAttachments && 
                      <div>
                        <div className='flex border-b bg-slate-100 p-2 justify-between items-center'>
                           <span className='text-blue-400'>Attachments</span>
                           <span onClick={()=>setOpenCandidateAttachment(!openCandidateAttachment)} className='text-blue-400 cursor-pointer'>{openCandidateAttachment?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                        </div>
                        {
                          openCandidateAttachment && 
                          <div className='flex flex-col gap-1'>
                           {
                            candidateAttachments.evaluation_form &&
                            <div className='flex border-b justify-between p-2 items-center'>
                             <div className='flex gap-2 items-center'>
                               <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                               <span className='text-sm'>{candidateAttachments.evaluation_form.filename}</span>
                             </div>
                             <div className='flex gap-2 items-center'>
                               <span onClick={()=>viewCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.evaluation_form.filename)} className='text-blue-400 cursor-pointer'><DescriptionIcon></DescriptionIcon></span>
                               <span onClick={()=>downloadCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.evaluation_form.filepath,candidateAttachments.evaluation_form.filename,'evaluation_form')} className='text-blue-400 cursor-pointer'><ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon></span>  
                             </div>
                           </div>                        
                           }
                           {
                            candidateAttachments.audio_brief && 
                            <div className='flex border-b justify-between p-2 items-center'>
                             <div className='flex gap-2 items-center'>
                               <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                               <span className='text-sm'>{candidateAttachments.audio_brief.filename}</span>
                             </div>
                             <div className='flex gap-2 items-center'>
                               <span onClick={()=>viewCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.audio_brief.filename)} className='text-blue-400 cursor-pointer'><DescriptionIcon></DescriptionIcon></span>
                               <span onClick={()=>downloadCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.audio_brief.filepath,candidateAttachments.audio_brief.filename,'audio_brief')} className='text-blue-400 cursor-pointer'><ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon></span>  
                             </div>  
                           </div>  
                           }
                           {
                            candidateAttachments.other_docs && 
                            <div className='flex border-b justify-between p-2 items-center'>
                             <div className='flex gap-2 items-center'>
                               <span className='h-9 w-9 text-blue-400 flex justify-center rounded-full items-center bg-blue-100'><InsertDriveFileOutlinedIcon style={{fontSize:'1.2rem'}}></InsertDriveFileOutlinedIcon></span>
                               <span className='text-sm'>{candidateAttachments.other_docs.filename}</span>
                             </div>
                             <div className='flex gap-2 items-center'>
                               <span onClick={()=>viewCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.other_docs.filename)} className='text-blue-400 cursor-pointer'><DescriptionIcon></DescriptionIcon></span>
                               <span onClick={()=>downloadCandidateAttachments(candidateAttachments.folder_name,candidateAttachments.other_docs.filepath,candidateAttachments.other_docs.filename,'other_docs')} className='text-blue-400 cursor-pointer'><ArrowCircleDownOutlinedIcon></ArrowCircleDownOutlinedIcon></span>  
                             </div>  
                           </div>  
                           }
                           
                        </div>
                        }
                       
                      </div>
                    }
                    {
                      candidateSQ && 
                      <div>
                        <div className='flex border-b bg-slate-100 p-2 justify-between items-center'>
                           <span className='text-blue-400'>Screening Questions</span>
                           <span onClick={()=>setOpenCandidateSQ(!openCandidateSQ)} className='text-blue-400 cursor-pointer'>{openCandidateSQ?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                        </div>
                        {
                          openCandidateSQ && 
                          (
                            <div className='flex flex-col border-b'>
                             {
                              candidateSQ.screening_questions.map((que,index)=>{
                                 return (
                                   <div key={index} className='flex p-2 flex-col'>
                                    <span className='text-[15px]'>Q{que.id}. {que.question_title}?</span>
                                    <div className='flex gap-2'>
                                      <span><ArrowRightAltOutlinedIcon style={{fontSize:'1.2rem'}}></ArrowRightAltOutlinedIcon></span>
                                      <p className='text-gray-500 text-[15px]'>{candidateSQ.screening_answer[index].answer}</p> 
                                    </div>
                                    
                                   </div>
                                 )
                              })
                             }
                            </div>
                          )
                        }
                      </div>
                      
                    }
                 </div>
                 
              </div>
          </div>

             )
          )
          }
          {
            currentTab==="job" && 
            (
                  <div className='bg-white w-full flex gap-3 p-2'>
                     <div className='custom-div gap-0 h-[600px] p-0 flex-1'>
                        <div className='border w-full p-2'>
                          <span className='text-blue-400'>Job Updates</span>
                        </div>
                       
                        <div className='bg-white-600 flex flex-col gap-3 py-4 px-2 w-full h-[558px] overflow-scroll'>
                        {
                          jobUpdates.length===0?(
                             <span className='w-full p-2 bg-slate-100 border'>There is no Job Updates</span>
                          ):(

                            jobUpdates.map((obj,index)=>(
                            <div key={index} className='bg-white w-[70%] border-gray-300 border p-2 rounded-md'>
                                <HtmlContent htmlString={obj.text}></HtmlContent>
                             </div>
                          ))
                             
                          )
                        }
                        </div>
                     </div>
                     <div className='flex-1 custom-div p-0 overflow-hidden flex-col gap-2'>
                       <div className='w-full overflow-scroll h-[600px]'>
                        {
                        jobDetails && 
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
                                 <span className='text-[14px] w-52 font-semibold'>{jobDetails.job_title}</span>
                               </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Domain</span>
                               <span className='text-[14px] w-52 font-semibold text-blue-400'>{jobDetails.job_domain}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                                <span className='text-sm w-32'>Posted At</span>
                                <span className='text-[14px] w-52 font-semibold'>{getDate(jobDetails.createdAt)}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Location</span>
                               <span  className='text-[14px] w-52 font-semibold'>{jobDetails.country}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Status</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobStatus}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Salary</span>
                               <span className='text-[14px] w-52 font-semibold'>
                                 {jobCommissionDetails.work_type==="full_time"?
                                 (jobCommissionDetails.work_details.full_time.full_time_salary_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.fixed_salary}`)
                                   :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.min_salary} - ${jobCommissionDetails.work_details.full_time.max_salary}`))
                                   :(jobCommissionDetails.work_details.contract.contract_pay_rate_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.fix_contract_pay}`)
                                   :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.min_contract_pay} - ${jobCommissionDetails.work_details.contract.max_contract_pay}`))}
                                </span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Payment Terms</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails.commission_details.payment_tearms} Days</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Job Positions</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobDetails.positions}</span>
                             </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Experience</span>
                               <span className='text-[14px] w-52 font-semibold'>{`${jobDetails.experience.minexp} - ${jobDetails.experience.maxexp} Years`}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Replacement Terms</span>
                              <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails.commission_details.replacement_clause} Days</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>SP Payout</span>
                              <span className='text-[14px] w-52 font-semibold'>
                               {jobCommissionDetails.commission_details.commission_type==="Percentage"
                               ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}%`)
                               :(jobCommissionDetails.work_type==="full_time"?
                               (`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`)
                               :(`${jobCommissionDetails.work_details.contract.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`))}
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
                        </div>
                     </div>
                  </div>
               )
          }
          
        </div>
     </div>
        
      )
     }
      <Card className='mt-8 p-2 border font-sans'>
        <p className='text-lg xl:text-2xl'>New Candidates</p>
        <div style={{ height: 600, width: '100%' }} className='pt-4'>
         
          <DataGrid 
          rows={newCandidateRows}
          columns={columns}
          rowHeight={80} 
          loading={loading}
          onRowClick={(params) => handleOpenPopUpBox(params.row.orgcandidateid,params.row.orgjobid,params.row.candidate_id,params.row.job_id)}
          getRowId={(row) => row._id} // Specify the custom ID field
          getRowHeight={calculateRowHeight} 
          pageSize={8}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }} 
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
      </Card>

    </div>
  );
};

export default NewCandidateData;
