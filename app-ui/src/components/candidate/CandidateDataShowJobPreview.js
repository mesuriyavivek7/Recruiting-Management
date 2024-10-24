import React from 'react'

//importing data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { cstatus } from '../statuschange/StatusMapping'

export default function CandidateDataShowJobPreview({candidateRows}) {

    const getDate=(date)=>{
        let d=new Date(date)
        let d_ate=d.getDate()
        let d_month=d.getMonth()+1
        let d_year=d.getFullYear()
       
        return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
    }
      
    const getDays = (date) => {
        const today = new Date()
        const past = new Date(date)
    
        const timeDifference = today.getTime() - past.getTime()
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        return days
    }

    const candidateJobPreviewCol=[
        {field: 'id', headerName:'ID',headerClassName:'super-app-theme--header', width: 90,},
        {
            field:"name&id",headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:250,
            renderCell:(params)=>{
                return (
                    <div className='h-full flex items-center'>
                     <div className='flex h-fit flex-col gap-1'>
                        <p className='text-sm text-blue-400'>{params.row.candidate_full_name}</p>
                        <span className='text-sm text-blue-400'>{params.row.candidate_id}</span>
                     </div>
                    </div>
                )
            } 
        },
        {
            field:"email&mobileno",headerName:"Candidate Mobile/Email",headerClassName:'super-app-theme--header',width:300,
            renderCell:(params)=>{
                 return (
                  <div className='flex items-center h-full'>
                    <div className='flex h-fit flex-col gap-1'>
                        <span className='text-sm'>+{params.row.candidate_contact_no}</span>
                        <span className='text-sm'>{params.row.candidate_email}</span>
                    </div>
                  </div>
                 )
            }
        },
        {
            field:"candidatestatus",headerName:"Candidate Status",headerClassName:'super-app-theme--header',width:240,
            renderCell:(params)=>{
                return (
                    <span className={`border p-2 ${params.row.candidate_status === 'Pending' ? ("border-yellow-500 bg-yellow-100") : ("border-orange-400 bg-orange-200")}  rounded-md`}>{cstatus.get(params.row.candidate_status)}</span>
                )
            }
        },
        {
            field: 'submited', headerName: "Submitted", headerClassName: 'super-app-theme--header', width: 200,
            renderCell: (params) => {
              return (
                <div className="flex mt-5 h-full flex-col gap-1">
                  <span className="text-md leading-5">{getDate(params.row.create_date
)}</span>
                  <span className="text-sm text-gray-400">({getDays(params.row.create_date)} days ago)</span>
                </div>
              )
            }
          },
          {
            field: "updated", headerName: "Last Updated", headerClassName: 'super-app-theme--header', width: 200,
            renderCell: (params) => {
              return (
                <div className="flex mt-5 h-full flex-col gap-1">
                  <span className="text-md leading-5">{getDate(params.row.update_date)}</span>
                  <span className="text-sm text-gray-400">({getDays(params.row.update_date)} days ago)</span>
                </div>
              )
            }
          }
    ]
  return (
  <div className='custom-div w-full pb-2 p-4'>
    <Box sx={{
      height: 600, width: '100%',
      '& .super-app-theme--header': {
        backgroundColor: '#edf3fd',
      }
    }}>
      <DataGrid
        rowHeight={70}
        rows={candidateRows}
        columns={candidateJobPreviewCol}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSize={8}
        pageSizeOptions={[5, 10]}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            background: 'red', // Set your desired background color here
            color: '#124791', // Optional: Set text color
            fontSize: '1rem',
            fontWeight: 'bold'
          },
        }}
      ></DataGrid>
    </Box>
  </div>  
  )
}
