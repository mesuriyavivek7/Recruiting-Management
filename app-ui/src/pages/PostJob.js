import React, { useContext, useEffect, useState } from "react";
import PostJobForm1 from "../components/PostJobForms/PostJobForm1";
import PostJobForm2 from "../components/PostJobForms/postjobform2";
import PostJobForm3 from "../components/PostJobForms/PostJobForms3";
import PostJobForm4 from "../components/PostJobForms/PostJobForm4";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PostJobForm5 from "../components/PostJobForms/PostJobForm5";

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
    form4: {attachments:{}},
    form5: {},
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
      const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job`,{job_id:jobId,enterprise_id:user.enterprise_id,enterprise_member_id:user._id,isDraft:true,job_status:"Draft"})

      //step-2 create job basic details
      if(Object.keys(formData.form1).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/basicjob/${res.data._id}`,formData.form1)
         
      //step-3 create job commission details
      if(Object.keys(formData.form2).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/jobcommission/${res.data._id}`,formData.form2)

      //step-4 craete job company details
      if(Object.keys(formData.form3).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/company/${res.data._id}`,formData.form3)

      //step-5 craete sourcing guidelines
      if(Object.keys(formData.form4).length>0){
           let {enterprise_id,job_id,must_haves,poach_clients,nice_to_haves,target_companies,additional_guidelines}=formData.form4
           const sourcing={enterprise_id,job_id,must_haves,poach_clients,...((nice_to_haves!=="")?({nice_to_haves}):({})),...((target_companies!=="")?({target_companies}):({})),...((additional_guidelines!=="")?({additional_guidelines}):({}))}
           await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/sourcing/${res.data._id}`,sourcing)
      }

      //step-6 create job attachments
      if(Object.keys(formData.form4.attachments).length>0){
          
          const fileData=new FormData()
          if(formData.form4.attachments.sample_cv) fileData.append('sample_cv',formData.form4.attachments.sample_cv)
          if(formData.form4.attachments.evaluation_form) fileData.append('evaluation_form',formData.form4.attachments.evaluation_form)
          if(formData.form4.attachments.audio_brief) fileData.append('audio_brief',formData.form4.attachments.audio_brief)
          if(formData.form4.attachments.other_docs) fileData.append("other_docs",formData.form4.attachments.other_docs)

          if([...fileData.entries()].length!==0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/uploadjobdocs/${jobId}`,fileData,{headers:{"Content-Type":'multipart/form-data'}})
      }
      
      //step-7 create job screening questions
      if(Object.keys(formData.form5).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/jobsq/${res.data._id}`,formData.form5)

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

  const handleSubmit = async() => {

    try{
      //step-1 create job
      const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job`,{job_id:jobId,enterprise_id:user.enterprise_id,enterprise_member_id:user._id,isDraft:false,job_status:"Pending"})

      //step-2 create job basic details
      if(Object.keys(formData.form1).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/basicjob/${res.data._id}`,formData.form1)
         
      //step-3 create job commission details
      if(Object.keys(formData.form2).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/jobcommission/${res.data._id}`,formData.form2)

      //step-4 craete job company details
      if(Object.keys(formData.form3).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/company/${res.data._id}`,formData.form3)

      //step-5 craete sourcing guidelines
      if(Object.keys(formData.form4).length>0){
           let {enterprise_id,job_id,must_haves,poach_clients,nice_to_haves,target_companies,additional_guidelines}=formData.form4
           const sourcing={enterprise_id,job_id,must_haves,poach_clients,...((nice_to_haves!=="")?({nice_to_haves}):({})),...((target_companies!=="")?({target_companies}):({})),...((additional_guidelines!=="")?({additional_guidelines}):({}))}
           await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/sourcing/${res.data._id}`,sourcing)
      }

      //step-6 create job attachments
      if(Object.keys(formData.form4.attachments).length>0){
          
          const fileData=new FormData()
          if(formData.form4.attachments.sample_cv) fileData.append('sample_cv',formData.form4.attachments.sample_cv)
          if(formData.form4.attachments.evaluation_form) fileData.append('evaluation_form',formData.form4.attachments.evaluation_form)
          if(formData.form4.attachments.audio_brief) fileData.append('audio_brief',formData.form4.attachments.audio_brief)
          if(formData.form4.attachments.other_docs) fileData.append("other_docs",formData.form4.attachments.other_docs)

          if([...fileData.entries()].length!==0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/uploadjobdocs/${jobId}`,fileData,{headers:{"Content-Type":'multipart/form-data'}})
      }
      
      //step-7 create job screening questions
      if(Object.keys(formData.form5).length>0) await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/jobsq/${res.data._id}`,formData.form5)

      //step-8 delete job draft
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/job/deletejobdraft/${jobId}`)

      //step-9 getting account manager for particuler enterprise
      const acmanagerdata=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterprise/acmanager/${user.enterprise_id}`)
      console.log('Account manager----->',acmanagerdata)

      //step-10 updated job with allocated account manager
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/allotacmanager/${res.data._id}`,{ac_id:acmanagerdata.data})

      //step-11 allocated job to account manager
      await axios.post(`${process.env.REACT_APP_API_ADMIN_URL}/accountmanager/addpendingjob`,{ac_id:acmanagerdata.data,orgjobid:res.data._id})
    
       
      //job posted
      return true;
    }catch(err){
      //job posting failure
      console.log(err)
      return false;
    }
      
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
            jobid={jobId}
            handleDraftSave={handleDraftSave}
            parentFormData={formData}
          />
        );
      case 4:
        return (
          <PostJobForm4
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form4', data)}
            jobid={jobId}
            handleDraftSave={handleDraftSave}
            parentFormData={formData}
          />
        );
      case 5:
        return (
          <PostJobForm5
            onSubmit={handleSubmit}
            onPrev={handlePrev}
            onFormDataChange={(data)=> handleFormData('form5',data)}
            jobid={jobId}
            handleDraftSave={handleDraftSave}
            parentFormData={formData}
          />
        )
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
          <p className={stepClass(5)}>Screening Questions</p>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

export default PostJob;
