import React, { useContext, useEffect, useState } from "react";
import FileDragDrop from "../FileDragDrop";
import { ReactComponent as UploadIcon } from "../../assets/asset34.svg";
import Notification from "../Notification";
import { AuthContext } from "../../context/AuthContext";

const PostJobForm4 = ({ onNext,onPrev,onFormDataChange,jobid,handleDraftSave,parentFormData}) => {
  const [action,setAction]=useState({next:false,prev:false})
  const [load,setLoad]=useState(false)
  const {user}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    mustHaves: (Object.keys(parentFormData.form4).length>0)?(parentFormData.form4.must_haves):(""),
    noPoachClients: (Object.keys(parentFormData.form4).length>0)?(parentFormData.form4.poach_clients):(""),
    niceToHaves:(Object.keys(parentFormData.form4).length>0)?(parentFormData.form4.nice_to_haves):(""),
    targetCompanies: (Object.keys(parentFormData.form4).length>0)?(parentFormData.form4.target_companies):(""),
    additionalGuidelines: (Object.keys(parentFormData.form4).length>0)?(parentFormData.form4.additional_guidelines):(""),
    attachments: {
      sampleCV: (Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.sample_cv):(null),
      candidateEvaluationForm: (Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.evaluation_form):(null),
      audioBriefing: (Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.audio_brief):(null),
      otherFiles: (Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.other_docs):(null),
    }
  });


  const [errors, setErrors] = useState({});

   //for showing notification
   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
    setNotification({message,type})
  }

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
    if (!formData.mustHaves) newErrors.mustHaves = "Must Haves field is required.";
    if (!formData.noPoachClients) newErrors.noPoachClients = "No Poach Clients field is required.";
    setErrors(newErrors);
    if(Object.keys(newErrors).length>0) showNotification("Please fill out appropriate input fields...!","failure")
    return Object.keys(newErrors).length === 0;
  };

  const handleParentFormData=()=>{
    if(validate()){
      onFormDataChange({
        enterprise_id:user.enterprise_id,
        job_id:jobid,
        must_haves:formData.mustHaves,
        poach_clients:formData.noPoachClients,
        nice_to_haves:formData.niceToHaves,
        target_companies:formData.targetCompanies,
        additional_guidelines:formData.additionalGuidelines,
        attachments:{
          ...parentFormData.form4.attachments,
          sample_cv:formData.attachments.sampleCV,
          evaluation_form:formData.attachments.candidateEvaluationForm,
          audio_brief:formData.attachments.audioBriefing,
          other_docs:formData.attachments.otherFiles
        }
      })
    }
  }

  useEffect(()=>{
    if(action.next===true) handleNext()
    else if(action.draft===true) handleDraft() 
    setAction({next:false,draft:false})
  },[parentFormData])

  useEffect(()=>{
    if(action.next===true || action.draft===true) handleParentFormData()
  },[action])

  const handleDraft=async ()=>{
    setLoad(true)
    const saved=await handleDraftSave()
    if(saved) showNotification("Job Draft Saved Successfully","success")
    else showNotification("There is something wrong in save draft","failure")
    setLoad(false)
    // console.log("draft saved")
  }

  const handlePrev=()=>{
    onPrev()
  }

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
    }

    // console.log("next trigger")
  };

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className="flex flex-col gap-2 relative w-8/12 mx-auto">
      <div className="custom-div mx-3 w-full relative">
        <form className="w-full relative flex flex-col gap-8 mt-4">
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
                fileuploadspan="PDF, DOC, DOCX of up to 10MB, Tables and Images will be ignored."
                onFileUpload={(file) => handleFileUpload("sampleCV", file)}
                fileId="samplecv"
                accepted=".pdf,.docx,.doc"
                showNotification={showNotification}
                existfile={(Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.sample_cv):(null)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Candidate Evaluation Form</label>
              <FileDragDrop
                fileuploadname="Candidate Evaluation Form"
                fileuploadspan="PDF, DOC, DOCX of up to 10MB, Tables and Images will be ignored."
                onFileUpload={(file) => handleFileUpload("candidateEvaluationForm", file)}
                fileId="evaluationform"
                accepted=".pdf,.docx,.doc"
                showNotification={showNotification}
                existfile={(Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.evaluation_form):(null)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Audio Briefing by Client</label>
              <FileDragDrop
                fileuploadname="Audio Briefing by Client"
                fileuploadspan="MPEG, MP4 And WAV of up to 10MB, Tables and Images will be ignored."
                onFileUpload={(file) => handleFileUpload("audioBriefing", file)}
                fileId="audio"
                accepted="video/mpeg, video/mp4, audio/wav"
                showNotification={showNotification}
                existfile={(Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.audio_brief):(null)}
              />
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Upload other files</label>
              <FileDragDrop
                fileuploadname="Upload other files"
                fileuploadspan="JPEG, PNG, PDF,MPEG, MP4, WAV, Word and Excel of up to 10MB, Tables and Images will be ignored."
                onFileUpload={(file) => handleFileUpload("otherFiles", file)}
                fileId="other"
                accepted="image/jpeg, image/png, application/pdf, video/mpeg, video/mp4, audio/wav, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                showNotification={showNotification}
                existfile={(Object.keys(parentFormData.form4.attachments).length>0)?(parentFormData.form4.attachments.other_docs):(null)}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="custom-div place-items-end pb-2 mx-3 w-full">
       <div className="flex gap-2">
           <button 
             disabled={load}
             onClick={()=>setAction({next:false,draft:true})}
             className="text-white w-36 bg-black flex justify-center items-center disabled:cursor-not-allowed disabled:opacity:50 py-1.5 px-4 border-gray-200 hover:bg-gray-600 border-2">
             {
              load ? (
                <svg className="w-5 h-5  text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                </svg> 
              ) : (
                "Save As Draft"
              )
             }
          </button>
          <button 
           disabled={load}
           className="py-1.5 px-4 text-gray-400 hover:bg-gray-100 rounded-sm border"
           onClick={handlePrev}
          >previous</button>
          <button
            disabled={load}
            className="py-1.5 px-4 text-base bg-blue-400 rounded-sm text-white"
            onClick={()=>setAction({next:true,draft:false})}
          >
            Next
          </button>
       </div>
      </div>
    </div>
    </>
  );
};

export default PostJobForm4;
