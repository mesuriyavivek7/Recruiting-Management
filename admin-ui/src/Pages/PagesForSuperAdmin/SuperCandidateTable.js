import React from "react";
import AllCandidateData from "./Candidate/AllCandidateData";

const SuperCandidateTable = () => {
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
          All Candidates
        </span>
      </div>
      <div className="pt-8">
        <AllCandidateData />
      </div>
    </div>
  );
};

export default SuperCandidateTable;
