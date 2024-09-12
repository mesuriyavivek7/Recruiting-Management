import React, { useState } from "react";
import PastJobs from "../../components/jobs/PastJobs";
import { Link } from "react-router-dom";
import DraftJobs from "../../components/jobs/DraftJobs";

const JobPostings = () => {
  const [activeState, setActiveState] = useState(1);

  const jobList = [
    {
      id: "24639",
      title: "nisha",
      location: "Guyana - madhepura",
      createdOn: "13-Aug-24",
      daysAgo: "3 days ago",
      recruiter: {
        name: "Vivek Mesuriya",
        initial: "V",
      },
      status: "Pending",
    },
  ];

  return (
    <div className="custom-div w-full min-h-screen">
      <div className="w-full relative flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Post a Job</h2>

        <Link to="postjob">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Post a new Job
          </button>
        </Link>
      </div>

      <div className="px-4 py-2 w-full relative">
        <ul className="flex space-x-4 mb-4 text-blue-600">
          <li
            className={` ${
              activeState === 1
                ? "border-blue-400 border-b-2 text-blue-400"
                : ""
            }  pb-1 cursor-pointer`}
            onClick={() => setActiveState(1)}
          >
            Past Jobs 1
          </li>
          <li
            onClick={() => setActiveState(2)}
            className={`${
              activeState === 2
                ? "border-blue-400 border-b-2 text-blue-400"
                : ""
            } cursor-pointer`}
          >
            Drafts 1
          </li>
        </ul>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Job"
            className="border rounded p-2 w-full"
          />
        </div>

        {activeState === 1 ? (
         <PastJobs></PastJobs>
        ) : (
          <DraftJobs></DraftJobs>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
