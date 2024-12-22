import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { fetchMappedRecruiterMemberIds,fetchRecuritingAgencybyId, fetchAcceptedRecruiterMemberIds, fetchRecruiterMemberDetailsByRagencyId, fetchVerifiedRAgenciesByACmanagerId, fetchRecruiterMemberDetails } from '../../../services/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { mappedColumns } from './RowColMappedReMember';
import { store } from '../../../State/Store';
import axios from 'axios'
import WhiteLoader from '../../../assets/whiteloader.svg'

export default function MappedRecruiterMember({jobId,jobStatus,handleMappedRecruiterCount,handleRequestedRecruiterCount,showNotification}) {
 const selectUserData = (state) => state?.admin?.userData;
 const userData = selectUserData(store?.getState());

 const [recruiterData,setRecruiterData]=useState([])
 const [loader,setLoader]=useState(false)

 const [searchTerm, setSearchTerm] = useState('');
 const [filterStatus, setFilterStatus] = useState('All');


 const [verifiedLoading,setVerifiedLoading] = useState(false)
 const [addMemberLoading,setAddMemberLoading]=useState(false)
 const [removeMemberLoading,setRemoveMemberLoading] = useState(false)
 const [openAddPopUp, setOpenAddPopUp]=React.useState(false)
 const [selectedMember,setSelectedMember]=React.useState([])
 const [verifiedRecruiterMember,setVerifiedRecruiterMember]= React.useState([])

 const handleChangeSelectedMember = (id) =>{
    if(selectedMember.includes(id)){
       setSelectedMember((prevData)=>prevData.filter((item)=>item!==id))
    }else{
       setSelectedMember((prevData)=>[...prevData,id])
    }
 }

 const handleClosePopUp = () =>{
     setOpenAddPopUp(false)
     setSelectedMember([])
 }


 const fetchVerifiedRecruiter=async ()=>{
  setVerifiedLoading(true)
  try{
    //Fetching verified recruiter agencyies id
    const data = await fetchVerifiedRAgenciesByACmanagerId(userData?._id);
    
    //Fetch Recruiter Member upon recruiter agency id
    const recruiterMembers=await Promise.all(data.map(async (ragencyid)=>{
          const recruiterMemberDetails=await fetchRecruiterMemberDetailsByRagencyId(ragencyid)
          return recruiterMemberDetails
    }))

    const flateRecruiterMembers = recruiterMembers.flat()

    const mappedRecruiterMemberIds= await fetchMappedRecruiterMemberIds(jobId)

    const acceptedRecruiterMemberIds = await fetchAcceptedRecruiterMemberIds(jobId)
    
    //Filter member details 
    const filterRecruiterMemberDetails = flateRecruiterMembers.filter((member) => {
      return !mappedRecruiterMemberIds.includes(member._id) && !acceptedRecruiterMemberIds.includes(member._id);
    });


    //Get Recruiter Agency Name 
    const allRecruiterMemberDetails = await Promise.all(filterRecruiterMemberDetails.map(async (details)=>{
           const recruiterAgency = await fetchRecuritingAgencybyId(details.recruiting_agency_id)
           return (
             {
              ...details,
              agency_name: recruiterAgency ? recruiterAgency.full_name : "None"
             }
           )
    }))

    console.log(allRecruiterMemberDetails)

      setVerifiedRecruiterMember(allRecruiterMemberDetails)
    }catch(err){
        showNotification("Something went wrong.",'failure')
        console.log(err)
    }finally{
      setVerifiedLoading(false)
    }

  }


 const fetchData=async () =>{
    setLoader(true)
     try{
       //Fetch mapped recruiter member ids
       const recruiterMemberIds=await fetchMappedRecruiterMemberIds(jobId)

       const recruiterMemberDetails=await Promise.all(recruiterMemberIds.map(async (rememberid)=>{
           const recruiter=await fetchRecruiterMemberDetails(rememberid)
           
           if(recruiter) return recruiter
           else return null
       }))

       //Filter out recruiter member details 
       const filterRecruiterMemberDetails = recruiterMemberDetails.filter((item)=>item!==null)

       //Filter by search and status
       const newFilteredRows = filterRecruiterMemberDetails.filter((row) => {
        const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || row.account_status === filterStatus;
        return matchesSearch && matchesStatus;
      });

       setRecruiterData(newFilteredRows.map((item,index)=>({...item,id:index+1})))

     }catch(err){
         console.log(err)
         showNotification("Something went wrong.",'failure')
     }finally{
        setLoader(false)
     }
 }

 const handleOpenAddPopUp = () =>{
    if(jobStatus==="Active"){
      setOpenAddPopUp(true)
    }else{
      showNotification("This job is not accepting more Recruiter Member.",'warning')
    }
 }

 const handleAddMemberData= async () =>{
    setAddMemberLoading(true)
    try{
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/addremembermappedlist/${jobId}`,{reMemberIds:selectedMember})
        await axios.post(`${process.env.REACT_APP_API_APP_URL}/job/convert-request-mapped/${jobId}`,{reMemberIds:selectedMember})
        await fetchVerifiedRecruiter()
        await fetchData()
        await handleMappedRecruiterCount()
        await handleRequestedRecruiterCount()
        setOpenAddPopUp(false)
        showNotification("Successfully Recruiter member added into mapped list.",'success')
    }catch(err){
       showNotification("Something went wrong while adding recruiter member",'failure')
       console.log(err)
    }finally{
      setAddMemberLoading(false)
    }
 }

 const handleRemoveMemberData= async (rememberid)=>{
     setRemoveMemberLoading(true)
     try{
       //Remove the mapped jobs from the recruiter team and job
       await axios.put(`${process.env.REACT_APP_API_APP_URL}/job/remove-remember-mapped/${jobId}/${rememberid}`)
       await fetchData()
       await fetchVerifiedRecruiter()
       await handleMappedRecruiterCount()
       showNotification("Successfully Recruiter member remove from mapped list.",'success')
     }catch(err){
       console.log(err)
       showNotification("Something went wrong while remove recruiter member",'failure')
     }finally{
       setRemoveMemberLoading(false)
     }
 }

 useEffect(()=>{
     fetchData()
     fetchVerifiedRecruiter()
 },[searchTerm,filterStatus])

  const calculateRowHeight = (params) => {
        const contentHeight = params.row ? params.row.content.length / 10 : 50;
        return Math.max(80, contentHeight);
  };

  return (
    <>
    
    {
      removeMemberLoading && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='shadow bg-white rounded-md flex items-center flex-col gap-2 p-3 w-[350px]'>
           <img src={WhiteLoader} alt='loader' className='w-8 h-8'></img>
           <span>Please wait while we remove member...</span>
        </div>
     </div>
    }
    {openAddPopUp && 
      <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
         <div className='shadow flex flex-col gap-2 w-2/3 p-4 z-40 rounded-md bg-white'>
             <h2 className='text-xl'><span className='cursor-pointer' onClick={handleClosePopUp}><ArrowBackIosIcon style={{fontSize:"1.2rem"}}></ArrowBackIosIcon></span> Add Recruiter Member</h2>
             <div className='mt-3 overflow-auto h-72 flex flex-col gap-2'>
                 {
                  verifiedRecruiterMember.map((data,index)=>(
                    <div key={index} className='flex gap-8 p-3 rounded-md bg-gray-50 items-center border'>
                     <input className='cursor-pointer' onChange={()=>handleChangeSelectedMember(data._id)} checked={selectedMember.includes(data._id)} type='checkbox'></input>
                     <div className='w-full flex items-center gap-6'>
                        <div className='flex gap-1 items-center'>
                            <span>Full Name:</span>
                            <span className='text-gray-600'>{data.full_name}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span>Agency Owner:</span>
                            <span className='text-gray-600'>{data.agency_name}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                           <span>Role:</span>
                           <span className='text-gray-600'>{data.isAdmin?"Admin":"Member"}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                           <span>Status:</span>
                           <span className='text-gray-600'>{data.account_status}</span>
                        </div>
                     </div>
                   </div>
                  ))
                 }
                
             </div>
             <div className='flex mt-3 place-content-end'>
                <button onClick={()=>handleAddMemberData()} disabled={selectedMember.length===0 || addMemberLoading || verifiedLoading} className='bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed p-2 rounded-md text-white'>Add Member</button>
             </div>
         </div>
    </div>
    }
   

    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
    {/* Search Bar */}
    <TextField
      label="Search..."
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        width: '600px',
        borderRadius: '12px',
        '& .MuiOutlinedInput-root': {
          padding: '0',
          '& input': {
            height: '30px',
            padding: '8px',
          },
          '& fieldset': {
            borderColor: 'gray',
          },
          '&:hover fieldset': {
            borderColor: '#315370',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#315370',
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setSearchTerm(searchTerm)}>
              <FaSearch />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    <div className='flex flex-col items-end gap-2'>
     <button onClick={()=>handleOpenAddPopUp()} className='bg-blue-230 w-44 p-2 rounded-md text-white'>+  Add Recruiter</button>

    {/* Filter Buttons */}
    <Box display="flex" gap={0}>
      {['All', 'Active', 'Inactive'].map((status) => (
        <Button
          key={status}
          variant={filterStatus === status ? 'contained' : 'outlined'}
          onClick={() => setFilterStatus(status)}
          sx={{
            backgroundColor: filterStatus === status ? '#315370' : '#e0e0e0',
            color: filterStatus === status ? 'white' : 'gray',
            fontSize: '16px',
            height: '45px',
            textTransform: 'none',
            width: '120px',
            border: '1px solid gray',
            borderRadius:
              status === 'All' ? '20px 0 0 20px' : status === 'Inactive' ? '0 20px 20px 0' : '0',
            '&:hover': {
              backgroundColor: filterStatus === status ? '#315380' : '#e0e0e0',
            },
          }}
        >
          {status}
        </Button>
      ))}
    </Box>
    </div>
  </Box>
  


  <div className='mt-8'>
      <p className='text-lg xl:text-2xl'>Mapped Recruiting Member </p>
      <Box sx={{ height: 600, width: '100%', paddingTop: '19px' }}>
        <DataGrid
          rows={recruiterData}
          columns={mappedColumns(handleRemoveMemberData)}
          rowHeight={80}
          getRowHeight={calculateRowHeight}
          pageSize={8}
          loading={loader}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
            },
            ' [class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !impotant',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
              color: 'black',
              '&:focus': {
                outline: 'none',
                border: 'none',
              },
              backgroundColor: '#e3e6ea !important',
              minHeight: '60px',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'blue',
              visibility: 'visible',
            },
            '& .MuiDataGrid-cellContent': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-cell': {
              minHeight: '2.5rem',
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
            },
            '& .MuiDataGrid-row': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },

          }}
        />
      </Box>
     </div>
    </>
  )
}
