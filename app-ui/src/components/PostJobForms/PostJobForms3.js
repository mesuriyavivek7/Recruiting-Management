import React from "react";

const PostJobForms3 = () => {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div">
        <p className="text-2xl font-semibold">form3 </p>
      </div>
      <div className="custom-div mx-3 w-full relative ">
        <div className="flex place-items-start relative w-full px-4 py-6 ">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Company Details</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Client Visibility*</p>
              <div className="flex place-items-start gap-3 mt-2">
                <input
                  type="radio"
                  id="visible"
                  name="visible"
                  className="w-[16px] h-[16px] mt-1"
                />
                <label htmlFor="visible" className="input-label">
                  <span className="font-semibold text-base">Visible</span>{" "}
                  <br /> Client name will be visible to all vendor partners
                </label>
              </div>
              <div className="flex place-items-start gap-3 mt-2">
                <input
                  type="radio"
                  id="hidden"
                  name="hidden"
                  className="w-[16px] h-[16px] mt-1"
                />
                <label htmlFor="hidden" className="input-label">
                  <span className="font-semibold text-base">
                    Hidden until job accepted
                  </span>
                  <br /> Client name will be hidden from partners until they
                  accept the job
                </label>
              </div>
            </div>
            <div className="w-full relative flex flex-col gap-2 mt-6">
              <label htmlFor="client-name" className="input-label">
                Client Name*
              </label>
              <input
                type="text"
                disabled
                name="client-name"
                id="client-name"
                className="input-field"
                placeholder="ZUPEE"
              />
            </div>
            <div className="w-full relative flex flex-col gap-2 mt-3">
              <label htmlFor="job-desc" className="input-label">
                Client Description*
                <span className="text-green-700"></span>
              </label>
              <textarea
                rows={8}
                name="job-desc"
                id="job-desc"
                className="input-field"
                placeholder="Paste the Client description"
              />
              <p className="text-xs">Min 100charcters</p>
            </div>
            <div className="flex place-items-center gap-3 mt-6">
              <input
                type="checkbox"
                id="agree-to-terms"
                name="agree-to-terms"
                className="w-[16px] h-[16px] "
              />
              <label htmlFor="agree-to-terms" className="input-label">
                I agree to be bound by the terms of membership of CBREX.
              </label>
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

export default PostJobForms3;
