import React from 'react'
import AllaccountmanagerData from './AccountManager/AllaccountmanagerData';
const AccountManagerTable = () => {
  return (
    <div className="">
      <div className="flex gap-6">
        <span
          style={{
            backgroundColor: "#315370",
            color: "white",
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            width: "200px",
            textAlign: "center",
          }}
        >
          All Account Managers
        </span>
      </div>
      <div className="pt-8">
        <AllaccountmanagerData />
      </div>
    </div>
  );
};

export default AccountManagerTable;
