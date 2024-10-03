import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const EmailPopup = ({ onClose, onSubmit,setCandidateMails, candiadteMails }) => {
  
  const [emailData, setEmailData] = useState({
    email: [],
    subject: '',
    cc:'',
    message: '',
    attachments:null
  });
  const [errors,setErrors]=useState({})

  const handleMailChange=async (selectedList)=>{ 
      setEmailData((prevData)=>({...prevData,email:selectedList}))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange=(e)=>{
     setEmailData((prevData)=>({
      ...prevData,
      attachments:e.target.files[0]
     }))
  }

  const validateData=()=>{
     let newErrors={}

     if(emailData.email.length===0) newErrors.email="Select atleast one candiadte email address."
     if(!emailData.subject) newErrors.subject="Subject for mail is required."
     if(!emailData.message) newErrors.message="Message for mail is required."
     if(emailData.attachments && emailData.attachments.size>10*1024*1024) newErrors.attachments="Attachment file size must be less then 5mb."

     setErrors(newErrors)

     return Object.keys(newErrors).length===0
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateData()){
      onSubmit(emailData);
      setEmailData({ email: '', subject: '',cc: '', message: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 pt-4 rounded shadow-lg w-3/4 max-w-lg">
        <h2 className='text-center mb-2 text-xl font-semibold'>Mail Box</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Multiselect
                    style={{
                      multiselectContainer: {
                        "width":"450px",
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
                    id="city"
                    isObject={false}
                    selectedValues={emailData.email}
                    onRemove={handleMailChange}
                    onSelect={handleMailChange}
                    placeholder="Select Candidate Mails"
                    options={candiadteMails}
                 />
                 {
                  errors.email && 
                  <span className='text-red-400 text-sm'>{errors.email}</span>
                 }
              
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>CC</label>
            <input 
            type='text'
            name='cc'
            value={emailData.cc}
            onChange={handleInputChange}
            className='border rounded p-2 w-full'
            >
            </input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={emailData.subject}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
                {
                  errors.subject && 
                  <span className='text-red-400 text-sm'>{errors.subject}</span>
                 }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              rows={5}
              name="message"
              value={emailData.message}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            ></textarea>
            {
                  errors.message && 
                  <span className='text-red-400 text-sm'>{errors.message}</span>
            }
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Attachments</label>
            <input 
              type='file'
              className='cursor-pointer' 
              name='attachments' 
              accept="image/jpeg, image/png, application/pdf, video/mpeg, video/mp4, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}>
              </input>
              {
                  errors.attachments && 
                  <span className='text-red-400 text-sm'>{errors.attachments}</span>
              }
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPopup;
