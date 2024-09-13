

import React, { useState } from "react";
import { ReactComponent as ExpandIcon } from "../assets/asset19.svg";
import { ReactComponent as DashboardIcon } from "../assets/asset28.svg";
import { ReactComponent as JobsIcon } from "../assets/asset21.svg";
import { ReactComponent as CandidatesIcon } from "../assets/asset20.svg";
import { ReactComponent as PostIcon } from "../assets/asset22.svg";
import { ReactComponent as ActionIcon } from "../assets/asset23.svg";
import { ReactComponent as OffersIcon } from "../assets/asset25.svg";
import { ReactComponent as VideosIcon } from "../assets/asset24.svg";
import { ReactComponent as SettingsIcon } from "../assets/asset26.svg";
import { ReactComponent as ChatsIcon } from "../assets/asset27.svg";
import { NavLink, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkPath = (path) => {
    if (location.pathname.includes("account-manager")) {
      return path.replace("/master_admin", "/account-manager");
    } 
    else if (location.pathname.includes("super-admin")) {
      return path.replace("/master_admin", "/super-admin");
    }
    
    else {
      return path;
    }
  };
  return (
    <div className={`p-3 relative bg-blue-230 border-t  border-t-gray-400 flex flex-col gap-2 transition-width duration-300 font-noto-sans ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} onClick={toggleSidebar}>
        <ExpandIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Collaps</span>}
      </div>
      <NavLink
        to={getNavLinkPath("/master_admin/dashboard/")}
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <DashboardIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Dashboard</span>}
      </NavLink>
      <NavLink
        to={getNavLinkPath("/master_admin/enterprise")}
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <JobsIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Enterprise</span>}
      </NavLink>
      <NavLink
        to={getNavLinkPath("/master_admin/recruiting-agency")}
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <ActionIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Recruiting Agency</span>}
      </NavLink>
      <NavLink
        to={getNavLinkPath("/master_admin/jobs")}
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <PostIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Post a Job</span>}
      </NavLink>
      <NavLink
        to={getNavLinkPath("/master_admin/candidates")}
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <CandidatesIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Candidates</span>}
      </NavLink>
     
     
     
     
     
    
    </div>
  );
};

export default SideNavbar;
