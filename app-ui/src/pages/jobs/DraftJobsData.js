const getDate=(date)=>{
    let d=new Date(date)
    let d_ate=d.getDate()
    let d_month=d.getMonth()+1
    let d_year=d.getFullYear()
   
    return `${(d_ate<10)?(`0${d_ate}`):(d_ate)}-${(d_month<10)?(`0${d_month}`):(d_month)}-${d_year}`
 }

const getTitleText=(text)=>{
    if(text.length>16){
        text=text.slice(0,16)
        return text+"..."
    }
    return text
}

const getDays=(date)=>{
   const today=new Date()
   const past=new Date(date)

   const timeDifference=today.getTime()-past.getTime()

   const days=Math.floor(timeDifference/(1000 * 60 * 60 * 24))
   return days
}


export const draftJobCol=[
    { field: 'id', headerName: 'ID',headerClassName:'super-app-theme--header', width: 50, },
    {
        field:"jobtitle", headerName:"Job Title",headerClassName:'super-app-theme--header',width:400,
        renderCell:(params)=>{
            return (
                <div className="flex h-full gap-3 place-items-center">
                    <div className="flex h-10 w-6 rounded-lg justify-center place-items-center bg-sky-100">
                        <span className="font-medium text-[1rem] leading-5">D</span>
                    </div>
                    <div className="flex flex-col gap-1 place-items-start">
                       <span className="text-[1rem] leading-5">{params.row.job_id} - {getTitleText(params.row.job_title)}</span>
                       <span className="text-sm font-light">{params.row.country} - {(params.row.city.length>2)?(`${params.row.city[0]}, ${params.row.city[1]} ${params.row.city.length-2}+`):(params.row.city.map((city,index)=> <span key={index}>{city}{(index===params.row.city.length-1)?(""):(", ")} </span>))}</span>
                    </div>
                </div>
            )
        }
    },
    {
        field:"createdon",headerName:"Created On",headerClassName:'super-app-theme--header',width:268,
        renderCell:(params)=>{
            return (
                <div className="flex mt-3 h-full flex-col gap-1">
                    <span className="text-md leading-5">{getDate(params.row.createdAt)}</span>
                    <span className="text-sm text-gray-400">({getDays(params.row.createdAt)} days ago)</span>
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
        createdAt:"12-08-2024"
    }
]