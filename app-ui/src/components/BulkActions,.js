import React, { useState } from "react";
import EmailPopup from "./EmailPopup";
import asset35 from "../assets/asset35.svg";

const BulkActions = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [emails, setEmails] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAddEmail = (emailData) => {
    setEmails([...emails, emailData]);
    togglePopup();
  };

  return (
    <div className="custom-div">
      <div className="w-full relative flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Send Messages</h2>
      </div>

      <div className="w-full relative flex space-x-4 mb-4 text-blue-600">
        <div className="border-b-2 border-blue-600 pb-1 cursor-pointer">
          Send Messages
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center mx-auto ">
          <img src={asset35} alt="No Emails" className="mb-4" /><button
            onClick={togglePopup}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Add Emails 
          </button> 
        </div>
      ) : (
        <div className="custom-div w-full">
          {emails.map((email, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded shadow">
              <p>
                <strong>Email:</strong> {email.email}
              </p>
              <p>
                <strong>Subject:</strong> {email.subject}
              </p>
              <p>
                <strong>Message:</strong> {email.message}
              </p>
            </div>
          ))}
          <button
            onClick={togglePopup}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
           Add More Emails
          </button> 
        </div>
      )}

      {showPopup && (
        <EmailPopup onClose={togglePopup} onSubmit={handleAddEmail} />
      )}
    </div>
  );
};

export default BulkActions;
