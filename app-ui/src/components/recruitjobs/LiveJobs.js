import React, {useContext , useState} from 'react'
import {AuthContext} from '../../context/AuthContext'

//importing components
import LiveJobsItem from './LiveJobsItem'
import axios from 'axios'
import Loader from '../../assets/blueLoader.svg'

//importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import WhiteLoader from '../../assets/whiteloader.svg'

import HtmlContent from '../HtmlContent'
import CopyToClipBoard from '../CopyToClipBoard'

import FIRE from '../../assets/asset39.png'

export default function LiveJobs({jobs,loader,showNotification,setLoader,fetchLiveJobs}) {
  const {user}=useContext(AuthContext)

  const getDate=(date)=>{
    let d=new Date(date)
    let d_ate=d.getDate()
    let d_month=d.getMonth()+1
    let d_year=d.getFullYear()
   
    return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
  }

  const [previewLoader,setPriviewLoader]=useState(false)
  const [openPreviewBox,setOpenPreviewBox]=useState(false)
  const [jobHotMark,setJobHotMark]=useState(false)
  const [jobDescription,setJobDescription]=useState(null)
  const [jobBasicDetails,setJobBasicDetails]=useState(null)
  const [jobCommissionDetails,setJobCommissionDetails]=useState(null)
  const [acManager,setAcManager]=useState(null)
  const [jobStatus,setJobStatus]=useState(null)


  const handleFetchJobDetails=async (jobid)=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobbasicdetailsforpreview/${jobid}`)
      if(res.data){
       setJobBasicDetails(res.data)
       setJobDescription(res.data.job_description)
      }
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
}

const handleFetchJobStatus=async (jobid)=>{
  try{ 
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobstatusforpreview/${jobid}`)
     if(res.data) setJobStatus(res.data)
  }catch(err){
     console.log(err)
     showNotification("Something went wrong...!",'failure')
  }
}


const handleFetchAcManager=async (jobid)=>{
  try{
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getacmanagerforpreview/${jobid}`)
     if(res.data) setAcManager(res.data)
  }catch(err){
    console.log(err)
    showNotification('Something went wrong...!','failure')
  }
}

const handleFetchJobCommissionDetails=async (jobid)=>{
  try{
   const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobcommissiondetailsforpreview/${jobid}`)
   if(res.data) setJobCommissionDetails(res.data)
   console.log("Commission Details--->",res.data)
  }catch(err){
     console.log(err)
     showNotification('Something went wrong...!','failure')
  }
}


const handleFetchJobHotMark=async (jobid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getjobhotmark/${jobid}`)
       setJobHotMark(res.data)
    }catch(err){
      console.log(err)
      showNotification("Something went wrong...!",'failure')
    }
}


const getFirstLetterCapital=(val)=>{
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

//mapping of duration
const duration=new Map([
  ['weekly','Week'],
  ['monthly','Month']
])


//For open close details
const [openJobDetails,setOpenJobDetails]=useState(true)
const [openJobDescription,setOpenJobDescription]=useState(false)


const handleOpenPreviewBox=async (jobid)=>{
  setPriviewLoader(true)
  setOpenPreviewBox(true)
  //For fetching job details
  await handleFetchJobDetails(jobid)
  await handleFetchJobStatus(jobid)
  await handleFetchAcManager(jobid)
  await handleFetchJobCommissionDetails(jobid)
  await handleFetchJobHotMark(jobid)
  setPriviewLoader(false)
}

const handleClosePreviewBox=()=>{
   setOpenPreviewBox(false)
   setJobBasicDetails(null)
   setJobDescription(null)
   setJobCommissionDetails(null)
   setAcManager(null)
   setJobStatus(null)
   setJobHotMark(false)

   setOpenJobDetails(true)
}

  return (
    <>
    {
      openPreviewBox && 
      <div className='fixed inset-0 flex justify-center bg-black z-10 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div gap-0 p-0 w-[90%] overflow-hidden'>
              <div className='relative flex w-full p-2 flex-col gap-2 bg-gradient-to-r from-cyan-100 to-blue-200'>
                
                 <div className='flex gap-2 items-center'>
                     <span onClick={handleClosePreviewBox} className='text-gray-500 cursor-pointer '><ArrowBackIosIcon style={{fontSize:'1.2rem', fontWeight:'bold'}}></ArrowBackIosIcon></span>
                     <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 items-end'>
                            {
                              jobHotMark && <img src={FIRE} className='w-6 h-6'></img>
                            }
                            <span className='text-md font-medium'>Job Id: {jobBasicDetails && jobBasicDetails.job_id}</span>
                            <h1 className='text-xl font-medium tracking-wide'>{jobBasicDetails && jobBasicDetails.job_title}</h1>
                        </div>
                        <div className='flex flex-col gap-1'>
                         <div className='flex gap-4 items-center'>
                            <div className='flex gap-1 items-center'>
                              <span className='font-light'>{jobCommissionDetails && jobCommissionDetails.work_type==="full_time"?"Total Commission: ":"Sourcing Fee: "}</span>
                              <h2>{jobCommissionDetails && 
                              ((jobCommissionDetails.work_type==="full_time")
                              ?((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Annual Salary`)
                              :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay} Of Annual Salary`))
                              :((jobCommissionDetails.commission_details.commission_type==="Percentage")
                              ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}% of Contract Pay`)
                              :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.commission_details.commission_fix_pay} of Contract Pay`)))}</h2>
                            </div>
                            <div className='flex gap-1 items-center'>
                              <span className='font-light'>Position:</span>
                              <h2>{jobBasicDetails && jobBasicDetails.positions}</h2>
                            </div>
                            <h1>{jobCommissionDetails && (jobCommissionDetails.work_type==="full_time"?("Full Time"):("Contract"))}</h1>
                            <div className='flex gap-1 items-center'>
                               {jobBasicDetails && 
                                jobBasicDetails.city.map((city,index)=>(

                                  <span key={index}>{`${city}${index===jobBasicDetails.city.length-1?(' '):(',')}`}</span>
                                ))
                               }
                            </div>
                         </div>
                         <div className='flex gap-4 items-center'>
                            <div className='flex font-light text-sm gap-1 items-center'>
                                <span>Ac Manager:</span>
                                <span>{acManager?(acManager.full_name):("Not Available")}</span>
                            </div>
                         </div>
                        </div>
                     </div>
                 </div>
              </div>

              {
                   (previewLoader)?(
                      <div className='flex w-full h-[600px] items-center justify-center'>
                         <img src={WhiteLoader} className='w-10 h-10'></img>
                      </div>
                   ):(
                    
                        <div className='bg-white-200 w-full flex gap-3 p-3'>
                        <div className='relative flex-1 custom-div gap-0 h-[600px] p-0'>
                        <div className='border-b w-full p-2'>
                          <span className='text-blue-400'>Job Updates</span>
                        </div>
                        <div className='bg-white-600 py-4 flex flex-col gap-4 px-2 w-full h-[558px] overflow-scroll'>
                           <span className='flex gap-2 text-gray-500'><InfoOutlinedIcon></InfoOutlinedIcon> Please accept the job for view job updates and other details.</span>
                           
                        </div>
                </div>
                <div className='flex-1 overflow-hidden rounded-md shadow p-0 bg-white'>
                   <div className='overflow-y-auto h-[600px]'>
                   {
                        jobBasicDetails && 
                        <div>
                          <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                            <span className='text-blue-400'>Job Details</span>
                            <span onClick={()=>setOpenJobDetails(!openJobDetails)} className='text-blue-400 cursor-pointer'>{openJobDetails?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                          </div>
                          {
                            openJobDetails && (

                              <div className='flex bg-white items-center px-3 py-4'>
                              <div className='flex flex-col gap-2'>
                               <div className='flex items-center gap-2'>
                                 <span className='text-sm w-32'>Job Title</span>
                                 <span className='text-[14px] w-52 font-semibold'>{jobBasicDetails.job_title}</span>
                               </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Domain</span>
                               <span className='text-[14px] w-52 font-semibold text-blue-400'>{jobBasicDetails.job_domain}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                                <span className='text-sm w-32'>Posted At</span>
                                <span className='text-[14px] w-52 font-semibold'>{getDate(jobBasicDetails.createdAt)}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Location</span>
                               <span  className='text-[14px] w-52 font-semibold'>{jobBasicDetails.country}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Status</span>
                               <span className={`${jobStatus==='Active'?("bg-green-200 text-green-500"):("bg-yellow-100 text-yellow-400")} text-[14px] flex justify-center items-center p-1 px-4 rounded-md font-semibold`}>{jobStatus}</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>{jobCommissionDetails && jobCommissionDetails.work_type==="full_time"?("Salary"):("Contract Pay Rate")}</span>
                               <span className='text-[14px] w-52 font-semibold'>        
                                 {jobCommissionDetails &&  (jobCommissionDetails.work_type==="full_time"?
                                 (jobCommissionDetails.work_details.full_time.full_time_salary_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.fixed_salary}`)
                                   :(`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.work_details.full_time.min_salary} - ${jobCommissionDetails.work_details.full_time.max_salary}`))
                                   :(jobCommissionDetails.work_details.contract.contract_pay_rate_type==="Fixed"
                                   ?(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.fix_contract_pay} ${getFirstLetterCapital(jobCommissionDetails.work_details.contract.contract_pay_cycle)}`)
                                   :(`${jobCommissionDetails.work_details.contract.contract_pay_currency} ${jobCommissionDetails.work_details.contract.min_contract_pay} - ${jobCommissionDetails.work_details.contract.max_contract_pay} ${getFirstLetterCapital(jobCommissionDetails.work_details.contract.contract_pay_cycle)}`)))}
                                </span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Payment Terms</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.commission_details.payment_tearms} Days</span>
                             </div>
                             <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Job Positions</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobBasicDetails.positions}</span>
                             </div>
                             {
                              (jobCommissionDetails && jobCommissionDetails.work_type==="contract") 
                              &&
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Working Hour Per Day</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.work_details.contract.daily_hour_cnt}</span>
                              </div>
                             }
                             {
                              (jobCommissionDetails && jobCommissionDetails.work_type==="contract")
                              &&
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Working Hour Per Week</span>
                               <span className='text-[14px] w-52 font-semibold'>{jobCommissionDetails && jobCommissionDetails.work_details.contract.weekly_hour_cnt}</span>
                              </div>
                             }
                          </div>
                          <div className='flex flex-col gap-2'>
                             {
                              jobCommissionDetails.work_type==="contract" && 
                              <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Contract Duration</span>
                               <span className='text-[14px] w-32 font-semibold'>{jobCommissionDetails && `${jobCommissionDetails.work_details.contract.contract_duration_count} ${duration.get(jobCommissionDetails.work_details.contract.contract_duration_type)}`}</span>
                             </div>
                             }
                            <div className='flex items-center gap-2'>
                               <span className='text-sm w-32'>Experience</span>
                               <span className='text-[14px] w-32 font-semibold'>{`${jobBasicDetails.experience.minexp} - ${jobBasicDetails.experience.maxexp} Years`}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>Replacement Terms</span>
                              <span className='text-[14px] w-32 font-semibold'>{jobCommissionDetails && jobCommissionDetails.commission_details.replacement_clause} Days</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm w-32'>SP Payout</span>
                              <span className='text-[14px] w-32 font-semibold'>
                               {jobCommissionDetails && (jobCommissionDetails.commission_details.commission_type==="Percentage"
                               ?(`${jobCommissionDetails.commission_details.commission_percentage_pay}%`)
                               :(jobCommissionDetails.work_type==="full_time"?
                               (`${jobCommissionDetails.work_details.full_time.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`)
                               :(`${jobCommissionDetails.work_details.contract.full_time_salary_currency} ${jobCommissionDetails.commission_details.commission_fix_pay}`)))}
                              </span>
                            </div>
                           </div>
                          </div>

                            )
                          }
                          
                       </div>
                        }
                        {
                          jobDescription && (
                             <div>
                               <div className='flex bg-slate-100 border-b p-2 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                   <span className='text-blue-400'>Job Description</span>
                                   <CopyToClipBoard text={jobDescription} showNotification={showNotification}></CopyToClipBoard>
                                </div>
                                <span onClick={()=>setOpenJobDescription(!openJobDescription)} className='text-blue-400 cursor-pointer'>{openJobDescription?(<KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>):(<KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>)}</span>
                               </div>
                                {
                                  openJobDescription && (
                                    <div className='py-3 px-2'>
                                       <HtmlContent htmlString={jobDescription}></HtmlContent>
                                    </div>
                                  )
                                }
                             </div>
                          )
                        }
                        
                   </div>
                </div>
              </div>
                      
                   )
              }
             
          </div>
      </div>
     }
    <div className='flex overflow-auto scroll-smooth h-[580px] flex-col gap-2'>
      {
        loader?(
          <div className='flex h-full justify-center items-center pt-14'>
            <img className='h-12 w-12' src={Loader}></img>
          </div>
        ):(
           jobs.map((job,index)=>(
              <LiveJobsItem 
              handleOpenPreviewBox={handleOpenPreviewBox}
              setLoader={setLoader}
              fetchLiveJobs={fetchLiveJobs}
              key={index} 
              showNotification={showNotification} 
              jobObj={job}></LiveJobsItem>
           ))
        )
      }
      
    </div>
    </>
  )
}
