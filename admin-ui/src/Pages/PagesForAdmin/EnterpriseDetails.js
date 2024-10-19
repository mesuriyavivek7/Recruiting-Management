import { Card } from '@mui/material'
import React from 'react'
import {FaBriefcase} from 'react-icons/fa'

const EnterpriseDetails = () => {
  return (
    <Card className='mt-4 font-sans shadow-md' sx={{
      borderRadius: '8px',
      boxShadow: 3,
    }}>
    <div className='lg:px-5 px-3 bg-blue-120'>
    
          <div className="space-y-6 bg-blue-120 flex flex-col items-center p-4 ">
           
            <div className=" bg-blue-120 p-4 rounded-lg  w-full  space-y-2 ">
              <div className=' space-y-3 bg-blue-120'>
            
              <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800  flex items-center">
                <FaBriefcase className="mr-3 text-2xl xl:text-3xl text-black" /> Enterprise Details
              </h2>
              <div className='pl-36 pt-4 gap-2 grid grid-cols-2'>
              <p className="xl:text-xl text-lg"><strong>Full Name:</strong> Software Engineer</p>
              <p className=" xl:text-xl text-lg"><strong>Email:</strong> arati@gmail.com</p>
              <p className=" xl:text-xl text-lg"><strong>Mobile Number:</strong> 87544786756</p>
              <p className=" xl:text-xl text-lg"><strong>Designation:</strong> xjk</p>
              <p className=" xl:text-xl text-lg"><strong>Company Name:</strong> odoo</p>
              <p className=" xl:text-xl text-lg"><strong>Country:</strong> USA</p>
              <p className=" xl:text-xl text-lg"><strong>State:</strong>California</p>
              <p className=" xl:text-xl text-lg"><strong>City:</strong> nesco</p>
              <p className=" xl:text-xl text-lg"><strong>Email Verification:</strong> yes</p>
              <p className=" xl:text-xl text-lg"><strong>Admin Verified:</strong> yes</p>
              <p className=" xl:text-xl text-lg"><strong>Allocated Account Manager:</strong> John sinha</p>

              </div>
              
              </div>
            </div>
            
            </div> 
          
        
    </div>
    </Card>
  )
}

export default EnterpriseDetails
