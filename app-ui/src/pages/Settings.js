import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";


const Settings = () => {
  const {user,loading,dispatch}=useContext(AuthContext)

  const countryCodeToString = {
    93: "AF",
    355: "AL",
    213: "DZ",
    376: "AD",
    244: "AO",
    54: "AR",
    374: "AM",
    61: "AU",
    43: "AT",
    994: "AZ",
    973: "BH",
    880: "BD",
    375: "BY",
    32: "BE",
    501: "BZ",
    229: "BJ",
    975: "BT",
    591: "BO",
    387: "BA",
    267: "BW",
    55: "BR",
    673: "BN",
    359: "BG",
    226: "BF",
    257: "BI",
    855: "KH",
    237: "CM",
    238: "CV",
    236: "CF",
    235: "TD",
    56: "CL",
    86: "CN",
    57: "CO",
    269: "KM",
    242: "CG",
    243: "CD",
    506: "CR",
    385: "HR",
    53: "CU",
    357: "CY",
    420: "CZ",
    45: "DK",
    253: "DJ",
    670: "TL",
    593: "EC",
    20: "EG",
    503: "SV",
    240: "GQ",
    291: "ER",
    372: "EE",
    251: "ET",
    358: "FI",
    33: "FR",
    241: "GA",
    220: "GM",
    995: "GE",
    49: "DE",
    233: "GH",
    30: "GR",
    502: "GT",
    224: "GN",
    245: "GW",
    592: "GY",
    509: "HT",
    504: "HN",
    36: "HU",
    354: "IS",
    91: "IN",
    62: "ID",
    98: "IR",
    964: "IQ",
    353: "IE",
    972: "IL",
    39: "IT",
    225: "CI",
    81: "JP",
    962: "JO",
    254: "KE",
    686: "KI",
    965: "KW",
    996: "KG",
    856: "LA",
    371: "LV",
    961: "LB",
    266: "LS",
    231: "LR",
    218: "LY",
    423: "LI",
    370: "LT",
    352: "LU",
    261: "MG",
    265: "MW",
    60: "MY",
    960: "MV",
    223: "ML",
    356: "MT",
    222: "MR",
    230: "MU",
    52: "MX",
    373: "MD",
    377: "MC",
    976: "MN",
    382: "ME",
    212: "MA",
    258: "MZ",
    95: "MM",
    264: "NA",
    977: "NP",
    31: "NL",
    64: "NZ",
    505: "NI",
    227: "NE",
    234: "NG",
    47: "NO",
    968: "OM",
    92: "PK",
    680: "PW",
    507: "PA",
    675: "PG",
    595: "PY",
    51: "PE",
    63: "PH",
    48: "PL",
    351: "PT",
    974: "QA",
    40: "RO",
    7: "RU",
    250: "RW",
    685: "WS",
    378: "SM",
    239: "ST",
    966: "SA",
    221: "SN",
    381: "RS",
    248: "SC",
    232: "SL",
    65: "SG",
    421: "SK",
    386: "SI",
    677: "SB",
    252: "SO",
    27: "ZA",
    82: "KR",
    34: "ES",
    94: "LK",
    249: "SD",
    597: "SR",
    268: "SZ",
    46: "SE",
    41: "CH",
    963: "SY",
    886: "TW",
    992: "TJ",
    255: "TZ",
    66: "TH",
    228: "TG",
    676: "TO",
    216: "TN",
    90: "TR",
    993: "TM",
    688: "TV",
    256: "UG",
    380: "UA",
    971: "AE",
    44: "GB",
    1: "US",
    598: "UY",
    998: "UZ",
    678: "VU",
    379: "VA",
    58: "VE",
    84: "VN",
    967: "YE",
    260: "ZM",
    263: "ZW",
};

  const mobileno=useFetch(`/enterprise/getmobile/${user.enterprise_id}`).data
  
  const [errors,setErrors]=useState({})
  const [showemailbutton,setShowEmailButton]=useState(false)
  const [showpasswordbutton,setShowPasswordButton]=useState(false)
  const [showmobilebutton,setShowMobileButton]=useState(false)
  const [emailData,setEmailData]=useState("")
  const [emailLoad,setEmailLoad]=useState(false)

  const [passwordData,setPasswordData]=useState({
    current_password:"",
    new_password:"",
    confirm_password:""
  })


  const handleemaildatachange=()=>{
     
     validateemailaddress()
     setShowEmailButton(true)
     
  }


  const validateemailaddress=()=>{
    let newErrors={};
     //regax for check email address
     const emailreg=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

     if(!emailData)  newErrors.email="Email address is required."
     if(!emailreg.test(emailData))  newErrors.email="Email address is invalid"

     setErrors(newErrors)
  }

  const emailsubmit=async ()=>{
     let userObj=user
     dispatch({type:"USER_FETCH_START"})
    
    
  }


  

  return (
    <div className="flex flex-col gap-2 relative">
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Request Email Change</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-email" className="input-label">
            Current Email
          </label>
          <input
            type="email"
            value={user.email}
            name="current-email"
            id="current-email"
            className="input-field disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-email" className="input-label ">
            Enter New Email
          </label>
          <input
            type="email"
            name="email"
            onBlur={handleemaildatachange}
            value={emailData}
            onChange={(e)=>setEmailData(e.target.value)}
            id="new-email"
            className={`input-field ${(errors.email && showemailbutton) && "border-red-400"}`}
          />
          {
            (errors.email && showemailbutton) && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )
          }
        </div>
        {
          showemailbutton &&  (<div class="mt-2 flex container space-x-2">
                                 <button disabled={(errors.email || loading)?(true):(false)} class="relative flex-1 bg-blue-500 text-white py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                                     {loading && (<span class="absolute inset-0 flex items-center justify-center">
                                          <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>)}
                                     
                                     {!loading && <span class="ml-2">Save</span>}
                                 </button>
                                 <button onClick={()=>setShowEmailButton(false)} class="bg-gray-500 text-white py-2 px-4 rounded">Close</button>
                              </div>)
        }
        

      </form>
      <form className="password-change-form  w-1/2 custom-div">
        <p className="font-bold">Password</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-password" className="input-label">
            Current Password
          </label>
          <input
            type="password"
            name="current-password"
            id="current-password"
            className="input-field"
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-password" className="input-label">
            New Password
          </label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="input-field"
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="confirm-password" className="input-label ">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="input-field "
          />
        </div>
      </form>
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Phone Number</p>
        <PhoneInput value={(typeof mobileno==="string") && mobileno} country={(typeof mobileno==="string") && countryCodeToString[parseInt(mobileno.substring(0,2))].toLowerCase()} containerStyle={{ width: "100%" }} />
      </form>
    </div>
  );
};



export default Settings;
