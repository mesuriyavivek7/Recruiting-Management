import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FaBriefcase, FaMapMarkerAlt, FaInfoCircle, FaBook,  FaFileAlt, FaLock, FaUsers, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';
import { FaUser, FaPhone, FaHome, FaBuilding, FaAddressBook, FaGraduationCap, FaIdCard, FaPassport, FaShieldAlt, FaAmbulance, FaMoneyCheckAlt, FaCogs, FaComment } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const AdminCandidateDetails = () => {
  const [value, setValue] = React.useState('two');
  
 const userData = {
 biographicalDetails: {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      dob: '1985-08-15',
      nationality: 'American',
      maritalStatus: 'Single',
      edelweissRelatives: [
        {
          name: 'Jane Doe',
          relationship: 'Sister',
          employeeId: 'E12345',
        },
        {
          name: 'Mary Doe',
          relationship: 'Mother',
          employeeId: 'E67890',
        },
      ],
    },
    contact: {
      personalEmail: 'john.doe@example.com',
      countryCodePersonal: '+1',
      personalMobile: '1234567890',
    },
    address: {
      current: {
        flatHouseWing: '123',
        streetLocalityArea: 'Main Street',
        landmark: 'Near Central Park',
        pincode: '10001',
        country: 'USA',
      },
      permanent: {
        sameAsCurrent: false,
        flatHouseWing: '456',
        streetLocalityArea: 'Broadway',
        landmark: 'Near Times Square',
        pincode: '10002',
        country: 'USA',
        state: 'NY',
        city: 'New York',
      },
    },
    workExperience: [
      {
        company: 'ABC Corp',
        jobTitle: 'Software Engineer',
        jobLocation: 'New York, NY',
        fromDate: '2010-01-01',
      },
      {
        company: 'XYZ Inc',
        jobTitle: 'Senior Developer',
        jobLocation: 'San Francisco, CA',
        fromDate: '2015-06-01',
      },
    ],
    references: [
      {
        name: 'Robert Smith',
        company: 'Tech Solutions',
        designation: 'Manager',
        phoneCountryCode: '+1',
        phone: '9876543210',
        email: 'robert.smith@techsolutions.com',
        relationship: 'Former Manager',
      },
      {
        name: 'Alice Johnson',
        company: 'Innovate Ltd',
        designation: 'Team Lead',
        phoneCountryCode: '+1',
        phone: '8765432109',
        email: 'alice.johnson@innovate.com',
        relationship: 'Colleague',
      },
    ],
    personalIdentity:{
aadharNumber:'877457845485',
pan:'7875373',
passportNumber:'777'
    },
    education: [
      {
        category: 'Bachelor',
        degree: 'B.Sc. Computer Science',
        specialization: 'Software Engineering',
        courseType: 'Full-time',
        gpa: '3.8',
        maxGpa: '4.0',
        currentlyStudent: false,
        startDate: '2007-09-01',
        completionDate: '2010-05-31',
        institute: 'State University',
        university: 'State University',
        documentProof: 'https://example.com/education-proof',
        highestQualification: true,
      },
    ],
    personalDocumentation: {
      profilePicture: 'https://example.com/profile-picture',
      aadhaarFront: 'https://example.com/aadhaar-front',
      panCard: 'https://example.com/pan-card',
      drivingLicence: 'https://example.com/driving-licence',
      passport: 'https://example.com/passport',
      aadhaarBack: 'https://example.com/aadhaar-back',
      appointmentLetterLastOrg: 'https://example.com/appointment-letter-last-org',
      relievingLetterPreviousOrg: 'https://example.com/relieving-letter-previous-org',
      relievingLetterCurrentOrg: 'https://example.com/relieving-letter-current-org',
    },
    socialSecurity: {
      uanNumber: '1234567890',
    },
    emergencyContacts: [
      {
        bloodGroup: 'O+',
        contactNumber: '0987654321',
        countryCode: '+1',
        mobile: '1234567890',
        relation: 'Friend',
      },
     
    ],
    dependents: [
      {
        name: 'Emily',
        
        relation: 'Daughter',
        dob: '2015-05-10',
        gender:'female',
        contactNumber:'78784574'
      },
    ],
    salaryPayment: {
      accountNumber: '9876543210',
      bankName: 'Bank of America',
      ifscCode: 'BOFAUS3N',
    type:'personal'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
    comments: 'John has been a valuable employee with excellent performance.',
    attachment: 'https://example.com/attachment',
  };
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-gray-100 h-auto font-sans' >
    <Box  >
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" sx={{
          '& .MuiTab-root': {
            color: 'gray-600',
             fontSize: '1rem',
            '&.Mui-selected': {
              color: '#315370',
              fontWeight: 'bold',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#315370',
            height: '6px',
            borderRadius: '2px',
          },
        }}>
        
      <Tab icon={<FaUser />} label="Biographical Details" value="two" />
      <Tab icon={<FaPhone />} label="Contact" value="three" />
      <Tab icon={<FaHome />} label="Address" value="four" />
      <Tab icon={<FaBuilding />} label="Work Experience" value="five" />
      <Tab icon={<FaAddressBook />} label="References" value="six" />
      <Tab icon={<FaGraduationCap />} label="Education" value="seven" />
      <Tab icon={<FaIdCard />} label="Personal Identity" value="eight" />
      <Tab icon={<FaPassport />} label="Personal Documentation" value="nine" />
      <Tab icon={<FaShieldAlt />} label="Social Security" value="ten" />
      <Tab icon={<FaAmbulance />} label="Emergency" value="eleven" />
      <Tab icon={<FaUsers />} label="Dependent" value="twelve" />
      <Tab icon={<FaMoneyCheckAlt />} label="Salary Payment" value="thirteen" />
      <Tab icon={<FaCogs />} label="Skills" value="fourteen" />
      <Tab icon={<FaComment />} label="Comments" value="fifteen" />
      </Tabs>
      <div className="mt-6 ">

     

      {value === 'two' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Biographical Details */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center space-y-2 w-full">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
              <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaIdCard className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Biographical Details
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>First Name:</strong> {userData.biographicalDetails.firstName || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Last Name:</strong> {userData.biographicalDetails.lastName || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Gender:</strong> {userData.biographicalDetails.gender || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Date of Birth:</strong> {userData.biographicalDetails.dob || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Nationality:</strong> {userData.biographicalDetails.nationality || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Marital Status:</strong> {userData.biographicalDetails.maritalStatus || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Edelweiss Relative 1 Name:</strong> {userData.biographicalDetails.edelweissRelatives[0]?.name || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Relationship:</strong> {userData.biographicalDetails.edelweissRelatives[0]?.relationship || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Employee ID:</strong> {userData.biographicalDetails.edelweissRelatives[0]?.employeeId || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Edelweiss Relative 2 Name:</strong> {userData.biographicalDetails.edelweissRelatives[1]?.name || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Relationship:</strong> {userData.biographicalDetails.edelweissRelatives[1]?.relationship || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Employee ID:</strong> {userData.biographicalDetails.edelweissRelatives[1]?.employeeId || 'N/A'}</p>
          </div>
          </div>
          </div>
        </div>
      )}

      {value === 'three' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Contact */}
          <div className="bg-white p-4 rounded-lg space-y-2 flex flex-col items-center w-full">
            <div className=' min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
              <div className='w-auto space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <MdEmail className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Contact
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Personal Email:</strong> {userData.contact.personalEmail || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Country Code:</strong> {userData.contact.countryCodePersonal || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Personal Mobile Number:</strong> {userData.contact.personalMobile || 'N/A'}</p>
          </div>
          </div>
          </div>
        </div>
      )}

      {value === 'four' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Address */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full  space-y-2">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaMapMarkerAlt className="mr-3 text-2xl text-green-600 xl:text-3xl" /> Address
            </h2>

            {/* Current Address */}
            <div className="space-y-3">
              <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Current Address</h3>
              <p className=" xl:text-lg"><strong>Flat/House/Wing Number:</strong> {userData.address.current.flatHouseWing || 'N/A'}</p>
              <p className="font-sans xl:text-lg"><strong>Street/Locality/Area:</strong> {userData.address.current.streetLocalityArea || 'N/A'}</p>
              <p className="font-sans xl:text-lg"><strong>Landmark:</strong> {userData.address.current.landmark || 'N/A'}</p>
              <p className="font-sans xl:text-lg"><strong>Pincode:</strong> {userData.address.current.pincode || 'N/A'}</p>
              <p className="font-sans xl:text-lg"><strong>Country:</strong> {userData.address.current.country || 'N/A'}</p>
            </div>

            {/* Permanent Address */}
            {!userData.address.permanent.sameAsCurrent && (
              <div className="space-y-3">
                <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Permanent Address</h3>
                <p className="font-sans xl:text-lg"><strong>Flat/House/Wing Number:</strong> {userData.address.permanent.flatHouseWing || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Street/Locality/Area:</strong> {userData.address.permanent.streetLocalityArea || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Landmark:</strong> {userData.address.permanent.landmark || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Pincode:</strong> {userData.address.permanent.pincode || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Country:</strong> {userData.address.permanent.country || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>State:</strong> {userData.address.permanent.state || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>City:</strong> {userData.address.permanent.city || 'N/A'}</p>
              </div>
            )}
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'five' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Work Experience */}
          <div className="bg-white p-4 rounded-lg flex flex-col w-full items-center space-y-2">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaBriefcase className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Work Experience
            </h2>
            {userData.workExperience.map((exp, index) => (
              <div key={index} className="space-y-3">
                <p className="font-sans xl:text-lg"><strong>Company:</strong> {exp.company || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Job Title:</strong> {exp.jobTitle || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Job Location:</strong> {exp.jobLocation || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>From Date:</strong> {exp.fromDate || 'N/A'}</p>
              </div>
            ))}
            
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'six' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* References */}
          <div className="bg-white p-4 rounded-lg  space-y-2 flex flex-col items-center w-full">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaUsers className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> References
            </h2>
            {userData.references.map((ref, index) => (
              <div key={index} className="space-y-3">
                <p className="font-sans xl:text-lg"><strong>Reference Name:</strong> {ref.name || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Company:</strong> {ref.company || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Designation:</strong> {ref.designation || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Phone Country Code:</strong> {ref.phoneCountryCode || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Phone:</strong> {ref.phone || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Email:</strong> {ref.email || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Relationship:</strong> {ref.relationship || 'N/A'}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'seven' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Education */}
          <div className="bg-white p-4 rounded-lg flex flex-col w-full items-center space-y-2">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaBook className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Education
            </h2>
            {userData.education.map((edu, index) => (
              <div key={index} className="space-y-3">
                <p className="font-sans xl:text-lg"><strong>Education Category:</strong> {edu.category || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Degree:</strong> {edu.degree || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Field of Specialisation:</strong> {edu.specialisation || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Course Type/Degree Type:</strong> {edu.courseType || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>GPA/Percentage:</strong> {edu.gpa || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Max GPA/Percentage:</strong> {edu.maxGpa || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Currently Student:</strong> {edu.currentlyStudent ? 'Yes' : 'No'}</p>
                <p className="font-sans xl:text-lg"><strong>Start Date:</strong> {edu.startDate || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Completion Date:</strong> {edu.completionDate || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Institute:</strong> {edu.institute || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>University:</strong> {edu.university || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Education Document Proof:</strong> {edu.documentProof || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Highest Qualification:</strong> {edu.highestQualification ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
          </div>
        
        </div>
        </div>
      )}

      {value === 'eight' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Personal Identity */}
          <div className="bg-white p-4 rounded-lg flex flex-col w-full items-center space-y-2">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaIdCard className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Personal Identity
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Aadhar Number:</strong> {userData.personalIdentity.aadharNumber || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>PAN:</strong> {userData.personalIdentity.pan || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Passport Number:</strong> {userData.personalIdentity.passportNumber || 'N/A'}</p>
          </div>
          </div>
        </div>
        </div>
      )}

{value === 'nine' && (
  <div className="space-y-6 flex flex-col items-center p-4">
    {/* Personal Documentation */}
    <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full  space-y-2">
      <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
      <div className='w-auto  space-y-3'>
      <h2 className="text-xl  xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
        <FaFileAlt className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Personal Documentation
      </h2>

      {Object.entries(userData.personalDocumentation).map(([key, url]) => (
        <div key={key} className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700 capitalize xl:text-xl">
            {key.replace(/([A-Z])/g, ' $1')}
          </h3>
          <iframe
            src={url}
            title={key}
            className="w-full h-[400px] rounded-lg border-2 border-gray-300"
            loading="lazy"
          ></iframe>
        </div>
      ))}
    </div>
    </div>
  </div>
  </div>
)}


      {value === 'ten' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Social Security */}
          <div className="bg-white p-4 rounded-lg  flex flex-col items-center w-full space-y-2">
            <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
            <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaLock className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Social Security
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>UAN Number:</strong> {userData.socialSecurity.uanNumber || 'N/A'}</p>
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'eleven' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Emergency */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full space-y-2">
          <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
          <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaExclamationTriangle className="mr-3 text-2xl text-red-600 xl:text-3xl" /> Emergency
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Emergency Contact Name:</strong> {userData.emergencyContacts.countryCode || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Emergency Contact Phone:</strong> {userData.emergencyContacts.contactNumber || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Emergency Contact Email:</strong> {userData.emergencyContacts.contactEmail || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Emergency Contact Relationship:</strong> {userData.emergencyContacts.relation || 'N/A'}</p>
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'twelve' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Dependent */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full space-y-2">
          <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
          <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaUsers className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Dependent
            </h2>
            {userData.dependents.map((dep, index) => (
              <div key={index} className="space-y-3">
                <p className="font-sans xl:text-lg"><strong>Dependent Name:</strong> {dep.name || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Relationship:</strong> {dep.relation || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Date of Birth:</strong> {dep.dob || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Gender:</strong> {dep.gender || 'N/A'}</p>
                <p className="font-sans xl:text-lg"><strong>Contact Number:</strong> {dep.contactNumber || 'N/A'}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'thirteen' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Salary Payment */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full space-y-2">
          <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
          <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaDollarSign className="mr-3 text-2xl text-green-600 xl:text-3xl" /> Salary Payment
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Bank Account Number:</strong> {userData.salaryPayment.accountNumber || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Bank Name:</strong> {userData.salaryPayment.bankName || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>IFSC Code:</strong> {userData.salaryPayment.ifscCode || 'N/A'}</p>
            <p className="font-sans xl:text-lg"><strong>Account Type:</strong> {userData.salaryPayment.type || 'N/A'}</p>
          </div>
        </div>
        </div>
        </div>
      )}

      {value === 'fourteen' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Skills */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full space-y-2">
          <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
          <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaBook className="mr-3 text-2xl text-blue-600 xl:text-3xl" /> Skills
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Skills:</strong> {userData.skills.join(', ') || 'N/A'}</p>
          </div>
          </div>
        </div>
        </div>
      )}

      {value === 'fifteen' && (
        <div className="space-y-6 flex flex-col items-center p-4">
          {/* Comments */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center w-full space-y-2">
          <div className='min-w-[500px] xl:min-w-[900px] flex flex-col items-center'>
          <div className='w-auto  space-y-3'>
            <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 font-sans flex items-center">
              <FaExclamationTriangle className="mr-3 text-2xl text-yellow-600 xl:text-3xl" /> Comments
            </h2>
            <p className="mt-2 font-sans xl:text-lg"><strong>Comments:</strong> {userData.comments || 'N/A'}</p>
          </div>
          </div>
        </div>
        </div>
      )}
      </div>
    </Box>
    </div>
  );
};

export default AdminCandidateDetails;
