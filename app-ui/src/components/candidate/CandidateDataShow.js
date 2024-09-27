import React, { useState } from 'react'
//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';

//importing loader
import WhiteLoader from '../../assets/whiteloader.svg'

//importing icons
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function CandidateDataShow({showNotification,loader,rows,refetchCandidateData}) {
 const [candidateStatusLoader,setCandidateStatusLoader]=useState(false)
 const [remarksLoader,setRemarksLoader]=useState(false)

 const [remarks,setRemarks]=useState(null)

const getDate=(date)=>{
  let d=new Date(date)
  let d_ate=d.getDate()
  let d_month=d.getMonth()+1
  let d_year=d.getFullYear()
 
  return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
}


const getDays=(date)=>{
  const today=new Date()
  const past=new Date(date)

  const timeDifference=today.getTime()-past.getTime()

  const days=Math.floor(timeDifference/(1000 * 60 * 60 * 24))
  return days
}

const candiadteStatusChange=async (e,id)=>{
    try{
      setCandidateStatusLoader(true)
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/changecandidatestatus/${id}`,{status:e.target.value})
      await refetchCandidateData()
    }catch(err){
      setCandidateStatusLoader(false)
      showNotification("Something wrong while changeing candidate status.","failure")
      console.log(err)
    }
    setCandidateStatusLoader(false)
}


const viewCandidateResume=async (cid)=>{
    try{
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/getresumefilename/${cid}`)
       const correctUrl = `http://localhost:8080/resumedocs/${res.data}`;
       if(res.data){
        window.open(correctUrl,'_blank')
       }
    }catch(err){
        console.log(err)
        showNotification("Something went wrong while opening resume doc.","failure")
    }
}

const downloadCandidateResume=async (cid)=>{
    try{
       //Fetch which type of resume file get
       const fileExtension=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/resumefilepath/${cid}`)
       //Fetch download resume file
       const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidate/downloadresumedocs/${cid}`,{
        responseType: 'blob',  // Expect a blob in response
       })

      // Set the MIME type based on the file extension
      let mimeType;
      switch (fileExtension.data) {
          case '.pdf':
              mimeType = 'application/pdf';
              break;
          case '.doc':
              mimeType = 'application/msword';
              break;
          case '.docx':
              mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              break;
          default:
              showNotification("File is not supported for download.","failure")
              console.error('Unsupported file type');
              return;
      }

       if(res.status===200){
          const blob = new Blob([res.data], { type: mimeType });
          const url=window.URL.createObjectURL(blob)
          const link=document.createElement('a')
          link.href=url
          link.setAttribute('download','candidateresume')
          document.body.appendChild(link)
          link.click()
          link.remove()
       }else{
         showNotification("File download failed.","failure")
       }
    }catch(err){
       console.log(err)
       showNotification("Something went wrong while downloading candidate documents.","failure")
    }
}


const updateCandidateRemarks=async (id)=>{
      try{
         setRemarksLoader(true)
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/updatecandidateremarks/${id}`,{remarks})
      }catch(err){
         setRemarksLoader(false)
         console.log(err)
         showNotification("Something went wrong while updating Remarks.","failure")
      }
      setRemarksLoader(false)
}

//column for candidate data
const candidateCol=[
  { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 70, },
  {
      field:"name&id",headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:250, 
      renderCell:(params)=>{
        return (
          <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                  <p className='text-sm text-blue-400'>{params.row.candidate_full_name}</p>
                  <span className='text-sm text-blue-400'>{params.row.candidate_id}</span>
              </div>
              <div className="flex gap-2">
                  <span onClick={()=>viewCandidateResume(params.row.candidate_id)} className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.3rem'}}/></span>
                  <span onClick={()=>downloadCandidateResume(params.row.candidate_id)} className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.3rem'}}/></span>
              </div>
          </div>
       )
      }
  },
  {
      field:"jobid&title",headerName:'Uphire Job Id/Name',headerClassName:'super-app-theme--header',width:250,
      renderCell:(params)=>{
        return (
         <div className='flex w-full h-full items-center'>
          <div className='flex gap-2 items-center'>
             <span className={`${(params.row.job_status==="Active")?("text-green-800 bg-green-200"):("text-red-800 bg-red-400")} h-6 w-6 rounded-md border text-sm flex justify-center items-center`}>{(params.row.job_status==="Active")?("A"):("N")}</span>
             <div className='flex flex-col gap-1'>
               <span className='text-sm'>{params.row.job_id} - {params.row.job_title}</span>
               <span className='text-sm'>{params.row.job_country} - {params.row.job_city}</span>
             </div>
          </div>
         </div>
        )
        }
  },
  {
      field:"cstatus",headerName:"Candidate Status",headerClassName:'super-app-theme--header',width:230,
      renderCell:(params)=>{
          return (
              <select 
              className='input-field'
              value={params.row.candidate_status}
              onChange={(e)=>candiadteStatusChange(e,params.row.id)}
              >
                  <option value='newresume'>New Resume</option>
                  <option value='rs-cc'>Resume Select - Client Recruiter</option>
                  <option value='rs-hm'>Resume Select - Hiring Manager</option>
                  <option value='test-process'>Test in Process</option>
                  <option value='interview-process'>Interview in Process</option>
                  <option value='no-show'>No Show</option>
                  <option value='candidate-not-ins'>Candidate Not Interested</option>
                  <option value='candidate-not-reach'>Candidate Not Reachable</option>
                  <option value='rr-cc'>Resume Reject - Client Recruiter</option>
                  <option value='rr-hm'>Resume Reject - Hiring Manager</option>
                  <option value='r-test'>Resueme in Test</option>
                  <option value='rjt-tech-itw'>Resume Reject in Tech Interview</option>
                  <option value='rjt-hr-itw'>Rejected in HR Interview</option>
                  <option value='s-f-itw'>Selected in Final Interview</option>
                  <option value='s-not-offer'>Selected - Won't be Offered</option>
                  <option value='o-released'>Offer Released</option>
                  <option value='o-accepted'>Offer Accepted</option>
                  <option value='o-rejected'>Offer Rejected</option>
                  <option value='c-not-joine'>Candidate Not Joined</option>
                  <option value='c-joine'>Candidate Joined</option>
                  <option value='quit-after-joine'>Quit After Joining</option>
                  <option value='on-hold'>On Hold</option>
                  <option value='no-action'>No Further Action</option>
                  <option value='use-later'>Use Later</option>
              </select>
          )
      }
  },
  {
      field:'submited',headerName:"Submitted",headerClassName:'super-app-theme--header',width:160,
      renderCell:(params)=>{
        return (
            <div className="flex mt-5 h-full flex-col gap-1">
                <span className="text-md leading-5">{getDate(params.row.submited)}</span>
                <span className="text-sm text-gray-400">({getDays(params.row.submited)} days ago)</span>
            </div>
        )
    }
  },
  {
      field:"updated",headerName:"Last Updated",headerClassName:'super-app-theme--header',width:160,
      renderCell:(params)=>{
        return (
            <div className="flex mt-5 h-full flex-col gap-1">
                <span className="text-md leading-5">{getDate(params.row.updated)}</span>
                <span className="text-sm text-gray-400">({getDays(params.row.updated)} days ago)</span>
            </div>
        )
    }
  },
  {
      field:"notice_period",headerName:"Notice Period",headerClassName:'super-app-theme--header',width:170,
      renderCell:(params)=>{
          return (
            <div className='flex mt-7'>
              <span className='text-md leading-5'>{params.row.notice_period} Days</span>
            </div>
          )
      }
  },
  {
      field:'email&mobile',headerName:"Email/Mobile",headerClassName:'super-app-theme--header',width:280,
      renderCell:(params)=>{
          return (
            <div className='flex w-full h-full items-center'>
             <div className='flex flex-col gap-1'>
               <span className='text-sm'>{params.row.candidate_email_address}</span>
               <span className='text-sm'>+{params.row.candidate_mobile_number}</span>
             </div>
             </div>
          )
      }
  },
  {
    field:'recruiter_name', headerName:"Recruiter", headerClassName:'super-app-theme--header', width:200,
    renderCell:(params)=>{
       return (
          <div className='flex gap-1 mt-7 items-center'>
             <span className='h-7 w-7 font-bold rounded-full text-white text-[15px] flex justify-center items-center bg-blue-400'>{params.row.recruiter_name[0].toUpperCase()}</span>
             <span className='text-sm'>{params.row.recruiter_name}</span>
          </div>
       )
    }
  },
  {
    field:'remarks',headerName:'Remarks' , headerClassName:'super-app-theme--header',width:200,
    renderCell:(params)=>{
      return (
        <div>
           <input
           type='text'
           className='input-field'
           value={(remarks===null)?(params.row.remarks):(remarks)}
           onFocus={()=>setRemarks(params.row.remarks)}
           onChange={(e)=>setRemarks(e.target.value)}
           onBlur={()=>updateCandidateRemarks(params.row.id)}
           ></input>
        </div>
      )
    }
  }
]

  
  return (
   <div className='custom-div'>
     {
      candidateStatusLoader && 
       <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
         <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update resume status.</p>
         </div>
       </div>
     }
     {remarksLoader && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
         <div className='custom-div w-[450px] p-4 items-center'>
            <img className='h-10 w-10' alt='' src={WhiteLoader}></img>
            <p>Please wait till we update candidate remarks.</p>
         </div>
       </div>
     }
     <Box sx={{
      height:600,width:'100%',
      '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        },
     }}>
      <DataGrid
      rowHeight={90}
      rows={rows}
      columns={candidateCol}
      loading={loader}
      initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
     pageSize={8}
     pageSizeOptions={[5,10]}
     checkboxSelection
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
