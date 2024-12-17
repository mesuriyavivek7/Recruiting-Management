import React from 'react'

import WhiteLoader from '../assets/whiteloader.svg'

export default function Loading() {
  return (
    <div className='h-screen bg-white w-full flex justify-center items-center'>
         <div className='flex flex-col items-center gap-3'>
           <img src={WhiteLoader} className='w-10 h-10' alt='loader'></img>
           <span className='text-sm font-sans'>Please wait while we fetch the data.....</span>
         </div>
    </div>
  )
}
