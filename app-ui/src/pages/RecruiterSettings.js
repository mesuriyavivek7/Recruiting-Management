import React, {useState, useContext} from 'react'
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Notification from '../components/Notification';

export default function RecruiterSettings() {

  const {user,dispatch}=useContext(AuthContext)
  
  const [loading,setLoading]=useState(false)
  const [passwordLoad,setPasswordLoad]=useState(false)
  const [errors,setErrors]=useState({})
  const [passwordError,setPasswordErrors]=useState({})
  const [showemailbutton,setShowEmailButton]=useState(false)
  const [showpasswordbutton,setShowPasswordButton]=useState(false)
  const [emailData,setEmailData]=useState("")
  
  const [passwordData,setPasswordData]=useState({
    current_password:"",
    new_password:"",
    confirm_password:""
  })

 const [notification,setNotification]=useState(null)

 //for showing notification
 const showNotification=(message,type)=>{
  setNotification({message,type})
 }

  //for email address
  const handleEmailDataChange=(e)=>{
     setEmailData(e.target.value.toLowerCase())
     validateEmailAddress(e.target.value.toLowerCase())
     setShowEmailButton(true)
  }

  const validateEmailAddress=(email)=>{
     let newErrors={};
     //regax for check email address
     const emailreg=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

     if(!email)  newErrors.email="Email address is required."
     else if(!emailreg.test(email))  newErrors.email="Email address is invalid"
     else newErrors.email=null

     setErrors(newErrors)
     return Object.keys(newErrors).length!==0
  }

  const emailSubmit=async ()=>{
     let userObj=user
     let newErrors={}
     dispatch({type:"USER_FETCH_START"})
     try{
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/changeemail`,{email:userObj.email,newemail:emailData})
      //change email address in localstorage
      userObj["email"]=emailData
      dispatch({type:"USER_FETCH_SUCCESS",payload:userObj})
      setShowEmailButton(false)
      setEmailData("")
      showNotification("Successfully email address changed.",'success')
     }catch(err){
        console.log(err)
        setLoading(false)
        newErrors.internal="Something went wrong...!"
        showNotification("Something went wrong while changeing email address.",'failure')
     }
     setErrors(newErrors)
     setLoading(false)
  }

  const checkEmailAddress=async ()=>{
       try{
          setLoading(true)
          const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkemailaddress/${user._id}`,{email:emailData})
          if(res.data) showNotification("Entered email address is already exist.",'failure')
          else await emailSubmit()
       } catch(err){
         setLoading(false)
         console.log(err)
         showNotification("Something went wrong.",'failure')
       }
       setLoading(false)
  }

  const passwordDataChange=(e)=>{
      setPasswordData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
      validatePasswordData(e.target.name,e.target.value)
      setShowPasswordButton(true)
  }

  const checkCurrentPassword=async ()=>{
     try{
      setPasswordLoad(false)
      const isPasswordCorrect=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkpassword/${user._id}`,{password:passwordData.current_password})
      if(isPasswordCorrect.data) await submitPasswordData()
      else showNotification("You entered wrong current password.",'failure')
     }catch(err){
      setPasswordLoad(false)
      console.log(err)
      showNotification("Something went wrong.",'failure')
     }
     setPasswordLoad(false)
  }


  const validatePasswordData=async (name,password)=>{
    let newErrors={}

    switch(name){
      case "current_password":
        if(!password) newErrors.current_password="Current Password is required."
        else newErrors.current_password=null
        break;

      case "new_password":
        if(!password) newErrors.new_password="New password is required."
        else newErrors.new_password=null
        break;

      case "confirm_password":
        if(!password) newErrors.confirm_password="Confirm password is required."
        else if(password!==passwordData.new_password) newErrors.confirm_password="Confirm password is not matched with New password"
        else newErrors.confirm_password=null
        break;
      
      default:
        break;
    }

    setPasswordErrors((prevData)=>({...prevData,...newErrors}))
    return (passwordError.current_password===null && passwordError.new_password===null && passwordError.confirm_password===null)
    
  }

  const submitPasswordData=async ()=>{
    if(validatePasswordData()){
        let newErrors={}
        setPasswordLoad(true)
        try{
           await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/changepassword/${user._id}`,{password:passwordData.confirm_password})
           setShowPasswordButton(false)
           setPasswordData({
            current_password:"",
            new_password:"",
            confirm_password:""
           })
           showNotification("Successfully password changed.",'success')
        }catch(err){
           console.log(err)
           newErrors.internal="Something went wrong....!"
           showNotification("Something went wrong while changing password.",'failure')
        }
        setPasswordErrors(newErrors)
        setPasswordLoad(false)
    }
  }
  

  return (
    <div className="flex flex-col gap-2 relative">
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Request Email Change</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-email" className="input-label">
            Current Email
          </label>
          <input
            type="email"
            value={user && user.email}
            name="current-email"
            id="current-email"
            className="input-field disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-email" className="input-label ">
            Enter New Email
          </label>
          <input
            type="email"
            name="email"
            value={emailData}
            onChange={handleEmailDataChange}
            id="new-email"
            className={`input-field ${(errors.email && showemailbutton) && "border-red-400"}`}
          />
          {
            (errors.email && showemailbutton) && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )
          }
        </div>
        {
          showemailbutton &&  (<div className="mt-2 flex container space-x-2">
                                 <button type='button' onClick={checkEmailAddress} disabled={(errors.email || loading)?(true):(false)} className="relative flex-1 bg-blue-500 text-white py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                                     {loading && (<span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>)}
                                     
                                     {!loading && <span className="ml-2">Save</span>}
                                 </button>
                                 <button onClick={()=>setShowEmailButton(false)} className="bg-gray-500 text-white py-2 px-4 rounded">Close</button>
                              </div>)
        }
       {
          errors.internal && (
            <p className="text-red-600 text-xs">{errors.internal}</p>
          )
       }

      </form>
      <form className="password-change-form  w-1/2 custom-div">
        <p className="font-bold">Password</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-password" className="input-label">
            Current Password
          </label>
          <input
            type="text"
            name="current_password"
            value={passwordData.current_password}
            id="current-password"
            onChange={passwordDataChange}
            className={`input-field ${(showpasswordbutton && passwordError.current_password) && "border-red-400"}`}
          />
           {
            (passwordError.current_password && showpasswordbutton) && (
              <p className="text-red-600 text-xs">{passwordError.current_password}</p>
            )
          }
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-password" className="input-label">
            New Password
          </label>
          <input
            type="text"
            name="new_password"
            value={passwordData.new_password}
            onChange={passwordDataChange}
            id="new-password"
            className={`input-field ${(showpasswordbutton && passwordError.new_password) && "border-red-400"}`}
          />
           {
            (passwordError.new_password && showpasswordbutton) && (
              <p className="text-red-600 text-xs">{passwordError.new_password}</p>
            )
          }
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="confirm-password" className="input-label ">
            Confirm Password
          </label>
          <input
            type="text"
            value={passwordData.confirm_password}
            name="confirm_password"
            id="confirm-password"
            onChange={passwordDataChange}
            className={`input-field ${(showpasswordbutton && passwordError.confirm_password) && "border-red-400"}`}
          />
           {
            (passwordError.confirm_password && showpasswordbutton) && (
              <p className="text-red-600 text-xs">{passwordError.confirm_password}</p>
            )
          }
        </div>

        {
          showpasswordbutton &&  (<div className="mt-2 flex container space-x-2">
                                 <button type='button' onClick={checkCurrentPassword} disabled={(passwordData.current_password==="" || passwordData.new_password==="" || passwordData.confirm_password==="" ||passwordError.current_password || passwordError.new_password || passwordError.confirm_password || passwordLoad)?(true):(false)} className="relative flex-1 bg-blue-500 text-white py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                                     {passwordLoad && (<span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>)}
                                     
                                     {!passwordLoad && <span className="ml-2">Save</span>}
                                 </button>
                                 <button onClick={()=>setShowPasswordButton(false)} className="bg-gray-500 text-white py-2 px-4 rounded">Close</button>
                              </div>)
        }
       {
        passwordError && (
          <p className="text-red-600 text-xs">{passwordError.internal}</p>
        )
       }
      </form>
    
    </div>
  )
}
