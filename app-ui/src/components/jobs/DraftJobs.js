import React from 'react'

//import data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'


//importing data for draft jobs
import { draftJobCol,draftJobRow } from '../../pages/jobs/DraftJobsData'
export default function DraftJobs() {
  const actionCol=[{field:'action',headerName:"Actions",headerClassName:'super-app-theme--header',width:200,
  renderCell:(params)=>{
    return (
      <div className='flex h-full gap-2 place-items-center'>
         <button className='py-2 px-3 text-md leading-5 hover:bg-blue-500 rounded-md text-white bg-sky-500'>Edit</button>
         <button className='py-2 px-3 text-md leading-5 hover:bg-blue-500 rounded-md text-white bg-sky-500'>Delete</button>
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
            rowHeight={65}
            rows={draftJobRow}
            columns={draftJobCol.concat(actionCol)}
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
