import React,{useState} from 'react';
import {ReactComponent as UploadIcon} from "../assets/asset33.svg";

const FileDragDrop = ({fileuploadname}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
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
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-gray-700"
        >
          <p className="text-base"><span className='text-blue-400'>{fileuploadname}</span> or drag and drop</p>
          <p className="text-xs text-gray-400">PDF, DOC, DOCX of up to 10MB, Tables and Images will be ignored.</p>
        </label>
        {file && (
          <p className="mt-4 text-green-500">{file.name}</p>
        )}
      </div>
    );
}

export default FileDragDrop;
