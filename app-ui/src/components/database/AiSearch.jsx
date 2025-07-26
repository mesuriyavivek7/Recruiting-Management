import React, { useState, useEffect } from 'react'
import axios from 'axios';

//Importing icons
import { Pencil } from 'lucide-react'
import { CloudUpload } from 'lucide-react';
import { WandSparkles } from 'lucide-react';
import { useRef } from 'react';

//Importing images
import CHATBOT from '../../assets/chatbot.png'

import {toast} from 'react-toastify'

function AiSearch({handlePromptBaseSearch,promptRecentFilledSearch}) {

  //For Prompt Storing
  const [prompt,setPrompt] = useState("")

  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.rows = 4; // Reset to base rows
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const maxHeight = lineHeight * 6;

      if (scrollHeight <= maxHeight) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      } else {
        textarea.style.height = lineHeight * 6 + 'px';
        textarea.style.overflowY = 'auto';
      }
    }
  };


  //For TypeWriter effect in placeholder 
  const textArray = [
    'Hiring for Field Sales Associated in Mumbai For Amazon.',
    'Looking for Software Engineers in Bangalore.',
    'Remote Content Writers needed — suggest a candidate today!',
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearch = () =>{
    console.log("search candidate details")
    handlePromptBaseSearch(prompt)
  }

  useEffect(() => {
    const currentText = textArray[textIndex];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textArray.length); // go to next text
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, textArray]);


  useEffect(()=>{
    if(promptRecentFilledSearch){
       setPrompt(promptRecentFilledSearch)
    }
  },[promptRecentFilledSearch])

  const handleFileChange = async (e) =>{
    const selectedFile = e.target.files[0]
    const fileData = new FormData()
    fileData.append('file',selectedFile)

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job/getjdcontent`,fileData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setPrompt(response.data)
    }catch(err){
      console.log(err)
      toast.error("Something went wrong while uploading JD.")
    }

  } 

  return (
      <div className='flex flex-col overflow-hidden rounded-md border custom-shadow-1 border-neutral-300'>
        <div className='p-4 bg-blue-200/40 flex items-center gap-4'>
          <img src={CHATBOT} className='w-10 h-10'></img>
          <div className='flex flex-col'>
             <h1 className='font-semibold text-lg'>Hello! I am Ai Intelligence</h1>
             <p>Describe your ideal candidate or upload a JD and I’ll find the best match.</p>
          </div>
        </div>
        <div className='px-4 pt-8 bg-white'>
          <div className='border-blue-300 bg-white p-2 border rounded-2xl flex flex-col gap-2'>
            <textarea ref={textareaRef} onInput={handleInput} onChange={(e)=>setPrompt(e.target.value)} value={prompt} className='outline-none resize-none p-2 text-[14px] font-medium' placeholder={placeholder} rows={4}></textarea>
            <label htmlFor='jd' className='group cursor-pointer flex w-32 items-center gap-2 p-1'>
               <CloudUpload className='group-hover:animate-bounce'></CloudUpload>
               <span>Upload JD</span>
            </label>
            <input onChange={handleFileChange}  type='file' id='jd' className='hidden' accept=".pdf, .doc, .docx"></input>
          </div>
          <div className='flex py-4 place-content-end'>
             <div className='flex items-center gap-6'>
               <button onClick={()=>setPrompt('')} className='text-orange-500'>Reset</button>
               <button onClick={handleSearch} disabled={!prompt} className='text-white bg-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed  p-2 rounded-md flex items-center gap-2'>
                 <WandSparkles className='w-4 h-4'></WandSparkles>
                 <span className='font-medium'>Generate</span>
               </button>
             </div>
          </div>
        </div>
        {/* <div className='px-4 bg-white pb-8 pt-4'>
           <div className='flex bg-gray-100 rounded-md p-4 flex-col gap-2'>
             <span className='text-sm text-[#5e6c84] font-semibold'>Recent job descriptions</span>
             <div className='flex items-center gap-4'>
              <div className='flex border bg-white items-center p-1.5 border-neutral-200 gap-2'>
                <Pencil className='w-4 h-4 cursor-pointer'></Pencil>
                <span>i want CA intern & CA...</span>
              </div>
              <div className='flex bg-white items-center p-1.5 border border-neutral-200 gap-2'>
                <Pencil className='w-4 h-4 cursor-pointer'></Pencil>
                <span>Hiring For Frontend Dev...</span>
              </div>
             </div>
           </div>
        </div> */}
      </div>
  )
}

export default AiSearch