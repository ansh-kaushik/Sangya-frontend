import React from "react";
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { videoActions } from "../../store";

const VideoCard = ({
  id,
  thumbnail,
  title,
  channel,
  views,
  channelImage,
  uploadTime,
  sidebar,
  url,
  description,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={`max-w-xs   ${sidebar ? "flex items-center my-0 mx-2" : "m-4"}`}>
      <img
        src={thumbnail}
        alt={title}
        className={`rounded-xl hover:cursor-pointer hover:rounded-none  transition-all duration-300 aspect-video ${sidebar ? "w-40" : "w-50"}`}
        onClick={() => {
          dispatch(
            videoActions.setVideoDetails({ title, url, channelImage, channel, views, description })
          );
          navigate(`/video/${id}`);
        }}
        // style={{ objectFit: "cover" }}
      />
      <div className={`flex justify-between  ${sidebar ? "px-2 py-3" : "p-4"}`}>
        {!sidebar && (
          <div className="flex  justify-center items-center">
            <img src={channelImage} className="h-8 w-8 rounded-full" alt="channel image" />
          </div>
        )}
        <div className={`flex-1 pl-2 ${sidebar ? "" : ""}`}>
          <Link
            underline="none"
            className="hover:cursor-pointer  "
            onClick={() => navigate("/video")}
          >
            <Typography
              variant={`${sidebar ? "body2" : "subtitle2"}`}
              className="font-semibold  dark:text-white"
            >
              {title}
            </Typography>
          </Link>
          <Typography
            variant={`${sidebar ? "body2" : "body2"}`}
            className={`text-gray-600 hover:text-gray-950 dark:text-white dark:hover:text-light-white hover:cursor-pointer ${sidebar ? "text-sm" : ""} `}
          >
            {channel}
          </Typography>
          <Typography
            variant={`${sidebar ? "caption" : "body2"}`}
            className="text-gray-500 dark:text-white"
          >
            {views} views | {uploadTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
