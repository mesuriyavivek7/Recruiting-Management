import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import Notification from '../Notification';
import { useNavigate } from "react-router-dom";
//importing icons
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

//import progress bar
import ProgressBar from "@ramonak/react-progress-bar";

export default function ReumeUploadPopUp({onNext,jobId,candidateId,parentFormDataChange,parentFormData}) {
  const {user}=useContext(AuthContext)
  const [file,setFile]=useState(null)
  const fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
  const [uploadProgress,setUploadProgress]=useState(0)
  const [errors,setErrors]=useState({})
  const [parseFileData,setParseFileData]=useState(null)
  const [currentStep,setCurrentStep]=useState(1)
  const [pancardNo,setPanCardNo]=useState("")
  const [isDuplicate,setIsDuplicate]=useState(null)
  const [actionNext,setActionNext]=useState(false)
  const navigate=useNavigate()

   //for showing notification
   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
    setNotification({message,type})
   }

  const uploadResumeDocs=async ()=>{
        const fileData=new FormData()
        fileData.append('resume',file)
        try{
          const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/resumedocs/${candidateId}`,fileData,
          {headers:{"Content-Type":'multipart/form-data'},
          onUploadProgress:(progressEvent)=>{
             const progress=Math.round((progressEvent.loaded * 100) / progressEvent.total)
             setUploadProgress(progress)
          },
          },
         )
         setParseFileData(res.data)
         console.log("file upload successfully",res.data)
        }catch(err){
          console.log(err)
          let newErrors={}
          newErrors.uploaddocs="There is something wrong while uploading Your Resume."
          setErrors(newErrors)
        }
  }

  const validatepancardno=()=>{
       let newErrors={}
       let regpan=/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
       if(!pancardNo) newErrors.pancardNo="Please provide pancard no."
       else if(!regpan.test(pancardNo)) newErrors.pancardNo="Pancard Number is invalid."

       setErrors(newErrors)
       return Object.keys(newErrors).length===0
  }

  const uploadParseFileData=async ()=>{
     if(validatepancardno()){
         try{
           //collecting data
           const parseDetails={
             job_id:jobId,
             recruiter_agency_id:user.recruiting_agency_id,             
             recruiter_memeber_id:user._id,
             filepath:parseFileData.filepath,
             firstname:parseFileData.firstName,
             lastname:parseFileData.lastName,
             contactno:parseFileData.mobile,
             emailid:parseFileData.email,
             educationdetails:parseFileData.education,
             pancardnumber:pancardNo
           }
           const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/checkparsedetails/${candidateId}`,parseDetails)
           console.log(res.data)
           setIsDuplicate(!res.data)
           handleNext()
         }catch(err){ 
           console.log(err)
           let newErrors={}
           newErrors.parsefile="There is something wrong to parsing resume file."
           setErrors(newErrors)
         }
     }
         
  }

  //for discard steps and inner process 
  const handleDiscardProcess=async (type)=>{
       if(parseFileData){
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/removefile`,{filepath:parseFileData.filepath})
       }
       if(type==="removefile"){
         setCurrentStep(1)
         setFile(null)
       }else{
         navigate('/recruiter/jobs')
       }
  }

  //for discard the whole process
  const handleCancelProcess=async ()=>{
      try{
           await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/candidate/cancelprocess`,{data:{
            filepath:parseFileData.filepath,
            cid:candidateId
           }})
           navigate('/recruiter/jobs')
      } catch(err){
        console.log(err)
        let newErrors={}
        newErrors.cancelprocess="There is somethig wrong."
        setErrors(newErrors)
      }
  }  

  useEffect(()=>{
    if(currentStep===3){
      setFile(null)
    }
  })

  useEffect(()=>{
     if(file){
        uploadResumeDocs()
        setCurrentStep(2)
     }
  },[file])


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size<=10*1024*1024 ) {
      setFile(selectedFile);
    }else{
        let newErrors={}
        newErrors.filetype="Please select pdf or docx file type under 10mb."
        setErrors(newErrors)
    }
  };
  const handleNext=()=>{
    setCurrentStep((prevStep)=>prevStep+1)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if(droppedFile && fileTypes.includes(droppedFile.type) && droppedFile.size<=10*1024*1024){
       setFile(droppedFile)
    }else{
      let newErrors={}
      newErrors.filetype="Please select pdf or docx file type under 10mb."
      setErrors(newErrors)
      showNotification("Please select pdf or docx file type under 10mb.","failure")
    }
  }

   useEffect(()=>{
    if(actionNext)  handleParentFormData()
   },[actionNext])

   const handleParentFormData=()=>{
      parentFormDataChange(parseFileData)
   }

   useEffect(()=>{
     if(actionNext) onNext()
     setActionNext(false)
   },[parentFormData])


  const renderUi=()=>{
       switch(currentStep){
         case 1:
          return (
        <div className='flex flex-col gap-2'>
           <div onDragOver={handleDragOver} onDrop={handleDrop} className='mt-2  p-4 flex justify-center items-center w-full border border-blue-300 border-dashed rounded-md cursor-pointer transition-all hover:border-blue-500  h-72'>
             <div className='flex flex-col gap-2 items-center'>
               <span className='text-[14px] text-gray-500'>Drop your resume here or <label className='text-blue-400' htmlFor='uploadresume'>Upload Resume</label></span>
               <p className='text-center text-[12px] text-gray-400'>Ensure that you upload a PDF or Word Document, and that the file title should not have any special characters.
               Scanned images in the document will not be parsed.</p>
               <input
               type='file'
               id='uploadresume'
               className='hidden'
               onChange={handleFileChange}
               accept=".pdf,.docx,.doc"
               ></input>
              </div> 
            </div>
            {errors.filetype && <span className='text-red-500 flex justify-between text-sm mt-1 bg-red-200 rounded-md px-2 py-1'>{errors.filetype} <span onClick={()=>setErrors({})}><CancelOutlinedIcon style={{fontSize:"1.1rem",cursor:"pointer"}}></CancelOutlinedIcon></span></span>}
           <div className='flex place-content-end mt-3'>
            <div className='flex gap-2'>
                <button onClick={()=>navigate('/recruiter/jobs')} className='rounded-md text-sm border border-blue-400 text-blue-400 p-2 px-3'>Cancel</button>
                <button onClick={handleNext} disabled={file?false:true} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:opacity-30 rounded-md text-sm border text-white bg-blue-400 p-2 px-4'>Next</button>
            </div>
           </div>
          </div>
          )
        case 2:
          return (
          <div className='flex flex-col gap-2'>
            <div className='p-2 mt-2 border rounded-md flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                 <span className='h-10 w-10 flex justify-center items-center bg-blue-100 text-blue-400 rounded-full'><InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon></span>
                 <div className='flex flex-col'>
                    <span className='text-[14px] text-gray-400 font-light'>{file.name}</span>
                    <span className='text-[14px] text-gray-400 '>{Math.round(file.size/1000)} KB</span>
                 </div>
              </div>
              <span onClick={()=>handleDiscardProcess("removefile")} className='text-red-400 cursor-pointer'><DeleteOutlinedIcon></DeleteOutlinedIcon></span>
            </div>
            <div className='my-2'>
              <ProgressBar 
              bgColor={uploadProgress!==100?"#1b6ada":(errors.uploaddocs)?("#ef4444"):("green")}
              completed={uploadProgress}></ProgressBar>
            </div>
          </div>
          {errors.uploaddocs && <span className='text-red-500 flex justify-between text-sm mt-1 bg-red-200 rounded-md px-2 py-1'>{errors.uploaddocs} <span onClick={()=>setErrors({})}><CancelOutlinedIcon style={{fontSize:"1.2rem",cursor:"pointer"}}></CancelOutlinedIcon></span></span>}
          <div className='flex place-content-end mt-3'>
            <div className='flex gap-2'>
                <button onClick={()=>handleDiscardProcess("cancel")} className='rounded-md text-sm border border-blue-400 text-blue-400 p-2 px-3'>Cancel</button>
                <button onClick={handleNext} disabled={(uploadProgress===100 && (errors.uploaddocs===null || errors.uploaddocs===undefined))?false:true} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:opacity-30 rounded-md text-sm border text-white bg-blue-400 p-2 px-4'>Next</button>
            </div>
           </div>
          </div>
          )
        case 3:
          return (
            <div className='mt-2 flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                   <label className='input-label' htmlFor='pancardno'>Pancard Number <span className='text-red-400'>*</span></label>
                   <div className='flex flex-col gap-1'>
                    <input
                    id='pancardno'
                    value={pancardNo}
                    onChange={(e)=>setPanCardNo(e.target.value)}
                    type='text'
                    className='input-field'
                    ></input>
                    <p className='text-[12px] text-gray-500'>please provide candidate pancard number for verification.</p>
                   </div>
              </div>
              {errors.pancardNo && <span className='text-red-500 flex justify-between text-sm mt-1 bg-red-200 rounded-md px-2 py-1'>{errors.pancardNo} <span onClick={()=>setErrors({})}><CancelOutlinedIcon style={{fontSize:"1.2rem",cursor:"pointer"}}></CancelOutlinedIcon></span></span>}
              {errors.parsefile && <span className='text-red-500 flex justify-between text-sm mt-1 bg-red-200 rounded-md px-2 py-1'>{errors.parsefile} <span onClick={()=>setErrors({})}><CancelOutlinedIcon style={{fontSize:"1.2rem",cursor:"pointer"}}></CancelOutlinedIcon></span></span>}
              <div className='flex place-content-end mt-3'>
               <div className='flex gap-2'>
                  <button onClick={()=>handleDiscardProcess("cancel")} className='rounded-md text-sm border border-blue-400 text-blue-400 p-2 px-3'>Cancel</button>
                  <button onClick={uploadParseFileData} disabled={!errors.pancardNo?false:true} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:opacity-30 rounded-md text-sm border text-white bg-blue-400 p-2 px-4'>Parse</button>
               </div>
              </div>
            </div>
          )
        case 4:
          return (
            (isDuplicate)?
            (<div className='mt-4 flex flex-col gap-4'>
              <div className='flex justify-center items-center'>
                  <div className='h-28 w-28 rounded-full bg-red-200 text-red-500 flex justify-center items-center'>
                     <ErrorOutlineIcon style={{fontSize:"3.8rem"}}></ErrorOutlineIcon>
                  </div> 
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='text-xl text-center'>Resume duplicacy detected.</h1>
                <p className='text-gray-400 text-center text-sm'>Uploaded resume is alredy exist for this job role.</p>
              </div>
              <div className='flex place-content-center'>
                <button onClick={()=>navigate('/recruiter/jobs')} className='bg-blue-400 text-[14px] hover:bg-blue-500 rounded-sm text-white px-3 p-2'>Go Back</button>
              </div>
            </div>
            ):
            (<div className='mt-4 flex flex-col gap-4'>
              <div className='flex justify-center items-center'>
               <div className='h-28 w-28 rounded-full bg-blue-400 text-white flex justify-center items-center'>
                 <CheckCircleOutlinedIcon style={{fontSize:"3.8rem"}}></CheckCircleOutlinedIcon>
               </div> 
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='text-xl text-center'>Please check the details entered</h1>
                <p className='text-gray-400 text-sm text-center'>Your resume has been parsed successfully. We recommend you to cross-check the details before you proceed further</p>
              </div>
              {errors.cancelprocess && <span className='text-red-500 flex justify-between text-sm mt-1 bg-red-200 rounded-md px-2 py-1'>{errors.cancelprocess} <span onClick={()=>setErrors({})}><CancelOutlinedIcon style={{fontSize:"1.2rem",cursor:"pointer"}}></CancelOutlinedIcon></span></span>}
              <div className='flex place-content-end mt-3'>
               <div className='flex gap-2'>
                  <button onClick={handleCancelProcess} className='rounded-md text-sm border border-blue-400 text-blue-400 p-2 px-3'>Cancel</button>
                  <button onClick={()=>setActionNext(true)} disabled={!errors.cancelprocess?false:true} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:opacity-30 rounded-md text-sm border text-white bg-blue-400 p-2 px-4'>Procced</button>
               </div>
              </div>
            </div>)
          )

       }
  }

  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-40 backdrop-blur-md items-center'>
       <div className='bg-white shadow w-[500px] p-4 flex flex-col gap-1 rounded-md'>
         <div className='flex gap-2 items-center'>
            <h1 className='text-xl font-light'>Upload Resume</h1>
            {/* <span className='text-sm text-gray-400'>24988 - Field Service Engineer - Atlanta</span> */}
            <span className='text-gray-500'><VideocamOutlinedIcon style={{fontSize:"1.4rem"}}></VideocamOutlinedIcon></span>
         </div>
         <span className='text-gray-400 text-sm'>24988 - Field Service Engineer - Atlanta</span>
         {
          renderUi()
         }
       </div>
    </div>
  </div>
  )
}
