import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  CloudUpload,
  Upload,
  UploadFile,
  UploadFileRounded,
  UploadOutlined,
  UploadTwoTone,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import UploadIcon from "@mui/icons-material/Upload";

export default function UserVideos() {
  const { email, auth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [userVideos, setUserVideos] = useState([]);
  const getUserVideos = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const res = await axios.get(`${BASE_URL}/videos/myVideos`, {
      params: {
        email: email,
      },
      withCredentials: true,
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
    if (auth) getUserVideos();
  }, [auth]);
  return (
    <PageWrapper>
      {!auth ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Please log in to upload</h2>
          <p className="text-gray-500 mb-6">
            You need to be signed in to upload videos to the platform.
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Non-scrollable heading */}
          <div className="flex mt-2  gap-4 justify-start items-center">
            <h2 className=" p-4 text-xl">User Videos</h2>
            <Button
              variant="contained"
              startIcon={<Upload />}
              onClick={() => navigate("/uploadVideo")}
            >
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
      )}
    </PageWrapper>
  );
}
