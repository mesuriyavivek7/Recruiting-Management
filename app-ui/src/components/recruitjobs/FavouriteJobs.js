import React from 'react'

import AcceptedJobItem from './AcceptedJobItem'

//Import image
import Loader from '../../assets/blueLoader.svg'


export default function FavouriteJobs({jobs,loader,showNotification,fetchFavouriteJobs,fetchAcceptedJobs}) {
  return (
    <div className='flex flex-col gap-2'>
    {
       loader?(
        <div className='flex h-full justify-center items-center pt-14'>
         <img className='h-12 w-12' src={Loader}></img>
        </div>
       ):(
        jobs.map((item,index)=>(
            <AcceptedJobItem 
            fetchFavouriteJobs={fetchFavouriteJobs} 
            fetchAcceptedJobs={fetchAcceptedJobs} 
            showNotification={showNotification} 
            key={index} 
            jobObj={item}></AcceptedJobItem>
        ))
       ) 
    }
    
  </div>
  )
}
