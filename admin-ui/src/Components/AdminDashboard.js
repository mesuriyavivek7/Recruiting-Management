import React from 'react'


import User from '../Pages/PagesForAdmin/User'
import Add from '../Pages/PagesForAdmin/Add'

const AdminDashboard = () => {
  return (
    <div className='relative '>
    
    <div className=' py-4 w-full' >
      <div className="grid grid-cols-1  gap-9 ">
        
        {/* Add Component */}
        
          <Add/>
      

    
         
          <User/>
        

        
        

      
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
