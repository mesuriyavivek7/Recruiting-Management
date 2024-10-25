import React from 'react';
import RecruitingTeam from './AdminRcTeam';
import AdminTabView from '../AdminTabView';
import AdminRecruitingDetails from './AdminRecrutingDetails';
import AdminCandidate from './AdminCandidate';
import { useLocation } from 'react-router-dom';

const AdminRecruiting = () => {
  const location = useLocation();
  const { recuritingAgenciesDetails } = location.state || {}; // Access the passed state

  const tabs = [
    { name: 'Recruiting Details', component: <AdminRecruitingDetails recuritingAgenciesDetails={recuritingAgenciesDetails} /> },
    { name: 'Team', component: <RecruitingTeam recuritingAgenciesDetails={recuritingAgenciesDetails} /> },
    { name: 'Candidate', component: <AdminCandidate recuritingAgenciesDetails={recuritingAgenciesDetails} /> },//
  ];

  return <AdminTabView tabs={tabs} />;
};

export default AdminRecruiting;
