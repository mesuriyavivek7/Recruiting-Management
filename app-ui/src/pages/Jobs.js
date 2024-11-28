import React, { useState, useContext, useEffect, useRef } from 'react'

import Notification from '../components/Notification';

//importing icons
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LiveJobs from '../components/recruitjobs/LiveJobs';
import MappedJobs from '../components/recruitjobs/MappedJobs';
import AcceptedJobs from '../components/recruitjobs/AcceptedJobs';
import FavouriteJobs from '../components/recruitjobs/FavouriteJobs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//Import images
import FIRE from '../assets/asset39.png'

import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

export default function Jobs() {

  const {user}=useContext(AuthContext) 

  const [currentTabe,setCurrentTabe]=useState('accepted')
  const [acceptedJobs,setAcceptedJobs]=useState([])
  const [mappedJobs,setMappedJobs]=useState([])
  const [liveJobs,setLiveJobs]=useState([])
  const [favouriteJobs,setFavouriteJobs]=useState([])

  const [searchTearm,setSearchTearm]=useState('')

  const popupRef=useRef(null)

  useEffect(()=>{
    const handleClickOutside = (event) => {
      // Check if the click is outside the popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenJobTypeDropDown(false); // Close the DropDown
        setOpenDomainDropDown(false);
        setLocationDropDown(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  //Filter stats
  const [openFilterBox,setOpenFilterBox]=useState(false)
  //For the job type
  const [jobType,setJobType]=useState("All")
  const [openJobTypeDropDown,setOpenJobTypeDropDown]=useState(false)
  //For the domains
  const domains = [
    "Accounting/Corporate Finance",
    "Administrative/Generalist",
    "Advertising/Event Management/PR/MR",
    "Aerospace",
    "Agriculture/Dairy/Fishing",
    "Allied Healthcare",
    "Architecture/Interior Design",
    "Automotive/Ancillaries",
    "Information technology (IT)",
    "Legal/Law/Secretarial",
    "Logistics/Supply Chain",
    "Maid Services",
    "Manufacturing/Industrial/Production/Machinery",
    "Petroleum/Oil & Gases/Energy/Utilities",
    "Pharmaceuticals/Biotechnology/Clinical Research",
    "Real Estate/Property",
    "Banking/Financial Services/Insurance",
    "BPO/KPO/ITES/CRM/Transcription/E-Learning",
    "Broadcasting",
    "Chemicals/Fertilizers/Polymer/Plastic/Rubber",
    "Communication/Telcom/ISP",
    "Construction/Cement/Metals/Infrastructure",
    "Consulting/Strategy",
    "Courier/Freight/Transportation",
    "Food Processing/Beverages/Nutrition",
    "Hardware/Chip Design & Embedded Software",
    "HealthCare -Doctors/Surgeons/physicians",
    "Healthcare- Hospital Administration",
    "Healthcare- Nurses & Support Workers",
    "Hospitality/Airlines/Travel/Tourism",
    "Human Resources/Talent Acquisition",
    "Information security/Cyber Security/IT security and Audit",
    "Shipping/Marine"
  ];
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [openDomainDropDown,setOpenDomainDropDown] = useState(false)

  const handleChangeDomains = (e) => {
    const value = e.target.value; // Get the value from the event
    if (selectedDomains.includes(value)) {
      // Remove the value if it exists
      setSelectedDomains((prevData) => prevData.filter((item) => item !== value));
    } else {
      // Add the value if it doesn't exist
      setSelectedDomains((prevData) => [...prevData, value]);
   }
  };

  //For the Locations 
  const locations=['India','Australia','United States']
  const [selectedLocations,setSelectedLocations]=useState([])
  const [openLocationDropDown,setLocationDropDown]=useState(false)
  const handleChangeLocations=(e)=>{
    const value = e.target.value
     if(selectedLocations.includes(value)){
      setSelectedLocations((prevData) => prevData.filter((item) => item !== value))
     }else{ 
      setSelectedLocations((prevData) => [...prevData, value])
     }
  }
  

  //loader
  const [liveLoader,setLiveLoader]=useState(false)
  const [mappedLoader,setMappedLoader]=useState(false)
  const [acceptedLoader,setAcceptedLoader]=useState(false)
  const [favouriteLoader,setFavouriteLoader]=useState(false)


  //Fetch live jobs
  const fetchLiveJobs=async ()=>{
   try{
      setLiveLoader(true)
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getlivejobs/${user._id}?searchTearm=${searchTearm}&locations=${selectedLocations.join(',')}&domains=${selectedDomains.join(',')}&jobType=${jobType}`)
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
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontmappedjobs/${user._id}?searchTearm=${searchTearm}&locations=${selectedLocations.join(',')}&domains=${selectedDomains.join(',')}&jobType=${jobType}`)
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
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontacceptedjobs/${user._id}?searchTearm=${searchTearm}&locations=${selectedLocations.join(',')}&domains=${selectedDomains.join(',')}&jobType=${jobType}`)
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
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontfavouritejobs/${user._id}?searchTearm=${searchTearm}&locations=${selectedLocations.join(',')}&domains=${selectedDomains.join(',')}&jobType=${jobType}`)
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

 useEffect(()=>{
   if(currentTabe==="accepted") fetchAcceptedJobs()
   else if(currentTabe==='mapped') fetchMappedJobs()
   else if(currentTabe==="live") fetchLiveJobs()
   else if(currentTabe==="favourite") fetchFavouriteJobs()
 },[searchTearm,selectedLocations,selectedDomains,jobType])

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
                    onChange={(e)=>setSearchTearm(e.target.value)}
                    className='text-sm outline-none h-full'
                    type='text'
                    placeholder='Job Title / Id'
                    ></input>
                </div>
                <div className='flex items-center'>
                    <div className='p-2 items-center flex border rounded-l-md border-opacity-40 border-e-gray-400'>
                        <span className='cursor-pointer' onClick={()=>setOpenFilterBox((prevData)=>!prevData)}>{openFilterBox?<ArrowDropUpIcon></ArrowDropUpIcon>:<ArrowDropDownIcon></ArrowDropDownIcon>}</span>
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
          {
            openFilterBox && 
            <div ref={popupRef} className='flex items-center py-2 gap-4'>
            <div className='w-40 relative'>
              <div onClick={()=>setOpenJobTypeDropDown((prevData)=>!prevData)} className='w-full rounded-md px-2 py-1 flex border justify-between items-center'>
                <span className='text-gray-500  text-[14px]'>All Jobs</span>
                <span className='text-gray-400'>{openJobTypeDropDown?<KeyboardArrowUpIcon></KeyboardArrowUpIcon>:<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</span>
              </div>
              {
                openJobTypeDropDown && 
                <div className='absolute border z-30 rounded-md overflow-hidden shadow flex flex-col w-full top-[110%] bg-white '>
                 <div onClick={()=>setJobType("All")} className='p-1.5 h-8 hover:bg-blue-500 group cursor-pointer w-full flex justify-between items-center'>
                   <span className='text-sm group-hover:text-white text-gray-600'>All Jobs</span> 
                   {
                    jobType==="All" && 
                    <span className='text-blue-400 group-hover:text-white'><CheckIcon style={{fontSize:'1.2rem'}}></CheckIcon></span>
                   }
                 </div>
                 <div onClick={()=>setJobType("Hot")} className='p-1.5 h-8 hover:bg-blue-500 group cursor-pointer w-full flex justify-between items-center'>
                   <div className='flex items-center gap-1'><img src={FIRE} alt='firemark' className='w-5 h-5'></img>
                     <span className='text-sm group-hover:text-white text-gray-600'>Hot Jobs</span>
                   </div> 
                   {
                    jobType==="Hot" && 
                    <span className='text-blue-400 group-hover:text-white'><CheckIcon style={{fontSize:'1.2rem'}}></CheckIcon></span>
                   }
                 </div>
                 <div onClick={()=>setJobType("Remote")} className='p-1.5 h-8 hover:bg-blue-500 group cursor-pointer w-full flex justify-between items-center'>
                   <span className='text-sm group-hover:text-white text-gray-600'>Remote Work</span> 
                   {
                    jobType==="Remote" &&
                    <span className='text-blue-400 group-hover:text-white'><CheckIcon style={{fontSize:'1.2rem'}}></CheckIcon></span>
                   }
                 </div>
                 
              </div>

              }
              
            </div>
            <div className='w-[21rem] relative'>
              <div onClick={()=>setOpenDomainDropDown(prevData=>!prevData)} className='w-full cursor-pointer rounded-md px-2 py-1 flex border justify-between items-center'>
                <span className='text-gray-500  text-[14px]'>{selectedDomains.length>0?`${selectedDomains.length} Domain(s)`:"All Domains"}</span>
                <span className='text-gray-400'>{openDomainDropDown?<KeyboardArrowUpIcon></KeyboardArrowUpIcon>:<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</span>
              </div>
              {
                openDomainDropDown &&
                <div className='absolute h-[400px] overflow-auto border z-30 rounded-md  shadow flex flex-col w-full top-[110%] bg-white'>
                  {domains.map((domain) => (
                    <div key={domain} className="flex hover:bg-blue-200 gap-2 p-1.5 items-center">
                       <input
                         onChange={handleChangeDomains}
                         type="checkbox"
                         checked={selectedDomains.includes(domain)}
                         value={domain}
                         id={domain}
                       />
                       <label htmlFor={domain} className="text-sm text-gray-600">{domain}</label>
                    </div>
                  ))}
              </div>
              }
            </div>
            <div className='w-40 relative'>
              <div onClick={()=>setLocationDropDown((prevData)=>!prevData)} className='w-full cursor-pointer rounded-md px-2 py-1 flex border justify-between items-center'>
                <span className='text-gray-500  text-[14px]'>{selectedLocations.length>0?`${selectedLocations.length} Location(s)`:'All Locations'}</span>
                <span className='text-gray-400'>{openLocationDropDown?<KeyboardArrowUpIcon></KeyboardArrowUpIcon>:<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</span>
              </div>
              {
                openLocationDropDown &&

                <div className='absolute overflow-auto border z-30 rounded-md  shadow flex flex-col w-full top-[110%] bg-white'>
                 {
                  locations.map((location)=>(
                    <div className='flex hover:bg-blue-200 gap-2 p-1.5 items-center'>
                     <input
                       onChange={handleChangeLocations}
                       type='checkbox'
                       checked={selectedLocations.includes(location)}
                       value={location}
                       id={location}
                     />
                     <label htmlFor={location} className='text-sm text-gray-600'>{location}</label>
                   </div>
                  ))
                 }
                
              </div>
              }
            </div>
          </div>
          }

       </div>
       <div>
        {renderForm()}
       </div>
    
      
    </div>

  )
}
