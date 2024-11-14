

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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { PiBuildingOfficeThin } from "react-icons/pi";
import { MdWork } from 'react-icons/md'
import { FaBriefcase } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon
const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
const navigate=useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // Use an object to track the visibility of each tooltip
  const [visibleTooltips, setVisibleTooltips] = useState({});

  // Handlers to show/hide tooltips for specific icons
  const handleMouseEnter = (name) => {
    setVisibleTooltips((prev) => ({ ...prev, [name]: true }));
  };

  const handleMouseLeave = (name) => {
    setVisibleTooltips((prev) => ({ ...prev, [name]: false }));
  };

  const getNavLinkPath = (path) => {
    if (location.pathname.includes("account_manager")) {
      return path.replace("/master_admin", "/account_manager");
    } 
    else if (location.pathname.includes("super_admin")) {
      return path.replace("/master_admin", "/super_admin");
    }
    
    else {
      return path;
    }
  };

  
  return (

<div className={`p-3 relative bg-blue-230 border-t border-t-gray-400 flex flex-col gap-2 transition-width duration-300 font-noto-sans ease-in-out ${isOpen ? "w-64" : "w-20"}`}>

{/* Toggle Sidebar Icon */}
<div
  className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 relative`}
  onClick={toggleSidebar}
  onMouseEnter={() => handleMouseEnter("collapse")}
  onMouseLeave={() => handleMouseLeave("collapse")}
>
  <ExpandIcon className="w-[24px] text-white" />
  {isOpen && <span className="text-white">Collapse</span>}

  {!isOpen && visibleTooltips["collapse"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",  // Consistent left offset
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Collapse
    </div>
  )}
</div>

{/* Dashboard Link */}
<div className="relative">
  <NavLink
    to={getNavLinkPath("/master_admin/dashboard/")}
    className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
    onMouseEnter={() => handleMouseEnter("dashboard")}
    onMouseLeave={() => handleMouseLeave("dashboard")}
  >
    <DashboardIcon className="w-[26px] text-white" />
    {isOpen && <span className="text-white">Dashboard</span>}
  </NavLink>

  {!isOpen && visibleTooltips["dashboard"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Dashboard
    </div>
  )}
</div>

{/* Enterprise Link */}
<div className="relative">
  <NavLink
    to={getNavLinkPath("/master_admin/enterprise")}
    className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
    onMouseEnter={() => handleMouseEnter("enterprise")}
    onMouseLeave={() => handleMouseLeave("enterprise")}
  >
    <PiBuildingApartmentFill style={{ color: 'white', fontSize: '28px' }} />
    {isOpen && <span className="text-white">Enterprise</span>}
  </NavLink>

  {!isOpen && visibleTooltips["enterprise"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Enterprise
    </div>
  )}
</div>

{/* Recruiting Agency Link */}
<div className="relative">
  <NavLink
    to={getNavLinkPath("/master_admin/recruiting-agency")}
    className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
    onMouseEnter={() => handleMouseEnter("recruiting")}
    onMouseLeave={() => handleMouseLeave("recruiting")}
  >
    <ActionIcon className="w-[24px] text-white" />
    {isOpen && <span className="text-white">Recruiting Agency</span>}
  </NavLink>

  {!isOpen && visibleTooltips["recruiting"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Recruiting Agency
    </div>
  )}
</div>

{/* Job Link */}
<div className="relative">
  <NavLink
    to={getNavLinkPath("/master_admin/jobs")}
    className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
    onMouseEnter={() => handleMouseEnter("job")}
    onMouseLeave={() => handleMouseLeave("job")}
  >
    <FaBriefcase style={{ color: 'white', fontSize: '22px' }} />
    {isOpen && <span className="text-white">Job</span>}
  </NavLink>

  {!isOpen && visibleTooltips["job"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Job
    </div>
  )}
</div>

{/* Candidates Link */}
<div className="relative">
  <NavLink
    to={getNavLinkPath("/master_admin/candidates")}
    className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
    onMouseEnter={() => handleMouseEnter("candidates")}
    onMouseLeave={() => handleMouseLeave("candidates")}
  >
    <CandidatesIcon className="w-[24px] text-white" />
    {isOpen && <span className="text-white">Candidates</span>}
  </NavLink>

  {!isOpen && visibleTooltips["candidates"] && (
    <div className="absolute bg-gray-400 text-white p-2 rounded-md" style={{
      top: "-40px",
      left: "60px",
      fontSize: "21px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      Candidates
    </div>
  )}
</div>

</div>


  );


};

export default SideNavbar;
