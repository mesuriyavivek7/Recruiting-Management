import React, { useState } from "react";
import { ReactComponent as ExpandIcon } from "../../assets/asset19.svg";
import { ReactComponent as DashboardIcon } from "../../assets/asset28.svg";
import { ReactComponent as JobsIcon } from "../../assets/asset21.svg";
import { ReactComponent as CandidatesIcon } from "../../assets/asset20.svg";
import GroupIcon from '@mui/icons-material/Group';
import { ReactComponent as OffersIcon } from "../../assets/asset25.svg";
import { ReactComponent as VideosIcon } from "../../assets/asset24.svg";
import { ReactComponent as SettingsIcon } from "../../assets/asset26.svg";
import { ReactComponent as ChatsIcon } from "../../assets/asset27.svg";
import { Link } from "react-router-dom";
import Support from "../../pages/Support"; 

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false); // State for pop-up visibility

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSupportPopup = () => {
    setIsSupportVisible(!isSupportVisible); // Toggle pop-up visibility
  };

  return (
    <>
    <div className={`p-3 relative bg-blue-600 border-t border-t-gray-400 flex flex-col gap-2 transition-all ${isExpanded ? "w-60" : "w-16"}`}>
      <div 
        className="hover:bg-gray-400 rounded-md p-2 cursor-pointer flex items-center" 
        onClick={handleExpand}
      >
        <ExpandIcon className="w-[24px] text-white" />
        {isExpanded && <span className="ml-3 text-white">Collapse</span>}
      </div>
      
      <Link to="dashboard">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <DashboardIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Dashboard</span>}
        </div>
      </Link>
      
      <Link to="jobs">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <JobsIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Jobs</span>}
        </div>
      </Link>
      
      <Link to="candidate">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <CandidatesIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Candidates</span>}
        </div>
      </Link>
      
      <Link to="team">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <GroupIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Team</span>}
        </div>
      </Link>
      
      <Link to="offers">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <OffersIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Offers</span>}
        </div>
      </Link>
      
      <hr className="bg-gray-black"></hr>
      
      <Link to="demovideos">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <VideosIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Demo Videos</span>}
        </div>
      </Link>
      
      <Link to="settings">
        <div className="hover:bg-gray-400 rounded-md p-2 flex items-center">
          <SettingsIcon className="w-[24px] text-white" />
          {isExpanded && <span className="ml-3 text-white">Settings</span>}
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 max-w-md">
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


    </>
  );
};

export default SideNavbar;
