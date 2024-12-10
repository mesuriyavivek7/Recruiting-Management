import React, { useEffect, useState } from 'react'
import Notification from '../../Components/Notification'
import axios from 'axios'
import Whiteloader from '../../assets/whiteloader.svg'

//Importing icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Support() {

  const [notification,setNotification]=useState(null)
  const [uploadLoad,setUploadLoad] = useState(false)
  const [editMode,setEditMode] = useState(false)
  const [errors,setErrors] = useState({})
  const [upload,setUpload] = useState(false)

  //for showing notification
  const showNotification=(message,type)=>{
    setNotification({message,type})
  }
  
  const [supports,setSupports] = useState([])

  const handleFetchSupport = async ()=>{
      try{
          const res = await axios.get(`${process.env.REACT_APP_API_APP_URL}/support`)
          if(res.data) setSupports(res.data)
      }catch(err){
         console.log(err)
         showNotification("Something went wrong while fetching data.",'failure')
      }
  }

  const handleChangeEditMode=()=>{
      if(!editMode){
        setEditMode(true)
        showNotification("You are entered into edit mode.",'info')
      }else{
        setPreviewUrl({})
        setEditMode(false)
        setErrors({})
        handleFetchSupport()
        showNotification("You are exit from edit mode",'info')
      }
      
  }

  useEffect(()=>{
     handleFetchSupport()
  },[])

  const [previewUrl,setPreviewUrl]=useState({})
  //For Handle profile picture
  const ProfileFileType=['image/jpeg','image/png','image/jpg']
  const handleProfileFileChange=(e,index)=>{
   const selectedFile=e.target.files[0]
   if(selectedFile && ProfileFileType.includes(selectedFile.type) && selectedFile.size<=5*1024*1024){
      const reader=new FileReader()
      reader.onloadend = () => {
       setPreviewUrl((prevData)=>({...prevData,[index]:reader.result}));
     };
     reader.readAsDataURL(selectedFile);
   }else{
      //handle show notification
      showNotification('Uploaded file type should be jpeg, png, jpg type and under 5mb','failure')
   }
  }

  // console.log('profile urls---->',previewUrl)

  // console.log('supports----->',supports)


const handleAllUploads = async () => {
    if(validateData()){
    setUploadLoad(true)
    try {
      const uploadPromises = Object.entries(previewUrl).map(async ([key, fileData]) => {
        const data = new FormData();
        data.append('file', fileData);
        data.append('upload_preset', 'upload');
        
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/djxavfpqc/image/upload',
          data
        );
        const { url } = uploadRes.data;
  
        // Update the supports state for each upload
        setSupports((prevData) =>
          prevData.map((item, index) => {
            if (index === Number(key)) {
              return { ...item, profile_picture: url };
            }
            return item;
          })
        );
      });
  
      // Execute all uploads concurrently
      await Promise.all(uploadPromises);
      setUpload(true)
    } catch (err) {
      console.error('Error uploading files:', err);
      showNotification('There is something wrong while uploading profile pictures.', 'failure');
    }
   }
  };

  const validateData = ()=>{
      let newErrors={}
      supports.map((item,index)=>{
         if(!item.name) newErrors[index]={...newErrors[index],name:"Support member name is required."}
         if(!item.email) newErrors[index]={...newErrors[index],email:"Email address is required."}
         if(!item.support_desc) newErrors[index]={...newErrors[index],support_desc:"Description is required."}
         if(!item.profile_picture) newErrors[index]={...newErrors[index],profile_picture:"Please upload profile picture."}
      })
      setErrors(newErrors)
      return Object.keys(newErrors).length===0
  }


const handleUpdateDetails = async ()=>{
     console.log('upload details start')
    setUploadLoad(true)
    try{
       await axios.put(`${process.env.REACT_APP_API_APP_URL}/support`,{supports})
       await handleFetchSupport()
       setUpload(false)
       setEditMode(false)
    }catch(err){
       console.log(err)
       showNotification("Something went wrong.",'failure')
    }finally{
      setUploadLoad(false)
    }
} 

useEffect(()=>{
    if(upload) handleUpdateDetails()
},[upload])

const handleDataChange = (e,index)=>{
    const {name,value} = e.target
    setSupports((prevData)=>prevData.map((obj,i)=>{
       if(i===index){
        return {...obj,[name]:value}
       }else{
        return obj
       }
    }))
}


  return (
    <div>
        {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
        {
          uploadLoad && 
          <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
            <div className='custom-div items-center pb-3'>
               <img src={Whiteloader} alt='loader' className='w-8 h-8'></img>
               <span className='text-sm font-sans'>Please wait while changing your data.</span>
            </div>
         </div>
        }

        <div className='flex p-2 flex-col bg-white gap-4 w-full rounded-md'>
            <div className='border p-2 rounded-md flex justify-between items-center'>
               <span className='text-xl'>Supports</span>
               {
                editMode?
                <div className='flex items-center gap-2'>
                 <button onClick={handleAllUploads} className='bg-blue-500 p-1.5 text-white w-16 rounded-md'>Save</button>
                 <button onClick={handleChangeEditMode} className='bg-red-500 text-white w-16 p-1.5 rounded-md'>Cancel</button>
               </div>:
               <button onClick={handleChangeEditMode} className='bg-green-400 hover:bg-green-500 transition-colors w-20 p-1.5 flex items-center gap-1 rounded-md'><span><EditOutlinedIcon style={{fontSize:"1.4rem"}}></EditOutlinedIcon></span> Edit</button>
               }
               

            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-5 w-full'>
              {
                supports.map((item,index)=>(

                 <div key={index} className='flex border p-2 rounded-md flex-col gap-4'>
                   {
                    item.dashboard_type==="enterprise" ? (
                        <h1 className='text-lg font-sans'>{item.support_type==="technical"?"Enterprise Technical Support":"Enterprise Business Support"}</h1>
                    ):
                    (
                        <h1 className='text-lg font-sans'>{item.support_type==="technical"?"Recruiter Technical Support":"Recruiter Business Support"}</h1>
                    )
                   }
                   <div className='flex items-center gap-10'>
                      <div className='flex flex-col gap-2'>
                        <img className='w-28 h-28 rounded-full' src={previewUrl[index]?previewUrl[index]:item.profile_picture} alt='support'></img>
                        {
                          errors[index]?.profile_picture && <span className='text-red-500 font-sans text-sm'>Image is required</span>
                        }
                        {
                          editMode && <label htmlFor={index} className='p-1 flex justify-center items-center rounded-md text-white hover:bg-blue-600 transition-colors bg-blue-500'>Change</label>
                        }
                        <input onChange={(e)=>handleProfileFileChange(e,index)} type='file' id={index} className='hidden'></input>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div>
                         <div className='flex items-center gap-2'>
                             <span className='w-28 text-gray-700 font-sans text-lg'>Name:</span>
                             <input onChange={(e)=>handleDataChange(e,index)} name='name' className='border text-[15px] font-sans w-72 p-1 rounded-md outline-none' type='text' value={item.name} readOnly={!editMode}></input>
                         </div>
                         {
                           errors[index]?.name && <span className='text-sm flex place-content-end text-red-500 font-sans'>{errors[index]?.name}</span>
                         }
                        </div>
                        <div>
                         <div className='flex items-center gap-2'>
                             <span className='w-28 text-gray-700 font-sans text-lg'>Email:</span>
                             <input onChange={(e)=>handleDataChange(e,index)} name='email' className='border text-[15px] font-sans w-72 p-1 rounded-md outline-none' type='email' value={item.email} readOnly={!editMode}></input>
                         </div>
                         {
                           errors[index]?.email && <span className='text-sm flex place-content-end text-red-500 font-sans'>{errors[index]?.email}</span>
                         }
                        </div>
                        <div>
                         <div className='flex items-center gap-2'>
                              <span className='w-28 text-gray-700 font-sans text-lg'>Description:</span>
                              <textarea onChange={(e)=>handleDataChange(e,index)} name='support_desc' readOnly={!editMode} className='w-72 text-[15px] font-sans resize-none border p-1 rounded-md outline-none' type='text' value={item.support_desc}></textarea>
                         </div>
                         {
                           errors[index]?.support_desc && <span className='text-sm flex place-content-end text-red-500 font-sans'>{errors[index]?.support_desc}</span>
                         }
                        </div>
                     </div>
                   </div>
                  </div>
                ))
              }
             
           </div>
        </div>
    </div>
  )
}
