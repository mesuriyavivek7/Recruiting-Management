import React from "react";

// import { Outlet } from "react-router-dom";
import SideNavbar from "../../Components/SideNavbar";
import Navbar from "../../Components/Navbar";


import User from "../User";
import AdminDashboard from "../../Components/AdminDashboard";
import { Outlet } from "react-router-dom";


const Admin = () => {
  return ( 
    <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
      <Navbar/>
      <div className="flex w-full h-full relative gap-9 ">
        <SideNavbar/>
        

        <div className="w-full h-full flex  flex-col pb-20 gap-2 relative bg-white-200 sm:pt-4 lg:pt-6  overflow-y-scroll font-sans pr-8">
        {/*  */}
          {/* <AdminDashboard/> */}
          <Outlet/>
        </div>
      
       
      </div>
    </div>
  );
};

export default Admin;
