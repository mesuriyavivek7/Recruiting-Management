import React, { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReumeUploadPopUp from '../components/uploadResumeForms/ReumeUploadPopUp'
import ResumeUpload1 from '../components/uploadResumeForms/ResumeUpload1'
import ResumeUpload2 from '../components/uploadResumeForms/ResumeUpload2'
import { useLocation } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

//importing icons
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function UploadResume() {
  
  const navigate=useNavigate()
  const location=useLocation()
  console.log(location.state)
  const {user}=useContext(AuthContext)
  const [currentStep,setCurrentStep]=useState(1)
  const [candidateId,setCandidateId]=useState(null)
  const [formData,setFormData]=useState({
    form0:{},
    form1:{},
    form2:{}
  })
  

  const createCandidateId=()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const length = 5;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    result='C'+result;
    setCandidateId(result)
  }

  useEffect(()=>{
    if(!location.state) navigate('/recruiter/jobs')
    if(!candidateId) createCandidateId()
  },[])



  const handleNext=()=>{
    setCurrentStep((prevStep)=>prevStep+1)
  }

  const handlePrev=()=>{
    setCurrentStep((prevStep)=>prevStep-1)
  }

  const handleFormData=(formName,data)=>{
    setFormData((prevData)=>({
        ...prevData,
        [formName]:data
    }))
  }

  console.log("Candidate id---->",candidateId)
  console.log("parent form data----->",formData)

  const handleSubmit=async ()=>{
    try{
      //here submission process start

      //Insure the applying for job is active or not
      const acmanager=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/get-acmanager-id/${location.state.job_id}`)

      if(acmanager.data){

      //step-1 create candidate 
      const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/createcandidate/${candidateId}`,{
        job_id:location.state.job_id,
        candidate_id:candidateId,
        recruiter_member_id:user._id,
        recruiter_agency_id:user.recruiter_agency_id,
      })

      //step-2 create candidate basic details
      if(Object.keys(formData.form1).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/createcandidatebasicdetails/${res.data._id}`,formData.form1.basicDetails)

      //step-3 uploading candidate attachments
      if(Object.keys(formData.form1).length>0){
        const fileData=new FormData()
        if(formData.form1.candidateattachments.evaluation_form) fileData.append('evaluation_form',formData.form1.candidateattachments.evaluation_form)
        if(formData.form1.candidateattachments.audio_brief) fileData.append('audio_brief',formData.form1.candidateattachments.audio_brief)
        if(formData.form1.candidateattachments.other_docs) fileData.append('other_docs',formData.form1.candidateattachments.other_docs)
        
        if([...fileData.entries()].length!==0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/uploadcandidateattachments/${candidateId}`,fileData,{headers:{"Content-Type":"multipart/form-data"}})
      }

      //step-4 uploading candidate conset proof
      if(Object.keys(formData.form1).length>0){
         const fileData=new FormData()
         if(formData.form1.consetProof){
          fileData.append('consetproof',formData.form1.consetProof)
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/uploadconsetproof/${candidateId}`,fileData,{headers:{"Content-Type":"multipart/form-data"}})
         }
      }
      
      //step-5 storing candidate answer into db
      if(Object.keys(formData.form2).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/createsqanswer/${res.data._id}`,formData.form2)

      //step-6 make resumeparse and resumedocs as completed
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/candidate/markascompleted/${candidateId}`)

      //step-7 get alloted account manager id
        
      //step-8 add candidate profile into account manager pending list
      await axios.post(`${process.env.REACT_APP_API_ADMIN_URL}/accountmanager/addpendingcandidate/${acmanager.data}`,{orgcid:res.data._id})

      //step-9 add accountmanager id into candidate profile
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/addacmanager/${res.data._id}`,{acmanagerid:acmanager.data})

       return true
     }else{
       return false
     }
    }catch(err){
      //handeling error here
      console.log(err)
      return false
    }

  }

  const renderForm=()=>{
    switch(currentStep){
        case 1:
          return (
             <ReumeUploadPopUp
              onNext={handleNext}
              parentFormDataChange={(data)=>handleFormData('form0',data)}
              candidateId={candidateId}
              parentFormData={formData}
              jobId={location.state.job_id}
             ></ReumeUploadPopUp>
          )
        case 2:
            return (
                <ResumeUpload1
                onNext={handleNext}
                parentFormDataChange={(data)=>handleFormData('form1',data)}
                candidateId={candidateId}
                parentFormData={formData}
                jobObj={location.state}
                ></ResumeUpload1>
            )
        case 3:
            return (
                <ResumeUpload2
                onPrev={handlePrev}
                parentFormDataChange={(data)=>handleFormData('form2',data)}
                candidateId={candidateId}
                parentFormData={formData}
                jobObj={location.state}
                submitPost={handleSubmit}
                ></ResumeUpload2>
            )
    }
  }

  return (
    <div className='flex flex-col gap-2'>
    <div className='flex bg-white w-full p-3 px-4 rounded-md shadow justify-between items-center'>
        <div className='flex flex-col gap-4'>
           <div className='flex flex-col gap-1'>
             <h1 className='text-[15px] font-semibold'>Application to {location.state.cp_name}</h1>
             <span className='text-sm text-gray-500 font-light'>{location.state.job_id} {location.state.job_title} - {location.state.country}</span>
           </div>
           <div className='w-[420px] flex border rounded-md'>
             <div className=' border-r h-full flex gap-2 items-center px-4 py-2 flex-1'>
                <span className={`h-7 w-7 font-light  ${(currentStep===2 || Object.keys(formData.form1).length>0)?("border-blue-400 text-blue-400"):("text-gray-600")}  flex justify-center items-center border-2`}>{(Object.keys(formData.form1).length>0)?(<CheckOutlinedIcon></CheckOutlinedIcon>):(1)}</span>
                <span className={`text-sm ${(currentStep===2 || Object.keys(formData.form1).length>0)?("text-blue-400"):(" text-gray-500")}`}>Candidate Info</span>
             </div>
             <div className=' h-full flex gap-2 items-center px-4 py-2 flex-1'>
                <span className={`h-7 w-7 font-light ${(currentStep===3 || Object.keys(formData.form2).length>0)?("border-blue-400 text-blue-400"):("text-gray-600")}  flex justify-center items-center border-2`}>{(Object.keys(formData.form2).length>0)?(<CheckOutlinedIcon></CheckOutlinedIcon>):(2)}</span>
                <span className={`text-sm ${(currentStep===3 || Object.keys(formData.form2).length>0)?("text-blue-400"):(" text-gray-500")}`}>Screening Questions</span>
             </div>
           </div>
        </div>
        <div className='flex flex-col gap-4'>
            <span className='text-sm text-gray-400'>Exp: <b className='text-gray-500'>{`${location.state.experience.minexp}-${location.state.experience.maxexp}`}</b>  yrs    Salary: <b className='text-gray-500'>{location.state.work_type==="full_time"?(`  ${location.state.full_time_salary_currency} ${location.state.full_time_salary_type==="Fixed"?(location.state.fixed_salary):(`${location.state.min_salary}-${location.state.max_salary}`)}`):(`${location.state.contract_pay_currency} ${location.state.contract_pay_rate_type==="Fixed"?(location.state.fixed_contract_pay):(`${location.state.min_contract_pay}-${location.state.max_contract_pay}`)} ${location.state.contract_pay_cycle.toUpperCase()}`)}</b></span>
            <span className='text-sm text-gray-400'>AC MAnager: <b className='text-gray-500'>{location.state.ac_manager}</b></span>
        </div>
    </div>
    {renderForm()}
    </div> 
  )
}
