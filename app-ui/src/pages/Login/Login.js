import React, { useContext, useEffect, useState } from "react";
import asset2 from "../../assets/asset 2.png";
import asset1 from "../../assets/asset 1.png";
import { Link,useNavigate,useLocation } from "react-router-dom";
import Notification from "../../components/Notification";
import axios from "axios";
import {AuthContext} from '../../context/AuthContext'

//importing icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const {user,dispatch,loading}=useContext(AuthContext)
  const [loginUserType,setLoginUserType]=useState('enterprise')

  const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
     setNotification({message,type})
   }


  useEffect(()=>{
     if(user){
        if(user.userType==="enterprise"){
          navigate('/employer/dashboard')
        }else{
          navigate('/recruiter/dashboard')
        }
     }
  },[])

  const [errors,setErrors]=useState({})
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prevData)=>({...prevData,[name]:value}))
  }

  const handleChangeUserType=(e)=>{
     setLoginUserType(e.target.value)
  }

    //For the password

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


  const validateForm=()=>{
    let newErrors={}
    if(!formData.email) newErrors.email="Email address is required"
    if(!formData.password) newErrors.password="Password is required"
    // if(Object.keys(newErrors).length>0) showNotification("Please fill out appropriate fields...!",'failure')
    setErrors(newErrors)
    return Object.keys(newErrors).length===0

    
  }

  const handleSubmit=async ()=>{
    if(validateForm()){
      try{
       dispatch({type:"USER_FETCH_START"})

      //login user
      let user=null
      if(loginUserType==="enterprise") user=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/enterprise-login`,formData,{withCredentials:true})
      else user=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/recruiter-login`,formData,{withCredentials:true})

      dispatch({type:"USER_FETCH_SUCCESS",payload:user.data.details})

      //navigate to dashboard
      if(user.data.details.userType==="enterprise"){
        navigate('/employer/dashboard')
      }else{
        navigate('/recruiter/dashboard')
      }
      
      }catch(err){
        dispatch({type:"USER_FETCH_FAILURE"})
        showNotification(err.response.data.message,'failure')
      }
       
    }
  }

  return (
    <div className="login max-w-full h-full relative overflow-hidden">
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      <div className="login-content-container flex  place-items-center relative">
        
        <div className="login-image w-[58%] h-screen relative bg-gradient-to-b from-blue-800 to-blue-900">
          <img
            src={asset2}
            alt="login-image"
            className="relative h-full object-contain mx-auto"
          />
        </div>

        <div className="login-form w-[42%] relative">
          <div className="w-8/12 h-full flex flex-col mx-auto">
            <div className="flex flex-col place-items-center w-full">
              <img
                src={asset1}
                alt="company-logo"
                className="w-40 h-15 rounded-sm"
              />
              <h1 className="text-3xl mt-6 font-medium text-gray-900">Login</h1>
            </div>
            {
              (location.state && location.state.message) && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mt-2 rounded relative" role="alert">
                    <span className="block sm:inline">{location.state.message}</span>
                </div>
              )
            }
          
            <div className="w-full relative mt-8">
              <form className="flex flex-col gap-3">
                <div className="flex-start gap-2 w-full">
                  <label id="email" className="input-label">
                    Enter Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                  {
                    errors.email && (
                      <p className="text-red-600 text-xs">{errors.email}</p>
                    ) 
                  }
                </div>
                <div className="flex-start relative gap-2 w-full">
                  <label id="password" className="input-label">
                    Enter Password
                  </label>
                  <input
                   id="password"
                   name="password"
                   type={showPassword ? 'text' : 'password'}
                   value={formData.password}
                   onChange={handleChange}
                   className="input-field"
                />
                 <button type="button" className="right-2  top-8 absolute"  onClick={togglePasswordVisibility} >
                    {showPassword ? <VisibilityIcon style={{fontSize:"1.2rem"}}></VisibilityIcon> : <VisibilityOffIcon style={{fontSize:"1.2rem"}}></VisibilityOffIcon> }
                  </button>
                  {
                    errors.password && (
                      <p className="text-red-600 text-xs">{errors.password}</p>
                    )
                  }
                </div>
                <div className="flex mt-2 gap-4 items-center">
                   <div className="flex gap-1 items-center">
                      <input
                      type="radio"
                      id="enterprise"
                      name="enterprise"
                      value='enterprise'
                      checked={loginUserType==="enterprise"}
                      onChange={handleChangeUserType}
                      ></input>
                      <label className="input-label" htmlFor="enterprise">Enterprise</label>
                   </div>
                   <div className="flex gap-1 items-center">
                      <input
                       type="radio"
                       id="recruiter"
                       name="recruiter"
                       value='recruiter'
                       onChange={handleChangeUserType}
                       checked={loginUserType==="recruiter"}
                       ></input>
                       <label className="input-label" htmlFor="recruiter">Recruiter Agency</label>
                   </div>
                    <p className="text-end my-3">
                   <Link
                     to="/resetpassword"
                     className="text-sm text-blue-400"
                   >
                      Forgot your password?
                   </Link>
                   </p>
                </div>
               
                <button disabled={loading} type="button" onClick={handleSubmit} className="w-full py-[6px] bg-green-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50" >
                                    <span className="flex items-center justify-center">
                                          {
                                            loading && 
                                             <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                             </svg>
                                          }
                                          <span>Login</span>
                                     </span>
                </button>
              </form>
              <div className="text-sm mt-7">
                <p className="text-gray-400">
                  Create Account as Employer? 
                  <Link to="/signup/employer" className="text-blue-400 pl-1">
                    Create Account
                  </Link>
                </p>
              </div>
              <div className="text-sm mt-6">
                <p className="text-gray-400">
                  Create Account as Recruiting Agency?
                  <Link to="/signup/supplier" className="text-blue-400 pl-1">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
