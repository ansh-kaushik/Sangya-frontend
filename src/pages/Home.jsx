import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";

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
      url: video.videoFile,
      description: video.description,
      channel: video.owner?.username || "Sangya",
      channelImage: video.owner?.avatar || "./src/assets/channel_icon.png",
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
      <div className="flex flex-wrap gap-1  justify-start items-center overflow-y-auto ">
        {videos.map((videoDetails, idx) => (
          <VideoCard
            key={idx}
            description={videoDetails.description}
            channelImage={videoDetails.channelImage}
            thumbnail={videoDetails.thumbnail}
            url={videoDetails.url}
            title={videoDetails.title}
            channel={videoDetails.channel}
            views={videoDetails.views}
            uploadTime={videoDetails.uploadTime}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
