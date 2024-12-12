import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/recruiter/Navbar'
import SideNavbar from '../../components/recruiter/SideNavbar'
import { Outlet ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Notification from '../../components/Notification'

//Importing images
import asset11 from '../../assets/asset 11.svg'
import asset12 from '../../assets/asset 12.svg'
import WhiteLoader from '../../assets/whiteloader.svg'


const RecruitDashboard = () => {
  const {user,loading}=useContext(AuthContext)
  const navigate=useNavigate()

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
    setNotification({message,type})
  }

  const [openKycPopUp,setOpenKycPopUp] = useState(true)
  const [kycLoading,setKycLoading] = useState(false)
  const [load,setLoad] = useState(false)
  const [kycData,setKycData]=useState({
    entity_type:'',
    pancard_number:'',
  })
  const [kycVerified,setKycVerified]=useState(false)
  const [activeState, setActiveState] = useState(1);
  const [errors,setErrors]=useState({})
  const [file,setFile]=useState(null)

  useEffect(()=>{
    if(!loading && !user) navigate('/')
  },[loading,user,navigate])

  const handleChange=(e)=>{
    const {name,value,type}=e.target

    if(type==='radio'){
       setKycData((prevData)=>({
        ...prevData,
        [name]:value
       }))
    }else{
      setKycData((prevData)=>({
        ...prevData,
        [name]:value
      }))
    }

  }

  const handleFileChange=(e)=>{
    setFile(e.target.files[0])
  }

 const validateform=()=>{
  let newErrors={}
  //regax for test entered pancard number is valid or not
  let regpan=/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
  switch(activeState){
    case 1:
     if(!kycData.entity_type) newErrors.entity="Entity Type is required."
     break;
    case 2:
     if(!kycData.pancard_number) newErrors.pancardno="Pancard number is required";
     if(!regpan.test(kycData.pancard_number)) newErrors.pancardno="Pancard number is invalid"
     if(file===null) newErrors.pancarddoc="Please Upload KYC document"
     if(file!==null && file.type!=="application/pdf" && file.type!=="image/jpeg" && file.type!=="image/png") newErrors.pancarddoc="Valid KYC document formate is jpg, jpeg, png, pdf."
     break;
    default:
     break;
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length=== 0;
}


const nextStep = () => {
 if (validateform()){
   setActiveState((prev) => prev + 1);
 }
};

const prevStep = () => {
 setActiveState((prev) => prev - 1);
};


//check kyc details are verified
const checkKycDetails = async ()=>{
    setKycLoading(true)
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/check-kyc/${user.recruiting_agency_id}`)
      if(res.data){
        setKycVerified(true)
        setOpenKycPopUp(false)
      } 
    }catch(err){
      console.log(err)
      showNotification("Something went wrong.",'failure')
    }finally{
      setKycLoading(false)
    }
}

useEffect(()=>{
   if(user) checkKycDetails()
},[user])

const handleSubmit=async ()=>{
    if(validateform()){
      setLoad(true)
      const formdata=new FormData()
      formdata.append('file',file)

      try{
         //upload kyc details
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruiting/kycdetails/${user.recruiting_agency_id}`,kycData)

         //upload kyc documents
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruiting/kycdocs/${user.recruiting_agency_id}`,formdata,{headers: {
          'Content-Type': 'multipart/form-data',
      }})
      
      setKycVerified(true)
      setOpenKycPopUp(false)

      }catch(err){
        console.log(err)
        showNotification("Something went wrong.",'failure')
      }finally{
         setLoad(false)
      }
   }
}


  const renderKYCForm = () => {
    switch (activeState) {
      case 1: {
        return (
          <form>
            <div className="flex flex-col place-items-start text-[17px]">
              <p className="pb-[10px]">
                Select the <span className="font-semibold">Entity Type</span>
                <span className="text-orange-700">*</span> :
              </p>
              <div className="flex place-items-center pb-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="Company"
                  name="entity_type"
                  value="Company"
                  checked={kycData.entity_type==="Company"}
                />
                <label htmlFor="Company" className="pl-1">
                  Company
                </label>
              </div>
              <div className="flex place-items-center pb-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="Partnership"
                  name="entity_type"
                  value="Partnership"
                  checked={kycData.entity_type==="Partnership"}
                />
                <label htmlFor="Partnership" className="pl-1">
                  Partnership
                </label>
              </div>
              <div className="flex place-items-center">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="Independent Recruiter"
                  name="entity_type"
                  value="Independent Recruiter"
                  checked={kycData.entity_type==="Independent Recruiter"}
                />
                <label htmlFor="Independent Recruiter" className="pl-1">
                  Independent Recruiter
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-400 text-white py-1 px-3 rounded-md mt-4"
            >
              <img
                src={asset11}
                alt="right-arrow"
                className="pr-2 inline w-7 pb-[2px]"
              />
              Next
            </button>
            {errors.entity && (
              <p className="text-red-600 text-xs mt-1">{errors.entity}</p>
            )}
          </form>
        );
      }
      case 2: {
        return (
          <div>
            <form className="text-[17px]">
              <div className="flex flex-col place-items-start">
                <label htmlFor="cardnumber" className="pb-2">
                  PAN Card Number <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  id="cardnumber"
                  name="pancard_number"
                  onChange={handleChange}
                  value={kycData.pancard_number}
                  placeholder="Enter PAN number"
                  className="w-full  border-black border py-2 rounded-md pl-4"
                />
                {
                  errors.pancardno && (
                    <p className="text-red-600 text-xs mt-1">{errors.pancardno}</p>
                  )
                }
              </div>
              <div className="mt-4 flex flex-col place-items-start">
                <label htmlFor="kycdocument" className="pb-2">
                  KYC Document<span className="text-orange-800">*</span>
                </label>
                <input type="file" onChange={handleFileChange} name="document" id="kycdocument" className="w-full rounded-md text-[15px] border-gray-300 border bg-gray-200 bg-opacity-30" />
                {
                  errors.pancarddoc && (
                    <p className="text-red-600 text-xs mt-1">{errors.pancarddoc}</p>
                  )
                }
              </div>
            </form>
            <div className="flex gap-3 w-full mt-1">
              <button
                type="button"
                onClick={prevStep}
                className="bg-blue-400 text-white py-1 px-3 rounded-md mt-4"
              >
                <img
                  src={asset12}
                  alt="left-arrow"
                  className="pr-2 inline w-7 pb-[2px]"
                />
                Back
              </button>
              <button
                disabled={load}
                onClick={handleSubmit}
                type="button"
                className="bg-blue-400 w-28 flex items-center justify-center gap-1 text-white py-1 px-3 rounded-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                   {
                    load ? (
                      <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                     </svg>
                    ) : ( 
                      <span>Submit</span>
                    )
                   }

              </button>
            </div>

            {errors.backend_err && (<p className="text-red-600 text-xs my-0.5">{errors.backend_err}</p>)}
          </div>
        );
      }
      default:
        return null;
    }
  };


  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
      {
      loading && 
       <div className="fixed inset-0 flex justify-center bg-white z-40 backdrop-blur-md items-center">
        <div className="flex flex-col items-center gap-2">
          <img src={WhiteLoader} className="h-12 w-12"></img>
          <span className="text-sm font-sans">Please wait while fetching data...</span>
        </div>
       </div>
      }
      {
        user && 
        <>
         {
          openKycPopUp && 
          <div className='fixed inset-0 flex justify-center bg-black z-40 bg-opacity-50 backdrop-blur-md items-center'>
           {
            kycLoading ? (
              <div className='custom-div pb-3 w-72 flex justify-center items-center'>
                 <img src={WhiteLoader} className='w-8 h-8' alt='loader'></img>
              </div>
            ) : (
               !kycVerified && 
               <div className='custom-div gap-0 p-0 w-4/12 bg-white rounded-md  overflow-hidden'>
                 <div className="bg-blue-300 w-full bg-opacity-50 py-2 px-7">
                  <h1 className="text-xl text-blue-400 font-semibold">KYC Details</h1>
                </div>
                <div className="p-5">{renderKYCForm()}</div>
               </div>
            )
           }   
         </div>
         }
        <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
            <Navbar/>
            <div className="z-0 flex w-full h-full relative">
              <SideNavbar />
              <div className="w-full h-full flex flex-col pb-20 gap-2 relative bg-white-200 p-4 overflow-y-scroll ">
               <Outlet />
              </div>
            </div>
         </div>
        </>
      }
    
    </div>
  )
}

export default RecruitDashboard
