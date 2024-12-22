import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

//importing images
import USAFLAG from '../../assets/asset38.png'
import FIRE from '../../assets/asset39.png'
import INDIAFLAG from '../../assets/asset40.png'
import CANADAFLAG from '../../assets/asset44.png'
import AUSTRALIAFLAG from '../../assets/asset43.png'
import WORLD from '../../assets/asset41.png'
import STATE from '../../assets/asset42.png'

//importing icons
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningIcon from '@mui/icons-material/Warning';

export default function MappedJobsItem({jobObj,handleOpenPreviewBox,fetchAcceptedJobs,showNotification,fetchMappedJobs,setLoader}) {
  const {user}=useContext(AuthContext)
  const [confirmPopUp,setConfirmPopUp]=useState(false)
  const [rejectPopUp,setRejectPopUp]=useState(false)
  const [errors,setErrors]=useState({})
  const [selectedReason,setSelectedReason]=useState(null)

  //Job Details
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


  const handleAcceptRequest=async ()=>{
    try{
       setLoader(true)
       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/addacceptlist/${user._id}`,{orgjobid:jobObj.orgjobid})
       console.log("Accept request gone")
       setConfirmPopUp(false)
       await fetchAcceptedJobs()
       await fetchMappedJobs()
       showNotification("Successfully job accepted.",'success')
    }catch(err){
      showNotification("Something went wrong while accept the job.",'failure')
      console.log(err)
    }
  }

  const handleRejectRequest=async ()=>{
   if(validate()){
    try{
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/rejectjob/${user._id}`,{orgjobid:jobObj.orgjobid})
    }catch(err){
      console.log(err)
    }
   }
  }

  const validate=()=>{
    let newErrors={}
    if(selectedReason===null) newErrors.reject="Please select any of one reason."
    setErrors(newErrors)
    return Object.keys(newErrors).length===0
  }

  return (
    <>
    {
       rejectPopUp && (
        <div className='fixed inset-0 backdrop-blur-md bg-opacity-40 items-center flex justify-center bg-black z-50'>
       <div className='bg-white rounded-md w-[450px] flex flex-col gap-4 transition-all p-4'>
        <h1 className='text-xl tracking-wide'>Reject the Assignment</h1>
        <div>
          <h1 className='font-light'>Specify a reason <span className='text-red-500'>*</span></h1>
          <div className='flex mt-4 flex-col gap-6'>
            <div className='flex gap-2 items-center'>
              <input 
              type='radio'
              id='first'
              checked={selectedReason==="commission/Fees too low"}
              value='commission/Fees too low'
              name='reason'
              onChange={(e)=>setSelectedReason(e.target.value)}
              >
              </input>
              <label className='input-label' htmlFor='first'>Commission/Fees too low</label>
            </div>
            <div className='flex gap-2 items-center'>
               <input 
                 type='radio'
                 checked={selectedReason==="Don't have the time"}
                 id='second'
                 value={`Don't have the time`}
                 name='reason'
                 onChange={(e)=>setSelectedReason(e.target.value)}
               >
               </input>
               <label className='input-label' htmlFor='second'>Don't have the time</label>
            </div>
            <div className='flex gap-2 items-center'>
               <input 
                 type='radio'
                 id='third'
                 checked={selectedReason==="Don't have the expertise"}
                 value={`Don't have the expertise`}
                 onChange={(e)=>setSelectedReason(e.target.value)}
                 name='reason'
               >
               </input>
               <label className='input-label' htmlFor='third'>Don't have the expertise</label>
            </div>
          </div>
          {
            errors.reject  && 
            <span className='text-red-500 mt-4 text-sm'>{errors.reject}</span>
          }
        </div>
        <div className='flex place-content-end'>
          <div className='flex gap-2'>
             <button onClick={()=>setRejectPopUp(false)} className='text-[14px] rounded-md border border-blue-400 text-blue-400 px-3 py-1'>Cancel</button>
             <button onClick={handleRejectRequest} className='text-[14px] rounded-md bg-red-500 hover:bg-red-600 text-white px-3 py-1'>Reject</button>
          </div>
        </div>
       </div>
    </div>
       )
    }
    {
      confirmPopUp && 
      <div className='fixed inset-0 flex justify-center p-12 items-center backdrop-blur-md bg-opacity-40 bg-black z-50'>
       <div className='bg-white p-4 px-6 transition-all flex flex-col gap-4 rounded-md'>
          <h1 className='text-xl tracking-wide'>Salary & Client Communication Guidelines</h1>
          <hr></hr>
          <div className='flex items-center gap-4'>
            <div className='flex-1 h-44 rounded-md border p-2 border-red-400 flex flex-col gap-3'>
              <div className='flex gap-2'>
                <span className='text-red-500'><WarningIcon></WarningIcon></span>
                <h1 className='font-semibold'>Avoid Public Platforms</h1>
              </div>
              <hr></hr>
              <p className='text-[13px]'><b className='text-black'>DO NOT POST</b> salary and client name on Job Boards or Social Media.</p>
            </div>
            <div className='flex-1 h-44 rounded-md border p-2 border-red-400 flex flex-col gap-3'>
              <div className='flex gap-2'>
                <span className='text-red-500'><WarningIcon></WarningIcon></span>
                <h1 className='font-semibold'>Avoid Written Disclosure</h1>
              </div>
              <hr></hr>
              <p className='text-[13px]'><b className='text-black'>DO NOT MENTION</b> salary and client name over Email, LinkedIn, WhatsApp, or any written communication.</p>
            </div>
            <div className='flex-1 h-44 rounded-md border p-2 border-red-400 flex flex-col gap-3'>
              <div className='flex gap-2'>
                <span className='text-red-500'><WarningIcon></WarningIcon></span>
                <h1 className='font-semibold'>Avoid Privacy Intrusion</h1>
              </div>
              <hr></hr>
              <p className='text-[13px]'><b className='text-black'>DO NOT ASK</b> candidate's current compensation, unless they voluntarily disclose it.</p>
            </div>
            <div className='flex-1 h-44 rounded-md border p-2 border-red-400 flex flex-col gap-3'>
              <div className='flex gap-2'>
                <span className='text-red-500'><WarningIcon></WarningIcon></span>
                <h1 className='font-semibold'>No Third Party Sourcing</h1>
              </div>
              <hr></hr>
              <p className='text-[13px]'><b className='text-black'>DO NOT USE</b> third party vendors or external contractors / freelancers for sourcing candidates. This is strictly prohibited under the terms and conditions of your company's agreement with CBREX.</p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <h1>Important:</h1>
            <p className='text-gray-500 text-sm'>Please remember to <b>share</b> the above guidelines with <b>your team and partners</b> involved in candidate sourcing for this role.
            Non-compliance with these guidelines may result in penalties and legal action.</p>
            <p className='text-gray-500 text-sm'>Please confirm that you want to map yourself to this requirement. Ensure that you follow the CBREX Guidelines while engaging on jobs.</p>
          </div>
          <hr></hr>
          <div className='flex gap-3 items-center'>
            <h1 className='text-lg'>Confirm Acceptance</h1>
            <button onClick={handleAcceptRequest} className='bg-blue-400 rounded-md text-white px-4 py-2'>Accept</button>
            <button onClick={()=>setConfirmPopUp(false)} className='rounded-md border border-blue-400 text-blue-400 px-4 py-2'>Cancel</button>
          </div>
       </div>
    </div>
    }
    <div onClick={()=>handleOpenPreviewBox(jobObj)} className='custom-div cursor-pointer hover:scale-[.99] transition-all'>
        <div className='flex justify-between items-start w-full'>
          <div className='flex items-start gap-12'>
          <div className='flex w-[22rem] items-start gap-4 mr-2'>
              <div className='w-5'>
                {
                  jobObj.isHotJob && <img className='w-5 h-5' src={FIRE}></img>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <img className='w-6 h-6 rounded-md' src={getCountryFlag(jobObj)}></img>
                    <span className='text-gray-500 text-[16px] font-semibold'>{jobObj.job_id} - {jobObj.job_title}</span>
                </div>
                <span className='text-light w-52 leading-5 text-[13px] text-gray-400'>{jobObj.cp_name && `CP - ${jobObj.cp_name}`}</span>
                {
                  jobObj.isRemoteWork && <span className='text-sm'>Permenant Remote Work</span>
                }
                <span className='text-[13px] text-gray-500'>{jobObj.city.map((item,index)=>`${item}${(index!==jobObj.city.length-1)?(", "):("")}`)}, {jobObj.country}</span>
              </div>
           </div>
           <div className='flex w-72 place-items-start'>
              <div className='flex w-[50%] text-[13px] text-gray-500 flex-col gap-4 place-content-start'>
                  <span>Position</span>
                  {
                    workType==="full_time"
                    ?(<span>Sp Payout</span>)
                    :(<span>Sourcing Fee</span>)
                  }
                  {
                    workType==='full_time'
                    ?(<span>Salary</span>)
                    :(<span>Contractor Pay Rate</span>)
                  }
              </div>
              <div className='flex w-[50%] text-[13px] font-semibold flex-col gap-4 text-gray-700 place-content-start'>
                <span>{jobObj.positions} {workType==="full_time"?("Full Time"):("Contract")}</span>
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
           </div>
           <div className='flex gap-4 place-items-center'>
             <div className='flex flex-col text-[13px] text-gray-500 gap-4 place-content-start'>
                 <span>Exp</span>
                 <span>Domain</span>
                 <span>Ac-manager</span>
             </div>
             <div className='flex flex-col font-semibold text-[13px] text-gray-700 gap-4 place-content-start'>
                <span>{`${jobObj.experience.minexp}-${jobObj.experience.maxexp}`} year</span>
                <span>{jobObj.domain}</span>
                <spna>{jobObj.ac_manager}</spna>
             </div>
           </div>
          
           </div>

           <div className='flex gap-3'>
             <button onClick={()=>setRejectPopUp(true)} className='text-red-500 border hover:bg-red-100 border-gray-300 rounded-sm flex items-center gap-2 px-3 py-1'><CloseOutlinedIcon style={{fontSize:"1.4rem"}}></CloseOutlinedIcon> Reject</button>
             <button onClick={()=>setConfirmPopUp(true)} className='text-white hover:bg-blue-500  bg-blue-400 rounded-sm flex items-center gap-2 py-1 px-3'><CheckCircleOutlineOutlinedIcon style={{fontSize:"1.4rem"}}></CheckCircleOutlineOutlinedIcon> Accept</button>
           </div>
           </div>
        
    </div>
    </>
  )
}
