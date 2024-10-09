import React, { useContext } from 'react'
import ChatWindow from './ChatWindow';

//importing icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

//importing images
import NoMessages from '../../assets/no-notification.gif'
import Messages from '../../assets/idle-landing.svg'
import { MessageContext } from '../../context/MessageContext';

export default function Message({setOpenMessageBox}) {
  const {users,selectedUser,selectUserToChat}=useContext(MessageContext)
  return (
    <div className='fixed inset-0 p-6 flex justify-center bg-black z-50 bg-opacity-40 backdrop-blur-md items-center'>
        <div className='w-full h-[680px] flex gap-3'>
           <div className='w-[400px] bg-white p-2 rounded-md'>
              <div className='flex justify-between'>
                 <h2 className='text-xl font-medium text-gray-800'>C-Talk Notification</h2>
                 <div className='flex gap-2'>
                     <span className='cursor-pointer text-gray-400 hover:text-blue-400'><SearchOutlinedIcon></SearchOutlinedIcon></span>
                     <span onClick={()=>setOpenMessageBox(false)}  className='cursor-pointer text-gray-400 hover:text-red-500'><CloseOutlinedIcon></CloseOutlinedIcon></span>
                 </div>
              </div>
              <div className='flex mt-2 flex-col gap-1'>
                <span className='text-blue-400 font-semibold'>Resume Chat</span>
                <hr></hr>
              </div>
              <div className='h-[600px] pt-2'>
                 {
                  users.length===0?(<div className='flex h-full justify-center items-center'>
                    <div className='flex items-center flex-col gap-1'>
                      <img className='h-72 w-64 mb-2' src={NoMessages}></img>
                      <span className='text-[20px] font-semibold text-gray-500'>No new notification</span>
                      <p className='text-center w-72 text-[13px] font-medium'>You’re all caught up. We will notify you
                      when there is something new</p>
                    </div>
                 </div>):(
                     users.map((user,index)=>(
                      <div key={index} onClick={()=>selectUserToChat(user)} className='flex border mt-2 hover:bg-gray-50 cursor-pointer justify-between items-center p-2'>
                          <div className='flex gap-2 items-center'>
                              <span className='h-8 w-8 flex justify-center items-center rounded-full bg-blue-400 text-white'><EmailOutlinedIcon></EmailOutlinedIcon></span>
                              <h2>{user.full_name}</h2>
                          </div>
                          <div className='flex flex-col items-center text-[13px] leading-4'>
                              <span className='text-gray-500'>Candiadte</span>
                              <span>{user.candidate_full_name}</span>
                          </div>
                          <span className='text-gray-500'><MessageOutlinedIcon></MessageOutlinedIcon></span>
                      </div>
                     ))
                 )
                 }
                 
              </div>
           </div>
           <div className='bg-white grow overflow-hidden rounded-md'>
             {
              selectedUser?(
                <ChatWindow></ChatWindow>
              ):(
                <div className='flex justify-center items-center h-full '>
                 <div className='flex flex-col gap-2 items-center'>
                   <img className='w-[380px] h-[300px] ' src={Messages}></img>
                   <p className='text-center w-72 text-[14px] font-medium'>Select a notification from the cards on
                   the left to preview here</p>
                 </div>
             </div>
                
              )
             }
             
           </div>
        </div>
    </div>
  )
}
