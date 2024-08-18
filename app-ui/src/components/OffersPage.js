import React, { useState } from "react";

const dummyData = [
  {
    id: 1,
    status: "Active",
    jobTitle: "Software Engineer",
    totalSelected: 5,
    totalOffers: 3,
    totalJoinees: 2,
    dateRange: "2024-05-17 to 2024-06-30",
  },
  {
    id: 2,
    status: "On Hold",
    jobTitle: "Data Scientist",
    totalSelected: 10,
    totalOffers: 7,
    totalJoinees: 5,
    dateRange: "2024-06-01 to 2024-07-15",
  },
  {
    id: 3,
    status: "Closed",
    jobTitle: "Product Manager",
    totalSelected: 8,
    totalOffers: 6,
    totalJoinees: 4,
    dateRange: "2024-07-01 to 2024-08-15",
  },
  {
    id: 4,
    status: "Active",
    jobTitle: "UX Designer",
    totalSelected: 15,
    totalOffers: 12,
    totalJoinees: 10,
    dateRange: "2024-08-01 to 2024-08-17",
  },
];

const Offers = () => {
  const [filter, setFilter] = useState("All");

  const filteredData = dummyData.filter((item) => {
    if (filter === "All") return true;
    return item.status === filter;
  });

  const totalSelected = filteredData.reduce(
    (sum, item) => sum + item.totalSelected,
    0
  );
  const totalOffers = filteredData.reduce(
    (sum, item) => sum + item.totalOffers,
    0
  );
  const totalJoinees = filteredData.reduce(
    (sum, item) => sum + item.totalJoinees,
    0
  );

  return (
    <div className="custom-div relative">
      <div className="flex justify-start items-center gap-4">
        <h2 className="text-xl font-bold">Offers</h2>
        <div className="text-gray-500 flex gap-6 place-items-center">
          <p>
            <span className="font-semibold text-blue-400">{`${totalSelected}  `}</span>
            Total Selected
          </p>
          <p>
            <span className="font-semibold text-blue-400">{`${totalOffers}  `}</span>
            Total Offers
          </p>
          <p>
            <span className="font-semibold text-blue-400">{`${totalJoinees} `}</span>
            Total Joinees
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("All")}
          >
            All Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Active" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("Active")}
          >
            Active Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "On Hold" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("On Hold")}
          >
            Hold Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Closed" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("Closed")}
          >
            Closed Jobs
          </button>
        </div>
      </div>

      {/* Data container */}
      <div className="mt-6 w-full relative">
        {filteredData.length > 0 ? (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            {filteredData.map((job) => (
              <div key={job.id} className="mb-4">
                <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                <p>{`Status: ${job.status}`}</p>
                <p>{`Total Selected: ${job.totalSelected}`}</p>
                <p>{`Total Offers: ${job.totalOffers}`}</p>
                <p>{`Total Joinees: ${job.totalJoinees}`}</p>
                <p>{`Date Range: ${job.dateRange}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No jobs available for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Offers;
