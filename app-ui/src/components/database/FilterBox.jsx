import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { fetchSkills } from '../../data/skill';

import RangeSlider from '../RangeSlider';

function FilterBox({ setOpenFilterBox }) {

  const [skills,setSkills] = useState([])

  useEffect(()=>{
    const handleFetchSkills = async () =>{
      try{
        const data = await fetchSkills()
        setSkills(data)
      }catch(err){
        console.log(err)
      }
    }
    handleFetchSkills()
  },[])

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full bg-black/40 z-40 fixed inset-0 flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className='w-2/6 p-6 rounded-xl flex flex-col gap-2 bg-white'
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Filter Candidates</h1>
            <button onClick={() => setOpenFilterBox(false)}>
              <X />
            </button>
          </div>
          <div className='flex flex-col gap-3 mt-5'>
            <RangeSlider min={0} steps={10000} max={500000} range={''} label={'Salary Range (LPA)'} mark={'₹'} />
            <RangeSlider min={0} steps={1} max={20} range={'Years'} label={'Experience (Years)'} mark={''} />
            <div className='flex flex-col gap-1'>
               <label className='font-medium'>Skills</label>
               <div className='w-full h-52 overflow-scroll'>
               {
                skills.map((item,index)=> (
                  <div key={index} className='flex items-center gap-2'>
                     <input type='checkbox'></input>
                     <span>{item.value}</span>
                  </div>
                ))
               }
               </div>
            </div>
          </div>
          <div className='grid mt-2 grid-cols-2 items-center gap-4'>
             <button className='text-white p-2 bg-blue-400 hover:bg-blue-400 transition-all duration-300 rounded-md'>
                Apply Filters
             </button>
             <button className='text-blue-500 p-2 hover:bg-slate-100 transition-all duration-300 border border-blue-500 rounded-md'>
               Reset 
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FilterBox;
