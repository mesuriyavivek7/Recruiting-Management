import React , {useState, useEffect} from 'react'
//importing icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddIcon from '@mui/icons-material/Add';
import ScreeningQue from '../ScreeningQue';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Notification from '../Notification';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



//importing icons
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { LoaderCircle } from 'lucide-react';



function PostJobForm5({onSubmit, onPrev, onFormDataChange, jobid, parentFormData}) {

  const {userData} = useSelector((state) => state.admin);

  const [questions,setQuestions]=useState(Object.keys(parentFormData.form5).length>0?parentFormData.form5.screening_questions:[])
  const [action,setAction]=useState(false)
  const [openPopUp,setOpenPopUp]=useState(false)
  const [openSubmitPopUp,setOpenSubmitPopUp]=useState(false)
  const [jobSubmitLoad,setJobSubmitLoad]=useState(false)
  const navigate=useNavigate()
  

   //for showing notification
   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
    setNotification({message,type})
   }


  useEffect(()=>{
    if(action && validate()) handleParentFormData()
    else setAction(false)
  },[action])

  useEffect(()=>{
    if(action) handleSubmit()
    setAction(false)
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
      for(let it of que.answer.option){
        if(it===""){
          return false
        }
      }
      return true
  }

  const handleParentFormData=()=>{
      onFormDataChange({
       enterprise_id:userData._id,
       job_id:jobid,
       screening_questions:questions
      })
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
    navigate('/account_manager/myjobs')
    setOpenSubmitPopUp(false)
  }

  const handleSubmit= async ()=>{
     setOpenSubmitPopUp(true)
     setJobSubmitLoad(true)
     const posted= await onSubmit()
     if(posted) setJobSubmitLoad(false)
     else{
       showNotification("Something went wrong while posting job.")
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
        <div className='w-[450px] border-b flex justify-center items-center rounded-sm h-36'>
          {
            (jobSubmitLoad)?(<LoaderCircle className='animate-spin w-20 h-20 text-blue-500'></LoaderCircle>):(<CheckCircleOutlineOutlinedIcon className='text-blue-500' style={{fontSize:'6rem'}}></CheckCircleOutlineOutlinedIcon>)
          }
        </div>
         {
           (jobSubmitLoad)?(<span className='text-xl'>Job Post in Progress...</span>):(  <div className='flex flex-col gap-4'>
                  <span className='text-xl text-center'>Your Job posted sucessfully.</span>
                  <button onClick={handleNavigate} className='text-white bg-blue-500 hover:bg-blue-400 transition-all px-1 py-2'>View Posted Jobs</button>
              </div>)
         }
      
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
            <ScreeningQue key={item.id} question={item} questionValueChange={handleQuestionChange} id={item.id} type={item.type} addQuestion={handleAddQuestions} removeQuestion={handleRemoveQuestions}></ScreeningQue>
          ))
         }
       </div>
       <div className='custom-div py-3 flex-row justify-center gap-6'>
            <button onClick={()=>handleAddQuestions("general")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:"18px"}}></AddIcon> Add Question</button>
            <button onClick={()=>handleAddQuestions("candidate")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:'18px'}}></AddIcon> Add Candidate Info</button>
       </div>
     </div>
     
    </div>
     <div className='shadow rounded-md flex w-[1300px] place-content-start fixed bottom-0 bg-white px-4 py-2'>
         <div className='flex gap-4'>
         
          <button 
           className="py-1.5 px-4 text-gray-400 hover:bg-gray-100 rounded-sm border"
           onClick={handlePrev}
          >previous</button>
          <button
            onClick={()=>setAction(true)}
            className="py-1.5 px-4 text-base bg-blue-600 rounded-sm text-white"
          >
            Post a Job
          </button>
         </div>
      </div>
    </div>
  )
}

export default PostJobForm5