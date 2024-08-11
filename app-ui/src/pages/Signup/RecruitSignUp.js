import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import asset3 from "../../assets/asset 3.svg";
import asset4 from "../../assets/asset 4.svg";
import asset7 from "../../assets/asset 7.svg";
import asset8 from "../../assets/asset 8.svg";
import asset9 from "../../assets/asset 9.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Multiselect from 'multiselect-react-dropdown';

//importing axios
import axios from 'axios'




const RecruitSignUp = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobileno: "",
    company_name: "",
    company_size: "",
    designation: "",
    linkedin_url: "",
    firm_type: [],
    country: "",
    state: "",
    city: "",
    domains:[]
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [load,setLoad]=useState(false)

  useEffect(() => {
    getCountries();
    getStates();
    getCities();
  }, []);

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
    setSelectedState('');
    setSelectedCity('')
    for(let i of countries){
       if(parseInt(i.country_id)===selectedCountryId){
        setFormData((prevData) => ({ ...prevData, country: i.country_name}));
        break;
       }
    }
    
  };

  const handleStateChange = (event) => {
    const selectedStateId = parseInt(event.target.value);
    setSelectedState(selectedStateId);
    setSelectedCity('')
    for(let i of states){
      if(parseInt(i.state_id)===selectedStateId){
       setFormData((prevData) => ({ ...prevData, state: i.state_name}));
       break;
      }
   }
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    setSelectedCity(selectedCityId);
    for(let i of cities){
      if(parseInt(i.city_id)===selectedCityId){
       setFormData((prevData) => ({ ...prevData, city: i.city_name}));
       break;
      }
   }
  };

  const handleChange = (e) => {
    const { name, value, type,checked, options } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    }else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevData) => ({ ...prevData, [name]: selectedValues }));
    }else{
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const domainchange=(selectedList)=>{
       setFormData((prev)=>({...prev,domains:selectedList}))
  }


  
  const validateForm = () => {
    let newErrors = {};
    switch (activeState) {
      case 1:
        if (!formData.full_name) newErrors.name = "Full Name is required";
        if (!formData.email) newErrors.email = "Official Email is required";
        if (!formData.mobileno)
          newErrors.phoneNumber = "Phone Number is required";
        if(formData.mobileno.length<12) newErrors.phoneNumber="Phone Number is invalid";
        break;
      case 2:
        if (!formData.company_name) newErrors.company = "Company Name is required";
        if (!formData.company_size) newErrors.size = "Company Size is required";
        if (!formData.designation)
          newErrors.designation = "Designation is required";
        if (!formData.linkedin_url)
          newErrors.linkedinUrl = "LinkedIn Url is required";
        if (formData.firm_type.length === 0)
          newErrors.firm = "At least one Firm Type is required";
        break;
      case 3:
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.city) newErrors.city = "City is required";
        if (formData.firm_type.length === 0) newErrors.firm = "At least one Domain is required";
        if (formData.domains.length===0) newErrors.domains= "Please select up to 10 domains";
        
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setActiveState((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveState((prev) => prev - 1);
  };



 const onSubmission = async () =>{
   if(validateForm()){
       let newErrors={}
       setLoad(true)
       try{
       const recruitinguser=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/authrecruiting/register`,formData,{withCredentials:true})

       //sending mails for notify user
       const notifymail={
         to:formData.email,
         subject:"Welcome To Uphire",
         body:`<h1 style="text-align:center;color:green">UPHIRE</h1><br></br><br></br><p style="text-align:center;">You are now a part of the fastest-growing network of Recruiting firms in the world.Your credentials for accessing uphire dashboard platform are given below</p><br></br><br></br><span style="text-align:center;">username:</span><br></br><span style='text-align:center;'>${formData.email}</span><br></br><span style="text-align:center;">Password</span><br></br><span style="text-align:center;">cbrex</span>`
       }
       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendmail`,notifymail)

       //sending mail for email verification
       const emailverify={
         name:formData.full_name,
         email:formData.email
       }

       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverifymail`,emailverify)
       setLoad(false)
      
       //navigate user to kyc page
       navigate("/signup/supplier/kyc",{state:{recruiting_id:recruitinguser.data._id}})
      }catch(err){
        newErrors.internal="There is something wrong";
        setErrors(newErrors)
      }
   }
   

 }


  const renderFormStep = () => {
    switch (activeState) {
      case 1:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="name" className="input-label">
                  Full Name <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs my-2">{errors.name}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="email" className="input-label">
                  Official Email <span className="text-orange-800">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="phoneNumber" className="input-label">
                  Phone Number <span className="text-orange-800">*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.phoneNumber}
                  onChange={(phone) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      mobileno: phone,
                    }))
                  }
                  containerStyle={{ width: "100%" }}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-xs">{errors.phoneNumber}</p>
                )}
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl"
              >
                Next
              </button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="company" className="input-label">
                  Company Name <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  id="company"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.company && (
                  <p className="text-red-600 text-xs">{errors.company}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="size" className="input-label">
                  Company Size <span className="text-orange-800">*</span>
                </label>
                <select
                  name="company_size"
                  id="size"
                  value={formData.company_size}
                  onChange={handleChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Company Size</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
                {errors.size && (
                  <p className="text-red-600 text-xs">{errors.size}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="designation" className="input-label">
                  Designation <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.designation && (
                  <p className="text-red-600 text-xs">{errors.designation}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="linkedinUrl" className="input-label">
                  LinkedIn URL <span className="text-orange-800">*</span>
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  id="linkedinUrl"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.linkedinUrl && (
                  <p className="text-red-600 text-xs">{errors.linkedinUrl}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label className="input-label">
                  Firm Type(s) <span className="text-orange-800">*</span>
                </label>
                <div className="grid w-full grid-cols-2 gap-4">
                  <label>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Permanent Hiring"
                      checked={formData.firm_type.includes("Permanent Hiring")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Permanent Hiring</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Contract Staffing"
                      checked={formData.firm_type.includes("Contract Staffing")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Contract Staffing</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Executive Search"
                      checked={formData.firm_type.includes("Executive Search")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Executive Search</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Only Payrolling"
                      checked={formData.firm_type.includes("Only Payrolling")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Only Payrolling</span>
                  </label>
                </div>
                {errors.firm && (
                  <p className="text-red-600 text-xs">{errors.firm}</p>
                )}
              </div>
              <div className="flex gap-4 w-full ">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 my-3 border border-orange-800 text-orange-800 rounded-md text-xl"
                >
                  <img
                    src={asset7}
                    alt="previous-svg"
                    width={24}
                    className="inline-block mr-2 mb-1"
                  />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="country" className="input-label">
                  Country <span className="text-orange-800">*</span>
                </label>
                <select
                  name="country"
                  id="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-600 text-xs">{errors.country}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="state" className="input-label">
                  State <span className="text-orange-800">*</span>
                </label>
                <select
                  name="state"
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="input-field custom-select"
                >
                  <option value="">Select State</option>
                  {states
                    .filter(
                      (state) => parseInt(state.country_id) === selectedCountry
                    )
                    .map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                </select>
                {errors.state && (
                  <p className="text-red-600 text-xs">{errors.state}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="city" className="input-label">
                  City <span className="text-orange-800">*</span>
                </label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="input-field custom-select"
                >
                  <option value="">Select City</option>
                  {cities
                    .filter((city) => parseInt(city.state_id) === selectedState)
                    .map((city) => (
                      <option key={city.city_id}  value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))}
                </select>
                {errors.city && (
                  <p className="text-red-600 text-xs">{errors.city}</p>
                )}
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="city" className="input-label">
                  Domains (Select up to 10 Domains) <span className="text-orange-800">*</span>
                </label>
                <Multiselect
                    style={{
                      multiselectContainer: {
                        "width":"365px",
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
                    isObject={false}
                    onRemove={domainchange}
                    onSelect={domainchange}
                    placeholder="Select..."
                    options={[
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
                      "Information technology (IT)",
                      "Legal/Law/Secretarial",
                      "Logistics/Supply Chain",
                      "Maid Services",
                      "Manufacturing/Industrial/Production/Machinery",
                      "Petroleum/Oil & Gases/Energy/Utilities",
                      "Pharmaceuticals/Biotechnology/Clinical Research",
                      "Real Estate/Property",
                      "Shipping/Marine"
                   ]}
                 />
                {errors.domains && (
                  <p className="text-red-600 text-xs">{errors.domains}</p>
                )}
              </div>
              
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 my-3 border border-orange-800 text-orange-800 rounded-md text-xl"
                >
                  <img
                    src={asset7}
                    alt="previous-svg"
                    width={24}
                    className="inline-block mr-2 mb-1"
                  />
                  Back
                </button>
                <button
                  disabled={load}
                  type="button"
                  onClick={onSubmission}
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
              {
                errors.internal && (
                  <p className="text-red-600 text-xs">{errors.internal}</p>
                )
              }
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFormImage = () => {
    switch (activeState) {
      case 1:
        return (
          <img
            src={asset4}
            alt="form-step-1"
           className="relative p-20 h-full mx-auto"
          />
        );
      case 2:
        return (
          <img
            src={asset8}
            alt="form-step-2"
            className="relative p-20 h-full mx-auto"
          />
        );
      case 3:
        return (
          <img
            src={asset9}
            alt="form-step-3"
           className="relative p-20 h-full mx-auto"
          />
        );
      default:
        return null;
    }
  };


  return (
    <main>
      <div className="recruit-content-container h-screen flex relative overflow-hidden">
        <div className="recruit-form w-[38%] h-full overflow-y-scroll relative">
          <div className="w-8/12 h-full py-16 flex flex-col place-items-start mx-auto">
            <div className="flex flex-col place-items-start w-full">
              <img src={asset3} alt="company-logo" className="w-32" />
              <h1 className="text-3xl mt-8 font-medium text-gray-900 w-8/12 leading-9">
                Sign Up as a Recruiting Firm (Talent Supplier)
              </h1>
            </div>
            <div className="w-full relative flex gap-1 mt-5 place-items-center">
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 1 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 2 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 3 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
            </div>
            {renderFormStep()}
            <div className="text-sm mt-3 pb-10">
              <p className="text-gray-400">
                Already Registered?
                <Link to="/" className="text-blue-400 pl-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="login-image w-[62%] h-screen relative bg-gradient-to-b from-orange-800 to-black-900">
          {renderFormImage()}
        </div>
      </div>
    </main>
  );
};

export default RecruitSignUp;
