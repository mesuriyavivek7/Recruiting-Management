import React, { useEffect, useState } from "react";
import asset11 from "../assets/asset 11.svg";
import asset12 from "../assets/asset 12.svg";
import { motion } from "framer-motion";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const KYC = () => {
    const navigate=useNavigate()
    const location=useLocation()

    const [showMessage,setShowMessage] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);
      return () => clearTimeout(timer);
    }, []);

  useEffect(()=>{
    if(!location.state){
       navigate('/')
    }
  },[location.state,navigate])

  const [load,setLoad]=useState(false)
  const [kycData,setKycData]=useState({
    entity_type:'',
    pancard_number:'',
    gst_no:'',
  })

  const [activeState, setActiveState] = useState(location.state.agency_type==="solo"?2:1);
  const [errors,setErrors]=useState({})
  const [file,setFile]=useState(null)

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


  console.log(errors)


  const nextStep = () => {
    if (validateform()){
      setActiveState((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveState((prev) => prev - 1);
  };

  const handleSubmit=async ()=>{
      let newErrors={}
      if(validateform()){
          setLoad(true)
          const formdata=new FormData()
          formdata.append('file',file)

          try{
             //upload kyc details
             await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruiting/kycdetails/${location.state.recruiting_id}`,kycData)

             //upload kyc documents
             await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruiting/kycdocs/${location.state.recruiting_id}`,formdata,{headers: {
              'Content-Type': 'multipart/form-data',
          }})
          //after successfully kyc details submitesd user redirect to login page
          navigate('/',{state:{message:"Successfully Registered, Please Login Now."}})
          setLoad(false)

          }catch(err){
              newErrors.backend_err="There is something wrong."
              setErrors(newErrors)
          }
      }
  }

  const renderSecondKycForm = () =>{

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
                    <p className="text-red-600 text-xs mt-0.5">{errors.pancardno}</p>
                  )
                }
              </div>
              {
                (kycData.entity_type==="Partnership" || kycData.entity_type==="Private limited / LLP") &&
                <div className="flex mt-4 flex-col place-items-start">
                <label htmlFor="gstnumber" className="pb-2">
                  GST Number
                </label>
                <input
                  type="text"
                  id="gstnumber"
                  name="gst_no"
                  onChange={handleChange}
                  value={kycData.gst_no}
                  placeholder="Enter Gst number"
                  className="w-full  border-black border py-2 rounded-md pl-4"
                />
               </div>
              } 
             
              <div className="mt-4 flex flex-col place-items-start">
                <label htmlFor="kycdocument" className="pb-2">
                  KYC Document<span className="text-orange-800">*</span>
                </label>
                <input type="file" onChange={handleFileChange} name="document" id="kycdocument" className="w-full rounded-md text-[15px] border-gray-300 border bg-gray-200 bg-opacity-30" />
                {
                  errors.pancarddoc && (
                    <p className="text-red-600 text-xs mt-0.5">{errors.pancarddoc}</p>
                  )
                }
              </div>
            </form>
            <div className="flex gap-3 w-full mt-1">
            {
              location.state.agency_type!=="solo"
              &&
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
            }
              <button
                disabled={load}
                onClick={handleSubmit}
                type="button"
                className="bg-blue-400 flex justify-center items-center text-white py-1 px-3 rounded-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
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
    )

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
                  value="Proprietorship firm"
                  checked={kycData.entity_type==="Proprietorship firm"}
                />
                <label htmlFor="Company" className="pl-1">
                 Proprietorship Firm
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
                  id="privatelimited"
                  name="entity_type"
                  value="Private limited / LLP"
                  checked={kycData.entity_type==="Private limited / LLP"}
                />
                <label htmlFor="Independent Recruiter" className="pl-1">
                   Private limited / LLP 
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
              <p className="text-red-600 text-xs mt-0.5">{errors.entity}</p>
            )}
          </form>
        );
      }
      case 2: {
        return (
         renderSecondKycForm()
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="relative z-20 w-screen h-screen bg-kyc-bg overflow-hidden flex place-items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {
        showMessage && 
        <motion.div 
        className="absolute w-full top-10 flex justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="bg-white p-3 font-medium rounded-md shadow text-green-700">
          Your Account is created Successfully, Please check your mail box for account credentials.
        </span>
      </motion.div>
      }
      <div className="kyc-form z-50 w-4/12 bg-white border  rounded-md mx-auto overflow-hidden">
        <div className="bg-blue-300 bg-opacity-50 py-2 px-7">
          <h1 className="text-xl text-blue-400 font-semibold">KYC Details</h1>
        </div>
        <div className="p-5">{location.state.agency_type==="solo"?renderSecondKycForm():renderKYCForm()}</div>
      </div>
    </div>
  );
};

export default KYC;
