import React ,{useState} from 'react'

import Notification from "../../components/Notification";
import asset2 from "../../assets/asset 2.png";
import asset1 from "../../assets/asset 1.png";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {

  const [notification,setNotification]=useState(null)
  const [errors,setErrors]=useState('')
  const [loading,setLoading]=useState(false)

  //for showing notification
  const showNotification=(message,type)=>{
    setNotification({message,type})
  }

  const [email,setEmail]=useState('')
  const validate=()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
      setErrors("Email address is invalid.")
      return false
    }else{
      setErrors('')
      return true
    }
  }

  const handleSubmit=async ()=>{
    if(validate()){
    setLoading(true)
     try{
        const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/request-reset-password`,{email})
        setEmail('')
        showNotification(res.data.message,res.data.type)
     }catch(err){
         setLoading(false)
         console.error(err)
         showNotification("Something went wrong while reset password.",'failure')
     }
     setLoading(false)
    }
  }
    
  return (
    <div className='login max-w-full h-full relative overflow-hidden'>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      <div className='login-content-container flex place-items-center relative'>
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
              <h1 className="text-3xl mt-6 font-medium text-gray-900">Reset Password</h1>
            </div>
          
            <div className="w-full relative mt-8">
              <form className="flex flex-col gap-5">
                <div className='flex-start gap-2 w-full'>
                    <label id='email' className='input-label'>
                        Enter Email <span className='text-red-400 text-sm'>*</span>
                    </label>
                    <input
                     type='email'
                     name='email'
                     id='email'
                     value={email}
                     placeholder='john@example.com'
                     required
                     className='input-field'
                     onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                    {
                      errors && 
                      <span className='text-red-400 text-sm '>{errors}</span>
                    }
                </div>
                <button disabled={!email || loading} type='button' onClick={handleSubmit} className='w-full flex justify-center items-center py-[6px] transition-all bg-green-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50'>
                    <span>
                      {
                        loading?(
                                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                </svg>
                        ):(
                          "Reset Password"
                        )
                      }
                    </span>
                </button>
                <p className='text-end text-gray-500 text-[14px] my-2'>
                    Already Registered?
                    <Link to='/' className='ml-1 text-blue-400'>
                       Login
                    </Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
