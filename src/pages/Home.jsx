import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function Home() {
  const [videos, setVideos] = useState([]);
  const URL = "http://localhost:8000/api/v1/videos";
  const getAllVideosDetails = async () => {
    const res = await axios.get(URL);
    let videos = res.data.videos;
    videos = videos.map((video) => ({
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      channel: "Code In C++",
      channelImage: "./src/assets/channel_icon.png",
      uploadTime: "7 days ago",
    }));
    console.log(videos);

    setVideos(videos);
  };

  useEffect(() => {
    getAllVideosDetails();
  }, []);
  return (
    <PageWrapper>
      <div className="flex flex-wrap gap-1 h-[calc(85vh-0px)] justify-start items-center overflow-y-auto ">
        {videos.map((videoDetails, idx) => (
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
