import React, { useState } from "react";
import { Link } from "react-router-dom";
import asset3 from "../../assets/asset 3.svg"
import asset4 from "../../assets/asset 4.svg";
import asset7 from "../../assets/asset 7.svg";
import asset8 from "../../assets/asset 8.svg";
import asset9 from "../../assets/asset 9.svg";

const RecruitSignUp = () => {
  const [activeState, setActiveState] = useState(1);

  // Handle navigation to the next step
  const nextStep = () => {
    if (activeState < 3) {
      setActiveState((prevState) => prevState + 1); 
    }
  };

  // Handle navigation to the previous step
  const prevStep = () => {
    if (activeState > 1) {
      setActiveState((prevState) => prevState - 1);
    }
  };

  // Render form steps based on the active step
  const renderFormStep = () => {
    switch (activeState) {
      case 1:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="name" className="input-label">
                  Full Name <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="input-field"
                />
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="email" className="input-label">
                  Official Email <span className="text-orange-800">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="phonenumber" className="input-label">
                  Phone Number <span className="text-orange-800">*</span>
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  id="phonenumber"
                  className="input-field"
                  required
                />
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl"
              >
                Next
              </button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="company" className="input-label">
                  Company Name <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  required
                  className="input-field"
                />
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="size" className="input-label">
                  Company Size <span className="text-orange-800">*</span>
                </label>
                <select
                  name="size"
                  id="size"
                  className="input-field custom-select"
                >
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="designation" className="input-label">
                  Designation <span className="text-orange-800">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="linkedin-url" className="input-label">
                  LinkedIn Url <span className="text-orange-800">*</span>
                </label>
                <input
                  type="url"
                  name="linkedin-url"
                  id="linkedin-url"
                  className="input-field"
                  required
                />
              </div>
              <fieldset className="flex-start gap-2 w-full relative text-sm">
                <legend>
                  Firm Type <span className="text-orange-800">*</span>{" "}
                </legend>
                <div className="grid grid-cols-2 gap-4 w-full mt-1 p-2">
                  <div className="flex place-items-center gap-1">
                    <input
                      type="radio"
                      id="Permanent Hiring"
                      name="firm"
                      value="Permanent Hiring"
                    />
                    <label for="Permanent Hiring">Permanent Hiring</label>
                  </div>
                  <div className="flex place-items-center gap-1">
                    <input
                      type="radio"
                      id="contract Staffing"
                      name="firm"
                      value="contract Staffingy"
                    />
                    <label for="contract Staffing">Contract Staffing</label>
                  </div>
                  <div className="flex place-items-center gap-1">
                    <input
                      type="radio"
                      id="Executive Search"
                      name="firm"
                      value="Executive Search"
                    />
                    <label for="Executive Search">Executive Search</label>
                  </div>
                  <div className="flex place-items-center gap-1">
                    <input
                      type="radio"
                      id="Only Payrolling"
                      name="firm"
                      value="Only Payrolling"
                    />
                    <label for="Only Payrolling">Only Payrolling</label>
                  </div>
                </div>
              </fieldset>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 my-3 border border-orange-800 text-orange-800 rounded-md text-xl "
                >
                  <img
                    src={asset7}
                    alt="previous-svg"
                    width={24}
                    className="inline-block mr-2 mb-1"
                  />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl  "
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="w-full relative mt-6">
            <form className="flex flex-col gap-4">
              <div className="flex-start gap-2 w-full">
                <label htmlFor="country" className="input-label">
                  Country <span className="text-orange-800">*</span>
                </label>
                <select
                  name="country"
                  id="country"
                  className="input-field custom-select"
                >
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="state" className="input-label">
                  State <span className="text-orange-800">*</span>
                </label>
                <select
                  name="state"
                  id="state"
                  className="input-field custom-select"
                >
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="city" className="input-label">
                  City <span className="text-orange-800">*</span>
                </label>
                <select
                  name="city"
                  id="city"
                  className="input-field custom-select"
                >
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
              </div>
              <div className="flex-start gap-2 w-full">
                <label htmlFor="domain" className="input-label">
                  Domains (Select up to 10 Domains) <span className="text-orange-800">*</span>
                </label>
                <select
                  name="domain"
                  id="domain"
                  className="input-field custom-select"
                >
                  <option value="Self Employed">Self Employed</option>
                  <option value="2-10 Employees">2-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="501+ Employees">501+ Employees</option>
                </select>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 my-3 border border-orange-800 text-orange-800 rounded-md text-xl "
                >
                  <img
                    src={asset7}
                    alt="previous-svg"
                    width={24}
                    className="inline-block mr-2 mb-1"
                  />
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl  "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFormImage = () => {
    switch (activeState) {
      case 1:
        return (
          <img
            src={asset4}
            alt="login-image"
            className="relative p-20 h-full mx-auto"
          />
        );
      case 2:
        return (
          <img
            src={asset8}
            alt="login-image"
            className="relative p-20 h-full mx-auto"
          />
        );
      case 3:
        return (
          <img
            src={asset9}
            alt="login-image"
            className="relative p-20 h-full mx-auto"
          />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="recruit-content-container h-screen flex relative overflow-hidden">
        <div className="recruit-form w-[38%] h-full overflow-y-scroll relative">
          <div className="w-8/12 h-full py-16 flex flex-col place-items-start mx-auto">
            <div className="flex flex-col place-items-start w-full">
              <img src={asset3} alt="company-logo" className="w-32" />
              <h1 className="text-3xl mt-8 font-medium text-gray-900 w-8/12 leading-9">
                Sign Up as a Recruiting Firm (Talent Supplier)
              </h1>
            </div>
            <div className=""></div>
            <div className="w-full relative flex gap-1 mt-5 place-items-center">
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 1 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 2 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-4/12 h-1 ${
                  activeState >= 3 ? "bg-orange-800" : "bg-gray-200"
                }`}
              ></div>
            </div>
            {renderFormStep()}
            <div className="text-sm mt-3 pb-10">
              <p className="text-gray-400">
                Already Registered?
                <Link to="/" className="text-blue-400 pl-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="login-image w-[62%] h-screen relative bg-gradient-to-b from-orange-800 to-black-900">
          {renderFormImage()}
        </div>
      </div>
    </main>
  );
};

export default RecruitSignUp;
