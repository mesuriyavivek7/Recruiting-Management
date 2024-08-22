import React from "react";
import asset1 from "../assets/asset 1.png";
import asset18 from "../assets/asset18.svg";
import asset29 from "../assets/asset29.svg";
import logo from "../assets/logo.jpeg"
import asset15 from "../assets/asset15.svg";
import { Link } from "react-router-dom";
// import AddIcon from '@mui/icons-material/Add';



const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-4 px-3 bg-blue-230">
      <div className="flex place-items-center gap-12">
        <div className="h-[30px] flex place-items-center overflow-hidden rounded-md">
          <img src={logo} alt="logo" width={95}  className=""/>
        </div>
        <div className=" relative search-input flex place-items-center gap-2 text-md px-4 w-[600px] bg-white-400 py-[5px] ">
          <img src={asset15} alt="search-icon" width={15} className="absolute left-6 w-6 h-6" />
        
          <input 
  type="search"
  name="search"
  id="search"
  placeholder="Search"
 
    className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-none focus:outline-none focus:w-full focus:scale-110 focus:shadow-lg transition duration-300"
/>

        </div>
      </div>
      <div className="flex place-items-center gap-4">
        

        <Link to="/">
          <img src={asset29} alt="notification" width={26} />
    
        </Link>
        <div className="w-[30px] h-[30px] rounded-full bg-white flex place-items-center ">
          <p className="text-black text-sm mx-auto">AD</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
