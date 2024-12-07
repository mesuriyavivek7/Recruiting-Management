import React from "react";
import AllEnterpriseData from "./EnterpriseTable/AllEnterpriseData";

const SuperEnterpriseTable = () => {
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
            width: "150px",
            textAlign: "center",
          }}
        >
          All Enterprise
        </span>
      </div>
      <div className="pt-8">
        <AllEnterpriseData />
      </div>
    </div>
  );
};

export default SuperEnterpriseTable;
