import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


//Import icons
import { ListFilter, ChevronDown, ChevronUp } from 'lucide-react';

import { fetchSkills } from '../../data/skill';
import { fetchKeyword } from '../../data/keyword';
import { cityOptions } from '../../data/city';

function FilterBox(
  {
  selectedKeyword, 
  setSelectedKeyword,
  selectedSkills,
  setSelectedSkills,
  setMinExp,
  minExp,
  setMaxExp,
  maxExp,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  selectedCity,
  setSelectedCity,
  education,
  setEducation
  }) {
  const animatedComponents = makeAnimated();
  const [skills,setSkills] = useState([])
  const [keywords, setKeywords] = useState([])

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    keyword: true,
    skills: false,
    experience: false,
    salary: false,
    city: false,
    education: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
    setMinSalary('')
    setMaxSalary('')
  }


  return (
        <div
          className='p-4 shadow-sm rounded-xl flex flex-col gap-2 bg-white'
        >
          <div className='flex gap-2 mb-2 items-center'>
            <ListFilter></ListFilter>
            <h1 className='text-xl font-semibold'>Filter</h1>
          </div>
          <div className='flex flex-col gap-3'>
          
          {/* Keyword Section */}
          <div className='flex flex-col gap-1.5'>
             <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('keyword')}>
               <label className='text-sm font-semibold'>Keyword</label>
               {expandedSections.keyword ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             </div>
             {expandedSections.keyword && (
               <Select
                closeMenuOnSelect={true}
                components={customComponents}
                styles={customStyles}
                onChange={(keyword)=> setSelectedKeyword(keyword.map((item) => item.value))}
                isMulti
                options={keywords}
                value={keywords.filter(option => selectedKeyword.includes(option.value))}
                placeholder="Enter Keyword"
                />
             )}
          </div>

          {/* Skills Section */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('skills')}>
              <label className='text-sm font-semibold'>Skills</label>
              {expandedSections.skills ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.skills && (
              <Select
                closeMenuOnSelect={true}
                components={customComponents}
                styles={customStyles}
                onChange={(skill)=> setSelectedSkills(skill.map((item) => item.value))}
                isMulti
                options={skills}
                value={skills.filter(option => selectedSkills.includes(option.value))}
                placeholder="Enter Skills"
                />
            )}
          </div>

          {/* Experience Section */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('experience')}>
              <label className='text-sm font-semibold'>Experience</label>
              {expandedSections.experience ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.experience && (
              <div className='grid grid-cols-2 items-center gap-2'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium'>Min</label>
                  <input value={minExp} placeholder='1' className='px-1 py-0.5 border placeholder:text-[12px] rounded-md' type='number' onChange={(e)=>setMinExp(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium'>Max</label>
                  <input value={maxExp} placeholder='10' className='px-1 py-0.5 border placeholder:text-[12px] rounded-md' type='number' onChange={(e)=>setMaxExp(e.target.value)}></input>
                </div>
              </div>
            )}
          </div>

          {/* Salary Section */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('salary')}>
              <label className='text-sm font-semibold'>Salary</label>
              {expandedSections.salary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.salary && (
              <div className='grid grid-cols-2 items-center gap-2'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium'>Min</label>
                  <input value={minSalary} className='px-1 p-0.5 border placeholder:text-[12px] rounded-md' placeholder='200000' type='number' onChange={(e)=>setMinSalary(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium'>Max</label>
                  <input value={maxSalary} className='px-1 p-0.5 border placeholder:text-[12px] rounded-md' placeholder='500000' type='number' onChange={(e)=>setMaxSalary(e.target.value)}></input>
                </div>
              </div>
            )}
          </div>

          {/* City Section */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('city')}>
              <label className='text-sm font-semibold'>City</label>
              {expandedSections.city ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.city && (
              <Select
                closeMenuOnSelect={true}
                components={customComponents}
                styles={customStyles}
                onChange={(city)=> setSelectedCity(city.map((item) => item.value))}
                isMulti
                options={cityOptions}
                value={cityOptions.filter(option => selectedCity.includes(option.value))}
                placeholder="Enter City"
              />
            )}
          </div>

          {/* Education Section */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('education')}>
              <label className='text-sm font-semibold'>Education</label>
              {expandedSections.education ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections.education && (
              <select onChange={(e)=>setEducation(e.target.value)} className='p-1 border placeholder:text-[12px] rounded-md'>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            )}
          </div>

          </div>

          <div className='flex flex-col gap-1.5'></div>
         
          <div className='grid mt-2 grid-cols-2 items-center gap-4'>
             <button className='text-white py-1.5 px-2 bg-blue-400  hover:bg-blue-500 hover:shadow-lg transition-all duration-300 rounded-md'>
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
