import React, { useState,useContext, useEffect } from 'react'

import Notification from '../components/Notification';

//importing icons
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LiveJobs from '../components/recruitjobs/LiveJobs';
import MappedJobs from '../components/recruitjobs/MappedJobs';
import AcceptedJobs from '../components/recruitjobs/AcceptedJobs';
import FavouriteJobs from '../components/recruitjobs/FavouriteJobs';

import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

export default function Jobs() {

  const {user}=useContext(AuthContext) 

  const [currentTabe,setCurrentTabe]=useState('accepted')
  const [acceptedJobs,setAcceptedJobs]=useState([])
  const [mappedJobs,setMappedJobs]=useState([])
  const [liveJobs,setLiveJobs]=useState([])
  const [favouriteJobs,setFavouriteJobs]=useState([])

  //loader
  const [liveLoader,setLiveLoader]=useState(false)
  const [mappedLoader,setMappedLoader]=useState(false)
  const [acceptedLoader,setAcceptedLoader]=useState(false)
  const [favouriteLoader,setFavouriteLoader]=useState(false)


  //Fetch live jobs
  const fetchLiveJobs=async ()=>{
   try{
      setLiveLoader(true)
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getlivejobs/${user._id}`)
      console.log(res.data)
      setLiveJobs(res.data)
   }catch(err){
     showNotification("Something went wrong.",'failure')
     setLiveLoader(false)
     console.log(err)
   }
   setLiveLoader(false)
  }

  //Fetch Mapped jobs
  const fetchMappedJobs=async ()=>{
   try{
      setMappedLoader(true)
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontmappedjobs/${user._id}`)
      console.log(res.data)
      setMappedJobs(res.data)
   }catch(err){
      showNotification("Something went wrong.",'failure')
      setMappedLoader(false)
      console.log(err)
   }
   setMappedLoader(false)
  }

  //Fetch Accepted jobs
  const fetchAcceptedJobs=async ()=>{
   try{
     setAcceptedLoader(true)
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontacceptedjobs/${user._id}`)
     console.log('accepted jobs---->',res.data)
     setAcceptedJobs(res.data)
   }catch(err){
     setAcceptedLoader(false)
     showNotification("Something went wrong.",'failure')
     console.log(err)
   }
   setAcceptedLoader(false)
 }

 //Fetch Favourite Jobs
 const fetchFavouriteJobs=async ()=>{
   try{
     setFavouriteLoader(true)
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontfavouritejobs/${user._id}`)
     console.log('favourite jobs--->',res.data)
     setFavouriteJobs(res.data)
   }catch(err){
     setFavouriteLoader(false)
     console.log(err)
     showNotification("Something went wrong.",'failure')
   }
   setFavouriteLoader(false)
 }


 useEffect(()=>{
     fetchAcceptedJobs()
     fetchMappedJobs()
     fetchLiveJobs()
     fetchFavouriteJobs()
 },[])

 const [notification,setNotification]=useState(null)

 //for showing notification
 const showNotification=(message,type)=>{
  setNotification({message,type})
}


  const renderForm=()=>{
        switch(currentTabe){
          case "accepted": 
             return <AcceptedJobs 
             fetchAcceptedJobs={fetchAcceptedJobs} 
             fetchFavouriteJobs={fetchFavouriteJobs} 
             fetchMappedJobs={fetchMappedJobs}
             jobs={acceptedJobs} 
             showNotification={showNotification} 
             loader={acceptedLoader}>
             </AcceptedJobs>
          case "mapped":
             return <MappedJobs 
             fetchAcceptedJobs={fetchAcceptedJobs} 
             fetchMappedJobs={fetchMappedJobs}
             jobs={mappedJobs} 
             showNotification={showNotification} 
             loader={mappedLoader}
             setLoader={setMappedLoader}
             >
             </MappedJobs>
          case "live":
             return <LiveJobs 
             jobs={liveJobs} 
             fetchLiveJobs={fetchLiveJobs}
             setLoader={setLiveLoader}
             showNotification={showNotification} 
             loader={liveLoader}>
             </LiveJobs>
          case "favourite":
             return <FavouriteJobs 
             fetchAcceptedJobs={fetchAcceptedJobs}
             fetchFavouriteJobs={fetchFavouriteJobs}
             jobs={favouriteJobs} 
             showNotification={showNotification} 
             loader={favouriteLoader}>
             </FavouriteJobs>
        }
  }

  const handleCurrentTabe=(state)=>{
    setCurrentTabe(state)
  }
  return (
    <div className='flex flex-col gap-2'>
      {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
       <div className='custom-div py-4'>
          <div className='w-full flex justify-between'>
            <div className='flex gap-4 items-center'>
                <h1 className='text-xl font-medium'>Jobs</h1>
                <VideocamOutlinedIcon style={{fontSize:'1.2rem',color:'#475569'}}></VideocamOutlinedIcon>
            </div>
            <div className='flex gap-2'>
                <div className='flex items-center gap-1 p-2 overflow-hidden border outline-blue-400 border-opacity-40 border-gray-400 rounded-md'>
                   <SearchIcon style={{fontSize:'1.2rem',color:'#575757'}}></SearchIcon>
                   <input
                    className='text-sm outline-none h-full'
                    type='text'
                    placeholder='Job Title / Id'
                    ></input>
                </div>
                <div className='flex items-center'>
                    <div className='p-2 items-center flex border rounded-l-md border-opacity-40 border-e-gray-400'>
                       <ArrowDropDownIcon></ArrowDropDownIcon>
                        <span className='text-gray-800'>Filters</span>
                    </div>
                    <div className='p-2 items-center border rounded-r-md border-opacity-40 border-e-gray-400'>
                        <span className='text-gray-800'>Guidelines</span>
                    </div>
                </div>
            </div>
          </div>
          <div className='flex gap-6'>
             <div onClick={()=>handleCurrentTabe('accepted')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='accepted')?("text-blue-400 hover:text-blue-500"):("text-gray-400 hover:text-black")}`}>Accepted Jobs</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='accepted')?("text-blue-400"):("text-black")}`}>{acceptedJobs.length}</span>
                </div>
                {
                    (currentTabe==="accepted") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('mapped')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='mapped')?("text-blue-400 hover:text-blue-500"):("text-gray-400 hover:text-black")}`}>Mapped Jobs</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='mapped')?("text-blue-400"):("text-black")}`}>{mappedJobs.length}</span>
                </div>
                {
                    (currentTabe==="mapped") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('live')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='live')?("text-blue-400 hover:text-blue-500"):("text-gray-400 hover:text-black")}`}>Live Positions</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='live')?("text-blue-400"):("text-black")}`}>{liveJobs.length}</span>
                </div>
                {
                    (currentTabe==="live") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('favourite')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='favourite')?("text-blue-400 hover:text-blue-500"):(" text-black")}`}>Favourite Jobs</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='favourite')?("text-blue-400"):("text-black")}`}>{favouriteJobs.length}</span>
                </div>
                {
                    (currentTabe==="favourite") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
          </div>
       </div>
       <div>
        {renderForm()}
       </div>
    
      
    </div>

  )
}
