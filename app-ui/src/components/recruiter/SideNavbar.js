import React from "react";
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

const SideNavbar = () => {
  return (
    <div className="p-3 relative bg-blue-600 border-t border-t-gray-400 flex flex-col gap-2">
      <div className="hover:bg-gray-400 rounded-md p-2">
        <ExpandIcon className="w-[24px] text-white" />
      </div>
      <Link to="dashboard">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <DashboardIcon className="w-[24px] text-white" />
        </div>
      </Link>
      <Link to="jobs">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <JobsIcon className="w-[24px] text-white" />
        </div>
      </Link>
       <Link to="candidate">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <CandidatesIcon className="w-[24px] text-white" />
        </div>
        </Link>
        <Link to="team">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <GroupIcon className="w-[24px] text-white"></GroupIcon>
        </div>
        </Link>
      <Link to="offers">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <OffersIcon className="w-[24px] text-white" />
        </div>
      </Link>
      <hr className="bg-gray-black"></hr>
      <Link to="demovideos">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <VideosIcon className="w-[24px] text-white" />
        </div>
      </Link>
      <Link to="settings">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <SettingsIcon className="w-[24px] text-white" />
        </div>
      </Link>
      <Link to="support">
        <div className="hover:bg-gray-400 rounded-md p-2">
          <ChatsIcon className="w-[24px] text-white" />
        </div>
        </Link>
    </div>
  );
};

export default SideNavbar;
