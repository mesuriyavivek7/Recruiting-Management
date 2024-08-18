import React, { useState } from "react";
import PostJobForm1 from "../components/PostJobForms/PostJobForm1";
import PostJobForm2 from "../components/PostJobForms/postjobform2";
import PostJobForm3 from "../components/PostJobForms/PostJobForms3";
import PostJobForm4 from "../components/PostJobForms/PostJobForm4";

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    form1: {},
    form2: {},
    form3: {},
    form4: {},
  });
  const [errors, setErrors] = useState({});

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
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <PostJobForm2
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form2', data)}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 3:
        return (
          <PostJobForm3
            onNext={handleNext}
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form3', data)}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 4:
        return (
          <PostJobForm4
            onPrev={handlePrev}
            onFormDataChange={(data) => handleFormData('form4', data)}
            errors={errors}
            setErrors={setErrors}
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
