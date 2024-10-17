import React from 'react';
// import RecruitingDetails from './RecruitingDetails';  
// import RecruitingTeam from './RecruitingTeam';        
// import RecruitingCandidate from './RecruitingCandidate'; 
import AdminTabView from '../AdminTabView';
import AllRecruitingAgencyData from './AllRecruitingAgencyData';

const AdminRecruiting = () => {
  const tabs = [
    { name: 'Recruiting Details', component: <AllRecruitingAgencyData /> },
    { name: 'Team', component:<AllRecruitingAgencyData />   },//<RecruitingTeam />
    { name: 'Candidate', component: <AllRecruitingAgencyData />  },//<RecruitingCandidate />
  ];

  return <AdminTabView tabs={tabs} />;
};

export default AdminRecruiting;
