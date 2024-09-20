import React, { useState } from 'react'

//import data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

//importing data for draft jobs
import { draftJobCol} from '../../pages/jobs/DraftJobsData'
import axios from 'axios'
export default function DraftJobs({rows,loading,fetchingData,showNotification}) {
  const navigate=useNavigate()
  
  
  const [deleteLoad,setDeleteLoad]=useState(false)

  

  const deleteDraft=async (jobid)=>{
    
     try{
         setDeleteLoad(true)
         await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/job/deletedraftwithjobs/${jobid}`)
         fetchingData()
         showNotification("Job Draft deleted sucessfully","success")
     }catch(err){
        console.log(err)
        showNotification("Something wrong while deleting job draft..!","failure")
     }
     setDeleteLoad(false)
  }




  const actionCol=[{field:'action',headerName:"Actions",headerClassName:'super-app-theme--header',width:200,
  renderCell:(params)=>{
    return (
      <div className='flex h-full gap-2 place-items-center'>
         <button onClick={()=>navigate(`/employer/jobposting/landing/postjob/${params.row.job_id}`)} className='py-2 px-3 text-md leading-5 hover:bg-blue-500 rounded-md text-white bg-sky-500'>Edit</button>
         <button onClick={()=>deleteDraft(params.row.job_id)} disabled={deleteLoad} className='py-2 px-3 text-md leading-5 hover:bg-blue-500 rounded-md text-white bg-sky-500'>Delete</button>
      </div>
    )
  }
  }]
  return (
    <div>
        <Box sx={{
            height:600,width:'100%',
            '& .super-app-theme--header':{
                backgroundColor: '#edf3fd',
            }
        }}>
          <DataGrid
            rowHeight={70}
            rows={rows}
            columns={draftJobCol.concat(actionCol)}
            loading={loading}
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
  )
}
