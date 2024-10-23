import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ActionIcon } from "./../../../assets/asset23.svg";
import { useLocation } from 'react-router-dom';
import { fetchAccountManager } from '../../../services/api';

const AdminRecruitingDetails = () => {

  const location = useLocation();
  const { RecuritingAgenciesDetails } = location.state || {}; // Access the passed state
  const [accountManager, setAccountManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (RecuritingAgenciesDetails.alloted_account_manager) {
        try {
          const managerData = await fetchAccountManager(RecuritingAgenciesDetails.alloted_account_manager);
          setAccountManager(managerData);
        } catch (error) {
          console.error('Error fetching account manager data:', error);
        }
      }
    };

    fetchData();
  }, [RecuritingAgenciesDetails]);

  const kycData = {
    details: {
      name: "John Doe",
      age: 30,
      address: "123 Main St",
    },
    documents: {
      idProof: "Passport",
      addressProof: "Utility Bill",
      incomeProof: "Salary Slip",
    },
  };

  // Helper function to render object or array values as strings
  const renderValue = (value) => {
    if (typeof value === 'object') {
      // If the value is an object or array, convert it to a JSON string for display
      return JSON.stringify(value);
    }
    return value ?? 'N/A'; // Handle undefined/null with 'N/A'
  };

  return (
    <Card
      className="mt-4 font-sans shadow-md"
      sx={{
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <div className="lg:px-5 px-3 bg-blue-120">
        <div className="space-y-6 bg-blue-120 flex flex-col items-center p-4">
          <div className="bg-blue-120 p-4 rounded-lg w-full space-y-2">
            <div className="space-y-3 bg-blue-120">
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 gap-4 flex items-center">
                <ActionIcon className="w-9" /> Recruiting Agency Details
              </h2>
              <div className="pl-36 pt-4 gap-2 grid grid-cols-2">
                <p className="xl:text-xl text-lg">
                  <strong>Full Name:</strong> {renderValue(RecuritingAgenciesDetails?.full_name)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Email:</strong> {renderValue(RecuritingAgenciesDetails?.email)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Designation:</strong> {renderValue(RecuritingAgenciesDetails?.designation)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Company Name:</strong> {renderValue(RecuritingAgenciesDetails?.company_name)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Company Size:</strong> {renderValue(RecuritingAgenciesDetails?.company_size)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>LinkedIn Url:</strong> {renderValue(RecuritingAgenciesDetails?.linkedin_url)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Email Verification:</strong> {renderValue(RecuritingAgenciesDetails?.email_verification ? 'Yes' : 'No')}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Country:</strong> {renderValue(RecuritingAgenciesDetails?.country)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Domains:</strong> {renderValue(RecuritingAgenciesDetails?.domains)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>City:</strong> {renderValue(RecuritingAgenciesDetails?.city)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>State:</strong> {renderValue(RecuritingAgenciesDetails?.state)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Kyc Verification:</strong> {renderValue(RecuritingAgenciesDetails?.kyc_verification ? 'Yes' : 'No')}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Account Status: </strong>
                  {RecuritingAgenciesDetails?.account_status?.status === 'Active'
                    ? 'Active'
                    : renderValue(RecuritingAgenciesDetails?.account_status?.remark)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Allocated Account Manager:</strong> {renderValue(accountManager?.full_name)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Kyc Details:</strong> {renderValue(kycData.details)}
                </p>
                <p className="xl:text-xl text-lg">
                  <strong>Kyc Documents:</strong> {renderValue(kycData.documents)}
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminRecruitingDetails;
