import React , {useState, useEffect} from 'react'
import Notification from "../Notification";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';


function PostJobForm3({ onNext, onPrev, onFormDataChange, jobid, parentFormData}) {

  const {userData} = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    clientVisibility:(Object.keys(parentFormData.form3).length>0)?(parentFormData.form3.client_visibility):("Visible"),
    clientName: "",
    clientDescription:(Object.keys(parentFormData.form3).length>0)?(parentFormData.form3.client_description):(""),
    agreeToTerms: (Object.keys(parentFormData.form3).length>0)?(parentFormData.form3.agree_to_tearms):(false),
  });

  const [action,setAction]=useState(false)

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

    //for showing notification
    const [notification,setNotification]=useState(null)

    //for showing notification
    const showNotification=(message,type)=>{
     setNotification({message,type})
   }
  
  const validate = () => {
    const newErrors = {};
    if (!formData.clientVisibility) newErrors.clientVisibility = "Please select client visibility.";
    if (!formData.clientName) newErrors.clientName = "Please enter client name.";
    if (!formData.clientDescription || getTextLength(formData.clientDescription)<100)
      newErrors.clientDescription = "Client description must be at least 100 characters.";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const getTextLength=(htmlContent)=>{
    const div=document.createElement('div')
    div.innerHTML=htmlContent
    const text=div.textContent || div.innerText || ''
    return text.length
 }


 const handleDescription=(newContent)=>{
     setFormData((prevData)=>({...prevData,clientDescription:newContent}))
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


  
  const handleParentFormDataChange=()=>{
      onFormDataChange({
          enterprise_id:userData._id,
          job_id:jobid,
          client_visibility:formData.clientVisibility,
          client_name:formData.clientName,
          client_description:formData.clientDescription,
          agree_to_tearms:formData.agreeToTerms
      })
  }

  useEffect(()=>{
    if(action && validate()) handleParentFormDataChange()
    else setAction(false)
  },[action])
  
  useEffect(()=>{
    if(action===true) handleNext()
    setAction(false)
  },[parentFormData])


  const handleNext = () => {
      onNext(formData);
    
  };

  const handlePrev=()=>{
    onPrev()
  }

  return (
    <>
    {notification && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification(null)}></Notification>}
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div mx-3 w-full relative">
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Company Details</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Client Visibility*</p>
              <div className="flex place-items-start gap-3 mt-2">
                <input
                  type="radio"
                  id="visible"
                  name="clientVisibility"
                  value="Visible"
                  className="w-[16px] h-[16px] mt-1"
                  checked={formData.clientVisibility === "Visible"}
                  onChange={handleChange}
                />
                <label htmlFor="visible" className="input-label">
                  <span className="font-semibold text-base">Visible</span>{" "}
                  <br /> Client name will be visible to all vendor partners
                </label>
              </div>
              <div className="flex place-items-start gap-3 mt-2">
                <input
                  type="radio"
                  id="hidden"
                  value="Hidden"
                  name="clientVisibility"
                  className="w-[16px] h-[16px] mt-1"
                  checked={formData.clientVisibility === "Hidden"}
                  onChange={handleChange}
                />
                <label htmlFor="hidden" className="input-label">
                  <span className="font-semibold text-base">
                    Hidden until job accepted
                  </span>
                  <br /> Client name will be hidden from partners until they
                  accept the job
                </label>
              </div>
              {errors.clientVisibility && <p className="text-red-600 text-xs">{errors.clientVisibility}</p>}
            </div>
            <div className="w-full relative flex flex-col gap-2 mt-6">
              <label htmlFor="client-name" className="input-label">
                Client Name*
              </label>
              <input
                type="text"
                name="clientName"
                id="client-name"
                className="input-field"
                placeholder="Enter Company name"
                onChange={handleChange}
                value={formData.clientName}
              />
              {errors.clientName && <span className='text-red-500 text-sm'>{errors.clientName}</span>}
            </div>
            <div className="w-full relative flex flex-col gap-2 mt-3">
              <label htmlFor="client-description" className="input-label">
                Client Description
                <span className="text-green-700">*</span>
                <span className="d-block text-xs mt-2"> (Min 100 characters)</span>
              </label>
              {errors.clientDescription && <p className="text-red-600 text-xs">{errors.clientDescription}</p>}
               <div className="max-h-fit">
               <ReactQuill 
                style={{height:'200px'}}
                value={formData.clientDescription}
                onChange={newContent=>handleDescription(newContent)}
                modules={modules}
                formats={formats}
                theme="snow"
                />
                </div>
            </div>
            <div className="flex place-items-center gap-3 mt-12">
              <input
                type="checkbox"
                id="agree-to-terms"
                name="agreeToTerms"
                className="w-[16px] h-[16px]"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agree-to-terms" className="input-label">
                I agree to be bound by the terms of membership of Uphire.
              </label>
              {errors.agreeToTerms && <p className="text-red-600 text-xs">{errors.agreeToTerms}</p>}
            </div>
          </form>
        </div>
      </div>
      <div className="custom-div place-items-end pb-2">
         <div className="flex gap-2">
           <button 
             className="py-1.5 px-4 text-gray-400 hover:bg-gray-100 rounded-sm border"
             onClick={handlePrev}
           >previous</button>
           <button
            type="button"
            className="py-1.5 px-4 text-base bg-blue-600 rounded-sm text-white"
            onClick={()=>setAction(true)}
           >
            Next
          </button>
         </div>
      </div>
    </div>
    </>
  )
}

export default PostJobForm3