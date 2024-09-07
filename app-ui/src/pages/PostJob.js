import React, { useContext, useEffect, useState } from "react";
import PostJobForm1 from "../components/PostJobForms/PostJobForm1";
import PostJobForm2 from "../components/PostJobForms/postjobform2";
import PostJobForm3 from "../components/PostJobForms/PostJobForms3";
import PostJobForm4 from "../components/PostJobForms/PostJobForm4";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PostJob = () => {
  const {user}=useContext(AuthContext)
  const [currentStep, setCurrentStep] = useState(1);

  const [jobId,setJobId]=useState(null)

  const handleJobId=()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 5;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    result='J'+result;
    setJobId(result)

  }

  useEffect(()=>{
    handleJobId()
  },[])

  console.log(jobId)
  const [formData, setFormData] = useState({
    form1: {},
    form2: {
      work_details:{
         full_time:{},
         contract:{}
      },
      commission_details:{}
    },
    form3: {},
    form4: {},
  });

  console.log('allformdata------>',formData)

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormData = (formName, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [formName]: data,
    }));
  };

  //for saving job as draft
  const handleDraftSave=async ()=>{
    
    try{
      //step-1 create job
      const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job`,{job_id:jobId,enterprise_id:user.enterprise_id,enterprise_member_id:user._id})


      //step-2 create job basic details
      if(Object.keys(formData.form1).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/basicjob/${res.data._id}`,formData.form1)
         
      //step-3 create job commission details
      if(Object.keys(formData.form2).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/jobcommission/${res.data._id}`,formData.form2)

      //step- create job draft
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/savedraft`,{enterprise_id:user.enterprise_id,enterprise_member_id:user._id,job_id:res.data.job_id,org_job_id:res.data._id})
       
      //draft saved 
      return true;
    }catch(err){
      //draft failure
      console.log(err)
      return false;
    }

  }

  const handleSubmit = () => {
    // Combine all form data and handle submission
    const allData = { ...formData.form1, ...formData.form2, ...formData.form3, ...formData.form4 };
    console.log('All Form Data:', allData);
    // Perform actual submission here
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PostJobForm1
            onNext={handleNext}
            onFormDataChange={(data) => handleFormData('form1', data)}
            jobId={jobId}
            handleDraftSave={handleDraftSave}
            parentFormData={formData}
          />
        );
      case 2:
        return (
          <PostJobForm2
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form2', data)}
            jobid={jobId}
            handleDraftSave={handleDraftSave}
            parentFormData={formData}
          />
        );
      case 3:
        return (
          <PostJobForm3
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form3', data)}
          />
        );
      case 4:
        return (
          <PostJobForm4
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form4', data)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const stepClass = (step) => {
    return currentStep === step
      ? "text-purple-500 font-semibold"
      : "text-gray-500";
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div">
        <p className="text-2xl font-semibold">Post a Job</p>
        <div className="flex place-items-center gap-4">
          <p className={stepClass(1)}>Job Details</p>
          <p className={stepClass(2)}>Remuneration & Commission</p>
          <p className={stepClass(3)}>Company Details</p>
          <p className={stepClass(4)}>Sourcing Guidelines</p>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

export default PostJob;
