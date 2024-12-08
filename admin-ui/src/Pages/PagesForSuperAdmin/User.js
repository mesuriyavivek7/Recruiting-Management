
import React, { useEffect, useState } from "react";
import { ReactComponent as JobsIcon } from "../../assets/asset21.svg";
import { ReactComponent as ActionIcon } from "../../assets/asset23.svg";
import { Link } from "react-router-dom";
import { getAllVerifiedCandidatesSuperAdmin, getAllVerifiedEnterprisesSuperAdmin, getAllVerifiedJobsSuperAdmin, getAllVerifiedRecruitingAgenciesSuperAdmin } from "../../services/api";

const User = () => {
  const [enterpriseCount, setEnterpriseCount] = useState(0);
  const [recruiterCount, setRecruiterCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  const fetchCount = async () => {
    try {
      const enCount = await getAllVerifiedEnterprisesSuperAdmin();
      setEnterpriseCount(enCount.data.length);

      const reCount = await getAllVerifiedRecruitingAgenciesSuperAdmin();
      setRecruiterCount(reCount.data.length);

      const caCount = await getAllVerifiedCandidatesSuperAdmin();
      setCandidateCount(caCount.data.length);

      const jbCount = await getAllVerifiedJobsSuperAdmin();
      setJobCount(jbCount.data.length);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4  gap-6 p-3 ">
      <div className=" w-full lg:w-96 xl:w-full  mx-auto bg-white border border-gray-300  rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className=" text-sm xl:text-xl font-semibold text-gray-600 mb-2">Enterprise</h2>
            <p className="font-bold text-green-700 lg:pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-3 xl:pt-6  text-xl xl:text-2xl">{enterpriseCount}</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <Link to="/super_admin/enterprise" className="inline-block  bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400 text-xs xl:text-lg">see all</Link>
            <img height="50" src="https://img.icons8.com/ios-filled/50/company.png" alt="company" className="w-10" />
          </div>
        </div>
      </div>


      <div className="w-full lg:w-96 xl:w-full mx-auto bg-white border border-gray-300  rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">Recruiter Agency</h2>
            <p className="font-bold text-green-700 lg:pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-3 xl:pt-6 text-xl xl:text-2xl">{recruiterCount}</p>
          <div className="flex justify-between items-center space-x-10 pt-8">

            <Link to="/super_admin/recruiting-agency" className="inline-block  bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400 text-xs xl:text-lg">see all</Link>
            <ActionIcon className="w-9 xl:w-11" />
          </div>
        </div>
      </div>


      <div className="w-full lg:w-96 xl:w-full mx-auto bg-white border border-gray-300  rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">Candidate</h2>

            <p className="font-bold text-green-700 xl:pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-3 xl:pt-6 text-xl xl:text-2xl">{candidateCount}</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <Link to="/super_admin/candidates" className="inline-block  bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400 text-xs xl:text-lg">see all</Link>

            {/* <a href="#" className="inline-block  bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400 text-xs xl:text-lg">See all </a> */}

            <img height="50" src="https://img.icons8.com/ios-filled/50/manager.png" alt="manager" className="w-10" />
          </div>
        </div>
      </div>


      <div className=" w-full lg:w-96 xl:w-full mx-auto bg-white border border-gray-300  rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">Jobs</h2>
            <p className="font-bold text-green-700 xl:pt-2">^20%</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold pt-3 xl:pt-6 text-xl xl:text-2xl">{jobCount}</p>
          <div className="flex justify-between items-center space-x-10 pt-8">
            <Link to="/super_admin/jobs" className="inline-block  bg-blue-230 text-white py-2 px-4 rounded hover:bg-gray-400 text-xs xl:text-lg">see all</Link>

            <JobsIcon className=" w-9 xl:w-11" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default User;
