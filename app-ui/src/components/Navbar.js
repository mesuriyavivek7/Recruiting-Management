import React, { useContext, useRef, useEffect, useState } from "react";
import asset1 from "../assets/asset 1.png";
import asset18 from "../assets/asset18.svg";
import asset29 from "../assets/asset29.svg";
import asset15 from "../assets/asset15.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Message from "./message/Message";
import axios from "axios";
import Notification from "./Notification";
import { cstatus } from "./statuschange/StatusMapping";

//importing icons
import SearchIcon from '@mui/icons-material/Search';

//import loader
import Loader from '../assets/whiteloader.svg'

const Navbar = () => {
  const {user}=useContext(AuthContext)
  const [openProfile,setOpenProfile]=useState(false)
  const [openMessageBox,setOpenMessageBox]=useState(false)
  const [openSearchBox,setOpenSearchBox]=useState(false)
  const [logoutLoader,setLogoutLoader]=useState(false)

  //Search States
  const [searchTearm,setSearchTearm]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [loader,setLoader]=useState(false)
  const [searchTab,setSearchTab]=useState('Candidates')

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }

  const getShortName=(str)=>{
     let ans=""
     let arr=str.split(" ")

     if(arr.length>=2){
      ans+=arr[0][0].toUpperCase()        
      ans+=arr[1][0].toUpperCase()
     }else{
       ans+=arr[0][0].toUpperCase()
     }

     return ans;
   
  }

  const handleLogout=async ()=>{
      setLogoutLoader(true)
      try{
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`,{},{withCredentials:true})
        window.location.reload()
      }catch(err){
           showNotification("Something went wrong.",'failure')
          console.log(err)
      }finally{
        setLogoutLoader(false)
      }
      
  }

  useEffect(()=>{
    const searchJobs=async ()=>{
      setLoader(true)
      try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/search-job-enterprise/${user._id}?searchTearm=${searchTearm}`)
          setSearchResults(res.data)
      }catch(err){
          console.log(err)
          showNotification("Something went wrong.",'failure')
      }finally{
        setLoader(false)
      }
    }
  
    const searchCandidates=async ()=>{
      setLoader(true)
       try{
         const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/search-candidate-enterprise/${user._id}?searchTearm=${searchTearm}`)
         setSearchResults(res.data)
       }catch(err){
         console.log(err)
         showNotification("Something went wrong.",'failure')
       }finally{
         setLoader(false)
       }
    }

     if(searchTab==="Candidates") searchCandidates()
     else searchJobs()
  },[searchTearm,searchTab])

  

  const popupRef=useRef(null)
  const profilePopRef = useRef(null)

  useEffect(()=>{
    const handleClickOutside = (event) => {
      // Check if the click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenSearchBox(false); // Close the popup
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  useEffect(()=>{
    const handleClickOutside = (event) => {
      // Check if the click is outside the popup
      if (profilePopRef.current && !profilePopRef.current.contains(event.target)) {
        setOpenProfile(false); // Close the popup
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  return (
   <>
     {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
     {
      logoutLoader && 
      <div className="fixed inset-0 z-50 flex bg-black justify-center bg-opacity-50 backdrop-blur-md items-center">
       <div className="custom-div w-96 pb-4 items-center">
           <img className="w-8 h-8" src={Loader}></img>
           <span>Please wait till we logout...</span>
       </div>
     </div>
     }
     {
    openSearchBox && 
    <div className="fixed inset-0 z-50 flex bg-black justify-center bg-opacity-50 backdrop-blur-md items-start">
         <div ref={popupRef} className="custom-div gap-0 w-[40%] p-0 mt-[80px]">
             <div className="bg-white p-2 rounded-md overflow-hidden flex items-center gap-2 w-full">
                <span className="text-gray-400"><SearchIcon></SearchIcon></span>
                <input onChange={(e)=>setSearchTearm(e.target.value)} className="w-full outline-none text-[15px]" placeholder="Search Job/Candidate" type="text" ></input>
             </div>
             <div className="w-full flex items-center p-2 border-t">
               <button onClick={()=>setSearchTab("Candidates")} className={`text-[15px] ${searchTab==="Candidates" && "border-blue-400 text-blue-400"} rounded-l-md py-1 px-2 border`}>Candidates</button>
               <button onClick={()=>setSearchTab("Jobs")} className={`text-[15px] ${searchTab==="Jobs" && "border-blue-400 text-blue-400"} rounded-r-md py-1 px-2 border`}>Jobs</button>
             </div>
             {
                loader ? 
                <div className="w-full py-4 flex justify-center items-center">
                   <img src={Loader} className="w-8 h-8 " alt="loader"></img>
                </div> :
                <div className="flex flex-col w-full p-2 gap-2">
                 <span>{searchResults.length} Search Results Found</span>
                 {
                    searchResults.length>0 && 
                    <div className="h-[12rem] flex flex-col gap-1.5 overflow-auto w-full ">
                      {
                        searchTab==="Candidates" && 
                        searchResults.map((item)=>(
                           <span className="rounded-md border font-medium text-[15px] px-2 py-3">
                              {`CId: ${item.candidate_id} - ${item.candidate_name} - ${item.candidate_country}`}
                              <span className="bg-slate-50 p-1 border rounded-md mx-1.5 text-sm">{cstatus.get(item.candidate_status)}</span>
                           </span>
                        ))
                      }
                      {
                        searchTab==="Jobs" && 
                        searchResults.map((item)=>(
                          <span className="rounded-md cursor-pointer border font-medium text-[15px] px-2 py-3">
                             {`Job Id: ${item.job_id} - ${item.job_title} - ${item.job_state} - ${item.job_country}`}
                             <span className={`p-1 mx-2 rounded-md text-sm text-white ${item.job_status==="Active"?"bg-green-500":"bg-red-500"} `}>{item.job_status}</span>
                          </span>
                        ))
                      }
                    </div>
                 }
                </div>
             }
         </div>
    </div>
   }

    <div className="w-full z-60 flex justify-between py-4 px-3 bg-blue-600">
      <div className="flex place-items-center gap-12">
        <div className="h-[35px] bg-white p-4 flex place-items-center overflow-hidden rounded-md">
          <img src={asset1} alt="logo" width={80} />
        </div>
        <div onClick={()=>setOpenSearchBox(true)} className="search-input flex place-items-center gap-2 text-sm px-4 w-[600px] bg-white-400 py-[5px] rounded-md">
          <img src={asset15} alt="search-icon" width={15} />
          <span className="text-gray-500 text-sm">Search</span>
        </div>
      </div>
      <div className="flex place-items-center gap-4">
        <Link to="jobposting/landing">
          <button
            type="button"
            className="bg-blue-400 rounded-md py-1 px-2 flex place-items-center gap-3"
          >
            <img src={asset18} alt="plus-icon" width={16} />
            <span className="text-white">Post a Job</span>
          </button>
        </Link>

        <div className="relative">
          <img onClick={()=>setOpenMessageBox(true)} src={asset29} className="cursor-pointer" alt="notification" width={26} />
          {
            openMessageBox && (
              <Message setOpenMessageBox={setOpenMessageBox}></Message>
            )
          }
        </div>
        
        <div className="relative">
          <div onClick={()=>setOpenProfile((prev)=>(!prev))} className="w-[30px] h-[30px] rounded-full cursor-pointer bg-blue-400 flex place-items-center ">
            <p className="text-white text-sm mx-auto">{user && getShortName(user.full_name)}</p>
          </div>
          {
          openProfile && 
          <div ref={profilePopRef} className="absolute z-40 top-16 right-4 pb-2 custom-div">
           <div className="bg-slate-100 rounded-sm flex flex-col gap-2 p-2">
             <h1 className="text-gray-600 text-lg">Enterprise</h1>
             <div>
               <h1 className="text-md">{user.full_name}</h1>
               <p className="text-sm text-gray-400">{user.email}</p>
             </div>
           </div>
           <div className="w-full flex flex-col mt-2">
             <span className="text-gray-700 hover:bg-gray-200  p-1 cursor-pointer font-light text-sm">Change Profile Picture</span>
             <span onClick={handleLogout} className="text-gray-700 hover:bg-gray-200 p-1  cursor-pointer font-light text-sm">Log Out</span>
           </div>
         </div>
        }
        </div>
      </div>
    </div>

    </>
  );
};

export default Navbar;
