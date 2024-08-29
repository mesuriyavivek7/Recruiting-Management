import React from 'react'
import { useDrag } from 'react-dnd';
export default function DropBox({text}) {

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
        <h1>{text.cname}</h1>
        <span className='text-gray-400'>{text.cid}</span>
      </div>
      <div className='w-full flex gap-1'>
        <span className='text-sm text-gray-400'>{text.jobname}</span>
        <span className='text-sm text-gray-400'>{text.jobid}</span>
      </div>
      <div className='w-full mt-0.5 flex justify-between'>
         <span className='text-sm text-gray-400'>{text.jobcountry}-{text.jobtype}</span>
         <span className='text-sm text-gray-400'>{text.date}</span>
      </div>

    </div>
  )
}
