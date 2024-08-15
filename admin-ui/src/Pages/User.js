import React from "react";
import { ReactComponent as JobsIcon } from "../assets/asset21.svg";
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AddBusinessIcon from '@mui/icons-material/AddBusiness';



const User = () => {
 




  

   
  return (
   
    <div className=" grid grid-cols-4 p-3">

<div class="w-[400px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
 
  <div class="p-6">
    <div className="flex justify-between ">
    <h2 class="text-2xl font-semibold text-gray-600 mb-2">EnterPrice</h2>
    <p className="font-bold text-green-700 pt-2 ">^20%</p>
    </div>
    
    <p class="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
    <div class="  flex justify-between space-x-10 pt-8">
    <a href="#" class="inline-block bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400">See all EnterPrice</a>
    <JobsIcon className="w-9"/>

  </div>
  </div>
  
</div>
<div class="w-[400px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
 
  <div class="p-6">
    <div className="flex justify-between ">
    <h2 class="text-2xl font-semibold text-gray-600 mb-2">Recruiter Agency</h2>
    <p className="font-bold text-green-700 pt-2 ">^20%</p>
    </div>
    
    <p class="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
    <div class="  flex justify-between space-x-10 pt-8">
    <a href="#" class="inline-block bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400">See all Recruiter Agency</a>
    {/* <AddBusinessIcon fontSize='large'/> */}
    <JobsIcon className="w-9"/>

  </div>
  </div>
  
</div>
<div class="w-[400px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
 
  <div class="p-6">
    <div className="flex justify-between ">
    <h2 class="text-2xl font-semibold text-gray-600 mb-2">Account Manager</h2>
    <p className="font-bold text-green-700 pt-2 ">^20%</p>
    </div>
    
    <p class="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
    <div class="  flex justify-between space-x-10 pt-8">
    <a href="#" class="inline-block bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400">See all Account Manager</a>
    {/* <ManageAccountsIcon fontSize='large'/> */}
    <JobsIcon className="w-9"/>

  </div>
  </div>
  
</div>
<div class="w-[400px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
 
  <div class="p-6">
    <div className="flex justify-between ">
    <h2 class="text-2xl font-semibold text-gray-600 mb-2">Jobs</h2>
    <p className="font-bold text-green-700 pt-2 ">^20%</p>
    </div>
    
    <p class="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
    <div class="  flex justify-between space-x-10 pt-8">
    <a href="#" class="inline-block bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400">See all Jobs</a>
    <JobsIcon className="w-9"/>

  </div>
  </div>
  
</div>



    </div>

    
  );
};

export default User;
