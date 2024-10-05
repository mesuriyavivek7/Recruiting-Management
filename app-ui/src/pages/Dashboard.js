import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// charts
// import MyResponsivePie from './Charts/pie';
import Polar from './Charts/Polar'; 
import MyResponsiveRadialBar from './Charts/Radial'; 





import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//importing icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AuthContext } from '../context/AuthContext';


import Notification from '../components/Notification';

const Dashboard = () => {
  const {user}=useContext(AuthContext)
  const [teamFormData,setTeamFormData]=useState({
    full_name:'',
    email:'',
    mobileno:'',
  })
  const [openPopUp,setOpenPopUp]=useState(false)

  const [errors,setErrors]=useState({})
  const [teamLoad,setTeamLoad]=useState(false)
  const [notification,setNotification]=useState(null)

// 

// const pieData = [
//   { id: 'JavaScript', value: 55 },
//   { id: 'Python', value: 25 },
//   { id: 'Java', value: 20 },
// ];

const polarData = [
  { id: 'React', value: 40 },
  { id: 'Angular', value: 30 },
  { id: 'Vue', value: 30 },
];

const radialData = [
  {
      "id": "",
      "data": [
          { "x": "", "y": 120 },
          { "x": "", "y": 150 },
          { "x": "", "y": 100 }
      ]
  },
  {
      "id": "",
      "data": [
          { "x": "", "y": 100 },
          { "x": "", "y": 130 },
          { "x": "", "y": 80 }
      ]
  }
];


// 

















// for add new job(chaange by fenee)

  const navigate = useNavigate();

  const handleAddJobClick = () => {
    navigate("/employer/jobposting/landing/postjob");
  };


  //for showing notification
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }

  const handleTeamFormData=(e)=>{
      const {name,value}=e.target
      setTeamFormData((prevData)=>({...prevData,[name]:value}))
  }

  const validateTeamFormData=()=>{
      let newErrors={}
      if(teamFormData.full_name==='') newErrors.full_name="Name is required"
      if(teamFormData.email==="") newErrors.email="Email address is required"
      if(teamFormData.mobileno==="") newErrors.mobileno="Mobile No is required"
      setErrors(newErrors)

      return Object.keys(newErrors).length===0
  }

  const handleTeamDataSubmit=async ()=>{
    if(validateTeamFormData()){
         try{
          //make request for creating new team member
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam`,{enterprise_id:user.enterprise_id,full_name:teamFormData.full_name,email:teamFormData.email,mobileno:teamFormData.mobileno})

          //send notify mail to team member
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendteammember`,{to:teamFormData.email,name:teamFormData.full_name,inviter_name:user.full_name})

          //send verify mail
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationenterpriseteam`,{email:teamFormData.email,name:teamFormData.full_name})

          teamFormData.full_name=''
          teamFormData.email=''
          teamFormData.mobileno=''
          showNotification("Successfully new team member added.","success")
          setOpenPopUp(false)
         }catch(err){
          let newErrors={}
          newErrors.internalError="There is somethign wrong..!"
          setErrors(newErrors)
          showNotification("There is somthing wrong for adding new team member.","failure")
         }
         setTeamLoad(false)
         
    }
  }

  const checkCreadentials=async ()=>{
      if(validateTeamFormData()){
         setTeamLoad(true)
        try{
            const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/checkcreadentials`,{mobileno:teamFormData.mobileno,email:teamFormData.email})
            if(res.data){
               setTeamLoad(false)
               showNotification("Entered mobile no or email adress is alredy exist.",'failure')
            }else{
              await handleTeamDataSubmit()
            }
        }catch(err){
           console.log(err)
           showNotification("Something went wrong while adding new team member.",'failure')
           setTeamLoad(false)
        }
        setTeamLoad(false)
      }

  }

  

  
  
  return (
    <div className='flex flex-col gap-2'>
       {
        notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>
       }
       {
        openPopUp && (
          <div className='fixed inset-0 flex z-50 justify-center bg-opacity-50 backdrop-blur-md bg-black items-center'>
            <div className="rounded-md overflow-hidden border-gray-100 border-1 max-w-md w-full">
              <div className='relative w-full bg-white py-2'>
                <span className='absolute cursor-pointer flex items-center text-green-600 text-sm left-2 top-4' onClick={()=>setOpenPopUp(false)}><ArrowBackIosIcon style={{fontSize:'1rem'}}></ArrowBackIosIcon>Back</span>
                <h1 className='text-2xl text-center text-gray-900'>Add Team Member</h1>
              </div>
              <div className='p-4 bg-white-400'>
                <div className='custom-div gap-4 pb-4'>
                  <div className='flex relative w-full flex-col gap-2'>
                    <label htmlFor='name' className='input-label'>Enter Name <span className='text-green-600'>*</span></label>
                    <input 
                    type='text'
                    id='name'
                    className='input-field'
                    name='full_name'
                    value={teamFormData.full_name}
                    onChange={handleTeamFormData}
                    ></input>
                    {
                      errors.full_name && (
                        <p className='text-xs text-red-400'>{errors.full_name}</p>
                      )
                    }
                  </div>
                  <div className='flex relative w-full flex-col gap-2'>
                    <label htmlFor='email' className='input-label'>Enter Email <span className='text-green-600'>*</span></label>
                    <input
                    type='email'
                    id='email'
                    name='email'
                    value={teamFormData.email}
                    onChange={handleTeamFormData}
                    className='input-field'
                    ></input>
                    {
                      errors.email && (
                        <p className='text-xs text-red-400'>{errors.email}</p>
                      )
                    }
                  </div>
                  <div className='flex relative w-full flex-col gap-2'>
                    <label className='input-label' htmlFor='primarycontactnumber'>Enter Phone Number <span className='text-red-500'>*</span></label>
                       <PhoneInput
                        value={teamFormData.mobileno}
                        country={"in"}
                        onChange={(phone) =>
                        setTeamFormData((prevData) => ({
                          ...prevData,
                          mobileno: phone,
                        }))
                         }
                        containerStyle={{ width: "100%" }}
                        />
                        {
                          errors.mobileno && (
                           <p className='text-xs text-red-400'>{errors.mobileno}</p>
                         )
                        }
                  </div>
                  <button disabled={teamLoad} onClick={checkCreadentials} className='w-full relative text-white py-1 mt-2 hover:bg-blue-400 rounded-sm bg-blue-700 disabled:bg-slate-600 disabled:cursor-no-drop'>
                                {
                                  teamLoad && 
                                     <span className="flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>
                                }  
                                {
                                  !teamLoad && ("Add Member")
                                }   
                                
                  </button>
                </div>
              </div>

            </div>
          </div>
        )
       }
      <div className='custom-div py-4 flex flex-row items-center justify-between'>
         <div className='flex gap-4 text-gray-600 items-center'>
            <span className='cursor-pointer'>My Dashboard</span>
          
         </div>
         <button onClick={()=>setOpenPopUp(true)} className='text-gray-600 cursor-pointer flex gap-2 items-center'>
          <span><AddIcon></AddIcon></span>
          <span>Add Member</span>
         </button>
      </div>

    {/* Add section key indicators */}
<div className='custom-div py-2 gap-4'>
  <h1 className='text-xl font-bold'>Key Indicators</h1>
  <div className='w-full flex gap-4 pb-2'>
    
  <div className='w-48 h-56 flex-1 flex flex-col gap-2 shadow '>
      <MyResponsiveRadialBar  data={radialData}/>
    </div>
    
    <div className='w-58 h-56 flex-1 flex flex-col gap-2 shadow pt-6'>
      <Polar data={polarData} />
    </div>

    <div className='w-48 h-56 flex-1 flex flex-col gap-2 shadow pt-6'>
      <Polar data={polarData} />
    </div>
  </div>
</div>
{/* Finish section */}


      <div className='custom-div py-4 gap-4'>
        <h1>Jobs</h1>
        <div className='w-full flex gap-4'>
         <div className='custom-div cursor-pointer flex-1' onClick={handleAddJobClick}>
             <span><AddIcon style={{fontSize:"1.8rem"}}></AddIcon></span>
<span className='text-gray-600'>Add New Job</span>
           </div>
         
           <div className='custom-div flex-1 flex flex-col gap-2'>
              <h1 className='text-2xl'>0</h1>
              <p className='text-gray-600'>Total Open Jobs</p>
           </div>
           <div className='custom-div flex-1 flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                <h1 className='text-2xl'>0</h1>
              </div>
              <p className='text-gray-600'>Active Jobs</p>
           </div>
           <div className='custom-div flex-1 flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 bg-slate-500 rounded-full'></div>
                <h1 className='text-2xl'>0</h1>
              </div>
              <p className='text-gray-600'>Paused Jobs</p>
           </div>
           <div className='custom-div flex-1 flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <div className='h-2 w-2 bg-purple-500 rounded-full'></div>
                <h1 className='text-2xl'>0</h1>
              </div>
              <p className='text-gray-600'>Pending Jobs</p>
           </div>
        </div>
      </div>
      <div className='custom-div'>
        <h1>Resumes</h1>
        <div className='w-full flex gap-4'>
          <div className='flex flex-1 flex-col'>
            <h1 className='text-2xl'>0</h1>
            <p className='text-sm text-gray-600'>Total Resumes</p>
            <p className='text-sm text-gray-600'>(No Duplicates)</p>
          </div>
          <div className='custom-div flex-1 gap-2'>
            <div className='flex gap-2 items-center'>
             <div className='h-2 w-2 bg-green-500 rounded-full'></div>
             <h1 className='text-2xl'>0</h1>
            </div>
            <p className='text-gray-600 text-sm'>New</p>
          </div>
          <div className='custom-div flex-1 gap-2'>
            <div className='flex gap-2 items-center'>
              <div className='h-2 w-2 bg-slate-500 rounded-full'></div>
              <h1 className='text-2xl'>0</h1>
            </div>
            <p className='text-gray-600 text-sm'>Under Process</p>
          </div>
          <div className='custom-div flex-1 gap-2'>
            <div className='flex gap-2 items-center'>
              <div className='h-2 w-2 bg-blue-500 rounded-full'></div>
              <h1 className='text-2xl'>0</h1>
            </div>
            <p className='text-gray-600 text-sm'>Selected</p>
          </div>
          <div className='custom-div flex-1 gap-2'>
            <div className='flex gap-2 items-center'>
              <div className='h-2 w-2 bg-red-500 rounded-full'></div>
              <h1 className='text-2xl'>0</h1>
            </div>
            <p className='text-gray-600 text-sm'>Rejected</p>
          </div>
          <div className='custom-div flex-1 gap-2'>
            <div className='flex gap-2 items-center'>
              <div className='h-2 w-2 bg-orange-500 rounded-full'></div>
              <h1 className='text-2xl'>0</h1>
            </div>
            <p className='text-gray-600 text-sm'>Others</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Dashboard
