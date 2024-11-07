import React,{useContext, useState} from 'react'

import axios from 'axios'

//importing images
import USAFLAG from '../../assets/asset38.png'
import FIRE from '../../assets/asset39.png'
import INDIAFLAG from '../../assets/asset40.png'
import CANADAFLAG from '../../assets/asset44.png'
import AUSTRALIAFLAG from '../../assets/asset43.png'
import WORLD from '../../assets/asset41.png'
import STATE from '../../assets/asset42.png'
import FILLEDSTAR from '../../assets/asset46.png'
import STAR from '../../assets/asset45.png'

import {useNavigate} from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

//importing icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import WarningIcon from '@mui/icons-material/Warning';

export default function AcceptedJobItem({jobObj,showNotification,handleOpenPreviewBox,fetchFavouriteJobs,fetchAcceptedJobs,fetchMappedJobs}) {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const getText=(txt)=>{
      if(txt.length>25) return txt.slice(0,25)+"..."
      return txt
  }

  const [openUnmapConfirmBox,setOpenUnmapConfirmBox]=useState(false)
  

  const workType=jobObj.work_type
  const currency=jobObj.work_type==="full_time"?(jobObj.full_time_salary_currency):(jobObj.contract_pay_currency)

  //Creating country mapping
  const country=new Map([
    ['India',INDIAFLAG],
    ['Canada',CANADAFLAG],
    ['Australia',AUSTRALIAFLAG],
    ['United States',USAFLAG]
  ])

  //Get job flag
  const getCountryFlag=(jobObj)=>{
      if(jobObj.isRemoteWork){
        return WORLD
      }else{
        if(country.get(jobObj.country)){
          return country.get(jobObj.country)
        }else{
          return STATE
        }
      }
  }

  const handleNavigate=()=>{
    navigate('/recruiter/uploadresume',{state:jobObj})
  }

  const addJobIntoFavouriteList=async ()=>{
      console.log("Clicked")
      try{
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/addjobintofavouritelist`,{orgjobid:jobObj.orgjobid,rememberid:user._id})
         await fetchAcceptedJobs()
         await fetchFavouriteJobs()
         showNotification("Successfully job added into your favourite list.",'success')
      }catch(err){
        console.log(err)
        showNotification("Something went wrong while adding job into favourite.",'failure')
      }
  }

  const removeJobIntoFavouriteList=async ()=>{
     try{
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/removejobintofavouritelist`,{orgjobid:jobObj.orgjobid,rememberid:user._id})
        await fetchAcceptedJobs()
        await fetchFavouriteJobs()
        showNotification("Successfully job removed from favourite list.",'success')
     }catch(err){ 
      console.log(err)
      showNotification("Something went wrong while removing job from favourite.",'failure')
     }
  }

  const unMapJob=async ()=>{
     try{
       //Unmaped job from the both collections (job & recruitingteam)
       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/unmapjob`,{orgjobid:jobObj.orgjobid,rememberid:user._id})
       await fetchAcceptedJobs()
       await fetchMappedJobs()
       setOpenUnmapConfirmBox(false)
       showNotification("Successfully job unmaped.")
     }catch(err){
       console.log(err)
       showNotification("Something went wrong while unmap job.",'failure')
     }
  }

  return (
    <>
       {
        openUnmapConfirmBox &&

        <div className='fixed inset-0 backdrop-blur-md bg-opacity-40 items-center flex justify-center bg-black z-50'>
          <div className='w-[500px] custom-div pb-4 gap-5'>
             <div className='flex items-center gap-4'>
               <span className='w-12 h-12 flex justify-center items-center text-red-600 rounded-full bg-red-100'>
                   <WarningIcon style={{fontSize:'1.8rem'}}></WarningIcon>
               </span>
               <div className='flex flex-col'>
                 <h1 className='font-semibold text-[18px]'>Confirmation</h1>
                 <span className='text-gray-500 text-[14px]'>Are you sure you want to unmap from this job?</span>
               </div>
             </div>
             <div className='flex w-full place-content-end'>
                <div className='flex gap-3 items-center'>
                   <button onClick={unMapJob} className='py-2 px-3 rounded-md bg-red-600 text-white'>Unmap Me</button>
                   <button onClick={()=>setOpenUnmapConfirmBox(false)} className='border-blue-400 border py-2 px-3 rounded-md text-blue-400'>Cancel</button>
                </div>
             </div>
          </div>
        </div>

       }
       
        <div onClick={()=>handleOpenPreviewBox(jobObj)} className='custom-div cursor-pointer hover:scale-[.99] transition-all'>
            
              <div className='flex items-start gap-10'>
              <div className='flex items-start gap-4 mr-4'>
                  {
                     jobObj.isFavouriteJob?(
                        <img onClick={removeJobIntoFavouriteList} src={FILLEDSTAR} className='w-5 h-5'></img>
                     ):(
                        <img onClick={addJobIntoFavouriteList} src={STAR} className='w-5 h-5'></img>
                     )
                  }
                  <div className='w-5'>
                    {
                       jobObj.isHotJob && <img className='w-5 h-5' src={FIRE}></img>
                    }
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <img className='w-6 h-6 rounded-md' src={getCountryFlag(jobObj)}></img>
                        <span className='text-gray-500 text-[15px] font-semibold'>{jobObj.job_id} - {jobObj.job_title}</span>
                    </div>
                    <span className='text-light w-52 leading-5 text-[12px] text-gray-400'>CP - {jobObj.cp_name}</span>
                    {
                      jobObj.isRemoteWork &&
                      <span className='text-sm'>Permenant Remote Work</span>
                    
                    }
                    <span className='text-[13px] text-gray-500'>{jobObj.city.map((item,index)=>`${item}${(index!==jobObj.city.length-1)?(", "):("")}`)}, {jobObj.country}</span>
                  </div>
               </div>
               <div className='flex gap-3 place-items-center'>
                  <div className='flex text-[13px] text-gray-500 flex-col gap-4 place-content-start'>
                      <span>Position</span>
                      <span>{workType==="full_time"?("Sp Payout"):("Sourcing Fees")}</span>
                      <span>{workType==="full_time"?("Salary"):("Contractor Pay Rate")}</span>
                  </div>
                  {(jobObj.work_type==="full_time")?(
                    <div className='flex text-[13px] font-semibold flex-col gap-4 text-gray-700 place-content-start'>
                     <span>{jobObj.positions}  {workType==="full_time"?("Full Time"):("Contract")}</span>
                     <span>{currency} {jobObj.commission_pay_out}{jobObj.commission_type==="Percentage" && "%"}</span>
                     {
                       workType==="contract"
                         ?(
                         <span>
                         {`${currency} ${jobObj.contract_pay_rate_type==="Range"
                         ?(`${jobObj.min_contract_pay}-${jobObj.max_contract_pay}`)
                         :(jobObj.fix_contract_pay)
                         } ${jobObj.contract_pay_cycle}`}
                         </span>
                         )
                         :(
                         <span>
                         {`${currency} ${jobObj.full_time_salary_type==="Range"
                         ?(`${jobObj.min_salary}-${jobObj.max_salary}`)
                         :(jobObj.fixed_salary)
                         }`}      
                        </span>
                        )
                    }
                    </div>
                   ):(
                    <div className='flex text-[13px] font-semibold flex-col gap-4 text-gray-700 place-content-start'>
                     <span>{jobObj.positions} Contract</span>
                     <span>{jobObj.contract_pay_currency} {jobObj.commision_pay_out}{jobObj.commission_type==="Percentage" && "%"} {jobObj.contract_pay_cycle}</span>
                     <span>{jobObj.contract_pay_currency} {jobObj.contract_pay_rate_type==="Fixed"?(jobObj.fixed_contract_pay):(`${jobObj.min_contract_pay}-${jobObj.max_contract_pay}`)} {jobObj.contract_pay_cycle.toUpperCase()}</span>
                    </div>
                   )}

                    
                  
               </div>
               <div className='flex gap-3 place-items-center'>
                 <div className='flex flex-col text-[13px] text-gray-500 gap-4 place-content-start'>
                     <span>Exp</span>
                     <span>Domain</span>
                     <span>Ac-manager</span>
                 </div>
                 <div className='flex flex-col font-semibold text-[13px] text-gray-700 gap-4 place-content-start'>
                    <span>{`${jobObj.experience.minexp}-${jobObj.experience.maxexp}`} year</span>
                    <span>{getText(jobObj.domain)}</span>
                    <spna>{jobObj.ac_manager}</spna>
                 </div>
               </div>
               <div className='flex gap-3 place-items-start mr-2'>
                 <div className='flex flex-col text-[13px] text-gray-500 gap-4 items-start'>
                    <span>Resume Required</span>
                    <span>Resume Submitted</span>
                    <span>RSR (Quality)</span>
                 </div>
                 <div className='flex flex-col font-semibold text-gray-700 gap-4 place-content-start'>
                    <span className='p-0.5 text-[13px] flex justify-center items-center rounded-full text-blue-500 bg-slate-100'>5</span>
                    <span className='p-0.5 text-[13px] flex justify-center items-center rounded-full text-black bg-slate-300'>{jobObj.resumeSubmitCount}</span>
                    <span className='p-0.5 px-1 text-[13px] flex justify-center items-center rounded-md text-yellow-500 bg-yellow-300'>0%</span>
                 </div>
               </div>
               <div className='flex flex-col gap-3'>
                 <button onClick={handleNavigate} className='text-white transition-all hover:bg-blue-700 text-sm bg-blue-400 rounded-md flex items-center gap-2 py-1 px-2'><CloudUploadOutlinedIcon style={{fontSize:'1.1rem'}}></CloudUploadOutlinedIcon>Upload Resume</button>
                 <button className='text-sm border py-1 px-2 flex items-center gap-2 text-gray-500'><ChatOutlinedIcon style={{fontSize:"1.1rem"}}></ChatOutlinedIcon> {jobObj.jobUpdates.length} Job Updates</button>
                 <button onClick={()=>setOpenUnmapConfirmBox(true)} className='text-red-500 hover:bg-red-100 transition-all text-sm flex px-2 py-1 gap-2 items-center'><PersonRemoveAlt1OutlinedIcon style={{fontSize:"1.1rem"}}></PersonRemoveAlt1OutlinedIcon> Unmap Me</button>
               </div>
               </div>
            
        </div>
     </>
  )
}
