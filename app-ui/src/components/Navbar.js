import React, { useContext, useEffect, useState } from "react";
import asset1 from "../assets/asset 1.png";
import asset18 from "../assets/asset18.svg";
import asset29 from "../assets/asset29.svg";
import asset15 from "../assets/asset15.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Message from "./message/Message";
import axios from "axios";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

//import loader
import Loader from '../assets/whiteloader.svg'

const Navbar = () => {
  const {user}=useContext(AuthContext)
  const [openProfile,setOpenProfile]=useState(false)
  const [openMessageBox,setOpenMessageBox]=useState(false)
  const navigate=useNavigate()

  const [logoutLoader,setLogoutLoader]=useState(false)

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }

  const handleLogout=async ()=>{
      setLogoutLoader(true)
      try{
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`,{},{withCredentials:true})
        setLogoutLoader(false)
        window.location.reload()
      }catch(err){
           setLogoutLoader(false)
           showNotification("Something went wrong.",'failure')
          console.log(err)
      }
      setLogoutLoader(false)
  }
  return (
   <>
     {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
     {
      logoutLoader && 
      <div className="fixed inset-0 z-50 flex bg-black justify-center bg-opacity-50 backdrop-blur-md items-center">
       <div className="custom-div w-96 pb-4 items-center">
           <img className="w-8 h-8" src={Loader}></img>
           <span>Please wait till we logout...</span>
       </div>
     </div>
     }

    <div className="w-full z-60 flex justify-between py-4 px-3 bg-blue-600">
      <div className="flex place-items-center gap-12">
        <div className="h-[30px] flex place-items-center overflow-hidden rounded-md">
          <img src={asset1} alt="logo" width={95} />
        </div>
        <div className="search-input flex place-items-center gap-2 text-sm px-4 w-[600px] bg-white-400 py-[5px] rounded-md">
          <img src={asset15} alt="search-icon" width={15} />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="bg-transparent w-full "
          />
        </div>
      </div>
      <div className="flex place-items-center gap-4">
        <Link to="jobposting/landing">
          <button
            type="button"
            className="bg-blue-400 rounded-md py-1 px-2 flex place-items-center gap-3"
          >
            <img src={asset18} alt="plus-icon" width={16} />
            <span className="text-white">Post a Job</span>
          </button>
        </Link>

        <div className="relative">
          <img onClick={()=>setOpenMessageBox(true)} src={asset29} className="cursor-pointer" alt="notification" width={26} />
          {
            openMessageBox && (
              <Message setOpenMessageBox={setOpenMessageBox}></Message>
            )
          }
        </div>
        
        <div className="relative">
          <div onClick={()=>setOpenProfile((prev)=>(!prev))} className="w-[30px] h-[30px] rounded-full cursor-pointer bg-blue-400 flex place-items-center ">
            <p className="text-white text-sm mx-auto">VM</p>
          </div>
          {
            openProfile && <div className="absolute z-50 top-16 right-4 pb-2 custom-div">
          <div className="bg-slate-100 rounded-sm flex flex-col gap-2 p-2">
            <h1 className="text-gray-600 text-lg">Enterprise</h1>
            <div>
              <h1 className="text-md">{user.full_name}</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="w-full flex flex-col mt-2">
            <span className="text-gray-700 hover:bg-gray-200  p-1 cursor-pointer font-light text-sm">Change Profile Picture</span>
            <span onClick={handleLogout} className="text-gray-700 hover:bg-gray-200 p-1  cursor-pointer font-light text-sm">Log Out</span>
          </div>
        </div>
        }
        </div>
      </div>
    </div>

    </>
  );
};

export default Navbar;
