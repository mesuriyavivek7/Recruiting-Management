import React from 'react'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
//import icons
import AddIcon from '@mui/icons-material/Add';

export default function RecruiterDashboard() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='custom-div py-4 flex flex-row items-center justify-between'>
         <div className='flex gap-4 text-gray-600 items-center'>
            <span className='text-sm cursor-pointer'>My Dashboard</span>
            <VideocamOutlinedIcon style={{fontSize:'1.4rem'}} className='cursor-pointer'></VideocamOutlinedIcon>
         </div>
         <div className='flex gap-6'>
          <button className='text-gray-600 cursor-pointer flex gap-2  items-center'>
            <span><BackupTableOutlinedIcon style={{fontSize:'1.4rem'}}></BackupTableOutlinedIcon></span>
            <span className='text-sm'>Export</span>
          </button>
          <button className='text-gray-600 cursor-pointer flex gap-2  items-center'>
            <span><ArticleOutlinedIcon style={{fontSize:'1.4rem'}}></ArticleOutlinedIcon></span>
            <span className='text-sm'>Guidelines</span>
          </button>
          <button className='text-gray-600 cursor-pointer flex gap-2 items-center'>
           <span><AddIcon style={{fontSize:'1.4rem'}}></AddIcon></span>
           <span className='text-sm'>Add Member</span>
          </button>
         </div>
      </div>
      <div className='custom-div py-4 gap-4'>
         <h1>Jobs</h1>
         <div className='w-full flex gap-4'>
            <div className='custom-div flex-1'>
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                      <div className='h-2 w-2 bg-green-400 rounded-full'></div>
                      <h1 className='text-black-200 text-2xl'>0</h1>
                  </div>
                  <p className='text-sm text-gray-400'>Accepted</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                      <div className='h-2 w-2 bg-purple-400 rounded-full'></div>
                      <h1 className='text-black-200 text-2xl'>0</h1>
                  </div>
                  <p className='text-sm text-gray-400'>Engaged</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div  flex-1'>
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                      <div className='h-2 w-2 bg-orange-400 rounded-full'></div>
                      <h1 className='text-black-200 text-2xl'>0</h1>
                  </div>
                  <p className='text-sm text-gray-400'>No Resume Submitted</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                      <div className='h-2 w-2 bg-orange-200 rounded-full'></div>
                      <h1 className='text-black-200 text-2xl'>0</h1>
                  </div>
                  <p className='text-sm text-gray-400'>Pending Acceptance</p>
                </div>
            </div>
            
         </div>
      </div>
      <div className='custom-div py-4 gap-4'>
        <h1>Resumes</h1>
        <div className='w-full flex gap-4'>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-orange-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>Total Resumes <br></br>(No Duplicates)</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-blue-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>New Resumes</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-green-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>Under Process</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-violet-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>Selected</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-red-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>Rejected</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
            <div className='custom-div flex-1'>
                <div className='flex flex-col gap-1'>
                 <div className='flex gap-2 items-center'>
                    <div className='h-2 w-2 bg-purple-400 rounded-full'></div>
                    <h1 className='text-2xl'>0</h1>
                 </div>
                 <p className='text-sm text-gray-400'>Others</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Active</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span>0</span>
                        <span className='text-gray-400 text-[.8rem]'>Paused</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
