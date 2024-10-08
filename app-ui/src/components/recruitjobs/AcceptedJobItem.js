import React from 'react'


//importing images
import USAFLAG from '../../assets/asset38.png'
import FIRE from '../../assets/asset39.png'
import {useNavigate} from 'react-router-dom'

//importing icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';

export default function AcceptedJobItem({jobObj}) {
  const navigate=useNavigate()

  const getText=(txt)=>{
      if(txt.length>25) return txt.slice(0,25)+"..."
      return txt
  }
  //client name
  //job id
  //job title 
  //experience
  //salary 
  //ac manager

  const handleNavigate=()=>{
    navigate('/recruiter/uploadresume',{state:jobObj})
  }
  return (
    
        <div className='custom-div cursor-pointer hover:scale-[.99] transition-all'>
            
              <div className='flex items-start gap-10'>
              <div className='flex items-start gap-4 mr-4'>
                   <span className='text-gray-500'>
                    <GradeOutlinedIcon style={{fontSize:"1.6rem"}}></GradeOutlinedIcon>
                    </span>
                  <div>
                    <img className='w-5 h-5' src={FIRE}></img>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <img className='w-6 h-5 rounded-md' src={USAFLAG}></img>
                        <span className='text-gray-500 text-[15px] font-semibold'>{jobObj.job_id} - {jobObj.job_title}</span>
                    </div>
                    <span className='text-light w-52 leading-5 text-[12px] text-gray-400'>CP - {jobObj.cp_name}</span>
                    {
                      jobObj.country==="USA" &&
                      <div className='p-1 rounded-md w-32 h-6 flex justify-center items-center bg-orange-700 text-orange-800'>
                           <span className='text-sm text-orange-800'>USA Hiring Guide</span>
                      </div>
                    }
                    <span className='text-[13px] text-gray-500'>{jobObj.city.map((item,index)=>`${item}${(index!==jobObj.city.length-1)?(", "):("")}`)}, {jobObj.country}</span>
                  </div>
               </div>
               <div className='flex gap-3 place-items-center'>
                  <div className='flex text-[13px] text-gray-500 flex-col gap-4 place-content-start'>
                      <span>Position</span>
                      <span>{jobObj.work_type==="full_time"?("Sp Payout"):("Sourcing Fees")}</span>
                      <span>{jobObj.work_type==="full_time"?("Salary"):("Contractor Pay Rate")}</span>
                  </div>
                  {(jobObj.work_type==="full_time")?(
                    <div className='flex text-[13px] font-semibold flex-col gap-4 text-gray-700 place-content-start'>
                     <span>{jobObj.positions} Full Time</span>
                     <span>{jobObj.full_time_salary_currency} {jobObj.commission_pay_out}{jobObj.commission_type==="Percentage" && "%"}</span>
                     <span>{jobObj.full_time_salary_currency} {jobObj.full_time_salary_type==="Fixed"?(jobObj.fixed_salary):(`${jobObj.min_salary}-${jobObj.max_salary}`)}</span>
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
                    <span className='p-0.5 text-[13px] flex justify-center items-center rounded-full text-black bg-slate-300'>0</span>
                    <span className='p-0.5 px-1 text-[13px] flex justify-center items-center rounded-md text-yellow-500 bg-yellow-300'>0%</span>
                 </div>
               </div>
               <div className='flex flex-col gap-3'>
                 <button onClick={handleNavigate} className='text-white transition-all hover:bg-blue-700 text-sm bg-blue-400 rounded-md flex items-center gap-2 py-1 px-2'><CloudUploadOutlinedIcon style={{fontSize:'1.1rem'}}></CloudUploadOutlinedIcon>Upload Resume</button>
                 <button className='text-sm border py-1 px-2 flex items-center gap-2 text-gray-500'><ChatOutlinedIcon style={{fontSize:"1.1rem"}}></ChatOutlinedIcon> 1 Job Messages</button>
                 <button className='text-red-500 hover:bg-red-100 transition-all text-sm flex px-2 py-1 gap-2 items-center'><PersonRemoveAlt1OutlinedIcon style={{fontSize:"1.1rem"}}></PersonRemoveAlt1OutlinedIcon> Unmap Me</button>
               </div>
               </div>
            
        </div>
      
  )
}
