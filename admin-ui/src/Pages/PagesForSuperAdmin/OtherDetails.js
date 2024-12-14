import React, { useState } from "react";

const OtherDetails = () => {
  const [selectedTab, setSelectedTab] = useState("Domestic");

  const domesticDetails = [
    { label: "Email", value: "domestic@example.com" },
    { label: "Master Admin", value: "John Doe" },
    { label: "Verified Enterprise", value: "10" },
    { label: "Verified Recruiter Agency", value: "15" },
    { label: "Pending Enterprise", value: "5" },
    { label: "Pending Recruiter Agency", value: "3" },
  ];

  const internationalDetails = [
    { label: "Email", value: "international@example.com" },
    { label: "Master Admin", value: "Jane Smith" },
    { label: "Verified Enterprise", value: "20" },
    { label: "Verified Recruiter Agency", value: "12" },
    { label: "Pending Enterprise", value: "7" },
    { label: "Pending Recruiter Agency", value: "4" },
  ];

  const details =
    selectedTab === "Domestic" ? domesticDetails : internationalDetails;

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 pt-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
  <div className="inline-flex shadow rounded-lg overflow-hidden">
    <button
      className={`px-6 py-2 text-md font-medium ${
        selectedTab === "Domestic"
          ? "bg-blue-230 text-white"
          : "bg-gray-100 text-gray-700"
      }`}
      onClick={() => setSelectedTab("Domestic")}
    >
      Domestic
    </button>
    <button
      className={`px-6 py-2 text-md font-medium ${
        selectedTab === "International"
          ? "bg-blue-230 text-white"
          : "bg-gray-100 text-gray-700"
      }`}
      onClick={() => setSelectedTab("International")}
    >
      International
    </button>
  </div>
</div>


        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
            >
              <span className="text-gray-700 font-medium text-md">{item.label}</span>
              <span className="text-gray-900 font-semibold text-md ">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
