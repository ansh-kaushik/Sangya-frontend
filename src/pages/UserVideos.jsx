import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Upload,
  UploadFile,
  UploadFileRounded,
  UploadOutlined,
  UploadTwoTone,
} from "@mui/icons-material";
import { Button } from "@mui/material";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import UploadIcon from "@mui/icons-material/Upload";

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
    setUserVideos(videos);
  };

  useEffect(() => {
    getUserVideos();
  }, []);
  return (
    <PageWrapper>
      <div className="flex flex-col h-full">
        {/* Non-scrollable heading */}
        <div className="flex mt-2  gap-4">
          <h2 className="text-lg font-semibold p-4">User Videos</h2>
          <Button size="medium" variant="contained" startIcon={<Upload sx={{ color: "white" }} />}>
            Upload
          </Button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-wrap gap-1">
          {userVideos.length === 0 ? (
            <h2>No Videos Uploaded</h2>
          ) : (
            userVideos.map((videoDetails, idx) => (
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
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
