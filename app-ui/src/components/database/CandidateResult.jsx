import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import {toast} from 'react-toastify'

import FilterBox from './FilterBox';

//Importing icons
import { BriefcaseBusiness, Calendar, LoaderCircle } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { ListFilter } from 'lucide-react';
import { Star } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { ExternalLink } from 'lucide-react';


//Importing images
import PROFILE from '../../assets/profile.png'
import axios from 'axios';

function CandidateResult() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading,setLoading] = useState(false)

  const [openFilterBox,setOpenFilterBox] = useState(false)
  const [payload,setPayload] = useState({})

  const [searchResults,setSearchResults] = useState([])
  const [previewCandidate,setPreviewCandidate] = useState({})

  useEffect(()=>{
    if(!location.state){
        navigate('/')
    }else{
        setSearchResults(location.state.candidate_result)
        setPreviewCandidate(location.state.candidate_result[0])
        setPayload(location.state.payload)
    }
  },[])

 const handleGetSkills = (skills) =>{
     if(skills.length>4){
        return (
          <div className='flex items-center flex-wrap gap-2'>
             {
              skills.slice(0,4).map((item,index) => (
                <span key={index} className='p-0.5 px-2 text-sm bg-gray-200 rounded-xl'>{item}</span>
              ))
             }
             <span className='p-0.5 px-2 text-sm bg-white border rounded-xl'>{skills.length-4}+</span>
          </div>
        )
     }else{
       return (
        <div className='flex items-center gap-2'>
        { 
        skills.map((item,index) => (
          <span key={index} className='p-0.5 px-2 text-sm bg-gray-200 rounded-xl'>{item}</span>
        ))
        }
        </div>
       )
     }
 }

 function formatDateToMonthYear(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString; // e.g. 'Present' → return 'Present'
  }
  
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

 const handleSaveResult = async () =>{
   setLoading(true)
   try{
      if(location.state.searchType==="manually"){
         await axios.post(`${process.env.REACT_APP_AI_URL}/manual_saved_recnet_search/save_search`,{
          ...payload,
          userid:user._id
         })
      }else{
         await axios.post(`${process.env.REACT_APP_AI_URL}/ai_search_operations/save_search`,{
          ...payload,
          user_id:user._id
         })
      }
     toast.success("Your search saved successfully.")
   }catch(err){
     toast.error("Something went wrong.")
     console.log(err)
   }finally{
    setLoading(false)
   }
 }

  return (
    <div className='px-10 pt-10 scroll-smooth grid grid-cols-2 gap-8 items-start'>
          {openFilterBox && <FilterBox setOpenFilterBox={setOpenFilterBox}></FilterBox>}
          {/* Candidate Result Section */}
          <div className='flex flex-col gap-4 max-h-screen hide-scrollbar overflow-y-auto'>
            {/* Candidate Search Result Header */}
            <div className='flex items-center justify-between'>
               <h1 className='font-bold text-2xl'>Search Results</h1>
               <button onClick={()=>setOpenFilterBox(true)} className='p-2 bg-white hover:bg-gray-100 transition-all duration-300 border border-neutral-300 rounded-md flex items-center gap-3'>
                 <ListFilter size={18}></ListFilter>
                 <span className='text-sm font-medium'>Apply Filters</span>
               </button>
            </div>
            
            <div className='flex flex-col gap-4'>
               {/* Candidate result card */}
               {
                searchResults.map((item,index) => (
                  <div onClick={()=>setPreviewCandidate(item)} key={index} className={`${item?._id === previewCandidate?._id ? "border-2 border-blue-500 bg-blue-50" : 'border hover:border-blue-400 border-neutral-300 bg-white'} rounded-xl p-6 custom-shadow-1 flex items-start gap-4`}>
                  <div className='w-28 h-24 bg-white rounded-full'>
                    <img src={PROFILE} className='w-full h-full'></img>
                  </div>
                  <div className='w-full flex flex-col gap-2.5'>
                    <h2 className='text-xl font-medium'>{item?.contact_details?.name}</h2>
                    <div className='grid grid-cols-3 mb-2 items-center gap-4'>
                       <div className='flex items-center gap-2'>
                         <BriefcaseBusiness size={16} className='text-[#4b5563]'></BriefcaseBusiness>
                         <span className='text-[15px] text-[#4b5563]'>{item?.total_experience}</span>
                       </div>
                       <div className='flex items-center'>
                           <span className='text-[#4b5563] text-[15px]'>₹</span>
                           <span className='text-[#4b5563] text-[15px]'>{item?.current_salary} LPA</span>
                       </div>
                       <div className='flex items-center gap-2'>
                         <MapPin size={17} className='text-[#4b5563]'></MapPin>
                         <span className=' text-[#4b5563] text-[15px]'>{item?.contact_details?.current_city}</span>
                       </div>
                    </div>
                    <div className='w-full grid grid-cols-5 items-center gap-4'>
                      <div className='flex col-span-3 items-center gap-2'>
                        <Mail size={16} className='text-[#4b5563]'></Mail>
                        <span className='text-[#4b5563] text-[15px]'>{item?.contact_details?.email}</span>
                      </div>
                      <div className='flex col-span-2 items-center gap-2'>
                        <Phone size={16} className='text-[#4b5563]'></Phone>
                        <span className='text-[#4b5563] text-[15px]'>{item?.contact_details?.phone}</span>
                      </div>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                      <div className='flex items-center gap-2'>
                         <span className='text-[#6a7280] text-[15px]'>Pref Locations:</span>
                         <span className='text-[15px]'>
                          {item?.contact_details?.looking_for_jobs_in.map((val,index)=>(
                            <>
                            <span>{val}</span>
                            {index!==item?.contact_details?.looking_for_jobs_in.length-1 ? ", " : " "}
                            </>
                          ))}
                        </span>
                      </div>
                      {
                        item?.academic_details.length>0 && 
                        <div className='flex items-center gap-2'>
                          <span className='text-[#6a7280] text-[15px]'>Education:</span>
                          <span className='text-[15px]'>{item?.academic_details[0]?.education}</span>
                         </div>
                      }
                      <div className='flex items-center gap-2'>
                         <span className='text-[#6a7280] text-[15px]'>Pancard No:</span>
                         <span className='text-[15px]'>{item?.contact_details?.pan_card}</span>
                      </div>
                      <div className='flex flex-col gap-1'>
                         <span className='text-[#6a7280] text-[15px]'>Skills:</span>
                         {
                           handleGetSkills(item?.skills)
                         }
                      </div>
                    </div>
                  </div>
              </div>
                ))
               }
            </div>
          </div>

          {/* Candidate Preview Box  */}
          <div className='sticky top-4 max-h-[calc(100vh-32px)] overflow-y-auto self-start bg-white border flex flex-col gap-6 border-neutral-300 p-6 rounded-xl custom-shadow-1'>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                 <h1 className='text-2xl font-semibold'>Candidate Details</h1>
                 <button onClick={handleSaveResult} className='p-2 px-3 w-32 hover:bg-gray-100 transition-all duration-300 border-neutral-300 border rounded-md flex justify-center items-center gap-2'>
                   {
                    loading ? 
                    <LoaderCircle className='animate-spin'></LoaderCircle>
                    :<div className='flex items-center gap-2'>
                      <Star size={16}></Star>
                    <span className='text-sm font-medium'>Save</span>
                    </div>
                   }
                 </button>
                 </div>
                 <div className='flex items-center gap-2'>
                   <div className='flex items-center gap-2'>
                      <UserRound size={16} className='text-neutral-500'></UserRound>
                      <span className='text-sm text-neutral-500'>Recruiter:</span>
                   </div>
                   <span className='text-sm text-neutral-500'>{previewCandidate?.username}</span>
                 </div>
              </div>
              <div className='overflow-scroll h-[600px]'>
                <div className='flex items-center gap-4 pb-6 border-b border-neutral-300'>
                   <div className='w-24 h-24 bg-white rounded-full'>
                     <img src={PROFILE} alt='profile' className='w-full h-full'></img>
                   </div>
                   <div className='flex flex-col'>
                     <h1 className='text-xl font-semibold'>{previewCandidate?.contact_details?.name}</h1>
                     <span className='text-gray-400 text-lg'>{previewCandidate?.total_experience} Experience</span>
                   </div>
                </div>
                <div className='border-b border-neutral-300 grid grid-cols-2 gap-y-6 py-6 items-center gap-4'>
                  <div className='flex flex-col gap-0.5'>
                     <span className='text-base text-[#6a7280]'>Current Salary</span>
                     <h1 className='text-lg font-semibold'>₹{Number(previewCandidate?.current_salary)} LPA</h1>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                     <span className='text-base text-[#6a7280]'>Current City</span>
                     <h1 className='text-lg font-semibold'>{previewCandidate?.contact_details?.current_city}</h1>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                     <span className='text-sm text-[#6a7280]'>Email</span>
                     <span className='text-sm'>{previewCandidate?.contact_details?.email}</span>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                     <span className='text-sm text-[#6a7280]'>Mobile</span>
                     <span className='text-sm'>{previewCandidate?.contact_details?.phone}</span>
                  </div>
                  <div className='col-span-2 flex flex-col gap-0.5'>
                     <span className='text-sm text-[#6a7280]'>Prefered Locations</span>
                     <span>
                          {previewCandidate?.contact_details?.looking_for_jobs_in.map((val,index)=>(
                            <>
                            <span>{val}</span>
                            {index!==previewCandidate?.contact_details?.looking_for_jobs_in.length-1 ? ", " : " "}
                            </>
                          ))}
                     </span>
                  </div>
                  <div className='col-span-2 flex flex-col gap-0.5'>
                     <span className='text-sm text-[rgb(106,114,128)]'>Pancard</span>
                     <span>{previewCandidate?.contact_details?.pan_card}</span>
                  </div>
                </div>

                <div className='w-full border-b border-neutral-300 flex py-6 flex-col gap-3'>
                    <div className='flex items-center gap-2'>
                      <BriefcaseBusiness size={20}></BriefcaseBusiness>
                      <span className='text-lg font-medium'>Experience</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                      {
                        (previewCandidate?.experience || []).map((item,index)=>(
                        <div key={index} className='border-l-2 border-blue-300 flex flex-col gap-2 px-4'>
                          <h1 className='text-lg font-medium'>{item?.title}</h1>
                          <div className='flex flex-col gap-1'>
                            <span className='text-blue-400'>{item?.company}</span>
                            <div className='flex items-center gap-2'>
                               <Calendar size={16}></Calendar>
                               <span className='text-gray-400'>{formatDateToMonthYear(item?.from_date)} - {formatDateToMonthYear(item?.until)}</span>
                            </div>
                          </div>
                        </div>
                        ))
                      }
                    </div>
                </div>

                <div className='w-full border-b border-neutral-300 flex py-6 flex-col gap-3'>
                   <div className='flex items-center gap-2'>
                      <GraduationCap size={20}></GraduationCap>
                      <span className='text-lg font-medium'>Academic Details</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                    {
                      previewCandidate?.academic_details?.map((item,index) => (
                        <div key={index} className='border-l-2 border-green-300 flex flex-col gap-2 px-4'>
                        <h1 className='text-lg font-medium'>{item?.education}</h1>
                        <div className='flex flex-col gap-1'>
                          <span className='text-green-500'>{item?.college}</span>
                          <div className='flex items-center gap-2'>
                             <Calendar size={16}></Calendar>
                             <span className='text-gray-400'>Graduated - {item?.pass_year}</span>
                          </div>
                         </div>
                        </div>
                      ))
                    }
                    </div>
                </div>

                <div className='py-6 flex flex-col gap-4'>
                   <h1 className='text-lg font-medium'>Skills</h1>
                   <div className='flex flex-wrap items-center gap-2'>
                       {
                        previewCandidate?.skills?.map((item,index) => (
                          <span key={index} className='text-[13px] py-0.5 px-2 rounded-xl bg-gray-200'>
                            {item}
                          </span>
                        ))
                       }
                   </div>
                </div>

                <div className='flex flex-col gap-4 py-6'>
                  <h1 className='text-lg font-medium'>Other Details</h1>
                  <div className='flex flex-col gap-3'>
                     <div className='flex items-center justify-between'>
                       <span className='text-[#6a7280]'>Naukri Profile:</span>
                       <a href={previewCandidate?.contact_details?.naukri_profile} target='_blank' className='flex items-center gap-1 text-sm text-blue-500'>
                         View Profile
                         <ExternalLink size={16}></ExternalLink>
                       </a>
                     </div>
                     <div className='flex items-center justify-between'>
                       <span className='text-[#6a7280]'>Portfolio:</span>
                       <a href={previewCandidate?.contact_details?.portfolio_link} target='_blank' className='flex items-center gap-1 text-sm text-blue-500'>
                         View Profile
                         <ExternalLink size={16}></ExternalLink>
                       </a>
                     </div>
                     <div className='flex items-center justify-between'>
                       <span className='text-[#6a7280]'>Linkedin Profile:</span>
                       <a href={previewCandidate?.contact_details?.linkedin_profile} target='_blank' className='flex items-center gap-1 text-sm text-blue-500'>
                         View Profile
                         <ExternalLink size={16}></ExternalLink>
                       </a>
                     </div>
                     <div className='flex items-center justify-between'>
                       <span className='text-[#6a7280]'>Adharcard:</span>
                       <span className='text-sm'>{previewCandidate?.contact_details?.aadhar_card}</span>
                     </div>
                     <div className='flex flex-col gap-2'>
                       <span className='text-[#6a7280]'>Exit Reason:</span>
                       <div className='p-1 bg-gray-100'>
                          <p className='text-sm'>{previewCandidate?.exit_reason}</p>
                       </div>
                     </div>
                     <div className='flex flex-col gap-2'>
                       <span className='text-[#6a7280]'>Comment:</span>
                       <div className='p-1 bg-gray-100'>
                          <p className='text-sm'>{previewCandidate?.comment}</p>
                       </div>
                     </div>
                     <div className='flex justify-between items-center'>
                       <span>Source:</span>
                       <span className='p-1 text-sm border border-neutral-400 font-semibold'>{previewCandidate?.source}</span>
                     </div>
                  </div>
                </div>

              </div>
          </div>

    </div>
  )
}

export default CandidateResult