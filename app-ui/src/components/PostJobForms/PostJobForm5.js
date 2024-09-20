import React, { useContext, useEffect, useState } from 'react'
//importing icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddIcon from '@mui/icons-material/Add';
import ScreeningQue from '../ScreeningQue';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Notification from '../Notification';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

//importing loader
import Loader from '../../assets/loader.svg'

//importing icons
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function PostJobForm5({onPrev,onSubmit,onFormDataChange,jobid,handleDraftSave,parentFormData}) {
  const {user}=useContext(AuthContext)
  const [questions,setQuestions]=useState([])
  const [action,setAction]=useState({post:false,draft:false})
  const [openPopUp,setOpenPopUp]=useState(false)
  const [openSubmitPopUp,setOpenSubmitPopUp]=useState(false)
  const [jobSubmitLoad,setJobSubmitLoad]=useState(false)
  const navigate=useNavigate()

  //custome box stiling
  const boxStyle = {
    animation: 'colorChange 5s infinite',
  };
  

   //for showing notification
   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
    setNotification({message,type})
   }


  useEffect(()=>{
    if(action.post===true || action.draft===true) handleParentFormData()
  },[action])

  useEffect(()=>{
    if(action.post===true) handleSubmit()
    else if(action.draft===true) handleDraft()
    setAction({post:false,draft:false})
  },[parentFormData])

  const handleAddQuestions=(type)=>{
     setQuestions((prevData)=>[...prevData,{id:prevData.length+1,question_title:"",type,ans_type:"single_select",madantory:true,answer:{option:["Yes","No"]}}])
  }
  const handleRemoveQuestions=(id)=>{
    let newdata=questions.filter((item)=>item.id!==id)
    let cnt=1
    for(let i of newdata){
      i["id"]=cnt
      cnt++
    }
    setQuestions(newdata)
  }

  const checkValidOptions=(que)=>{
      console.log(que)
      console.log(que.answer.option)
      for(let it of que.answer.option){
        if(it===""){
          return false
        }
      }
      return true
  }

  const handleParentFormData=()=>{
    if(validate()){
      onFormDataChange({
       enterprise_id:user.enterprise_id,
       job_id:jobid,
       screening_questions:questions
      })
    }
  }

  const handleDraft=async ()=>{
    const saved=await handleDraftSave()
    if(saved) showNotification("Job Draft Saved Sucessfully","success")
    else showNotification("There is somthing wrong in saving draft...!","failure")
  }

  const validate=()=>{
    for(let que of questions){
      if(que.question_title===""){
        showNotification(`Please add question title of Question ${que.id}`,'warning')
        return false;
      }else if((que.ans_type==="single_select" || que.ans_type==="multi_select") && !checkValidOptions(que)){
        showNotification(`Please add options value of Question ${que.id}`,'warning')
        return false;
      }else if(que.ans_type==="short_text" && que.answer.short_text_length===""){
        showNotification(`Please fill out short text length of Question ${que.id}`,`warning`)
        return false;
      }
    }
    return true
  }

  const handleQuestionChange=(id,updatedValue)=>{
    setQuestions(prevData=>prevData.map(item=> item.id===id ? {...item,...updatedValue}:item))
  }
  
  const handleDeleteAll=()=>{
    setQuestions([])
    setOpenPopUp(false)
  }
  
  const handleNavigate=()=>{
    navigate('/employer/jobposting/landing')
    setOpenSubmitPopUp(false)
  }

  const handleSubmit= async ()=>{
     setOpenSubmitPopUp(true)
     setJobSubmitLoad(true)
     const posted= await onSubmit()
     if(posted) setJobSubmitLoad(false)
     else{
       setOpenSubmitPopUp(false)
       setJobSubmitLoad(false)
     }
  }

  const handlePrev=()=>{
    onPrev()
  }
  return (
    <div>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className='flex justify-center pb-12'>
    
    {openSubmitPopUp && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
      
      <div className='w-[500px] gap-4 flex flex-col items-center p-4 rounded-md bg-white'>
        <div style={boxStyle} className='w-[450px] flex justify-center items-center rounded-sm h-60 border animation-color-change'>
          {
            (jobSubmitLoad)?(<img src={Loader} className='h-28 w-28'></img>):(<CheckCircleOutlineOutlinedIcon style={{color:"white",fontSize:'6rem'}}></CheckCircleOutlineOutlinedIcon>)
          }
        </div>
         {
           (jobSubmitLoad)?(<span className='text-xl'>Job Post in Progress...</span>):(  <div className='flex flex-col gap-4'>
                  <span className='text-xl'>Your Job posted sucessfully</span>
                  <p>This Job details will be reviewed by your related Account manager typically within one business day.</p>
                  <button onClick={handleNavigate} className='text-white bg-blue-500 hover:bg-blue-400 transition-all px-1 py-2'>View Posted Jobs</button>
              </div>)
         }
      
        <style>{`
        @keyframes colorChange {
          0%, 100% { background-color: #4F75FF; }  
          25% { background-color: #00CCDD; }       
          50% { background-color: #378CE7; }       
          75% { background-color: #96E9C6; }     
        }
      `}</style>
      </div>
     </div>
    }
      
    
     {
      openPopUp && ( <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='bg-white flex flex-col gap-4 p-2 shadow rounded-md overflow-hidden border w-[400px]'>
          <div className='flex place-items-center'>
            <span onClick={()=>setOpenPopUp(false)}><ChevronLeftIcon></ChevronLeftIcon></span>
            Confirmation
          </div>
          <p className='text-gray-500 text-[15px]'>Are you sure you want to delete all the questions?</p>
          <div className='mt-2 flex w-full place-content-end'>
            <div className='flex place-items-center gap-3'>
              <button onClick={()=>setOpenPopUp(false)} className='rounded-md border border-red-500 text-red-500 px-2 py-1'>Cancel</button>
              <button onClick={()=>handleDeleteAll()} className='rounded-md bg-red-500 text-sm text-white px-2 py-2'>Delet Screening Questions</button>
            </div>
          </div>
        </div>
      </div>)
     }
      <div className='flex flex-col gap-1'>
       <div className='custom-div py-3 w-[900px] flex-row justify-between'>
          <h1 className='text-xl'>Screening Questions</h1>
          <div className='flex gap-2'>
              <div onClick={()=>setOpenPopUp(true)} className='flex hover:bg-slate-200 justify-center place-items-center py-1 px-2 border rounded-md'>
                 <DeleteOutlineOutlinedIcon style={{color:"#575757",fontSize:'1.2rem'}}></DeleteOutlineOutlinedIcon>
              </div>
              <div className='flex hover:bg-slate-200 justify-center place-items-center py-1 px-2 border rounded-md'>
                <RemoveRedEyeOutlinedIcon style={{color:"#575757",fontSize:'1.2rem'}}></RemoveRedEyeOutlinedIcon>
              </div>
          </div>
       </div>
       <div className='flex flex-col gap-2'>
         {
          questions.map((item)=>(
            <ScreeningQue key={item.id} questionValueChange={handleQuestionChange} id={item.id} type={item.type} addQuestion={handleAddQuestions} removeQuestion={handleRemoveQuestions}></ScreeningQue>
          ))
         }
       </div>
       <div className='custom-div py-3 flex-row justify-center gap-6'>
            <button onClick={()=>handleAddQuestions("general")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:"18px"}}></AddIcon> Add Question</button>
            <button onClick={()=>handleAddQuestions("candidate")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:'18px'}}></AddIcon> Add Candidate Info</button>
       </div>
     </div>
     
    </div>
     <div className='shadow rounded-md flex w-[1300px] place-content-end fixed bottom-0 bg-white px-4 py-2'>
         <div className='flex gap-4'>
         <button 
             onClick={()=>setAction({post:false,draft:true})}
             className="text-gray-400 py-1 px-4 border-gray-200 hover:bg-gray-100 border-2">
             Save As Draft</button>
          <button 
           className="py-1 px-4 text-gray-400 hover:bg-gray-100 rounded-sm border"
           onClick={handlePrev}
          >previous</button>
          <button
            onClick={()=>setAction({post:true,draft:false})}
            className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white"
          >
            Post a Job
          </button>
         </div>
      </div>
    </div>
  )
}
