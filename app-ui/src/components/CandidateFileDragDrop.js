import React, { useState } from 'react'

//importing icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function CandidateFileDragDrop({existfile,showNotification,downloadAttachments,jobId,onFileUpload,fileTitle,fileId,fileSubText,accepted}) {
  const [file,setFile]=useState(existfile)

  const downloadUrl=`${process.env.REACT_APP_API_BASE_URL}/job/download/${fileId}/${jobId}`
  
  

  let fileTypes=[]
  switch(fileId){
        case "evaluationform":
          fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
          break;

        case "audioform":
          fileTypes=['video/mpeg','video/mp4','audio/wav']
          break;
        
        case "otherfiles":
          fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document",'video/mpeg','video/mp4','audio/wav','image/jpeg','image/png','application/vnd.ms-excel',',application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','image/jpg']
          break;

        default:
          fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document",'video/mpeg','video/mp4','audio/wav','image/jpeg','image/png','application/vnd.ms-excel',',application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','image/jpg']
          break;
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size<=10*1024*1024 ) {
      setFile(selectedFile);
      onFileUpload(selectedFile)
    }else{
      showNotification("Please select valid file type under 10mb","failure")
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile=()=>{
    setFile(null)
    onFileUpload(null)
  }


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && fileTypes.includes(droppedFile.type) && droppedFile.size<=10*1024*1024) {
      setFile(droppedFile);
      onFileUpload(droppedFile)
    }else{
      showNotification("Please select valid file type under 10mb","failure")
    }
  };

  return (
    <div className='flex flex-col gap-1 w-[350px]'>
         <div onDragOver={handleDragOver}
              onDrop={handleDrop} className='hover:border hover:border-dashed hover:border-blue-700 flex p-2 px-6 flex-col w-full rounded-md bg-blue-100 '>
                  <div className='flex items-center gap-2'>
                     <span className='text-blue-400'><CloudUploadOutlinedIcon></CloudUploadOutlinedIcon></span>
                     <div className='flex flex-col'>
                       <label htmlFor={fileId} className='text-sm cursor-pointer text-blue-400'>{fileTitle}</label>
                       {
                        fileSubText && <span className='text-[12px] text-blue-400'>{fileSubText}</span>
                       }
                       <input
                        onChange={handleFileChange}
                        className='hidden'
                        type='file'
                        id={fileId}
                        accept={accepted}
                       ></input>
                       {/* <span className='text-[12px] cursor-pointer text-blue-400'>(<span className='text-red-400'>*</span> Required Download Template)</span> */}
                     </div>
                  </div>
                  {
                     downloadAttachments && <a href={downloadUrl} download className='mt-1 text-sm text-blue-500 underline cursor-pointer'>download sample file <small className='text-red-400'>*</small></a>
                  }
                  
          </div>
          {
            file && 
            <div className='flex p-2 border rounded-md justify-between items-center'>
                     <div className='flex gap-2 items-center'>
                        <span className='h-12 w-12 rounded-full bg-blue-100 flex justify-center items-center text-blue-400'><InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon></span>
                        <p className='w-52 text-sm text-gray-400'>{file.name}</p>
                     </div>
                     <span onClick={handleRemoveFile} className='text-red-500 cursor-pointer'><DeleteOutlineOutlinedIcon style={{fontSize:"1.6rem"}}></DeleteOutlineOutlinedIcon></span>
            </div>
    
          }
          </div>
  )
}
