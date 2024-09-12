import React, { useState } from 'react'
//importing icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddIcon from '@mui/icons-material/Add';
import ScreeningQue from '../ScreeningQue';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function PostJobForm5({onPrev}) {
  const [questions,setQuestions]=useState([])

  const [openPopUp,setOpenPopUp]=useState(false)
  console.log("Questions----->",questions)
  
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

  const handleQuestionChange=(id,updatedValue)=>{
    setQuestions(prevData=>prevData.map(item=> item.id===id ? {...item,...updatedValue}:item))
  }
  
  const handleDeleteAll=()=>{
    setQuestions([])
    setOpenPopUp(false)
  }
  const handlePrev=()=>{
    onPrev()
  }
  return (
    <div className='flex justify-center'>
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
            <ScreeningQue questionValueChange={handleQuestionChange} id={item.id} type={item.type} addQuestion={handleAddQuestions} removeQuestion={handleRemoveQuestions}></ScreeningQue>
          ))
         }
       </div>
       <div className='custom-div py-3 flex-row justify-center gap-6'>
            <button onClick={()=>handleAddQuestions("general")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:"18px"}}></AddIcon> Add Question</button>
            <button onClick={()=>handleAddQuestions("candidate")} className='text-blue-400 font-light text-[16px] p-1 px-2 border rounded-sm hover:bg-blue-100 flex gap-2 place-items-center transition-all'><AddIcon style={{fontSize:'18px'}}></AddIcon> Add Candidate Info</button>
       </div>
     </div>
    </div>
  )
}
