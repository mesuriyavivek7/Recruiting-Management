import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

//Importing data
import { fetchKeyword } from '../../data/keyword';
import { city, cityOptions } from '../../data/city';
import { fetchSkills } from '../../data/skill'

//Importing icons
import { ChevronDown, Minus, Plus, Search } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';
import { toast } from 'react-toastify';


function ManuallSearch({manuallRecentFilledSearch,handleManuallSearchCandidate}) {
  const animatedComponents = makeAnimated();
  const [miniOpen,setMiniOpen] = useState(false)
  const [maxOpen,setMaxOpen] = useState(false)
  const [skills,setSkills] = useState([])
  const [keywords,setKeywords] = useState([])

  const [keySuggestLoader,setKeySuggestLoader] = useState(false)
  const [keySuggetions,setKeySuggetion] = useState([])
  const [openKeywordSuggetion,setOpenKeywordSuggetion] = useState(false)

  const [skillSuggestLoader,setSkillSuggestLoader] = useState([])
  const [skillSuggetion,setSkillSuggetion] = useState([])
  const [openSkillSuggetion,setOpenSkillSuggetion] = useState(false)

  //Selected state
  const [selectedKeyword,setSelectedKeyword] = useState([])
  const [selectedSkill,setSelectedSkill] = useState([])
  const [selectedCity,setSelectedCity] = useState([])

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


  useEffect(()=>{
    const fetchKeywordSuggetion = async () =>{
      setOpenKeywordSuggetion(true)
      try{
        setKeySuggestLoader(true)
        const response = await axios.get(`${process.env.REACT_APP_AI_URL}/autocomplete/job_titles/?prefix=${selectedKeyword[selectedKeyword.length-1]}&limit=5`)
        setKeySuggetion(response.data)
        if(response.data.length===0){
          setOpenKeywordSuggetion(false)
        }
      }catch(err){
        setOpenKeywordSuggetion(false)
        console.log(err)
      }finally{
        setKeySuggestLoader(false)
      }
    }

    if(selectedKeyword.length>0){
      fetchKeywordSuggetion()
    }else{
      setOpenKeywordSuggetion(false)
      setKeySuggetion([])
    }

  },[selectedKeyword])

  const addSuggestedKeyword = (item) => {
    if(!selectedKeyword.includes(item)){
      setSelectedKeyword(prev => [...prev,item])
    }
  }

  useEffect(()=>{
    const fetchSkillSuggetion = async () =>{
      setOpenSkillSuggetion(true)
      try{
        setSkillSuggestLoader(true)
        const response = await axios.get(`${process.env.REACT_APP_AI_URL}/autocomplete/job_skillsv1/?prefix=${selectedSkill[selectedSkill.length-1]}&limit=5`)
        setSkillSuggetion(response.data)
        if(response.data.length===0){
         setOpenSkillSuggetion(false)
        }
      }catch(err){
        setOpenSkillSuggetion(false)
        console.log(err)
      }finally{
        setSkillSuggestLoader(false)
      }
    }

    if(selectedSkill.length > 0){
      fetchSkillSuggetion()
    }else{
      setOpenSkillSuggetion(false)
      setSkillSuggetion([])
    }
  },[selectedSkill])

  const addSuggestedSkills = (item) =>{
     if(!selectedSkill.includes(item)) {
      setSelectedSkill(prev => [...prev,item])
     }
  }

  let minExpData = ['0 Months','3 Months','6 Months','1 Year','2 Years','3 Years','4 Years','5 Years']
  let maxExpData = ['0 Months','3 Months','6 Months','1 Year','2 Years','3 Years','4 Years','5 Years','6 Year']
  let education = ['10th Pass','12th Pass','ITI','Diploma','Graduate','Post Graduate']
  const [selectedEducation,setSelectedEducation] = useState([])

  const handleSelectEducation = (item) =>{
      if(selectedEducation.includes(item)){
        setSelectedEducation((prev) => prev.filter((i)=>i!==item))
      }else{
        setSelectedEducation((prev)=>[...prev,item])
      }
  }

  const isSelectedEducation = (item) =>{
      if(selectedEducation.includes(item)) return true
      else return false
  }

  const [minExp,setMinExp] = useState('')
  const [maxExp,setMaxExp] = useState('') 

  const minRef = useRef()
  const maxRef = useRef()

  useEffect(()=>{
    const handleClickOutSide = (e) =>{
      if(minRef.current && !minRef.current.contains(e.target)){
        setMiniOpen(false)
      }
 
      if(maxRef.current && !maxRef.current.contains(e.target)){
        setMaxOpen(false)
      }

      if(minSalaryRef.current && !minSalaryRef.current.contains(e.target)){
        setMinSalaryOpen(false)
      }

      if(maxSalaryRef.current && !maxSalaryRef.current.contains(e.target)){
        setMaxSalaryOpen(false)
      }

    }

    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  },[])


  const handleSelectMinExp = (item) =>{
    setMinExp(item)
    setMiniOpen(false)
  }

  const handleSelectMaxExp = (item) =>{
    setMaxExp(item)
    setMaxOpen(false)
  }

  let minSalaryData = []
  let maxSalaryData = []

  for (let i=0;i<=100;i+=.5){
    minSalaryData.push({title:`${i} Lakh`,value:i})
    maxSalaryData.push({title:`${i} Lakh`,value:i})
  }

  const [minSalary,setMinSalary] = useState('')
  const [maxSalary,setMaxSalary] = useState('') 

  const minSalaryRef = useRef()
  const maxSalaryRef = useRef()

  const [minSalaryOpen,setMinSalaryOpen] = useState(false)
  const [maxSalaryOpen,setMaxSalaryOpen] = useState(false)

  const handleSelectMinSalary = (item) =>{
     setMinSalary(item)
     setMinSalaryOpen(false)
  }

  const handleSelectMaxSalary = (item) =>{
    setMaxSalary(item)
    setMaxSalaryOpen(false)
  }

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
      minHeight: '40px',
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


  const handleReset = () =>{
    setSelectedEducation([])
    setMinExp('')
    setMaxExp('')
    setSelectedKeyword([])
    setSelectedCity([])
    setSelectedSkill([])
    setMinSalary('')
    setMaxSalary('')
  }

  const handleSearchCandidate = () =>{
      if(selectedKeyword.length === 0) return toast.error('Please enter at least one keyword.')
      if(!minSalary || !maxSalary) handleManuallSearchCandidate(selectedKeyword,selectedSkill,minExp,maxExp,selectedEducation,selectedCity,0,10)
      handleManuallSearchCandidate(selectedKeyword,selectedSkill,minExp,maxExp,selectedEducation,selectedCity,minSalary,maxSalary)
  }


  useEffect(()=>{
    if(Object.keys(manuallRecentFilledSearch).length>0){
        setSelectedKeyword(manuallRecentFilledSearch.experience_titles)
        setSelectedCity(manuallRecentFilledSearch.locations)
        setMaxExp(manuallRecentFilledSearch.max_experience)
        setMinExp(manuallRecentFilledSearch.min_experience)
        setMinSalary(manuallRecentFilledSearch.min_salary)
        setMaxSalary(manuallRecentFilledSearch.max_salary)
        setSelectedEducation(manuallRecentFilledSearch.min_education)
        setSelectedSkill(manuallRecentFilledSearch.skills)
    }
  },[manuallRecentFilledSearch])

  return (
    <div className='flex bg-white flex-col overflow-hidden rounded-md border custom-shadow-1 border-neutral-300'>
       <div className='p-4 grid grid-cols-2 gap-6 items-center'>
          <div className='col-span-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <label className='tracking-wide font-semibold'>Keywords <span className='text-sm text-red-500'>*</span></label>
              {selectedKeyword.length > 0 && (
                <button
                  onClick={() => setSelectedKeyword([])}
                  className='text-sm text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors'
                >
                  Clear All
                </button>
              )}
            </div>
            <CreatableSelect
            closeMenuOnSelect={true}
            components={customComponents}
            styles={customStyles}
            onChange={(keyword)=> setSelectedKeyword(keyword.map((item) => item.value))}
            onCreateOption={(inputValue) => {
              const newKeyword = {
                value: inputValue,
                label: inputValue
              };
              setKeywords(prev => [...prev, newKeyword]);
              setSelectedKeyword(prev => [...prev, inputValue]);
            }}
            isMulti
            options={keywords}
            value={keywords.filter(option => selectedKeyword.includes(option.value))}
            placeholder="Enter Keyword such as job title, skills etc"
            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            noOptionsMessage={() => "Type to create a new keyword"}
            ></CreatableSelect>
            {
            openKeywordSuggetion && 
            <div className='w-full flex flex-col gap-4 bg-gray-100 rounded-md p-4'>
              <div className='flex items-center gap-2'>
                 <AutoAwesomeIcon className='text-blue-700' style={{fontSize:'1.2rem'}}></AutoAwesomeIcon>
                 <span className='text-[#5e6c84] text-sm font-semibold'>Recommended by AI</span>
              </div>
              {
                keySuggestLoader ?
                <div className="flex gap-4 mt-4">
                 {Array(4).fill().map((_, idx) => (
                  <div
                   key={idx}
                   className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"
                  />
                 ))}
                </div>
                : (
                <div className='flex items-center gap-2 w-full flex-wrap'>
                  {
                    keySuggetions.map((item,index) => (
                      <div key={index} className='flex items-center gap-2 p-1.5 px-2 border-neutral-300 border bg-white rounded-2xl'>
                        <span className='text-sm'>{item}</span>
                        <Plus onClick={()=>addSuggestedKeyword(item.toLowerCase())} className='w-5 h-5 text-neutral-600 cursor-pointer'></Plus>
                       </div>
                    ))
                  }
                </div>    
                )
              }
            </div>
           }
          </div>
          <div className='col-span-2 flex flex-col gap-2'>
            <label className='tracking-wide font-semibold'>Current city/region </label>
            <Select
            closeMenuOnSelect={false}
            components={customComponents}
            onChange={(city)=> setSelectedCity(city.map((item) => item.value))}
            styles={customStyles}
            isMulti
            options={cityOptions}
            value={cityOptions.filter(option => selectedCity.includes(option.value))}
            placeholder="Type to search city and region"
            ></Select>
          </div>
         
          <div className='col-span-2 flex flex-col gap-2'>
           <label className='tracking-wide font-semibold'>Experience </label>
           <div className='w-full grid grid-cols-2 items-center gap-6'>
           <div ref={minRef} className='relative'>
              <div onClick={()=>setMiniOpen((prev)=>!prev)} className='border cursor-pointer flex justify-between items-center rounded-md p-1.5'>
                 <span className={`${!minExp && "text-[#9ca3af]"} tracking-wide text-[14px]`}>{minExp?minExp:"Minimum Experience"}</span>
                 <span className='text-neutral-400'>{miniOpen?<ChevronUp className='w-4 h-4'></ChevronUp>:<ChevronDown className='w-4 h-4'></ChevronDown>}</span>
              </div>
              {
                miniOpen && 
                <div className='w-full hide-scrollbar bg-white h-52 overflow-scroll border flex flex-col absolute top-[100%] z-50 shadow-md'>
                 {
                  minExpData.map((item,index)=> (
                    <span onClick={()=>handleSelectMinExp(item)} key={index} className='text-sm p-2 hover:bg-slate-100 cursor-pointer'>{item}</span>
                  ))
                 }
                </div>
              }
           </div>
           <div ref={maxRef} className='relative'>
             <div onClick={()=>setMaxOpen ((prev)=>!prev)} className='border flex justify-between items-center rounded-md p-1.5'>
                 <span className={`${!maxExp && "text-[#9ca3af]"} tracking-wide text-[14px]`}>{maxExp?maxExp:"Maximum Experience"}</span>
                 <span className='text-neutral-400'>{miniOpen?<ChevronUp className='w-4 h-4'></ChevronUp>:<ChevronDown className='w-4 h-4'></ChevronDown>}</span>
              </div>
              {
                maxOpen && 
               <div className='w-full hide-scrollbar bg-white h-52 overflow-scroll border flex flex-col absolute top-[100%] z-50 shadow-sm'>
                 {
                  maxExpData.map((item,index) => (
                    <span onClick={()=>handleSelectMaxExp(item)} key={index} className='text-sm p-2 hover:bg-slate-100 cursor-pointer'>{item}</span>
                  ))
                 }
               </div>
              }
           </div>
          </div>
          </div>

          <div className='col-span-2 flex flex-col gap-2'>
            <label className='font-semibold tracking-wide'>Annual Salary</label>
            <div className='grid grid-cols-2 items-center gap-6'>
              <div ref={minSalaryRef} className='relative'>
                <div onClick={()=>setMinSalaryOpen((prev)=>!prev)} className='border cursor-pointer flex justify-between items-center rounded-md p-1.5'>
                   <span className={`${!minSalary && "text-[#9ca3af]"} tracking-wide text-[14px]`}>{minSalary?minSalary:"Min. Salary in Lakhs"}</span>
                   <span className='text-neutral-400'>{minSalaryOpen?<ChevronUp className='w-4 h-4'></ChevronUp>:<ChevronDown className='w-4 h-4'></ChevronDown>}</span>
                </div>
                {
                  minSalaryOpen && 
                  <div className='w-full hide-scrollbar bg-white h-52 overflow-scroll border flex flex-col absolute top-[100%] z-50 shadow-md'>
                   {
                    minSalaryData.map((item,index)=> (
                      <span onClick={()=>handleSelectMinSalary(item.value)} key={index} className='text-sm p-2 hover:bg-slate-100 cursor-pointer'>{item.title}</span>
                    ))
                   }
                  </div>
                }
               </div>
               <div ref={maxSalaryRef} className='relative'>
                <div onClick={()=>setMaxSalaryOpen((prev)=>!prev)} className='border cursor-pointer flex justify-between items-center rounded-md p-1.5'>
                   <span className={`${!maxSalary && "text-[#9ca3af]"} tracking-wide text-[14px]`}>{maxSalary?maxSalary:"Max. Salary in Lakhs"}</span>
                   <span className='text-neutral-400'>{maxSalaryOpen?<ChevronUp className='w-4 h-4'></ChevronUp>:<ChevronDown className='w-4 h-4'></ChevronDown>}</span>
                </div>
                {
                  maxSalaryOpen && 
                  <div className='w-full hide-scrollbar bg-white h-52 overflow-scroll border flex flex-col absolute top-[100%] z-50 shadow-md'>
                   {
                    maxSalaryData.map((item,index)=> (
                      <span onClick={()=>handleSelectMaxSalary(item.value)} key={index} className='text-sm p-2 hover:bg-slate-100 cursor-pointer'>{item.title}</span>
                    ))
                   }
                  </div>
                }
               </div>
            </div>
          </div>

          <div className='col-span-2 flex flex-col gap-2'>
            <label className='font-semibold tracking-wide'>Skills</label>
            <CreatableSelect
            closeMenuOnSelect={true}
            onChange={(skills)=>setSelectedSkill(skills.map((skill)=>skill.value))}
            onCreateOption={(inputValue) => {
              const newSkill = {
                value: inputValue,
                label: inputValue
              };
              setSkills(prev => [...prev, newSkill]);
              setSelectedSkill(prev => [...prev, inputValue]);
            }}
            components={customComponents}
            styles={customStyles}
            isMulti
            options={skills}
            value={skills.filter(option => selectedSkill.includes(option.value))}
            placeholder="Type to search skillset"
            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            noOptionsMessage={() => "Type to create a new skill"}
            ></CreatableSelect>
            {
            openSkillSuggetion && 
            <div className='w-full flex flex-col gap-4 bg-gray-100 rounded-md p-4'>
              <div className='flex items-center gap-2'>
                 <AutoAwesomeIcon className='text-blue-700' style={{fontSize:'1.2rem'}}></AutoAwesomeIcon>
                 <span className='text-[#5e6c84] text-sm font-semibold'>Recommended by AI</span>
              </div>
              {
                skillSuggestLoader ?
                <div className="flex gap-4 mt-4">
                 {Array(4).fill().map((_, idx) => (
                  <div
                   key={idx}
                   className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"
                  />
                 ))}
                </div>
                : (
                <div className='flex items-center gap-2 w-full flex-wrap'>
                  {
                    skillSuggetion.map((item,index) => (
                      <div key={index} className='flex items-center gap-2 p-1.5 px-2 border-neutral-300 border bg-white rounded-2xl'>
                        <span className='text-sm'>{item}</span>
                        <Plus onClick={()=>addSuggestedSkills(item.toLowerCase())} className='w-5 h-5 text-neutral-600 cursor-pointer'></Plus>
                       </div>
                    ))
                  }
                </div>    
                )
              }
            </div>
           }
          </div>

          <div className='col-span-2 flex flex-col gap-2'>
            <label className='font-semibold tracking-wide'>Minimum education</label>
            <div className='flex flex-wrap items-center gap-4'>
               {
                education.map((item,index)=>(
                  <div onClick={()=>handleSelectEducation(item)} key={index} className={`p-1.5 border ${isSelectedEducation(item)?"border-blue-500 bg-blue-100 text-blue-700":"border-neutral-400"} cursor-pointer rounded-2xl flex items-center gap-2`}>
                    <span className='text-sm'>{item}</span>
                    {
                      isSelectedEducation(item) ?
                      <Minus className='w-4 h-4'></Minus> :
                      <Plus className='w-4 h-4'></Plus>
                    }
                  </div> 
                ))
               }
            </div>
          </div>

          <div className='w-full col-span-2 flex place-content-end'>
            <div className='flex items-center gap-6'>
               <button onClick={handleReset} className='text-orange-500'>Reset</button>
               <button onClick={handleSearchCandidate} className='p-2 text-white rounded-md flex items-center gap-2 bg-blue-500'>
                 <Search className='w-4 h-4'></Search>
                 Search Candidate
               </button>
            </div>
          </div>

       </div>
    </div>
  )
}

export default ManuallSearch