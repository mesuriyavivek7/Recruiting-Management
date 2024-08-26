import React, { useState } from "react";
import asset1 from "../assets/asset 1.png";
import asset18 from "../assets/asset18.svg";
import asset29 from "../assets/asset29.svg";
import asset15 from "../assets/asset15.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openProfile,setOpenProfile]=useState(false)
  return (
   
    <div className="w-full relative flex justify-between py-4 px-3 bg-blue-600">
      <div className="flex place-items-center gap-12">
        <div className="h-[30px] flex place-items-center overflow-hidden rounded-md">
          <img src={asset1} alt="logo" width={95} />
        </div>
        <div className="search-input flex place-items-center gap-2 text-sm px-4 w-[600px] bg-white-400 py-[5px] rounded-md">
          <img src={asset15} alt="search-icon" width={15} />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="bg-transparent w-full "
          />
        </div>
      </div>
      <div className="flex place-items-center gap-4">
        <Link to="jobposting/postjob">
          <button
            type="button"
            className="bg-blue-400 rounded-md py-1 px-2 flex place-items-center gap-3"
          >
            <img src={asset18} alt="plus-icon" width={16} />
            <span className="text-white">Post a Job</span>
          </button>
        </Link>

        <Link to="/">
          <img src={asset29} alt="notification" width={26} />
        </Link>
        <div className="w-[30px] h-[30px] rounded-full bg-blue-400 flex place-items-center ">
          <p className="text-white text-sm mx-auto">VM</p>
        </div>
      </div>
    </div>
  
  );
};

export default Navbar;
