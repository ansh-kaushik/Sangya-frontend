import React from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function Subscriptions() {
  return (
    <PageWrapper>
      <div className="flex w-full">
        {/* Sidebar with fixed width */}
        <div className="w-80 p-4">
          <h2 className="text-lg font-semibold">Subscriptions</h2>
          <ul className="m-2 p-4 h-[calc(80vh-40px)] overflow-y-auto">
            {Array.from({ length: 20 }, (_, idx) => (
              <li key={idx} className="p-3 hover:bg-gray-500 rounded cursor-pointer  ">
                Code with C++
              </li>
            ))}
          </ul>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 relative">
          {/* Fixed heading */}
          <h2 className="text-lg font-semibold mb-4">Latest Videos</h2>

          {/* Scrollable content */}
          <div className="overflow-y-auto h-[calc(80vh-40px)]">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 20 }, (_, idx) => (
                <VideoCard
                  key={idx}
                  channelImage={videoDetails.channelImage}
                  thumbnail={videoDetails.thumbnail}
                  title={videoDetails.title}
                  views={videoDetails.views}
                  channel={videoDetails.channel}
                  uploadTime={videoDetails.uploadTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
