import React from 'react'

//import images
import asset36 from '../assets/asset36.jpg'
import asset37 from '../assets/asset37.jpg'

//importing icons
import EmailIcon from '@mui/icons-material/Email';

export default function Support() {
  return (
    <div className='flex flex-col gap-2'>
     <h1 className='text-xl font-bold'>Support</h1>
        <div className='flex flex-col'>
          <h1 className='text-black text-xl'>Technical Support</h1>
          <p className='text-sm text-gray-500'>Questions related to the Web Portal's features and defects</p>
         
         <div className='flex w-full justify-between border p-1 pr-10 rounded-md pt-2 mt-2'>
            <div className='flex gap-8 pl-2'>
             <img className='w-12 h-12 rounded-full ' src={asset36}></img>
             <div className='flex flex-col '>
               <h2 className=''>Roshebh Sharma</h2>
               <span className='text-sm text-gray-500'>support@uphire.in</span>
             </div>
            </div>
            <div className='flex-col flex gap-2'>
             
               <div className='flex gap-4  pt-4'>
                  <EmailIcon style={{fontSize:'1.2rem',color:'#575757'}}></EmailIcon>
                  
               </div>
            </div>
         </div>
     </div>
    
        <div className='flex flex-col mt-2'>
          <h1 className='text-black text-xl'>Business Support</h1>
          <p className='text-sm text-gray-500'>Account Manager (UPHIRE Platform Adoption Consultant) for all the Requirements, Candidate processing & Payments</p>
  
         <div className='flex w-full justify-between border p-1 pr-10 rounded-md pt-2 mt-2'>
            <div className='flex gap-8 pl-2'>
             <img className='w-12 h-12 rounded-full ' src={asset37}></img>
             <div className='flex flex-col '>
               <h2 className='text-lg'>Vibhita Chopra</h2>
               <span className='text-sm text-gray-500'>support@uphire.in</span>
             </div>
            </div>
            <div className='flex-col flex gap-2'>
               
               <div className='flex gap-2 pt-4'>
                  <EmailIcon style={{fontSize:'1.2rem',color:'#575757'}}></EmailIcon>
                
               </div>
            </div>
         </div>
     </div>
    </div>
  )
}
