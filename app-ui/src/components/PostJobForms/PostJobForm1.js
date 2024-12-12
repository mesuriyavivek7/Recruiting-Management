import React, { useContext, useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { AuthContext } from "../../context/AuthContext";
import Notification from "../Notification";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostJobForm1 = ({ onNext, onFormDataChange,jobId,handleDraftSave,parentFormData}) => {
  const {user}=useContext(AuthContext)
  const domainOptions = [
    "Accounting/Corporate Finance",
    "Administrative/Generalist",
    "Advertising/Event Management/PR/MR",
    "Aerospace",
    "Agriculture/Dairy/Fishing",
    "Allied Healthcare",
    "Architecture/Interior Design",
    "Automotive/Ancillaries",
    "Information technology (IT)",
    "Legal/Law/Secretarial",
    "Logistics/Supply Chain",
    "Maid Services",
    "Manufacturing/Industrial/Production/Machinery",
    "Petroleum/Oil & Gases/Energy/Utilities",
    "Pharmaceuticals/Biotechnology/Clinical Research",
    "Real Estate/Property",
    "Banking/Financial Services/Insurance",
    "BPO/KPO/ITES/CRM/Transcription/E-Learning",
    "Broadcasting",
    "Chemicals/Fertilizers/Polymer/Plastic/Rubber",
    "Communication/Telcom/ISP",
    "Construction/Cement/Metals/Infrastructure",
    "Consulting/Strategy",
    "Courier/Freight/Transportation",
    "Food Processing/Beverages/Nutrition",
    "Hardware/Chip Design & Embedded Software",
    "HealthCare -Doctors/Surgeons/physicians",
    "Healthcare- Hospital Administration",
    "Healthcare- Nurses & Support Workers",
    "Hospitality/Airlines/Travel/Tourism",
    "Human Resources/Talent Acquisition",
    "Information security/Cyber Security/IT security and Audit",
    "Shipping/Marine",
  ];
  
  const [actionMode,setActionMode]=useState({next:false,draft:false})

  const [draftSaveLoader,setDraftSaveLoader] = useState(false)

  const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
    setNotification({message,type})
  }
  
  const [formData, setFormData] = useState({
    jobTitle: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.job_title):(""),
    jobDescription: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.job_description):(""),
    remoteWork: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.permanent_remote_work):(false),
    country:  (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.country):(""),
    state:  (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.state):(""),
    city: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.city):([]),
    domain:  (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.job_domain):(""),
    positions:  (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.positions):(""),
    minExperience:(Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.experience.minexp):(""),
    maxExperience: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.experience.maxexp):(""),
    jobId: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.ext_job_id):(""),
    managersEmail: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.hiring_managers):(""),
    shareSalaryDetails: (Object.keys(parentFormData.form1).length>0)?(parentFormData.form1.share_salary_details):(false),
  });
 

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("")

  

 
  useEffect(() => {
    const getCountryId=()=>{
      if(Object.keys(parentFormData.form1).length>0){
         let countryname=parentFormData.form1.country
         for (let i of countries){
          if(i.country_name===countryname){
              setSelectedCountry(parseInt(i.country_id))
              break;
          }
        }
      }
    }


    const getStateId=()=>{
      if(Object.keys(parentFormData.form1).length>0){
        let statename=parentFormData.form1.state
        for(let i of states){
          if(i.state_name===statename){
            setSelectedState(parseInt(i.state_id))
            break;
          }
        }
      }
    }

    getCountries();
    getStates();
    getCities();
    getCountryId()
    getStateId()
  }, []);


  useEffect(()=>{
    const getCountryId=()=>{
      if(Object.keys(parentFormData.form1).length>0){
         let countryname=parentFormData.form1.country
         for (let i of countries){
          if(i.country_name===countryname){
              setSelectedCountry(parseInt(i.country_id))
              break;
          }
        }
      }
    }

    getCountryId()
  },[countries])

  useEffect(()=>{
    const getStateId=()=>{
      if(Object.keys(parentFormData.form1).length>0){
        let statename=parentFormData.form1.state
        for(let i of states){
          if(i.state_name===statename){
            setSelectedState(parseInt(i.state_id))
            break;
          }
        }
      }
    }

    getStateId()
  },[states])

  const getCountries = async () => {
    try {
      const response = await fetch("/tbl_country.json");
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      console.log("Error while fetching countries", error);
    }
  };

  const getStates = async () => {
    try {
      const response = await fetch("/tbl_state.json");
      const result = await response.json();
      setStates(result);
    } catch (error) {
      console.log("Error while fetching states", error);
    }
  };

  const getCities = async () => {
    try {
      const response = await fetch("/tbl_city.json");
      const result = await response.json();
      setCities(result);
    } catch (error) {
      console.log("Error while fetching cities", error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountryId = parseInt(event.target.value);
    setSelectedCountry(selectedCountryId);
    setSelectedState("");
    for (let i of countries) {
      if (parseInt(i.country_id) === selectedCountryId) {
        setFormData((prevData) => ({ ...prevData, country: i.country_name }));
        break;
      }
    }
  };

  const handleStateChange = (event) => {
    const selectedStateId = parseInt(event.target.value);
    setSelectedState(selectedStateId);
    for (let i of states) {
      if (parseInt(i.state_id) === selectedStateId) {
        setFormData((prevData) => ({ ...prevData, state: i.state_name }));
        break;
      }
    }
  };

  const handleCityChange = (selectedList) => {
      setFormData((prev)=>({...prev,city:selectedList}))
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required.";
    else if(formData.jobTitle.length<10) newErrors.jobTitle="Job Title must be at least 10 characters"
    if (!formData.jobDescription || getTextLength(formData.jobDescription) < 100)
      newErrors.jobDescription = "Job Description must be at least 100 characters.";
    else if (formData.jobDescription.length>65000) newErrors.jobDescription="Max length of character for job description is 650000."
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.domain) newErrors.domain = "Job Domain is required.";
    if (!formData.positions) newErrors.positions="Job Positions is required."
    else if (formData.positions<=0) newErrors.positions="Number of Position field should be greater than 0."
    if(!formData.minExperience || !formData.maxExperience) newErrors.experience="Min or Max Experience is required."
    else if (formData.minExperience && formData.maxExperience && formData.minExperience > formData.maxExperience)
      newErrors.experience = "Max Experience cannot be less than Min Experience.";
    else if (formData.minExperience<=0) newErrors.experience="Minimum value is 0 for min experience."
    else if (formData.maxExperience<=0) newErrors.experience= "Maximum Experience should be greater than 0."
    setErrors(newErrors);
    if(Object.keys(newErrors).length>0) showNotification("Please fill out appropriate input fields..!","failure")
    return Object.keys(newErrors).length === 0;
  };

 useEffect(()=>{
  const handleParentFormDataChange=()=>{
    if((actionMode.next===true || actionMode.draft===true) && validate()){
      onFormDataChange({
        enterprise_id:user.enterprise_id,
        job_id:jobId,
        job_title:formData.jobTitle,
        job_description:formData.jobDescription,
        permanent_remote_work:formData.remoteWork,
        country:formData.country,
        state:formData.state,
        city:formData.city,
        job_domain:formData.domain,
        positions:formData.positions,
        experience:{minexp:formData.minExperience,maxexp:formData.maxExperience},
        ext_job_id:formData.jobId,
        hiring_managers:formData.managersEmail,
        share_salary_details:formData.shareSalaryDetails
      })
   }
  }

   handleParentFormDataChange()
 },[actionMode])

 useEffect(()=>{
    if(actionMode.draft) handleDraft()
    else if(actionMode.next) handleNext()
    setActionMode({next:false,draft:false})
 },[parentFormData])

  const handleNext = async () => {
      console.log("handle next method called")
      onNext()
  };

  const handleDraft=async ()=>{
       setDraftSaveLoader(true)
       const saved=await handleDraftSave()
       setDraftSaveLoader(false)
       if(saved) showNotification("Job Draft Saved Sucessfully","success")
       else showNotification("There is something wrong in save draft","failure")
  }

  const getTextLength=(htmlContent)=>{
    const div=document.createElement('div')
    div.innerHTML=htmlContent
    const text=div.textContent || div.innerText || ''
    return text.length
 }
 
 const handleDescription= (newContent)=>{
      setFormData((prevData)=>({...prevData,jobDescription:newContent}))
 }

  //moduels and formate for quill text editor
  const modules={
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'color': [] }], // Add color and background color options                             
  ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline','color',
    'list', 'bullet', 'indent', // Include color and background in formats
    ];

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div mx-3 w-full relative">
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Job Profile*</p>
            <p className="text-[13px] w-10/12 leading-4 text-gray-500">
              Provide a Job Title and Job Description.
            </p>
          </div>
          <form className="custom-div pb-16 flex-col gap-6 w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="jobTitle" className="input-label">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                className="input-field"
                value={formData.jobTitle}
                onChange={handleChange}
              />
              {errors.jobTitle && <p className="text-red-600 text-xs">{errors.jobTitle}</p>}
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="jobDescription" className="input-label">
                Job Description
                <span className="text-green-700">(65000 Characters Maximum)</span>
              </label>
              {errors.jobDescription && <p className="text-red-600 text-xs">{errors.jobDescription}</p>}
               <ReactQuill 
                style={{height:'200px'}}
                value={formData.jobDescription}
                onChange={newContent=>handleDescription(newContent)}
                modules={modules}
                formats={formats}
                theme="snow"
                />
              
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg">Job Location & Experience</p>
          </div>
          <form className="custom-div flex-col gap-6 w-8/12 p-6">
            <div>
              <label htmlFor="remoteWork" className="text-sm">
                <input
                  type="checkbox"
                  name="remoteWork"
                  id="remoteWork"
                  className="mr-2"
                  checked={formData.remoteWork}
                  onChange={handleChange}
                />
                Permanent Remote Working
              </label>
            </div>
            <div className="w-full flex gap-4 mt-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="country" className="input-label">
                  Country <span className="text-orange-800">*</span>
                </label>
                <select
                  name="country"
                  id="country"
                  className="input-field custom-select"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id}  value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-600 text-xs">{errors.country}</p>}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="state" className="input-label">
                  State <span className="text-orange-800">*</span>
                </label>
                <select
                  name="state"
                  id="state"
                  value={selectedState}
                  className="input-field custom-select"
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {states
                    .filter((state) => parseInt(state.country_id) === selectedCountry)
                    .map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                </select>
                {errors.state && <p className="text-red-600 text-xs">{errors.state}</p>}
              </div>
            </div>
            <div className="flex-start gap-2 w-full">
              <label htmlFor="city" className="input-label">
                City <span className="text-orange-800">*</span>
              </label>
              <Multiselect
                    style={{
                      multiselectContainer: {
                        "width":"400px",
                      },
                      inputField:{
                        "width":"100%",
                        "color":"black"
                      },
                      chips:{
                        "backgroundColor":"gray"
                      },
                      option:{
                        "backgroundColor":"white",
                        "color":"black"
                      }
                    }}
                    id="city"
                    isObject={false}
                    selectedValues={formData.city}
                    onRemove={handleCityChange}
                    onSelect={handleCityChange}
                    placeholder="Select Cities"
                    options={cities
                  .filter((city) => parseInt(city.state_id) === selectedState)
                  .map((city) => (
                    city.city_name
                  ))}
                 />
             
              {errors.city && <p className="text-red-600 text-xs">{errors.city}</p>}
            </div>
            <div className="flex-start gap-2 w-full">
              <label htmlFor="domain" className="input-label">
                Job Domain*
              </label>
              <select
                name="domain"
                id="domain"
                className="input-field"
                value={formData.domain}
                onChange={handleChange}
              >
                <option value="">Select Domain</option>
                {domainOptions.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              {errors.domain && <p className="text-red-600 text-xs">{errors.domain}</p>}
            </div>
            <div className="w-full relative flex flex-col gap-2">
               <label htmlFor="positions" className="input-label">
                Positions*
               </label>
               <input
               id="positions"
               type="number"
               name="positions"
               placeholder="Ex. 5"
               className="input-field"
               value={formData.positions}
               onChange={handleChange}
               ></input>
               {errors.positions && <p className="text-red-600 text-xs">{errors.positions}</p>}
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="experience" className="input-label">
                Experience*
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="minExperience"
                  id="minExperience"
                  className="input-field"
                  placeholder="Min years"
                  value={formData.minExperience}
                  onChange={handleChange}
                />
                to
                <input
                  type="number"
                  name="maxExperience"
                  id="maxExperience"
                  className="input-field"
                  placeholder="Max years"
                  value={formData.maxExperience}
                  onChange={handleChange}
                />
              </div>
              {errors.experience && <p className="text-red-600 text-xs">{errors.experience}</p>}
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Other Details</p>
          </div>
          <form className="custom-div flex-col gap-6 w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="jobId" className="input-label">
                External Job ID
              </label>
              <input
                type="number"
                name="jobId"
                id="jobId"
                className="input-field"
                placeholder="Ex. 19393"
                value={formData.jobId}
                onChange={handleChange}
              />
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="managersEmail" className="input-label">
                Share with Hiring Manager(s)
              </label>
              <input
                type="email"
                id="managersEmail"
                name="managersEmail"
                placeholder="Enter Hiring Manager Email ID(s)"
                className="input-field"
                value={formData.managersEmail}
                onChange={handleChange}
              />
            </div>
            <div className="flex place-items-center gap-4 mt-2">
              <input
                type="checkbox"
                id="shareSalaryDetails"
                name="shareSalaryDetails"
                checked={formData.shareSalaryDetails}
                onChange={handleChange}
              />
              <label htmlFor="shareSalaryDetails" className="input-label">
                Share salary details <br /> Check this box if you want to share
                salary details with the Hiring Manager
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="custom-div place-items-end pb-2">
        <div className="flex gap-4">
         <button 
          disabled={draftSaveLoader}
          onClick={()=>setActionMode({next:false,draft:true})}
          className="text-white py-1.5 w-36 bg-black flex justify-center items-center px-4 disabled:cursor-not-allowed border-gray-200 hover:bg-gray-600 border-2">
                 {
                  draftSaveLoader ? (
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
          className="py-1.5 px-4 text-base bg-blue-400 rounded-sm text-white"
          onClick={()=>setActionMode({next:true,draft:false})}
         >
           Next
         </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostJobForm1;
