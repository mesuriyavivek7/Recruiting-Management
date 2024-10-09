import React,{useState,useEffect} from 'react'
import RecruiterBox from './RecruiterBox'
import RecruiterSection from './RecruiterSection'

import WhiteLoader from '../../assets/whiteloader.svg';

export default function RecruiterCandidateStatus({
    candidateData,
    loader
}) {
    // Mapping of section name with candidate status
  const cstatus = new Map([
    ['section1', 'newresume'],
    ['section2', 'rs-cc'],
    ['section3', 'rs-hm'],
    ['section4', 'test-process'],
    ['section5', 'interview-process'],
    ['section6', 'no-show'],
    ['section7', 'candidate-not-ins'],
    ['section8', 'candidate-not-reach'],
    ['section9', 'rr-cc'],
    ['section10', 'rr-hm'],
    ['section11', 'r-test'],
    ['section12', 'rjt-tech-itw'],
    ['section13', 'rjt-hr-itw'],
    ['section14', 's-f-itw'],
    ['section15', 's-not-offer'],
    ['section16', 'o-released'],
    ['section17', 'o-accepted'],
    ['section18', 'o-rejected'],
    ['section19', 'c-not-joine'],
    ['section20', 'c-joine'],
    ['section21', 'quit-after-joine'],
    ['section22', 'on-hold'],
    ['section23', 'no-action'],
    ['section24', 'use-later'],
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

  return (
    <div className='pt-3 px-4 pb-5 bg-white rounded-md custom-shadow-1'>
    
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
            section1: { title: "New Resume", theme: 'blue' },
            section2: { title: "Resume Select - Client Recruiter", theme: 'purple' },
            section3: { title: "Resume Select - Hiring Manager", theme: 'purple' },
            section4: { title: "Test in Process", theme: 'purple' },
            section5: { title: "Interview in Process", theme: 'purple' },
            section6: { title: "No Show", theme: 'purple' },
            section7: { title: "Candidate Not Interested", theme: 'orange' },
            section8: { title: "Candidate Not Reachable", theme: 'orange' },
            section9: { title: "Resume Reject - Client Recruiter", theme: 'red' },
            section10: { title: "Resume Reject - Hiring Manager", theme: 'red' },
            section11: { title: "Rejected in Test", theme: 'red' },
            section12: { title: "Rejected in Tech Interview", theme: 'red' },
            section13: { title: "Rejected in HR Interview", theme: 'red' },
            section14: { title: "Selected in Final Interview", theme: 'green' },
            section15: { title: "Selected - Won't be Offered", theme: 'green' },
            section16: { title: "Offer Released", theme: 'green' },
            section17: { title: "Offer Accepted", theme: 'green' },
            section18: { title: "Offer Rejected", theme: 'green' },
            section19: { title: "Candidate Not Joining", theme: 'green' },
            section20: { title: "Candidate Joined", theme: 'green' },
            section21: { title: "Quit After Joining", theme: 'green' },
            section22: { title: "On Hold", theme: 'purple' },
            section23: { title: "No Further Action", theme: 'purple' },
            section24: { title: "Use Later", theme: 'purple' },
          };

          const { title, theme } = sectionDetails[sectionId] || { title: "Unknown", theme: 'gray' };

          return (
            <RecruiterSection
              key={sectionId}
              id={sectionId}
              sectionItem={{
                title,
                count: sections[sectionId].length,
                theme
              }}
            >
              {sections[sectionId].map((box) => (
                <RecruiterBox key={box.id} id={box.id} text={box} />
              ))}
            </RecruiterSection>
          );
        })}
      </div>
    )}
  </div>
  )
}
