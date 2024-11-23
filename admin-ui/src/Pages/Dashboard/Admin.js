import React, { useEffect, useState } from "react";

// import { Outlet } from "react-router-dom";
import SideNavbar from "../../Components/SideNavbar";
import Navbar from "../../Components/Navbar";
import { useRows } from "../PagesForAdmin/EnterpriseTable/RowColData"
import { rowsr } from "../PagesForAdmin/RecruitingAgency/RowColData";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const getRows = useRows();
  const [rows, setRows] = useState([])

  const [enterpriseData,setEnterpriseData]=useState([])
  const [recruiterData,setRecruiterData]=useState([])

  const navigate = useNavigate()
  const myvalue = useSelector((state) => state.admin)

  useEffect(() => {
    if (!myvalue) {
      navigate('/')
    }
  }, [myvalue])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rowsData = await getRows();
        setRows(rowsData);
      } catch (error) {
        console.error("Error fetching rows:", error);
      }
    };
  
    fetchData(); // Call the fetchData function here
  }, [getRows]);
  

  return (
    <div className="flex flex-col w-screen max-w-[100vw] h-[100vh] max-h-screen relative overflow-hidden ">
      <Navbar enterpriseData={rows} recruiterData={rowsr} />
      <div className="flex w-full h-full relative gap-9 ">
        <SideNavbar />
        <div className="  w-full h-full flex  flex-col pb-20 gap-2 relative bg-white-200 sm:pt-4 lg:pt-6  overflow-y-scroll font-sans pr-8">
          {/*  */}
          {/* <AdminDashboard/> */}
          <Outlet />
        </div>


      </div>
    </div>
  );
};

export default Admin;
