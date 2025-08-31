import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncIcon from '@mui/icons-material/Sync';

export const invoiceCandidateCol= (candiadteStatusChange, handleUploadInvoiceDoc, offerLoader, handleRemoveInvoice) =>[
    {field: 'id', headerName:'Sr No.',headerClassName:'super-app-theme--header',width:120},
    {
        field:'name&iid',headerName:'Candidate Name/CID',headerClassName:'super-app-theme--header',width:300,
        renderCell:(params)=>{
            return (
              <div className="flex w-full h-full items-center gap-4">
                  <span className="h-7 rounded-full flex text-[14px] justify-center items-center w-7 bg-blue-400 text-white">{params.row.candidate_name[0].toUpperCase()}</span>
                  <div className="flex flex-col gap-1">
                      <span className='text-[14px] leading-5 text-blue-400'>{params.row.candidate_id}</span>
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
        field:"jobid&title",headerName:'Job Id/Name',headerClassName:'super-app-theme--header',width:300,
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
      field:'candidate_status', headerName:'Candidate Status', headerClassName:'super-app-theme--header', width:280,
      renderCell:(params) =>{
        return (
            <div className='flex w-full h-full justify-start items-center'>
                <select value={params.value} onChange={(e)=>candiadteStatusChange(e, params.row._id)} className='border p-2 border-netural-300 rounded-md'>
                    <option value={'success-joined'}>Successfully Joined</option>
                    <option value={'early-registration'}>Early Resignation</option>
                    <option value={'invoice-raised'}>Invoice Raised</option>
                    <option value={'payment-received'}>Payment Received</option>
                    <option value={'credit-note'}>Credit Note</option>
                </select>
            </div>
        )
      }
    },
    {
        field:'invoicestatus',headerName:'Invoice Status',headerClassName:'super-app-theme--header',width:220,
        renderCell:(params)=>{
            return (
                <div className="flex w-full items-center h-full">
                    <span className={`h-8 flex rounded-md items-center justify-center w-28 ${params.row.invoice_status==="Payable"?("bg-green-300"):("bg-yellow-400")} text-white font-semibold`}>{params.row.invoice_status}</span>
                </div>
            )
        }
    },
    {
        field:'designation', headerName:'Designation', headerClassName:'super-app-theme--header', width: 200,
        renderCell: (params) => {
            return (
                <div className='flex w-full items-center h-full'>
                    <span>{params.value}</span>
                </div>
            )
        }
    },
    {
        field:'location', headerName:'Location', headerClassName:'super-app-theme--header', width:200, 
        renderCell: (params) => {
            return (
                <div className='flex w-full items-center h-full'>
                   <span>{params.value}</span>
                 </div>
            )
        }
    },
    {
        field:'offer_ctc', headerName:'Offer CTC', headerClassName:'super-app-theme--header', width: 200,
        renderCell: (params) => {
            return (
              <div className='flex w-full items-center h-full'>
                <span>₹{params.value}</span>
              </div>
            )
        }
    },
    {
        field:'offerletter', headerName:'Offer Letter', headerClassName:'super-app-theme--header', width: 220,
        renderCell: (params) => {
            return (
                <div className="flex w-full items-center h-full">
                    {
                        params.row.offerletter ? 
                        <div className="flex items-center gap-2">
                             <a href={params.row.offerletter} target="_blank" className="bg-blue-500 leading-5 rounded-md text-white p-2 rounded-md">View Offer Letter</a>
                             <button onClick={()=>handleRemoveInvoice(params.row._id, params.row.job_id)}><DeleteOutlineIcon className='text-red-500 cursor-pointer'></DeleteOutlineIcon></button>
                        </div>
                        :
                        <div> 
                            <label htmlFor="offerletter" className="bg-green-500 w-36 cursor-pointer text-white leading-5 rounded-md p-2">
                            {offerLoader ? 
                              <SyncIcon className='animate-spin'></SyncIcon>
                              :"Upload Offer Letter"
                            }
                           </label>
                        <input 
                          disabled={offerLoader}
                          onChange={(e) => handleUploadInvoiceDoc(e, params.row._id, params.row.job_id)} 
                          id="offerletter" 
                          type="file" 
                          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                          className="hidden"
                         />
                        </div>
                    }

                      
                </div>
            )
        }
    }

]