import React from 'react'



import User from '../Pages/PagesForSuperAdmin/User'
import Add from '../Pages/PagesForSuperAdmin/Add'

const SupperAdminDashboard= () => {
  return (
    <div className='relative '>
    
    <div className=' py-4 w-full' >
      <div className="grid grid-cols-1  gap-9 ">
          <Add/>
          <User/>
        </div>
      </div>
    </div>
  )
}

export default SupperAdminDashboard;