import React from "react";
import PageWrapper from "./PageWrapper";
import { Container, Typography } from "@mui/material";
import VideoControlPanel from "../components/VideoCompoents/VideoControlPanel";
import Description from "../components/VideoCompoents/VideoDescription";
import VideoInputComment from "../components/VideoCompoents/VideoInputCommet";
import VideoOutputComment from "../components/VideoCompoents/VideoOutputComment";
import VideoCard from "../components/VideoCompoents/VideoCard";
import VideoPlayer from "../components/VideoCompoents/VideoPlayer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};
export default function VideoPage() {
  const { title, url, channel, channelImage, description } = useSelector((state) => state.video);
  const { id } = useParams();
  return (
    <PageWrapper>
      {/* Container for the main content */}
      <div className="px-auto px-4 pt-4">
        <div className="flex flex-wrap h-[calc(84vh-0px)]">
          {/* Main content area */}
          <div className=" w-[70%] flex flex-wrap">
            {/* Video player */}
            <div className="w-full  aspect-[16/9] flex">
              <div className=" aspect-[16/9]  flex">
                <VideoPlayer title={title} url={url} />
              </div>
            </div>

            {/* Video control panel */}
            <div className="w-full ">
              <VideoControlPanel
                videoTitle={title}
                channelImage={channelImage}
                channelName={channel}
              />
            </div>

            {/* Video description */}
            <div className="w-full ">
              <Description text={description ? description : "46K Views 11 months ago"} />
            </div>

            {/* Comment input and comments */}
            <div className=" p-4 w-full ">
              <Typography component="h1" variant="h5">
                131 Comments
              </Typography>
              <VideoInputComment />
              <ul>
                {Array.from({ length: 40 }, (_, idx) => (
                  <li key={idx}>
                    <VideoOutputComment key={idx} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar for video suggestions */}
          <div className="bg-white-500 w-[30%] flex flex-col flex-wrap gap-0">
            {Array.from({ length: 5 }, (_, idx) => (
              <VideoCard
                key={idx}
                sidebar={true}
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
    </PageWrapper>
  );
}
