import React from 'react'

export default function ResumeUpload1() {
  return (
    <div className='w-full bg-white-500 rounded-md flex flex-col p-2'>
        <div className='flex gap-4 items-start w-full px-5 py-4'>
          <div className='flex w-[42%] py-2 gap-0.5 flex-col '>
              <h1 className='text-xl font-light'>Basic Details</h1>
              <p className='text-sm text-gray-400'>Please enter your personal information</p>
          </div>
          <div className='bg-white shadow w-[58%] p-6 rounded-md flex flex-col gap-8'>
            <div className='flex w-full gap-3 items-center'>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='firstname'>First Name <span className='text-red-500'>*</span></label>
                    <input
                    type='text'
                    className='input-field'
                    ></input>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='lastname'>Last Name <span className='text-red-500'>*</span></label>
                    <input
                    type='text'
                    className='input-field'
                    ></input>
                </div>
            </div>
            <div className='flex w-full gap-3 items-center'>
               <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='firstname'>Select Country <span className='text-red-500'>*</span></label>
                    <input
                    type='text'
                    className='input-field'
                    ></input>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <label className='input-label' htmlFor='lastname'>Current Location <span className='text-red-500'>*</span></label>
                    <input
                    type='text'
                    className='input-field'
                    ></input>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
