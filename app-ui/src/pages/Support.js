import React from 'react'

//import images
import asset36 from '../assets/asset36.jpg'
import asset37 from '../assets/asset37.jpg'

//importing icons
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function Support() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='custom-div gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-gray-800 text-xl'>Technical Support</h1>
          <p className='text-sm text-gray-500'>Questions related to the Web Portal's features and defects</p>
         </div>
         <div className='flex w-full justify-between border p-4 pr-10 rounded-md'>
            <div className='flex gap-8'>
             <img className='w-24 h-24 rounded-full ' src={asset36}></img>
             <div className='flex flex-col gap-1'>
               <h2 className='text-lg'>Roshebh Sharma</h2>
               <span className='text-sm text-gray-500'>support@uphire.in</span>
             </div>
            </div>
            <div className='flex-col flex gap-2'>
               <h1>CONTACT</h1>
               <div className='flex gap-2 justify-center'>
                  <EmailIcon style={{fontSize:'1.2rem',color:'#575757'}}></EmailIcon>
                  <LocalPhoneIcon style={{fontSize:'1.2rem',color:'#575757'}}></LocalPhoneIcon>
               </div>
            </div>
         </div>
     </div>
     <div className='custom-div gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-gray-800 text-xl'>Business Support</h1>
          <p className='text-sm text-gray-500'>Account Manager (UPHIRE Platform Adoption Consultant) for all the Requirements, Candidate processing & Payments</p>
         </div>
         <div className='flex w-full justify-between border p-4 pr-10 rounded-md'>
            <div className='flex gap-8'>
             <img className='w-24 h-24 rounded-full ' src={asset37}></img>
             <div className='flex flex-col gap-1'>
               <h2 className='text-lg'>Vibhita Chopra</h2>
               <span className='text-sm text-gray-500'>support@uphire.in</span>
             </div>
            </div>
            <div className='flex-col flex gap-2'>
               <h1>CONTACT</h1>
               <div className='flex gap-2 justify-center'>
                  <EmailIcon style={{fontSize:'1.2rem',color:'#575757'}}></EmailIcon>
                  <LocalPhoneIcon style={{fontSize:'1.2rem',color:'#575757'}}></LocalPhoneIcon>
               </div>
            </div>
         </div>
     </div>
    </div>
  )
}
