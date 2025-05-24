import React, { useState } from 'react'

//Importing icons
import { TextSearch } from 'lucide-react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import AiSearch from '../../components/database/AiSearch';
import AiRecentSearch from '../../components/database/AiRecentSearch';
import ManuallSearch from '../../components/database/ManuallSearch';

function SearchCandidate() {

  const [activeTab,setActiveTab] = useState('manually')

  let savedSearch = ['I want CA intern & CA with Expertise of GST,Internal Audit ,TAX filling ,Return','JOB DESCRIPTION – ADMIN EXECUTIVE Job Title: Admin Executive Location: Thaltej,','i want team leader for my recruitment agency at thaltej Ahmedabad must have']
  let recentSearch = ['i want Java Developer with 2 year experience at Ahmedabad location salary upto','Job Title: Client Coordinator / HR Admin Company: Uphire Talent Solutions Location:','Job Title: Client Coordinator / HR Admin Company: Uphire Talent Solutions Location:','Job Title: Client Coordinator / HR Admin Company: Uphire Talent Solutions Location:','Job Title: Client Coordinator / HR Admin Company: Uphire Talent Solutions Location:']

  let savedManualSearch = ['Frontend Developer, React js Developer','Ui/Ux Design, Graphic Design, Logo Design','Backend Developer, Node js Developer, Mongodb Database','Python, Data Science, Ai/Ml']
  let recentManualSearch = ['Qa Testing, Automation','Node js Developer, Backend Developer, Rest Api','Java Develpoer, Spring Boot, Software Engineer','Git & Github, Deployment, Production, Ci/Cd Pipeline']

  return (
    <div className='px-10 transition- pt-10 flex flex-col gap-4'>
        <div className=''>
            <h1 className='text-3xl tracking-wide text-blue-600 font-bold'>Search Candidates</h1>
        </div>
        <div className='flex w-full h-full gap-4 items-start'>
             <div className='w-4/6 flex flex-col gap-4'>
                <div className='bg-white p-1.5 overflow-hidden relative rounded-md'>
                    <div className='relative grid grid-cols-2 items-center'>
                    <div
                     className={`absolute top-0 h-full left-0 bottom-2 border border-neutral-300 w-1/2 bg-gray-400/20 rounded-md transition-all duration-300 ease-in-out z-0`}
                     style={{
                       transform: activeTab === 'ai' ? 'translateX(100%)' : 'translateX(0%)'
                     }}
                    />
                    <button onClick={()=>setActiveTab("manually")} className='relative z-10 flex rounded-l-md p-2 justify-center items-center gap-2.5'>
                       <TextSearch></TextSearch>
                       <span className='font-medium'>Search Manually</span>
                    </button>
                    <button onClick={()=>setActiveTab("ai")} className={`relative z-10 flex rounded-r-md p-2 justify-center items-center gap-2.5`}>
                       <AutoAwesomeIcon></AutoAwesomeIcon>
                       <span className='font-medium'>use Ai</span>
                    </button>
                    </div>
                </div>
                {
                  activeTab==="manually"?
                  <ManuallSearch></ManuallSearch>:
                  <AiSearch></AiSearch>
                }       
             </div>
             <div className='w-4/12 flex flex-col gap-4'>
               <AiRecentSearch dataType={"save"} data={activeTab==="manually"?savedManualSearch:savedSearch} ></AiRecentSearch>
               <AiRecentSearch dataType={"recent"} data={activeTab==="manually"?recentManualSearch:recentSearch} ></AiRecentSearch>
             </div>
        </div>
    </div>
  )
}

export default SearchCandidate