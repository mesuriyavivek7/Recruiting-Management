import React, { useState } from 'react'

//importing icons
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BackupTableIcon from '@mui/icons-material/BackupTable';

//import dnd for drag and drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//importing components
import CandidateDataShow from '../../components/candidate/CandidateDataShow';
import DragDropContainer from '../../components/statuschange/DragDropContainer';

export default function Candidate() {
  const [dataView,setDataView]=useState('List')
  return (
    <div className='relative flex flex-col gap-2'>
        <div className='custom-div flex flex-row justify-between'>
          <div className='flex gap-4'>
             <h1>Candidates</h1>
             <div className='flex gap-2'>
                <span>0</span>
                <span className='text-gray-400'>Jobs</span>
             </div>
             <div className='flex gap-2'>
                <span>1</span>
                <span className='text-gray-400'>Candidates</span>
             </div>
          </div>
          <div className='flex gap-8'>
             <div onClick={()=>setDataView((prevView)=>(prevView==="Status")?("List"):("Status"))} className='flex cursor-pointer text-sm text-gray-800 items-center gap-2'>
                <span><MenuIcon></MenuIcon></span>
                {
                  (dataView==="List")?(<span>Switch To Status View</span>):(<span>Switch To List View</span>)
                }
             </div>
             <div className='flex cursor-pointer text-sm text-gray-800 items-center gap-2'>
                <span><AutoAwesomeIcon style={{color:"purple"}}></AutoAwesomeIcon></span>
                <span>Multiple Action</span>
             </div>
             <div className='flex cursor-pointer text-sm text-gray-800 items-center gap-2'>
                <span><BackupTableIcon></BackupTableIcon></span>
                <span>Export</span>
             </div>
          </div>
        </div>
        {
           (dataView==="List")?(
               <CandidateDataShow></CandidateDataShow>
           ):(
            <DndProvider backend={HTML5Backend}>
                  <DragDropContainer />
             </DndProvider>
           )
        }
    </div>
  )
}
