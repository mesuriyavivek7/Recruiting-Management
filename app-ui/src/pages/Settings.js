import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Notification from "../components/Notification";

//importing icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Settings = () => {
  const {user,dispatch}=useContext(AuthContext)
  const [loading,setLoading]=useState(false)
  const [passwordLoad,setPasswordLoad]=useState(false)
  const [errors,setErrors]=useState({})
  const [passwordError,setPasswordErrors]=useState({})
  const [showemailbutton,setShowEmailButton]=useState(false)
  const [showpasswordbutton,setShowPasswordButton]=useState(false)
  const [emailData,setEmailData]=useState("")
  const [openConfirmPopUp,setOpenConfirmPopUp]=useState(false)
  const [openEmailConfirmPopUp,setEmailConfirmPopUp]=useState(false)
  

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
    const email = e.target.value.toLowerCase();
    if (email !== emailData) {
      setEmailData(email);
      validateEmailAddress(email);
    }
     setShowEmailButton(true)
  }

  const validateEmailAddress=(email)=>{
    const newErrors = {};
    const emailreg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailreg.test(email)) {
      newErrors.email = "Email address is invalid.";
    } else {
      newErrors.email = null;
    }

    // Update errors state only if it has changed
    setErrors((prevErrors) => {
      if (prevErrors.email !== newErrors.email) {
        return newErrors;
      }
      return prevErrors;
    });

    return Object.keys(newErrors).length !== 0;
  }

  const emailSubmit=async ()=>{
     let userObj=user
     let newErrors={}
     dispatch({type:"USER_FETCH_START"})
     try{
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterprise/changemail/${userObj._id}`,{email:emailData})
      //change email address in localstorage
      userObj["email"]=emailData
      dispatch({type:"USER_FETCH_SUCCESS",payload:userObj})
      setShowEmailButton(false)
      setEmailData("")
      showNotification("Successully email address changed.",'success')
     }catch(err){
        setLoading(false)
        console.log(err)
        newErrors.internal="Something went wrong...!"
        showNotification("Something went wrong.",'failure')
     }
     setErrors(newErrors)
     setLoading(false)
  }

  const checkEmailAddress=async ()=>{
     try{
       setLoading(true)
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/checkmail/${emailData}`)
       if(res.data) showNotification("Entered email address is already exist.",'failure')
       else await emailSubmit()
     }catch(err){
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
      setPasswordLoad(true)
      const isPasswordCorrect=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterprise/checkpassword/${user._id}`,{password:passwordData.current_password})
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

  const handleLogout=async ()=>{
    try{
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`,{},{withCredentials:true})
      setOpenConfirmPopUp(false)
      window.location.reload()
    }catch(err){
         showNotification("Something went wrong.",'failure')
         console.log(err)
    }
  }

  const submitPasswordData=async ()=>{
    if(validatePasswordData()){
        let newErrors={}
        setPasswordLoad(true)
        try{
           await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterprise/changepassword/${user._id}`,{password:passwordData.confirm_password})
           await handleLogout()
           setShowPasswordButton(false)
           setPasswordData({
            current_password:"",
            new_password:"",
            confirm_password:""
           })
           showNotification("Successfully password data change.",'success')
        }catch(err){
           setPasswordLoad(false)
           newErrors.internal="Something went wrong....!"
           showNotification("Something went wrong.",'failure')
        }
        setPasswordErrors(newErrors)
        setPasswordLoad(false)
    }
  }
  

  return (
    <div className="flex flex-col gap-2 relative">
    {
      openConfirmPopUp &&
      <div className='fixed inset-0 flex justify-center bg-black z-40 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div pb-4 w-[500px]'>
            <span className='text-[14px] leading-6'><InfoOutlinedIcon style={{fontSize:'1.6rem'}} className='text-yellow-500 mr-2'></InfoOutlinedIcon> Changing your current password will log you out from the dashboard. You will need to log in again with your new password. Are you sure you want to proceed?</span>
            <div className='flex w-full place-content-end items-center gap-2'>
               <button onClick={()=>setOpenConfirmPopUp(false)} className='text-white hover:bg-blue-500 bg-blue-400 p-2 text-[15px] rounded-md'>Cancel</button>
               <button onClick={checkCurrentPassword} className='text-white hover:bg-blue-500 bg-blue-400 p-2 text-[15px] rounded-md'>Proceed</button>
            </div>
        </div>
    </div>
    }
    {
      openEmailConfirmPopUp &&
      <div className='fixed inset-0 flex justify-center bg-black z-40 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div pb-4 w-[500px]'>
            <span className='text-[14px] leading-6'><InfoOutlinedIcon style={{fontSize:'1.6rem'}} className='text-yellow-500 mr-2'></InfoOutlinedIcon> Changing your Email address will log you out from the dashboard. You will need to log in again with your new Email Address. Are you sure you want to proceed?</span>
            <div className='flex w-full place-content-end items-center gap-2'>
               <button onClick={()=>setEmailConfirmPopUp(false)} className='text-white hover:bg-blue-500 bg-blue-400 p-2 text-[15px] rounded-md'>Cancel</button>
               <button onClick={checkEmailAddress} className='text-white hover:bg-blue-500 bg-blue-400 p-2 text-[15px] rounded-md'>Proceed</button>
            </div>
        </div>
    </div>
    }
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Request Email Change</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-email" className="input-label">
            Current Email
          </label>
          <input
            type="email"
            value={user?.email}
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
                                 <button type="button" onClick={()=>setEmailConfirmPopUp(true)} disabled={(errors.email || loading)?(true):(false)} className="relative flex-1 bg-blue-500 text-white py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
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
                                 <button type="button" onClick={()=>setOpenConfirmPopUp(true)} disabled={(passwordData.current_password==="" || passwordData.new_password==="" || passwordData.confirm_password==="" ||passwordError.current_password || passwordError.new_password || passwordError.confirm_password || passwordLoad)?(true):(false)} className="relative flex-1 bg-blue-500 text-white py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
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
  );
};



export default Settings;
