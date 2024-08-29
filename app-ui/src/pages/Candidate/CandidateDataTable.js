//importing icons
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

//column for candidate data
export const candidateCol=[
    { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 70, },
    {
        field:"name&id",headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:200, 
        renderCell:(params)=>{
          return (
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                    <p className='text-sm text-blue-400'>{params.row.name}</p>
                    <span className='text-sm text-blue-400'>{params.row.cid}</span>
                </div>
                <div className="flex gap-2">
                    <span className='text-blue-400 cursor-pointer'><DescriptionIcon style={{fontSize:'1.3rem'}}/></span>
                    <span className='text-blue-400 cursor-pointer'><FileDownloadIcon style={{fontSize:'1.3rem'}}/></span>
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
            <div className='flex gap-1 items-center'>
               <span className={`${(params.row.jobstatus==="Active")?("text-green-800 bg-green-200"):("text-red-800 bg-red-400")} h-6 w-6 rounded-md border text-sm flex justify-center items-center`}>{(params.row.jobstatus==="Active")?("A"):("N")}</span>
               <div className='flex flex-col'>
                 <span className='text-sm'>{params.row.jobid}-{params.row.jobtitle}</span>
                 <span className='text-sm'>{params.row.jobcountry} - {params.row.jobcity}</span>
               </div>
            </div>
           </div>
          )
          }
    },
    {
        field:"cstatus",headerName:"Candidate Status",headerClassName:'super-app-theme--header',width:200,
        renderCell:(params)=>{
            return (
                <select className='input-field' value={params.row.cstatus}>
                    <option value='newresume'><div className='bg-blue-400 p-1 rounded-full'></div>New Resume</option>
                    <option value='rs-cc'><div className='bg-purple-400 p-1 rounded-full'></div>Resume Select - Client Recruiter</option>
                    <option value='rs-hm'><div className='bg-purple-400 p-1 rounded-full'></div>Resume Select - Hiring Manager</option>
                    <option value='test-process'><div className='bg-purple-400 p-1 rounded-full'></div>Test in Process</option>
                    <option value='interview-process'><div className='bg-purple-400 p-1 rounded-full'></div>Interview in Process</option>
                    <option value='no-show'><div className='bg-purple-400 p-1 rounded-full'></div>No Show</option>
                    <option value='candidate-not-ins'><div className='bg-orange-400 p-1 rounded-full'></div>Candidate Not Interested</option>
                    <option value='candidate-not-reach'><div className='bg-orange-400 p-1 rounded-full'></div>Candidate Not Reachable</option>
                    <option value='rr-cc'><div className='bg-red-400 p-1 rounded-full'></div>Resume Reject - Client Recruiter</option>
                    <option value='rr-hm'><div className='bg-red-400 p-1 rounded-full'></div>Resume Reject - Hiring Manager</option>
                    <option value='r-test'><div className='bg-red-400 p-1 rounded-full'></div>Resueme in Test</option>
                    <option value='rjt-tech-itw'><div className='bg-red-400 p-1 rounded-full'></div>Resume Reject in Tech Interview</option>
                    <option value='rjt-hr-itw'><div className='bg-red-400 p-1 rounded-full'></div>Rejected in HR Interview</option>
                    <option value='s-f-itw'><div className='bg-green-400 p-1 rounded-full'></div>Selected in Final Interview</option>
                    <option value='s-not-offer'><div className='bg-green-400 p-1 rounded-full'></div>Selected - Won't be Offered</option>
                    <option value='o-released'><div className='bg-green-400 p-1 rounded-full'></div>Offer Released</option>
                    <option value='o-accepted'><div className='bg-green-400 p-1 rounded-full'></div>Offer Accepted</option>
                    <option value='o-rejected'><div className='bg-green-400 p-1 rounded-full'></div>Offer Rejected</option>
                    <option value='c-not-joine'><div className='bg-green-400 p-1 rounded-full'></div>Candidate Not Joined</option>
                    <option value='c-joine'><div className='bg-green-400 p-1 rounded-full'></div>Candidate Joined</option>
                    <option value='quit-after-joine'><div className='bg-green-400 p-1 rounded-full'></div>Quit After Joining</option>
                    <option value='on-hold'><div className='bg-sky-400 p-1 rounded-full'></div>On Hold</option>
                    <option value='no-action'><div className='bg-sky-400 p-1 rounded-full'></div>No Further Action</option>
                    <option value='use-later'><div className='bg-sky-400 p-1 rounded-full'></div>Use Later</option>
                </select>
            )
        }
    },
    {
        field:'submited',headerName:"Submitted",headerClassName:'super-app-theme--header',width:150,
    },
    {
        field:"last_uapdated",headerName:"Last Updated",headerClassName:'super-app-theme--header',width:150,
    },
    {
        field:"notice_period",headerName:"Notice Period",headerClassName:'super-app-theme--header',width:180
    },
    {
        field:'email&mobile',headerName:"Email/Mobile",headerClassName:'super-app-theme--header',width:200,
        renderCell:(params)=>{
            return (
              <div className='flex w-full h-full items-center'>
               <div className='flex flex-col gap-1'>
                 <span className='text-sm'>{params.row.email}</span>
                 <span className='text-sm'>{params.row.mobile}</span>
               </div>
               </div>
            )
        }
    },
    {
      field:'recruiter', headerName:"Recruiter", headerClassName:'super-app-theme--header', width:200
    },
    {
      field:'vendor', headerName:'UPHIRE vendor',  headerClassName:'super-app-theme--header',width:200
    },
    {
      field:'remarks',headerName:'Remarks' , headerClassName:'super-app-theme--header'
    }
]


//candidate data
export const candidateRow=[
    {
      id:1,
      cid:"37763",
      name:"Priyank Patel",
      jobstatus:"Active",
      jobid:"119121",
      jobtitle:"Softwere Engineer",
      jobcity:'Ahmedabad',
      jobcountry:'india',
      cstatus:'no-show',
      submited:'11 Jun 23',
      last_uapdated:'15 Jun 23',
      notice_period:'45-60 Days',
      email:'priyankpatel@gmial.com',
      mobile:'+91-8789387928',
      recruiter:'john doe',
      vendor:'uphire',
      remarks:"Nothing"

    },
    {   id:2,
        cid:"37763",
        name:"Priyank Patel",
        jobstatus:"Active",
        jobid:"119121",
        jobtitle:"Softwere Engineer",
        jobcity:'Ahmedabad',
        jobcountry:'india',
        cstatus:'no-show',
        submited:'11 Jun 23',
        last_uapdated:'15 Jun 23',
        notice_period:'45-60 Days',
        email:'priyankpatel@gmial.com',
        mobile:'+91-8789387928',
        recruiter:'john doe',
      vendor:'uphire',
      remarks:"Nothing"
      },
      { id:3,
        cid:"37763",
        name:"Priyank Patel",
        jobstatus:"Active",
        jobid:"119121",
        jobtitle:"Softwere Engineer",
        jobcity:'Ahmedabad',
        jobcountry:'india',
        cstatus:'no-show',
        submited:'11 Jun 23',
        last_uapdated:'15 Jun 23',
        notice_period:'45-60 Days',
        email:'priyankpatel@gmial.com',
        mobile:'+91-8789387928',
        recruiter:'john doe',
      vendor:'uphire',
      remarks:"Nothing"
      },
      {
        id:4,
        cid:"37763",
        name:"Priyank Patel",
        jobstatus:"Active",
        jobid:"119121",
        jobtitle:"Softwere Engineer",
        jobcity:'Ahmedabad',
        jobcountry:'india',
        cstatus:'no-show',
        submited:'11 Jun 23',
        last_uapdated:'15 Jun 23',
        notice_period:'45-60 Days',
        email:'priyankpatel@gmial.com',
        mobile:'+91-8789387928',
        recruiter:'john doe',
      vendor:'uphire',
      remarks:"Nothing"
      },
      {
        id:5,
        cid:"37763",
        name:"Priyank Patel",
        jobstatus:"Active",
        jobid:"119121",
        jobtitle:"Softwere Engineer",
        jobcity:'Ahmedabad',
        jobcountry:'india',
        cstatus:'no-show',
        submited:'11 Jun 23',
        last_uapdated:'15 Jun 23',
        notice_period:'45-60 Days',
        email:'priyankpatel@gmial.com',
        mobile:'+91-8789387928',
        recruiter:'john doe',
      vendor:'uphire',
      remarks:"Nothing"
      },
    
]