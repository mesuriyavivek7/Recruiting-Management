import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import MappedJobsItem from './MappedJobsItem'
import Loader from '../../assets/blueLoader.svg'

export default function MappedJobs() {
  const {user}=useContext(AuthContext)
  const [jobs,setJobs]=useState([])
  const [loader,setLoader]=useState(false)
  const fetchMappedJobsData=async ()=>{
     try{
        setLoader(true)
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontmappedjobs/${user._id}`)
        console.log(res.data)
        setJobs(res.data)
     }catch(err){
        console.log(err)
     }
     setLoader(false)
  }

  useEffect(()=>{
    fetchMappedJobsData()
  },[])
  return (
    <div className='flex flex-gap-2 flex-col'>
      {
         loader?(
          <div className='flex h-full justify-center items-center pt-14'>
           <img className='h-12 w-12' src={Loader}></img>
          </div>
         ):(
          jobs.map((item,index)=>(
            <MappedJobsItem key={index} jobObj={item}></MappedJobsItem>
          ))
         ) 
      }
      
    </div>
  )
}
