import React, { useState } from "react";

const PostJobForm2 = ({ onNext }) => {
  const [fullTimeFormData, setFullTimeFormData] = useState({
    fullTimeSalaryType:'Range',
    fullTimeSalaryCurrency:'INR',
    additionalSalaryDetails:'',
    minSalary:'',
    maxSalary:'',
  });

  const [contractFormData,setContractFormData]=useState({
    contractDurationType:'weekly',
    contractDurationCount:'',
    contractPayRateType:'Range',
    contractPayCurrency:'INR',
    minContractPayRate:'',
    maxContractPayRate:'',
    contractPayCycle:'',
    additionalContractDetails:'',
    weeklyHourCnt:1,
    dailyHourCnt:1,
    remarks:''
  })

  const [commissionFormData,setCommissionFormData]=useState({
    commissionType:'Fixed',
    billingCycle:'',
    commissionFixPay:''

  })

  const handleFullTimeChange=(e)=>{
    const {name,value,type,checked}= e.target
    if(name==="fixedSalary" || (name==="fullTimeSalaryType" && value==="Fixed")){
      delete fullTimeFormData.minSalary
      delete fullTimeFormData.maxSalary
      fullTimeFormData['fixedSalary']=''
    }else if(name==="minSalary" || name==="maxSalary" || (name==="fullTimeSalaryType" && value==="Range")){
       delete fullTimeFormData.fixedSalary
       fullTimeFormData['minSalary']=''
       fullTimeFormData['maxSalary']=''
    }
    setFullTimeFormData((prevData)=>({
      ...prevData,
      [name]: type==="checkbox" ? checked :value
    }))
  }

  const handleContractChange=(e)=>{
    const {name,value,type,checked}=e.target
    if(name==="fixContractPay" || (name==="contractPayRateType" && value==="Fixed")){
        delete contractFormData.minContractPayRate
        delete contractFormData.maxContractPayRate
        contractFormData['fixContractPay']=''
    }else if(name==="minContractPayRate" || name==="maxContractPayRate" || (name==="contractPayRateType" && value==="Range")){
      delete contractFormData.fixContractPay
      contractFormData['minContractPayRate']=''
      contractFormData['maxContractPayRate']=''
    }
    setContractFormData((prevData)=>({
      ...prevData,
      [name]:type==="checkbox" ? checked:value
    }))
         
  }

  const handleContractCount=(type,action)=>{
    if(type==="WeeklyCnt"){
        if(action==="Inc"){
          setWeeklyHourCnt((prev)=>prev+1)
          contractFormData['weeklyHourCnt']=weeklyHourCnt+1
        }
        else{ 
          setWeeklyHourCnt((prev)=>prev-1)
          contractFormData['weeklyHourCnt']=weeklyHourCnt-1
        }
        
    }else{
        if(action==="Inc"){
          setDailyHourCnt((prev)=>prev+1)
          contractFormData['dailyHourCnt']=dailyHourCnt+1
        } 
        else{
          setDailyHourCnt((prev)=>prev-1)
          contractFormData['dailyHourCnt']=dailyHourCnt-1
        } 
        
    }
  }

  const handleCommissionChange=(e)=>{
    const {name,value,type,checked}=e.target
    if(name==="commissionFixPay" || (name==="commissionType" && value==="Fixed")){
        delete commissionFormData.commissionPercentage
        commissionFormData['commissionFixPay']=''
    }else if(name==="commissionPercentage" || (name==="commissionType" && value==="Percentage")){
        delete commissionFormData.commissionFixPay
        commissionFormData['commissionPercentage']=''
    }
    setCommissionFormData((prevData)=>({
      ...prevData,
      [name]:type==="checkbox" ? checked:value
    }))
       
  }

  console.log(fullTimeFormData)

  const [errors, setErrors] = useState({});
  
  

  const validate = () => {
    const newErrors = {};

    //validate data for full time job mode
    if(activeJobMode.full_time){
      if(fullTimeFormData.fullTimeSalaryType==='Range'){
        console.log("kuch to gad bad he")
        if(fullTimeFormData.minSalary==='' || fullTimeFormData.maxSalary==='') newErrors.fullTimeSalary="Min or Max salary is required."
        else if(fullTimeFormData.minSalary>fullTimeFormData.maxSalary) newErrors.fullTimeSalary="Min Salary must be lower then max salary."
      }else{
        if(fullTimeFormData.fixedSalary==='') newErrors.fixedSalary="Fix salary is required"
      }
    }

    //validate data for contract time job mode
    if(activeJobMode.contract){
       if(contractFormData.contractDurationCount==='') newErrors.contractDurationCount="Duration time is required."
       if(contractFormData.contractPayRateType==="Range"){
         if(contractFormData.minContractPayRate==='' || contractFormData.maxContractPayRate==='') newErrors.contratRangePay="Min Contract pay is required."
         else if(contractFormData.minContractPayRate>contractFormData.maxContractPayRate) newErrors.contratRangePay="Min contract pay must be less then Max contract pay."
       }else{
          if(contractFormData.fixContractPay==='') newErrors.fixContractPay="Contract pay required."
       }
       if(contractFormData.contractPayCycle==='') newErrors.contractPayCycle="Please select cycle for contract pay."
       if(contractFormData.weeklyHourCnt<contractFormData.dailyHourCnt) newErrors.hourCnt="Weekly hour count must be greater then Daily count"
    }

    //validate data for commision pay out
    if(commissionFormData.commissionType==="Fixed" && commissionFormData.commissionFixPay==="") newErrors.commissionFixPay="Commission pay is required."
    if(commissionFormData.commissionType==="Percentage" && commissionFormData.commissionPercentage==="") newErrors.commissionPercentage="Commission pay is required."
    if(commissionFormData.billingCycle==='') newErrors.billingCycle="Please select billing cycle."
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const [annualSalary,setAnnualSalary]=useState({range:true,fixed:false})
  const [commissionPayRate,setCommisionPayRate]=useState({fixed:true,percentage:false})
  const [activeJobMode,setActiveJobMode]=useState({full_time:true,contract:false})
  const [payRate,setPayRate]=useState({range:true,fixed:false})
  const [weeklyHourCnt,setWeeklyHourCnt]=useState(1)
  const [dailyHourCnt,setDailyHourCnt]=useState(1)

  const handleNext = () => {
    if (validate()) {
      onNext();
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
                    name="fullTimeSalaryType"
                    value="Range"
                    checked={annualSalary.range}
                    onClick={()=>setAnnualSalary({fixed:false,range:true})}
                    onChange={handleFullTimeChange}
                  />
                  Range
                </label>
              </div>
              <div>
                <label htmlFor="fixed" className="flex gap-2">
                  <input
                    type="radio"
                    id="fixed"
                    name="fullTimeSalaryType"
                    value="Fixed"
                    checked={annualSalary.fixed}
                    onClick={()=>setAnnualSalary({fixed:true,range:false})}
                    onChange={handleFullTimeChange}
                  />
                  Fixed
                </label>
              </div>
            </div>

            <div className="relative flex flex-col gap-2 mt-6">
              <p className="input-label">Salary Range*</p>
              <div className="custom-div">
                <div className="text-sm">
                  <label htmlFor="currency" className="input-label">
                    Currency
                  </label>
                  <select name="fullTimeSalaryCurrency" id="currency" className="input-field mt-2" value={fullTimeFormData.fullTimeSalaryCurrency} onChange={handleFullTimeChange}>
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
                </div>

                {annualSalary.fixed &&  (
                  <div>
                   <div className="relative flex flex-col gap-2 mt-6">
                     <input
                      type="number"
                      id="fixed-salary"
                      name="fixedSalary" // Use minSalary for Fixed as well
                      placeholder="Annual Salary"
                      value={fullTimeFormData.fixedSalary}
                      className="input-field"
                      onChange={handleFullTimeChange}
                    />
                   </div>
                   {errors.fixedSalary && 
                     <p className="text-red-600 text-sm mt-2">{errors.fixedSalary}</p>
                   }
                  </div>
                )}

                { annualSalary.range &&  (
                <div>
                  <div className="flex gap-4 place-items-center text-sm mt-8">
                    <input
                      type="number"
                      id="min-salary"
                      name="minSalary"
                      placeholder="Min Annual Salary"
                      className="input-field"
                      value={fullTimeFormData.minSalary}
                      onChange={handleFullTimeChange}
                    />
                    <p>to</p>
                    <input
                      type="number"
                      id="max-salary"
                      name="maxSalary"
                      placeholder="Max Annual Salary"
                      className="input-field"
                      value={fullTimeFormData.maxSalary}
                      onChange={handleFullTimeChange}
                    />
                  </div>
                  {
                    errors.fullTimeSalary && (
                      <p className="text-red-600 text-xs mt-2">{errors.fullTimeSalary}</p>
                    )
                  }
                </div>  
                )}
              </div>
             
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
                value={fullTimeFormData.additionalSalaryDetails}
                onChange={handleFullTimeChange}
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
                  <select
                   name="contractDurationType"
                   value={contractFormData.contractDurationType}
                   onChange={handleContractChange}
                   className="input-field w-2/12">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <input 
                  className="input-field w-4/12"
                  type="number"
                  name="contractDurationCount"
                  placeholder="Duration Time"
                  onChange={handleContractChange}
                  value={contractFormData.contractDurationCount}
                  ></input>
               </div>
               {
                errors.contractDurationCount && (
                  <p className="text-red-600 text-sm">{errors.contractDurationCount}</p>
                )
               }
             </div>
             <div className="relative mt-2 w-full flex-col flex gap-2">
              <p>Contract Pay Rate*</p>
              <div className="flex gap-2">
              <div className="text-sm">
                <label htmlFor="fixed" className="flex gap-2">
                   <input
                    type="radio"
                    id="fixed"
                    name="contractPayRateType"
                    value="Fixed"
                    checked={payRate.fixed}
                    onClick={()=>setPayRate({fixed:true,range:false})}
                    onChange={handleContractChange}
                   ></input>
                   Fixed
                </label>
              </div>
              <div className="text-sm">
                <label htmlFor="range" className="flex gap-2">
                  <input
                  type="radio"
                  id="range"
                  name="contractPayRateType"
                  value='Range'
                  onClick={()=>setPayRate({fixed:false,range:true})}
                  onChange={handleContractChange}
                  checked={payRate.range}
                  ></input>
                  Range
                </label>
              </div>
             </div>
             </div>
             {
              payRate.range && (
              <div>
              <div className="relative mt-2 w-full  flex gap-2">
                <select className="input-field w-6/12" name="contractPayCurrency" onChange={handleContractChange} value={contractFormData.contractPayCurrency}>
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
                 value={contractFormData.minContractPayRate}
                 name="minContractPayRate"
                 onChange={handleContractChange}
                ></input>
                <input
                 type="number"
                 className="input-field"
                 placeholder="Max"
                 value={contractFormData.maxContractPayRate}
                 name="maxContractPayRate"
                 onChange={handleContractChange}
                ></input>
             </div>
              {
                 errors.contratRangePay && (
                  <p className="text-red-600 text-xs mt-2">{errors.contratRangePay}</p>
                 )
              }
             </div>
              )
             }
             {
              payRate.fixed && (
              <div className="relative mt-2">
                <div className="flex">
                   <select onChange={handleContractChange} value={contractFormData.contractPayCurrency} className="w-6/12 rounded-l-lg outline-blue-400 border border-opacity-40 border-gray-400 text-sm py-2 px-3  hover:bg-white-600" name="contractPayCurrency">
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
                   name="fixContractPay"
                   value={contractFormData.fixContractPay}
                   onChange={handleContractChange}
                   ></input>
                </div>
                { errors.fixContractPay && (
                  <p className="text-red-600 text-xs mt-2">{errors.fixContractPay}</p>
                )

                }
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
                      name="contractPayCycle"
                      value='hourly'
                      onChange={handleContractChange}
                      ></input>
                      Hourly
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="daily" className="flex gap-2">
                      <input
                      type="radio"
                      id="daily"
                      name="contractPayCycle"
                      value='daily'
                      onChange={handleContractChange}
                      ></input>
                      Daily
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="Weekly" className="flex gap-2">
                      <input
                      type="radio"
                      id="Weekly"
                      name="contractPayCycle"
                      value='Weekly'
                      onChange={handleContractChange}
                      ></input>
                      Weekly
                    </label>
                  </div>
                  <div className="text-sm">
                    <label htmlFor="Monthly" className="flex gap-2">
                      <input
                      type="radio"
                      id="Monthly"
                      name="contractPayCycle"
                      value='Monthly'
                      onChange={handleContractChange}
                      ></input>
                      Monthly
                    </label>
                  </div>

               </div>
               {
                  errors.contractPayCycle && (
                    <p className="text-red-600 text-sm">{errors.contractPayCycle}</p>
                  )
               }
             </div>
             <div>
              <div className="relative mt-2 flex gap-6">
                 <div className="flex flex-col gap-2">
                   <p>Working Hours Per Week</p>
                   <div className="flex items-center">
                     <button type="button"  disabled={weeklyHourCnt<=1} onClick={()=>handleContractCount("WeeklyCnt","Dec")} className="disabled:bg-blue-100 disabled:cursor-not-allowed text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">-</button>
                     <span className="px-4 py-2 border-gray-200 border-1">{contractFormData.weeklyHourCnt}</span>
                     <button type="button" onClick={()=>handleContractCount("WeeklyCnt","Inc")} className="text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">+</button>
                   </div>
                 </div>
                <div className="flex flex-col gap-2">
                   <p>Working Hours Per Day</p>
                   <div className="flex">
                     <button type="button" disabled={dailyHourCnt<=1} onClick={()=>handleContractCount("DailyCnt","Dec")} className="disabled:bg-blue-100 disabled:cursor-not-allowed text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">-</button>
                     <span className="px-4 py-2 border-gray-200 border-1">{contractFormData.dailyHourCnt}</span>
                     <button type="button" onClick={()=>handleContractCount("DailyCnt","Inc")} className="text-lg px-6 py-2 text-white bg-blue-500 rounded-lg">+</button>
                   </div>
                 </div>
             </div>
             {
               errors.hourCnt && (
                   <p className="text-red-600 text-sm mt-2">{errors.contractPayCycle}</p>
               )
             }
             
             </div>
             <div className="relative mt-2 flex w-full flex-col gap-2">
               <p>Additional Contractor Pay Rate details</p>
               <input
                type="text"
                placeholder="Ex. Variables"
                className="input-field"
                name="additionalContractDetails"
                value={contractFormData.additionalContractDetails}
                onChange={handleContractChange}
                ></input>
             </div>
             <div className="relative mt-2 flex flex-col gap-2">
               <p>Remarks</p>
               <input
                type="text"
                name="remarks"
                placeholder="Remarks"
                value={contractFormData.remarks}
                onChange={handleContractChange}
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
                    checked={commissionPayRate.fixed}
                    onClick={()=>setCommisionPayRate({fixed:true,percentage:false})}
                    onChange={handleCommissionChange}
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
                    checked={commissionPayRate.percentage}
                    onClick={()=>setCommisionPayRate({fixed:false,percentage:true})}
                    onChange={handleCommissionChange}
                  />
                  Percentage
                </label>
              </div>
              {errors.commissionType && (
                <p className="text-red-600 text-xs">{errors.commissionType}</p>
              )}
            </div>
            {
              commissionPayRate.fixed && 
              (
            <div>
            <div className="relative flex gap-4 mt-4">
              <input
              type="number"
              name="commissionFixPay"
              className="input-field"
              placeholder="Fixed fee to pay"
              onChange={handleCommissionChange}
              value={commissionFormData.commissionFixPay}
              ></input>
            </div>
            {
              errors.commissionFixPay && 
              (<p className="text-red-600 text-sm mt-2">{errors.commissionFixPay}</p>)
            }
            
           </div>)
            }
            {
              commissionPayRate.percentage && (
             <div>
              <div className="relative flex mt-4">
              <input 
              type="number"
              name="commissionPercentage"
              className="input-field"
              placeholder="%"
              onChange={handleCommissionChange}
              ></input>
              </div>
              {
                errors.commissionPercentage && (
                  <p className="text-red-600 text-sm mt-2">{errors.commissionPercentage}</p>
                )
              }
            </div>
              )
            }
            <div className="relative flex flex-col gap-4 mt-4">
              <p>Billing Cycle*</p>
              <select
               name="billingCycle"
               className="input-field"
               onChange={handleCommissionChange}
               value={commissionFormData.billingCycle}
              >
                <option value=''>Select</option>
                <option value='5'>5 Days</option>
                <option value='15'>15 Days</option>
                <option value='30'>30 Days</option>
              </select>
              {
                errors.billingCycle && (
                  <p className="text-red-600 text-sm">{errors.billingCycle}</p>
                )
              }
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
