import React, { useEffect } from "react";

// import { Outlet } from "react-router-dom";
import SideNavbar from "../../Components/SideNavbar";
import Navbar from "../../Components/Navbar";



import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../State/Admin/Action";
import Cookies from "js-cookie"

const Admin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    const adminCookie = Cookies.get('admin_user');
    

    if (adminCookie) {
      const userData = JSON.parse(localStorage.getItem('userData'));
     
      if (userData) {
        dispatch(setUserData(userData));

      } else {
        localStorage.removeItem('userData');
        dispatch(setUserData(null));
      
      }
    } else {
      localStorage.removeItem('userData');
      
      dispatch(setUserData(null));
      navigate('/login'); 
    }
  }, [dispatch, navigate]);

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
