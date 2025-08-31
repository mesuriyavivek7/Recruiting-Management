import React , {useState, useContext, useEffect} from 'react'
import Notification from '../../components/Notification'
import { AuthContext } from '../../context/AuthContext'
import { invoiceCandidateCol } from './OffersData'
import axios from 'axios'

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

export default function Offers() {
   const {user}=useContext(AuthContext)
   const [loader,setLoader]=useState(false) 
   const [rows,setRows]=useState([])
   const [offerLoader,setOfferLoader] = useState(false)
   const [candidateName,setCandidateName] = useState('')
   const [jobId,setJobId]= useState('')
   const [status,setStatus] = useState('')

   const [notification,setNotification]=useState(null)

   //for showing notification
   const showNotification=(message,type)=>{
     setNotification({message,type})
   }

   const candiadteStatusChange = async (e, id) => {
    const selectedStatus = e.target.value;

    try {
      
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/changecandidatestatus/${id}`, { status: selectedStatus })
      await handleFetchCandidateInvoice()
      showNotification("Successfully candidate status changed.", 'success')
    } catch (err) {
      showNotification("Something wrong while changeing candidate status.", "failure")
      console.log(err)
    }
  }


   const handleFetchCandidateInvoice=async ()=>{
      try{
        setLoader(true)
        const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/getinvoice-recruiter/${user._id}?status=${status}&candidate_name=${candidateName}`)
        setRows(res.data.data.map((item,index)=>({...item,id:index+1})))
        setLoader(false)
      }catch(err){
        setLoader(false)
        console.log(err)
        showNotification("Something went wrong.",'failure')
      }
   }

   useEffect(()=>{
     handleFetchCandidateInvoice()
   },[status, candidateName])

   const handleRemoveInvoice = async (candidate_id, job_id) => {
       console.log('Removed')
       try{
         const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/invoice/remove-invoice`, {
          candidate_id,
          job_id
         })
        await handleFetchCandidateInvoice()
        showNotification('Successfully remove offer letter')
       }catch(err){
        console.log(err)
        showNotification("Something went wrong.",'failure')
       }
   }

   const handleUploadInvoiceDoc = async (e, candidate_id, job_id) => {
        let file = e.target.files[0]

        let formData = new FormData()
        console.log('Uploaded successfully')
        try{
          setOfferLoader(true)
          formData.append('invoice',file)
          formData.append('job_id',job_id)
          formData.append('candidate_id',candidate_id)
          formData.append('recruiter_member_id',user._id)
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice/upload-invoice`,formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
          await handleFetchCandidateInvoice()
          showNotification('Successfully uploaded invoice doc.','success')
        }catch(err){
          console.log(err)
          showNotification("Something wrong while uploading offer letter.", "failure")
        }finally{
          setOfferLoader(false)
        }
   }

  return (
    <div className='flex flex-col gap-2'>
        {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
        <div className='custom-div pb-3  relative'>
          <div className='flex w-full justify-between'>
           <h1 className='text-xl font-medium'>Paytrack</h1>
              <div className='flex items-center gap-2'>
                <div className='p-2 border rounded-2xl flex items-center gap-2'>
                  <SearchIcon></SearchIcon>
                  <input placeholder='search by candidate name' onChange={(e)=>setCandidateName(e.target.value)} className='border-none outline-none placeholder:text-sm' type='flex-1'></input>
                </div>
                {/* <div className='p-2 border rounded-2xl flex items-center gap-2'>
                  <SearchIcon></SearchIcon>
                  <input placeholder='search by jobid' onChange={(e)=>setJobId(e.target.value)} className='border-none outline-none placeholder:text-sm' type='flex-1'></input>
                </div> */}
                <select className='p-1.5 rounded-2xl border outline-none' value={status} onChange={(e)=>setStatus(e.target.value)}>
                   <option value={''}>All</option>
                   <option value={'success-joined'}>Successfully Joined</option>
                   <option value={'invoice-raised'}>Invoice Raised</option>
                   <option value={'payment-received'}>Payment Received</option>
                </select>
              </div>
         </div>
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
          columns={invoiceCandidateCol(candiadteStatusChange, handleUploadInvoiceDoc, offerLoader, handleRemoveInvoice)}
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
