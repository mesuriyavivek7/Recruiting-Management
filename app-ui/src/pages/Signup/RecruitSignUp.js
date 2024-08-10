import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import asset3 from "../../assets/asset 3.svg";
import asset4 from "../../assets/asset 4.svg";
import asset7 from "../../assets/asset 7.svg";
import asset8 from "../../assets/asset 8.svg";
import asset9 from "../../assets/asset 9.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const RecruitSignUp = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    size: "",
    designation: "",
    linkedinUrl: "",
    firm: [],
    country: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
    setSelectedState("");
    setSelectedCity("");
    setFormData((prevData) => ({ ...prevData, country: selectedCountryId }));
  };

  const handleStateChange = (event) => {
    const selectedStateId = parseInt(event.target.value);
    setSelectedState(selectedStateId);
    setSelectedCity("");
    setFormData((prevData) => ({ ...prevData, state: selectedStateId }));
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    setSelectedCity(selectedCityId);
    setFormData((prevData) => ({ ...prevData, city: selectedCityId }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevData) => ({ ...prevData, [name]: selectedValues }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    switch (activeState) {
      case 1:
        if (!formData.name) newErrors.name = "Full Name is required";
        if (!formData.email) newErrors.email = "Official Email is required";
        if (!formData.phoneNumber)
          newErrors.phoneNumber = "Phone Number is required";
        break;
      case 2:
        if (!formData.company) newErrors.company = "Company Name is required";
        if (!formData.size) newErrors.size = "Company Size is required";
        if (!formData.designation)
          newErrors.designation = "Designation is required";
        if (!formData.linkedinUrl)
          newErrors.linkedinUrl = "LinkedIn Url is required";
        if (formData.firm.length === 0)
          newErrors.firm = "At least one Firm Type is required";
        break;
      case 3:
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.city) newErrors.city = "City is required";
        if (formData.firm.length === 0)
          newErrors.firm = "At least one Domain is required";
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
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs">{errors.name}</p>
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
                      phoneNumber: phone,
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
                  name="company"
                  id="company"
                  value={formData.company}
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
                  name="size"
                  id="size"
                  value={formData.size}
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
                  name="linkedinUrl"
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
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
                      name="firm"
                      value="Permanent Hiring"
                      checked={formData.firm.includes("Permanent Hiring")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Permanent Hiring</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm"
                      value="Contract Staffing"
                      checked={formData.firm.includes("Contract Staffing")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Contract Staffing</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm"
                      value="Executive Search"
                      checked={formData.firm.includes("Executive Search")}
                      onChange={handleChange}
                    />
                    <span className="pl-1">Executive Search</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="firm"
                      value="Only Payrolling"
                      checked={formData.firm.includes("Only Payrolling")}
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
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
                      <option key={city.city_id} value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))}
                </select>
                {errors.city && (
                  <p className="text-red-600 text-xs">{errors.city}</p>
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
                  type="submit" 
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl"
                >
                  Submit
                </button>
              </div>
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

  const handleFormSubmit=()=>{
    navigate("/signup/supplier/success")
  }
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
