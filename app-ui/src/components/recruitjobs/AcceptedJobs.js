import React, { useContext, useEffect, useState } from 'react'
import AcceptedJobItem from './AcceptedJobItem'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../assets/blueLoader.svg'

export default function AcceptedJobs() {
  const [jobs,setJobs]=useState([])
  const [loader,setLoader]=useState(false)
  const {user}=useContext(AuthContext)

  const fetchAcceptedJobsData=async ()=>{
    try{
      setLoader(true)
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/frontacceptedjobs/${user._id}`)
      console.log(res.data)
      setJobs(res.data)
    }catch(err){
      console.log(err)
    }
    setLoader(false)
  }


  useEffect(()=>{
     fetchAcceptedJobsData()
  },[])
  return (
    <div className='flex flex-col gap-2'>
      {
         loader?(
          <div className='flex h-full justify-center items-center pt-14'>
           <img className='h-12 w-12' src={Loader}></img>
          </div>
         ):(
          jobs.map((item,index)=>(
            <AcceptedJobItem key={index} jobObj={item}></AcceptedJobItem>
          ))
         ) 
      }
      
    </div>
  )
}
