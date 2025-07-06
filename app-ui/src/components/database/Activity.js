import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { LoaderCircle, X } from 'lucide-react'
import moment from 'moment'

function Activity({selectedCandidate,handleCloseActivity}) {
  const [activity,setActivity] = useState([])
  const [loading,setLoading] = useState(false)

  const handleFetchActivities = async () =>{
    setLoading(true)
    try{
        console.log(selectedCandidate)
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

  return (
    <div className='bg-black/25 z-50 fixed inset-0 flex justify-center items-center'>
        <div className='p-4 w-[500px] rounded-md bg-white flex flex-col gap-4'>
           <div className='flex justify-between items-center'>
             <h1 className='text-2xl font-medium'>{selectedCandidate?.contact_details?.name} Activities</h1>
             <X onClick={handleCloseActivity}></X>
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
                    <div key={index} className='flex flex-col'>
                       <div className="flex justify-start mb-2">
                            <div className="max-w-xs p-3 rounded-2xl rounded-bl-none bg-gray-200 text-black shadow-md">
                                {act.recruiter_name} seen {act.candidate_name} profile.
                            </div>
                         </div>
                        <span className='text-xs'>{moment(act.createdAt).format("hh:mm A, DD-MM-YYYY")}</span>
                    </div>
                ))
             )
           }
           </div>

        </div>
    </div>
  )
}

export default Activity