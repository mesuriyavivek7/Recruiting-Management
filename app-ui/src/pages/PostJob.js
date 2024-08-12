import React from "react";

const PostJob = () => {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="custom-div">
        <p className="text-2xl font-semibold">Post a Job</p>
      </div>
      <div className="custom-div mx-3 w-full relative">
        <div className="flex place-items-center relative w-full">
          <div className="w-4/12 relative">
            <p className="text-lg">Job Profile*</p>
            <p className="text-sm">
              Provide a Job Title and Job Description.You can either attach the
              Job Description OR paste it in the Job Description field.
            </p>
          </div>
          <form className="custom-div w-8/12">
          <div>
            <label>
                hey
            </label>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
