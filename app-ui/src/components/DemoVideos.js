import React from "react";

const DemoVideo = ({ title, description, videoSrc, duration }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="relative w-full h-56 bg-black rounded-lg overflow-hidden">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          controls
        />
        <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white text-sm">
          {duration}
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const DemoVideosPage = () => {
  const videos = [
    {
      title: "MODULE 1",
      description: "Post A Job",
      videoSrc: "your-video-source-1.mp4",
      duration: "2:01",
    },
    {
      title: "MODULE 2",
      description: "My Open Jobs",
      videoSrc: "your-video-source-2.mp4",
      duration: "0:50",
    },
    {
      title: "MODULE 3",
      description: "Candidates Page and C-Talk",
      videoSrc: "your-video-source-3.mp4",
      duration: "2:42",
    },
    {
        title: "MODULE 4",
        description: "Top Navigation Bar",
        videoSrc: "your-video-source-3.mp4",
        duration: "2:42",
      },{
        title: "MODULE 5",
        description: "DR Dashboard",
        videoSrc: "your-video-source-3.mp4",
        duration: "2:42",
      },
  ];

  return (
    <div className="custom-div">
      <h2 className="text-xl font-semibold">Demo Video</h2>
      <p className="text-gray-700">Quick guide on using CBREX efficiently</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <DemoVideo
            key={index}
            title={video.title}
            description={video.description}
            videoSrc={video.videoSrc}
            duration={video.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoVideosPage;
