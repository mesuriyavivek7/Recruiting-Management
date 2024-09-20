import React, { useContext, useEffect, useState } from "react";
import PastJobs from "../../components/jobs/PastJobs";
import { Link } from "react-router-dom";
import DraftJobs from "../../components/jobs/DraftJobs";
import Notification from "../../components/Notification";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const JobPostings = () => {
  const {user}=useContext(AuthContext)
  const [activeState, setActiveState] = useState(1);
  const [draftLoad,setDraftLoad]=useState(false)
  const [draftRows,setDraftRows]=useState([])
  const [pastLoad,setPastLoad]=useState(false)
  const [pastRows,setPastRows]=useState([])
  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
   setNotification({message,type})
 }


 const fetchingDraftData=async ()=>{
  try{
     setDraftLoad(true)
     const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getalljobdraftdetails/${user._id}`)
     setDraftRows(()=>res.data.map((item,index)=>({...item,full_name:user.full_name,id:index+1})))
  }catch(err){
    console.log(err)
    showNotification("Error while fetching data..!","failure")
  }
  setDraftLoad(false)
}


const fetchingPastData=async ()=>{
  try{
    setPastLoad(true)
    const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job/getalljobdetails/${user._id}`)
    setPastRows(()=> res.data.map((item,index)=> ({...item,full_name:user.full_name,id:index+1})))
  }catch(err){
    console.log(err)
    showNotification("Error While fetching data..!","failure")
  }
  setPastLoad(false)
}


useEffect(()=>{
    fetchingDraftData()
    fetchingPastData()
},[])

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className="custom-div w-full min-h-screen">
      <div className="w-full relative flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Post a Job</h2>

        <Link to="postjob">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Post a new Job
          </button>
        </Link>
      </div>

      <div className="px-4 py-2 w-full relative">
        <ul className="flex space-x-4 mb-4 text-blue-600">
          <li
            className={` ${
              activeState === 1
                ? "border-blue-400 border-b-2 text-blue-400"
                : ""
            }  pb-1 cursor-pointer`}
            onClick={() => setActiveState(1)}
          >
            Past Jobs {pastRows.length}
          </li>
          <li
            onClick={() => setActiveState(2)}
            className={`${
              activeState === 2
                ? "border-blue-400 border-b-2 text-blue-400"
                : ""
            } cursor-pointer`}
          >
            Drafts {draftRows.length}
          </li>
        </ul>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Job"
            className="border rounded p-2 w-full"
          />
        </div>

        {activeState === 1 ? (
         <PastJobs rows={pastRows} loading={pastLoad} showNotification={showNotification}></PastJobs>
        ) : (
          <DraftJobs rows={draftRows} loading={draftLoad} fetchingData={fetchingDraftData} showNotification={showNotification}></DraftJobs>
        )}
      </div>
    </div>
    </>
  );
};

export default JobPostings;
