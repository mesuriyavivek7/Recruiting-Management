

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
import { NavLink } from "react-router-dom";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`p-3 relative bg-blue-230 border-t border-t-gray-400 flex flex-col gap-2 transition-width duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} onClick={toggleSidebar}>
        <ExpandIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Collaps</span>}
      </div>
      <NavLink
        to="/admin/dashboard/"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <DashboardIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Dashboard</span>}
      </NavLink>
      <NavLink
        to="/admin/enterprise"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <JobsIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">EnterPrice</span>}
      </NavLink>
      <NavLink
        to="/admin/candidates"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <CandidatesIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Candidates</span>}
      </NavLink>
      <NavLink
        to="/admin/post"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <PostIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Post a Job</span>}
      </NavLink>
      <NavLink
        to="/admin/action"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <ActionIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Bulk Actions</span>}
      </NavLink>
      <NavLink
        to="/admin/offers"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <OffersIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Offers</span>}
      </NavLink>
      <NavLink
        to="/admin/videos"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <VideosIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Demo Videos</span>}
      </NavLink>
      <NavLink
        to="/admin/settings"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <SettingsIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Settings</span>}
      </NavLink>
      <NavLink
        to="/admin/support"
        className={({ isActive }) => `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? 'bg-gray-400' : ''}`}
      >
        <ChatsIcon className="w-[24px] text-white" />
        <span className=""></span>
        {isOpen && <span className="text-white">Support</span>}
      </NavLink>
    </div>
  );
};

export default SideNavbar;
