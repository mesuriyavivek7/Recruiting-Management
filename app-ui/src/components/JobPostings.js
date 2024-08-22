import React, { useState } from "react";

import { Link } from "react-router-dom";

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
            }  pb-1`}
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
            }`}
          >
            Drafts 0
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
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Job Title</th>
                <th className="px-4 py-2">Created On</th>
                <th className="px-4 py-2">Recruiter</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Copy</th>
              </tr>
            </thead>
            <tbody>
              {jobList.map((job) => (
                <tr className="border-b" key={job.id}>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center text-yellow-800 font-bold">
                        {job.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-2">
                        <div className="font-medium">
                          {job.id} - {job.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {job.createdOn}
                    <br />
                    <span className="text-sm text-gray-500">
                      ({job.daysAgo})
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {job.recruiter.initial}
                      </div>
                      <div className="ml-2">{job.recruiter.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">Copy</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Job Title</th>
                <th className="px-4 py-2">Created On</th>
                <th className="px-4 py-2">Recruiter</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobList.map((job) => (
                <tr className="border-b" key={job.id}>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center text-yellow-800 font-bold">
                        {job.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-2">
                        <div className="font-medium">
                          {job.id} - {job.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {job.createdOn}
                    <br />
                    <span className="text-sm text-gray-500">
                      ({job.daysAgo})
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {job.recruiter.initial}
                      </div>
                      <div className="ml-2">{job.recruiter.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="text-xs px-2 py-1 rounded-sm border border-gray-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-xs px-2 py-1 ml-3 rounded-sm border border-gray-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
