import React, { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReumeUploadPopUp from '../components/uploadResumeForms/ReumeUploadPopUp'
import ResumeUpload1 from '../components/uploadResumeForms/ResumeUpload1'
import ResumeUpload2 from '../components/uploadResumeForms/ResumeUpload2'

export default function UploadResume() {
  const {user}=useContext(AuthContext)
  const [currentStep,setCurrentStep]=useState(1)
  const [candidateId,setCandidateId]=useState(null)
  const [formData,setFormData]=useState({
    form1:{},
    form2:{}
  })

  const createCandidateId=()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

  const renderForm=()=>{
    switch(currentStep){
        case 1:
          return (
             <ReumeUploadPopUp
              onNext={handleNext}
              parentFormDataChange={handleFormData}
              candidateId={candidateId}
             ></ReumeUploadPopUp>
          )
        case 2:
            return (
                <ResumeUpload1
                onNext={handleNext}
                parentFormDataChange={handleFormData}
                candidateId={candidateId}
                ></ResumeUpload1>
            )
        case 3:
            return (
                <ResumeUpload2
                onPrev={handlePrev}
                parentFormDataChange={handleFormData}
                candidateId={candidateId}
                ></ResumeUpload2>
            )
    }
  }

  return (
    <div className='flex flex-col gap-2'>
    <div className='flex bg-white w-full p-3 px-4 rounded-md shadow justify-between items-center'>
        <div className='flex flex-col gap-4'>
           <div className='flex flex-col gap-1'>
             <h1 className='text-[15px] font-semibold'>Application to 626 Holdings</h1>
             <span className='text-sm text-gray-500 font-light'>Field Service Engineer - Atlanta (24988) - Atlanta</span>
           </div>
           <div className='w-[420px] flex border rounded-md'>
             <div className=' border-r h-full flex gap-2 items-center px-4 py-2 flex-1'>
                <span className={`h-7 w-7 font-light  ${currentStep===1?("border-blue-400 text-blue-400"):("text-gray-600")}  flex justify-center items-center border-2`}>1</span>
                <span className={`text-sm ${currentStep===1?("text-blue-400"):(" text-gray-500")}`}>Candidate Info</span>
             </div>
             <div className=' h-full flex gap-2 items-center px-4 py-2 flex-1'>
                <span className='h-7 w-7 font-light text-gray-600 flex justify-center items-center border-2'>2</span>
                <span className='text-sm text-gray-500'>Screening Questions</span>
             </div>
           </div>
        </div>
        <div className='flex flex-col gap-4'>
            <span className='text-sm text-gray-400'>Exp: <b className='text-gray-500'>1 - 30</b>  yrs  Salary: <b className='text-gray-500'>USD 90000 - 140000</b></span>
            <span className='text-sm text-gray-400'>AC MAnager: <b className='text-gray-500'>Shushma Singh</b></span>
        </div>
    </div>
    {renderForm()}
    </div>
  )
}
