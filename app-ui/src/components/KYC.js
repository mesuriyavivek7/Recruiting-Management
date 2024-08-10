import React, { useState } from "react";
import asset11 from "../assets/asset 11.svg";
import asset12 from "../assets/asset 12.svg";

const KYC = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [activeState, setActiveState] = useState(1);

  const nextStep = () => {
    setActiveState((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveState((prev) => prev - 1);
  };

  const renderKYCForm = () => {
    switch (activeState) {
      case 1: {
        return (
          <form>
            <div className="flex flex-col place-items-start text-[17px]">
              <p className="pb-[10px]">
                Select the <span className="font-semibold">Entity Type</span>
                <span className="text-orange-700">*</span> :
              </p>
              <div className="flex place-items-center pb-2">
                <input
                  type="radio"
                  id="Company"
                  name="Company"
                  value="Company"
                />
                <label htmlFor="Company" className="pl-1">
                  Company
                </label>
              </div>
              <div className="flex place-items-center pb-2">
                <input
                  type="radio"
                  id="Partnership"
                  name="Partnership"
                  value="Partnership"
                />
                <label htmlFor="Partnership" className="pl-1">
                  Partnership
                </label>
              </div>
              <div className="flex place-items-center">
                <input
                  type="radio"
                  id="Independent Recruiter"
                  name="Independent Recruiter"
                  value="Independent Recruiter"
                />
                <label htmlFor="Independent Recruiter" className="pl-1">
                  Independent Recruiter
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-400 text-white py-1 px-3 rounded-md mt-4"
            >
              <img
                src={asset11}
                alt="right-arrow"
                className="pr-2 inline w-7 pb-[2px]"
              />
              Next
            </button>
          </form>
        );
      }
      case 2: {
        return (
          <div>
            <form className="text-[17px]">
              <div className="flex flex-col place-items-start">
                <label htmlFor="cardnumber" className="pb-2">
                  PAN Card Number <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  id="cardnumber"
                  name="cardnumber"
                  placeholder="Enter PAN number"
                  className="w-full  border-black border py-2 rounded-md pl-4"
                />
              </div>
              <div className="mt-4 flex flex-col place-items-start">
                <label htmlFor="kycdocument" className="pb-2">
                  KYC Document<span className="text-orange-800">*</span>
                </label>
                <input type="file" name="document" id="kycdocument" className="w-full rounded-md text-[15px] border-gray-300 border bg-gray-200 bg-opacity-30" />
              </div>
            </form>
            <div className="flex gap-3 w-full mt-1">
              <button
                type="button"
                onClick={prevStep}
                className="bg-blue-400 text-white py-1 px-3 rounded-md mt-4"
              >
                <img
                  src={asset12}
                  alt="left-arrow"
                  className="pr-2 inline w-7 pb-[2px]"
                />
                Back
              </button>
              <button
                type="button"
                className="bg-blue-400 text-white py-1 px-3 rounded-md mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-radial from-orange-800 to-black-900 flex place-items-center">
      <div className="kyc-form w-4/12 bg-white rounded-md mx-auto overflow-hidden">
        <div className="bg-blue-300 bg-opacity-50 py-2 px-7">
          <h1 className="text-xl text-blue-400 font-semibold">KYC Details</h1>
        </div>
        <div className="p-5">{renderKYCForm()}</div>
      </div>
    </div>
  );
};

export default KYC;
