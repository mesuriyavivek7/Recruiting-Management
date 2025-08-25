import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from 'react-toastify';

export default function RecruitingTeamForm({ 
  isOpen, 
  onClose, 
  mode = 'add', // 'add' or 'edit'
  teamMemberData = null, // for edit mode
  onSuccess,
  user 
}) {
  const [teamFormData, setTeamFormData] = useState({
    full_name: '',
    email: '',
    mobileno: '',
    hide_commision: false
  });
  const [errors, setErrors] = useState({});
  const [teamLoad, setTeamLoad] = useState(false);


  // Initialize form data when editing
  useEffect(() => {
    if (mode === 'edit' && teamMemberData) {
      setTeamFormData({
        full_name: teamMemberData.full_name || '',
        email: teamMemberData.email || '',
        mobileno: teamMemberData.mobileno || '',
        hide_commision: teamMemberData.hide_commision || false
      });
    } else {
      // Reset form for add mode
      setTeamFormData({
        full_name: '',
        email: '',
        mobileno: '',
        hide_commision: false
      });
    }
    setErrors({});
  }, [mode, teamMemberData, isOpen]);

  const handleTeamFormData = (e) => {
    const { name, value } = e.target;
    setTeamFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateTeamFormData = () => {
    let newErrors = {};
    if (teamFormData.full_name === '') newErrors.full_name = "Name is required.";
    if (teamFormData.email === "") newErrors.email = "Email address is required.";
    if (teamFormData.mobileno === "") newErrors.mobileno = "Mobile No is required.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTeamDataSubmit = async () => {
    if (validateTeamFormData()) {
      try {
        if (mode === 'add') {
          // Create new team member
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam`, {
            recruiting_agency_id: user.recruiting_agency_id,
            full_name: teamFormData.full_name,
            email: teamFormData.email,
            mobileno: teamFormData.mobileno,
            hide_commision: teamFormData.hide_commision
          });

          // Send notify mail to team member
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendteammember`, {
            to: teamFormData.email,
            name: teamFormData.full_name,
            inviter_name: user.full_name
          });

          // Send verify mail
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/sendverificationrecruitingteam`, {
            email: teamFormData.email,
            name: teamFormData.full_name
          });
                 } else {
           // Update existing team member
           await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/updatedetails/${teamMemberData._id}`, {
             full_name: teamFormData.full_name,
             email: teamFormData.email,
             mobile_no: teamFormData.mobileno,
             hide_commision: teamFormData.hide_commision
           });
         }

        onSuccess();
        onClose();
      } catch (err) {
        let newErrors = {};
        newErrors.internalError = "There is something wrong..!";
        setErrors(newErrors);
      }
      setTeamLoad(false);
    }
  };

  const checkCredentials = async () => {
    if (validateTeamFormData()) {
      setTeamLoad(true);
      try {
        if (mode === 'add') {
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkcredentials`, {
            mobileno: teamFormData.mobileno,
            email: teamFormData.email
          });
          
          if (res.data) {
            setTeamLoad(false);
            setErrors({ credentials: "Entered mobile no or email address is already exist." });
          } else {
            await handleTeamDataSubmit();
          }
        } else {
           // For edit mode, check if email/mobile exists for other users
           const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/${teamMemberData._id}`, teamFormData)
           setTeamLoad(false);
           onSuccess();
           onClose();
         }
      } catch (err) {
        console.log(err);
        setErrors({ internalError: "Something went wrong while processing the request." });
        setTeamLoad(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed z-10 inset-0 flex justify-center bg-opacity-50 backdrop-blur-md bg-black items-center'>
      <div className="rounded-md overflow-hidden border-gray-100 border-1 max-w-md w-full">
        <div className='relative w-full bg-white py-2'>
          <span 
            className='absolute cursor-pointer flex items-center text-green-600 text-sm left-2 top-4' 
            onClick={onClose}
          >
            <ArrowBackIosIcon style={{fontSize:'1rem'}}></ArrowBackIosIcon>Back
          </span>
          <h1 className='text-2xl text-center text-gray-900'>
            {mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}
          </h1>
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
              />
              {errors.full_name && (
                <p className='text-xs text-red-400'>{errors.full_name}</p>
              )}
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
              />
              {errors.email && (
                <p className='text-xs text-red-400'>{errors.email}</p>
              )}
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
              {errors.mobileno && (
                <p className='text-xs text-red-400'>{errors.mobileno}</p>
              )}
            </div>
            <div className='flex items-center mt-2 relative w-full gap-2'>
              <div 
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                  (teamFormData.hide_commision) ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setTeamFormData((prevData) => ({ ...prevData, ["hide_commision"]: !prevData.hide_commision }))}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    (teamFormData.hide_commision) ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </div> 
              <label className='input-label'>Hide Commission <span className='text-green-400'>*</span></label>
            </div>
            
            {errors.credentials && (
              <p className='text-xs text-red-400'>{errors.credentials}</p>
            )}
            
            {errors.internalError && (
              <p className='text-xs text-red-400'>{errors.internalError}</p>
            )}
            
            <button 
              disabled={teamLoad} 
              onClick={checkCredentials} 
              className='w-full relative text-white py-1 mt-2 hover:bg-blue-400 rounded-sm bg-blue-700 disabled:bg-slate-600 disabled:cursor-no-drop'
            >
              {teamLoad && (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                  </svg>
                </span>
              )}
              {!teamLoad && (mode === 'add' ? 'Add Member' : 'Update Member')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
