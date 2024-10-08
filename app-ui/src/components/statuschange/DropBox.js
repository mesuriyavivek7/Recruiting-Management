import React from 'react'
import { useDrag } from 'react-dnd';
export default function DropBox({text}) {

  const getDate=(date)=>{
    let d=new Date(date)
    let d_ate=d.getDate()
    let d_month=d.getMonth()+1
    let d_year=d.getFullYear()
   
    return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { id:text.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacityVal=isDragging?50:1;
  return (
    <div ref={drag} className={`custom-div opacity-${opacityVal} gap-1`}>
      <div className='w-full flex gap-2'>
        <h1>{text.candidate_full_name}</h1>
        <span className='text-gray-400'>{text.candidate_id}</span>
      </div>
      <div className='w-full flex gap-1'>
        <span className='text-sm text-gray-400'>{text.job_title}</span>
        <span className='text-sm text-gray-400'>{text.job_id}</span>
      </div>
      <div className='w-full mt-0.5 flex justify-between'>
         <span className='text-sm text-gray-400'>{text.job_country}-{text.job_city}</span>
         <span className='text-sm text-gray-400'>{getDate(text.submited)}</span>
      </div>

    </div>
  )
}
