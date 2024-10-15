import { Card } from '@mui/material'
import React from 'react'
import {FaBriefcase} from 'react-icons/fa'

const EnterpriseDetails = () => {
  return (
    <Card className='mt-4 font-sans shadow-md' sx={{
      borderRadius: '8px',
      boxShadow: 3,
    }}>
    <div className='px-5 '>
    
          <div className="space-y-6 flex flex-col items-center p-4 ">
           
            <div className="bg-white p-4 rounded-lg  w-full  space-y-2 ">
              <div className=' space-y-3'>
            
              <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800  flex items-center">
                <FaBriefcase className="mr-3 text-2xl xl:text-3xl text-blue-600" /> Enterprise Details
              </h2>
              <div className='pl-36'>
              <p className="xl:text-lg"><strong>Full Name:</strong> Software Engineer</p>
              <p className=" xl:text-lg"><strong>Email:</strong> arati@gmail.com</p>
              <p className=" xl:text-lg"><strong>Mobile Number:</strong> 87544786756</p>
              <p className=" xl:text-lg"><strong>Designation:</strong> xjk</p>
              <p className=" xl:text-lg"><strong>Company Name:</strong> odoo</p>
              <p className=" xl:text-lg"><strong>Country:</strong> USA</p>
              <p className=" xl:text-lg"><strong>State:</strong>California</p>
              <p className=" xl:text-lg"><strong>City:</strong> nesco</p>
              <p className=" xl:text-lg"><strong>Email Verification:</strong> yes</p>

              </div>
              
              </div>
            </div>
            
            </div> 
          
        
    </div>
    </Card>
  )
}

export default EnterpriseDetails
