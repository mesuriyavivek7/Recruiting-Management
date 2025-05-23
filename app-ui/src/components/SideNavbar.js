import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ReactComponent as ExpandIcon } from "../assets/asset19.svg";
import { ReactComponent as DashboardIcon } from "../assets/asset28.svg";
import { ReactComponent as CandidatesIcon } from "../assets/asset20.svg";
import { ReactComponent as PostIcon } from "../assets/asset22.svg";
import { ReactComponent as ActionIcon } from "../assets/asset23.svg";
import { ReactComponent as OffersIcon } from "../assets/asset25.svg";
import { ReactComponent as VideosIcon } from "../assets/asset24.svg";
import { ReactComponent as SettingsIcon } from "../assets/asset26.svg";
import { ReactComponent as ChatsIcon } from "../assets/asset27.svg";
import Support from "../pages/Support"; 
//importing icons
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

import { Link ,useLocation} from "react-router-dom";

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false); // State for pop-up visibility
  const {isAdmin}=useContext(AuthContext)
  const location=useLocation()

  const currentPath=location.pathname

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSupportPopup = () => {
    setIsSupportVisible(!isSupportVisible); // Toggle pop-up visibility
  };

  return (
    <div className={`p-3 relative bg-blue-600 border-t border-t-gray-400 flex flex-col gap-2 ${isExpanded ? 'w-48' : 'w-16'}`}>
      {/* Expand/Collapse Button */}
      <div
        className="hover:bg-gray-400 rounded-md p-2 cursor-pointer flex items-center gap-2"
        onClick={toggleNavbar}
      >
        <ExpandIcon className="w-[24px] text-white" />
        {isExpanded && <span className="text-white">Collapse</span>}
      </div>

      {/* Navigation Links */}
      <Link to="dashboard">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/dashboard" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <DashboardIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Dashboard</span>}
        </div>
      </Link>


    
       <Link to="candidate">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/candidate" && "bg-gray-400"} rounded-md flex items-center gap-2 p-2`}>
          <CandidatesIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Candidates</span>}
        </div>
      </Link>

      <Link to="jobposting/landing">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/jobposting/landing" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <PostIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Post a Job</span>}
        </div>
      </Link>
      
      {
        isAdmin &&
        <Link to="team">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/team" && "bg-gray-400"} rounded-md flex items-center gap-2 p-2`}>
          <span className="w-[24px] text-white"><PeopleOutlinedIcon></PeopleOutlinedIcon></span>
          {isExpanded && <span className="text-white">Team</span>}
        </div>
       </Link>
      }
      
      <Link to="bulkactions">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/bulkactions" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <ActionIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Bulk Actions</span>}
        </div>
      </Link>

      <Link to="offers">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/offers" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <OffersIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Offers</span>}
        </div>
      </Link>

      <Link to="demovideos">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/demovideos" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <VideosIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Demo Videos</span>}
        </div>
      </Link>

      <Link to="settings">
        <div className={`hover:bg-gray-400 ${currentPath==="/employer/settings" && "bg-gray-400"} rounded-md p-2 flex items-center gap-2`}>
          <SettingsIcon className="w-[24px] text-white" />
          {isExpanded && <span className="text-white">Settings</span>}
        </div>
      </Link>

      {/* Support Link with Pop-up */}
      <div
        className="hover:bg-gray-400 rounded-md p-2 flex items-center gap-2 cursor-pointer"
        onClick={toggleSupportPopup} // Show pop-up on click
      >
        <ChatsIcon className="w-[24px] text-white" />
        {isExpanded && <span className="text-white">Support</span>}
      </div>

      {/* Support Pop-up */}
      {isSupportVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-5/12 max-w-xl">
            <Support />
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={toggleSupportPopup} // Close pop-up
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default SideNavbar;
