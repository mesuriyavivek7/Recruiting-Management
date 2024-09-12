import React from 'react'
//importing data grid
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'

//importing data fir pastjobs
import { pastJobCol,pastJobRow } from '../../pages/jobs/PastJobsData'

export default function PastJobs() {
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
            rows={pastJobRow}
            columns={pastJobCol}
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
