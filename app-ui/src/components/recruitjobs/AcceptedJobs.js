import React, { useContext} from 'react'
import AcceptedJobItem from './AcceptedJobItem'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../assets/blueLoader.svg'

export default function AcceptedJobs({jobs,loader,showNotification,fetchAcceptedJobs,fetchFavouriteJobs,fetchMappedJobs}) {
  const {user}=useContext(AuthContext)

  
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
             fetchAcceptedJobs={fetchAcceptedJobs}
             fetchMappedJobs={fetchMappedJobs}
             fetchFavouriteJobs={fetchFavouriteJobs} 
             showNotification={showNotification} 
             key={index} 
             jobObj={item}>
             </AcceptedJobItem>
          ))
         ) 
      }
      
    </div>
  )
}
