import React, { useContext, useEffect, useState } from "react";
import asset2 from "../../assets/asset 2.png";
import asset1 from "../../assets/asset 1.png";
import { Link,useNavigate } from "react-router-dom";

import axios from "axios";
import {AuthContext} from '../../context/AuthContext'


const Login = () => {
  const navigate=useNavigate()
  const {user,dispatch,loading}=useContext(AuthContext)

  useEffect(()=>{
     if(user){
        navigate('/employer/dashboard')
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

  const validateForm=()=>{
    let newErrors={}
    if(!formData.email) newErrors.email="Email address is required"
    if(!formData.password) newErrors.password="Password is required"
    setErrors(newErrors)

    return Object.keys(newErrors).length===0

    
  }

  const handleSubmit=async ()=>{
    if(validateForm()){
       dispatch({type:"LOGIN_START"})
      //login user
      const user=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`,formData,{withCredentials:true})

      dispatch({type:"LOGIN_SUCCESS",payload:user.data.details})

      //navigate to dashboard
      navigate('/employer/dashboard')
       
    }
  }

  return (
    <div className="login max-w-full h-full relative overflow-hidden">
      <div className="login-content-container flex  place-items-center relative">
        <div className="login-form w-[38%] relative">
          <div className="w-8/12 h-full flex flex-col mx-auto">
            <div className="flex flex-col place-items-center w-full">
              <img
                src={asset1}
                alt="company-logo"
                className="w-32 h-32 rounded-sm"
              />
              <h1 className="text-3xl mt-6 font-medium text-gray-900">Login</h1>
            </div>
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
                <div className="flex-start gap-2 w-full">
                  <label id="password" className="input-label">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {
                    errors.password && (
                      <p className="text-red-600 text-xs">{errors.password}</p>
                    )

                  }
                </div>
                <p className="text-end my-3">
                  <Link
                    to="/forgot-password "
                    className="text-sm text-blue-400"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <button disabled={loading} type="button" onClick={handleSubmit} className="w-full py-[6px] bg-blue-400 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50" >Login</button>
              </form>
              <div className="text-sm mt-6">
                <p className="text-gray-400">
                  Not registered as Employer? 
                  <Link to="/signup/employer" className="text-blue-400 pl-1">
                    Create Account
                  </Link>
                </p>
              </div>
              <div className="text-sm mt-6">
                <p className="text-gray-400">
                  Not registered as Recruiting Agency?
                  <Link to="/signup/supplier" className="text-blue-400 pl-1">
                    Create Account
                  </Link>
                </p>
              </div>
              <div className="text-sm mt-6">
                <p className="text-gray-400">
                  Not registered as Channel Partner?
                  <Link to="/" className="text-blue-400 pl-1">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="login-image w-[62%] h-screen relative bg-gradient-to-b from-blue-800 to-blue-900">
          <img
            src={asset2}
            alt="login-image"
            className="relative h-full object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
