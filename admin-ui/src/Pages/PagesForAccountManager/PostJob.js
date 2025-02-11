import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostJobForm1 from "../../Components/jobForm/PostJobForm1";
import PostJobForm2 from "../../Components/jobForm/PostJobForm2";
import PostJobForm3 from "../../Components/jobForm/PostJobForm3";
import PostJobForm4 from "../../Components/jobForm/PostJobForm4";
import PostJobForm5 from "../../Components/jobForm/PostJobForm5";

import axios from "axios";
import Loader from "../../assets/whiteloader.svg";


function PostJob() {
  const { userData } = useSelector((state) => state.admin);
  const [currentStep, setCurrentStep] = useState(1);
  const [jobId, setJobId] = useState(null);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    form1: {},
    form2: {
      work_details: {
        full_time: {},
        contract: {},
      },
      commission_details: {},
    },
    form3: {},
    form4: { attachments: {} },
    form5: {},
  });

  const handleJobId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const length = 5;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    result = "J" + result;
    setJobId(result);
  };

  //custome box stiling
  const boxStyle = {
      animation: 'colorChange 5s infinite',
  };
    

  useEffect(() => {
    if (!jobId) handleJobId();
  }, []);

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

  const getUploadFiles=(fileObj)=>{
    let newFile=new FormData()
    for(let [key,value] of Object.entries(fileObj)){
       if(key!=="savedDraft"){
         if(fileObj[key] && !fileObj[key].savedDraft) newFile.append(key,value)
       }
    }
    return newFile
  }

  const getRevertChanges = async () =>{
     try{
       //step-1 delete job details
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/${jobId}`)

       //Step-2 delete job basic details
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobbasicdetails/${jobId}`)

       //Step-3 delete job commission details
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobcommission/${jobId}`)

       //Step-4 delete job company info
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobcompany/${jobId}`)

       //Step-5 delete job sourcing details
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobsourcing/${jobId}`)

       //Step-6 delete job attachments details
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobattachments/${jobId}`)

       //Step-7 delete job sqs
       await axios.delete(`${process.env.REACT_APP_API_APP_URL}/job/removejobsq/${jobId}`)

     }catch(err){
      console.log(err)
     }
  }

  const handleSubmit = async () => {
    try {
      //Step - 1 create job for manager
      const res = await axios.post(
        `${process.env.REACT_APP_API_APP_URL}/job`,
        {
          job_id: jobId,
          job_status: "Active",
        }
      );

      //Step - 2 create job basic details
      if (Object.keys(formData.form1).length > 0)
        await axios.post(
          `${process.env.REACT_APP_API_APP_URL}/job/basicjob/${res.data._id}`,
          formData.form1
        );

      //step-3 create job commission details
      if (Object.keys(formData.form2).length > 0)
        await axios.post(
          `${process.env.REACT_APP_API_APP_URL}/job/jobcommission/${res.data._id}`,
          formData.form2
        );

      //step-4 craete job company details
      if (Object.keys(formData.form3).length > 0)
        await axios.post(
          `${process.env.REACT_APP_API_APP_URL}/job/company/${res.data._id}`,
          formData.form3
        );

      //step-5 craete sourcing guidelines
      if (Object.keys(formData.form4).length > 0)
        await axios.post(
          `${process.env.REACT_APP_API_APP_URL}/job/sourcing/${res.data._id}`,
          formData.form4
        );

      //step-6 Create job attachments
      if(Object.keys(formData.form4.attachments).length>0){
         let fileData = getUploadFiles(formData.form4.attachments)
         if([...fileData.entries()].length!==0) await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/uploadjobdocs/${jobId}`,fileData,{headers:{"Content-Type":'multipart/form-data'}})
      }

      //step-7 create job screening questions
      if (Object.keys(formData.form5).length > 0)
        await axios.post(
          `${process.env.REACT_APP_API_APP_URL}/job/jobsq/${res.data._id}`,
          formData.form5
        );

      //Step-8 allocating job to acmanager
      await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/allocateacjobtoacmanager/${res.data._id}/${userData._id}`)

      return true;
    } catch (err) {
      await getRevertChanges()
      console.log(err);
      return false;
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PostJobForm1
            onNext={handleNext}
            onFormDataChange={(data) => handleFormData("form1", data)}
            jobId={jobId}
            parentFormData={formData}
          />
        );

      case 2:
        return (
          <PostJobForm2
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData("form2", data)}
            jobid={jobId}
            parentFormData={formData}
          />
        );

      case 3:
        return (
          <PostJobForm3
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData("form3", data)}
            jobid={jobId}
            parentFormData={formData}
          />
        );

      case 4:
        return (
          <PostJobForm4
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData("form4", data)}
            jobid={jobId}
            parentFormData={formData}
          />
        );

      case 5:
        return (
          <PostJobForm5
            onSubmit={handleSubmit}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData("form5", data)}
            jobid={jobId}
            parentFormData={formData}
          />
        );
      
      default:
        return null
    }
  };

  const stepClass = (step) => {
    return currentStep === step
      ? "text-purple-500 font-semibold"
      : "text-gray-500";
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {
        loader && (
          <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
          <div className="w-[500px] gap-4 flex flex-col items-center p-4 rounded-md bg-white">
            <div style={boxStyle} className="w-[450px] flex justify-center items-center rounded-sm h-60 border animation-color-change">
              <img src={Loader}></img>
            </div>
            <span className="text-xl text-gray-500">Wait For Some Few Seconds...</span>
          </div>
          <style>{`
        @keyframes colorChange {
          0%, 100% { background-color: #4F75FF; }  
          25% { background-color: #00CCDD; }       
          50% { background-color: #378CE7; }       
          75% { background-color: #96E9C6; }     
        }
      `}</style>
       </div>
        )
      }
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
  )
}

export default PostJob;
