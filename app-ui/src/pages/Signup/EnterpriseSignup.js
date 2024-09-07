import React,{useEffect,useState} from "react";
import asset3 from "../../assets/asset 1.png";
import asset10 from "../../assets/asset 10.svg";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Notification from '../../components/Notification'

import axios from "axios";

const EnterpriseSignup = () => {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    full_name:'',
    email:'',
    mobileno:'',
    designation:'',
    company_name:'',
    company_size:'',
    country:'',
    state:'',
    city:''
  })

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [load,setLoad]=useState(false)
  const [mailCheck,setMailCheck]=useState(false)
  const [mobilenoCheck,setMobilenoCheck]=useState(false)


  const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
     setNotification({message,type})
   }

  useEffect(()=>{
      getCountries();
      getStates();
      getCities();
  },[])


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

   useEffect(()=>{
      if(mailCheck) handleMobileNoCheck()
   },[mailCheck])


   useEffect(()=>{
      if(mobilenoCheck) handleSubmit()
   },[mobilenoCheck])

  const handleMailCheck=async ()=>{
    if(validateForm()){
      setLoad(true)
      try{
        const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/authenterprise/checkmail`,{email:formData.email})
        if(res.data===false) setMailCheck(true)
        else{ 
           showNotification("Email address is already exist...!",'failure')  
           setLoad(false)
        }
      }catch(err){
          setLoad(false)
          showNotification("There is something wrong....!","failure")
      }
    }
  }

  const handleMobileNoCheck=async ()=>{
       if(validateForm()){
         try{
             const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/authenterprise/checkmobileno`,{mobileno:formData.mobileno})
             console.log("Mobie Response",res)
             if(res.data===false) setMobilenoCheck(true)
             else{
              showNotification("Mobile no is already exist...!",'failure')
              setLoad(false)
             }
            
         }catch(err){
            setLoad(false)
            showNotification("There is something wrong.....!","failure")
         } 
       }
  }

  const validateForm=()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors={};
    if (!formData.full_name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Official Email is required";
    else if(!emailRegex.test(formData.email)) newErrors.email="Email address is invalid"
    if (!formData.mobileno) newErrors.phoneNumber = "Phone Number is required";
    if(formData.mobileno.length<12) newErrors.phoneNumber="Phone Number is invalid";
    if (!formData.company_name) newErrors.company = "Company Name is required";
    if (!formData.company_size) newErrors.size = "Company Size is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if(Object.keys(newErrors).length>0) showNotification("Please fill out appropriate fields...!","failure")
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData((prevData)=>({...prevData,[name]:value}))
  }
  
 
  const handleSubmit=async ()=>{
     if(validateForm()){
          let newErrors={}
          try{
            //register for enterprise
            const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/authenterprise/register`,formData,{withCredentials:true})
           
            //sending mails for notify user
            const notifymail={
                to:formData.email,
                subject:"Welcome To Uphire",
                name:formData.full_name
            }
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendmail`,notifymail)

            //sending mail for email verification
            const emailverify={
               name:formData.full_name,
               email:formData.email
           }

           await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationenterprise`,emailverify)
           
           
           //update master admin pending list
           await axios.post(`${process.env.REACT_APP_API_ADMIN_URL}/masteradmin/addenterprise`,{country:res.data.country,id:res.data._id})
           

           //redirect to login page with successfull message
           navigate('/',{state:{message:"Registerd Successfully, Now Please Login."}})

          }catch(err){
               newErrors.internal="There is something wrong...!"
               setErrors(newErrors)
               showNotification("There is something wrong...!","failure")
          }
          setLoad(false)

     }
  }


  return (
    <main>
    
      {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    
      <div className="recruit-content-container h-screen flex relative overflow-hidden">
       
        <div className="login-image w-[58%] h-screen relative bg-gradient-to-b from-orange-800 via-black-900 to-black-900">
        <img
            src={asset10}
            alt="login-image"
            className="relative p-28 h-full mx-auto"
          />
        </div>

        <div className="recruit-form w-[42%] h-full overflow-y-scroll relative">
          <div className="w-8/12 h-full py-16 flex flex-col place-items-start mx-auto">
            <div className="flex flex-col place-items-start w-full">
              <img
                src={asset3}
                alt="company-logo"
                className="w-40 h-15 rounded-sm"
              />
              <h1 className="text-3xl mt-6 w-8/12 font-medium text-gray-900">
                Enterprise Signup
              </h1>
            </div>
            <div className="w-full relative mt-8">
              <form className="flex flex-col gap-3">
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="name" className="input-label">
                    Full Name <span className="text-green-800">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  {errors.name && (
                  <p className="text-red-600 text-xs my-2">{errors.name}</p>
                )}
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="email" className="input-label">
                    Official Email <span className="text-green-800">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="input-field"
                    required
                  />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                )}
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="phonenumber" className="input-label">
                    Phone Number <span className="text-green-800">*</span>
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
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="designation" className="input-label">
                    Designation <span className="text-green-800">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    onChange={handleChange}
                    value={formData.designation}
                    className="input-field"
                    required
                  />
                {errors.designation && (
                  <p className="text-red-600 text-xs">{errors.designation}</p>
                )}
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="company" className="input-label">
                    Company Name <span className="text-green-800">*</span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    id="company"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                {errors.company && (
                  <p className="text-red-600 text-xs">{errors.company}</p>
                )}
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="size" className="input-label">
                    Company Size <span className="text-green-800">*</span>
                  </label>
                  <select
                    name="company_size"
                    id="size"
                    value={formData.company_size}
                    onChange={handleChange}
                    className="input-field custom-select"
                  >
                    <option value="">Select Global Company Size</option>
                    <option value="Less than 2000">Less than 2000</option>
                    <option value="2000-10,000">2000-10,000</option>
                    <option value="10,000+">10,000+</option>
                  </select>
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="country" className="input-label">
                    Country <span className="text-green-800">*</span>
                  </label>
                  <select
                    name="country"
                    id="country"
                    className="input-field custom-select"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {
                      countries.map((country)=>(
                        <option key={country.country_id} value={country.country_id}>{country.country_name}</option>
                      ))
                    }

                  </select>
                  {errors.country && (
                  <p className="text-red-600 text-xs">{errors.country}</p>
                )}
                </div>
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="state" className="input-label">
                    State <span className="text-green-800">*</span>
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
                <div className="flex-start gap-2 w-full">
                  <label htmlFor="city" className="input-label">
                    City <span className="text-green-800">*</span>
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
                      <option key={city.city_id}  value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))}

                  </select>
                  {errors.city && (
                  <p className="text-red-600 text-xs">{errors.city}</p>
                )}
                </div>
                <button
                  type="button"
                  onClick={handleMailCheck}
                  className="w-full py-3 my-3 bg-green-600 text-white rounded-md text-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 "
                  disabled={load}
                >
                                    <span className="flex items-center justify-center">
                                          {
                                            load && 
                                             <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                             </svg>
                                          }
                                          <span>Sign Up</span>
                                     </span>
                </button>
                {errors.internal && (
                  <p className="text-red-600 text-xs">{errors.internal}</p>
                )}
              </form>
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
        </div>
      </div>
    </main>
  );
};

export default EnterpriseSignup;
