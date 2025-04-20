import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux';

//Importing icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import { acmanagerJobsCols, getAllAcmanagerJobs } from './Job/RowColDataOfAll'

function AcmanagerJobs() {
  const {userData} = useSelector((state) => state.admin);
  const navigate = useNavigate()
  const [searchQuery,setSearchQuery] = useState('')

  const handleNavigate = () =>{
     navigate('postjob')
  }

  const handleNavigateJobEdit = (id) =>{
    navigate('postjob',{state:id})
  }

  const [acManagerJobs,setAcManagerJobs] = useState([])
  const [filterJobs,setFilterJobs] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    const filterData = () =>{
      if(searchQuery){
        setFilterJobs(acManagerJobs.filter((job)=>job.job_basic_details.job_title.toLowerCase().includes(searchQuery.toLowerCase())))
      }else{
        setFilterJobs(acManagerJobs)
      }
      
    }
  
    filterData()
  },[searchQuery,acManagerJobs])


  useEffect(()=>{
    const fetchData = async () =>{
      try{
         setLoading(true)
         const response = await getAllAcmanagerJobs(userData._id)
         console.log(response)
         setAcManagerJobs(response.map((item,index)=>({id:index+1,...item})))
      }catch(err){
          console.log(err)
      }finally{
        setLoading(false)
      }
    }

    fetchData()
  },[])

  const handleRowClick = async (params) => {
    const job_id = params?.row?.job_id;
    navigate(`/account_manager/myjobs/${job_id}`);
  };
  
  return (
    <div className='flex h-full flex-col gap-4'>
       <div className='p-4 flex custom-shadow-1 items-center justify-between bg-white rounded-md'>
          <h1 className='font-medium text-xl'>My Jobs</h1>
          <div className='flex items-center gap-2'>
            <div className='flex border rounded-md items-center px-2'>
              <span><SearchOutlinedIcon></SearchOutlinedIcon></span>
              <input onChange={(e)=>setSearchQuery(e.target.value)} type='text' className='outline-none p-2' placeholder='Search Job Here...'></input>
            </div>
            <button onClick={handleNavigate} className='bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white rounded-md p-2'>Post New Job</button>
          </div>
       </div>
       <div className="h-[580px] py-5 px-4 custom-shadow rounded-md bg-white">
          <Box
            sx={{
              height: "100%",
              "& .super-app-theme--header": {
                // backgroundColor: "#edf3fd",
              },
            }}
          >
            <DataGrid
              rowHeight={80}
              rows={filterJobs}
              onRowClick={(params) => handleRowClick(params)}
              columns={acmanagerJobsCols(handleNavigateJobEdit)}
              pageSize={8}
              loading={loading}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
              pageSizeOptions={[5, 10]}
            />

          </Box>
        </div>
    </div>
  )
}
// bg-[#f3f4f6]
export default AcmanagerJobs