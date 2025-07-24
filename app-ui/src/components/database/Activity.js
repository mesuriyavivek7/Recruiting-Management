import React, { useEffect, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { LoaderCircle, X } from 'lucide-react'
import moment from 'moment'
import { AuthContext } from '../../context/AuthContext'


function Activity({selectedCandidate,handleCloseActivity}) {
  const {user} = useContext(AuthContext)
  const [activity,setActivity] = useState([])
  const [loading,setLoading] = useState(false)
  const [comment,setComment] = useState('')
  const [sendLoader,setSendLoader] = useState(false)
  const [error,setError] = useState('')

  const handleFetchActivities = async () =>{
    setLoading(true)
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/activity/candidate/${selectedCandidate._id}`)
        console.log(response)
        setActivity(response.data.data)
    }catch(err){
        console.log(err)
        toast.error(err?.response?.data?.message || "Something went wrong.")
    }finally{
        setLoading(false)
    }
  }

  useEffect(()=>{
    handleFetchActivities()
  },[])

  const handleSendActivity = async () =>{
     if(!comment){
       setError("Please enter comment message.")
       return 
     }
     try{
      setSendLoader(true)
      const data = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/activity`,{
        candidate_id:selectedCandidate._id,
        candidate_name:selectedCandidate?.contact_details?.name,
        recruiter_name:user?.full_name,
        recruiter_id:user?._id,
        comment
       })
       setComment('')
       await handleFetchActivities()
     }catch(err){
      console.log(err)
     }finally{
      setSendLoader(false)
     }
  }

  return (
    <div className='bg-black/25 z-50 fixed inset-0 flex justify-center items-center'>
        <div className='p-4 w-[600px] rounded-md bg-white flex flex-col gap-4'>
           <div className='flex justify-between items-center'>
             <h1 className='text-2xl font-medium'>{selectedCandidate?.contact_details?.name} Activities</h1>
             <X className='cursor-pointer' onClick={handleCloseActivity}></X>
           </div>
   
           <div className='flex flex-col gap-2.5 overflow-y-auto h-96'>
           {
            loading ? 
            <div className='h-full flex justify-center items-center'>
                 <LoaderCircle className='animate-spin'></LoaderCircle>
            </div>
            : activity.length === 0 ? 
             (
                <div className='flex justify-center items-center h-full'>
                     <span className='text-gray-500 font-medium'>No activities found</span>
                </div>
             ):(
                activity.map((act,index)=>(
                    <div key={index} className={`flex ${act.recruiter_id === user._id ?'items-end':'items-start'} flex-col`}>
                       <div className="flex justify-start mb-2">
                            <div className={`max-w-xs p-3 flex flex-col rounded-2xl rounded-bl-none ${act.recruiter_id === user._id ?'bg-blue-400 text-white':'bg-gray-200 text-black'} shadow-md`}>
                                {act.recruiter_id !== user._id && <span className='text-xs text-black'>{act.recruiter_name}</span>}
                                {act.comment}
                            </div>
                         </div>
                        <span className='text-xs'>{moment(act.createdAt).format("hh:mm A, DD-MM-YYYY")}</span>
                    </div>
                ))
             )
           }
           </div>
           <div className='flex items-end border rounded-md p-2 flex-col gap-1'>
             <textarea value={comment} onChange={(e)=> setComment(e.target.value)} 
             className=' w-full outline-none resize-none rounded-md' placeholder='Enter comment'></textarea>
             <button onClick={handleSendActivity} disabled={sendLoader} className='p-1.5 bg-blue-400 text-white rounded-md flex justify-center items-center w-24'>
               {
                sendLoader ? 
                <LoaderCircle className='animate-spin'></LoaderCircle>
                :"Send"
               }
             </button>
           </div>
        </div>
    </div>
  )
}

export default Activity