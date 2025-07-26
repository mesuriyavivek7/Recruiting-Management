import React, { useState } from 'react'
import { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

//Importing icons
import { Upload, X, Loader2, XCircle } from 'lucide-react';
import { FileText } from 'lucide-react';

function MultiAdd() {
  const fileInputRef = useRef(null) 
  const [selectedFile, setSelectedFile] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showViewAllPopup, setShowViewAllPopup] = useState(false)

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

  const handleSubmit = async () => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      
      // Append all files to formData
      selectedFile.forEach((file) => {
        formData.append('files', file)
      })

      const response = await axios.post(`${process.env.REACT_APP_AI_URL}/resume-parser-multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100
          setUploadProgress(Math.round(progress))
        }
      })

      toast.success('Files uploaded successfully!')
      setSelectedFile([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
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
    if(selectedFile.length <= 8) {
      setShowViewAllPopup(false)
    }
  }

  // Upload Progress Popup
  const UploadProgressPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-sm font-medium">{uploadProgress}%</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold">Uploading Files...</h2>
        <p className="text-gray-500">Please wait while we process your files</p>
      </div>
    </div>
  )

  // View All Files Popup
  const ViewAllPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[600px] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Files ({selectedFile.length})</h2>
          <button onClick={() => setShowViewAllPopup(false)} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            {selectedFile.map((file, index) => (
              <div key={index} className="p-3 border rounded-lg border-neutral-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText size={34} className="text-red-500" />
                  <div className="flex flex-col">
                    <h1>{file.name}</h1>
                    <span className="text-sm text-gray-400">{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <X
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-600 transition-all duration-300 cursor-pointer"
                  size={20}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
          <span>Total Files: {selectedFile.length}</span>
          <span>Total Size: {formatFileSize(selectedFile.reduce((acc,file)=> acc + file.size , 0))}</span>
        </div>
      </div>
    </div>
  )

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
            <button 
              onClick={handleSubmit}
              disabled={selectedFile.length === 0 || isUploading} 
              className='bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300 p-2 text-white rounded-md w-52 flex items-center justify-center gap-2'
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Uploading...</span>
                </>
              ) : (
                'Upload Resumes'
              )}
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
                            <div className="flex items-center gap-2">
                              {selectedFile.length > 8 && (
                                <button 
                                  onClick={() => setShowViewAllPopup(true)}
                                  className='p-2 text-sm hover:bg-gray-100 transition-all duration-300 border border-neutral-300 rounded-lg'
                                >
                                  View All
                                </button>
                              )}
                              <button className='p-2 text-sm hover:bg-gray-100 transition-all duration-300 border border-neutral-300 rounded-lg' onClick={clearAllFiles}>
                                Clear all
                              </button>
                            </div>
                        </div>
                        <div className='flex mt-4 flex-col gap-2'>
                          {
                            selectedFile.slice(0, 8).map((file, index)=>(
                              <div key={index} className='p-3 border rounded-lg border-neutral-200 flex justify-between items-center'>
                                 <div className='flex items-center gap-2'>
                                   <FileText size={34} className='text-red-500'></FileText>
                                   <div className='flex flex-col'>
                                      <h1>{file.name}</h1>
                                      <span className='text-sm text-gray-400'>{formatFileSize(file.size)}</span>
                                   </div>
                                 </div>
                                 <X onClick={()=>removeFile(index)} className='text-red-500 hover:text-red-600 transition-all duration-300 cursor-pointer' size={20}></X>
                              </div>
                            ))
                          }
                          {selectedFile.length > 8 && (
                            <button 
                              onClick={() => setShowViewAllPopup(true)}
                              className='p-2 text-sm text-blue-500 hover:bg-blue-50 transition-all duration-300 border border-blue-300 rounded-lg'
                            >
                              + {selectedFile.length - 8} more files
                            </button>
                          )}
                        </div>
                        <div className='p-4 mt-4 border-t border-neutral-200 flex justify-between items-center'>
                            <span>Total Files: {selectedFile.length}</span>
                            <span>Total Size: {formatFileSize(selectedFile.reduce((acc,file)=> acc + file.size , 0))}</span>
                        </div>
                    </div>
                 )
             }
        </div>

        {/* Popups */}
        {isUploading && <UploadProgressPopup />}
        {showViewAllPopup && <ViewAllPopup />}
    </div>
  )
}

export default MultiAdd