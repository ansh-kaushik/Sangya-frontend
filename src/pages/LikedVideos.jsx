import React from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { History } from "@mui/icons-material";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function LikedVideos() {
  return (
    <PageWrapper>
      <div className="flex flex-col h-full">
        {/* Non-scrollable heading */}
        <h2 className="text-lg font-bold  p-4">Liked Videos</h2>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-wrap gap-1">
          {Array.from({ length: 10 }, (_, idx) => (
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
    </PageWrapper>
  );
}
