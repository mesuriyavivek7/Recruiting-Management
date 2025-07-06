import { LoaderCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

//Importing images 
import Watsapp from '../../assets/whatsapp.png'
import Mail from '../../assets/email.png'

function SendInvite({selectedCandidate, setSelectedCandidate, setOpenInviteBox}) {
  const {user} = useContext(AuthContext)
  const [acceptedJobs,setAccptedJobs] = useState([])
  const [loading,setLoading] = useState(false)
  const [selectedJob,setSelectedJob] = useState({})

  const fetchAcceptedJobs = async ()=>{
    setLoading(true)
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/basic-details/accepted-jobs/${user._id}`)
        console.log(response.data.data)
        setAccptedJobs(response.data.data)
    }catch(err){
        console.log(err)
    }finally{
        setLoading(false)
    }
  }

  const handleClose = ()=>{
    setOpenInviteBox(false)
    setSelectedCandidate({})
  }

  useEffect(()=>{
     fetchAcceptedJobs()
  },[])
  
 const handleSendMailInvite = async ()=>{
    if(Object.keys(selectedJob).length===0){
      toast.error("Please select any one job.")
    }
    try{
       const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/send-jd`,{
        candidateMail:selectedCandidate?.contact_details?.email,
        candidateName:selectedCandidate?.contact_details?.name,
        recruiterName:user?.full_name,
        jobDescription:selectedJob?.job_description
       })
       handleClose()
       toast.success('Job invitation sent successfully.')
    }catch(err){
        console.log(err)
    }
 } 

  return (
    <div className='bg-black/25 z-50 fixed inset-0 flex justify-center items-center'>
        <div className='p-4 w-[500px] rounded-md bg-white flex flex-col gap-2'>
             <div className='flex justify-between items-center'>
                 <h1 className='text-2xl font-medium'>Send Job Invite</h1>
                 <X onClick={handleClose}></X>
             </div>

             <div className='h-96 overflow-y-auto mt-2'>
                  {
                    loading ? 
                    <div className='flex h-full w-full justify-center items-center'>
                         <LoaderCircle className='animate-spin'></LoaderCircle>
                    </div>
                    :acceptedJobs.length === 0 ? 
                    (
                      <div className='flex h-full w-full justify-center items-center'>
                        <span className='text-gray-400'>No Jobs Found</span>
                      </div>
                    )
                    :
                    (
                        <div className='flex flex-col gap-3'>
                            {acceptedJobs.map((item, index) =>(
                            <div onClick={()=>setSelectedJob(item)} key={index} className={`flex cursor-pointer ${selectedJob._id === item._id ? "bg-blue-50 border-2 border-blue-400" : "border bg-gray-50 border-neutral-300"} p-2 rounded-md justify-between items-center`}>
                               <div className='flex flex-col'>
                                  <h1 className='font-medium'>{item?.job_id}</h1>
                                  <span className='text-sm'>{item?.job_title}</span>
                               </div>
                               <div className='flex flex-col'>
                                 <span className='text-gray-500 text-sm'>{item?.positions} Position</span>
                                 <span>{item?.country}</span>
                               </div>
                            </div>
                           ))}
                        </div>
                    )
                  }
             </div>

             <div className='flex items-center justify-center gap-4'>
                <button className='p-1.5 rounded-md border w-36 flex justify-center text-white bg-green-500 items-center gap-2'>
                    <img src={Watsapp} className='w-7 h-7 invert'></img>
                    <span className='font-medium'>Send</span>
                </button>
                <button onClick={handleSendMailInvite} className='p-1.5 rounded-md border w-36 flex justify-center text-white bg-blue-500 items-center gap-2'>
                    <img src={Mail} className='w-7 h-7 invert'></img>
                    <span className='font-medium'>Send</span>
                </button>

             </div>

        </div>
    </div>
  )
}

export default SendInvite