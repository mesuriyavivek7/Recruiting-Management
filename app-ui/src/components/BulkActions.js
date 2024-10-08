import React, { useContext, useEffect, useState } from "react";
import EmailPopup from "./EmailPopup";
import asset35 from "../assets/asset35.svg";
import axios from "axios";
import Notification from "./Notification";

import { AuthContext } from "../context/AuthContext";

//importing icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

//import Rocket
import Rocket from '../assets/rocket.gif'

const BulkActions = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [emails, setEmails] = useState([]);
  const {user}=useContext(AuthContext)
  const [candiadteMails,setCandidateMails]=useState([])
  const [loader,setLoader]=useState(false)
  const [acmanager,setAcManager]=useState(null)

  const fetchCandidateMails=async ()=>{
     try{
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/getthecandidatemails/${user._id}`)
        setCandidateMails(res.data)
     }catch(err){
      console.log(err)
     }
  }
  console.log(emails)

  const fetchAllotedAccountmanager=async ()=>{
      try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterprise/getacmanagermailandname/${user.enterprise_id}`)
           setAcManager(res.data)
      }catch(err){
         //handeling error here
         console.log(err)
      }
  }


    //for showing notification
    const [notification,setNotification]=useState(null)

    //for showing notification
    const showNotification=(message,type)=>{
     setNotification({message,type})
    }
  

  const handleSubmit=async ()=>{
    setLoader(true)
     try{
       await Promise.all(emails.map(async (item)=>{
          const formData=new FormData()
          formData.append('email',item.email)
          formData.append('subject',item.subject)
          formData.append('message',item.message)
          if(acmanager) formData.append('ac_name',acmanager.full_name)
          if(acmanager) formData.append('ac_email',acmanager.email)
          if(item.cc) formData.append('cc',item.cc)
          if(item.attachments) formData.append('attachments',item.attachments)

          //send mail request
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/bulkaction`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }})
       }))
       await fetchCandidateMails()
       setEmails([])
       setLoader(false)
       showNotification("Successfully mail sended to all candidates",'success')
     }catch(err){
       setLoader(false)
       showNotification("Something went wrong while senging mail to candidates.","failure")
       console.log(err)
     }
     
  }

  useEffect(()=>{
     fetchCandidateMails()
     fetchAllotedAccountmanager()
  },[])

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRemoveMail=(id)=>{
     setCandidateMails((prevData)=>[...prevData,emails[id].email])
     setEmails((prevData)=>prevData.filter(((item,index)=>index!==id)))
  }

  const handleAddEmail = (emailData) => {
    setCandidateMails((prevData)=>prevData.filter((item)=>!emailData.email.includes(item)))
    setEmails([...emails, emailData]);
    togglePopup();
  };

  return (
    <div className="custom-div">
      {
        loader && 
        <div className="fixed inset-0  bg-black z-50 bg-opacity-50 flex justify-center items-center">
         <div className="custom-div gap-4 w-[400px] items-center">
             <img className="w-32 h-36" src={Rocket}></img>
             <span>Wait for few seconds while we are sending mails...</span>
         </div>
       </div>
      }
      {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      <div className="w-full relative flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Send Messages</h2>
      </div>

      <div className="w-full relative flex space-x-4 mb-4 text-blue-600">
        <div className="border-b-2 border-blue-600 pb-1 cursor-pointer">
          Send Messages
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center mx-auto ">
          <img src={asset35} alt="No Emails" className="mb-4" /><button
            onClick={togglePopup}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Add Emails 
          </button> 
        </div>
      ) : (
        <div className="bg-white p-4 shadow w-full">
        
          {emails.map((email, index) => (
            <div key={index} className="mb-4 p-4 border border-white-200 bg-white rounded shadow">
            <div className="flex gap-2 mb-2">
              <span className="cursor-pointer text-blue-400"><EmailOutlinedIcon style={{fontSize:"1.7rem"}}></EmailOutlinedIcon></span>
              <span onClick={()=>handleRemoveMail(index)} className="cursor-pointer text-red-400"><DeleteOutlinedIcon style={{fontSize:'1.7rem'}}></DeleteOutlinedIcon></span>
            </div>
           <div className="flex mb-2 items-center">
             <span className="font-semibold scroll-smooth w-40 pr-4">Candidate Emails:</span>
             <div className="flex gap-2  overflow-x-auto items-center no-scrollbar">
                {
                  email.email.map((item,index)=>(<span key={index} className="bg-gray-200 p-1 px-2 rounded-sm">{item}</span>))
                }
             </div>
           </div>
           <div className="flex mb-2 gap-2 items-center">
             <span className="font-semibold">CC:</span>
             <span>{email.cc?(email.cc):("None")}</span>
           </div>
           <div className="flex mb-2 gap-2 items-center">
             <span className="font-semibold">Subject:</span>
             <span>{email.subject}</span>
           </div>
           <div className="flex mb-2 flex-col">
              <span className="font-semibold">Message:</span>
              <p className="text-gray-400 text-[15px]">{email.message}</p>
           </div>
           <div className="flex gap-2 items-center">
             <span className="font-semibold">Attachment:</span>
             <span className="text-blue-400">{email.attachments?(email.attachments.name):("No Files")}</span>
           </div>
          </div>
            
          ))}
          <button
            disabled={candiadteMails.length===0}
            onClick={togglePopup}
            className="bg-green-600 mr-2 text-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-green-300 rounded mt-4"
          >
           Add More Emails
          </button> 
          <button onClick={handleSubmit} className="bg-blue-400 text-white px-4 py-2 rounded mt-4">Send</button>
        </div>
      )}

      {showPopup && (
        <EmailPopup onClose={togglePopup} setCandidateMails={setCandidateMails} candiadteMails={candiadteMails} onSubmit={handleAddEmail} />
      )}
    </div>
  );
};

export default BulkActions;
