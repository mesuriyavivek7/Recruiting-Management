import React,{useContext,useState,useEffect} from 'react'


//importing icons
import MenuIcon from '@mui/icons-material/Menu';
import BackupTableIcon from '@mui/icons-material/BackupTable';


import axios from "axios"
import { AuthContext } from '../../context/AuthContext';
import Notification from "../../components/Notification";



//importing components
import RecruiterCandidateDataShow from '../../components/candidate/RecruiterCandidateDataShow';
import RecruiterCandidateStatus from '../../components/statuschange/RecruiterCandidateStatus';

export default function RecruiterCandidate() {
    const {user}=useContext(AuthContext)
    const [dataView,setDataView]=useState('List')
    const [candidaterows,setCandidateRows]=useState([])
    const [candidateLoader,setCandidateLoader]=useState(false)


  const [notification,setNotification]=useState(null)

  //for showing notification
   const showNotification=(message,type)=>{
     setNotification({message,type})
   }


  const fetchCandidateData=async ()=>{
    setCandidateLoader(true)
   try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/getcandidatedetails/${user._id}`)
      setCandidateRows(res.data)
   }catch(err){
      showNotification("Something wrong while fetching candidadte data","failure")
      console.log(err)
   }
   setCandidateLoader(false)
}

  useEffect(()=>{
     fetchCandidateData()
  },[dataView])

 

  return (
    <div className='relative flex flex-col gap-2'>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
       <div className='custom-div flex flex-row justify-between'>
          <div className='flex gap-4'>
             <h1>Candidates</h1>
             <div className='flex gap-2'>
                <span>0</span>
                <span className='text-gray-400'>Jobs</span>
             </div>
             <div className='flex gap-2'>
                <span>{candidaterows.length}</span>
                <span className='text-gray-400'>Candidates</span>
             </div>
          </div>
          <div className='relative flex gap-8'>
             <div onClick={()=>setDataView((prevView)=>(prevView==="Status")?("List"):("Status"))} className='flex cursor-pointer text-sm text-gray-800 items-center gap-2'>
                <span><MenuIcon></MenuIcon></span>
                {
                  (dataView==="List")?(<span>Switch To Status View</span>):(<span>Switch To List View</span>)
                }
             </div>
             
             <div className='flex cursor-pointer text-sm text-gray-800 items-center gap-2'>
                <span><BackupTableIcon></BackupTableIcon></span>
                <span>Export</span>
             </div>
          </div>
             
        </div>
        {
           (dataView==="List")?(
               <RecruiterCandidateDataShow showNotification={showNotification} refetchCandidateData={fetchCandidateData} loader={candidateLoader} rows={candidaterows}></RecruiterCandidateDataShow>
           ):(
                  <RecruiterCandidateStatus showNotification={showNotification} refetchCandidateData={fetchCandidateData} loader={candidateLoader} candidateData={candidaterows} />
           )
        }
    </div>
  )
}
