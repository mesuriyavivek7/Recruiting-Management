import React, { useContext, useEffect, useRef } from 'react'
import { MessageContext } from '../../context/MessageContext'
import MessageItem from './MessageItem'
import SendMessage from './SendMessage'
import { AuthContext } from '../../context/AuthContext'

//importing icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


//importing loader
import Loader from '../../assets/creamLoader.svg'

export default function ChatWindow() {
    const {messages,selectedUser,loading}=useContext(MessageContext)
    const {user}=useContext(AuthContext)
    const chatEndRef=useRef(null)
      
    const scrollToBottom=()=>{
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(()=>{
       scrollToBottom()
    },[messages])

  return (
    <div className='w-full'>
        <div className='bg-blue-500 flex justify-between  px-2 pb-1 pt-5'>
            <div className='flex gap-2 items-center'>
                <span className='text-white'><AccountCircleOutlinedIcon></AccountCircleOutlinedIcon></span>
               <h2 className='text-white'>{selectedUser.full_name}</h2>
            </div>
            <span className='text-gray-200'>{selectedUser.candidate_full_name} - {selectedUser.candidate_id}</span>
            <span className='text-gray-200'>{selectedUser.job_title} - {selectedUser.job_id}</span>
        </div>
        <div className='bg-white-600 scroll-smooth overflow-y-auto h-[530px] p-4'>
            {
                loading?(
                 <div className='flex justify-center items-center h-full'>
                     <img src={Loader} className='w-10 h-10 '></img>
                 </div>
                ):(
                <div className='flex flex-col relative gap-5 pt-20'>
                    <div className='absolute flex flex-col items-center top-2 left-[35%]'>
                        <h2 className='text-xl font-semibold text-gray-500'>Chat For Candidate</h2>
                        <span>{selectedUser.candidate_full_name} - {selectedUser.candidate_id}</span>
                    </div>
                    {messages.map((msg,index)=>(
                        <MessageItem key={index} messages={msg} currentUser={user}></MessageItem>
                    ))}
                    <div ref={chatEndRef}></div>
                </div>
                )
            }
        </div>
        <div>
        <SendMessage></SendMessage>
        </div>  
    </div>
  )
}
