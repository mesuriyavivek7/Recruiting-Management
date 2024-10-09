import React from 'react'

export default function RecruiterBox({text}) {
    const getDate=(date)=>{
        let d=new Date(date)
        let d_ate=d.getDate()
        let d_month=d.getMonth()+1
        let d_year=d.getFullYear()
       
        return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
      }
    

  return (
    <div className={`custom-div gap-1`}>
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
