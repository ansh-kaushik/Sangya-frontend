import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
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

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-wrap gap-1 max-h-full justify-start items-center overflow-y-auto ">
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
    </PageWrapper>
  );
}
