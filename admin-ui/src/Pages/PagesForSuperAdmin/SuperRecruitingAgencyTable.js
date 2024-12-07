import AllRecruitingAgencyData from './RecruitingAgency/AllRecruitingAgencyData';

const SuperRecruitingAgencyTable = () => {
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
          All Recruiting Agency
        </span>
      </div>
      <div className="pt-8">
        <AllRecruitingAgencyData />
      </div>
    </div>
  );
};

export default SuperRecruitingAgencyTable;
