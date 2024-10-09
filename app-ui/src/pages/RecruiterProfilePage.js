import React, { useEffect,useState,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

//For mobile phone input with dialing code
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//For text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

//importing icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import Multiselect from 'multiselect-react-dropdown';

export default function RecruiterProfilePage() {

  const {user}=useContext(AuthContext)

   const [recruiterMemberDetails,setRecruiterMemberDetails]=useState(null)
   const [recruiterAgencyDetails,setRecruiterAgencyDetails]=useState(null)

   const fetchRecruiterMemberDetails=async ()=>{
       try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/getredetailsforprofilepage/${user._id}`)
          console.log('recruiter member details---->',res.data)
          setRecruiterMemberDetails(res.data)
       }catch(err){
          //handeling error
          console.log(err)
       }
   }


   const fetchRecruiterAgencyDetails=async ()=>{
      try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/getagencydetailsforprofilepage/${user.recruiting_agency_id}`)
          console.log('recruiting agency details------>',res.data)
          setRecruiterAgencyDetails(res.data)
      }catch(err){
         //handeling error
         console.log(err)
      }
   }

   useEffect(()=>{
        fetchRecruiterMemberDetails()
        fetchRecruiterAgencyDetails()
   },[])


   const domainchange=(selectedList)=>{
        // setFormData((prev)=>({...prev,domains:selectedList}))
   }


  const getTextLength=(htmlContent)=>{
    const div=document.createElement('div')
    div.innerHTML=htmlContent
    const text=div.textContent || div.innerText || ''
    return text.length
 }
 
 

 const handleDescription= (newContent)=>{
    //   setFormData((prevData)=>({...prevData,jobDescription:newContent}))
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


    //Data for country ,city and states
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [preferedCountryOne,setPreferedCountryOne]=useState('')
    const [preferedCountryTwo,setPreferedCountryTwo]=useState('')
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    



  const handleCountryChange = (event) => {
    const selectedCountryId = parseInt(event.target.value);
    setSelectedCountry(selectedCountryId);
    setSelectedState('');
    setSelectedCity('')
    for(let i of countries){
       if(parseInt(i.country_id)===selectedCountryId){
        // setFormData((prevData) => ({ ...prevData, country: i.country_name}));
        break;
       }
    }
  };

  const handlePreferdCountryOneChange=(event)=>{

  }

  const handlePreferdCountryTwoChange=(event)=>{

  }

  const handleStateChange = (event) => {
    const selectedStateId = parseInt(event.target.value);
    setSelectedState(selectedStateId);
    setSelectedCity('')
    for(let i of states){
      if(parseInt(i.state_id)===selectedStateId){
    //    setFormData((prevData) => ({ ...prevData, state: i.state_name}));
       break;
      }
   }
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    setSelectedCity(selectedCityId);
    for(let i of cities){
      if(parseInt(i.city_id)===selectedCityId){
    //    setFormData((prevData) => ({ ...prevData, city: i.city_name}));
       break;
      }
   }
  };


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
  

  return (
   <div className='w-full flex flex-col gap-2'>
     <div className='custom-div pb-4'>
       <h2 className='text-xl font-medium'>SR Profile Details</h2>
     </div>
     <div className='custom-div flex-row items-center gap-18'>
        <div className='w-[15%] flex  items-center flex-col gap-3'>
            <span className='text-[18px] font-medium'>Personal Details</span>
            <div className='w-28 h-28 bg-blue-400 flex justify-center items-center rounded-full'>
                 <span className='text-white text-xl'>VM</span>
            </div>
            <button className='bg-blue-400 font-light text-sm p-2 rounded-md text-white'>Change Picture</button>
        </div>
        <div className='w-[82%] flex p-2 flex-col gap-5'>
            <div className='flex w-full gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                     <label className='input-label'>Name <span className='text-red-400'>*</span></label>
                     <input readOnly value={recruiterMemberDetails?(recruiterMemberDetails.full_name):('')} type='text' className='input-field'></input>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='input-label'>Designation <span className='text-red-400'>*</span></label>
                    <input type='text' className='input-field'></input>
                </div>
            </div>
            <div className='flex w-full gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                     <label className='input-label'>Phone Number <span className='text-red-400'>*</span></label>
                     <PhoneInput
                     country={"in"}
                     value={recruiterMemberDetails?(recruiterMemberDetails.mobileno):('')}
                     containerStyle={{ width: "100%" }}
                     />
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='input-label'>Email <span className='text-red-400'>*</span></label>
                    <input value={recruiterMemberDetails?(recruiterMemberDetails.email):('')} readOnly type='email' className='input-field'></input>
                </div>
            </div>
        </div>
     </div>
     <div className='custom-div gap-5'>
         <h2 className='text-[18px] font-medium'>Compnay Details</h2>
         <div className='w-full flex gap-4'>
            <div className='flex w-[60%] flex-col gap-2'>
                <label htmlFor='company_name' className='input-label'>Company Name <span className='text-red-400'>*</span></label>
                <input id='company_name' readOnly  className='input-field' type='text'></input>
            </div>
            <div className='flex w-[19%] flex-col gap-2'>
                <label htmlFor='company_size' className='input-label'>Company Size <span className='text-red-400'>*</span></label>
                <select readOnly value={recruiterAgencyDetails.company_size} id='company_size' className='input-field custom-select'>
                  <option value="">Select Company Size</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
            </div>
            <div className='flex w-[19%] flex-col gap-2'>
                <label htmlFor='company_age' className='input-label'>Company Age (in Years)</label>
                <input id='company_age' className='input-field' type='text'></input>
            </div>
         </div>
         <div className='w-full flex gap-4'>
            <div className='flex-1 flex flex-col gap-2'>
                 <label className='input-label' htmlFor='linkedin_url'>LinkedIn Url <span className='text-red-400'>*</span></label>
                 <input id='linkedin_url' readOnly value={recruiterAgencyDetails.linkedin_url} className='input-field' type='text'></input>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor="country" className="input-label">
                  Country <span className="text-red-400">*</span>
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
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor="state" className="input-label">
                  State <span className="text-red-400">*</span>
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
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                 <label htmlFor="city" className="input-label">
                  City <span className="text-red-400">*</span>
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
            </div>
         </div>
         <div className='h-[280px] w-full flex flex-col gap-2'>
             <label htmlFor='company_profile'>Compnay Profile </label>
             <ReactQuill 
                style={{height:'200px'}}
                onChange={newContent=>handleDescription(newContent)}
                modules={modules}
                formats={formats}
                theme="snow"
             />
         </div>
         <div className='flex flex-col gap-2'>
            <label className='input-label'>Domains (Select up to 10 Domains) <span className='text-red-400'>*</span></label>
            <Multiselect
                    style={{
                      multiselectContainer: {
                        "width":"1310px",
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
                    placeholder="Select Multiple Domains..."
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
         </div>
         <div className='flex flex-col gap-2 w-full'>
                 <label className="input-label">
                  Interested In <span className="text-red-400">*</span>
                </label>
                <div className="flex item-center w-full gap-12">
                  <label className='text-sm'>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Permanent Hiring"
                    />
                    <span className="pl-1">Permanent Hiring</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Contract Staffing"
                    />
                    <span className="pl-1">Contract Staffing</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Executive Search"
                    />
                    <span className="pl-1">Executive Search</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      type="checkbox"
                      name="firm_type"
                      value="Only Payrolling"
                    />
                    <span className="pl-1">Only Payrolling</span>
                  </label>
               </div>
         </div>
         <div className='w-full flex gap-4'>
            <div className='flex-1 flex flex-col gap-2'>
               <label htmlFor='prefer_country1' className='input-label'>Country (First Preference 1) <span className='text-red-400'>*</span></label>
               <select
                  name="country"
                  id="prefer_country1"
                  value={preferedCountryOne}
                  onChange={handlePreferdCountryOneChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Preference Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
               <label htmlFor='prefer_country2' className='input-label'>Country (First Preference 2) <span className='text-red-400'>*</span></label>
               <select
                  name="country"
                  id="prefer_country2"
                  value={preferedCountryTwo}
                  onChange={handlePreferdCountryTwoChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Preference Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
            </div>
         </div>
         <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span>Certificate of Incorporation (COI)</span>
              <p className='text-sm text-gray-400'>Please upload a copy of Certificate of Incorporation (COI)</p>
            </div>
            <div className='bg-slate-100 hover:border-blue-700 h-20 border border-blue-500 border-dashed rounded-md flex justify-center items-center'>
                <label htmlFor='coi_file' className='flex cursor-pointer font-light gap-2 items-center'>
                    <span className='text-blue-400'><CloudUploadOutlinedIcon></CloudUploadOutlinedIcon></span>
                    Drag and drop or browse your file
                </label>
            </div>
         </div>
         <div className='flex gap-2'>
            <input type='checkbox'></input>
            <span>Experienced in sourcing USA-based candidates for USA-based jobs</span>
         </div>
     </div>
     <div className='custom-div pb-3'>
        <button className='bg-blue-400 p-2 rounded-md text-white'>Save Changes</button>
     </div>
    </div> 
  )
}
