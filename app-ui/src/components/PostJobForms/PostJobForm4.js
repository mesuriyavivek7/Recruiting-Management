import React, { useState } from "react";
import FileDragDrop from "../FileDragDrop";
import { ReactComponent as UploadIcon } from "../../assets/asset34.svg";

const PostJobForm4 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    citizenshipStatus: "",
    mustHaves: "",
    noPoachClients: "",
    niceToHaves: "",
    targetCompanies: "",
    additionalGuidelines: "",
    attachments: {
      sampleCV: null,
      candidateEvaluationForm: null,
      audioBriefing: null,
      otherFiles: null,
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (name, file) => {
    setFormData((prevData) => ({
      ...prevData,
      attachments: {
        ...prevData.attachments,
        [name]: file,
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.citizenshipStatus) newErrors.citizenshipStatus = "Required Citizenship / Work Permit / Visa Status is required.";
    if (!formData.mustHaves) newErrors.mustHaves = "Must Haves field is required.";
    if (!formData.noPoachClients) newErrors.noPoachClients = "No Poach Clients field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative w-8/12 mx-auto">
      <div className="custom-div mx-3 w-full relative">
        <form className="w-full relative flex flex-col gap-8 mt-4">
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="citizenshipStatus" className="input-label">
              Required Citizenship / Work Permit / Visa Status*
            </label>
            <input
              type="text"
              id="citizenshipStatus"
              name="citizenshipStatus"
              className="input-field"
              value={formData.citizenshipStatus}
              onChange={handleChange}
            />
            {errors.citizenshipStatus && <p className="text-red-600 text-xs">{errors.citizenshipStatus}</p>}
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="mustHaves" className="input-label">
              Must Haves*
            </label>
            <textarea
              id="mustHaves"
              name="mustHaves"
              className="input-field"
              placeholder="Type must have skills here"
              rows={4}
              value={formData.mustHaves}
              onChange={handleChange}
            />
            {errors.mustHaves && <p className="text-red-600 text-xs">{errors.mustHaves}</p>}
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="noPoachClients" className="input-label">
              No Poach Clients (Plus other strict No-Nos)*
            </label>
            <textarea
              id="noPoachClients"
              name="noPoachClients"
              className="input-field"
              rows={4}
              value={formData.noPoachClients}
              onChange={handleChange}
            />
            {errors.noPoachClients && <p className="text-red-600 text-xs">{errors.noPoachClients}</p>}
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="niceToHaves" className="input-label">
              Nice to Haves
            </label>
            <textarea
              id="niceToHaves"
              name="niceToHaves"
              className="input-field"
              placeholder="Type nice to have skills here"
              rows={4}
              value={formData.niceToHaves}
              onChange={handleChange}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="targetCompanies" className="input-label">
              Target Companies
            </label>
            <textarea
              id="targetCompanies"
              name="targetCompanies"
              className="input-field"
              placeholder="Type target companies here"
              rows={4}
              value={formData.targetCompanies}
              onChange={handleChange}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="additionalGuidelines" className="input-label">
              Additional Guidelines
            </label>
            <textarea
              id="additionalGuidelines"
              name="additionalGuidelines"
              className="input-field"
              placeholder="Type or use suggested tags below"
              rows={4}
              value={formData.additionalGuidelines}
              onChange={handleChange}
            />
          </div>
          <div className="w-full relative">
            <p className="text-2xl font-semibold">Attachments</p>
            <div className="flex gap-3 place-items-center w-full bg-blue-200 bg-opacity-40 p-2 rounded-sm mt-4">
              <UploadIcon className="text-blue-400 w-5" />
              <p className="text-blue-400 text-sm">Employee Value Proposition</p>
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-4">
              <label className="input-label font-semibold">Sample CV</label>
              <FileDragDrop
                fileuploadname="Upload Sample CV"
                onFileUpload={(file) => handleFileUpload("sampleCV", file)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Candidate Evaluation Form</label>
              <FileDragDrop
                fileuploadname="Candidate Evaluation Form"
                onFileUpload={(file) => handleFileUpload("candidateEvaluationForm", file)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Audio Briefing by Client</label>
              <FileDragDrop
                fileuploadname="Audio Briefing by Client"
                onFileUpload={(file) => handleFileUpload("audioBriefing", file)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Upload other files</label>
              <FileDragDrop
                fileuploadname="Upload other files"
                onFileUpload={(file) => handleFileUpload("otherFiles", file)}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="custom-div place-items-end pb-2 mx-3 w-full">
        <button
          className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostJobForm4;
