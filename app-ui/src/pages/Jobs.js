import React, { useState } from 'react'

//importing icons
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LiveJobs from '../components/recruitjobs/LiveJobs';
export default function Jobs() {
  const [currentTabe,setCurrentTabe]=useState('accepted')

  const handleCurrentTabe=(state)=>{
    setCurrentTabe(state)
  }
  return (
    <div className='flex flex-col gap-2'>
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
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='accepted')?("text-blue-400"):("text-black")}`}>0</span>
                </div>
                {
                    (currentTabe==="accepted") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('mapped')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='mapped')?("text-blue-400 hover:text-blue-500"):("text-gray-400 hover:text-black")}`}>Mapped Jobs</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='mapped')?("text-blue-400"):("text-black")}`}>0</span>
                </div>
                {
                    (currentTabe==="mapped") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('live')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='live')?("text-blue-400 hover:text-blue-500"):("text-gray-400 hover:text-black")}`}>Live Positions</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='live')?("text-blue-400"):("text-black")}`}>0</span>
                </div>
                {
                    (currentTabe==="live") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
             <div onClick={()=>handleCurrentTabe('favourite')} className='cursor-pointer flex flex-col gap-1 items-center'>
                <div className='flex gap-2'>
                  <h1 className={`text-[.9rem] tracking-wide font-light ${(currentTabe==='favourite')?("text-blue-400 hover:text-blue-500"):("text-gray-400 text-black")}`}>Favourite Jobs</h1>
                  <span className={`text-sm rounded-full bg-slate-200 px-[6px] py-[1px] ${(currentTabe==='favourite')?("text-blue-400"):("text-black")}`}>0</span>
                </div>
                {
                    (currentTabe==="favourite") && <hr className='h-1 bg-blue-400 w-full'></hr>
                }
             </div>
          </div>
       </div>
       <div className='flex flex-col gap-2'>
          <LiveJobs></LiveJobs>
          <LiveJobs></LiveJobs>
       </div>
    </div>

  )
}
