import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import Loader from '../../assets/loader.svg'
import Notification from '../Notification';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

//importing icons
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';


export default function ResumeUpload2({jobObj,parentFormData,candidateId,parentFormDataChange,submitPost,onPrev}) {
  const {user}=useContext(AuthContext)
  const [questions,setQuestions]=useState([])
  const [answer,setAnswer]=useState([])
  const [loader,setLoader]=useState(false)
  const [submit,setSubmit]=useState(false)
  const [submitLoader,setSubmitLoader]=useState(false)
  const [openPopUp,setOpenPopUp]=useState(false)
  const navigate=useNavigate()

  //custome box styling
  const boxStyle = {
    animation: 'colorChange 5s infinite',
  };

  useEffect(()=>{
    const getScreeningQue=async ()=>{
      try{
       setLoader(true)
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getcandidatescreeningque/${jobObj.job_id}`)
       console.log('data----->',res.data)
       setQuestions(res.data)
      }catch(err){
        //handle error here
        console.log(err)
      }
      setLoader(false)
    }
    getScreeningQue()
  },[])

  //for showing notification
  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
   setNotification({message,type})
  }

  useEffect(()=>{
    const tempans=questions.map((item,index)=>{
        let obj={id:index+1}
        if(item.ans_type==="multi_select") obj["answer"]=[]
        else obj["answer"]=""
        return obj
    })
    setAnswer(tempans)
  },[questions])

  const numberToLetter=(num)=>{
    return String.fromCharCode(65+num)
  }

  const handleAnswerChange=(id,value,ansType)=>{
     if(ansType==="short_text" || ansType==="single_select") setAnswer(prevData=>prevData.map(item=>item.id===id?{...item,answer:value}:item))
     else  setAnswer(prevData=>prevData.map(item=>item.id===id?{...item,answer:[...item.answer,value]}:item))
  }


  const handleParentFormDataChange=()=>{
      if(validate()){
        console.log("parent form data change")
         parentFormDataChange({
            candidate_id:candidateId,
            recruiting_id:user.recruiting_agency_id,
            screening_questions:questions,
            screening_answer:answer
         })
      }
  }

  const handleSubmitPost=async ()=>{
      setOpenPopUp(true)
      setSubmitLoader(true)
      const posted=await submitPost()
      if(posted) setSubmitLoader(false)
      else{
         setOpenPopUp(false)
         setSubmitLoader(false)
      }
  }

  useEffect(()=>{
      if(submit){
        console.log("submit button clicked")
        handleSubmitPost()
      }
      setSubmit(false)
  },[parentFormData])

  useEffect(()=>{
      if(submit) handleParentFormDataChange()
  },[submit])

  const handleNavigate=()=>{
     navigate('/recruiter/candidate')
  }


  const validate=()=>{
   if(answer.length>0){
    let index=0;
    for (let que of questions){
      if((que.ans_type==="short_text" || que.ans_type==="single_select") && que.madantory && answer[index].answer===""){
        showNotification(`Question${index+1} answer is required.`,'failure')
        return false
      }else if(que.ans_type==="short_text" && answer[index].answer.length>que.answer.short_text_length){
        showNotification(`Question${index+1} answer length must be less then ${que.answer.short_text_length} characters.`,'failure')
        return false
      }else if(que.ans_type==="multi_select" && answer[index].answer.length===0){
        showNotification(`Select any of one option of Question${index+1}`)
      }
      index++
    }
    return true
   }else{
    showNotification("There is no any questions to answer it.","warning")
    return false
   }

  }

  const getStyles=(ansType,index,option)=>{
     if(answer.length>0 && ansType==="single_select"){
        if(answer[index].answer===option) return "bg-blue-400 text-white"
     }else if(answer.length>0 && ansType==="multi_select"){
        if(answer[index].answer.includes(option)) return "bg-blue-400 text-white"
     }
     return ""
  }

  const handlePrev=()=>{
    onPrev()
  }

  console.log("answer--->",answer)

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}

    {openPopUp && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
      
      <div className='w-[500px] gap-4 flex flex-col items-center p-4 rounded-md bg-white'>
        <div style={boxStyle} className='w-[450px] flex justify-center items-center rounded-sm h-60 border animation-color-change'>
          {
            (submitLoader)?(<img src={Loader} className='h-28 w-28'></img>):(<CheckCircleOutlineOutlinedIcon style={{color:"white",fontSize:'6rem'}}></CheckCircleOutlineOutlinedIcon>)
          }
        </div>
         {
           (submitLoader)?(<span className='text-xl'>Candidate Post in Progress...</span>):(  <div className='flex flex-col gap-4'>
                  <span className='text-xl text-center'>Your Candidate Detail posted sucessfully.</span>
                  <p className='text-sm text-gray-400 text-center'>This Candidate details will be reviewed by your related Account manager typically within one business day.</p>
                  <button onClick={handleNavigate} className='text-white bg-blue-500 hover:bg-blue-400 transition-all px-1 py-2'>View Candidates</button>
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
    <div className='custom-div p-8 px-6'>
       <h4 className='text-2xl tracking-wide'>Screening Questions</h4>
       <div className='mt-8 w-full flex flex-col gap-8'>
           
          {
            (loader)?(
              <div className='my-6 flex justify-center place-content-centereter'>
                  <img className='w-10 h-10' src={Loader}></img>
               </div>
            ):(
              <>
              
              {
                questions.map((que,index)=>(

                  <div key={index} className='flex flex-col gap-3'>
                  <span className='text-[18px]'>Q{index+1}. {que.question_title} {que.madantory && <span className='text-red-400'>*</span>}</span>
                  {
                    que.ans_type==="short_text"?
                    (
                      <div className='flex flex-col gap-2'>
                        <textarea
                        onChange={(e)=>handleAnswerChange(index+1,e.target.value,que.ans_type)}
                        placeholder={`Max ${que.answer.short_text_length} Characters`}
                        className='input-field w-[500px]'
                        rows={1}
                        ></textarea>
                      </div>
                    ):(
                      <div className='flex flex-col gap-2'>
                      {
                        que.answer.option.map((item,cnt)=>(
                          <div key={cnt} onClick={()=>handleAnswerChange(index+1,item,que.ans_type)} className={`cursor-pointer ${getStyles(que.ans_type,index,item)}  hover:bg-blue-100 flex items-center gap-2 border rounded-md border-blue-300 p-2 w-fit`}>
                             <span className='text-[15px] border flex justify-center items-center rounded-md border-blue-300 h-6 w-6'>{numberToLetter(cnt)}</span>
                             <p className={`text-[14px] font-light ${(answer.length>0 && answer[index].answer===item)?"text-white":"text-gray-500"} `}>{item}</p>
                          </div>
                        ))
                      }
                      </div>

                    )
                  }
                  
               </div>
               
                ))
              }
              
               </>
            )
          } 
       </div>
       <div className='shadow rounded-md flex w-[1300px] place-content-end fixed bottom-0 bg-white px-6 py-2'>
          <div className='flex gap-2'>
            <button className='py-1 px-4 text-base hover:bg-slate-100 transition-all rounded-sm text-black'>Cancel</button>
            <button onClick={handlePrev} className='py-1 px-4 text-base hover:bg-slate-100 transition-all rounded-sm text-black'>Previous</button>
            <button onClick={()=>setSubmit(true)} className='py-1 px-4 text-base hover:bg-blue-400 bg-blue-500 rounded-sm text-white'>Submit</button>
          </div>
        </div>
    </div>
    </>
  )
}


