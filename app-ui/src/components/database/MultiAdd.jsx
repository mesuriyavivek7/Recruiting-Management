import React, { useState } from 'react'
import { useRef } from 'react';

//Importing icons
import { Upload, X } from 'lucide-react';
import { FileText } from 'lucide-react';



function MultiAdd() {
  const fileInputRef = useRef(null) 
  const [selectedFile,setSelectedFile] = useState([])

  const handleFileSelect = (e) =>{
    const files = e.target.files 
    if(files) {
      const pdfFiles = Array.from(files).filter((file) => (file.type==="application/pdf" || file.type==="application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
      setSelectedFile(prev => [...prev, ...pdfFiles])
    }
  } 

  const handleDragOver = (e) =>{
    e.preventDefault()
  }

  const handleDrop = (e) =>{
      e.preventDefault()
      const files = e.dataTransfer.files
      if(files){
        const pdfFiles = Array.from(files).filter((file) => (file.type==="application/pdf" || file.type==="application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
        setSelectedFile(prev => [...prev, ...pdfFiles])
      }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const clearAllFiles = () => {
    setSelectedFile([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index) =>{
    setSelectedFile((prev) => prev.filter((_,i) => index!==i))
  }

  return (
    <div className='w-full flex items-start gap-4'>
        {/* Upload resume section */}
        <div className='w-[58%] p-6 rounded-lg border border-neutral-200 bg-white flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <Upload></Upload>
            <h1 className='font-semibold text-2xl'>Upload Multiple Resumes</h1>
          </div>
          <div onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}  className='w-full flex justify-center items-center hover:border-neutral-400 transition-all duration-200 border-2 border-neutral-300 border-dashed rounded-lg h-56'>
              <div className='flex flex-col gap-2 items-center'>
                <Upload size={44} className='text-gray-400'></Upload>
                <h1 className='text-lg font-medium '>Drop your resume files here, or click to browse</h1>
                <span className='text-neutral-400 text-[15px]'>You can select multiple files at once.</span>
                <button className='p-2 mt-2 hover:bg-gray-100 transition-all duration-300 border-neutral-200 border rounded-lg'>
                  Choose Files
                </button>
                <input className='hidden' onChange={handleFileSelect} accept='.pdf,.doc,.docx' ref={fileInputRef} type='file' multiple></input>
              </div>
          </div>
          <div className='flex justify-center items-center'>
            <button disabled={selectedFile.length===0} className='bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300 p-2 text-white rounded-md w-52'>
               Upload Resumes
            </button>
          </div>
        </div>

        {/* Selected Resume section */}
        <div className={`w-[38%] p-6 rounded-lg border border-neutral-200 ${selectedFile.length===0 ? 'bg-gray-100' : 'bg-white'} flex items-center justify-center`}>
             {
                 selectedFile.length === 0 ? 
                 (
                    <div className='flex flex-col gap-4 items-center'>
                          <FileText className='text-gray-300' size={40}></FileText>
                          <h1 className='text-center text-neutral-400'>No files selected yet, Upload some resumes to see them listed here.</h1>
                    </div>
                 ) : (
                    <div className='flex w-full flex-col gap-2'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                               <FileText size={22}></FileText>
                               <h1 className='text-lg font-semibold'>Selected Files ({selectedFile.length})</h1>
                            </div>
                            <button className='p-2 text-sm hover:bg-gray-100 transition-all duration-300 border border-neutral-300 rounded-lg' onClick={clearAllFiles}>
                               Clear all
                            </button>
                        </div>
                        <div className='flex mt-4 flex-col gap-2'>
                          {
                            selectedFile.map((file, index)=>(
                              <div key={index} className='p-3 border rounded-lg border-neutral-200 flex justify-between items-center'>
                                 <div className='flex items-center gap-2'>
                                   <FileText size={34} className='text-red-500'></FileText>
                                   <div className='flex flex-col'>
                                      <h1>{file.name}</h1>
                                      <span className='text-sm text-gray-400'>{formatFileSize(file.size)}</span>
                                   </div>
                                 </div>
                                 <X onClick={()=>removeFile(index)} className='text-red-500 hover:text-red-600 transition-all duration-300' size={20}></X>
                              </div>
                            ))
                          }
                        </div>
                        <div className='p-4 mt-4 border-t border-neutral-200 flex justify-between items-center'>
                            <span>Total Files: {selectedFile.length}</span>
                            <span>Total Size: {formatFileSize(selectedFile.reduce((acc,file)=> acc + file.size , 0))}</span>
                        </div>
                    </div>
                 )
             }
        </div>
    </div>
  )
}

export default MultiAdd