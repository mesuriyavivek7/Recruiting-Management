import React, { useState,useContext } from 'react'

//importing images
import USAFLAG from '../../assets/asset38.png'
import FIRE from '../../assets/asset39.png'
import INDIAFLAG from '../../assets/asset40.png'
import CANADAFLAG from '../../assets/asset44.png'
import AUSTRALIAFLAG from '../../assets/asset43.png'
import WORLD from '../../assets/asset41.png'
import STATE from '../../assets/asset42.png'

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

//importing icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


export default function LiveJobsItem({jobObj,handleOpenPreviewBox,showNotification,setLoader,fetchLiveJobs}) {

  const {user,isVerified}=useContext(AuthContext)

  const [withrawLoader,setWithrawLoader] = useState(false)

  //Creating country mapping
  const country=new Map([
    ['India',INDIAFLAG],
    ['Canada',CANADAFLAG],
    ['Australia',AUSTRALIAFLAG],
    ['United States',USAFLAG]
  ])

  //Get job flag
  const getCountryFlag=(jobObj)=>{
      if(jobObj.jobBasicDetails.permanent_remote_work){
        return WORLD
      }else{
        if(country.get(jobObj.jobBasicDetails.country)){
          return country.get(jobObj.jobBasicDetails.country)
        }else{
          return STATE
        }
      }
  }

  const [openConfirmPopUpBox,setOpenConfirmPopUpBox]=useState(false)

  const [workType,setWorkType]=useState(jobObj.jobCommissionDetails.work_type)
  const [commissionType,setCommissionType]=useState(jobObj.jobCommissionDetails.commission_details.commission_type)
  const [currency,setCurrency]=useState(jobObj.jobCommissionDetails.work_type==="full_time"
   ?(jobObj.jobCommissionDetails.work_details.full_time.full_time_salary_currency)
   :(jobObj.jobCommissionDetails.work_details.contract.contract_pay_currency))


  const handleSendJobRequest=async () =>{
      try{
        setLoader(true)
        setOpenConfirmPopUpBox(false)
        //sending job request in both collections
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/requestmapjob`,{orgjobid:jobObj.job._id,rememberid:user._id})
        await fetchLiveJobs()
        showNotification("Successfully job request sended.",'success')
      }catch(err){
         console.log(err)
         showNotification("Something went wrong.",'failure')
      }
  }

  const handleWithrawJobRequest = async  ()=>{
     try{
      setWithrawLoader(true)
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/withrawjobrequest`,{orgjobid:jobObj.job._id,rememberid:user._id})
      await fetchLiveJobs()
      showNotification("Successfully job request Withdrawal")
     }catch(err){
      console.log(err)
      showNotification("Something went wrong.",'failure')
     }
  }

  const handleOpenConfirmPopUpBox=()=>{
      if(isVerified) setOpenConfirmPopUpBox(true)
      else showNotification("You have not access for send the job request.",'warning')
  }
  

  return (
    <>
    {
      openConfirmPopUpBox &&

      <div className='fixed inset-0 backdrop-blur-md bg-opacity-40 items-center flex justify-center bg-black z-50'>
        <div className='w-[85%] custom-div pb-4 gap-3'>
             <h1 className='text-xl'>Guidelines</h1>
             <hr className=' w-full h-0.5 bg-slate-100'></hr>
             <div className='py-2'>
               <span className='text-gray-500'>This is a restricted job. Please confirm that you want to map yourself to this requirement. Ensure that you follow the UPHIRE Guidelines while engaging on jobs.</span>
             </div>
             <hr className='w-full h-0.5 bg-slate-100 '></hr>
             <div className='flex items-center mt-1 gap-4'>
               <span className='text-2xl'>Confirm Mapping</span>
               <button onClick={handleSendJobRequest} className='bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded-md'>
                  Confirm
               </button>
               <button onClick={()=>setOpenConfirmPopUpBox(false)} className='text-blue-400 border border-blue-400 py-2 px-3 rounded-md'>
                  Cancel
               </button>
             </div>
        </div>
    </div>

    }
   
    <div onClick={()=>handleOpenPreviewBox(jobObj.jobBasicDetails.job_id)} className='custom-div pb-4 cursor-pointer hover:scale-[.99] transition-all'>
       <div className='flex w-full justify-between'>
         <div className='flex gap-10 items-start'>
           <div className='flex w-[22rem] items-start gap-4 mr-2'>
              <div className='w-6'>
                {
                  jobObj.job.mark_hot_job && <img className='w-6 h-6' src={FIRE}></img>
                }
                
              </div>
              <div className='flex flex-col gap-4 w-64'>
                <div className='flex gap-3'>
                    <img className='w-6 h-6 rounded-md' src={getCountryFlag(jobObj)}></img>
                    <span className='text-gray-500 text-[15px] font-semibold'>{jobObj.job.job_id} - {jobObj.jobBasicDetails.job_title}</span>
                </div>
                {jobObj.jobBasicDetails.permanent_remote_work &&
                       <span className='text-sm'>Permanent Remote Work</span>
                 }
                 <span className='text-[13px] text-gray-500'>{jobObj.jobBasicDetails.city.map((item,index)=>`${item}${(index!==jobObj.jobBasicDetails.city.length-1)?(", "):("")}`)}, {jobObj.jobBasicDetails.country}</span>
              </div>
           </div>
           <div className='flex w-60 items-start'>
              <div className='flex w-[50%] text-[13px] text-gray-500 flex-col gap-3 place-content-start'>
                  <span>Position</span>
                  {
                    workType==="full_time"
                    ?(<span>Sp Payout</span>)
                    :(<span>Sourcing Fee</span>)
                  }
                  {
                    workType==="contract" &&
                    <span>Contractor Pay Rate</span>
                  }
              </div>
              <div className='flex w-[50%] text-[13px] font-semibold flex-col gap-3 text-gray-700 place-content-start'>
                <span>{jobObj.jobBasicDetails.positions} {workType==="full_time"?("Full Time"):("Contract")}</span>
                <span>{commissionType==="Fixed"
                 ?(`${currency} ${jobObj.jobCommissionDetails.commission_details.commission_fix_pay}`)
                 :(`${currency} ${jobObj.jobCommissionDetails.commission_details.commission_percentage_pay}%`)}
                </span>
                {
                  workType==="contract" && 
                  <span>{`${currency} ${jobObj.jobCommissionDetails.work_details.contract.contract_pay_rate_type==="Range"
                  ?(`${jobObj.jobCommissionDetails.work_details.contract.min_contract_pay}-${jobObj.jobCommissionDetails.work_details.contract.max_contract_pay}`)
                  :(jobObj.jobCommissionDetails.work_details.contract.fix_contract_pay)
                  } ${jobObj.jobCommissionDetails.work_details.contract.contract_pay_cycle}`}
                  </span>
                }
              </div>
           </div>
           <div className='flex gap-5 place-items-center'>
             <div className='w-28 flex flex-col text-[13px] text-gray-500 gap-3 place-content-start'>
                 <span>Exp</span>
                 <span>Domain</span>
                 <span>Ac-manager</span>
             </div>
             <div className='flex flex-col font-semibold text-[13px] text-gray-700 gap-3 place-content-start'>
                <span>{jobObj.jobBasicDetails.experience.minexp}-{jobObj.jobBasicDetails.experience.maxexp} year</span>
                <span>{jobObj.jobBasicDetails.job_domain}</span>
                <spna>{jobObj.acemail}</spna>
             </div>
           </div>
         </div>
         <div>
            {jobObj.isRequestJob && <button onClick={handleWithrawJobRequest} className='bg-red-500 text-white p-1 rounded-sm mr-2 hover:bg-red-600 transition-colors duration-300'>Withdrawal</button>}
            <button disabled={jobObj.isRequestJob} onClick={handleOpenConfirmPopUpBox} className='bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-200 text-white p-1 text-md rounded-sm'><ArrowRightAltIcon style={{marginRight:"4px"}}></ArrowRightAltIcon> {jobObj.isRequestJob?("Mapping Request Sent"):("Request Map")}</button>
         </div>
       </div>
    </div>
   </>
  )
}
