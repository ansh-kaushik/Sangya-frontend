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

export default function Playlists() {
  return (
    <PageWrapper>
      <div className="flex flex-col h-full">
        {/* Non-scrollable heading */}
        <h1 className="text-2xl font-bold from-neutral-950 p-4">Playlists</h1>

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
