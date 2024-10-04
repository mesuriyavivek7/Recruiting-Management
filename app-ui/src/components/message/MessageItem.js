import React from 'react'

//importing icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function MessageItem({messages,currentUser}) {
  
  const isSender=messages.sender._id===currentUser._id


  const getTime=(dateStr)=>{
    const date = new Date(dateStr);

    // Format the date in Indian locale
    const formattedDate = date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short", 
      day: "numeric"
    });
    
    // Format the time in Indian locale
    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    
    // Combine the formatted date and time
    return `${formattedDate} ${formattedTime}`;
    
  }

  return (
    <div className={`${(isSender)?("text-right items-end"):("text-left")} flex flex-col m-1`}>
      <span className='hover:text-blue-500 font-semibold text-[15px]'>{isSender?"You":<span className='flex gap-1 items-center'><AccountCircleOutlinedIcon></AccountCircleOutlinedIcon> {messages.sender.full_name}</span>}</span>
      <div className={`p-3 max-w-3xl bg-blue-100 ${isSender?('bg-blue-100'):('bg-white border border-slate-200')} rounded-md mt-1`}>
        <p className='tracking-wide leading-6 text-[15px] text-left text-gray-500'>{messages.content}</p>
      </div>
      <span className='text-[13px] text-gray-400'>{getTime(messages.timestamp)}</span>
    </div>
  )
}
