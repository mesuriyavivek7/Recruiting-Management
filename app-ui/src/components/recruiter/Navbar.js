import React, { useContext, useEffect, useRef ,useState } from "react";
import asset1 from "../../assets/asset 1.png";
import asset29 from "../../assets/asset29.svg";
import asset15 from "../../assets/asset15.svg";
import { useNavigate } from "react-router-dom";
import Message from "../message/Message";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../Notification";
import axios from "axios";
import Loader from '../../assets/whiteloader.svg'

import WhiteLoader from '../../assets/whiteloader.svg'

//importing icons
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const [openProfile,setOpenProfile]=useState(false)
  const [openMessageBox,setOpenMessageBox]=useState(false)
  const [logoutLoader,setLogoutLoader]=useState(false)
  const [openSearchBox,setOpenSearchBox]=useState(false)

  //Search States
  const [searchTearm,setSearchTearm]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [loader,setLoader]=useState(false)
  const [searchTab,setSearchTab]=useState('Candidates')

  const searchCandidates=async ()=>{
    setLoader(true)
     try{
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/search-candidate-recruiter/${user._id}?searchTearm=${searchTearm}`)
        setSearchResults(res.data)
     }catch(err){
       console.log(err)
       showNotification("Something went wrong.",'failure')
     }finally{
       setLoader(false)
     }
  }


  const searchJobs=async () => {
      setLoader(true)
      try{
         const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/search-job-recruiter/${user._id}?searchTearm=${searchTearm}`)
         setSearchResults(res.data)
      }catch(err){
         console.log(err)
         showNotification("Something went wrong.",'failure')
      }finally{
         setLoader(false)
      }
  }

  useEffect(()=>{
      if(searchTab==="Candidates") searchCandidates()
      else searchJobs()
  },[searchTearm,searchTab])



  const popupRef=useRef(null)

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

  const handleNavigateToProfilePage=()=>{ 
    setOpenProfile(false)
     navigate('/recruiter/srprofilepage')
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
  
  return (
   <>
   {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
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
                   <img src={WhiteLoader} className="w-8 h-8 " alt="loader"></img>
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
                              {`CId: ${item.candidate_id} - ${item.first_name} ${item.last_name} - ${item.current_location}`}
                           </span>
                        ))
                      }
                      {
                        searchTab==="Jobs" && 
                        searchResults.map((item)=>(
                          <span className="rounded-md border font-medium text-[15px] px-2 py-3">
                             {`Job Id: ${item.job_id} - ${item.job_title} - ${item.state} - ${item.country}`}
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
   {
      logoutLoader && 
      <div className="fixed inset-0 z-50 flex bg-black justify-center bg-opacity-50 backdrop-blur-md items-center">
       <div className="custom-div w-96 pb-4 items-center">
           <img className="w-8 h-8" src={Loader}></img>
           <span>Please wait till we logout...</span>
       </div>
     </div>
     }


    <div className="w-full z-60 flex justify-between py-4 px-3 bg-blue-600">
      <div className="flex place-items-center gap-12">
        <div className="h-[30px] flex place-items-center overflow-hidden rounded-md">
          <img src={asset1} alt="logo" width={95} />
        </div>
        <div onClick={()=>setOpenSearchBox(true)} className="search-input cursor-pointer flex place-items-center gap-3 text-sm px-4 w-[600px] bg-white-400 py-[5px] rounded-md">
          <img src={asset15} alt="search-icon" width={15} />
          <span className="text-gray-500 text-sm">Search</span>
        </div>
      </div>
      <div className="flex place-items-center gap-4">
        <div className="relative">
          <img className="cursor-pointer" onClick={()=>setOpenMessageBox(true)} src={asset29} alt="notification" width={26} />
          {
            openMessageBox && (
              <Message setOpenMessageBox={setOpenMessageBox}></Message>
            )
          }
        </div>
        <div className="relative">
          <div onClick={()=>setOpenProfile((prev)=>(!prev))} className="w-[30px] h-[30px] rounded-full cursor-pointer bg-blue-400 flex place-items-center ">
            <p className="text-white cursor-pointer text-sm mx-auto">{user && getShortName(user.full_name)}</p>
          </div>
          {
            openProfile && <div className="absolute top-16 right-4 pb-2 z-50 custom-div">
          <div className="bg-slate-100 rounded-sm flex flex-col gap-2 p-2">
            <h1 className="text-gray-600 text-lg">Recruiter</h1>
            <div>
              <h1 className="text-md">{user.full_name}</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 mt-1">
            <span onClick={handleNavigateToProfilePage}  className="text-gray-700 rounded-md hover:bg-slate-200 p-1 cursor-pointer font-light text-[14px]">My Profile</span>
            <span className="text-gray-700 rounded-md hover:bg-slate-200 cursor-pointer p-1 font-light text-[14px]">Settings</span>
            <span onClick={handleLogout} className="text-gray-700 rounded-md hover:bg-slate-200 cursor-pointer p-1 font-light text-[14px]">Log Out</span>
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
