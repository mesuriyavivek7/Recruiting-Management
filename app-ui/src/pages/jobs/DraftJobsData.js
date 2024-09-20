
export const draftJobCol=[
    { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 70, },
    {
        field:"jobtitle", headerName:"Job Title",headerClassName:'super-app-theme--header',width:400,
        renderCell:(params)=>{
            return (
                <div className="flex h-full gap-2 place-items-center">
                    <div className="flex h-10 w-6 rounded-lg justify-center place-items-center bg-sky-100">
                        <span className="font-medium text-[1rem] leading-5">D</span>
                    </div>
                    <div className="flex flex-col gap-1 place-items-start">
                       <span className="text-[1rem] leading-5">{params.row.job_id} - {params.row.job_title}</span>
                       <span className="text-sm font-light">{params.row.country} - {(params.row.city.length>2)?(`${params.row.city[0]}, ${params.row.city[1]} ${params.row.city.length-2}+`):(params.row.city.map((city,index)=> <span key={index}>{city}, </span>))}</span>
                    </div>
                </div>
            )
        }
    },
    {
        field:"createdon",headerName:"Created On",headerClassName:'super-app-theme--header',width:248,
        renderCell:(params)=>{
            return (
                <div className="flex mt-3 h-full flex-col gap-1">
                    <span className="text-md leading-5">{params.row.created_at}</span>
                    <span className="text-sm text-gray-400">(3 days ago)</span>
                </div>
            )
        }
    },
    {
        field:"recruiter",headerName:"Recruiter",headerClassName:'super-app-theme--header',width:360,
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
]

export const draftJobRow=[
    {
        id:1,
        job_id:"Jsnds",
        job_title:"React js Developer",
        full_name:"Akshay Patel",
        country:"India",
        city:["Delhi","Mumbai"],
        created_at:"12-08-2024"
    }
]