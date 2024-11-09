import React from 'react';


import { useLocation } from 'react-router-dom';
import AcTabView from '../AcTabView';
import AcRecruitingDetails from './AcRecrutingDetails';
import AcCandidate from './AcCandidate';
import AcRcTeam from './AcRcTeam';

const AcRecruiting = () => {
  const location = useLocation();
  const { recuritingAgenciesDetails } = location.state || {}; // Access the passed state

  const tabs = [
    { name: 'Recruiting Details', component: <AcRecruitingDetails recuritingAgenciesDetails={recuritingAgenciesDetails} /> },
    { name: 'Team', component: <AcRcTeam recuritingAgenciesDetails={recuritingAgenciesDetails} /> },
    { name: 'Candidate', component: <AcCandidate recuritingAgenciesDetails={recuritingAgenciesDetails} /> },//
  ];

  return <AcTabView tabs={tabs} />;
};

export default AcRecruiting;
