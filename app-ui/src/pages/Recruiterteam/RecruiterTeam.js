import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

import Notification from '../../components/Notification';

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

//import icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";



export default function RecruiterTeam() {
  const [recruitingMember,setRecruitingMember]=useState([])
  const {user}=useContext(AuthContext)
  const [loader,setLoader]=useState(false)

  const [teamFormData,setTeamFormData]=useState({
    full_name:'',
    email:'',
    mobileno:'',
    hide_commision:false
  })
  const [openPopUp,setOpenPopUp]=useState(false)

  const [errors,setErrors]=useState({})
  const [teamLoad,setTeamLoad]=useState(false)


  const handleTeamFormData=(e)=>{
    const {name,value}=e.target
    setTeamFormData((prevData)=>({...prevData,[name]:value}))
}

const validateTeamFormData=()=>{
    let newErrors={}
    if(teamFormData.full_name==='') newErrors.full_name="Name is required."
    if(teamFormData.email==="") newErrors.email="Email address is required."
    if(teamFormData.mobileno==="") newErrors.mobileno="Mobile No is required."
    setErrors(newErrors)

    return Object.keys(newErrors).length===0
}

const handleTeamDataSubmit=async ()=>{
  if(validateTeamFormData()){
       try{
        //make request for creating new team member
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam`,{recruiting_agency_id:user.recruiting_agency_id,full_name:teamFormData.full_name,email:teamFormData.email,mobileno:teamFormData.mobileno,hide_commision:teamFormData.hide_commision})

        //send notify mail to team member
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendteammember`,{to:teamFormData.email,name:teamFormData.full_name,inviter_name:user.full_name})

        //send verify mail
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationrecruitingteam`,{email:teamFormData.email,name:teamFormData.full_name})

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
          const res=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkcredentials`,{mobileno:teamFormData.mobileno,email:teamFormData.email})
          console.log(res)
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

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
    setNotification({message,type})
  }



  const fetchRecruitingMemberData=async ()=>{
     setLoader(true)
      try{
         const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/getteammember/${user.recruiting_agency_id}`)
         console.log(res.data)
         setRecruitingMember(res.data)
         setLoader(false)
      }catch(err){
        setLoader(false)
        showNotification("Something went wrong while fetching team member data.",'failure')
         console.log(err)
      }
  }

  useEffect(()=>{
      fetchRecruitingMemberData()
  },[])

  //for change account status
  const handleChangeAccountStatus=async (id,status)=>{
      try{
          await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/changeaccountstatus/${id}`,{status})
          await fetchRecruitingMemberData()
          showNotification("Successfully account status changed.",'success')
      }catch(err){
         console.log(err)
         showNotification("Something went wrong while changing account status.","failure")
      }
  }

  //for change hide_commission flag
  const handleChangeCommissionFlag=async (id,flag)=>{
        try{
          await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/changecommisionflag/${id}`,{flag})
          fetchRecruitingMemberData()
          showNotification("Successfully hide commission flag changed.",'success')
        }catch(err){
           console.log(err)
           showNotification("Something went wrong while changing hide commissio flag.",'failure')
        }
  }


  //creating recruiting team col
  const recruitingteamCol=[
    {field:'id',headerName:'ID',headerClassName:'super-app-theme--header', width: 120,
      renderCell:(params)=>{
         return (
            <span>{params.row._id}</span>
         )
      }
    },
    {
        field:"recruiting_member_name",headerClassName:'super-app-theme--header',headerName:'Re. Name',width:260,
        renderCell:(params)=>{
            return (
                <div className='flex items-center gap-2'>
                    <span className='h-7 w-7 flex justify-center font-semibold items-center rounded-full text-white bg-blue-400'>{params.row.full_name[0].toUpperCase()}</span>
                    <h2>{params.row.full_name}</h2>
                </div>
            )
        }
    },
    {
        field:'status',headerClassName:'super-app-theme--header',width:240,
        renderCell:(params)=>{
             return (
                params.row.isAdmin?(
                    <span className='text-blue-400 text-[15px] leading-5'>Active</span>
                ):(

                    <div
                    className={`w-12 h-6 mt-7 flex items-center rounded-full p-1 cursor-pointer ${
                     (params.row.accout_status==="Active") ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={()=>handleChangeAccountStatus(params.row._id,(params.row.accout_status==="Active")?("InActive"):("Active"))}
                  >
                  <div
                   className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    (params.row.accout_status==="Active") ? 'translate-x-6' : 'translate-x-0'
                   }`}
                   ></div>
                  </div>

                )
             )
        }
    },
    { 
        field:'mapped_jobs',headerClassName:'super-app-theme--header',headerName:"Mapped Jobs",width:240,
        renderCell:(params)=>{
             return <span>{(params.row.mapped_jobs)?(params.row.mapped_jobs.length):(0)}</span>
        }

    },
    {
        field:'accepted_jobs',headerClassName:'super-app-theme--header',headerName:"Accepted Jobs",width:240,
        renderCell:(params)=>{
             return <span>{(params.row.accepted_jobs)?(params.row.accepted_jobs.length):(0)}</span>
        }   
    },
    {
        field:'hide_commision',headerClassName:'super-app-theme--header',headerName:"Hide Commission",width:220,
        renderCell:(params)=>{
             return (

                params.row.isAdmin?(
                    <span className='text-blue-400 text-[15px] leading-5'>None</span>
                ):(

                    <div
                    className={`w-12 h-6 mt-7 flex items-center rounded-full p-1 cursor-pointer ${
                     (params.row.hide_commision) ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={()=>handleChangeCommissionFlag(params.row._id,(params.row.hide_commision)?(false):(true))}
                  >
                  <div
                   className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    (params.row.hide_commision) ? 'translate-x-6' : 'translate-x-0'
                   }`}
                   ></div>
                  </div>

                )
             )
        }
    }
  ]

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}

    {
        openPopUp && (
          <div className='fixed z-10 inset-0 flex justify-center bg-opacity-50 backdrop-blur-md bg-black items-center'>
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
                    <label className='input-label' htmlFor='primarycontactnumber'>Enter Phone Number <span className='text-green-400'>*</span></label>
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
                  <div className='flex items-center mt-2 relative w-full gap-2'>
                    <div className={`w-12 h-6  flex items-center rounded-full p-1 cursor-pointer ${
                         (teamFormData.hide_commision) ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                       onClick={()=>setTeamFormData((prevData)=>({...prevData,["hide_commision"]:!prevData.hide_commision}))}
                      >
                      <div
                       className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        (teamFormData.hide_commision) ? 'translate-x-6' : 'translate-x-0'
                       }`}
                       ></div>
                    </div> 
                    <label className='input-label'>Hide Commission <span className='text-green-400'>*</span></label>
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

    <div className='custom-div gap-6'>
        <div className='w-full flex justify-between'>
            <h2 className='text-gray-500 font-medium'>Team Page</h2>
            <button onClick={()=>setOpenPopUp(true)} className='text-gray-600 cursor-pointer flex gap-2 items-center'>
               <span><AddIcon></AddIcon></span>
               <span>Add Member</span>
            </button>
        </div>
      <Box sx={{
      height:600,width:'100%',
      '& .super-app-theme--header': {
          backgroundColor: '#edf3fd',
        },
     }}>
      <DataGrid
      rowHeight={90}
      rows={recruitingMember}
      columns={recruitingteamCol}
      loading={loader}
      getRowId={(row)=>row._id}
      initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
     pageSize={8}
     pageSizeOptions={[5,10]}
     sx={{
          '& .MuiDataGrid-columnHeaders': {
            background:'red', // Set your desired background color here
            color: '#124791', // Optional: Set text color
            fontSize:'1rem',
            fontWeight:'bold',
          },
        }}
      ></DataGrid>
      </Box>
    </div>
    </>
  )
}
