import React from 'react';
 
import RecruitingTeam from './AdminRcTeam';        

import AdminTabView from '../AdminTabView';


import AdminRecruitingDetails from './AdminRecrutingDetails';
import AdminCandidate from './AdminCandidate';


const AdminRecruiting = () => {
  const tabs = [
    { name: 'Recruiting Details', component: <AdminRecruitingDetails/> },
    { name: 'Team', component:<RecruitingTeam />  },
    { name: 'Candidate', component: <AdminCandidate/> },//
  ];

  return <AdminTabView tabs={tabs} />;
};

export default AdminRecruiting;
