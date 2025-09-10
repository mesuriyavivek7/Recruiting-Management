import React, {useState} from 'react'

//Importing icons
import { FileStack } from 'lucide-react';
import { ListPlus } from 'lucide-react';

import ManuallAdd from '../../components/database/ManuallAdd';
import MultiAdd from '../../components/database/MultiAdd';

function AddCandidate() {

  const [activeTab,setActiveTab] = useState('manually')

  return (
    <div className='px-7 transition- pt-7 flex flex-col gap-4'>
    <div className=''>
        <h1 className='text-3xl tracking-wide text-blue-600 font-bold'>Add Candidates</h1>
    </div>
    <div className='flex flex-col w-full h-full gap-4 items-start'> 
            <div className='bg-white w-5/6 p-1.5 overflow-hidden relative rounded-md'>
                <div className='relative grid grid-cols-2 items-center'>
                <div
                 className={`absolute top-0 h-full left-0 bottom-2 border border-neutral-300 w-1/2 bg-gray-400/20 rounded-md transition-all duration-300 ease-in-out z-0`}
                 style={{
                   transform: activeTab === 'ai' ? 'translateX(100%)' : 'translateX(0%)'
                 }}
                />
                <button onClick={()=>setActiveTab("manually")} className='relative z-10 flex rounded-l-md p-2 justify-center items-center gap-2.5'>
                   <ListPlus></ListPlus>
                   <span className='font-medium'>Add Manually</span>
                </button>
                <button onClick={()=>setActiveTab("ai")} className={`relative z-10 flex rounded-r-md p-2 justify-center items-center gap-2.5`}>
                   <FileStack></FileStack>
                   <span className='font-medium'>Add Multiple</span>
                </button>
                </div>
            </div>
            {
              activeTab==="manually"?
              <ManuallAdd></ManuallAdd>:
              <MultiAdd></MultiAdd>
            }       
         
      </div>
    </div>
  )
}

export default AddCandidate