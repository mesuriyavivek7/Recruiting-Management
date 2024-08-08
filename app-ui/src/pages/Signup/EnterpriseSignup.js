import React from "react";
import asset3 from "../../assets/asset 3.svg";
import asset10 from "../../assets/asset 10.svg";
import { Link } from "react-router-dom";

const EnterpriseSignup = () => {
  return (
    <main>
      <div className="recruit-content-container h-screen flex relative overflow-hidden">
        <div className="recruit-form w-[38%] h-full overflow-y-scroll relative">
          <div className="w-8/12 h-full py-16 flex flex-col place-items-start mx-auto">
            <div className="flex flex-col place-items-start w-full">
              <img
                src={asset3}
                alt="company-logo"
                className="w-32 h-32 rounded-sm"
              />
              <h1 className="text-3xl mt-6 w-8/12 font-medium text-gray-900">
                Sign Up as a Enterprise
              </h1>
            </div>
            <div className="w-full relative mt-8">
              <form className="flex flex-col gap-3">
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
                    <option value="">Select Global Company Size</option>
                    <option value="Less than 2000">Less than 2000</option>
                    <option value="2000-10,000">2000-10,000</option>
                    <option value="10,000+">10,000+</option>
                  </select>
                </div>
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
                <button
                  type="submit"
                  className="w-full py-3 my-3 bg-orange-800 text-white rounded-md text-xl  "
                >
                  Sign Up
                </button>
              </form>
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
        </div>
        <div className="login-image w-[62%] h-screen relative bg-gradient-to-b from-orange-800 via-black-900 to-black-900">
        <img
            src={asset10}
            alt="login-image"
            className="relative p-28 h-full mx-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default EnterpriseSignup;
