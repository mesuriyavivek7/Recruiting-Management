import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SideNavbar from "../../components/SideNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import Loading from '../../assets/whiteloader.svg'


const Enterprisedashboard = () => {
  const {user,loading}=useContext(AuthContext)
  const navigate=useNavigate()

  useEffect(()=>{
    if(!loading && !user){
     navigate('/')
    }
  },[loading,user,navigate])
  return (
    <>
      {
      loading && 
       <div className="fixed inset-0 flex justify-center bg-white z-40 backdrop-blur-md items-center">
        <div className="flex flex-col items-center gap-2">
          <img src={Loading} className="h-12 w-12"></img>
          <span className="text-sm font-sans">Please wait while fetching data...</span>
        </div>
       </div>
      }
      {
        user && 
        <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
          <Navbar />
          <div className="z-0 flex w-full h-full relative">
            <SideNavbar />
            <div className="w-full h-full flex flex-col pb-20 gap-2 relative bg-white-200 p-4 overflow-y-scroll ">
              <Outlet />
            </div>
          </div>
        </div>
      }
     
  </>
  );
};

export default Enterprisedashboard;
