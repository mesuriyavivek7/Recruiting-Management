import React from 'react'

//Importing icons
import { RotateCcw } from 'lucide-react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Bookmark } from 'lucide-react';

const TrimContent = (item) =>{
   if(item && item.length > 78){
      return item.slice(0,79).concat("...")
   }else{
      return item
   }
}


function AiRecentSearch({dataType,data}) {
  return (
    <div className='max-h-96 overflow-scroll flex p-4 bg-white rounded-md flex-col gap-4'>
        <div className='flex items-center gap-2'>
           {
            dataType==="save" ?
            <h1 className='flex font-medium items-center gap-2'>
              <Bookmark className="w-5 h-5"></Bookmark> 
              Saved Searches
            </h1> :
            <h1 className='flex font-medium items-center gap-2'>
              <RotateCcw className="w-5 h-5"></RotateCcw> 
              Recent Searches
            </h1>
           }

        </div>
        <div className='flex flex-col gap-3'>
         {
            data.map((item,index) => (
               <div key={index} className='flex flex-col gap-1 items-start'>
               <div className='flex items-center gap-2'>
                  <AutoAwesomeIcon style={{fontSize:'1.2rem'}}></AutoAwesomeIcon>
                  <p className='text-sm'>{TrimContent(item)}</p>
               </div>
               <button className='text-sm text-green-600'>Fill Search</button>
              </div>
            ))
         }
        </div>
    </div>
  )
}

export default AiRecentSearch