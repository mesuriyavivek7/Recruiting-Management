import React, { useEffect,useState,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

//For mobile phone input with dialing code
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Notification from '../components/Notification';

//For text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//importing icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

//importing loader
import WhiteLoader from '../assets/whiteloader.svg'

import axios from 'axios';

import Multiselect from 'multiselect-react-dropdown';

export default function RecruiterProfilePage() {

  const [isAdmin,setIsAdmin]=useState(false)

  const {user}=useContext(AuthContext)

  const [notification,setNotification]=useState(null)

  //for showing notification
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }


   const [recruiterMemberDetails,setRecruiterMemberDetails]=useState(null)
   const [recruiterAgencyDetails,setRecruiterAgencyDetails]=useState(null)


   //Data for country ,city and states
   const [countries, setCountries] = useState([]);
   const [states, setStates] = useState([]);
   const [cities, setCities] = useState([]);
   const [preferedCountryOne,setPreferedCountryOne]=useState('')
   const [preferedCountryTwo,setPreferedCountryTwo]=useState('')
   const [selectedCountry, setSelectedCountry] = useState('');
   const [selectedState, setSelectedState] = useState('');
   const [selectedCity, setSelectedCity] = useState('');
       

   const fetchRecruiterMemberDetails=async ()=>{
       try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/getredetailsforprofilepage/${user._id}`)
          console.log('recruiter member details---->',res.data)
          setRecruiterMemberDetails(res.data)
       }catch(err){
          //handeling error
          showNotification("There is something wrong while fetching recruirer details.",'failure')
          console.log(err)
       }
   }


   const fetchRecruiterAgencyDetails=async ()=>{
      try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/getagencydetailsforprofilepage/${user.recruiting_agency_id}`)
          console.log('recruiting agency details------>',res.data)
          setRecruiterAgencyDetails(res.data)
      }catch(err){
         //handeling error
         showNotification("There is something wrong while fetching recruiter details",'failure')
         console.log(err)
      }
   }
   //For change edit Mode
   const [editMode,setEditMode]=useState(false)

   const handleActiveEditMode=()=>{
      setEditMode(true)
      showNotification("You are entered into Edit Mode",'info')
   }

   const [errors,setErrors]=useState({})
   const [updateLoader,setUpdateLoader]=useState(false)

   const [recruiterMemberForm,setRecruiterMemberForm]=useState({
      profile_picture:null,
      full_name:'',
      mobile_no:'',
      email:'',
      
   })

   const [recruiterAgencyForm,setRecruiterAgencyForm]=useState({
    designation:'',
    company_name:'',
    company_size:'',
    country:'',
    state:'',
    city:'',
    company_age:'',
    linkedin_url:'',
    company_description:'',
    domains:[],
    firm_type:[],
    country_preference_one:'',
    country_preference_two:'',
    certificate_of_incorporation:null,
    experience_usa_sourcing:false
   })

   const handleSetRecruiterMemberDetails=()=>{
        setRecruiterMemberForm({
          profile_picture:((recruiterMemberDetails && recruiterMemberDetails.profile_picture)?(recruiterMemberDetails.profile_picture):(null)),
          full_name:(recruiterMemberDetails?(recruiterMemberDetails.full_name):('')),
          designation:'',
          mobile_no:(recruiterMemberDetails?(recruiterMemberDetails.mobileno):('')),
          email:(recruiterMemberDetails?(recruiterMemberDetails.email):('')),
        })

        setIsAdmin((recruiterMemberDetails)?(recruiterMemberDetails.isAdmin):(false))
   }

   const handleSetRecruiterAgencyDetails=()=>{
        setRecruiterAgencyForm({
          designation:(recruiterAgencyDetails?(recruiterAgencyDetails.designation):('')),
          company_name:(recruiterAgencyDetails?(recruiterAgencyDetails.company_name):('')),
          company_size:(recruiterAgencyDetails?(recruiterAgencyDetails.company_size):('')),
          company_age:((recruiterAgencyDetails && recruiterAgencyDetails.company_age)?(recruiterAgencyDetails.company_age):('')),
          linkedin_url:((recruiterAgencyDetails)?(recruiterAgencyDetails.linkedin_url):('')),
          country:(recruiterAgencyDetails?(recruiterAgencyDetails.country):('')),
          state:(recruiterAgencyDetails?(recruiterAgencyDetails.state):('')),
          city:(recruiterAgencyDetails?(recruiterAgencyDetails.city):('')),
          domains:(recruiterAgencyDetails?(recruiterAgencyDetails.domains):([])),
          country_preference_one:((recruiterAgencyDetails && recruiterAgencyDetails.country_preference_one)?(recruiterAgencyDetails.preferedCountryOne):('')),
          country_preference_two:((recruiterAgencyDetails && recruiterAgencyDetails.country_preference_two)?(recruiterAgencyDetails.preferedCountryTwo):('')),
          company_description:((recruiterAgencyDetails && recruiterAgencyDetails.company_description)?(recruiterAgencyDetails.company_description):('')),
          experience_usa_sourcing:((recruiterAgencyDetails)?(recruiterAgencyDetails.experience_usa_sourcing):(false)),
          firm_type:(recruiterAgencyDetails?(recruiterAgencyDetails.firm_type):([])),
          certificate_of_incorporation:(recruiterAgencyDetails?(recruiterAgencyDetails.certificate_of_incorporation):(null))
        })
        
        
       //For set country id in selectedcountry
       if(recruiterAgencyDetails && recruiterAgencyDetails.country){
          for(let i of countries){
            if(i.country_name===recruiterAgencyDetails.country){
               setSelectedCountry(parseInt(i.country_id))
               break;
            }
          }
       }
       
       //For set state id in selectedstate
       if(recruiterAgencyDetails && recruiterAgencyDetails.state){
         for(let i of states){
           if(i.state_name===recruiterAgencyDetails.state){
             setSelectedState(parseInt(i.state_id))
             break;
           }
         }
       }

       //For set city id in selectedcity
       if(recruiterAgencyDetails && recruiterAgencyDetails.city){
         for(let i of cities){
           if(i.city_name===recruiterAgencyDetails.city){
             setSelectedCity(parseInt(i.city_id))
             break;
           }
         }
       }

       //For set country id in selectedprefercountryone
       if(recruiterAgencyDetails && recruiterAgencyDetails.country_preference_one){
         for(let i of countries){
           if(i.country_name===recruiterAgencyDetails.country_preference_one){
             setPreferedCountryOne(parseInt(i.country_id))
             break
           }
         }
       }

       //For set country id in selectedprefercountrytwo
       if(recruiterAgencyDetails && recruiterAgencyDetails.country_preference_two){
         for(let i of countries){
          if(i.country_name===recruiterAgencyDetails.country_preference_two){
            setPreferedCountryTwo(parseInt(i.country_id))
          } 
         }
       }

   }

   const handleMemberFormChange=(e)=>{
        const {name,value}=e.target
        setRecruiterMemberForm((prevData)=>({...prevData,[name]:value}))

   }

   const handleAgencyFormChange=(e)=>{
        const {name,value}=e.target
        setRecruiterAgencyForm((prevData)=>({...prevData,[name]:value}))
   }


   useEffect(()=>{
         fetchRecruiterMemberDetails()
         fetchRecruiterAgencyDetails()
   },[])

   useEffect(()=>{
       handleSetRecruiterMemberDetails()
   },[recruiterMemberDetails])

   useEffect(()=>{
      handleSetRecruiterAgencyDetails()
   },[recruiterAgencyDetails])

   //For changeing domain
   const domainchange=(selectedList)=>{
        setRecruiterAgencyForm((prev)=>({...prev,domains:selectedList}))
   }


   //For changeing firm type(interested in)
   const handleChangeFirmType=(e)=>{
      const {value}=e.target

      setRecruiterAgencyForm((prevState) => {
        // Check if the value is already in the array
        if (prevState.firm_type.includes(value)) {
          // Remove the value if it's already selected (unchecking the box)
          return {
            ...prevState,
            firm_type: prevState.firm_type.filter((item) => item !== value)
          };
        } else {
          // Add the value if it's not in the array (checking the box)
          return {
            ...prevState,
            firm_type: [...prevState.firm_type, value]
          };
        }
      });
   }

   const [previewUrl,setPreviewUrl]=useState(null)
   //For Handle profile picture
   const ProfileFileType=['image/jpeg','image/png','image/jpg']
   const handleProfileFileChange=(e)=>{
    const selectedFile=e.target.files[0]
    if(selectedFile && ProfileFileType.includes(selectedFile.type) && selectedFile.size<=5*1024*1024){
       const reader=new FileReader()
       reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setRecruiterMemberForm((prevData)=>({...prevData,profile_picture:selectedFile}))
    }else{
       //handle show notification
       showNotification('Uploaded file type should be jpeg, png, jpg type and under 5mb','failure')
    }
   }


   const fileType=["application/pdf",'application/msword',"application/vnd.openxmlformats-officedocument.wordprocessingml.document",'image/jpeg','image/png','image/jpg']
   //For handle coi file
   const handleFileChange=(e)=>{
      const selectedFile=e.target.files[0]
      if(selectedFile && fileType.includes(selectedFile.type) && selectedFile.size<=10*1014*1024){
         setRecruiterAgencyForm((prevdata)=>({...prevdata,certificate_of_incorporation:selectedFile}))
      }else{
        //handle show notification
        showNotification("Please upload valid file under 10mb",'failure')
      }
   }

   const handleFileRemove=async ()=>{
       if(editMode && isAdmin){
          try{
            setRecruiterAgencyForm((prevData)=>({...prevData,certificate_of_incorporation:null}))
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruiting/checkandremovecoifile/${user.recruiting_agency_id}`)
            showNotification('File removed successfully','success')
          }catch(err){
            console.log(err)
            showNotification('There is something wrong while removing file','failure')
          }
          
       }
   }

   const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && fileType.includes(droppedFile.type) && droppedFile.size<=10*1024*1024) {
      setRecruiterAgencyForm((prevdata)=>({...prevdata,certificate_of_incorporation:droppedFile}))
    }else{
      showNotification("Please select valid file type under 10mb","failure")
    }
  };


   //For handle company description
   const handleDescription= (newContent)=>{
       setRecruiterAgencyForm((prevData)=>({...prevData,company_description:newContent}))
   }


  const getTextLength=(htmlContent)=>{
    const div=document.createElement('div')
    div.innerHTML=htmlContent
    const text=div.textContent || div.innerText || ''
    return text.length
 }
 
 

  //moduels and formate for quill text editor
  const modules={
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'color': [] }], // Add color and background color options                             
  ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline','color',
    'list', 'bullet', 'indent', // Include color and background in formats
    ];



  const handleCountryChange = (event) => {
    const selectedCountryId = parseInt(event.target.value);
    setSelectedCountry(selectedCountryId);
    setSelectedState('');
    setSelectedCity('')
    for(let i of countries){
       if(parseInt(i.country_id)===selectedCountryId){
        setRecruiterAgencyForm((prevData) => ({ ...prevData, country: i.country_name}));
        break;
       }
    }
  };


  const handleStateChange = (event) => {
    const selectedStateId = parseInt(event.target.value);
    setSelectedState(selectedStateId);
    setSelectedCity('')
    for(let i of states){
      if(parseInt(i.state_id)===selectedStateId){
       setRecruiterAgencyForm((prevData) => ({ ...prevData, state: i.state_name}));
       break;
      }
   }
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    setSelectedCity(selectedCityId);
    for(let i of cities){
      if(parseInt(i.city_id)===selectedCityId){
       setRecruiterAgencyForm((prevData) => ({ ...prevData, city: i.city_name}));
       break;
      }
   }
  };


  const handlePreferdCountryOneChange=(event)=>{
    const selectedCountryId = parseInt(event.target.value);
    setPreferedCountryOne(selectedCountryId)
    for(let i of countries){
       if(parseInt(i.country_id)===selectedCountryId){
        setRecruiterAgencyForm((prevData) => ({ ...prevData, country_preference_one: i.country_name}));
        break;
       }
    }

  }

  const handlePreferdCountryTwoChange=(event)=>{
    const selectedCountryId = parseInt(event.target.value);
    setPreferedCountryTwo(selectedCountryId)
    for(let i of countries){
       if(parseInt(i.country_id)===selectedCountryId){
        setRecruiterAgencyForm((prevData) => ({ ...prevData, country_preference_two: i.country_name}));
        break;
       }
    }
  }


  const getCountries = async () => {
    try {
      const response = await fetch("/tbl_country.json");
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      console.log("Error while fetching countries", error);
    }
  };

  const getStates = async () => {
    try {
      const response = await fetch("/tbl_state.json");
      const result = await response.json();
      setStates(result);
    } catch (error) {
      console.log("Error while fetching states", error);
    }
  };

  const getCities = async () => {
    try {
      const response = await fetch("/tbl_city.json");
      const result = await response.json();
      setCities(result);
    } catch (error) {
      console.log("Error while fetching cities", error);
    }
  };
  

  useEffect(() => {
    getCountries();
    getStates();
    getCities();
  }, []);

  const validateRecruiterMember=()=>{
    let newerrors={}

    //Regax for check email address
    const emailRegax=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!recruiterMemberForm.full_name) newerrors.full_name='Full name is required.'
    if(!recruiterMemberForm.email) newerrors.email="Email address is required."
    else if(!emailRegax.test(recruiterMemberForm.email)) newerrors.email="Email address is invalid."
    if(!recruiterMemberForm.mobile_no) newerrors.mobile_no='Mobile no is required.'
    else if(recruiterMemberForm.mobile_no && recruiterMemberForm.mobile_no.length<12) newerrors.mobile_no="Mobile no is invalid."
    setErrors(newerrors)
    if(Object.keys(newerrors).length!==0) showNotification("Please fill out appropriate fi")
    return Object.keys(newerrors).length===0
  }


  const validateRecruiterAgencyDetails=()=>{
      let newerrors={}

      //Regax for check url
      const urlRegax=/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/

      if(!recruiterAgencyForm.company_name) newerrors.company_name="Company name is required."
      if(!recruiterAgencyForm.company_size) newerrors.company_size="Company size is required."
      if(!recruiterAgencyForm.linkedin_url) newerrors.linkedin_url='Linkedin url is required.'
      else if(!urlRegax.test(recruiterAgencyForm.linkedin_url)) newerrors.linkedin_url="Linkedin url is invalid"
      if(!recruiterAgencyForm.country) newerrors.country="Country is required."
      if(!recruiterAgencyForm.state) newerrors.state="State is required."
      if(!recruiterAgencyForm.city) newerrors.city="City is required."
      if(recruiterAgencyForm.domains.length===0) newerrors.domains='Domains is required.'
      if(recruiterAgencyForm.firm_type===0) newerrors.fileType="Your interested of any one is required."

      setErrors(newerrors)

      if(Object.keys(newerrors).length!==0) showNotification("Please fill out appropriate fields.",'failure')

      return Object.keys(newerrors).length===0
  }


  const handleProfilePictureUpload=async ()=>{
     console.log('profile picture uploaded')
     if(recruiterMemberForm.profile_picture){
        try{
        const data=new FormData()
        data.append('file',recruiterMemberForm.profile_picture)
        data.append("upload_preset","upload")

        const uploadRes=await axios.post('https://api.cloudinary.com/v1_1/djxavfpqc/image/upload',data)
        const {url}=uploadRes.data

        return url
       }catch(err){
        //handle error log
        showNotification('There is something went wrong while uploading profile picture.','failure')
       }
     }
  }

  const handleCheckMobileAndEmail=async (url)=>{

     try{
        if(recruiterMemberForm.mobile_no!==recruiterMemberDetails.mobileno){
           const mobilecheck=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkmobileno/${user._id}`,{mobile_no:recruiterMemberForm.mobile_no})
           if(mobilecheck.data){
             setUpdateLoader(false)
             showNotification("Entered mobile no is alredy exist.",'failure')
             return true
           }
        }

        if(recruiterMemberForm.email!==recruiterMemberDetails.email){
          const emailcheck=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkemailaddress/${user._id}`,{email:recruiterMemberForm.email})
          if(emailcheck.data){
             setUpdateLoader(false)
             showNotification("Entered email address is alredy exist.",'failure')
             return true
          }
        }
         
        await handleUpdateMemberDetails(url)

        return false
        

     }catch(err){
       console.log(err)
     }
  }

  const handleUpdateMemberDetails=async (url)=>{
        let profile_url=(url)?(url):('')
        try{
           console.log('request gone...')
           await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/updatedetails/${user._id}`,{...recruiterMemberForm,profile_picture:profile_url})
        }catch(err){
          showNotification("There is something wrong while updating details.",'failure')
          console.log(err)
        }
  }

  const handleUpdateAgencyDetails=async ()=>{
        
          try{
            //upload coi certificate if available
            if(recruiterAgencyForm.certificate_of_incorporation){
              let filedata=new FormData()
              filedata.append('file',recruiterAgencyForm.certificate_of_incorporation)
              await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruiting/uploadcoi/${user.recruiting_agency_id}`,filedata,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              })
            }
             
            //update details
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruiting/updateagencydetails/${user.recruiting_agency_id}`,recruiterAgencyForm)

          }catch(err){
            showNotification("There is somwthing wrong while updating details",'failure')
            console.log(err)
          }
        
  }

  const handleSaveChanges = async () => {
    if (validateRecruiterMember()) {
      setUpdateLoader(true);
      
      let profile_picture = await handleProfilePictureUpload();
      let flag = await handleCheckMobileAndEmail(profile_picture);
  
      // If flag is true, stop execution and exit the function
      if (flag) {
        setUpdateLoader(false);
        return;
      }
  
      await fetchRecruiterMemberDetails();
    }
  
    if(validateRecruiterAgencyDetails()) {
      await handleUpdateAgencyDetails();
      await fetchRecruiterAgencyDetails();
    }
  
    showNotification('Recruiter member details updated.', 'success');
    setEditMode(false);
    setUpdateLoader(false);
  };
  



  return (
   <div className='w-full flex flex-col gap-2'>
   {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
   {
    updateLoader && 
    <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
        <div className='custom-div w-[450px] items-center'>
          <img className='w-10 h-10' src={WhiteLoader}></img>
          <span>Wait while we are updating details...</span>
        </div>
     </div>

   }
     
     <div className='custom-div flex-row justify-between pb-4'>
       <h2 className='text-xl font-medium'>SR Profile Details</h2>
       <div className='flex gap-2'>
          {
            
            !editMode?
            (
              <button onClick={handleActiveEditMode} className='bg-blue-400 flex gap-1 items-center rounded-md py-1 px-2 text-white'><EditOutlinedIcon style={{fontSize:'1.4rem'}}></EditOutlinedIcon> Edit</button>
            ):
            (
              <button onClick={handleSaveChanges} className='bg-blue-400 rounded-md py-1 px-2 text-white'>Save Changes</button>
            )
            
          }
          
          
       </div>
     </div>
     <div className='custom-div flex-row items-center gap-18'>
        <div className='w-[15%] flex  items-center flex-col gap-3'>
            <span className='text-[18px] font-medium'>Personal Details</span>
            {
               previewUrl?(
                <img className='w-28 h-28 rounded-full' src={previewUrl} alt='profile picture'></img>
               ):(
                 recruiterMemberForm.profile_picture?(
                   <img className='w-28 h-28 rounded-full' src={recruiterMemberForm.profile_picture}></img>
                 ):(
                  <div className='w-28 h-28 bg-blue-400 flex justify-center items-center rounded-full'>
                    <span className='text-white text-xl'>VM</span>
                  </div>
                 )
                
               )
            }
           {
            editMode && <label htmlFor='profile_picture' className='bg-blue-400 cursor-pointer font-light text-sm p-2 rounded-md text-white'>Change Picture</label>
           } 
            <input 
            type='file'
            id='profile_picture'
            className='hidden'
            onChange={handleProfileFileChange}
            accept='image/jpeg, image/png, image/jpg'
            ></input>
        </div>
        <div className='w-[82%] flex p-2 flex-col gap-5'>
            <div className='flex w-full gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                     <label className='input-label'>Name <span className='text-red-400'>*</span></label>
                     <input
                      name='full_name'
                      readOnly={!editMode} 
                      onChange={handleMemberFormChange}
                      value={recruiterMemberForm.full_name} 
                      type='text' className='input-field'></input>
                      {
                        errors.full_name && 
                        <span className='text-red-400 text-sm'>{errors.full_name}</span>
                      }
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='input-label'>Designation <span className='text-red-400'>*</span></label>
                    <input 
                    name='designation'
                    onChange={handleAgencyFormChange}
                    readOnly={!editMode} 
                    value={recruiterAgencyForm.designation} 
                    type='text' 
                    className='input-field'></input>
                </div>
            </div>
            <div className='flex w-full gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                     <label className='input-label'>Phone Number <span className='text-red-400'>*</span></label>
                     <PhoneInput
                     country={"in"}
                     value={recruiterMemberForm.mobile_no}
                     containerStyle={{ width: "100%" }}
                     disabled={!editMode}
                     onChange={(phone) =>
                     setRecruiterMemberForm((prevData) => (
                      {
                        ...prevData,
                        mobile_no:phone
                      }
                     ))}
                     />
                     {
                      errors && (
                        <span className='text-red-400 text-sm'>{errors.mobile_no}</span>
                      )
                     }
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='input-label'>Email <span className='text-red-400'>*</span></label>
                    <input 
                    name='email'
                    onChange={handleMemberFormChange}
                    value={recruiterMemberForm.email} 
                    readOnly={!editMode} type='email' 
                    className='input-field'></input>
                    {
                      errors.email && (
                        <span className='text-red-400 text-sm'>{errors.email}</span>
                      )
                    }
                </div>
            </div>
        </div>
     </div>
     <form className='custom-div gap-5'>
         <h2 className='text-[18px] font-medium'>Compnay Details</h2>
         <div className='w-full flex gap-4'>
            <div className='flex w-[60%] flex-col gap-2'>
                <label htmlFor='company_name' className='input-label'>Company Name <span className='text-red-400'>*</span></label>
                <input 
                name='company_name'
                onChange={handleAgencyFormChange}
                id='company_name' 
                readOnly={!editMode || !isAdmin} 
                value={recruiterAgencyForm.company_name} 
                className='input-field' type='text'></input>
            </div>
            <div className='flex w-[19%] flex-col gap-2'>
                <label htmlFor='company_size' className='input-label'>Company Size <span className='text-red-400'>*</span></label>
                <select 
                id='company_size' 
                name='company_size'
                onChange={handleAgencyFormChange}
                disabled={!editMode || !isAdmin} 
                value={recruiterAgencyForm.company_size} 
                className='input-field custom-select'>
                  <option value="">Select Company Size</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
            </div>
            <div className='flex w-[19%] flex-col gap-2'>
                <label htmlFor='company_age' className='input-label'>Company Age (in Years)</label>
                <input 
                id='company_age' 
                name='company_age'
                onChange={handleAgencyFormChange}
                readOnly={!editMode || !isAdmin} 
                value={recruiterAgencyForm.company_age} 
                className='input-field' type='text'></input>
            </div>
         </div>
         <div className='w-full flex gap-4'>
            <div className='flex-1 flex flex-col gap-2'>
                 <label className='input-label' htmlFor='linkedin_url'>LinkedIn Url <span className='text-red-400'>*</span></label>
                 <input 
                 id='linkedin_url' 
                 name='linkedin_url'
                 onChange={handleAgencyFormChange}
                 readOnly={!editMode || !isAdmin} 
                 value={recruiterAgencyForm.linkedin_url} 
                 className='input-field' type='text'></input>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor="country" className="input-label">
                  Country <span className="text-red-400">*</span>
                </label>
                <select
                  disabled={!editMode || !isAdmin}
                  name="country"
                  id="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor="state" className="input-label">
                  State <span className="text-red-400">*</span>
                </label>
                 <select
                  disabled={!editMode || !isAdmin}
                  name="state"
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="input-field custom-select"
                 >
                  <option value="">Select State</option>
                  {states
                    .filter(
                      (state) => parseInt(state.country_id) === selectedCountry
                    )
                    .map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                 <label htmlFor="city" className="input-label">
                  City <span className="text-red-400">*</span>
                </label>
                <select
                  disabled={!editMode || !isAdmin}
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="input-field custom-select"
                >
                  <option value="">Select City</option>
                  {cities
                    .filter((city) => parseInt(city.state_id) === selectedState)
                    .map((city) => (
                      <option key={city.city_id}  value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))}
                </select>
            </div>
         </div>
         <div className='h-[280px] w-full flex flex-col gap-2'>
             <label htmlFor='company_profile'>Compnay Profile </label>
             <ReactQuill 
                value={recruiterAgencyForm.company_description}
                style={{height:'200px'}}
                onChange={newContent=>handleDescription(newContent)}
                modules={modules}
                formats={formats}
                theme="snow"
                readOnly={!editMode || !isAdmin}
             />
         </div>
         <div className='flex flex-col gap-2'>
            <label className='input-label'>Domains (Select up to 10 Domains) <span className='text-red-400'>*</span></label>
            <Multiselect
                    selectedValues={recruiterAgencyForm.domains}
                    disable={!editMode || !isAdmin}
                    style={{
                      multiselectContainer: {
                        "width":"1310px",
                      },
                      inputField:{
                        "width":"100%",
                        "color":"black"
                      },
                      chips:{
                        "backgroundColor":"gray"
                      },
                      option:{
                        "backgroundColor":"white",
                        "color":"black"
                      }
                    }}
                    isObject={false}
                    onRemove={domainchange}
                    onSelect={domainchange}
                    placeholder="Select Multiple Domains..."
                    options={[
                      "Accounting/Corporate Finance", 
                      "Administrative/Generalist", 
                      "Advertising/Event Management/PR/MR", 
                      "Aerospace", 
                      "Agriculture/Dairy/Fishing", 
                      "Allied Healthcare",
                      "Architecture/Interior Design", 
                      "Automotive/Ancillaries",
                      "Information technology (IT)", 
                      "Legal/Law/Secretarial",
                      "Logistics/Supply Chain", 
                      "Maid Services",
                      "Manufacturing/Industrial/Production/Machinery", 
                      "Petroleum/Oil & Gases/Energy/Utilities",
                      "Pharmaceuticals/Biotechnology/Clinical Research", 
                      "Real Estate/Property",
                      "Banking/Financial Services/Insurance",
                      "BPO/KPO/ITES/CRM/Transcription/E-Learning",
                      "Broadcasting",
                      "Chemicals/Fertilizers/Polymer/Plastic/Rubber",
                      "Communication/Telcom/ISP",
                      "Construction/Cement/Metals/Infrastructure",
                      "Consulting/Strategy",
                      "Courier/Freight/Transportation",
                      "Food Processing/Beverages/Nutrition",
                      "Hardware/Chip Design & Embedded Software",
                      "HealthCare -Doctors/Surgeons/physicians",
                      "Healthcare- Hospital Administration",
                      "Healthcare- Nurses & Support Workers",
                      "Hospitality/Airlines/Travel/Tourism",
                      "Human Resources/Talent Acquisition",
                      "Information security/Cyber Security/IT security and Audit",
                      "Information technology (IT)",
                      "Legal/Law/Secretarial",
                      "Logistics/Supply Chain",
                      "Maid Services",
                      "Manufacturing/Industrial/Production/Machinery",
                      "Petroleum/Oil & Gases/Energy/Utilities",
                      "Pharmaceuticals/Biotechnology/Clinical Research",
                      "Real Estate/Property",
                      "Shipping/Marine"
                   ]}
                 />
         </div>
         <div className='flex flex-col gap-2 w-full'>
                 <label className="input-label">
                  Interested In <span className="text-red-400">*</span>
                </label>
                <div className="flex item-center w-full gap-12">
                  <label className='text-sm'>
                    <input
                      disabled={!editMode || !isAdmin}
                      type="checkbox"
                      name="firm_type"
                      value="Permanent Hiring"
                      onChange={handleChangeFirmType}
                      checked={recruiterAgencyForm.firm_type.includes('Permanent Hiring')}
                    />
                    <span className="pl-1">Permanent Hiring</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      disabled={!editMode || !isAdmin}
                      type="checkbox"
                      name="firm_type"
                      value="Contract Staffing"
                      onChange={handleChangeFirmType}
                      checked={recruiterAgencyForm.firm_type.includes('Contract Staffing')}
                    />
                    <span className="pl-1">Contract Staffing</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      disabled={!editMode || !isAdmin}
                      type="checkbox"
                      name="firm_type"
                      value="Executive Search"
                      onChange={handleChangeFirmType}
                      checked={recruiterAgencyForm.firm_type.includes('Executive Search')}
                    />
                    <span className="pl-1">Executive Search</span>
                  </label>
                  <label className='text-sm'>
                    <input
                      disabled={!editMode || !isAdmin}
                      type="checkbox"
                      name="firm_type"
                      value="Only Payrolling"
                      onChange={handleChangeFirmType}
                      checked={recruiterAgencyForm.firm_type.includes('Only Payrolling')}
                    />
                    <span className="pl-1">Only Payrolling</span>
                  </label>
               </div>
         </div>
         <div className='w-full flex gap-4'>
            <div className='flex-1 flex flex-col gap-2'>
               <label htmlFor='prefer_country1' className='input-label'>Country (First Preference 1) <span className='text-red-400'>*</span></label>
               <select
                  disabled={!editMode || !isAdmin}
                  name="country"
                  id="prefer_country1"
                  value={preferedCountryOne}
                  onChange={handlePreferdCountryOneChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Preference Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
               <label htmlFor='prefer_country2' className='input-label'>Country (First Preference 2) <span className='text-red-400'>*</span></label>
               <select
                  disabled={!editMode || !isAdmin}
                  name="country"
                  id="prefer_country2"
                  value={preferedCountryTwo}
                  onChange={handlePreferdCountryTwoChange}
                  className="input-field custom-select"
                >
                  <option value="">Select Preference Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
            </div>
         </div>

        {
           isAdmin && 
           <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span>Certificate of Incorporation (COI)</span>
              <p className='text-sm text-gray-400'>Please upload a copy of Certificate of Incorporation (COI)</p>
            </div>

             {
                 !recruiterAgencyForm.certificate_of_incorporation?(

                  <div onDragOver={handleDragOver} onDrop={handleDrop} className='bg-slate-100 hover:border-blue-700 h-20 border border-blue-500 border-dashed rounded-md flex justify-center items-center'>
                    <label htmlFor='coi_file' className='flex cursor-pointer font-light gap-2 items-center'>
                    <span className='text-blue-400'><CloudUploadOutlinedIcon></CloudUploadOutlinedIcon></span>
                    Drag and drop or browse your file
                    <input
                    disabled={!editMode || !isAdmin} 
                    type='file'
                    className='hidden'
                    onChange={handleFileChange}
                    id='coi_file'
                    accept='image/jpeg, image/png, image/jpg application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ></input>
                   </label>
                  </div>
                 ):
                 (
                  <div className='shadow border p-2 flex rounded-md justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      <span className='bg-slate-100 h-10 w-10 flex justify-center items-center rounded-full text-blue-400'><InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon></span>
                      {(recruiterAgencyForm.certificate_of_incorporation.name)?(recruiterAgencyForm.certificate_of_incorporation.name):(recruiterAgencyForm.certificate_of_incorporation.filename)}
                    </div>
                    {
                      (editMode && isAdmin) &&
                       <span onClick={handleFileRemove} className='text-red-400 cursor-pointer'>
                          <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                       </span>
                    }
                   
                  </div>
                 )
             }
         </div>
        }
         

         <div className='flex gap-2'>
            <input 
            disabled={!editMode || !isAdmin}
            onChange={()=>setRecruiterAgencyForm((prevData)=>({...prevData,experience_usa_sourcing:!recruiterAgencyForm.experience_usa_sourcing}))} 
            checked={recruiterAgencyForm.experience_usa_sourcing} type='checkbox'></input>
            <span>Experienced in sourcing USA-based candidates for USA-based jobs</span>
         </div>
     </form>
    </div> 
  )
}
