import React, { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReumeUploadPopUp from '../components/uploadResumeForms/ReumeUploadPopUp'
import ResumeUpload1 from '../components/uploadResumeForms/ResumeUpload1'
import ResumeUpload2 from '../components/uploadResumeForms/ResumeUpload2'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification';

export default function UploadResume() {
  const navigate=useNavigate()
  const location=useLocation()
  const {user}=useContext(AuthContext)
  const [currentStep,setCurrentStep]=useState(1)
  const [candidateId,setCandidateId]=useState(null)
  const [formData,setFormData]=useState({
    form0:{},
    form1:{},
    form2:{}
  })


  //for showing notification
  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
   setNotification({message,type})
  }

  
  console.log("candidate id---->",candidateId)
  console.log("parent form data---->",formData)
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

  const handleSubmit=async ()=>{

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
                <span className={`h-7 w-7 font-light  ${currentStep===2?("border-blue-400 text-blue-400"):("text-gray-600")}  flex justify-center items-center border-2`}>1</span>
                <span className={`text-sm ${currentStep===2?("text-blue-400"):(" text-gray-500")}`}>Candidate Info</span>
             </div>
             <div className=' h-full flex gap-2 items-center px-4 py-2 flex-1'>
                <span className={`h-7 w-7 font-light ${currentStep===3?("border-blue-400 text-blue-400"):("text-gray-600")}  flex justify-center items-center border-2`}>2</span>
                <span className={`text-sm ${currentStep===3?("text-blue-400"):(" text-gray-500")}`}>Screening Questions</span>
             </div>
           </div>
        </div>
        <div className='flex flex-col gap-4'>
            <span className='text-sm text-gray-400'>Exp: <b className='text-gray-500'>{`${location.state.experience.minexp}-${location.state.experience.maxexp}`}</b>  yrs    Salary: <b className='text-gray-500'>{location.state.work_type==="full_time"?(`  ${location.state.full_time_salary_currency} ${location.state.full_time_salary_type==="Fixed"?(location.state.fixed_salary):(`${location.state.min_salary}-${location.state.max_salary}`)}`):(`${location.state.contract_pay_currency} ${location.state.contract_pay_rate_type==="Fixed"?(location.state.fixed_contract_pay):(`${location.state.min_contract_pay}-${location.state.max_contract_pay}`)} ${location.contract_pay_cycle.toUpperCase()}`)}</b></span>
            <span className='text-sm text-gray-400'>AC MAnager: <b className='text-gray-500'>{location.state.ac_manager}</b></span>
        </div>
    </div>
    {renderForm()}
    </div>
  )
}
