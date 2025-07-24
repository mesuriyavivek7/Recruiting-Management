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


function AiRecentSearch({searchType,setPromptRecentFilledSearch,dataType,data,setManuallRecentFilledSearch}) {
  return (
    <div className='max-h-96 min-h-72 overflow-scroll flex p-4 bg-white rounded-md flex-col gap-4'>
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
            data.length===0 ? (
               <div className='flex h-32 justify-center items-center'>
                  <span className='text-center text-gray-400 p-2'>{dataType==="save"?"No saved search found.":"No recent search found."}</span>
               </div>
            ):( 
            data.map((item,index) => (
               <div key={index} className='flex flex-col gap-1 items-start'>
               <div className='flex items-center gap-2'>
                  <AutoAwesomeIcon style={{fontSize:'1.2rem'}}></AutoAwesomeIcon>
                  {
                     dataType==="save" ? 
                     (searchType==="manually" ? <p>{item.experience_titles.map((keyword, i)=> <span>{keyword} {i!==item.experience_titles.length-1 && ","} </span>)}</p>: <p className='text-sm'>{TrimContent(item)}</p>)
                     : (searchType==="manually" ? <p>{item.experience_titles.map((keyword, i)=> <span>{keyword} {i!==item.experience_titles.length-1 && ","} </span>)}</p> : <p className='text-sm'>{TrimContent(item)}</p>)
                  }
                  
               </div>
               <button onClick={()=>{
                  searchType==="manually"
                  ?setManuallRecentFilledSearch(item)
                  :setPromptRecentFilledSearch(item)
               }} className='text-sm text-green-600'>Fill Search</button>
              </div>
            ))
            )
         }
        </div>
    </div>
  )
}

export default AiRecentSearch