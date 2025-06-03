import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Importing icons
import { BriefcaseBusiness } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';



//Importing images
import PROFILE from '../../assets/profile.png'

function CandidateResult() {
 
  const navigate = useNavigate()
  const location = useLocation()

  const [searchResults,setSearchResults] = useState([])

  useEffect(()=>{
    if(!location.state){
        navigate('/')
    }else{
        console.log("search results---->",searchResults)
        setSearchResults(location.state)
    }
  },[])

 const changeUpperCase = (str) =>{
     if(!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1,str.length)
 }


  return (
    <div className='px-10 pt-10 flex flex-col gap-4'>
        <div>
            <h1 className='text-3xl tracking-wide text-blue-600 font-bold'>Search Results</h1>
        </div>
        <div className='flex w-full h-full gap-4 items-start'>
            <div className='w-4/6 flex flex-col gap-4'>
              {
                searchResults.map((item,index) =>(
                   <div className='w-full bg-white flex p-4 items-start gap-6 rounded-sm custom-shadow-1'>
                      <div className='flex justify-center  items-center'>
                        <img className='w-36 h-36' src={PROFILE} alt={`${index} Profile`}></img>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-medium'>{changeUpperCase(item.name)}</h2>
                        <div className='flex items-center gap-6'>
                            <div className='flex items-center gap-1.5'>
                                 <BriefcaseBusiness className='text-gray-400' size={20}></BriefcaseBusiness>
                                <span>{item.total_experience}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <Wallet size={20} className='text-gray-400'></Wallet>
                                <span>12 LPA</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <MapPin size={20} className='text-gray-400'></MapPin>
                                <span>Ahmedabad</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1.5'>
                              <Mail className='text-gray-400' size={20}></Mail>
                              <span>{item.contact_details.email}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                              <Phone className='text-gray-400' size={20}></Phone>
                              <span>{item.contact_details.phone}</span>
                            </div>
                        </div>
                        <div className='mt-2 grid grid-cols-2 gap-y-1.5 w-96'>
                            <span className='text-neutral-400'>Pref. Location</span>
                            <span>Ahmedabad, Pune, Hydrabad</span>
                            <span className='text-neutral-400'>Education</span>
                            <span>{item.education.degree}</span>
                            <span className='text-neutral-400'>Pancard No.</span>
                            <span>AYHIIYU287GT</span>
                            <span className='text-neutral-400'>Skills</span>
                            <span>{item.skills.map((item)=> <span>{item} {" "}</span>)}</span>
                        </div>
                      </div>
                   </div>
                ))
              }
            </div>
            <div className='w-4/12 flex flex-col gap-4'>

            </div>
        </div>
    </div>
  )
}

export default CandidateResult