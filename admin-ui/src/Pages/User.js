
import React from "react";
import { ReactComponent as JobsIcon } from "../assets/asset21.svg";
import { ReactComponent as ActionIcon } from "../assets/asset23.svg";
import { ReactComponent as CandidatesIcon } from "../assets/asset20.svg";
const User = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
      
    
      <div className="w-full mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">EnterPrice</h2>
            <p className="font-bold text-green-700 pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <a href="#" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400">See all EnterPrice</a>
            <JobsIcon className="w-9" />
          </div>
        </div>
      </div>

     
      <div className="w-full mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Recruiter Agency</h2>
            <p className="font-bold text-green-700 pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <a href="#" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400">See all Recruiter Agency</a>
           <ActionIcon className="w-10"/>
          </div>
        </div>
      </div>

   
      <div className="w-full mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Account Manager</h2>
            <p className="font-bold text-green-700 pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <a href="#" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400">See all Account Manager</a>
            <CandidatesIcon className="w-9"/>
          </div>
        </div>
      </div>

     
      <div className="w-full mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Jobs</h2>
            <p className="font-bold text-green-700 pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-6 text-2xl">788</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <a href="#" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400">See all Jobs</a>
            <JobsIcon className="w-9" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default User;
