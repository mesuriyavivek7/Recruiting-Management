import React, { useState } from "react";

const PostJobForm2 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    salaryType: "",
    currency: "INR",
    minSalary: "",
    maxSalary: "",
    additionalSalaryDetails: "",
    commissionType: "",
    commissionAmount: "",
    paymentTerms: "",
    replacementClause: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.salaryType)
      newErrors.salaryType = "Please select a salary type.";
    if (
      formData.salaryType === "Range" &&
      (!formData.minSalary || !formData.maxSalary)
    )
      newErrors.salaryRange = "Please enter both minimum and maximum salary.";
    if (!formData.commissionType)
      newErrors.commissionType = "Please select a commission type.";
    if (!formData.paymentTerms)
      newErrors.paymentTerms = "Please select payment terms.";
    if (!formData.replacementClause)
      newErrors.replacementClause = "Please select replacement clause.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div mx-3 w-full relative">
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Remuneration Details</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Annual Salary*</p>
              <div>
                <label htmlFor="range">
                  <input
                    type="radio"
                    id="range"
                    name="salaryType"
                    value="Range"
                    checked={formData.salaryType === "Range"}
                    onChange={handleChange}
                  />
                  Range
                </label>
              </div>
              <div>
                <label htmlFor="fixed">
                  <input
                    type="radio"
                    id="fixed"
                    name="salaryType"
                    value="Fixed"
                    checked={formData.salaryType === "Fixed"}
                    onChange={handleChange}
                  />
                  Fixed
                </label>
              </div>
              {errors.salaryType && (
                <p className="text-red-600 text-xs">{errors.salaryType}</p>
              )}
            </div>

            <div className="relative flex flex-col gap-2 mt-6">
              <p className="input-label">Salary Range*</p>
              <div className="custom-div">
                <div className="text-sm">
                  <label htmlFor="currency" className="input-label">
                    Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    className="input-field mt-2"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                {formData.salaryType === "Fixed" ? (
                  <div className="relative flex flex-col gap-2 mt-6">
                    <input
                      type="number"
                      id="fixed-salary"
                      name="minSalary" // Use minSalary for Fixed as well
                      placeholder="Annual Salary"
                      className="input-field"
                      value={formData.minSalary}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 place-items-center text-sm mt-8">
                    <input
                      type="number"
                      id="min-salary"
                      name="minSalary"
                      placeholder="Min Annual Salary"
                      className="input-field"
                      value={formData.minSalary}
                      onChange={handleChange}
                    />
                    <p>to</p>
                    <input
                      type="number"
                      id="max-salary"
                      name="maxSalary"
                      placeholder="Max Annual Salary"
                      className="input-field"
                      value={formData.maxSalary}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              {errors.salaryRange && (
                <p className="text-red-600 text-xs">{errors.salaryRange}</p>
              )}
            </div>

            <div className="w-full relative flex flex-col gap-2 mt-4">
              <label htmlFor="additionalSalaryDetails" className="input-label">
                Additional Salary Details
              </label>
              <input
                type="text"
                id="additionalSalaryDetails"
                name="additionalSalaryDetails"
                placeholder="Ex. Variables"
                className="input-field"
                value={formData.additionalSalaryDetails}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex place-items-start relative w-full px-4 py-6">
          <div className="w-4/12 relative">
            <p className="text-lg mb-1">Commission</p>
          </div>
          <form className="custom-div w-8/12 p-6">
            <div className="w-full relative flex flex-col gap-2">
              <p>Commission Payout*</p>
              <div>
                <label htmlFor="fixed-payout">
                  <input
                    type="radio"
                    id="fixed-payout"
                    name="commissionType"
                    value="Fixed"
                    checked={formData.commissionType === "Fixed"}
                    onChange={handleChange}
                  />
                  Fixed
                </label>
              </div>
              <div>
                <label htmlFor="percentage-payout">
                  <input
                    type="radio"
                    id="percentage-payout"
                    name="commissionType"
                    value="Percentage"
                    checked={formData.commissionType === "Percentage"}
                    onChange={handleChange}
                  />
                  Percentage
                </label>
              </div>
              {errors.commissionType && (
                <p className="text-red-600 text-xs">{errors.commissionType}</p>
              )}
            </div>
            {formData.commissionType === "Percentage" ? (
              <div className="relative mt-4">
                <input
                  type="number"
                  id="commissionAmount"
                  name="commissionAmount"
                  placeholder="Fixed fee to pay"
                  className="input-field"
                  value={formData.commissionAmount + "%"}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="relative flex gap-4 place-items-center mt-4">
                <label htmlFor="commissionAmount" className="input-label">
                  GTQ
                </label>
                <input
                  type="number"
                  id="commissionAmount"
                  name="commissionAmount"
                  placeholder="Fixed fee to pay"
                  className="input-field"
                  value={formData.commissionAmount}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="relative flex gap-4 place-items-center mt-4 w-full">
              <div className="flex flex-col gap-2 place-items-start w-4/12">
                <p className="text-base">Payment Terms*</p>
                <p className="text-xs">Post date of candidate joining</p>
                <select
                  name="paymentTerms"
                  id="paymentTerms"
                  className="input-field"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="2">2</option>
                  <option value="7">7</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                </select>
                {errors.paymentTerms && (
                  <p className="text-red-600 text-xs">{errors.paymentTerms}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 place-items-start w-4/12">
                <p className="text-base">Replacement Clause*</p>
                <p className="text-xs">Post date of candidate joining</p>
                <select
                  name="replacementClause"
                  id="replacementClause"
                  className="input-field"
                  value={formData.replacementClause}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                </select>
                {errors.replacementClause && (
                  <p className="text-red-600 text-xs">
                    {errors.replacementClause}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="custom-div place-items-end pb-2">
        <button
          className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostJobForm2;
