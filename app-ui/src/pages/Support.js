import React, { useEffect, useState } from 'react'
import axios from 'axios'

//import images
import asset36 from '../assets/asset36.jpg'
import asset37 from '../assets/asset37.jpg'

import Notification from '../components/Notification';

//importing icons
import EmailIcon from '@mui/icons-material/Email';

export default function Support() {

   const [support,setSupport] = useState([])

   const handleFetchSupport = async () =>{
       try{
          const support = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/support/enterprise`)
          if(support.data) setSupport(support.data)
       }catch(err){
          console.log(err)
          showNotification("Something went wrong while fetching data.",'failure')
       }
   }


   useEffect(()=>{
       handleFetchSupport()
   },[])


  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
   setNotification({message,type})
  }

  return (
    <div className='flex flex-col gap-2'>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
     <h1 className='text-xl font-bold'>Support</h1>


     {
        support.map((item,index)=>(

         <div key={index} className='flex mb-1 flex-col'>
          <h1 className='text-black text-xl'>{item.support_type==="technical"?"Technical Support":"Business Support"}</h1>
          <p className='text-sm text-gray-500'>{item.support_desc}</p>
         
         <div className='flex w-full justify-between border p-1 pr-10 rounded-md pt-2 mt-2'>
            <div className='flex gap-8 pl-2'>
             <img className='w-12 h-12 rounded-full ' src={item.profile_picture}></img>
             <div className='flex flex-col '>
               <h2 className=''>{item.name}</h2>
               <a href={`mailto:${item.email}`} className='text-sm text-gray-500'>{item.email}</a>
             </div>
            </div>
            <div className='flex-col flex gap-2'>
             
               <a href={`mailto:${item.email}`} className='flex gap-4  pt-4'>
                  <EmailIcon style={{fontSize:'1.2rem',color:'#575757'}}></EmailIcon>
               </a>
            </div>
         </div>
     </div>
           
        ))
     }
    </div>
  )
}
