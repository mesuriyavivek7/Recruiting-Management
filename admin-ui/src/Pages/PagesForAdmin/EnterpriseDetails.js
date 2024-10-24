import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { fetchAccountManager } from '../../services/api'; 

const EnterpriseDetails = () => {
  const location = useLocation();
  const { enterpriseDetails } = location.state || {}; // Access the passed state
  const [accountManager, setAccountManager] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      if (enterpriseDetails?.allocated_account_manager) {
        try {
          const managerData = await fetchAccountManager(enterpriseDetails.allocated_account_manager);
          setAccountManager(managerData);
        } catch (error) {
          console.error('Error fetching account manager data:', error);
        }
      }
    };

    fetchData();
  }, [enterpriseDetails]); 

  return (
    <Card className='mt-4 font-sans shadow-md' sx={{
      borderRadius: '8px',
      boxShadow: 3,
    }}>
      <div className='lg:px-5 px-3 bg-blue-120'>
        <div className="space-y-6 bg-blue-120 flex flex-col items-center p-4">
          <div className="bg-blue-120 p-4 rounded-lg w-full space-y-2">
            <div className='space-y-3 bg-blue-120'>
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 flex items-center">
                <FaBriefcase className="mr-3 text-2xl xl:text-3xl text-black" /> Enterprise Details
              </h2>
              <div className='pl-36 pt-4 gap-2 grid grid-cols-2'>
                <p className="xl:text-xl text-lg"><strong>Full Name:</strong> {enterpriseDetails?.full_name}</p>
                <p className="xl:text-xl text-lg"><strong>Email:</strong> {enterpriseDetails?.email}</p>
                <p className="xl:text-xl text-lg"><strong>Mobile Number:</strong> {enterpriseDetails?.mobileno}</p>
                <p className="xl:text-xl text-lg"><strong>Designation:</strong> {enterpriseDetails?.designation}</p>
                <p className="xl:text-xl text-lg"><strong>Company Name:</strong> {enterpriseDetails?.company_name}</p>
                <p className="xl:text-xl text-lg"><strong>Country:</strong> {enterpriseDetails?.country}</p>
                <p className="xl:text-xl text-lg"><strong>State:</strong> {enterpriseDetails?.state}</p>
                <p className="xl:text-xl text-lg"><strong>City:</strong> {enterpriseDetails?.city}</p>
                <p className="xl:text-xl text-lg"><strong>Email Verification:</strong> {enterpriseDetails?.email_verified ? 'Yes' : 'No'}</p>
                <p className="xl:text-xl text-lg"><strong>Admin Verified:</strong> {enterpriseDetails?.admin_verified ? 'Yes' : 'No'}</p>
                <p className="xl:text-xl text-lg"><strong>Allocated Account Manager:</strong> {accountManager?.full_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EnterpriseDetails;
