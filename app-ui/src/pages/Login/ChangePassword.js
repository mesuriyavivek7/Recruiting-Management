import React, {useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import Notification from "../../components/Notification";
import asset2 from "../../assets/asset 2.png";
import asset1 from "../../assets/asset 1.png";
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function ChangePassword() {
  const navigate=useNavigate()
  const {token}=useParams()
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [errors,setErrors]=useState({})
  const [loading,setLoading]=useState(false)

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
    setNotification({message,type})
  }

  const validate=()=>{
    let newErrors={}
    if(!newPassword) newErrors.newpwd="New password is required."
    if(!confirmPassword) newErrors.conpwd="Confirm password is required."
    else if(confirmPassword!==newPassword) newErrors.conpwd="Confirm password must be same as new password." 

    setErrors(newErrors)
    return Object.keys(newErrors).length===0
  }


  const handleSubmit=async ()=>{
    if(validate()){
      setLoading(true)
      try{
         const response= await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/verify-reset-password/${token}`,{newPassword})
         showNotification(response.data.message,response.data.type)
         navigate('/',{state:{message:"Password Changed, Now Please Login."}})
      }catch(err){
         setLoading(false)
         console.error(err)
         showNotification("Something went wrong while updating password.",'failure')
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
                    <label htmlFor='newpassword'>New Password <span className='text-red-400 text-sm'>*</span></label>
                    <input 
                    type='password'
                    name='newpassword'
                    id='newpassword'
                    value={newPassword}
                    placeholder='Enter new password'
                    className='input-field'
                    onChange={(e)=>setNewPassword(e.target.value)}
                    >
                    </input>
                    {
                        errors.newpwd && 
                        <span className='text-red-400 text-sm'>{errors.newpwd}</span>
                    }
                </div>
                <div className='flex-start gap-2 w-full'>
                    <label htmlFor='confirmpassword'>Confirm Password <span className='text-red-400 text-sm'>*</span></label>
                    <input 
                    type='password'
                    name='confirmpassword'
                    id='confirmpassword'
                    value={confirmPassword}
                    placeholder='Confirm new password'
                    className='input-field'
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </input>
                    {
                        errors.conpwd && 
                        <span className='text-red-400 text-sm'>{errors.conpwd}</span>
                    }
                </div>
                <button disabled={!newPassword || !confirmPassword || loading} type='button' onClick={handleSubmit} className='w-full py-[6px] transition-all flex justify-center items-center bg-green-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50'>
                    <span>
                           {
                            loading?(
                                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                </svg>
                            ):(
                               "Submit"
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
