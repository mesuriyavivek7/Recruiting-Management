import CloseIcon from '@mui/icons-material/Close';
export const invoiceCandidateCol= (handleUploadInvoice,handleRemoveInvoiceDocs,handleChangeInvoiceDoc) =>[
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
        field:'invoicedocs',headerName:'Invoice Docs',headerClassName:'super-app-theme--header',width:350,
        renderCell:(params)=>{
            return (
                <div className="flex w-full items-center h-full">
                   {
                     params.row.invoice_status==="Pending"?(

                        <form className="bg-blue-400 hover:bg-blue-500 h-10 rounded-md shadow w-28 flex justify-center items-center">
                            <label htmlFor="upload-invoice" className="text-white  cursor-pointer">Upload Invoice</label>
                            <input onChange={(e)=>handleUploadInvoice(e,params.row.candidate_id)} accept=".pdf,.doc,.docx" id="upload-invoice" type="file" className="hidden"></input>
                        </form>
                     ):(
                        <div className="flex flex-col gap-1">
                           <div className="flex border h-10 px-2 rounded-md items-center bg-gray-50 gap-3">
                             <span className='text-gray-500 text-[15px]'>{params.row.invoice_docs.filename}</span>
                             <button className='cursor-pointer' onClick={()=>handleRemoveInvoiceDocs(params.row.candidate_id)}><CloseIcon style={{fontSize:'20px'}}></CloseIcon></button>
                           </div>
                           <form className='bg-blue-400 rounded-sm text-white flex justify-center items-center h-6'>
                             <label className='cursor-pointer' htmlFor='change-invoice'>Change</label>
                             <input onChange={(e)=>handleChangeInvoiceDoc(e,params.row.candidate_id)} type='file' id='change-invoice' className='hidden'></input>
                           </form>
                        </div>  
                     )
                   }
                </div>
            )
        }
    }

]