import React from "react";

const PostJobForm2 = () => {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div">
        <p className="text-2xl font-semibold">form2 </p>
      </div>
      <div className="custom-div mx-3 w-full relative ">
        <div className="flex place-items-start relative w-full px-4 py-6 ">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Remuneration Details</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Annual Salary*</p>
              <div>
                <label htmlFor="range">
                  <input type="radio" id="range" name="range" />
                  Range
                </label>
              </div>
              <div>
                <label htmlFor="range">
                  <input type="radio" id="range" name="range" />
                  Fixed
                </label>
              </div>
            </div>
            <div className="relative flex flex-col gap-2 mt-6">
              <p className="input-label">Salary Range*</p>
              <div className="custom-div">
                <div className="text-sm">
                  <label htmlFor="range" className="input-label">
                    Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    className="input-field mt-2"
                  >
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <div className="flex gap-4 place-items-center text-sm mt-8">
                    <input
                      type="number"
                      id="min-salary"
                      name="salary"
                      placeholder="Annual Salary"
                      className="input-field"
                    />
                    <p>to</p>
                    <input
                      type="number"
                      id="max-salary"
                      name="salary"
                      placeholder="Annual Salary"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full relative flex flex-col gap-2 mt-4">
              <label htmlFor="salary-details" className="input-label">
                Additional Salary Details
              </label>
              <input
                type="text"
                id="salary-details"
                name="salary-details"
                placeholder="Ex. Variables"
                className="input-field"
              />
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6 ">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Commission</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Commission Payout*</p>
              <div>
                <label htmlFor="fixed-payout">
                  <input type="radio" id="fixed-payout" name="comission" />
                  Fixed
                </label>
              </div>
              <div>
                <label htmlFor="percentage-payout">
                  <input type="radio" id="percentage-payout" name="comission" />
                  Percentage
                </label>
              </div>
            </div>
            <div className="relative flex gap-4 place-items-center mt-4">
              <label htmlFor="salary-currency" className="input-label">
                GTQ
              </label>
              <input
                type="number"
                id="salary-currency"
                name="salary-currency"
                placeholder="Fixed fee to pay"
                className="input-field"
              />
            </div>
            <div className="relative flex gap-4 place-items-center mt-4 w-full ">
              <div className="flex flex-col gap-2 place-items-start w-4/12">
                <p className="text-base">Payment Terms*</p>
                <p className="text-xs">Post date of candidate joining</p>
                <select name="joining-postdate" id="joining-date" className="input-field ">
                    <option value="">Select</option>
                    <option value="2">2</option>
                    <option value="7">7</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 place-items-start w-4/12">
                <p className="text-base">Replacement Clause*</p>
                <p className="text-xs">Post date of candidate joining</p>
                <select name="joining-postdate" id="joining-date" className="input-field ">
                    <option value="">Select</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="custom-div place-items-end pb-2">
        <button className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default PostJobForm2;
