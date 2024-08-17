
import React from 'react'
// import AddIcon from '@mui/icons-material/Add';

const Add = () => {
  return (
    <div className='relative h-16 xl:h-20 px-5 flex items-center font-medium xl:text-lg  bg-blue-120 '>
      {/* Centered Links */}
      <div className=' flex justify-center gap-5'>
        <a href='#' className= 'hover:border-b-2 hover:border-blue-230 transition duration-300'>My Dashboard</a>
        <a href='#' className= 'hover:border-b-2 hover:border-blue-230 transition duration-300'>Insight</a>
      </div>
      
      {/* Right-Aligned Section */}
      <div className='absolute right-4 flex items-center gap-2'>
        {/* <AddIcon/> */}
        +
        <span>Add Account Manager </span>
      </div>
    </div>
  )
}

export default Add
