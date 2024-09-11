import React from "react";
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ thumbnail, title, channel, views, channelImage, uploadTime, sidebar }) => {
  const navigate = useNavigate();

  return (
    <div className={`max-w-xs  ${sidebar ? "flex items-center my-0 mx-2" : "m-4"}`}>
      <img
        src={thumbnail}
        alt={title}
        className={`rounded-xl hover:cursor-pointer hover:rounded-none hover:shadow-2xl transition-all duration-300 ${sidebar ? "w-40" : ""}`}
        onClick={() => navigate("/video")}
        style={{ objectFit: "cover" }}
      />
      <div className={`flex justify-between ${sidebar ? "px-2 py-3" : "p-4"}`}>
        {!sidebar && (
          <div className="flex justify-center items-center">
            <img src={channelImage} className="h-8 w-8 rounded-full" alt="channel image" />
          </div>
        )}
        <div className={`flex-1 pl-2 ${sidebar ? "" : ""}`}>
          <Link
            underline="none"
            className="hover:cursor-pointer"
            onClick={() => navigate("/video")}
          >
            <Typography
              variant={`${sidebar ? "body2" : "subtitle2"}`}
              className="font-semibold"
              color="black"
            >
              {title}
            </Typography>
          </Link>
          <Typography
            variant={`${sidebar ? "body2" : "body2"}`}
            className={`text-gray-600 hover:text-gray-950 hover:cursor-pointer ${sidebar ? "text-sm" : ""} `}
          >
            {channel}
          </Typography>
          <Typography variant={`${sidebar ? "caption" : "body2"}`} className="text-gray-500">
            {views} views | {uploadTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
