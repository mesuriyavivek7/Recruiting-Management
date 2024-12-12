import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpeg"
import asset15 from "../assets/asset15.svg";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, Button, TextField, Box, DialogActions, InputAdornment } from "@mui/material";
import { MdPerson, MdEmail, MdVerifiedUser, MdBusinessCenter } from 'react-icons/md';
import { BiSearch } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { fetchVerifedEntepreiseByACId , fetchEnterpriseById, fetchAccountManager, fetchVerifiedRAgenciesByACmanagerId, fetchRecuritingAgencybyId } from "../services/api";
import WhiteLoader from '../assets/whiteloader.svg'

const AcNavbar = () => {
  const ACManagerData = useSelector((state) => state.admin?.userData);

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileRef = useRef(null);
  const [popupSearchTerm, setPopupSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTab,setSearchTab] = useState('enterprise')
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // State for logout confirmation dialog

  const [enterpriseData,setEnterpriseData]= useState([])
  const [recruiterData,setRecruiterData] = useState([])
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRef = useRef(null); // reference for main search input
  // Handle profile click
  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  // Logout function (now handles the confirmation)
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Confirm logout
  const confirmLogout = () => {
    Cookies.remove('admin_user');
    localStorage.removeItem('userData');
    dispatch({ type: 'SET_USER_DATA', payload: null });
    navigate('/');
    setShowLogoutDialog(false);
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

  //Fetch Enterprise Data 
  const fetchEnterpriseData = async ()=>{
     setLoading(true)
     try{
       const data= await fetchVerifedEntepreiseByACId(ACManagerData?._id)

       const rows = await Promise.all(
        data.map(async (enterprise, index) => {
          // Fetch complete enterprise details
          const enterpriseData = await fetchEnterpriseById(enterprise);

          // Fetch account manager details
          const accountManager = await fetchAccountManager(
            enterpriseData?.allocated_account_manager
          );

          // Combine the fetched data
          return {
            id: enterpriseData._id || `enterprise-${index}`, // Ensure a unique id
            full_name: enterpriseData.full_name || `User ${index + 1}`,
            email: enterpriseData.email || `user${index + 1}@example.com`,
            account_status: enterpriseData.account_status || {
              status: "Inactive",
              remark: "",
              admin_id: "",
            },
            account_manager_verified:
              enterpriseData.account_manager_verified || false,
            account_manager: accountManager
              ? `${accountManager.full_name}`
              : null,
          };
        })
      );

      const filteredEnterpriseData = rows.filter((item) =>
        item?.full_name?.toLowerCase().includes(popupSearchTerm.toLowerCase())
      );

      setEnterpriseData(filteredEnterpriseData)

     }catch(err){
       console.log(err)
     }finally{
       setLoading(false)
     }
  }

  //Fetch Recruiter Data
  const fetchRecruiterData = async ()=>{
     setLoading(true)
     try{
      //fetch Ids of verified recruiter agencys
      const data = await fetchVerifiedRAgenciesByACmanagerId(ACManagerData?._id)

       //fetch more details about recruiter agency
       const rows = await Promise.all(
        data.map(async (agency_id, index) => {
          const agency = await fetchRecuritingAgencybyId(agency_id);

          //Fetch account manager of particuler recruiter agency
          const acmanager = await fetchAccountManager(
            agency?.alloted_account_manager
          );

          return {
            _id: agency._id,
            full_name: agency.full_name || `User ${index + 1}`,
            email: agency.email || `user${index + 1}@example.com`,
            account_status: agency.account_status.status,
            account_manager: acmanager ? acmanager.full_name : null,
          };
        })
      );

      const filteredRecruiterData = rows.filter((item) =>
        item.full_name.toLowerCase().includes(popupSearchTerm.toLowerCase())
      );

      setRecruiterData(filteredRecruiterData);

     }catch(err){
       console.log(err)
     }finally{
      setLoading(false)
     }
  }

  useEffect(() => {
    if (searchTab === "enterprise") fetchEnterpriseData();
    else fetchRecruiterData();
  }, [popupSearchTerm, searchTab]);
  

  return (
    <div className="w-full flex justify-between py-4 px-3 bg-blue-230">
      <div className="flex place-items-center gap-12">
         <div className="p-1 bg-white rounded-md">
            <img src={logo} className="w-24 h-7"></img>
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
            className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300  focus:outline-none "
          />
        </div>
      </div>

      <div className="flex place-items-center gap-4">
        <Link onClick={handleLogout}>
          <MdLogout size={26} className="text-white" /> {/* Logout icon */}
        </Link>
        <div
          className="w-[30px] h-[30px] rounded-full bg-white flex place-items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <p className="text-black text-sm mx-auto">AC</p>
        </div>
      </div>

      {showProfilePopup && (
        <div
          className="absolute right-0 mt-9 w-48 bg-white shadow-lg rounded-lg p-4 z-10"
          ref={profileRef}
        >
          <p className="text-sm font-semibold">{ACManagerData.admin_type}</p>
          <p className="text-sm">{ACManagerData.email}</p>
        </div>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent className="relative bg-white p-6" style={{ height: '500px', maxHeight: '500px', overflowY: 'hidden' }}>
          <h2 className="text-xl font-bold mb-4">Search Users</h2>
          <div className="flex place-items-center gap-2 mb-4">
            <TextField
              fullWidth
              id="popupSearch"
              placeholder="Search Here"
              variant="outlined"
              value={popupSearchTerm}
              onChange={(e) => setPopupSearchTerm(e.target.value)}
              className="text-lg"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiSearch size={24} style={{ color: "gray" }} />
                  </InputAdornment>
                ),
                style: { borderRadius: "8px", borderColor: "blue" },
              }}
            />
          </div>

          {/* Buttons to toggle data */}
          <div className="flex gap-0 mb-4">
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: searchTab==="enterprise" ? '#315370' : '#e0e0e0',
                color: searchTab==="enterprise" ? 'white' : '#000',
                fontSize: '20px',
                textTransform: 'none',
                height: '40px',
                border: '2px solid white',
                borderRadius: '20px 0 0 20px',
                width: 'auto',
              }}
              onClick={() => setSearchTab('enterprise')}
            >
              Enterprise
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: searchTab==="recruiter" ? '#315370' : '#e0e0e0',
                color: searchTab==="recruiter" ? 'white' : '#000',
                fontSize: '20px',
                height: '40px',
                textTransform: 'none',
                border: '2px solid white',
                borderRadius: '0 20px 20px 0',
                width: 'auto',
                marginRight: '-1px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setSearchTab('recruiter')}
            >
              Recruiter
            </Button>
          </div>
          {
            loading ? (
              <div className="mt-4 w-full flex justify-center items-center">
                <img src={WhiteLoader} alt="loader" className="w-8 h-8"></img>
              </div>
            ) : (
              <div className="border-t pt-4 mt-2 max-h-[300px] overflow-y-auto">
            {popupSearchTerm && (
              <>
                {searchTab==="enterprise" ? (
                  <>
                    <h4 className="font-semibold text-xl">Enterprise Results:</h4>
                    {enterpriseData.length > 0 ? (
                      enterpriseData.map((item, index) => (

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
                    {recruiterData.length > 0 ? (
                      recruiterData.map((item, index) => (
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
                            <p className={`${item.account_status==="Active"?"text-green-500":"text-red-500"} text-lg`}>{item.account_status}</p>
                          </div>

                          <div className="flex items-center space-x-3">
                          <MdBusinessCenter className="text-black text-xl" />
                            <p className="font-semibold text-lg text-gray-800">Account Manager:</p>
                            <p className="text-gray-700 text-lg">{item.account_manager}</p>
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

            )
          }

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

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutDialog}
        onClose={cancelLogout}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <h2 className="text-xl font-semibold mb-5">Are you sure you want to log out ??</h2>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} variant="outlined"
            sx={{
              color: '#315370',
              border: '1px solid',
              borderColor: '#0C4A6E',
              height: '36px',
              width: '80px',
              '&:hover': {
                borderColor: "#0C4A6E",
                color: "#315380"
              },
            }}>
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            id="demo-customized-button"
            aria-haspopup="true"
            variant="contained"
            sx={{
              backgroundColor: '#315370',
              '&:hover': {
                backgroundColor: "#0C4A6E",
              },
              height: '36px',
              width: '80px',
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcNavbar;

