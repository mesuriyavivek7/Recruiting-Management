import React, { useContext, useEffect, useState } from 'react'

//importing data grid
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Notification from '../../components/Notification';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';

//importing loader
import WhiteLoader from '../../assets/whiteloader.svg'

export default function EnterpriseTeam() {
 const {user,isVerified}=useContext(AuthContext)
 const [enterpriseMember,setEnterpriseMember]=useState([])
 const [loading,setLoading]=useState(false)
 const [openPopUp,setOpenPopUp]=useState(false)
 const [errors,setErrors]=useState({})
 const [teamLoad,setTeamLoad]=useState(false)

  const [teamFormData, setTeamFormData] = useState({
    full_name: '',
    email: '',
    mobileno: '',
  })


  const fetchTeamMemberData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterprise/getenterprisemember/${user.enterprise_id}`)
      console.log(res.data)
      setEnterpriseMember(res.data.map((item,index)=>({...item,table_id:index+1})))
      setLoading(false)
    } catch (err) {
      setLoading(false)
      //handle error here.
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTeamMemberData()
  }, [])


  const [notification, setNotification] = useState(null)

  //for showing notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const handleTeamFormData = (e) => {
    const { name, value } = e.target
    setTeamFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleOpenTeamPopUp=()=>{
      if(isVerified) setOpenPopUp(true)
      else showNotification("You have not access for adding new team member.",'warning')
  }

  const validateTeamFormData = () => {
    let newErrors = {}
    if (teamFormData.full_name === '') newErrors.full_name = "Name is required"
    if (teamFormData.email === "") newErrors.email = "Email address is required"
    if (teamFormData.mobileno === "") newErrors.mobileno = "Mobile No is required"
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleTeamDataSubmit = async () => {
    if (validateTeamFormData()) {
      try {
        //make request for creating new team member
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam`, { enterprise_id: user.enterprise_id, full_name: teamFormData.full_name, email: teamFormData.email, mobileno: teamFormData.mobileno })

        //send notify mail to team member
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendteammember`, { to: teamFormData.email, name: teamFormData.full_name, inviter_name: user.full_name })

        //send verify mail
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationenterpriseteam`, { email: teamFormData.email, name: teamFormData.full_name })

        await fetchTeamMemberData()
        teamFormData.full_name = ''
        teamFormData.email = ''
        teamFormData.mobileno = ''
        showNotification("Successfully new team member added.", "success")
        setOpenPopUp(false)
      } catch (err) {
        let newErrors = {}
        newErrors.internalError = "There is somethign wrong..!"
        setErrors(newErrors)
        showNotification("There is somthing wrong for adding new team member.", "failure")
      }
      setTeamLoad(false)

    }
  }

  const checkCreadentials = async () => {
    if (validateTeamFormData()) {
      setTeamLoad(true)
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/checkcreadentials`, { mobileno: teamFormData.mobileno, email: teamFormData.email })
        if (res.data) {
          setTeamLoad(false)
          showNotification("Entered mobile no or email adress is alredy exist.", 'failure')
        } else {
          await handleTeamDataSubmit()
        }
      } catch (err) {
        console.log(err)
        showNotification("Something went wrong while adding new team member.", 'failure')
        setTeamLoad(false)
      }
      setTeamLoad(false)
    }

  }


  const getDate = (date) => {
    if (!date) return ""
    let d = new Date(date)
    let d_ate = d.getDate()
    let d_month = d.getMonth() + 1
    let d_year = d.getFullYear()

    return `${(d_ate < 10) ? (`0${d_ate}`) : (d_ate)}-${(d_month < 10) ? (`0${d_month}`) : (d_month)}-${d_year}`
  }


  const handleChangeAccountStatus = async (enid, status) => {
    console.log(status)
    console.log(enid)

    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/changeaccoutstatus/${enid}`, { status })
      await fetchTeamMemberData()
      showNotification('Enterprise member account status changed.', 'success')
    } catch (err) {
      showNotification('Something went wrong while changing account status', 'failure')
      //handle error here
      console.log(err)
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
  const [previewLoader,setPreviewLoader]=useState(false)
  const [enterpriseDetails,setEnterpriseDetails]=useState(null)

  const handleOpenPreviewBox=async (id)=>{
       setOpenPreviewBox(true)
       handleFetchEnterpriseDetails(id)
  }

  const handleClosePreviewBox=async ()=>{
    setOpenPreviewBox(false)
    setEnterpriseDetails(null)

  }


  //For fetch enterprise details
  const handleFetchEnterpriseDetails=async (enmemberid)=>{
        try{
          setPreviewLoader(true)
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/${enmemberid}`)
          if(res.data) setEnterpriseDetails(res.data)
        }catch(err){
           setPreviewLoader(false)
           console.log(err)
           showNotification("Something went wrong..!",'failure')
        }
        setPreviewLoader(false)
  }

  
  //creating enterprise team col
  const enterpriseteamcol = [
    { field: 'table_id', headerName: 'ID', headerClassName: 'super-app-theme--header', width: 80, },
    {
      field: "enterprise_member_name", headerClassName: 'super-app-theme--header', headerName: 'En Name', width: 260,
      renderCell: (params) => {
        return (
          <div onClick={()=>handleOpenPreviewBox(params.row.id)} className='flex cursor-pointer items-center gap-2'>
            <span className='h-7 w-7 flex justify-center font-semibold items-center rounded-full text-white bg-blue-400'>{params.row.full_name[0].toUpperCase()}</span>
            <h2>{params.row.full_name}</h2>
          </div>
        )
      }
    },
    {
      field: 'role', headerName: "Account Role", headerClassName: 'super-app-theme--header', width: 220,
      renderCell: (params) => {
        return (
          <div>
            <span className={`h-7 w-24 rounded-md mt-7 flex justify-center items-center text-white ${(params.row.isAdmin) ? ("bg-blue-400 ") : ("bg-orange-500")}`}>{(params.row.isAdmin) ? "Admin" : "Member"}</span>
          </div>
        )
      }
    },
    {
      field: 'active_jobs', headerName: 'Active Jobs', headerClassName: 'super-app-theme--header', width: 200,
    },
    {
      field: 'pending_jobs', headerName: 'Pending Jobs', headerClassName: 'super-app-theme--header', width: 200,
    },
    {
      field: 'account_status', headerName: 'Status', headerClassName: 'super-app-theme--header', width: 200,
      renderCell: (params) => {
        return (


          params.row.isAdmin ? (
            <span className='text-blue-400 text-[15px] leading-5'>Active</span>
          ) : (

            <div
              className={`w-12 h-6 mt-7 flex items-center rounded-full p-1 cursor-pointer ${(params.row.account_status === "Active") ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              onClick={() => handleChangeAccountStatus(params.row.id, (params.row.account_status === "Active") ? ("Inactive") : ("Active"))}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${(params.row.account_status === "Active") ? 'translate-x-6' : 'translate-x-0'
                  }`}
              ></div>
            </div>

          )


        )
      }
    },
    {
      field: 'createdat', headerName: "Created At", headerClassName: 'super-app-theme--header', width: 200,
      renderCell: (params) => {
        return (
          <span>{getDate(params.row.createdAt)}</span>
        )

      }
    }
  ]


  //For export data into excel form
  const handleExportData=async ()=>{
      try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterprise/export-member-data/${user.enterprise_id}`,{responseType:'blob'})
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "enterprisememeberdata.xlsx");
          document.body.appendChild(link);
          link.click();
      }catch(err){
        console.log(err)
        showNotification("Something went while export data.",'failure')
      }
  }


  return (
    <>

      {
        openPopUp && (
          <div className='fixed inset-0 z-10 flex justify-center bg-black bg-opacity-50 backdrop-blur-md items-center'>
            <div className="rounded-md overflow-hidden border-gray-100 border-1 max-w-md w-full">
              <div className='relative w-full bg-white py-2'>
                <span className='absolute cursor-pointer flex items-center text-green-600 text-sm left-2 top-4' onClick={() => setOpenPopUp(false)}><ArrowBackIosIcon style={{ fontSize: '1rem' }}></ArrowBackIosIcon>Back</span>
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
     {
       openPreviewBox  && 
       <div className='fixed inset-0 z-10 flex bg-black justify-center bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div w-[35%] overflow-hidden p-0 rounded-md'>
             <div className='flex items-center gap-2 p-2 px-3'>
                  <span onClick={handleClosePreviewBox} className='text-gray-400 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span>
                  <h2 className='text-xl font-medium text-gray-700'>User Details</h2>
             </div>
             {
              (previewLoader)?(
                <div className='w-full h-full flex justify-center items-center'>
                  <img src={WhiteLoader} className='h-10 w-10'></img>
                </div>
              ):(
              enterpriseDetails && 
                <div className='p-3 w-full bg-white-200'>
                    <div className='custom-div flex-row'>
                        {
                          enterpriseDetails.profile_picture?(
                             <img src={enterpriseDetails.profile_picture} className='h-14 w-14 rounded-full'></img>
                          ):(
                            <span className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-400 text-white'>{getShortText(enterpriseDetails.full_name)}</span>
                          )
                        }
                        <div className='flex flex-col gap-1'>
                          <span>{enterpriseDetails.full_name} <small className='text-gray-500'>{enterpriseDetails.isAdmin?("(Admin)"):("(Enterprise Member)")}</small></span>
                          <a href={`mailto:${enterpriseDetails.email}`} className='text-blue-400  text-sm tracking-wide underline-offset-1'>{enterpriseDetails.email}</a>
                          <a href={`tel:${enterpriseDetails.mobileno}`} className='text-blue-400 text-sm tracking-wide underline-offset-1'>+{enterpriseDetails.mobileno}</a>
                        </div>
                    </div>
                  </div>
              )
             }
          </div>
      </div>
     }

      <div className='custom-div gap-6'>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)}></Notification>}
        <div className='w-full flex justify-between'>
          <h2 className='text-gray-500 font-medium'>Team Page</h2>
          <div className='flex gap-4 items-center'>
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
          height: 600, width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#edf3fd',
          },
        }}>
          <DataGrid
            rowHeight={90}
            rows={enterpriseMember}
            columns={enterpriseteamcol}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSize={8}
            pageSizeOptions={[5, 10]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                background: 'red', // Set your desired background color here
                color: '#124791', // Optional: Set text color
                fontSize: '1rem',
                fontWeight: 'bold',
              },
            }}
          ></DataGrid>
        </Box>
      </div>
    </>
  )
}
