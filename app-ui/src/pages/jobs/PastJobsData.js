//coumn for past job data
//<span className="text-sm font-light">{params.row.conutry} - {(params.row.city.length>2)?(`${params.row.city[0]},${params.row.city[1]} ${params.row.city.length-2}+`):(params.row.city.map((city,index)=> <span key={index}>{city},</span>))}</span>
export const pastJobCol=[
    { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 70, },
    {
        field:"jobtitle",headerClassName:'super-app-theme--header', headerName:"Job Title",width:400,
        renderCell:(params)=>{
            return (
                
                 <div className="h-full flex gap-2 items-center">
                    <div className={`flex h-10 w-6 rounded-lg justify-center place-items-center ${(params.row.job_status==="Active")?("bg-green-100"):("bg-yellow-100")}`}>
                        <span className={`${(params.row.job_status==="Active")?("text-green-500"):("text-yellow-500")} text-sm font-medium`}>{(params.row.job_status==="Active")?("A"):("P")}</span>
                    </div>
                    <div className="flex gap-1 flex-col place-items-start">
                       <span className="text-[1rem] leading-5 font-medium">{params.row.job_id} - {params.row.job_title}</span>
                       <span className="text-sm font-light">{params.row.conutry} - {(params.row.city.length>2)?(`${params.row.city[0]},${params.row.city[1]} ${params.row.city.length-2}+`):(params.row.city.map((city,index)=> <span key={index}>{city},</span>))}</span>
                    </div>
                 </div>
                
            )
        }
    },
    {
        field:"createdon",headerClassName:'super-app-theme--header',headerName:"Created On",width:200,
        renderCell:(params)=>{
            return (
                <div className="h-full mt-3 flex flex-col gap-1">
                    <span className="text-md leading-5">{params.row.created_at}</span>
                    <span className="text-sm text-gray-400 leading-5">(3 days ago)</span>
                </div>
            )
        }
    },
    {
        field:"recruiter",headerClassName:'super-app-theme--header',headerName:"Recruiter",width:308,
        renderCell:(params)=>{
            return (
                <div className="flex h-full gap-2 items-center">
                   <div className="bg-blue-400 h-6 w-6 flex justify-center place-items-center rounded-full">
                       <span className="text-[1.1rem] leading-5 text-white">{params.row.full_name[0].toUpperCase()}</span>
                   </div>
                   <span className="text-[1rem] leading-5">{params.row.full_name}</span>
                </div>
            )
        }
    },
    {
        field:'status',headerClassName:'super-app-theme--header',headerName:"Status",width:300,
        renderCell:(params)=>{
            return (
                <div className="flex items-center h-full">
                  <div className={`${(params.row.job_status==="Active")?("bg-green-100"):("bg-yellow-100")} rounded-md flex justify-center items-center h-8 p-1 px-2`}>
                  <span className={`${(params.row.job_status==="Active")?("text-green-500"):("text-yellow-500")} text-sm`}>{params.row.job_status}</span>
                  </div>
                </div>
            )
        }
    }
]

export const pastJobRow=[
    {
        id:1,
        job_id:"J12SS",
        job_title:"Java Developer",
        job_status:'Pending',
        created_at:'12-08-2024',
        conutry:"India",
        full_name:"vivek mesuriya",
        city:["Ahmedabad","Amreli","Rajkot"]
    }
]