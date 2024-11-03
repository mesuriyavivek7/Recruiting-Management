

import React, { useEffect, useRef, useState } from "react";

import asset29 from "../assets/asset29.svg";
import logo from "../assets/logo.jpeg"
import asset15 from "../assets/asset15.svg";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, Button, TextField, IconButton, Box, DialogActions } from "@mui/material";
import { MdPerson, MdEmail, MdVerifiedUser, MdBusinessCenter, MdBusiness, MdWork } from 'react-icons/md';

const Navbar = ({ enterpriseData, recruiterData }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [popupSearchTerm, setPopupSearchTerm] = useState("");
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [showEnterpriseData, setShowEnterpriseData] = useState(true); // State to toggle between enterprise and recruiter data
  const profileRef = useRef(null);
  const searchRef = useRef(null); // reference for main search input

  // Handle profile click
  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };
  const handleClose = () => {
    setOpenSearchDialog(false)
    
   
  };

  // Handle clicks outside profile to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  
  const handleSearchFocus = () => {
   
    if (!dialogOpen) setDialogOpen(true);
  };

 
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setPopupSearchTerm("");
    setTimeout(() => {
      if (document.activeElement) document.activeElement.blur();
    }, 100); // Adjust timeout if needed
  };
  // Filter data based on search term
  const filteredEnterpriseData = enterpriseData.filter((item) =>
    item.full_name.toLowerCase().includes(popupSearchTerm.toLowerCase())
  );
  const filteredRecruiterData = recruiterData.filter((item) =>
    item.full_name.toLowerCase().includes(popupSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex justify-between py-4 px-3 bg-blue-230">
      <div className="flex place-items-center gap-12">
        <div className="h-[30px] flex place-items-center overflow-hidden rounded-md">
          <img src={logo} alt="logo" width={95} className="" />
        </div>

        <div className="relative search-input flex place-items-center gap-2 text-md px-4 w-[600px] bg-white-400 py-[5px]">
          <img
            src={asset15}
            alt="search-icon"
            width={15}
            className="absolute left-6 w-6 h-6"
          />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            onClick={handleSearchFocus}
            ref={searchRef}
            className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none focus:w-full focus:scale-110 focus:shadow-lg transition duration-300"
          />
        </div>
      </div>

      <div className="flex place-items-center gap-4">
        <Link to="/">
          <img src={asset29} alt="notification" width={26} />
        </Link>
        <div
          className="w-[30px] h-[30px] rounded-full bg-white flex place-items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <p className="text-black text-sm mx-auto">AD</p>
        </div>
      </div>

      {showProfilePopup && (
        <div
          className="absolute right-0 mt-9 w-48 bg-white shadow-lg rounded-lg p-4 z-10"
          ref={profileRef}
        >
          <p className="text-sm font-semibold">admin@example.com</p>
          <p className="text-sm">Type: Domestic</p>
        </div>
      )}

      
      <Dialog
        

        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent className="relative bg-white p-6">
         
          <div className="flex place-items-center gap-2 mb-4">
            <TextField
              fullWidth
              id="popupSearch"
              placeholder="Search Here"
              variant="outlined"
              value={popupSearchTerm}
              onChange={(e) => setPopupSearchTerm(e.target.value)}
              className="text-lg" // Increased font size
              InputProps={{
                style: { borderRadius: "8px", borderColor: "blue" }, // Rounded input field
              }}
            />
          </div>

          {/* Buttons to toggle data */}
          <div className="flex gap-0 mb-4">
          <Button
          variant="contained"
          size="small"
         

          style={{
            backgroundColor:showEnterpriseData? '#315370' : '#e0e0e0',
            color: showEnterpriseData ? 'white' : '#000',
            fontSize: '20px',
            textTransform: 'none',
             height:'50px',
             border: '2px solid white', 
            borderRadius: '20px 0 0 20px',  // Rounded right side
            width: 'auto',
          }}
          onClick={() => setShowEnterpriseData(true)}
        >
          Enterprise
        </Button>
        <Button
          variant="contained"
          size="small"
         
          style={{
            backgroundColor:  !showEnterpriseData  ? '#315370' : '#e0e0e0',
            color:  !showEnterpriseData  ? 'white' : '#000',
            fontSize: '20px',
            height:'50px',
            textTransform: 'none',
            border: '2px solid white', 
            borderRadius: '0 20px 20px 0',  // Rounded left side
            width: 'auto',
            marginRight: '-1px',
            whiteSpace:'nowrap'
          }}
          onClick={() => setShowEnterpriseData(false)}
        >
          Recruiter
        </Button>
          </div>

          
          <div className="border-t pt-4 max-h-[400px] overflow-y-auto">
            {popupSearchTerm && (
              <>
                {showEnterpriseData ? (
                  <>
                    <h4 className="font-semibold text-xl">Enterprise Results:</h4>
                     {filteredEnterpriseData.length > 0 ? (
                      filteredEnterpriseData.map((item, index) => (
                       
                        <Box
  key={index}
  className="p-6 my-4 bg-white border border-gray-200 hover:shadow-lg rounded-lg shadow-sm transition duration-300"
>
  <div className="mb-3 flex items-center space-x-3">
    <MdPerson className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Full Name:</p>
    <p className="text-gray-700 text-lg">{item.full_name}</p>
  </div>

  <div className="mb-3 flex items-center space-x-3">
    <MdEmail className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Email:</p>
    <p className="text-gray-700 text-lg">{item.email}</p>
  </div>

  <div className="mb-3 flex items-center space-x-3">
    <MdVerifiedUser className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Account Status:</p>
    <p className={`text-lg ${item.account_status.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
      {item.account_status.status}
    </p>
  </div>

  <div className="flex items-center space-x-3">
    <MdBusinessCenter className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Account Manager:</p>
    <p className="text-gray-700 text-lg">{item.account_manager}</p>
  </div>
</Box>
                      ))
                    ) : (
                      <p>No enterprise results found.</p>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold text-xl">Recruiter Results:</h4>
                    {filteredRecruiterData.length > 0 ? (
  filteredRecruiterData.map((item, index) => (
    <Box
  key={index}
  className="p-6 my-4 bg-white border border-gray-200 hover:shadow-lg rounded-lg shadow-sm transition duration-300"
>
  <div className="mb-3 flex items-center space-x-3">
    <MdPerson className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Full Name:</p>
    <p className="text-gray-700 text-lg">{item.full_name}</p>
  </div>

  <div className="mb-3 flex items-center space-x-3">
    <MdEmail className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Email:</p>
    <p className="text-gray-700 text-lg">{item.email}</p>
  </div>

  <div className="mb-3 flex items-center space-x-3">
    <MdWork className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Designation:</p>
    <p className="text-gray-700 text-lg">{item.designation}</p>
  </div>

  <div className="flex items-center space-x-3">
    <MdBusiness className="text-black text-xl" />
    <p className="font-semibold text-lg text-gray-800">Company Name:</p>
    <p className="text-gray-700 text-lg">{item.company_name}</p>
  </div>
</Box>
  ))
) : (
  <p>No recruiter results found.</p>
)}
                  </> 
                )}
              </>
            )}
          </div>


          
        </DialogContent>

        <DialogActions className="bg-gray-100 px-6 py-6">
        <button
          onClick={handleCloseDialog}
          className="bg-gray-600 hover:bg-blue-230 text-white px-4 py-2 text-xl rounded-md transition-all duration-200"
        >
          Close
        </button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
