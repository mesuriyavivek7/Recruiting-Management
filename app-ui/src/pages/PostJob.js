import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const PostJob = () => {
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
    "Information technology (IT)",
    "Legal/Law/Secretarial",
    "Logistics/Supply Chain",
    "Maid Services",
    "Manufacturing/Industrial/Production/Machinery",
    "Petroleum/Oil & Gases/Energy/Utilities",
    "Pharmaceuticals/Biotechnology/Clinical Research",
    "Real Estate/Property",
    "Shipping/Marine",
  ];

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobileno: "",
    designation: "",
    company_name: "",
    company_size: "",
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
  const [load, setLoad] = useState(false);

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
    setSelectedCity("");
    for (let i of states) {
      if (parseInt(i.state_id) === selectedStateId) {
        setFormData((prevData) => ({ ...prevData, state: i.state_name }));
        break;
      }
    }
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    setSelectedCity(selectedCityId);
    for (let i of cities) {
      if (parseInt(i.city_id) === selectedCityId) {
        setFormData((prevData) => ({ ...prevData, city: i.city_name }));
        break;
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div">
        <p className="text-2xl font-semibold">Post a Job</p>
      </div>
      <div className="custom-div mx-3 w-full relative ">
        <div className="flex place-items-start relative w-full px-4 py-6 ">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Job Profile*</p>
            <p className="text-[13px] w-10/12 leading-4 text-gray-500">
              Provide a Job Title and Job Description.You can either attach the
              Job Description OR paste it in the Job Description field.
            </p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="job-title" className="input-label">
                Job Title
              </label>
              <input
                type="text"
                name="job-title"
                id="job-title"
                className="input-field"
              />
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="job-desc" className="input-label">
                Job Title{" "}
                <span className="text-green-700">
                  ( 65000 Characters Maximum)
                </span>
              </label>
              <textarea
                rows={8}
                name="job-desc"
                id="job-desc"
                className="input-field"
                placeholder="Paste the job description"
              />
              <p className="text-xs">Min 100charcters</p>
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg">Job Location & Experience</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div>
              <label htmlFor="remote-work" className="text-sm">
                <input
                  type="checkbox"
                  name="remote-work"
                  id="remote-work"
                  className="mr-2"
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
                  className="input-field custom-select"
                  onChange={handleStateChange}
                >
                  <option value="">Self State</option>
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
            </div>
            <div className="flex-start gap-2 w-full">
              <label htmlFor="city" className="input-label">
                City <span className="text-orange-800">*</span>
              </label>
              <select
                name="city"
                id="city"
                className="input-field custom-select"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Self City</option>
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
            <div className="flex-start gap-2 w-full">
              <label htmlFor="domain" className="input-label">
                Job Domain*
              </label>
              <select name="domains" id="domain" className="input-field">
                {domainOptions.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </select>
              {errors.domains && (
                <p className="text-red-600 text-xs">{errors.domains}</p>
              )}
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="experience" className="input-label">
                Experience*
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="min-experience"
                  id="experience"
                  className="input-field"
                  placeholder="Min years"
                />
                to
                <input
                  type="number"
                  name="max-experience"
                  id="experience"
                  className="input-field"
                  placeholder="Max years"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6 ">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Other Details</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="job-id" className="input-label">
                External Job ID
              </label>
              <input
                type="number"
                name="job-id"
                id="job-id"
                className="input-field"
                placeholder="Ex. 19393"
              />
            </div>
            <div className="w-full relative flex flex-col gap-2">
              <label htmlFor="managers-email" className="input-label">
                Share with Hiring Manager (s)
              </label>
              <input
                type="email"
                id="managers=email"
                name="managers=email"
                placeholder="Enter Hiring Manager Email ID(s)"
                className="input-field"
              />
            </div>
            <div className="flex place-items-center gap-4 mt-2">
              <input
                type="checkbox"
                id="share-salary-details"
                name="share-salary-details"
              />
              <label htmlFor="share-salary-details" className="input-label">
                Share salary details <br /> Check this box if you want to share
                salary details with the Hiring Manage
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="custom-div place-items-end pb-2">
          <button className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white">
            Next
          </button>
      </div>
    </div>
  );
};

export default PostJob;
