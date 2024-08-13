import React from "react";
import FileDragDrop from "../FileDragDrop";
import {ReactComponent as UploadIcon} from "../../assets/asset34.svg";

const PostJobForm4 = () => {
  return (
    <div className="flex flex-col gap-2 relative w-8/12 mx-auto">
      <div className="custom-div mx-3 w-full relative">
        <p className="text-2xl font-semibold">Sourcing Guidelines</p>
      </div>
      <div className="custom-div mx-3 w-full relative ">
        <form className="w-full relative flex flex-col gap-8 mt-4">
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="details-1" className="input-label">
              Required Citizenship / Work Permit / Visa Status*
            </label>
            <input
              type="text"
              id="details-1"
              name="details-1"
              className="input-field"
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="skills" className="input-label">
              Must Haves*
            </label>
            <textarea
              id="skills"
              name="skills"
              className="input-field"
              placeholder="Type must have skills here"
              rows={4}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="details-3" className="input-label">
              No Poach Clients (Plus other strict No-Nos)*
            </label>
            <textarea
              id="details-3"
              name="details-3"
              className="input-field"
              rows={4}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="details-4" className="input-label">
              Nice to Haves
            </label>
            <textarea
              id="details-4"
              name="details-4"
              className="input-field"
              placeholder="Type must have skills here"
              rows={4}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="details-5" className="input-label">
              Target Companies
            </label>
            <textarea
              id="details-5"
              name="details-5"
              className="input-field"
              placeholder="Type must have skills here"
              rows={4}
            />
          </div>
          <div className="relative flex flex-col gap-2 place-items-start">
            <label htmlFor="details-6" className="input-label">
              Additional Guidelines
            </label>
            <textarea
              id="details-6"
              name="details-6"
              className="input-field"
              placeholder="Type or use suggested tags below"
              rows={4}
            />
          </div>
          <div className="w-full relative">
            <p className="text-2xl font-semibold">Attachments</p>
            <div className="flex gap-3 place-items-center w-full bg-blue-200 bg-opacity-40 p-2 rounded-sm mt-4">
              <UploadIcon className="text-blue-400 w-5"/>
              <p className="text-blue-400 text-sm">Employee Value Proposition</p>
            </div>
            <div className="relative flex flex-col gap-2 place-items-start  mt-4">
              <label className="input-label font-semibold">Sample CV</label>
              <FileDragDrop fileuploadname="Upload Sample CV"/>
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Candidate Evaluation Form</label>
              <FileDragDrop fileuploadname="Candidate Evaluation Form"/>
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Audio Breifing by Client</label>
              <FileDragDrop fileuploadname="Audio Breifing by Client"/>
            </div>
            <div className="relative flex flex-col gap-2 place-items-start mt-2">
              <label className="input-label font-semibold">Upload other files</label>
              <FileDragDrop fileuploadname="Upload other files"/>
            </div>
          </div>
        </form>
      </div>
      <div className="custom-div place-items-end pb-2 mx-3 w-full">
        <button className="py-1 px-4 text-base bg-blue-400 rounded-sm text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default PostJobForm4;
