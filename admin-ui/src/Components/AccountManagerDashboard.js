import React from 'react'



import User from '../Pages/PagesForAccountManager/User'
import Add from '../Pages/PagesForAccountManager/Add'
import Chart from '../Pages/PagesForAccountManager/chart'



const AccountManagerDashboard= () => {
  return (
    <div className='relative '>
    
    <div className=' py-4 w-full' >
      <div className="grid grid-cols-1  gap-9 ">
          <Add/>
          <User/>
       <Chart/>
        </div>
      </div>
    </div>
  )
}

export default AccountManagerDashboard;
