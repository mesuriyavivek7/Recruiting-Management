import React, { useContext,useState } from "react";
import asset1 from "../../assets/asset 1.png";
import asset29 from "../../assets/asset29.svg";
import asset15 from "../../assets/asset15.svg";
import { useNavigate } from "react-router-dom";
import Message from "../message/Message";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../Notification";
import axios from "axios";
import Loader from '../../assets/whiteloader.svg'
const Navbar = () => {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const [openProfile,setOpenProfile]=useState(false)
  const [openMessageBox,setOpenMessageBox]=useState(false)
  const [logoutLoader,setLogoutLoader]=useState(false)

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
      setLogoutLoader(false)
      window.location.reload()
    }catch(err){
         setLogoutLoader(false)
         showNotification("Something went wrong.",'failure')
        console.log(err)
    }
    setLogoutLoader(false)
}
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
