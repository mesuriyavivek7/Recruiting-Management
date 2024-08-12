import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Settings = () => {
  return (
    <div className="flex flex-col gap-2 relative">
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Request Email Change</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-email" className="input-label">
            Current Email
          </label>
          <input
            type="email"
            name="current-email"
            id="current-email"
            className="input-field"
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-email" className="input-label ">
            Enter New Email
          </label>
          <input
            type="email"
            name="new-email"
            id="new-email"
            className="input-field "
          />
        </div>
      </form>
      <form className="password-change-form  w-1/2 custom-div">
        <p className="font-bold">Password</p>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="current-password" className="input-label">
            Current Password
          </label>
          <input
            type="password"
            name="current-password"
            id="current-password"
            className="input-field"
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="new-password" className="input-label">
            New Password
          </label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="input-field"
          />
        </div>
        <div className="w-full relative flex flex-col gap-2">
          <label htmlFor="confirm-password" className="input-label ">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="input-field "
          />
        </div>
      </form>
      <form className="email-change-form w-1/2 custom-div">
        <p className="font-bold">Phone Number</p>
        <PhoneInput country={"in"} containerStyle={{ width: "100%" }} />
      </form>
    </div>
  );
};

export default Settings;
