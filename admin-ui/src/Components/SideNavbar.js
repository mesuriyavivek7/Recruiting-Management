import React, { useState } from "react";
// Importing icons
import { ReactComponent as ExpandIcon } from "../assets/asset19.svg";
import { Briefcase } from 'lucide-react';
import { useSelector } from "react-redux";
import SupportIcon from '@mui/icons-material/Support';
import { BriefcaseBusiness } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Users } from 'lucide-react';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import { UserRound } from 'lucide-react';

import { NavLink, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const userData = useSelector((state) => state.admin?.userData);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [visibleTooltips, setVisibleTooltips] = useState({});

  const handleMouseEnter = (name) => {
    setVisibleTooltips((prev) => ({ ...prev, [name]: true }));
  };

  const handleMouseLeave = (name) => {
    setVisibleTooltips((prev) => ({ ...prev, [name]: false }));
  };

  // Function to handle dynamic paths based on the role
  const getNavLinkPath = (path) => {
    if (location.pathname.includes("account_manager")) {
      return path.replace("/master_admin", "/account_manager");
    } else if (location.pathname.includes("super_admin")) {
      return path.replace("/master_admin", "/super_admin");
    } else {
      return path;
    }
  };

  return (
    <div
      className={`p-3 relative bg-blue-230 border-t border-t-gray-400 flex flex-col gap-2 transition-width duration-300 font-noto-sans ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
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
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Collapse
          </div>
        )}
      </div>

      {/* Dashboard Link */}
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/master_admin/dashboard/")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("dashboard")}
          onMouseLeave={() => handleMouseLeave("dashboard")}
        >
          <LayoutDashboard className="w-[26px] text-white" />
          {isOpen && <span className="text-white">Dashboard</span>}
        </NavLink>
        {!isOpen && visibleTooltips["dashboard"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Dashboard
          </div>
        )}
      </div>

      {/* Account Manager Link (Super Admin Only) */}
      {userData?.admin_type === "super_admin" && (
        <div className="relative">
          <NavLink
            to={getNavLinkPath("/super_admin/ac_manager")}
            className={({ isActive }) =>
              `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
            }
            onMouseEnter={() => handleMouseEnter("account_manager")}
            onMouseLeave={() => handleMouseLeave("account_manager")}
          >
            <UserRound className="w-[24px] text-white" />
            {isOpen && <span className="text-white">Account Manager</span>}
          </NavLink>
          {!isOpen && visibleTooltips["account_manager"] && (
            <div
              className="absolute bg-gray-500 text-white p-1.5 rounded-md"
              style={{
                top: "0px",
                left: "65px",
                fontSize: "16px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              Account Manager
            </div>
          )}
        </div>
      )}

      {/* Enterprise Link */}
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/master_admin/enterprise")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("enterprise")}
          onMouseLeave={() => handleMouseLeave("enterprise")}
        >
          <CorporateFareOutlinedIcon style={{ color: "white", fontSize: "28px" }} />
          {isOpen && <span className="text-white">Enterprise</span>}
        </NavLink>
        {!isOpen && visibleTooltips["enterprise"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Enterprise
          </div>
        )}
      </div>

      {/* Recruiting Agency Link */}
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/master_admin/recruiting-agency")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("recruiting")}
          onMouseLeave={() => handleMouseLeave("recruiting")}
        >
          <SignalCellularAltOutlinedIcon className="w-[24px] text-white" />
          {isOpen && <span className="text-white">Recruiting Agency</span>}
        </NavLink>
        {!isOpen && visibleTooltips["recruiting"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Recruiting Agency
          </div>
        )}
      </div>

      {/* Job Link */}
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/master_admin/jobs")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("job")}
          onMouseLeave={() => handleMouseLeave("job")}
        >
          <Briefcase style={{ color: "white", fontSize: "22px" }} />
          {isOpen && <span className="text-white">Job</span>}
        </NavLink>
        {!isOpen && visibleTooltips["job"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Job
          </div>
        )}
      </div>

      {/* Candidates Link */}
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/master_admin/candidates")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("candidates")}
          onMouseLeave={() => handleMouseLeave("candidates")}
        >
          <Users className="w-[24px] text-white" />
          {isOpen && <span className="text-white">Candidates</span>}
        </NavLink>
        {!isOpen && visibleTooltips["candidates"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Candidates
          </div>
        )}
      </div>

      {/* Support Link */}
      {userData?.admin_type === "super_admin" && 
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/super_admin/support")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("support")}
          onMouseLeave={() => handleMouseLeave("support")}
        >
          <SupportIcon style={{ color: "white", fontSize: "28px" }} />
          {isOpen && <span className="text-white">Support</span>}
        </NavLink>
        {!isOpen && visibleTooltips["support"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            Support
          </div>
        )}
      </div>
      }

      {/* Account manager Job Link */}
      {userData?.admin_type === "account_manager" && 
      <div className="relative">
        <NavLink
          to={getNavLinkPath("/account_manager/myjobs")}
          className={({ isActive }) =>
            `hover:bg-gray-400 rounded-md p-2 ${!isOpen && "justify-center"} flex gap-2 ${isActive ? "bg-gray-400" : ""}`
          }
          onMouseEnter={() => handleMouseEnter("myjobs")}
          onMouseLeave={() => handleMouseLeave("myjobs")}
        >
          <BriefcaseBusiness style={{ color: "white", fontSize: "28px" }} />
          {isOpen && <span className="text-white">My Jobs</span>}
        </NavLink>
        {!isOpen && visibleTooltips["myjobs"] && (
          <div
            className="absolute bg-gray-500 text-white p-1.5 rounded-md"
            style={{
              top: "0px",
              left: "65px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            My Jobs
          </div>
        )}
      </div>
      }

    </div>
  );
};

export default SideNavbar;
