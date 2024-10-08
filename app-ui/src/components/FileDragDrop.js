import React,{useState} from 'react';
import {ReactComponent as UploadIcon} from "../assets/asset33.svg";

//importing icons
import CloseIcon from '@mui/icons-material/Close';
const FileDragDrop = ({fileuploadname,existfile,fileuploadspan,onFileUpload,fileId,accepted,showNotification}) => {
    const [file, setFile] = useState(existfile);
    let fileTypes=[]
    switch(fileId){
         case "samplecv":
          fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
          break;

          case "evaluationform":
            fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            break;

          case "audio":
            fileTypes=['video/mpeg','video/mp4','audio/wav']
            break;
          
          case "other":
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

    const handleRemoveFile=()=>{
      setFile(null)
      onFileUpload(null)
    }
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
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
      <div
        className="w-full flex flex-col place-items-center text-center pb-6  "
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadIcon className="h-12 w-12 text-gray-500 mb-3" />
        <input
          type="file"
          id={fileId}
          className="hidden"
          onChange={handleFileChange}
          accept={accepted}
        />
        <label
          htmlFor={fileId}
          className="cursor-pointer text-gray-700"
        >
          <p className="text-base"><span className='text-blue-400'>{fileuploadname}</span> or drag and drop</p>
          <p className="text-xs text-gray-400">{fileuploadspan}</p>
        </label>
        
        {
          file && (

            <div className='flex mt-4 justify-between gap-4 place-items-center'>
              <p className="text-green-500 w-52">{(file.savedDraft)?(file.filename):(file.name)}</p>
              <span onClick={handleRemoveFile} className='cursor-pointer hover:text-red-500'><CloseIcon style={{fontSize:"1rem"}}></CloseIcon></span>
            </div>

          )
        }
         
        
      </div>
    );
}

export default FileDragDrop;
