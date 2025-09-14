import React, {useState } from 'react'
//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';

//import candidate status mapping
import { cstatus, statusStyle } from '../statuschange/StatusMapping';
import HtmlContent from '../HtmlContent';
import CopyToClipBoard from '../CopyToClipBoard';

//importing loader
import WhiteLoader from '../../assets/whiteloader.svg'

//importing icons
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function RecruiterCandidateDataShow({showNotification,loader,rows,refetchCandidateData}) {
//  const [candidateStatusLoader,setCandidateStatusLoader]=useState(false)
 const [remarksLoader,setRemarksLoader]=useState(false)
 const [selectedCandidate,setSelectedCandidate] = useState(null)
 const [remarks, setRemarks] = useState('');
 const [openRemarksForm,setOpenRemarksForm] = useState(false)

 // Edit candidate popup states
 const [openEditPopup, setOpenEditPopup] = useState(false)
 const [editLoader, setEditLoader] = useState(false)
 const [editFormData, setEditFormData] = useState({
   first_name: '',
   last_name: '',
   country: '',
   current_location: '',
   primary_email_id: '',
   primary_contact_number: '',
   current_company: '',
   experience: '',
   current_annual_salary: '',
   expected_annual_salary: '',
   notice_period: '',
   education_qualification: '',
   candidate_toc: true
 })
 const [editResumeFile, setEditResumeFile] = useState(null)
 const [editResumeFileName, setEditResumeFileName] = useState('')

 const handleOpenRemarks = (candidateId,remarks) =>{
      setSelectedCandidate(candidateId)
      setRemarks(remarks)
      setOpenRemarksForm(true)
 }

 const handleCloseRemarks = () =>{
     setSelectedCandidate(null)
     setRemarks('')
     setOpenRemarksForm(false)
 }

 // Edit candidate popup handlers
 const handleOpenEditPopup = async (params) => {
   try {
     setEditLoader(true)
     setOpenEditPopup(true)
     
     // Fetch candidate details
     const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidatealldetails/${params.row.candidate_id}`)
     
     if (res.data && res.data.candidateBasicDetails) {
       const details = res.data.candidateBasicDetails
       setEditFormData({
         first_name: details.first_name || '',
         last_name: details.last_name || '',
         country: details.country || '',
         current_location: details.current_location || '',
         primary_email_id: details.primary_email_id || '',
         primary_contact_number: details.primary_contact_number || '',
         current_company: details.current_company || '',
         experience: details.experience || '',
         current_annual_salary: details.current_annual_salary || '',
         expected_annual_salary: details.expected_annual_salary || '',
         notice_period: details.notice_period || '',
         education_qualification: details.education_qualification || '',
         candidate_toc: details.candidate_toc || true
       })
     }
    
     
     setSelectedCandidate(params.row.candidate_id)
   } catch (err) {
     console.log(err)
     showNotification("Something went wrong while fetching candidate details.", "failure")
   } finally {
     setEditLoader(false)
   }
 }

 const handleCloseEditPopup = () => {
   setOpenEditPopup(false)
   setEditFormData({
     first_name: '',
     last_name: '',
     country: '',
     current_location: '',
     primary_email_id: '',
     primary_contact_number: '',
     current_company: '',
     experience: '',
     current_annual_salary: '',
     expected_annual_salary: '',
     notice_period: '',
     education_qualification: '',
     candidate_toc: true
   })
   setEditResumeFile(null)
   setEditResumeFileName('')
   setSelectedCandidate(null)
 }

 const handleEditFormChange = (e) => {
   const { name, value } = e.target
   setEditFormData(prev => ({
     ...prev,
     [name]: value
   }))
 }

 const handleResumeFileChange = (e) => {
   const file = e.target.files[0]
   if (file) {
     setEditResumeFile(file)
     setEditResumeFileName(file.name)
   }
 }

 const handleRemoveResume = () => {
   setEditResumeFileName('')
   setEditResumeFile(null)
 }

 const handleUpdateCandidate = async () => {
   try {
     setEditLoader(true)

     let formData = new FormData()

     if(editResumeFile) formData.append('resume',editResumeFile)

     for (let i in editFormData){
       formData.append(i, editFormData[i])
     }

     const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/candidate/${selectedCandidate}`, formData,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
     })
     
     await refetchCandidateData()
     handleCloseEditPopup()
     showNotification("Candidate details updated successfully.", "success")
   } catch (err) {
     console.log(err)
     showNotification("Something went wrong while updating candidate details.", "failure")
   } finally {
     setEditLoader(false)
   }
 }

const getDate=(date)=>{
  let d=new Date(date)
  let d_ate=d.getDate()
  let d_month=d.getMonth()+1
  let d_year=d.getFullYear()
 
  return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
}

  const getDays = (date) => {
    const today = new Date()
    const past = new Date(date)

    const timeDifference = today.getTime() - past.getTime()

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    return days
  }


  const viewCandidateResume = async (cid) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getresumefilename/${cid}`)
      const correctUrl = `${process.env.REACT_APP_BASE_URL}/resumedocs/${res.data}`;
      if (res.data) {
        window.open(correctUrl, '_blank')
      }
    } catch (err) {
      console.log(err)
      showNotification("Something went wrong while opening resume doc.", "failure")
    }
  }


const downloadCandidateResume=async (cid)=>{
    try{
       //Fetch which type of resume file get
       const fileExtension=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/resumefilepath/${cid}`)
       //Fetch download resume file
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/downloadresumedocs/${cid}`,{
        responseType: 'blob',  // Expect a blob in response
       })

      // Set the MIME type based on the file extension
      let mimeType;
      switch (fileExtension.data) {
        case '.pdf':
          mimeType = 'application/pdf';
          break;
        case '.doc':
          mimeType = 'application/msword';
          break;
        case '.docx':
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        default:
          showNotification("File is not supported for download.", "failure")
          console.error('Unsupported file type');
          return;
      }

      if (res.status === 200) {
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'candidateresume')
        document.body.appendChild(link)
        link.click()
        link.remove()
      } else {
        showNotification("File download failed.", "failure")
      }
    } catch (err) {
      console.log(err)
      showNotification("Something went wrong while downloading candidate documents.", "failure")
    }
  }


  const updateCandidateRemarks = async () => {
    try {
      setRemarksLoader(true)
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/updatecandidateremarks/${selectedCandidate}`, { remarks })
      await refetchCandidateData()
      handleCloseRemarks()
      showNotification("Successfully candidate remarks changed.",'success')
    } catch (err) {
      setRemarksLoader(false)
      console.log(err)
      showNotification("Something went wrong while updating Remarks.", "failure")
    } finally{
      setRemarksLoader(false)
    }
  }



//column for candidate data
const candidateCol=[
  { field: 'srno', headerName: 'Sr No.',headerClassName:'super-app-theme--header', width: 70, },
  {
      field:"name&id",headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:250, 
      renderCell:(params)=>{
        return (
          <div className="flex items-center gap-6">
              <div onClick={()=>handleOpenPopUpBox(params.row.candidate_id,params.row.job_id)} className="flex cursor-pointer flex-col gap-1">
                  <p className='text-sm text-blue-400'>{params.row.candidate_full_name}</p>
                  <span className='text-sm text-blue-400'>{params.row.candidate_id}</span>
              </div>
              <div className="flex gap-2">
                  <span onClick={()=>viewCandidateResume(params.row.candidate_id)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.3rem'}}/></span>
                  <span onClick={()=>downloadCandidateResume(params.row.candidate_id)} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.3rem'}}/></span>
              </div>
           </div>
        )
      }
  },
  {
      field: "jobid&title", headerName: 'Job id/Name', headerClassName: 'super-app-theme--header', width: 250,
      renderCell: (params) => {
        return (
          <div className='flex w-full h-full items-center'>
            <div className='flex gap-2 items-center'>
              <span className={`${(params.row.job_status === "Active") ? ("text-green-800 bg-green-200") : ("text-red-800 bg-red-400")} h-6 w-6 rounded-md border text-sm flex justify-center items-center`}>{(params.row.job_status === "Active") ? ("A") : ("N")}</span>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>{params.row.job_id} - {params.row.job_title}</span>
                <span className='text-sm'>{params.row.job_country} - {params.row.job_city}</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      field: "cstatus", headerName: "Candidate Status", headerClassName: 'super-app-theme--header', width: 280,
      renderCell: (params) => {
        return (
          <div className='w-full h-full flex justify-center items-center '>
            <span className={`p-1.5 min-w-60 text-center leading-5 border ${statusStyle.get(params.row.candidate_status)}  rounded-md`}>{cstatus.get(params.row.candidate_status)}</span>
          </div>
        )
      }
    },
    {
      field: 'submited', headerName: "Submitted", headerClassName: 'super-app-theme--header', width: 160,
      renderCell: (params) => {
        return (
          <div className="flex mt-5 h-full flex-col gap-1">
            <span className="text-md leading-5">{getDate(params.row.submited)}</span>
            <span className="text-sm text-gray-400">({getDays(params.row.submited)} days ago)</span>
          </div>
        )
      }
    },
    {
      field: "notice_period", headerName: "Notice Period", headerClassName: 'super-app-theme--header', width: 170,
      renderCell: (params) => {
        return (
          <div className='flex mt-7'>
            <span className='text-md leading-5'>{params.row.notice_period} Days</span>
          </div>
        )
      }
    },
    {
      field: 'email&mobile', headerName: "Email/Mobile", headerClassName: 'super-app-theme--header', width: 280,
      renderCell: (params) => {
        return (
          <div className='flex w-full h-full items-center'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>{params.row.candidate_email_address}</span>
              <span className='text-sm'>+{params.row.candidate_mobile_number}</span>
            </div>
          </div>
        )
      }
    },
    {
      field: "updated", headerName: "Last Updated", headerClassName: 'super-app-theme--header', width: 160,
      renderCell: (params) => {
        return (
          <div className="flex mt-5 h-full flex-col gap-1">
            <span className="text-md leading-5">{getDate(params.row.updated)}</span>
            <span className="text-sm text-gray-400">({getDays(params.row.updated)} days ago)</span>
          </div>
        )
      }
    }, 
    {
      field: 'remarks', headerName: 'Remarks', headerClassName: 'super-app-theme--header', width: 200,
      renderCell: (params) => {
        const currentRemark = params.row.remarks;
      
        return (
          <div className='w-full h-full flex gap-1.5 justify-center items-center'>
            <div className='flex px-1 items-center border overflow-hidden w-40 rounded-md gap-1'>
            <span className='h-10 p-2 w-36  overflow-hidden leading-5 rounded-md'>{currentRemark}</span>
            <button onClick={()=>handleOpenRemarks(params.row.id,currentRemark)} className='cursor-pointer rounded-md px-2 bg-gray-200 h-8 flex justify-center items-center'>
              <DriveFileRenameOutlineIcon className='text-black' style={{fontSize:'1.1rem'}}></DriveFileRenameOutlineIcon>
            </button>
            </div>
          </div>
          );
        },
      
    },
    {
      field:'action',headerName:'Action',headerClassName:'super-app-theme--header',width:100,
      renderCell:(params)=>{
        return (
          <div className='w-full h-full flex justify-center items-center'>
            <button onClick={() => handleOpenEditPopup(params)} className='text-white leading-5 p-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 transition-colors'><EditIcon style={{fontSize:'1.2rem'}}></EditIcon></button>
          </div>
        )
      }
    }
  ]



const [fileName,setFileName]=useState(null)
const [currentTab,setCurrentTab]=useState('candidate')
const [openProfilePopup,setOpenProfilePopUp]=useState(false)

//For candidate
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
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getresumefilename/${cid}`)
      if(res.data) setFileName(res.data)
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
}

const handleFetchCandidateDetails=async (cid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidatealldetails/${cid}`)
      
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
    const fileUrl=`${process.env.REACT_APP_API_BASE_URL}/candidate/viewcandidateattachments/${cid}/${fileName}`
    window.open(fileUrl,'_blank')
  }catch(err){
    console.log(err)
    showNotification("Something went wrong while opening candidate attachments",'failure')
  }
}


const downloadCandidateAttachments=async (cid,filePath,fileName,filetype)=>{
  try{
    //Fetch which type of resume file get
    const fileExtension=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getcandidateattachmentfiletype/${cid}/${filetype}`)
    const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/downloadcandidateattachments`,{filePath,fileName},{
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
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getjobbasicdetails/${cid}`)
       if(res.data) setJobBasicDetails(res.data)
     }catch(err){
       console.log(err)
       showNotification("Something went wrong....!",'failure')
     }
}

const handleFetchAcmanagerName=async (cid)=>{
     try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getacmanagername/${cid}`)
       if(res.data) setAcManagerName(res.data)
     }catch(err){
       console.log(err)
       showNotification("Something went wrong....!",'failure')
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

const handleFetchJobDetails=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
     if(res.data) setJobDetails(res.data)
     if(res.data.job_description) setJobDescription(res.data.job_description)
   }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
   }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
       console.log(res.data)
       if(res.data) setJobCommissionDetails(res.data)
    }catch(err){
       console.log(err)
       showNotification('Something went wrong...!','failure')
    }
}

const handleFetchJobCompanyInfo=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getcompanydetailsforpreview/${jobid}`)
       if(res.data) setClientDescription(res.data)
    }catch(err){
       console.log(err)
       showNotification('Something went wrong...!','failure')
    }
}

const handleFetchJobStatus=async (jobid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobstatusforpreview/${jobid}`)
      if(res.data) setJobStatus(res.data)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong...!",'failure')
    }
}

const handleFetchSourcingGuidelines=async (jobid)=>{
   try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getsourcingguidelinesforpreview/${jobid}`)
     if(res.data) setSourcingGuidelines(res.data)
   }catch(err){
      console.log(err)
      showNotification('Something went wrong...!','failure')
   }
}

const handleOpenPopUpBox=async (cid,jobid)=>{
    setOpenCandidatePopUpLoader(true)
    setOpenProfilePopUp(true)
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


const handleClosePopUpBox=async ()=>{
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
  
  return (
   <div className='custom-div'>

     {remarksLoader && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
         <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update candidate remarks.</p>
         </div>
       </div>
     }
     {
      openRemarksForm && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div bg-[#F1F5F9] overflow-hidden p-0 w-96'>
            <div className='flex w-full p-2 bg-white items-center gap-2'>
               <span className='cursor-pointer' onClick={handleCloseRemarks}><ChevronLeftIcon></ChevronLeftIcon></span>
               <h1 className='text-xl font-medium'>Add Remarks</h1>
            </div>
            <div className='p-2 w-full'>
              <div className='bg-white p-2 rounded-md flex gap-2 flex-col'>
                 <label>Remarks</label>
                 <textarea onChange={(e)=>setRemarks(e.target.value)} value={remarks} rows={5} className='border p-2 rounded-md resize-none outline-none border-neutral-300'></textarea>
                 <button onClick={updateCandidateRemarks} className='p-2 bg-blue-400 hover:bg-blue-500 transition-all duration-300 text-white mt-2'>Submit</button>
              </div>
            </div>
           
        </div>
      </div>
     }

     {/* Edit Candidate Popup */}
     {
      openEditPopup && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='bg-white rounded-lg shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto'>
          <div className='flex w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 items-center justify-between text-white'>
            <div className='flex items-center gap-2'>
              <span className='cursor-pointer' onClick={handleCloseEditPopup}><ChevronLeftIcon></ChevronLeftIcon></span>
              <h1 className='text-xl font-medium'>Edit Candidate Details</h1>
            </div>
            <button onClick={handleCloseEditPopup} className='text-white hover:text-gray-200'>
              <CloseIcon></CloseIcon>
            </button>
          </div>
          
          {editLoader ? (
            <div className='flex w-full justify-center h-64 items-center'>
              <img src={WhiteLoader} className='w-10 h-10'></img>
            </div>
          ) : (
            <div className='p-6'>
              <form className='space-y-6'>
                {/* Personal Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>First Name *</label>
                    <input
                      type='text'
                      name='first_name'
                      value={editFormData.first_name}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name *</label>
                    <input
                      type='text'
                      name='last_name'
                      value={editFormData.last_name}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Country *</label>
                    <input
                      type='text'
                      name='country'
                      value={editFormData.country}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Current Location *</label>
                    <input
                      type='text'
                      name='current_location'
                      value={editFormData.current_location}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Primary Email ID *</label>
                    <input
                      type='email'
                      name='primary_email_id'
                      value={editFormData.primary_email_id}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Primary Contact Number *</label>
                    <input
                      type='text'
                      name='primary_contact_number'
                      value={editFormData.primary_contact_number}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Current Company *</label>
                    <input
                      type='text'
                      name='current_company'
                      value={editFormData.current_company}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Experience (Years) *</label>
                    <input
                      type='text'
                      name='experience'
                      value={editFormData.experience}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Current Annual Salary</label>
                    <input
                      type='text'
                      name='current_annual_salary'
                      value={editFormData.current_annual_salary}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Expected Annual Salary *</label>
                    <input
                      type='text'
                      name='expected_annual_salary'
                      value={editFormData.expected_annual_salary}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Notice Period (Days) *</label>
                    <input
                      type='text'
                      name='notice_period'
                      value={editFormData.notice_period}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Education *</label>
                    <input
                      type='text'
                      name='education_qualification'
                      value={editFormData.education_qualification}
                      onChange={handleEditFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                </div>

                {/* Resume Section */}
                <div className='border-t pt-6'>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>Resume</h3>
                  
                  {editResumeFileName  ? (
                    <div className='flex items-center justify-between p-3 bg-gray-50 rounded-md'>
                      <div className='flex items-center gap-2'>
                        <DescriptionIcon className='text-blue-500'></DescriptionIcon>
                        <span className='text-sm text-gray-700'>{editResumeFileName}</span>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => window.open(`${process.env.REACT_APP_API_BASE_URL}/candidate/viewcandidateattachments/${selectedCandidate}/${editResumeFileName}`, '_blank')}
                          className='text-blue-500 hover:text-blue-700'
                        >
                          <DescriptionIcon style={{fontSize:'1.2rem'}}></DescriptionIcon>
                        </button>
                        <button
                          type='button'
                          onClick={handleRemoveResume}
                          className='text-red-500 hover:text-red-700'
                        >
                          <CloseIcon style={{fontSize:'1.2rem'}}></CloseIcon>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='border-2 border-dashed border-gray-300 rounded-md p-6 text-center'>
                      <UploadFileIcon className='mx-auto h-12 w-12 text-gray-400'></UploadFileIcon>
                      <div className='mt-2'>
                        <label htmlFor='resume-upload' className='cursor-pointer'>
                          <span className='text-blue-500 hover:text-blue-700 font-medium'>Upload Resume</span>
                          <span className='text-gray-500'> or drag and drop</span>
                        </label>
                        <input
                          id='resume-upload'
                          type='file'
                          accept='.pdf,.doc,.docx'
                          onChange={handleResumeFileChange}
                          className='hidden'
                        />
                      </div>
                      <p className='text-xs text-gray-500 mt-1'>PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className='flex justify-end gap-3 pt-6 border-t'>
                  <button
                    type='button'
                    onClick={handleCloseEditPopup}
                    className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    onClick={handleUpdateCandidate}
                    className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
                  >
                    Update Candidate
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
     }
     {
      openProfilePopup &&(
          <div className='fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div overflow-hidden p-0 w-[90%]'>
          <div className='flex w-[100%] p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200'>
            <div className='flex justify-between items-center'>
             <div className='flex gap-1 items-center'>
                <span onClick={handleClosePopUpBox} className='cursor-pointer'><ChevronLeftIcon style={{fontSize:"1.6rem"}}></ChevronLeftIcon></span>
                <div className='flex flex-col gap-1'>
                  <span className='flex gap-2 items-center'><h2 className='text-xl'>{candidateBasicDetails && `${candidateBasicDetails.first_name} ${candidateBasicDetails.last_name}`}</h2><small className='text-gray-400 font-medium text-[16px]'>{candidateBasicDetails && candidateBasicDetails.candidate_id}</small></span>
                  <span><span className='text-gray-500'>{jobBasicDetails && jobBasicDetails.job_title} - {jobBasicDetails && jobBasicDetails.job_id}</span> <span>{jobBasicDetails && jobBasicDetails.country}</span></span>
                </div>
             </div>
             <div className='flex flex-col gap-2'>
               <span className='flex items-center gap-1'><small className='text-gray-500'>Ac Manager</small>{acManagerName && acManagerName.full_name}</span>
               <span className='p-1 px-2 bg-white text-[15px] rounded-md'>{candidateStatus && cstatus.get(candidateStatus)}</span>
             </div>
             </div>
             <div className='flex mt-2 gap-6 px-4'>
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
                  fileName &&  <iframe title='attachments' src={`${process.env.REACT_APP_BASE_URL}/resumedocs/${fileName}`} className='rounded-md h-[600px] w-full'></iframe>
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
                              <span className='text-sm w-32'>Payout Rate</span>
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
      {remarksLoader &&
        <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update candidate remarks.</p>
          </div>
        </div>
      }
      <Box sx={{
        height: 600, width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        },
      }}>
        <DataGrid
          getRowId={(rows) => rows.id} // Specify the custom ID field
          rowHeight={70}
          rows={rows}
          columns={candidateCol}
          loading={loader}
          //   rowSelectionModel={selectedRows}
          //   onRowSelectionModelChange={(newRowSelected)=>setSelectedRows(newRowSelected)}
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
