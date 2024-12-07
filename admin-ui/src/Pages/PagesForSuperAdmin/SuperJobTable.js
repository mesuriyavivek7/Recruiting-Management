import React from "react";
import AllJobData from "./Job/AllJobData";

const SuperJobTable = () => {
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
            width: "120px",
            textAlign: "center",
          }}
        >
          All Jobs
        </span>
      </div>
      <div className="pt-8">
        <AllJobData />
      </div>
    </div>
  );
};

export default SuperJobTable;
