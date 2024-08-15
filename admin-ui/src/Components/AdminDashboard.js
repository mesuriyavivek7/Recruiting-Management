import React from 'react'

import Resumes from '../Pages/Resumes'

import User from '../Pages/User'
import Add from '../Pages/Add'

const AdminDashboard = () => {
  return (
    <div className='relative '>
    
    <div className=' py-10  w-full' >
      <div className="grid grid-cols-1  gap-9 ">
        
        {/* Add Component */}
        <div className=" md:col-span-3">
          <Add/>
        </div>

    
         
          <User/>
        

        
        

        {/* Resumes Component */}
        {/* <div className="shadow-lg md:col-span-3">
          <Resumes/>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
