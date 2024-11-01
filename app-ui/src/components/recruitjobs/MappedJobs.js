import React, { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import MappedJobsItem from './MappedJobsItem'
import Loader from '../../assets/blueLoader.svg'

export default function MappedJobs({jobs,loader,showNotification,fetchAcceptedJobs,fetchMappedJobs,setLoader}) {
  const {user}=useContext(AuthContext)

  return (
    <div className='flex gap-2 flex-col'>
      {
         loader?(
          <div className='flex h-full justify-center items-center pt-14'>
           <img className='h-12 w-12' src={Loader}></img>
          </div>
         ):(
          jobs.map((item,index)=>(
            <MappedJobsItem 
            fetchAcceptedJobs={fetchAcceptedJobs} 
            fetchMappedJobs={fetchMappedJobs} 
            showNotification={showNotification}
            key={index}
            setLoader={setLoader} 
            jobObj={item}></MappedJobsItem>
          ))
         ) 
      }
      
    </div>
  )
}
