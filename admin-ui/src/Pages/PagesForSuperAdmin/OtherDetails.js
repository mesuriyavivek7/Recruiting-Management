import React, { useEffect, useState } from "react";
import { fetchBothMasterAdminDetails } from "../../services/api";

const OtherDetails = () => {
  const [selectedTab, setSelectedTab] = useState("Domestic");
  const [masterAdminDetails, setMasterAdminDetails] = useState({});

  const fetchMasterAdminData = async () => {
    try {
      const response = await fetchBothMasterAdminDetails();
      const formattedDetails = response.reduce((acc, admin) => {
        const adminType = admin.master_admin_type.toLowerCase();
        acc[adminType] = {
          email: admin.email,
          verifiedEnterprise: admin.verified_enterprise.length,
          verifiedRecruitingAgency: admin.verified_recruiting_agency.length,
          pendingEnterprise: admin.pending_verify_enterprise.length,
          pendingRecruitingAgency: admin.pending_verify_recruiting_agency.length,
        };
        return acc;
      }, {});
      setMasterAdminDetails(formattedDetails);
    } catch (error) {
      console.error("Error fetching master admin data:", error);
    }
  };

  useEffect(() => {
    fetchMasterAdminData();
  }, []);

  const details = masterAdminDetails[selectedTab.toLowerCase()] || {};

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 pt-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">

        <h2 className="text-xl font-bold pb-4 text-gray-700 text-center">Master Admin</h2>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex shadow rounded-lg overflow-hidden">
            {["Domestic", "International"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 text-md font-medium ${selectedTab === tab
                    ? "bg-blue-230 text-white"
                    : "bg-gray-100 text-gray-700"
                  }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        {Object.keys(details).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center col-span-2">
              <div className="flex w-80 bg-gray-100 rounded-lg p-4 shadow-sm text-center justify-between">
                <span className="text-gray-700 font-medium text-md">Email</span>
                <div className="text-gray-900 font-semibold text-md">{details.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 col-span-2">
              {Object.entries(details).map(([label, value], index) =>
                label !== "email" ? (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
                  >
                    <span className="text-gray-700 font-medium text-md">
                      {label
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <span className="text-gray-900 font-semibold text-md">{value}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </div>
    </div>
  );
};

export default OtherDetails;
