import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Loader from '../../assets/whiteloader.svg'
import Notification from '../Notification';

export default function ResumeUpload2({jobObj}) {
  const [questions,setQuestions]=useState([])
  const [answer,setAnswer]=useState([])
  const [loader,setLoader]=useState(false)
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

  const handleSingleAnswerChange=(id,updatedValue)=>{
     setAnswer(prevData=>prevData.map(item=>item.id===id?{...item,...updatedValue}:item))
  }

  const handleMultiAnswerChange=(id,value)=>{
    
  }

  const validate=()=>{

  }

  console.log("answer--->",answer)

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className='custom-div p-8 px-6'>
       <h4 className='text-2xl tracking-wide'>Screening Questions</h4>
       <div className='mt-4 w-full flex flex-col gap-8'>
           
          {
            (loader)?(
              <div className='my-6 flex justify-center place-content-centereter'>
                  <img className='w-10 h-10' src={Loader}></img>
               </div>
            ):(
              <>
              
              {
                questions.map((que,index)=>(

                  <div key={index} className='flex flex-col gap-4'>
                  <span className='text-[16px]'>Q{index+1}. {que.question_title} {que.madantory && <span className='text-red-400'>*</span>}</span>
                  {
                    que.ans_type==="short_text"?
                    (
                      <div className='flex flex-col gap-2'>
                        <textarea
                        onChange={(e)=>handleSingleAnswerChange(index+1,{answer:e.target.value})}
                        placeholder='Max 300 Characters'
                        className='input-field w-[500px]'
                        rows={1}
                        ></textarea>
                      </div>
                    ):(
                      <div className='flex flex-col gap-2'>
                      {
                        que.answer.option.map((item,cnt)=>(
                          <div key={cnt} onClick={()=>handleSingleAnswerChange(index+1,{answer:item})} className={`cursor-pointer ${(answer.length>0 && answer[index].answer===item) && "bg-blue-400 text-white"}  hover:bg-blue-100 flex items-center gap-2 border rounded-md border-blue-300 p-2 w-fit`}>
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
            <button className='py-1 px-4 text-base hover:bg-slate-100 transition-all rounded-sm text-black'>Previous</button>
            <button className='py-1 px-4 text-base hover:bg-blue-400 bg-blue-500 rounded-sm text-white'>Submit</button>
          </div>
        </div>
    </div>
    </>
  )
}


