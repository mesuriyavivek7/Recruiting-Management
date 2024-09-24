import React, { useContext, useEffect, useState } from 'react'

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Notification from '../Notification';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

//imporitng icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CandidateFileDragDrop from '../CandidateFileDragDrop';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function ResumeUpload1({jobObj,parentFormData,candidateId,parentFormDataChange,onNext}) {
  const {user}=useContext(AuthContext)
  const [formData,setFormData]=useState({
        firstname:(Object.keys(parentFormData.form0).length>0)?(parentFormData.form0.firstName):(""),
        lastname:(Object.keys(parentFormData.form0).length>0)?(parentFormData.form0.lastName):(""),
        country:"",
        currentLocation:"",
        primaryEmailId:(Object.keys(parentFormData.form0).length>0)?(parentFormData.form0.email):(""),
        additionalEmailId:"",
        primaryContactNumber:(Object.keys(parentFormData.form0).length>0)?(`91${parentFormData.form0.mobile}`):(""),
        additionalContactNumber:'',
        currentCompany:"",
        currentDesignation:"",
        experience:"",
        releventExperience:"",
        currentSalary:"",
        expectedSalary:"",
        salaryRemarks:"",
        noticePeriod:"",
        comment:"",
        educationQualification:(Object.keys(parentFormData.form0).length>0)?(parentFormData.form0.education):(""),
        candidateSummary:"",
        candidatetoc:false
  })

  const [attachments,setAttachments]=useState({
    candidate_evaluation_form:"",
    candidate_audio:"",
    other_file:"",
  })

  const [consetProof,setConsetProof]=useState(null)

  const [jobAttachments,setJobAttachments]=useState({})

  console.log("Conset Proof--->",consetProof)
  console.log("job attachments---->",attachments)

  //fetching job attached documents details
  useEffect(()=>{
    const getJobAttachmentsDetails=async ()=>{
       try{
         const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getcandidatejobattachments/J492KY`)
         setJobAttachments(res.data)
       }catch(err){
        //here error handeling is remain
         console.log(err)
       }
    }
    getJobAttachmentsDetails()
  },[])

  const handleAttachments=(name,file)=>{
      setAttachments((prevData)=>({...prevData,[name]:file}))
  }

  const [errors,setErrors]=useState({})

     //for showing notification
     const [notification,setNotification]=useState(null)

     //for showing notification
     const showNotification=(message,type)=>{
      setNotification({message,type})
     }

  const [countries,setCountries]=useState([])
  const handleFormData=(e)=>{
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const validate=()=>{
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let newErrors={}

      if(formData.firstname==="") newErrors.firstname="firstname is required..!"
      if(formData.lastname==="")  newErrors.lastname="lastname is required..!"
      if(formData.country==="") newErrors.country="country name is required..!"
      if(formData.currentLocation==="") newErrors.currentLocation="current location is required..!"
      if(formData.primaryEmailId==="") newErrors.primaryEmailId="primary email id is required..!"
      else if(!emailRegex.test(formData.primaryEmailId)) newErrors.primaryEmailId="Please enter valid email address..!"
      if(formData.additionalEmailId!=="" && !emailRegex.test(formData.additionalEmailId)) newErrors.additionalEmailId="Please enter valid email address..!"
      if(formData.primaryContactNumber==="") newErrors.primaryContactNumber="contact number is required..!"
      else if(formData.primaryContactNumber.length<12) newErrors.primaryContactNumber="Pleaes enter valid contact number..!"
      if(formData.currentCompany==="") newErrors.currentCompany="current compnay name is required..!"
      if(formData.experience==="") newErrors.experience="experience is required..!"
      if(formData.releventExperience==="") newErrors.releventExperience="relevent experience is required..!"
      if(formData.releventExperience>formData.experience) newErrors.releventExperience="relevent experinece is less then or equal to experience..!"
      if(formData.expectedSalary==="") newErrors.expectedSalary="expected salary is required..!"
      if(formData.noticePeriod==="") newErrors.noticePeriod="Please select notice period..!"
      if(formData.educationQualification==="") newErrors.educationQualification="education qualification is required..!"
      if(formData.candidatetoc===false) newErrors.candidateToc="Please agree to terms above."

      //validation for optional files
      if(Object.keys(jobAttachments).length>0){
        if(jobAttachments.evaluation_form && attachments.candidate_evaluation_form==="") newErrors.evaluationFrom="Please upload evaluation form."
        if(jobAttachments.audio_brief && attachments.candidate_audio==="") newErrors.candidateAudio="Please upload candidate audio file."
        if(jobAttachments.other_docs && attachments.other_file==="") newErrors.otherFile="Please upload mention formate other file."
      }

      if(!consetProof) errors.consetProof="Please upload conset proof file."
  
      if(Object.keys(newErrors).length!==0) showNotification("Please fill out appropriate fields..!","failure") 
      setErrors(newErrors)
      return Object.keys(newErrors).length===0
  }

  

  const getCountries = async () => {
    try {
      const response = await fetch("/tbl_country.json");
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      console.log("Error while fetching countries", error);
    }
  };

  //for file uploading conset file and store 
  const fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document",'video/mpeg','video/mp4','image/jpeg','image/png','image/jpg']

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size<=10*1024*1024 ) {
      setConsetProof(selectedFile);
    }else{
      showNotification("Please select valid file type under 10mb","failure")
    }
  };

  const handleNext=()=>{
     if(validate()){
       parentFormDataChange({
        basicDetails:{
           candidate_id:candidateId,
           recruiter_id:user.recruiting_agency_id,
           first_name:formData.firstname,
           last_name:formData.lastname,
           country:formData.country,
           current_location:formData.currentLocation,
           primary_email_id:formData.primaryEmailId,
           additional_email_id:formData.additionalEmailId,
           primary_contact_number:formData.primaryContactNumber,
           additional_contact_number:formData.additionalContactNumber,
           current_company:formData.currentCompany,
           current_designation:formData.currentDesignation,
           experience:formData.experience,
           relevant_experience:formData.releventExperience,
           current_annual_salary:formData.currentSalary,
           expected_annual_salary:formData.expectedSalary,
           salary_remarks:formData.salaryRemarks,
           comments:formData.comment,
           education_qualification:formData.educationQualification,
           candidate_summary:formData.candidateSummary,
           candidate_toc:formData.candidatetoc
        },
        candidateattachments:{
           folder_name:jobObj.job_id,
           recruiter_id:user.recruiting_agency_id,
           evaluation_form:attachments.candidate_evaluation_form,
           audio_brief:attachments.candidate_audio,
           other_docs:attachments.other_file
        },
        consetProof
       })

       onNext()
     }
  }


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    console.log(droppedFile)
    if (droppedFile && fileTypes.includes(droppedFile.type) && droppedFile.size<=10*1024*1024) {
      setConsetProof(droppedFile);
    }else{
      showNotification("Please select valid file type under 10mb","failure")
    }
  };

  useEffect(()=>{
     getCountries()
  },[])

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className='w-full bg-white-500 rounded-md gap-4 flex flex-col p-2'>
        <div className='flex gap-4 items-start w-full px-5 py-4'>
          <div className='flex w-[32%] py-2 gap-0.5 flex-col '>
              <h1 className='text-xl font-light'>Basic Details</h1>
              <p className='text-sm text-gray-400'>Please enter your personal information</p>
          </div>
          <div className='bg-white shadow w-[68%] p-6 rounded-md flex flex-col gap-8'>
            <div className='flex w-full gap-3 items-center'>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='firstname'>First Name <span className='text-red-500'>*</span></label>
                    <input
                    id='firstname'
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleFormData}
                    type='text'
                    className='input-field'
                    ></input>
                    { errors.firstname && <span className='text-red-500 text-sm'>{errors.firstName}</span> }
                    
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='lastname'>Last Name <span className='text-red-500'>*</span></label>
                    <input
                    id='lastname'
                    value={formData.lastname}
                    onChange={handleFormData}
                    name='lastname'
                    type='text'
                    className='input-field'
                    ></input>
                    { errors.lastname && <span className='text-red-500 text-sm'>{errors.lastName}</span> }
                </div>
            </div>
            <div className='flex w-full gap-3 items-center'>
               <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='country'>Select Country <span className='text-red-500'>*</span></label>
                    <select 
                    value={formData.country}
                    onChange={handleFormData}
                    name='country'
                    id='country'
                    className='input-field custom-select'
                    >
                      <option value="">Select Country</option>
                      {
                        countries.map((country)=>(
                          <option key={country.country_id} value={country.country_name}>{country.country_name}</option>
                        ))
                      }
                    </select>
                    {errors.country &&  <span className='text-red-500 text-sm'>{errors.country}</span>}
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='lastname'>Current Location <span className='text-red-500'>*</span></label>
                    <input
                    value={formData.currentLocation}
                    onChange={handleFormData}
                    type='text'
                    name='currentLocation'
                    className='input-field'
                    ></input>
                    {errors.currentLocation &&  <span className='text-red-500 text-sm'>{errors.currentLocation}</span>}
                </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='flex gap-4 items-start w-full px-5 py-4'>
          <div className='flex w-[32%] py-2 gap-0.5 flex-col '>
              <h1 className='text-xl font-light'>Contact Details</h1>
              <p className='text-sm text-gray-400'>Please enter your contact details</p>
          </div>
          <div className='bg-white shadow w-[68%] p-6 rounded-md flex flex-col gap-8'>
            <div className='flex w-full gap-3 items-center'>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='primaryemailid'>Primary Email ID <span className='text-red-500'>*</span></label>
                    <input
                    value={formData.primaryEmailId}
                    onChange={handleFormData}
                    name='primaryEmailId'
                    id='primaryEmailId'
                    type='email'
                    className='input-field'
                    ></input>
                    {errors.primaryEmailId &&  <span className='text-red-500 text-sm'>{errors.primaryEmailId}</span>}
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='additionalemail'>Additonal Email ID </label>
                    <input
                    value={formData.additionalEmailId}
                    id='additionalemail'
                    name='additionalEmailId'
                    type='text'
                    className='input-field'
                    ></input>
                    {errors.additionalEmailId &&  <span className='text-red-500 text-sm'>{errors.additionalEmailId}</span>}
                </div>
            </div>
            <div className='flex w-full gap-3 items-center'>
               <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='primarycontactnumber'>Primary Contact Number <span className='text-red-500'>*</span></label>
                    <PhoneInput
                    value={formData.primaryContactNumber}
                    country={"in"}
                    onChange={(phone) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      primaryContactNumber: phone,
                    }))
                   }
                   containerStyle={{ width: "100%" }}
                   />
                   {errors.primaryContactNumber &&  <span className='text-red-500 text-sm'>{errors.primaryContactNumber}</span>}
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='lastname'>Additional Contact Number</label>
                    <PhoneInput
                    value={formData.additionalContactNumber}
                    country={"in"}
                    onChange={(phone) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      additionalContactNumbe: phone,
                    }))
                   }
                   containerStyle={{ width: "100%" }}
                   />
                </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='flex gap-4 items-start w-full px-5 py-4'>
          <div className='flex w-[32%] py-2 gap-0.5 flex-col '>
              <h1 className='text-xl font-light'>Employment Details</h1>
              <p className='text-sm text-gray-400'>Please enter your employment details</p>
          </div>
          <div className='bg-white shadow w-[68%] p-6 rounded-md flex flex-col gap-8'>
            <div className='flex w-full gap-3 items-center'>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='company'>Current Company <span className='text-red-500'>*</span></label>
                    <input
                    value={formData.currentCompany}
                    onChange={handleFormData}
                    id='company'
                    name='currentCompany'
                    type='email'
                    className='input-field'
                    ></input>
                    {errors.currentCompany &&  <span className='text-red-500 text-sm'>{errors.currentCompany}</span>}
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='designation'>Current Designation </label>
                    <input
                    value={formData.currentDesignation}
                    id='currentDesignation'
                    name='currentDesignation'
                    type='text'
                    className='input-field'
                    ></input>
                </div>
            </div>
            <div className='flex w-full gap-3 items-center'>
               <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='experience'>Experience(Yrs) <span className='text-red-500'>*</span></label>
                    <input
                    value={formData.experience}
                    onChange={handleFormData}
                    type='number'
                    name='experience'
                    id='experience'
                    className='input-field'
                    ></input>
                    {errors.experience &&  <span className='text-red-500 text-sm'>{errors.experience}</span>}
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='releventexperience'>Relevent Experience(Yrs) <span className='text-red-500'>*</span></label>
                    <input
                    value={formData.releventExperience}
                    onChange={handleFormData}
                    type='number'
                    name='releventExperience'
                    id='releventexperience'
                    className='input-field'
                    ></input>
                    {errors.releventExperience &&  <span className='text-red-500 text-sm'>{errors.releventExperience}</span>}
                </div>
            </div>
            <div className='flex w-full gap-3 items-center'>
               <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='annualsalary'>Current Annual Salary</label>
                    <div className='flex gap-2 items-center'>
                    <select name="fullTimeSalaryCurrency" id="currency" disabled={true} className="input-field w-20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50">
                    <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="JPY">JPY</option>
  <option value="GBP">GBP</option>
  <option value="AUD">AUD</option>
  <option value="CAD">CAD</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="SEK">SEK</option>
  <option value="NZD">NZD</option>
  <option value="INR">INR</option>
  <option value="BRL">BRL</option>
  <option value="RUB">RUB</option>
  <option value="ZAR">ZAR</option>
  <option value="KRW">KRW</option>
  <option value="SGD">SGD</option>
  <option value="HKD">HKD</option>
  <option value="MXN">MXN</option>
  <option value="NOK">NOK</option>
  <option value="TRY">TRY</option>
  <option value="SAR">SAR</option>
  <option value="THB">THB</option>
  <option value="IDR">IDR</option>
  <option value="PLN">PLN</option>
  <option value="TWD">TWD</option>
  <option value="MYR">MYR</option>
  <option value="VND">VND</option>
  <option value="PHP">PHP</option>
  <option value="CZK">CZK</option>
  <option value="HUF">HUF</option>
  <option value="ILS">ILS</option>
  <option value="AED">AED</option>
  <option value="CLP">CLP</option>
  <option value="COP">COP</option>
  <option value="PEN">PEN</option>
  <option value="NGN">NGN</option>
  <option value="ARS">ARS</option>
  <option value="EGP">EGP</option>
  <option value="PKR">PKR</option>
  <option value="DZD">DZD</option>
  <option value="MAD">MAD</option>
  <option value="JOD">JOD</option>
  <option value="QAR">QAR</option>
  <option value="KWD">KWD</option>
  <option value="OMR">OMR</option>
  <option value="BHD">BHD</option>
  <option value="LKR">LKR</option>
  <option value="BDT">BDT</option>
  <option value="BND">BND</option>
  <option value="KHR">KHR</option>
  <option value="KZT">KZT</option>
  <option value="MNT">MNT</option>
  <option value="LAK">LAK</option>
  <option value="MMK">MMK</option>
  <option value="NPR">NPR</option>
  <option value="UZS">UZS</option>
  <option value="KGS">KGS</option>
  <option value="TJS">TJS</option>
  <option value="AFN">AFN</option>
  <option value="IRR">IRR</option>
  <option value="IQD">IQD</option>
  <option value="LBP">LBP</option>
  <option value="SYP">SYP</option>
  <option value="YER">YER</option>
  <option value="KPW">KPW</option>
  <option value="MVR">MVR</option>
  <option value="BAM">BAM</option>
  <option value="MDL">MDL</option>
  <option value="MKD">MKD</option>
  <option value="GEL">GEL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BBD">BBD</option>
  <option value="BZD">BZD</option>
  <option value="XOF">XOF</option>
  <option value="XAF">XAF</option>
  <option value="CDF">CDF</option>
  <option value="GHS">GHS</option>
  <option value="KES">KES</option>
  <option value="LRD">LRD</option>
  <option value="MWK">MWK</option>
  <option value="MGA">MGA</option>
  <option value="MZN">MZN</option>
  <option value="RWF">RWF</option>
  <option value="SCR">SCR</option>
  <option value="SLL">SLL</option>
  <option value="TZS">TZS</option>
  <option value="UGX">UGX</option>
  <option value="ZMW">ZMW</option>
  <option value="BWP">BWP</option>
  <option value="SZL">SZL</option>
  <option value="NAD">NAD</option>
  <option value="BIF">BIF</option>
  <option value="DJF">DJF</option>
  <option value="ETB">ETB</option>
  <option value="ERN">ERN</option>
  <option value="SOS">SOS</option>
  <option value="LSL">LSL</option>
  <option value="NGN">NGN</option>
  <option value="AOA">AOA</option>
  <option value="ZWL">ZWL</option>
  <option value="XCD">XCD</option>
  <option value="HTG">HTG</option>
  <option value="JMD">JMD</option>
  <option value="TTD">TTD</option>
  <option value="BMD">BMD</option>
  <option value="KYD">KYD</option>
  <option value="BSD">BSD</option>
  <option value="CUP">CUP</option>
  <option value="DOP">DOP</option>
  <option value="GTQ">GTQ</option>
  <option value="HNL">HNL</option>
  <option value="NIO">NIO</option>
  <option value="PAB">PAB</option>
  <option value="CRC">CRC</option>
  <option value="BZD">BZD</option>
  <option value="AWG">AWG</option>
  <option value="ANG">ANG</option>
  <option value="SVC">SVC</option>
  <option value="HTG">HTG</option>
  <option value="XPF">XPF</option>
  <option value="FJD">FJD</option>
  <option value="PGK">PGK</option>
  <option value="SBD">SBD</option>
  <option value="TOP">TOP</option>
  <option value="VUV">VUV</option>
  <option value="WST">WST</option>
  <option value="KID">KID</option>
  <option value="TVD">TVD</option>
  <option value="VND">VND</option>
  <option value="KHR">KHR</option>
  <option value="MMK">MMK</option>
  <option value="LAK">LAK</option>
  <option value="KZT">KZT</option>
  <option value="UZS">UZS</option>
  <option value="TMT">TMT</option>
  <option value="GEL">GEL</option>
  <option value="MDL">MDL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BAM">BAM</option>
                    </select>
                    <input
                    value={formData.currentSalary}
                    onChange={handleFormData}
                    type='number'
                    id='annualsalary'
                    name='currentSalary'
                    className='input-field'
                    ></input>
                    </div>
                
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='expectedsalary'>Expected Annual Salary <span className='text-red-500'>*</span></label>
                    <div className='flex gap-2 items-center'>
                    <select name="fullTimeSalaryCurrency" id="currency" disabled={true} className="input-field w-20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50">
                    <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="JPY">JPY</option>
  <option value="GBP">GBP</option>
  <option value="AUD">AUD</option>
  <option value="CAD">CAD</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="SEK">SEK</option>
  <option value="NZD">NZD</option>
  <option value="INR">INR</option>
  <option value="BRL">BRL</option>
  <option value="RUB">RUB</option>
  <option value="ZAR">ZAR</option>
  <option value="KRW">KRW</option>
  <option value="SGD">SGD</option>
  <option value="HKD">HKD</option>
  <option value="MXN">MXN</option>
  <option value="NOK">NOK</option>
  <option value="TRY">TRY</option>
  <option value="SAR">SAR</option>
  <option value="THB">THB</option>
  <option value="IDR">IDR</option>
  <option value="PLN">PLN</option>
  <option value="TWD">TWD</option>
  <option value="MYR">MYR</option>
  <option value="VND">VND</option>
  <option value="PHP">PHP</option>
  <option value="CZK">CZK</option>
  <option value="HUF">HUF</option>
  <option value="ILS">ILS</option>
  <option value="AED">AED</option>
  <option value="CLP">CLP</option>
  <option value="COP">COP</option>
  <option value="PEN">PEN</option>
  <option value="NGN">NGN</option>
  <option value="ARS">ARS</option>
  <option value="EGP">EGP</option>
  <option value="PKR">PKR</option>
  <option value="DZD">DZD</option>
  <option value="MAD">MAD</option>
  <option value="JOD">JOD</option>
  <option value="QAR">QAR</option>
  <option value="KWD">KWD</option>
  <option value="OMR">OMR</option>
  <option value="BHD">BHD</option>
  <option value="LKR">LKR</option>
  <option value="BDT">BDT</option>
  <option value="BND">BND</option>
  <option value="KHR">KHR</option>
  <option value="KZT">KZT</option>
  <option value="MNT">MNT</option>
  <option value="LAK">LAK</option>
  <option value="MMK">MMK</option>
  <option value="NPR">NPR</option>
  <option value="UZS">UZS</option>
  <option value="KGS">KGS</option>
  <option value="TJS">TJS</option>
  <option value="AFN">AFN</option>
  <option value="IRR">IRR</option>
  <option value="IQD">IQD</option>
  <option value="LBP">LBP</option>
  <option value="SYP">SYP</option>
  <option value="YER">YER</option>
  <option value="KPW">KPW</option>
  <option value="MVR">MVR</option>
  <option value="BAM">BAM</option>
  <option value="MDL">MDL</option>
  <option value="MKD">MKD</option>
  <option value="GEL">GEL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BBD">BBD</option>
  <option value="BZD">BZD</option>
  <option value="XOF">XOF</option>
  <option value="XAF">XAF</option>
  <option value="CDF">CDF</option>
  <option value="GHS">GHS</option>
  <option value="KES">KES</option>
  <option value="LRD">LRD</option>
  <option value="MWK">MWK</option>
  <option value="MGA">MGA</option>
  <option value="MZN">MZN</option>
  <option value="RWF">RWF</option>
  <option value="SCR">SCR</option>
  <option value="SLL">SLL</option>
  <option value="TZS">TZS</option>
  <option value="UGX">UGX</option>
  <option value="ZMW">ZMW</option>
  <option value="BWP">BWP</option>
  <option value="SZL">SZL</option>
  <option value="NAD">NAD</option>
  <option value="BIF">BIF</option>
  <option value="DJF">DJF</option>
  <option value="ETB">ETB</option>
  <option value="ERN">ERN</option>
  <option value="SOS">SOS</option>
  <option value="LSL">LSL</option>
  <option value="NGN">NGN</option>
  <option value="AOA">AOA</option>
  <option value="ZWL">ZWL</option>
  <option value="XCD">XCD</option>
  <option value="HTG">HTG</option>
  <option value="JMD">JMD</option>
  <option value="TTD">TTD</option>
  <option value="BMD">BMD</option>
  <option value="KYD">KYD</option>
  <option value="BSD">BSD</option>
  <option value="CUP">CUP</option>
  <option value="DOP">DOP</option>
  <option value="GTQ">GTQ</option>
  <option value="HNL">HNL</option>
  <option value="NIO">NIO</option>
  <option value="PAB">PAB</option>
  <option value="CRC">CRC</option>
  <option value="BZD">BZD</option>
  <option value="AWG">AWG</option>
  <option value="ANG">ANG</option>
  <option value="SVC">SVC</option>
  <option value="HTG">HTG</option>
  <option value="XPF">XPF</option>
  <option value="FJD">FJD</option>
  <option value="PGK">PGK</option>
  <option value="SBD">SBD</option>
  <option value="TOP">TOP</option>
  <option value="VUV">VUV</option>
  <option value="WST">WST</option>
  <option value="KID">KID</option>
  <option value="TVD">TVD</option>
  <option value="VND">VND</option>
  <option value="KHR">KHR</option>
  <option value="MMK">MMK</option>
  <option value="LAK">LAK</option>
  <option value="KZT">KZT</option>
  <option value="UZS">UZS</option>
  <option value="TMT">TMT</option>
  <option value="GEL">GEL</option>
  <option value="MDL">MDL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BAM">BAM</option>
                    </select>
                      <input
                       value={formData.expectedSalary}
                       onChange={handleFormData}
                       type='number'
                       id='expectedsalary'
                       className='input-field'
                       name='expectedSalary'
                       ></input>
                       {errors.expectedSalary &&  <span className='text-red-500 text-sm'>{errors.expectedSalary}</span>}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='input-label' htmlFor='salaryremarks'>Salary Remarks</label>
              <input
               value={formData.salaryRemarks}
               onChange={handleFormData}
               id='salaryremarks'
               placeholder='Additional Salary Details'
               className='input-field'
               name='salaryRemarks'
              ></input>
            </div>
            <div className='flex gap-3'>
              <div className='flex w-72 flex-col gap-2'>
                <label className='input-label' htmlFor='noticeperiod'>Notice Period <span className='text-red-400'>*</span></label>
                <select 
                id='noticeperiod'
                name='noticePeriod'
                className='input-field'
                value={formData.noticePeriod}
                onChange={handleFormData}
                >
                 <option value=''>Select</option>
                 <option value='0-7'>0-7 Days(immediate)</option>
                 <option value='8-15'>8-15 Days</option>
                 <option value='16-30'>16-30 Days</option>
                 <option value='31-45'>31-40 Days</option>
                 <option value='45-60'>45-60 Days</option>
                 <option value='2months'>2 Months</option>
                 <option value='3months'>3 Months</option>
                </select>
                {errors.noticePeriod &&  <span className='text-red-500 text-sm'>{errors.noticePeriod}</span>}
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='input-label' htmlFor='comments'>Comments</label>
                <input
                 value={formData.comment}
                 onChange={handleFormData}
                 type='text'
                 placeholder='Notice Period Remarks'
                 id='comments'
                 className='input-field'
                 name='comment'
                 >
                 </input>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='flex gap-4 items-start w-full px-5 py-4'>
          <div className='flex w-[32%] py-2 gap-0.5 flex-col '>
              <h1 className='text-xl font-light'>Education & Summary</h1>
              <p className='text-sm text-gray-400'>Please enter the requested details</p>
          </div>
          <div className='bg-white shadow w-[68%] p-6 rounded-md flex flex-col gap-8'>
             <div className='flex flex-col gap-2'>
               <label className='input-label' htmlFor='education'>Educational Qualification <span className='text-red-400'>*</span></label>
               <input 
               value={formData.educationQualification}
               onChange={handleFormData}
               type='text'
               id='education'
               name='educationQualification'
               className='input-field w-[350px]'
               ></input>
               {errors.educationQualification &&  <span className='text-red-500 text-sm'>{errors.educationQualification}</span>}
             </div>
             <div className='flex flex-col gap-2'>
              <label className='input-label' htmlFor='covernote'>Candidate Summary / Cover Note</label>
              <textarea 
              id='covernote'
              className='input-field'
              name='candidateSummary'
              value={formData.candidateSummary}
              onChange={handleFormData}
              rows={5}
              ></textarea>
             </div>
             <div className='flex flex-col gap-4'>
               <div className='flex flex-col'>
                 <h1 className='text-xl font-light'>Attachments</h1>
                 <p className='text-gray-400 text-[14px] font-light'>Click or drag files in the bands below</p>
               </div>
               <div className='flex flex-col gap-3'>
               <CandidateFileDragDrop 
                fileTitle="Candidate Evaluation Form"
                fileId="evaluationform"
                accepted=".pdf,.docx,.doc"
                onFileUpload={(file)=>handleAttachments("candidate_evaluation_form",file)}
                showNotification={showNotification}
                downloadAttachments={(jobAttachments.evaluation_form)?(jobAttachments.evaluation_form):(null)}
                jobId="J492KY"
               ></CandidateFileDragDrop>
               {
                errors.evaluationFrom && (<span className='text-red-500 text-sm'>{errors.evaluationFrom}</span>)
               }
               <CandidateFileDragDrop
                fileTitle="Candidate Audio Attachment"
                fileId="audioform"
                fileSubText="(5MB mp3/mp4 file allowed)"
                accepted="video/mpeg, video/mp4, audio/wav"
                onFileUpload={(file)=>handleAttachments("candidate_audio",file)}
                showNotification={showNotification}
                downloadAttachments={(jobAttachments.audio_brief)?(jobAttachments.audio_brief):(null)}
                jobId="J492KY"
               ></CandidateFileDragDrop>
               {
                errors.candidateAudio && (<span className='text-red-500 text-sm'>{errors.candidateAudio}</span>)
               }
               <CandidateFileDragDrop
                onFileUpload={(file)=>handleAttachments("other_file",file)}
                fileTitle="Other Files"
                fileId="otherfiles"
                accepted="image/jpeg, image/png, application/pdf, video/mpeg, video/mp4, audio/wav, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                showNotification={showNotification}
                downloadAttachments={(jobAttachments.other_docs)?(jobAttachments.other_docs):(null)}
                jobId="J492KY"
               ></CandidateFileDragDrop>
               {
                errors.otherFile && (<span className='text-red-500 text-sm'>{errors.otherFile}</span>)
               }
               </div>
             </div>
             <div className='flex w-[350px] flex-col gap-4'>
               <div className='flex flex-col gap-2'>
                 <h1 className='text-xl font-light'>Upload Candidate Consent Proof <span className='text-red-400'>*</span></h1>
                 <p className='text-sm font-light text-gray-400'>Please upload a copy or screenshot of the confirmation by the Candidate to apply for this job (either on Email, Social Media or Phone Messaging)</p>
               </div>
               {
                (!consetProof)?(
                <>
                <div onDragOver={handleDragOver} onDrop={handleDrop}  className='w-full cursor-pointer h-28 rounded-md bg-blue-100 border-blue-400 flex justify-center items-center border border-dashed'>
                   <div className='flex gap-2'>
                     <span className='text-blue-400'><CloudUploadOutlinedIcon></CloudUploadOutlinedIcon></span>
                     <label className='cursor-pointer' htmlFor='conset_proof'>Drag and drop or Browse your file</label>
                     <input
                     onChange={handleFileChange}
                     type='file'
                     className='hidden'
                     id='conset_proof'
                     ></input>
                   </div>
                   
               </div>
               {
                errors.consetProof && <span className='text-sm text-red-500'>{errors.consetProof}</span>
               }
               
               </>
               ):(
                <div className='border items-center px-2 py-4 rounded-md flex justify-between'>
                  <div className='flex gap-2 items-center'>
                      <div className='h-10 w-10 bg-blue-100 rounded-full flex justify-center items-center'><span className='text-blue-500'><InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon></span></div>
                      <span className='text-sm text-gray-400'>{consetProof.name}</span>
                  </div>
                  <span onClick={()=>setConsetProof(null)} className='text-red-400 cursor-pointer'><DeleteOutlineOutlinedIcon style={{fontSize:"1.7rem"}}></DeleteOutlineOutlinedIcon></span>
               </div>
               )
               }
             </div>
          </div>
         
        </div>
        <hr></hr>

       <div className='flex flex-col mt-4 mb-8'>
        <div className='w-full p-2 px-4 bg-blue-100 rounded-md flex my-1 gap-4 '>
           <input
           name='candidatetoc'
           checked={formData.candidatetoc}
           onChange={handleFormData}
           type='checkbox'
           ></input>
           <p className='text-[14px]'>I certify that I have spoken to this candidate and he/she is ready for this opportunity.<br></br>
           Further the candidate has no objection in my sharing his or her resume.</p>
        </div>
        {
          errors.candidateToc  && <span className='text-sm text-red-500'>{errors.candidateToc}</span>
        }
         
        </div>

        <div className='shadow rounded-md flex w-[1300px] place-content-end fixed bottom-0 bg-white px-6 py-2'>
          <div className='flex gap-2'>
            <button className='py-1 px-4 text-base hover:bg-slate-100 transition-all rounded-sm text-black'>Cancel</button>
            <button onClick={handleNext} className='py-1 px-4 text-base hover:bg-blue-400 bg-blue-500 rounded-sm text-white'>Next</button>
          </div>
        </div>
    </div>
    </>
  )
}
