import React , {useState, useContext, useEffect} from 'react'
import Notification from '../../components/Notification'
import { AuthContext } from '../../context/AuthContext'
import { invoiceCandidateCol } from './OffersData'
import axios from 'axios'

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export default function Offers() {
   const {user}=useContext(AuthContext)
   const [loader,setLoader]=useState(false) 
   const [rows,setRows]=useState([])

   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
     setNotification({message,type})
   }

   const downloadCandidateInvoice=async (cid)=>{
       try{
          //Fetch which type of invoice file get
          const fileExtension=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/getinvoice-type/${cid}`)

          //Fetch download invoice file
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/download-invoice/${cid}`,{responseType:'blob'})
          
          let fileType=[ 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
          if(fileExtension.data && res.data && fileType.includes(fileExtension.data)){
            const blob = new Blob([res.data], { type: fileExtension.data });
            const url=window.URL.createObjectURL(blob)
            const link=document.createElement('a')
            link.href=url
            link.setAttribute('download','invoicedoc')
            document.body.appendChild(link)
            link.click()
            link.remove()
          }else{
            showNotification("File download failed...!",'failure')
          }
       }catch(err){
         console.log(err)
         showNotification("Something went wrong while downloading candidate invoice.",'failure')
       }
   }

   const handleViewCandidateInvoice=async (cid)=>{
         try{
           const fileName= await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/get-doc-name/${cid}`)
           if(fileName.data){
            const correctUrl=`${process.env.REACT_APP_BASE_URL}/invoicedocs/${fileName.data}`
            window.open(correctUrl,'_blank')
           }
         }catch(err){
           console.log(err)
           showNotification("Something went wrong while viewing invoice doc.",'failure')
         }
   }

   const handleFetchCandidateInvoice=async ()=>{
      try{
        setLoader(true)
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/getinvoice-recruiter/${user._id}`)
        console.log(res.data)
        setRows(res.data.map((item,index)=>({...item,id:index+1})))
        setLoader(false)
      }catch(err){
        setLoader(false)
        console.log(err)
        showNotification("Something went wrong.",'failure')
      }
   }

   useEffect(()=>{
     handleFetchCandidateInvoice()
   },[])

  return (
    <div className='flex flex-col gap-2'>
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
          columns={invoiceCandidateCol(handleViewCandidateInvoice,downloadCandidateInvoice)}
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
