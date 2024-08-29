import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SideNavbar from "../../components/SideNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'


const Enterprisedashboard = () => {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()

  useEffect(()=>{
    if(!user){
     navigate('/')
    }
  },[])
  return (
    <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
      <Navbar />
      <div className="z-0 flex w-full h-full relative">
        <SideNavbar />
        <div className="w-full h-full flex flex-col pb-20 gap-2 relative bg-white-200 p-4 overflow-y-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Enterprisedashboard;
