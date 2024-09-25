import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UIactions } from "../store";

export default function Home() {
  const { homePageVideos } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const URL = "http://localhost:8000/api/v1/videos";
  const getAllVideosDetails = async () => {
    const res = await axios.get(URL);
    let videos = res.data.videos;
    console.log(videos);
    videos = videos.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      url: video.videoFile,
      description: video.description,
      channel: video.owner?.username || "Sangya",
      channelID: video.owner?._id || "undefined",
      channelImage: video.owner?.avatar || "./src/assets/channel_icon.png",
      uploadTime: video.createdAt,
    }));
    // console.log(Array.isArray(videos));

    dispatch(UIactions.setHomePageVideos({ homePageVideos: videos }));
  };

  useEffect(() => {
    if (homePageVideos.length === 0) getAllVideosDetails();
  }, []);
  return (
    <PageWrapper>
      <div className="flex flex-wrap gap-1 dark:text-white dark:bg-zinc-900  justify-start items-center overflow-y-auto ">
        {homePageVideos &&
          homePageVideos.map((videoDetails, idx) => (
            <VideoCard
              channelID={videoDetails.channelID}
              id={videoDetails.id}
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
