import React from 'react'

export default function Login() {
  return (
     <div className='login bg-gray-100 max-w-full h-screen flex justify-center items-center overflow-hidden'>
       <div className='login-form w-[38%] m-auto bg-white py-4 px-6'>
         <h1 className='text-center text-3xl font-semibold text-green-500'>Login As Uphire Internal</h1>
         <div className='w-full mt-8'>
            <form className='flex flex-col gap-4'>
              <div className='flex-start gap-2 w-full'>
                <label htmlFor='email' className='input-label'>Email ID*</label>
                <input 
                 type='email'
                 name="email"
                 id="email"
                 required
                 className='input-field'
                ></input>
              </div>
              <div className='flex-start w-full gap-2'>
                <label htmlFor='password' className='input-label'>Password*</label>
                <input
                type='password'
                name='password'
                id='password'
                required
                className='input-field'
                ></input>
              </div>
              <div className='flex-start w-full gap-2'>
                <label htmlFor='admin_type' className='input-label'>Admin Type*</label>
                <select
                  name='admin_type'
                  id='admin_type'
                  className='input-field custome-select'
                >
                 <option value={""}>Select Admin Type</option> 
                 <option value="super_admin">Super Admin</option>
                 <option value="master_admin">Master Admin</option>
                 <option value="account_manager">Account Manager</option>
                </select>

              </div>
              <button className='w-full py-[6px] bg-blue-400 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50'>Login</button>
            </form>
         </div>
       </div>
     </div>
  )
}
