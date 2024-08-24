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
  
  const [commissionPayRate,setCommisionPayRate]=useState({fixed:true,percentage:false})
  const [activeJobMode,setActiveJobMode]=useState({full_time:true,contract:false})
  const [payRate,setPayRate]=useState({range:true,fixed:false})
  const [weeklyHourCnt,setWeeklyHourCnt]=useState(1)
  const [dailyHourCnt,setDailyHourCnt]=useState(1)
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
            <div className="flex mb-3 gap-4">
              <div onClick={()=>setActiveJobMode({full_time:true,contract:false})} className={`text-sm ${(activeJobMode.full_time)?("text-blue-400"):("text-gray-400")} cursor-pointer flex flex-col`}>
                <span>Full Time</span>
                {activeJobMode.full_time && <div className="h-0.5 bg-blue-400"></div>}
              </div>
              <div onClick={()=>setActiveJobMode({full_time:false,contract:true})} className={`text-sm ${(activeJobMode.contract)?("text-blue-400"):("text-gray-400")} text-gray-500 cursor-pointer`}>
               <span>Contract</span>
               {activeJobMode.contract && <div className="h-0.5 bg-blue-400"></div>}
              </div>
            </div>
            <p className="text-lg mb-1">Remuneration Details</p>
          </div>
          {
            activeJobMode.full_time && 
            (
              <form className="custom-div w-8/12 p-6 border-solid">
            <div className="w-full relative flex flex-col gap-2">
              <p>Annual Salary*</p>
              <div>
                <label htmlFor="range" className="flex gap-2">
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
                <label htmlFor="fixed" className="flex gap-2">
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
            )
          }
          { activeJobMode.contract && 
            <form className="custom-div w-8/12 p-6 border-solid"> 
             <div className="relative w-full flex-col flex gap-4">
               <p>Contract Duration Type*</p>
               <div className="flex gap-2">
                  <select className="input-field w-2/12">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                  <input 
                  className="input-field w-4/12"
                  type="number"
                  name="contract_duration"
                  ></input>
               </div>
             </div>
             <div className="relative mt-2 w-full flex-col flex gap-2">
              <p>Contract Pay Rate*</p>
              <div className="flex gap-2">
              <div className="text-sm">
                <label htmlFor="fixed" className="flex gap-2">
                   <input
                    type="radio"
                    id="fixed"
                    name="contract_type"
                    value="fixed"
                    checked={payRate.fixed}
                    onClick={()=>setPayRate({fixed:true,range:false})}
                   ></input>
                   Fixed
                </label>
              </div>
              <div className="text-sm">
                <label htmlFor="range" className="flex gap-2">
                  <input
                  type="radio"
                  id="range"
                  name="contract_type"
                  value='range'
                  onClick={()=>setPayRate({fixed:false,range:true})}
                  checked={payRate.range}
                  ></input>
                  Range
                </label>
              </div>
             </div>
             </div>
             {
              payRate.range && (
              <div className="relative mt-2 w-full  flex gap-2">
                <select className="input-field w-3/12" name="currency"  class="border rounded p-2">
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="JPY">JPY</option>
  <option value="GBP">GBP</option>
  <option value="AUD">AUD</option>
  <option value="CAD">CAD</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="SEK">SEK</option>
  <option value="NZD">NZD</option>
  <option value="INR">INR</option>
  <option value="BRL">BRL</option>
  <option value="RUB">RUB</option>
  <option value="ZAR">ZAR</option>
  <option value="KRW">KRW</option>
  <option value="SGD">SGD</option>
  <option value="HKD">HKD</option>
  <option value="MXN">MXN</option>
  <option value="NOK">NOK</option>
  <option value="TRY">TRY</option>
  <option value="SAR">SAR</option>
  <option value="THB">THB</option>
  <option value="IDR">IDR</option>
  <option value="PLN">PLN</option>
  <option value="TWD">TWD</option>
  <option value="MYR">MYR</option>
  <option value="VND">VND</option>
  <option value="PHP">PHP</option>
  <option value="CZK">CZK</option>
  <option value="HUF">HUF</option>
  <option value="ILS">ILS</option>
  <option value="AED">AED</option>
  <option value="CLP">CLP</option>
  <option value="COP">COP</option>
  <option value="PEN">PEN</option>
  <option value="NGN">NGN</option>
  <option value="ARS">ARS</option>
  <option value="EGP">EGP</option>
  <option value="PKR">PKR</option>
  <option value="DZD">DZD</option>
  <option value="MAD">MAD</option>
  <option value="JOD">JOD</option>
  <option value="QAR">QAR</option>
  <option value="KWD">KWD</option>
  <option value="OMR">OMR</option>
  <option value="BHD">BHD</option>
  <option value="LKR">LKR</option>
  <option value="BDT">BDT</option>
  <option value="BND">BND</option>
  <option value="KHR">KHR</option>
  <option value="KZT">KZT</option>
  <option value="MNT">MNT</option>
  <option value="LAK">LAK</option>
  <option value="MMK">MMK</option>
  <option value="NPR">NPR</option>
  <option value="UZS">UZS</option>
  <option value="KGS">KGS</option>
  <option value="TJS">TJS</option>
  <option value="AFN">AFN</option>
  <option value="IRR">IRR</option>
  <option value="IQD">IQD</option>
  <option value="LBP">LBP</option>
  <option value="SYP">SYP</option>
  <option value="YER">YER</option>
  <option value="KPW">KPW</option>
  <option value="MVR">MVR</option>
  <option value="BAM">BAM</option>
  <option value="MDL">MDL</option>
  <option value="MKD">MKD</option>
  <option value="GEL">GEL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BBD">BBD</option>
  <option value="BZD">BZD</option>
  <option value="XOF">XOF</option>
  <option value="XAF">XAF</option>
  <option value="CDF">CDF</option>
  <option value="GHS">GHS</option>
  <option value="KES">KES</option>
  <option value="LRD">LRD</option>
  <option value="MWK">MWK</option>
  <option value="MGA">MGA</option>
  <option value="MZN">MZN</option>
  <option value="RWF">RWF</option>
  <option value="SCR">SCR</option>
  <option value="SLL">SLL</option>
  <option value="TZS">TZS</option>
  <option value="UGX">UGX</option>
  <option value="ZMW">ZMW</option>
  <option value="BWP">BWP</option>
  <option value="SZL">SZL</option>
  <option value="NAD">NAD</option>
  <option value="BIF">BIF</option>
  <option value="DJF">DJF</option>
  <option value="ETB">ETB</option>
  <option value="ERN">ERN</option>
  <option value="SOS">SOS</option>
  <option value="LSL">LSL</option>
  <option value="NGN">NGN</option>
  <option value="AOA">AOA</option>
  <option value="ZWL">ZWL</option>
  <option value="XCD">XCD</option>
  <option value="HTG">HTG</option>
  <option value="JMD">JMD</option>
  <option value="TTD">TTD</option>
  <option value="BMD">BMD</option>
  <option value="KYD">KYD</option>
  <option value="BSD">BSD</option>
  <option value="CUP">CUP</option>
  <option value="DOP">DOP</option>
  <option value="GTQ">GTQ</option>
  <option value="HNL">HNL</option>
  <option value="NIO">NIO</option>
  <option value="PAB">PAB</option>
  <option value="CRC">CRC</option>
  <option value="BZD">BZD</option>
  <option value="AWG">AWG</option>
  <option value="ANG">ANG</option>
  <option value="SVC">SVC</option>
  <option value="HTG">HTG</option>
  <option value="XPF">XPF</option>
  <option value="FJD">FJD</option>
  <option value="PGK">PGK</option>
  <option value="SBD">SBD</option>
  <option value="TOP">TOP</option>
  <option value="VUV">VUV</option>
  <option value="WST">WST</option>
  <option value="KID">KID</option>
  <option value="TVD">TVD</option>
  <option value="VND">VND</option>
  <option value="KHR">KHR</option>
  <option value="MMK">MMK</option>
  <option value="LAK">LAK</option>
  <option value="KZT">KZT</option>
  <option value="UZS">UZS</option>
  <option value="TMT">TMT</option>
  <option value="GEL">GEL</option>
  <option value="MDL">MDL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BAM">BAM</option>
                </select>
                <input
                 type="number"
                 className="input-field"
                 placeholder="Min"
                 name="min_salary"
                ></input>
                <input
                 typeof="number"
                 className="input-field"
                 placeholder="Max"
                 name="max_salary"
                ></input>
             </div>
              )
             }
             {
              payRate.fixed && (
              <div className="relative mt-2">
                <div className="flex">
                   <select className="w-6/12 rounded-l-lg outline-blue-400 border border-opacity-40 border-gray-400 text-sm py-2 px-3  hover:bg-white-600" name="currency">
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="JPY">JPY</option>
  <option value="GBP">GBP</option>
  <option value="AUD">AUD</option>
  <option value="CAD">CAD</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="SEK">SEK</option>
  <option value="NZD">NZD</option>
  <option value="INR">INR</option>
  <option value="BRL">BRL</option>
  <option value="RUB">RUB</option>
  <option value="ZAR">ZAR</option>
  <option value="KRW">KRW</option>
  <option value="SGD">SGD</option>
  <option value="HKD">HKD</option>
  <option value="MXN">MXN</option>
  <option value="NOK">NOK</option>
  <option value="TRY">TRY</option>
  <option value="SAR">SAR</option>
  <option value="THB">THB</option>
  <option value="IDR">IDR</option>
  <option value="PLN">PLN</option>
  <option value="TWD">TWD</option>
  <option value="MYR">MYR</option>
  <option value="VND">VND</option>
  <option value="PHP">PHP</option>
  <option value="CZK">CZK</option>
  <option value="HUF">HUF</option>
  <option value="ILS">ILS</option>
  <option value="AED">AED</option>
  <option value="CLP">CLP</option>
  <option value="COP">COP</option>
  <option value="PEN">PEN</option>
  <option value="NGN">NGN</option>
  <option value="ARS">ARS</option>
  <option value="EGP">EGP</option>
  <option value="PKR">PKR</option>
  <option value="DZD">DZD</option>
  <option value="MAD">MAD</option>
  <option value="JOD">JOD</option>
  <option value="QAR">QAR</option>
  <option value="KWD">KWD</option>
  <option value="OMR">OMR</option>
  <option value="BHD">BHD</option>
  <option value="LKR">LKR</option>
  <option value="BDT">BDT</option>
  <option value="BND">BND</option>
  <option value="KHR">KHR</option>
  <option value="KZT">KZT</option>
  <option value="MNT">MNT</option>
  <option value="LAK">LAK</option>
  <option value="MMK">MMK</option>
  <option value="NPR">NPR</option>
  <option value="UZS">UZS</option>
  <option value="KGS">KGS</option>
  <option value="TJS">TJS</option>
  <option value="AFN">AFN</option>
  <option value="IRR">IRR</option>
  <option value="IQD">IQD</option>
  <option value="LBP">LBP</option>
  <option value="SYP">SYP</option>
  <option value="YER">YER</option>
  <option value="KPW">KPW</option>
  <option value="MVR">MVR</option>
  <option value="BAM">BAM</option>
  <option value="MDL">MDL</option>
  <option value="MKD">MKD</option>
  <option value="GEL">GEL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BBD">BBD</option>
  <option value="BZD">BZD</option>
  <option value="XOF">XOF</option>
  <option value="XAF">XAF</option>
  <option value="CDF">CDF</option>
  <option value="GHS">GHS</option>
  <option value="KES">KES</option>
  <option value="LRD">LRD</option>
  <option value="MWK">MWK</option>
  <option value="MGA">MGA</option>
  <option value="MZN">MZN</option>
  <option value="RWF">RWF</option>
  <option value="SCR">SCR</option>
  <option value="SLL">SLL</option>
  <option value="TZS">TZS</option>
  <option value="UGX">UGX</option>
  <option value="ZMW">ZMW</option>
  <option value="BWP">BWP</option>
  <option value="SZL">SZL</option>
  <option value="NAD">NAD</option>
  <option value="BIF">BIF</option>
  <option value="DJF">DJF</option>
  <option value="ETB">ETB</option>
  <option value="ERN">ERN</option>
  <option value="SOS">SOS</option>
  <option value="LSL">LSL</option>
  <option value="NGN">NGN</option>
  <option value="AOA">AOA</option>
  <option value="ZWL">ZWL</option>
  <option value="XCD">XCD</option>
  <option value="HTG">HTG</option>
  <option value="JMD">JMD</option>
  <option value="TTD">TTD</option>
  <option value="BMD">BMD</option>
  <option value="KYD">KYD</option>
  <option value="BSD">BSD</option>
  <option value="CUP">CUP</option>
  <option value="DOP">DOP</option>
  <option value="GTQ">GTQ</option>
  <option value="HNL">HNL</option>
  <option value="NIO">NIO</option>
  <option value="PAB">PAB</option>
  <option value="CRC">CRC</option>
  <option value="BZD">BZD</option>
  <option value="AWG">AWG</option>
  <option value="ANG">ANG</option>
  <option value="SVC">SVC</option>
  <option value="HTG">HTG</option>
  <option value="XPF">XPF</option>
  <option value="FJD">FJD</option>
  <option value="PGK">PGK</option>
  <option value="SBD">SBD</option>
  <option value="TOP">TOP</option>
  <option value="VUV">VUV</option>
  <option value="WST">WST</option>
  <option value="KID">KID</option>
  <option value="TVD">TVD</option>
  <option value="VND">VND</option>
  <option value="KHR">KHR</option>
  <option value="MMK">MMK</option>
  <option value="LAK">LAK</option>
  <option value="KZT">KZT</option>
  <option value="UZS">UZS</option>
  <option value="TMT">TMT</option>
  <option value="GEL">GEL</option>
  <option value="MDL">MDL</option>
  <option value="AMD">AMD</option>
  <option value="AZN">AZN</option>
  <option value="BYN">BYN</option>
  <option value="BAM">BAM</option>
                   </select>
                   <input
                   type="number"
                   className="outline-blue-400 rounded-r-lg border border-opacity-40 border-gray-400 text-sm py-2 px-3 hover:bg-white-600"
                   ></input>
                </div>
             </div>
              )
             }
             
             <div className="relative mt-2 w-full flex-col flex gap-2">
              <p>Contract Pay Cycle*</p>
               <div className="flex gap-4">
                  <div className="text-sm">
                    <label htmlFor="hourly" className="flex gap-2">
                      <input
                      type="radio"
                      id="hourly"
                      name="contract_pay_cycle"
                      value='hourly'
                      ></input>
                      Hourly
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="daily" className="flex gap-2">
                      <input
                      type="radio"
                      id="daily"
                      name="contract_pay_cycle"
                      value='daily'
                      ></input>
                      Daily
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="Weekly" className="flex gap-2">
                      <input
                      type="radio"
                      id="Weekly"
                      name="contract_pay_cycle"
                      value='Weekly'
                      ></input>
                      Weekly
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="Monthly" className="flex gap-2">
                      <input
                      type="radio"
                      id="Monthly"
                      name="contract_pay_cycle"
                      value='Monthly'
                      ></input>
                      Monthly
                    </label>
                  </div>

               </div>
             </div>
             <div className="relative mt-2 flex gap-6">
                <div className="flex flex-col gap-2">
                  <p>Working Hours Per Week</p>
                  <div className="flex items-center">
                    <button type="button" disabled={weeklyHourCnt<=1} onClick={()=>setWeeklyHourCnt((prev)=>prev-1)} className="disabled:bg-blue-100 disabled:cursor-not-allowed text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">-</button>
                    <span className="px-4 py-2 border-gray-200 border-1">{weeklyHourCnt}</span>
                    <button  type="button" onClick={()=>setWeeklyHourCnt((prev)=>prev+1)} className="text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">+</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Working Hours Per Day</p>
                  <div className="flex">
                    <button type="button" disabled={dailyHourCnt<=1} onClick={()=>setDailyHourCnt((prev)=>prev-1)} className="disabled:bg-blue-100 disabled:cursor-not-allowed text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">-</button>
                    <span className="px-4 py-2 border-gray-200 border-1">{dailyHourCnt}</span>
                    <button type="button" onClick={()=>setDailyHourCnt((prev)=>prev+1)} className="text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">+</button>
                  </div>
                </div>
             </div>
             <div className="relative mt-2 flex w-full flex-col gap-2">
               <p>Additional Contractor Pay Rate details</p>
               <input
                type="text"
                placeholder="Ex. Variables"
                className="input-field"
                ></input>
             </div>
             <div className="relative mt-2 flex flex-col gap-2">
               <p>Remarks</p>
               <input
                type="text"
                placeholder="Remarks"
                className="input-field"
                ></input>
             </div>

           </form>
          }
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
                <label htmlFor="fixed-payout" className="flex gap-2">
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
                <label htmlFor="percentage-payout" className="flex gap-2">
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
