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
import { Link } from "react-router-dom";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`p-3 relative bg-blue-230 border-t border-t-gray-400 flex flex-col gap-2 transition-width duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 hover:`}  onClick={toggleSidebar} >
        <ExpandIcon className="w-[24px] text-black" />
        <span className=""></span>
        {isOpen && <span>Collaps</span>}
     
      </div>
      <Link to="/admin/dashboard/">
        <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
          <DashboardIcon className="w-[24px] text-black" />
          <span className=""></span>
          {isOpen && <span>Dashboard</span>}
        </div> 
      </Link>

      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <JobsIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Open Jobs</span>}
      </div>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <CandidatesIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>candidates</span>}
      </div>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <PostIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Post a Job</span>}
      </div>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <ActionIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Bulk Actions</span>}
      </div>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <OffersIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Offers</span>}
      </div>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <VideosIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Demo Videos</span>}
      </div>
      <Link to="settings">
        <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
          <SettingsIcon className="w-[24px] text-black" />
          <span className=""></span>
          {isOpen && <span>Settings</span>}
        </div>
      </Link>
      <div className={`hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2`} >
        <ChatsIcon className="w-[24px] text-black" />
        <span className=""></span>
          {isOpen && <span>Support</span>}
      </div>
    </div>
  );
};

export default SideNavbar;
