import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
import { invoiceCandidateCol } from './OffersData'
import Notification from '../../components/Notification'
import WhiteLoader from '../../assets/whiteloader.svg'

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export default function Offers() {
  const {user}=useContext(AuthContext)
  const [rows,setRows]=useState([])
  //loader
  const [loader,setLoader]=useState(false)
  const [uploadLoader,setUploadLoader]=useState(false)
  const [removeLoader,setRemoveLoader]=useState(false)
  const [changeLoader,setChangeLoader]=useState(false)

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
   setNotification({message,type})
  }

  const fileTypes=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

  const handleUploadInvoice= async (e,cid) =>{
     const selectedFile=e.target.files[0]
     if(selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size<=10*1024*1024){
       //Start uploading
       setUploadLoader(true)
       const fileData=new FormData()
       fileData.append('invoice',selectedFile)
       try{
           await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice/upload-invoice/${cid}`,fileData,{headers:{"Content-Type":'multipart/form-data'}})
           await fetchCandidateInvoice()
           setUploadLoader(false)
           showNotification("Invoice uploaded.",'success')
       }catch(err){
         setUploadLoader(false)
         console.log(err)
         showNotification("Something went wrong while uploading file.",'failure')
       }
     }else{
      showNotification("Please select valid file type under 10mb",'failure')
     }
  }

  const handleRemoveInvoiceDocs=async (cid)=>{
      try{
        setRemoveLoader(true)
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/invoice/remove-invoice/${cid}`)
        await fetchCandidateInvoice()
        setRemoveLoader(false)
        showNotification("Invoice removed.",'success')
      }catch(err){
        setRemoveLoader(false)
        console.log(err)
        showNotification("Something went wrong.",'failure')
      }
  }

  const handleChangeInvoiceDoc=async (e,cid)=>{
       const selectedFile=e.target.files[0]
       if(selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size<=10*1024*1024){
         setChangeLoader(true)
         try{
          const fileData=new FormData()
          fileData.append('invoice',selectedFile)
          //Remove current invoice doc 
          await axios.put(`${process.env.REACT_APP_API_BASE_URL}/invoice/remove-invoice/${cid}`) 
          //Upload new invoice doc
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice/upload-invoice/${cid}`,fileData,{headers:{"Content-Type":'multipart/form-data'}})
          //Refresh invoice data
          await fetchCandidateInvoice()
          setChangeLoader(false)
          showNotification("Invoice file changed.",'success')
         }catch(err){
           setChangeLoader(false)
           console.log(err)
           showNotification("Something went wrong while change invoice doc.",'failure')
         }
       }else{
         showNotification("Please select valid file type under 10mb",'failure')
       }
  }
  
  const fetchCandidateInvoice=async ()=>{
     try{
      setLoader(true)
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/getinvoice-enterprise/${user._id}`)
        console.log(res.data)
        setRows(res.data.map((item,index)=>({...item,id:index+1})))
     }catch(err){
       setLoader(false)
       console.log(err)
     }
     setLoader(false)
  }
  

  useEffect(()=>{
     fetchCandidateInvoice()
  },[])

  return (
  <div className='flex flex-col gap-2'>  
  {
    uploadLoader && 
    <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-40 backdrop-blur-md items-center'>
     <div className='custom-div pb-4 items-center w-[400px]'>
        <img src={WhiteLoader} className='w-10 h-10' alt='loader'></img>
        <span className='text-[15px]'>Please wait while uploading you invoice doc.</span>
     </div>
   </div>
  }
  {
    removeLoader &&
    <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-40 backdrop-blur-md items-center'>
      <div className='custom-div pb-4 items-center w-[400px]'>
        <img src={WhiteLoader} className='w-10 h-10' alt='loader'></img>
        <span className='text-[15px]'>Please wait while removing your invoice doc.</span>
     </div>
    </div>
  }
  {
    changeLoader &&
    <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-40 backdrop-blur-md items-center'>
      <div className='custom-div pb-4 items-center w-[400px]'>
        <img src={WhiteLoader} className='w-10 h-10' alt='loader'></img>
        <span className='text-[15px]'>Please wait while changing your invoice doc.</span>
     </div>
    </div>
  }
  {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className='custom-div pb-3 relative'>
        <h1 className='text-xl font-medium'>Offers Selected</h1>
    </div>
   <div className='custom-div'>
    <Box sx={{
      height:610,width:'100%',
      borderRadius:'.5rem',
      '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        },
     }}>
      <DataGrid
      getRowId={(rows) => rows.id} // Specify the custom ID field
      rowHeight={80}
      rows={rows}
      columns={invoiceCandidateCol(handleUploadInvoice,handleRemoveInvoiceDocs,handleChangeInvoiceDoc)}
      loading={loader}
      initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
     pageSize={8}
     pageSizeOptions={[5,10]}
     sx={{
          '& .MuiDataGrid-columnHeaders': {
            background:'red', // Set your desired background color here
            color: '#124791', // Optional: Set text color
            fontSize:'1rem',
            fontWeight:'bold'
          },
        }}
      ></DataGrid>
      </Box>
      </div>
   </div>
  )
}
