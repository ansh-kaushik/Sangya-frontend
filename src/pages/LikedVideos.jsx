import React, { useEffect } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { History } from "@mui/icons-material";
import axiosInstance from "../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { UIactions } from "../store";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function LikedVideos() {
  const dispatch = useDispatch();
  const { likedVideos } = useSelector((state) => state.UI);
  const { auth } = useSelector((state) => state.auth);
  const getLikedVideos = async () => {
    const res = await axiosInstance.get("/likes/videos");
    let videos = res.data.data;

    videos = videos.map((v) => v.video);
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
    dispatch(UIactions.setLikedVideos({ likedVideos: videos }));
  };
  // console.log(likedVideos);

  useEffect(() => {
    if (likedVideos.length === 0) getLikedVideos();
  }, []);
  return (
    <PageWrapper>
      {auth ? (
        <div className="flex flex-col h-full">
          {/* Non-scrollable heading */}
          <h2 className="text-lg font-bold  p-4">Liked Videos</h2>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-2 flex flex-wrap gap-1">
            {likedVideos &&
              likedVideos.map((videoDetails, idx) => (
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
      ) : (
        <div
          className={`flex flex-col text-center items-center justify-center h-64
         bg-gray-100 dark:bg-zinc-900 rounded-lg shadow-md p-6`}
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4 dark:text-white">
            Please login to view your liked videos
          </h2>
        </div>
      )}
    </PageWrapper>
  );
}
