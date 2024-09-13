import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function UserVideos() {
  const { email } = useSelector((state) => state.auth);
  const [userVideos, setUserVideos] = useState([]);
  const getUserVideos = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const res = await axios.get(`${BASE_URL}/videos/myVideos`, {
      params: {
        email: email,
      },
    });
    let videos = res.data.data.videos;
    console.log(videos);

    videos = videos.map((v) => ({
      thumbnail: v.thumbnail,
      title: v.title,
      views: v.views,
      channel: "Code with C++",
      channelImage: "./src/assets/channel_icon.png",
      uploadTime: "7 days ago",
    }));
    setUserVideos(videos);
  };

  useEffect(() => {
    getUserVideos();
  }, []);
  return (
    <PageWrapper>
      <div className="flex flex-col h-full">
        {/* Non-scrollable heading */}
        <h2 className="text-lg font-semibold p-4">User Videos</h2>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-wrap gap-1">
          {userVideos.length === 0 ? (
            <h2>No Videos Uploaded</h2>
          ) : (
            userVideos.map((videoDetails, idx) => (
              <VideoCard
                key={idx}
                channelImage={videoDetails.channelImage}
                thumbnail={videoDetails.thumbnail}
                title={videoDetails.title}
                views={videoDetails.views}
                channel={videoDetails.channel}
                uploadTime={videoDetails.uploadTime}
              />
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
