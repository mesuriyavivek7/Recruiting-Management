import React from 'react'
//importing images
import USAFLAG from '../../assets/asset38.png'
import FIRE from '../../assets/asset39.png'

//importing icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


export default function LiveJobsItem() {
  return (
    <div className='custom-div cursor-pointer hover:scale-[.99] transition-all'>
       <div className='flex w-full justify-between'>
         <div className='flex gap-14'>
           <div className='flex items-start gap-4 mr-12'>
              <div>
                <img className='w-6 h-6' src={FIRE}></img>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                    <img className='w-8 h-6 rounded-md' src={USAFLAG}></img>
                    <span className='text-gray-500 text-[15px] font-semibold'>26573 - Nuc Wed Take</span>
                </div>
                <div className='p-1 rounded-md w-32 h-6 flex justify-center items-center bg-orange-700 text-orange-800'>
                       <span className='text-sm text-orange-800'>USA Hiring Guide</span>
                </div>
                <span className='text-[15px] text-gray-500'>Omaha, USA</span>
              </div>
           </div>
           <div className='flex gap-4 place-items-center'>
              <div className='flex text-sm text-gray-500 flex-col gap-4 place-content-start'>
                  <span>Position</span>
                  <span>Sourcing Fee</span>
                  <span>Contractor Pay Rate</span>
              </div>
              <div className='flex text-sm font-semibold flex-col gap-4 text-gray-700 place-content-start'>
                <span>1 contract</span>
                <span>USD 4 Hourly</span>
                <span>USD 110.0 Hourly</span>
              </div>
           </div>
           <div className='flex gap-4 place-items-center'>
             <div className='flex flex-col text-sm text-gray-500 gap-4 place-content-start'>
                 <span>Exp</span>
                 <span>Domain</span>
                 <span>Ac-manager</span>
             </div>
             <div className='flex flex-col font-semibold text-sm text-gray-700 gap-4 place-content-start'>
                <span>2-30 year</span>
                <span>Healthcare-Nurses & shope</span>
                <spna>abhijeet@gmail.com</spna>
             </div>
           </div>
         </div>
         <div>
            <button className='bg-blue-400 text-white p-1 text-md rounded-sm'><ArrowRightAltIcon style={{marginRight:"4px"}}></ArrowRightAltIcon> Request Map</button>
         </div>
       </div>
    </div>
  )
}
