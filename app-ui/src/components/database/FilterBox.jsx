import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


//Import icons
import { ListFilter } from 'lucide-react';

import { fetchSkills } from '../../data/skill';
import { fetchKeyword } from '../../data/keyword';

function FilterBox(
  {
  selectedKeyword, 
  setSelectedKeyword,
  selectedSkills,
  setSelectedSkills,
  setMinExp,
  minExp,
  setMaxExp,
  maxExp
  }) {
  const animatedComponents = makeAnimated();
  const [skills,setSkills] = useState([])
  const [keywords, setKeywords] = useState([])
  

  useEffect(()=>{
    const handleFetchSkills = async () =>{
      try{
        const data = await fetchSkills()
        setSkills(data)
      }catch(err){
        console.log(err)
      }
    }

    const handleFetchKeywords = async () =>{
      try{
        const data = await fetchKeyword()
        setKeywords(data)
      }catch(err){
        console.log(err)
      }
    }

    handleFetchSkills()
    handleFetchKeywords()
  },[])



  const customComponents = {
    ...animatedComponents,
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  };


  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#2563eb' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : 'none',
      '&:hover': {
        borderColor: '#2563eb',
      },
      minHeight: '32px',
      fontSize: '14px',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#0369a1',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#0369a1',
      ':hover': {
        backgroundColor: '#bae6fd',
        color: '#0c4a6e',
      },
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '14px',
      color: '#9ca3af',
    }),
  };

  const handleReset = ()=>{
    setSelectedKeyword([])
    setSelectedSkills([])
    setMinExp('')
    setMaxExp('')
  }


  return (
        <div
          className='p-4 shadow-sm rounded-xl flex flex-col gap-2 bg-white'
        >
          <div className='flex gap-2 mb-2 items-center'>
            <ListFilter></ListFilter>
            <h1 className='text-xl font-semibold'>Filter</h1>
          </div>
          <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1.5'>
             <label className='text-sm font-medium'>Keyword</label>
             <Select
              closeMenuOnSelect={true}
              components={customComponents}
              styles={customStyles}
              onChange={(keyword)=> setSelectedKeyword(keyword.map((item) => item.value))}
              isMulti
              options={keywords}
              value={keywords.filter(option => selectedKeyword.includes(option.value))}
              placeholder="Enter Keyword"
              ></Select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium'>Skills</label>
            <Select
              closeMenuOnSelect={true}
              components={customComponents}
              styles={customStyles}
              onChange={(skill)=> setSelectedSkills(skill.map((item) => item.value))}
              isMulti
              options={skills}
              value={skills.filter(option => selectedSkills.includes(option.value))}
              placeholder="Enter Keyword"
              ></Select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium'>Min Exp</label>
            <input value={minExp} className='p-1 border placeholder:text-[14px]' placeholder='Enter Min Exp' type='number' onChange={(e)=>setMinExp(e.target.value)}></input>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium'>Max Exp</label>
            <input value={maxExp} className='p-1 border placeholder:text-[14px]' placeholder='Enter Man Exp' type='number' onChange={(e)=>setMaxExp(e.target.value)}></input>
          </div>

          </div>

          <div className='flex flex-col gap-1.5'></div>
         
          <div className='grid mt-2 grid-cols-2 items-center gap-4'>
             <button className='text-white py-1.5 px-2 bg-blue-400 hover:bg-blue-400 transition-all duration-300 rounded-md'>
                Apply
             </button>
             <button onClick={handleReset} className='text-blue-500 py-1.5 px-2 hover:bg-slate-100 transition-all duration-300 border border-blue-500 rounded-md'>
               Reset 
             </button>
          </div>
        </div>
    
  );
}

export default FilterBox;
