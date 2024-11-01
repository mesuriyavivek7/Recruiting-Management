import React, {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

//importing components
import LiveJobsItem from './LiveJobsItem'

import Loader from '../../assets/blueLoader.svg'

export default function LiveJobs({jobs,loader,showNotification,setLoader,fetchLiveJobs}) {

  const {user}=useContext(AuthContext)


  return (
    <div className='flex flex-col gap-2'>
      {
        loader?(
          <div className='flex h-full justify-center items-center pt-14'>
            <img className='h-12 w-12' src={Loader}></img>
          </div>
        ):(
           jobs.map((job,index)=>(
              <LiveJobsItem 
              setLoader={setLoader}
              fetchLiveJobs={fetchLiveJobs}
              key={index} 
              showNotification={showNotification} 
              jobObj={job}></LiveJobsItem>
           ))
        )
      }
      
    </div>
  )
}
