import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

import Notification from '../../components/Notification';
import RecruitingTeamForm from '../../components/RecruitingTeamForm';

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

//import icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import EditIcon from '@mui/icons-material/Edit';



export default function RecruiterTeam() {
  const [recruitingMember,setRecruitingMember]=useState([])
  const {user,isVerified}=useContext(AuthContext)
  const [loader,setLoader]=useState(false)

  const [openPopUp,setOpenPopUp]=useState(false)
  const [openEditPopUp,setOpenEditPopUp]=useState(false)
  const [selectedTeamMember,setSelectedTeamMember]=useState(null)

  const handleOpenEditForm = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setOpenEditPopUp(true);
  };

  const handleFormSuccess = () => {
    fetchRecruitingMemberData();
    showNotification("Team member updated successfully.", "success");
  };

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
         setRecruitingMember(res.data.map((item, index) => ({
          ...item,
          id: index + 1,
        })))
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

  const getShortText=(text)=>{
       if(!text) return ''
       let arr=text.split(' ')
       let str=''
       if(arr.length>=2){
            str+=arr[0][0].toUpperCase()
            str+=arr[1][0].toUpperCase()
       }else{
           str+=arr[0][0].toUpperCase()
       }
       return str
  }

  const [openPreviewBox,setOpenPreviewBox]=useState(false)
  const [recruiterDetails,setRecruiterDetails]=useState(null)

  const handleOpenPreviewBox=(index)=>{
     setRecruiterDetails(recruitingMember[index])
     setOpenPreviewBox(true)
  }

  const handleClosePreviewBox=()=>{
     setRecruiterDetails(null)
     setOpenPreviewBox(false)
  }

  const handleExportData=async ()=>{
     try{
      const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/export-member-data/${user.recruiting_agency_id}`,{responseType:'blob'})
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "recruiterteammemberdata.xlsx");
      document.body.appendChild(link);
      link.click();
     }catch(err){
       console.log(err)
       showNotification("Something went wrong while export the data",'failure')
     }
  }

  const handleOpenTeamPopUp=()=>{
    if(isVerified) setOpenPopUp(true)
    else showNotification("You have not access for adding new team member.",'warning')
  }

  const handleAddFormSuccess = () => {
    fetchRecruitingMemberData();
    showNotification("Successfully new team member added.", "success");
  };

  

  //creating recruiting team col
  const recruitingteamCol=[
    {field:'id',headerName:'ID',headerClassName:'super-app-theme--header', width: 120,
      renderCell:(params)=>{
         return (
            <span>{params.row.id}</span>
         )
      }
    },
    {
        field:"recruiting_member_name",headerClassName:'super-app-theme--header',headerName:'Re. Name',width:260,
        renderCell:(params)=>{
            return (
                <div onClick={()=>handleOpenPreviewBox(params.row.id-1)} className='flex cursor-pointer items-center gap-2'>
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
                     (params.row.account_status==="Active") ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={()=>handleChangeAccountStatus(params.row._id,(params.row.account_status==="Active")?("Inactive"):("Active"))}
                  >
                  <div
                   className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    (params.row.account_status==="Active") ? 'translate-x-6' : 'translate-x-0'
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
    },
    {
      field:'action',headerClassName:'super-app-theme--header',headerName:'Action',width:220,
      renderCell:(params)=>{
        return (
          <div className='w-full h-full flex  items-center gap-2'>
            <button 
              className='text-white p-2 leading-5 bg-blue-400 rounded-md cursor-pointer'
              onClick={() => handleOpenEditForm(params.row)}
            >
              <EditIcon style={{fontSize:'1.2rem'}}></EditIcon>
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    {
     openPreviewBox &&
      <div className='fixed z-10 inset-0 flex justify-center bg-opacity-50 backdrop-blur-md bg-black items-center'>
            <div className='custom-div rounded-md overflow-hidden p-0 w-[35%]'>
                <div className='flex items-center bg-white gap-2 p-2 px-3'>
                  <span onClick={handleClosePreviewBox} className='text-gray-400 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span>
                  <h2 className='text-xl font-medium text-gray-700'>User Details</h2>
                </div>
                {
                  recruiterDetails && 
                  <div className='p-3 w-full bg-white-200'>
                    <div className='custom-div flex-row'>
                        {
                          recruiterDetails.profile_picture?(
                             <img alt='profilepicture' src={recruiterDetails.profile_picture} className='h-14 w-14 rounded-full'></img>
                          ):(
                            <span className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-400 text-white'>{getShortText(recruiterDetails.full_name)}</span>
                          )
                        }
                        <div className='flex flex-col gap-1'>
                          <span>{recruiterDetails.full_name} <small className='text-gray-500'>{recruiterDetails.isAdmin?("(Admin)"):("(Recruiter Member)")}</small></span>
                          <a href={`mailto:${recruiterDetails.email}`}  className='text-blue-400  text-sm tracking-wide underline-offset-1'>{recruiterDetails.email}</a>
                          <a href={`tel:${recruiterDetails.mobileno}`} className='text-blue-400 text-sm tracking-wide underline-offset-1'>+{recruiterDetails.mobileno}</a>
                        </div>
                    </div>
                  </div>
                }
                
            </div>
     </div>

    }

    {/* Add Team Member Form */}
    <RecruitingTeamForm
      isOpen={openPopUp}
      onClose={() => setOpenPopUp(false)}
      mode="add"
      onSuccess={handleAddFormSuccess}
      user={user}
    />

    {/* Edit Team Member Form */}
    <RecruitingTeamForm
      isOpen={openEditPopUp}
      onClose={() => setOpenEditPopUp(false)}
      mode="edit"
      teamMemberData={selectedTeamMember}
      onSuccess={handleFormSuccess}
      user={user}
    />

    <div className='custom-div gap-6'>
        <div className='w-full flex justify-between'>
            <h2 className='text-gray-500 font-medium'>Team Page</h2>
            <div className='flex items-center gap-4'>
              <button onClick={handleExportData} className='text-gray-600 cursor-pointer flex gap-2 items-center'>
                 <span><BackupTableOutlinedIcon></BackupTableOutlinedIcon></span>
                 <span>Export</span>
              </button>
              <button onClick={handleOpenTeamPopUp} className='text-gray-600 cursor-pointer flex gap-2 items-center'>
                 <span><AddIcon></AddIcon></span>
                 <span>Add Member</span>
              </button>
            </div>
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
