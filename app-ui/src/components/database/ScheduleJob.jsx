import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

//Importing icons
import { LoaderCircle, X } from 'lucide-react'

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { toast } from 'react-toastify';



function ScheduleJob({selectedCandidate, handleCloseSchedule}) {
  const {user} = useContext(AuthContext)
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate,setSelectedDate] = useState(new Date())
  const [selectedTime,setSelectedTime] = useState("12:00 AM")
  const [task,setTask] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(parseInt(hours) + 12);
    }

    return { hours: parseInt(hours), minutes: parseInt(minutes) };
  };

  const handleSubmit = async () =>{
      if(!task){
         setError('Task description is required.')
         return 
      }else{
        setError('')
      }
     
     try{
        const { hours, minutes } = convertTo24Hour(selectedTime);

        const scheduledDateTime = new Date(selectedDate);
        scheduledDateTime.setHours(hours);
        scheduledDateTime.setMinutes(minutes);
        scheduledDateTime.setSeconds(0);
        scheduledDateTime.setMilliseconds(0);

        const isoTime = scheduledDateTime.toISOString();

        

        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/task`,{
            candidate_id:selectedCandidate._id,
            candidate_name:selectedCandidate?.contact_details?.name,
            recruiter_id:user?._id,
            task_details:task,
            scheduledTime:isoTime
        })
        handleCloseSchedule()
        toast.success("Task scheduled successfully.")
     }catch(err){
        console.log(err)
        toast.error(err?.response?.data?.message || "Something went wrong.")
     }
  }



  return (
    <div className='bg-black/25 z-50 fixed inset-0 flex justify-center items-center'>
        <div className='p-4 w-[500px] rounded-md bg-white flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                     <h1 className='font-semibold text-lg'>Schedule a Reminder</h1>
                     <span className='text-sm text-gray-400'>Enter date, time and task description to schedule job.</span>
                </div>
                <X onClick={handleCloseSchedule} className='cursor-pointer'></X>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Date <span className='text-sm text-red-500'>*</span></label>
                    <input 
                    type='date' 
                    className='p-1.5 border border-neutral-300 rounded-md outline-none'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    ></input>
                </div>
                <div className='flex flex-col gap-1'>
                     <label>Time <span className='text-sm text-red-500'>*</span></label>
                     <TimePicker
                       className={"react-time-picker"}
                       onChange={setSelectedTime}
                       value={selectedTime}
                       disableClock
                       format="hh:mm a"
                       clearIcon={null}
                     ></TimePicker>
                </div>
                <div className='flex flex-col gap-1'>
                     <label>Task Description <span className='text-sm text-red-500'>*</span></label>
                     <div className='flex flex-col'>
                       <textarea value={task} onChange={(e)=>setTask(e.target.value)} rows={3} className='border resize-none p-1.5 rounded-md outline-none border-neutral-300'></textarea>
                       {error && <span className='text-sm text-red-500'>{error}</span>}
                     </div>
                </div>
            </div>
            <button onClick={handleSubmit} disabled={loading} className='text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center rounded-md font-medium transition-all duration-300 bg-blue-400 hover:bg-blue-500 p-2'>
                {
                    loading ? 
                    <LoaderCircle className='animate-spin'></LoaderCircle>
                    : "Submit"
                }
            </button>
        </div>
    </div>
  )
}

export default ScheduleJob