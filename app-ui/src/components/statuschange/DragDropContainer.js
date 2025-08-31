import React, { useEffect, useState } from 'react';
import DropSection from './DropSection';
import DropBox from './DropBox';
import axios from 'axios';

// Importing loader 
import WhiteLoader from '../../assets/whiteloader.svg';

export default function DragDropContainer({
  candidateData,
  showNotification,
  refetchCandidateData,
  loader
}) {
  
  // Mapping of section name with candidate status
  const cstatus = new Map([
    ['section1', 'resumesubmit'],
    ['section2', 'sip'],
    ['section3', 'cvshortclient'],
    ['section4', 'cvshorthr'],
    ['section5', 'interview-schedule'],
    ['section6', 'no-show'],
    ['section7', 'candidate-not-ins'],
    ['section8', 'candidate-not-reach'],
    ['section9', 'cv-reject-client'],
    ['section10', 'cv-reject-hr'],
    ['section11', 'r-techround'],
    ['section12', 'r-hrround'],
    ['section13', 'short-next-round'],
    ['section14', 's-finale-interview'],
    ['section15', 's-not-offer'],
    ['section16', 'o-hold'],
    ['section17', 'o-extended'],
    ['section18', 'o-accepted'],
    ['section19', 'o-declined'],
    ['section20', 'not-join'],
    ['section21', 'success-joined'],
    ['section22', 'payout-eligible'],
    ['section23', 'early-registration'],
    ['section24', 'cv-rejected'],
    ['section25', 'invoice-raised'],
    ['section26', 'payment-received'],
    ['section27', 'credit-note']
  ]);

  const initialSection = {
    section1: [],
    section2: [],
    section3: [],
    section4: [],
    section5: [],
    section6: [],
    section7: [],
    section8: [],
    section9: [],
    section10: [],
    section11: [],
    section12: [],
    section13: [],
    section14: [],
    section15: [],
    section16: [],
    section17: [],
    section18: [],
    section19: [],
    section20: [],
    section21: [],
    section22: [],
    section23: [],
    section24: [],
  };

  const [sections, setSections] = useState(initialSection);
  const [statusLoader, setStatusLoader] = useState(false);

  // Effect to allocate candidates to sections whenever candidateData changes
  useEffect(() => {
    // Initialize a new sections object
    const newSections = { ...initialSection };

    candidateData.forEach((item) => {
      const status = item.candidate_status;
      console.log("candidate present status",status)
      // Find the corresponding section key from cstatus Map
      const sectionKey = Array.from(cstatus.entries()).find(
        ([key, value]) => value === status
      )?.[0] || 'section1'; // Default to 'section1' if status not found

      // Assign the candidate to the appropriate section
      newSections[sectionKey] = [...newSections[sectionKey], item];
    });

    // Update the sections state
    setSections(newSections);
  }, [candidateData]);

  // Handle drop event
  const handleDrop = async (item, sectionId) => {
    setStatusLoader(true);

    const { id } = item;
    const status = cstatus.get(sectionId);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/candidate/changecandidatestatus/${id}`, { status });
      refetchCandidateData();
      showNotification("Candidate status updated successfully.", "success");
    } catch (err) {
      console.error(err);
      showNotification("Something went wrong while changing candidate status.", "failure");
    } finally {
      setStatusLoader(false);
    }
  };

  return (
    <div className='pt-3 px-4 pb-5 bg-white rounded-md custom-shadow-1'>
      {statusLoader && (
        <div className='fixed inset-0 flex justify-center bg-black z-50 bg-opacity-50 backdrop-blur-md items-center'>
          <div className='custom-div w-[450px] p-4 flex flex-col items-center'>
            <img className='h-10 w-10' alt='Loading...' src={WhiteLoader} />
            <p>Please wait while we update the candidate status.</p>
          </div>
        </div>
      )}
      
      <h1 className='w-full text-center text-gray-800 text-sm'>Scroll to View Other Resumes</h1>
      
      {loader ? (
        <div className='mt-10 flex justify-center items-center'>
          <img className='w-10 h-10' src={WhiteLoader} alt='Loading...' />
        </div>
      ) : (
        <div className="w-full overflow-x-auto whitespace-nowrap mt-2 p-4">
          {Array.from(cstatus.keys()).map((sectionId) => {
            // Define titles and themes for each section
            const sectionDetails = {
              section1: { title: "Resume Submitted", theme: 'blue' },
              section2: { title: "Screening in Progress", theme: 'purple' },
              section3: { title: "CV Shortlisted – Client Recruiter", theme: 'purple' },
              section4: { title: "CV Shortlisted – Hiring Manager", theme: 'purple' },
              section5: { title: "Interview Scheduled", theme: 'purple' },
              section6: { title: "No Show", theme: 'purple' },
              section7: { title: "Candidate Not Interested", theme: 'orange' },
              section8: { title: "Candidate Not Reachable", theme: 'orange' },
              section9: { title: "CV Rejected – Client Recruiter", theme: 'red' },
              section10: { title: "CV Rejected – Hiring Manager", theme: 'red' },
              section11: { title: "Rejected – Technical Round", theme: 'red' },
              section12: { title: "Rejected – HR Round", theme: 'red' },
              section13: { title: "Shortlisted for Next Round", theme: 'red' },
              section14: { title: "Selected in Final Interview", theme: 'green' },
              section15: { title: "Selected – Not Offered", theme: 'green' },
              section16: { title: "On Hold", theme: 'green' },
              section17: { title: "Offer Extended", theme:'green'},
              section18: { title: "Offer Accepted", theme: 'green' },
              section19: { title: "Offer Declined", theme: 'green' },
              section20: { title: "Did Not Join", theme: 'green' },
              section21: { title: "Successfully Joined", theme: 'green' },
              section22: { title: "Payout Eligible", theme: 'green' },
              section23: { title: "Early Resignation", theme: 'purple' },
              section24: { title: "CV Rejected - In Process", theme: 'purple' },
            };

            const { title, theme } = sectionDetails[sectionId] || { title: "Unknown", theme: 'gray' };

            return (
              <DropSection
                key={sectionId}
                id={sectionId}
                onDrop={handleDrop}
                sectionItem={{
                  title,
                  count: sections[sectionId].length,
                  theme
                }}
              >
                {sections[sectionId].map((box) => (
                  <DropBox key={box.id} id={box.id} text={box} />
                ))}
              </DropSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
