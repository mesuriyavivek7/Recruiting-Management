import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";




const User = () => {
 
  const [totalRecrutingUser, setTotalRecrutingUser] = useState(0);
  const [totalNewRecrutingUser, setTotalNewRecrutingUser] = useState(0);



  

   
  return (
   
    <div className="">

      
<div className="pt-14 min-h-screen flex flex-col gap-10  justify-center py-6 section">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center pt-6">
        <Link
          to={"/manage-RecruitingUser"}
          className=" shadow-lg active:scale-95 hover:bg-orange/70 duration-150 hover:shadow-xl hover:scale-105 shadow-orangehover rounded-lg py-8 px-10 font-bold bg-blue-230"
        >
          Total Recruiting User -{totalRecrutingUser}
        </Link>
        <Link
          to={"/manage- NewRecruitingsUser"}
          className=" bg-blue-230 shadow-lg  active:scale-95 hover:bg-orange/70 duration-150 hover:shadow-xl hover:scale-105 shadow-orangehover rounded-lg py-8 px-10 font-bold"
        >
          Total New Recruiting User -{totalNewRecrutingUser}
        </Link>
       
        
       
      </div>
    </div>
    </div>

    
  );
};

export default User;
