import React from 'react'

import Resumes from '../Pages/Resumes'
import Jobs from '../Pages/Jobs'
import User from '../Pages/User'
import Add from '../Pages/Add'

const AdminDashboard = () => {
  return (
    <div className='relative '>
    
    <div className='px-10 py-10  w-full' >
      <div className="grid grid-cols-1  gap-9 ">
        
        {/* Add Component */}
        <div className="shadow-lg shadow-gray-600 md:col-span-3">
          <Add/>
        </div>

        {/* User Component */}
        <div className="shadow-lg shadow-gray-600 md:col-span-3">
          <User/>
        </div>

        {/* Jobs Component */}
        <div className="shadow-lg shadow-gray-600 md:col-span-3">
          <Jobs/>
        </div>

        {/* Resumes Component */}
        <div className="shadow-lg shadow-gray-600 md:col-span-3">
          <Resumes/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
