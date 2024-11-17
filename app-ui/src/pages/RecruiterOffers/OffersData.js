//importing icons
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const invoiceCandidateCol= (handleViewCandidateInvoice,downloadCandidateInvoice) =>[
    {field: 'id', headerName:'Sr No.',headerClassName:'super-app-theme--header',width:120},
    {
        field:'name&iid',headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:300,
        renderCell:(params)=>{
            return (
              <div className="flex w-full h-full items-center gap-4">
                  <span className="h-7 rounded-full flex text-[14px] justify-center items-center w-7 bg-blue-400 text-white">{params.row.candidate_name[0].toUpperCase()}</span>
                  <div className="flex flex-col gap-1">
                      <span className='text-[14px] leading-5 text-blue-400'>{params.row.c_id}</span>
                      <p className='text-[15px] leading-5 text-blue-400'>{params.row.candidate_name}</p> 
                  </div>
              </div>
           )
          },
          sortComparator: (v1, v2, param1, param2) => {
            const name1 = param1.row.candidate_name || ""; // Default to empty string if undefined
            const name2 = param2.row.candidate_name || "";
            return name1.toLowerCase().localeCompare(name2.toLowerCase());
          },
    },
    {
        field:"jobid&title",headerName:'Uphire Job Id/Name',headerClassName:'super-app-theme--header',width:300,
        renderCell:(params)=>{
          return (
           <div className='flex w-full h-full gap-4 items-center'>
              <span className="flex h-6 w-6 rounded-md justify-center items-center bg-green-400 text-white">{params.row.job_name[0].toUpperCase()}</span>
              <div className="flex flex-col gap-1">
                 <span className="text-[14px] leading-5 text-blue-400">{params.row.job_id}</span>
                 <p className="text-[15px] leading-5 text-blue-400">{params.row.job_name}</p>
              </div>
           </div>
          )
        },
        sortComparator: (v1, v2, param1, param2) => {
            const name1 = param1.row.job_name || ""; // Default to empty string if undefined
            const name2 = param2.row.job_name || "";
            return name1.toLowerCase().localeCompare(name2.toLowerCase());
        },
    },
    {
        field:'invoicestatus',headerName:'Invoice Status',headerClassName:'super-app-theme--header',width:280,
        renderCell:(params)=>{
            return (
                <div className="flex w-full items-center h-full">
                    <span className={`h-8 flex rounded-md items-center justify-center w-28 ${params.row.invoice_status==="Pending"?("bg-yellow-300"):("bg-green-400")} text-white font-semibold`}>{params.row.invoice_status}</span>
                </div>
            )
        }
    },
    {
        field:'invoicedocs',headerName:'Invoice Docs',headerClassName:'super-app-theme--header',width:320,
        renderCell:(params)=>{
            return (
                <div className="flex w-full items-center h-full">
                   {
                    params.row.invoice_status==="Pending"?(
                        <span>-</span>
                    ):(
                        <div className="flex bg-gray-50 border h-12 px-2 rounded-md items-center gap-4">
                          <span className="text-[15px]">{params.row.invoice_docs.filename}</span>
                          <div className="flex items-center gap-2">
                             <span onClick={()=>handleViewCandidateInvoice(params.row.candidate_id)} className='text-gray-500 cursor-pointer hover:text-black'><DescriptionOutlinedIcon style={{fontSize:"1.4rem"}}></DescriptionOutlinedIcon></span>
                             <span onClick={()=>downloadCandidateInvoice(params.row.candidate_id)} className='text-gray-500 cursor-pointer hover:text-black'><FileDownloadOutlinedIcon style={{fontSize:"1.4rem"}}></FileDownloadOutlinedIcon></span>
                          </div>
                        </div>
                    )
                   }
                </div>
            )
        }
    }

]