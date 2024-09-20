import React, { useContext,useState } from "react";
import asset1 from "../../assets/asset 1.png";
import asset29 from "../../assets/asset29.svg";
import asset15 from "../../assets/asset15.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {user}=useContext(AuthContext)
  const [openProfile,setOpenProfile]=useState(false)
  return (
   
    <div className="w-full z-60 flex justify-between py-4 px-3 bg-blue-600">
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
        <Link to="/">
          <img src={asset29} alt="notification" width={26} />
        </Link>
        <div className="relative">
          <div onClick={()=>setOpenProfile((prev)=>(!prev))} className="w-[30px] h-[30px] rounded-full cursor-pointer bg-blue-400 flex place-items-center ">
            <p className="text-white text-sm mx-auto">VM</p>
          </div>
          {
            openProfile && <div className="absolute top-16 right-4 pb-2 custom-div">
          <div className="bg-slate-100 rounded-sm flex flex-col gap-2 p-2">
            <h1 className="text-gray-600 text-lg">Enterprise</h1>
            <div>
              <h1 className="text-md">{user.full_name}</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 mt-2">
            <span className="text-gray-700  cursor-pointer font-light text-sm">Change Profile Picture</span>
            <span className="text-gray-700  cursor-pointer font-light text-sm">Log Out</span>
          </div>
        </div>
        }
        </div>
      </div>
    </div>

  
  );
};

export default Navbar;
