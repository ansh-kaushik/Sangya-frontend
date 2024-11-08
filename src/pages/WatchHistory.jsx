import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { Delete, History } from "@mui/icons-material";
import axiosInstance from "../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { UIactions } from "../store";
import { Button } from "@mui/material";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function WatchHistory() {
  const { watchHistoryVideos } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const getWatchHistoryData = async () => {
    const res = await axiosInstance.get(`/watchHistory`);
    let videos = res.data.history;
    videos = videos.map((v) => v.video);
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

    videos = [...new Set(videos.map((v) => JSON.stringify(v)))].map((v) => JSON.parse(v));

    dispatch(UIactions.setWatchHistoryVideos({ watchHistoryVideos: videos }));
  };
  const handleDeleteWatchHistory = async () => {
    const res = await axiosInstance.delete("/watchHistory/clear");

    getWatchHistoryData();
  };
  useEffect(() => {
    getWatchHistoryData();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col ">
        {/* Non-scrollable heading */}
        <h2 className="text-lg font-semibold p-4 ">
          Watch History <History sx={{ marginRight: 3 }} />
          {watchHistoryVideos.length > 0 && (
            <Button variant="contained" onClick={handleDeleteWatchHistory}>
              {" "}
              <Delete />
              Clear All Watch History
            </Button>
          )}
        </h2>

        {/* Scrollable content area */}
        <div className="flex-1   p-2 flex flex-wrap gap-1">
          {watchHistoryVideos &&
            watchHistoryVideos.map((videoDetails, idx) => (
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
      </div>
    </PageWrapper>
  );
}
