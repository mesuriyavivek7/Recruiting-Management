import React from 'react'
import { useDrop } from 'react-dnd'; 
export default function DropSection({id,onDrop,children,sectionItem}) {
    const [, drop] = useDrop(() => ({
        accept: 'BOX',
        drop: (item) => onDrop(item, id),
    }));
  return (
    <div ref={drop} className='w-[350px] min-h-[550px] inline-block mr-4 bg-gray-200 rounded-t-md overflow-hidden'>
        <div className={`bg-${sectionItem.theme}-400 h-4 w-full`}></div>
        <div className='flex p-2 flex-col gap-2'>
          <div className='flex justify-between'>
              <h1>{sectionItem.title}</h1>
              <span>{sectionItem.count}</span>
          </div>
          <div className='flex mt-2 flex-col gap-2'>
             {children}
          </div>
        </div>
    </div>
  )
}
