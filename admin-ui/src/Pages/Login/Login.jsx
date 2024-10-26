import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios'
//importing images
import asset2 from '../../assets/asset 2.png'
import { useNavigate } from "react-router-dom";
import { setUserData } from '../../State/Admin/Action';


export default function Login() {

  const myValue=useSelector((state) => state.admin);
  console.log(myValue);

  const navigate=useNavigate();
  useEffect(()=>{
     if(myValue.userData){
        switch(myValue.userData.admin_type){
          case "master_admin":
            navigate('/master_admin')
            break;
          case "account_manager":
            navigate('/account-manager')
            break;
          case "super_admin":
            navigate('/super-admin')
            break;
          default:
            break;
        }
     }
  },[myValue,navigate])


  const [load,setLoad]=useState(false)
  const [errors,setErrors]=useState(false)
  const [formData,setFormData]=useState({
    email:"",
    password:"",
    admin_type:""
  });
  const dispatch=useDispatch();

  const handlechange=(e)=>{
    const {name,value}=e.target
    setFormData((prevData)=>({...prevData,[name]:value}))
  }

  const validateFormData=()=>{
    let newErros={}
    let ragemail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if(!formData.email)  newErros.email="Email address is required."
    else if(!ragemail.test(formData.email)) newErros.email="Email adress is invalid."
    if(!formData.password) newErros.password="Password is required."
    if(!formData.admin_type) newErros.admin_type="Admin type is required."
    
    setErrors(newErros)

    return Object.keys(newErros).length===0
    
  }

  const handleSubmit=async ()=>{
    
    if(validateFormData()){
      setLoad(true)
      let newErros={}
      try{
        const response=await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`,formData,{withCredentials:true})
        
        dispatch(setUserData(response.data.details));
        console.log(response.data.details)
        if(response.data.details.admin_type==="admin"){
          navigate('/admin/dashboard')
        }else if(response.data.details.admin_type==="account_manager"){
          navigate('/account_manager/dashboard')
        }
      else if(response.data.details.admin_type==="super_admin"){
        navigate('/super_admin/dashboard')
      }
        
        else{
          navigate('/admin/dashboard')
        }
        
      }catch(err){  
        if(err.response.status===404){
          newErros.autherr="Invalid email address or password"
        }else{
        newErros.internal="Something went wrong....!"
        }
      }
      
      setLoad(false)
      setErrors(newErros)
    }

  }
  return (
     <div className='login bg-gray-100 max-w-full  relative h-full flex overflow-hidden'>
      <div className='w-full flex place-items-center relative'>
       <div className='login-form w-[38%] relative'>
        <div className='w-8/12 h-full flex flex-col mx-auto'>
         <h1 className='text-3xl font-semibold text-green-500'>Login As Uphire Internal</h1>
         <div className='w-full mt-12'>
            <form className='flex flex-col gap-6'>
              <div className='flex-start gap-2 w-full'>
                <label htmlFor='email' className='input-label'>Email ID*</label>
                <input 
                 type='email'
                 name="email"
                 id="email"
                 value={formData.email}
                 onChange={handlechange}
                 required
                 className='input-field'
                ></input>
                {
                  errors.email && (
                    <p className="text-red-600 text-xs">{errors.email}</p>
                  )
                }
              </div>
              <div className='flex-start w-full gap-2'>
                <label htmlFor='password' className='input-label'>Password*</label>
                <input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={handlechange}
                required
                className='input-field'
                ></input>
                {
                    errors.password && (
                      <p className="text-red-600 text-xs">{errors.password}</p>
                    )

                }
              </div>
              <div className='flex-start w-full gap-2'>
                <label htmlFor='admin_type' className='input-label'>Admin Type*</label>
                <select
                  name='admin_type'
                  id='admin_type'
                  className='input-field custome-select'
                  value={formData.admin_type}
                  onChange={handlechange}
                >
                 <option value={""}>Select Admin Type</option> 
                 <option value="super_admin">Super Admin</option>
                 <option value="master_admin">Master Admin</option>
                 <option value="account_manager">Account Manager</option>
                </select>
                {
                  errors.admin_type && (
                    <p className="text-red-600 text-xs">{errors.admin_type}</p>
                  )
                }

              </div>
              <button type='button' onClick={handleSubmit} disabled={load} className='w-full mt-2 py-[6px] bg-blue-400 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50'>Login</button>
              {
                errors.internal && (
                  <p className="text-red-600 text-xs">{errors.internal}</p>
                )
              }
              {
                errors.autherr && (
                  <p className="text-red-600 text-xs">{errors.autherr}</p>
                )
              }
            </form>
         </div>
         </div>
        </div>
         <div className="login-image w-[62%] h-screen relative bg-gradient-to-b from-blue-800 to-blue-900">
          <img
            src={asset2}
            alt="login-image"
            className="relative h-full object-contain mx-auto"
          />
        </div>
       </div>
     </div>
    
  )
}
