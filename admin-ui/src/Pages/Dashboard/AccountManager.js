import React, { useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import AcNavbar from "../../Components/AcNavbar";


const AccountManager = () => {
  const navigate = useNavigate()
  const myValue = useSelector((state) => state.admin)

  useEffect(() => {
    if (!myValue) {
      navigate('/')
    }
  }, [myValue])
  
  return (
    <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
      <AcNavbar />
      <div className="flex w-full h-full relative gap-9 ">
        <SideNavbar />
        <div className="w-full h-full flex  flex-col pb-20 gap-2 relative bg-white-200 sm:pt-4 lg:pt-6  overflow-y-scroll font-sans pr-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountManager;
