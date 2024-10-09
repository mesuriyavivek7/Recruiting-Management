import React, { useContext, useState } from 'react'
import { MessageContext } from '../../context/MessageContext'

//importing icons
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


export default function SendMessage() {

  const {selectedUser,sendMessage,sendLoader}=useContext(MessageContext)
  
  const [content,setContent]=useState('')

  const handleSubmit=(e)=>{
      e.preventDefault()
      if(content.trim()==='') return 
      console.log(selectedUser.id)

      console.log(selectedUser)
      
      
      sendMessage(selectedUser.id,selectedUser.candidate_id,content)
      setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className='relative p-1'>
      <textarea
      className='input-field h-[6.4rem] resize-none outline-none'
      placeholder='Type Your Message here...'
      value={content}
      onChange={(e)=>setContent(e.target.value)}
      ></textarea>
      <button type='submit' disabled={content==='' || sendLoader} className={`absolute w-36 flex items-center gap-1 ${content && "hover:bg-blue-500"} p-2 text-[14px] transition-all disabled:bg-gray-400 disabled:cursor-no-drop bg-blue-400 text-white rounded-md top-[55%] right-2`}>
        {
           sendLoader?(
              <div className='flex w-full justify-center items-center'>
                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
              </svg>
        </div>
           ):(
            <div className='flex gap-2 items-center'>
              <span><SendOutlinedIcon></SendOutlinedIcon></span>
              Send Message
            </div>
           )
        }
        

      </button>
    </form>
  )
}
