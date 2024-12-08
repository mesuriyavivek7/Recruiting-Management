import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { fetchAcceptedRecruiterMemberIds, fetchMappedRecruiterMemberIds, fetchPostedCandidateProfileByJobId, fetchRequestedRecruiterIds } from '../../services/api';
import SuperJobDetails from './SuperJobDetails';
import AllCandidateDataForEachJob from './Job/AllCandidateDataForEachJob';
import AcceptedRecruiterMember from './Job/AcceptedRecruiterMember';
import MappedRecruiterMember from './RecruitingAgency/MappedRecruiterMember';
import RequestedRecruiter from './Job/RequestedRecruiter';

const Job = () => {
  const { id } = useParams();
  const location = useLocation();
  const job_id = location?.state?.job_id;
  const [activeTab, setActiveTab] = useState('Job');
  const [candidateCount, setCandidateCount] = useState(0);
  const [mappedRecruiterCount, setMappedRecruiterCount] = useState(0);
  const [requestedRecruiterCount, setRequestedRecruiterCount] = useState(0);
  const [acceptedRecruiterCount, setAcceptedRecruiterCount] = useState(0)

  const handleCandidateCount = async () => {
    const verifiedCandiatesIds = await fetchPostedCandidateProfileByJobId(job_id);
    setCandidateCount(verifiedCandiatesIds?.length);
  }

  const handleMappedRecruiterCount = async () => {
    const mappedRecruiterCount = await fetchMappedRecruiterMemberIds(job_id)
    setMappedRecruiterCount(mappedRecruiterCount?.length)
  }

  const handleRequestedRecruiterCount = async () => {
    const recruiterMemberIds = await fetchRequestedRecruiterIds(job_id);
    setRequestedRecruiterCount(recruiterMemberIds.length)
  }

  const handleAcceptedRecruiterCount = async () => {
    const recruiterMemberIds = await fetchAcceptedRecruiterMemberIds(job_id)
    setAcceptedRecruiterCount(recruiterMemberIds.length)
  }

  useEffect(() => {
    handleCandidateCount();
    handleMappedRecruiterCount();
    handleRequestedRecruiterCount();
    handleAcceptedRecruiterCount()
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <p className='text-xl font-medium'>Job ID:{job_id}</p>
      <div className='pt-6'>

        <div className="flex gap-0">
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            variant="contained"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Job' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Job' ? 'white' : '#000',
              fontSize: '16px',
              height: '50px',
              textTransform: 'none',
              border: '2px solid white',
              borderRadius: '20px 0 0 20px',  // Rounded left side
              width: '140px',
              marginRight: '-1px',
            }}
            onClick={() => handleTabChange('Job')}
          >
            Job Details
          </Button>

          {/* Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'Candidate' ? '#315370' : '#e0e0e0',
              color: activeTab === 'Candidate' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('Candidate')}
          >
            {candidateCount} Candidate
          </Button>

          {/* Accepted Recriuter Member */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'acceptedRe' ? '#315370' : '#e0e0e0',
              color: activeTab === 'acceptedRe' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              border: '2px solid white',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('acceptedRe')}
          >
            {acceptedRecruiterCount} Accepted Recruiter
          </Button>

          {/* mapped Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'mRecruiter' ? '#315370' : '#e0e0e0',
              color: activeTab === 'mRecruiter' ? 'white' : '#000',
              border: '2px solid white',
              fontSize: '16px',
              textTransform: 'none',
              height: '50px',
              borderRadius: '0 0 0 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('mRecruiter')}
          >
            {mappedRecruiterCount} Mapped Recruiter
          </Button>
          {/* Requested Candidate Button */}
          <Button
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            style={{
              backgroundColor: activeTab === 'rRecruiter' ? '#315370' : '#e0e0e0',
              color: activeTab === 'rRecruiter' ? 'white' : '#000',
              fontSize: '16px',
              textTransform: 'none',
              border: '2px solid white',
              height: '50px',
              borderRadius: '0 20px 20px 0',  // Rounded right side
              width: 'auto',
            }}
            onClick={() => handleTabChange('rRecruiter')}
          >
            {requestedRecruiterCount} Requested Recruiter
          </Button>
        </div>
        <div>
          {activeTab === 'Job' && (
            <div className='pt-9'>
              <SuperJobDetails />
            </div>
          )}
          {activeTab === 'Candidate' && (
            <div className='pt-9 '>
              <AllCandidateDataForEachJob jobId={id} />
            </div>
          )}
          {activeTab === 'acceptedRe' && (
            <div className='pt-9 '>
              <AcceptedRecruiterMember jobId={id} />
            </div>
          )}
          {activeTab === 'mRecruiter' && (
            <div className='pt-9 '>
              <MappedRecruiterMember jobId={id} handleMappedRecruiterCount={handleMappedRecruiterCount} handleRequestedRecruiterCount={handleRequestedRecruiterCount}></MappedRecruiterMember>
            </div>
          )}
          {activeTab === 'rRecruiter' && (
            <div className='pt-9 '>
              <RequestedRecruiter jobId={id} />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Job;
